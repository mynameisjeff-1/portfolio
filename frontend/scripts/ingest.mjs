// Local-only ingestion script — run manually with `npm run ingest` after
// editing anything in knowledge/. Not deployed as part of the Vercel build.
import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import { QdrantClient } from "@qdrant/js-client-rest";
import { chunkText, stableId } from "../api/_lib/chunk.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const EMBEDDING_MODEL = "gemini-embedding-001";
const VECTOR_SIZE = 768;
const COLLECTION = process.env.QDRANT_COLLECTION || "portfolio_knowledge";
const KNOWLEDGE_DIR = path.join(__dirname, "..", "knowledge");

const SOURCES = [
  { file: "cv.txt", source_type: "cv", title: "Hamza Asim - CV", url: "/cv.pdf" },
  {
    file: "volunteer_akhuwat.txt",
    source_type: "volunteer_experience",
    title: "Volunteer Experience - Akhuwat Foundation",
    project: "Akhuwat Foundation",
    url: "",
  },
  {
    file: "research_agreeable_swarm.txt",
    source_type: "research_paper",
    title: "The Agreeable Swarm",
    project: "the-agreeable-swarm",
    url: "",
  },
  {
    file: "research_small_models_overhead.txt",
    source_type: "research_paper",
    title: "When Small Models Create Big Overhead",
    project: "when-small-models-create-big-overhead",
    url: "",
  },
  {
    file: "github_projects.txt",
    source_type: "github_project",
    title: "GitHub Project Knowledge Base",
    url: "https://github.com/mynameisjeff-1",
  },
];

function guessSection(chunk) {
  const firstLine = chunk.split("\n")[0].trim();
  if (/^[A-Z0-9][A-Z0-9 /&\-.,]{3,60}$/.test(firstLine) && firstLine.length < 60) {
    return firstLine;
  }
  return null;
}

function guessProjectFromChunk(chunk, fallback) {
  const m = chunk.match(/^project_id:\s*(.+)$/m);
  return m ? m[1].trim() : fallback;
}

function guessTitleFromChunk(chunk, fallback) {
  const m = chunk.match(/^title:\s*(.+)$/m);
  return m ? m[1].trim() : fallback;
}

async function embed(ai, text, taskType) {
  const res = await ai.models.embedContent({
    model: EMBEDDING_MODEL,
    contents: text,
    config: { taskType, outputDimensionality: VECTOR_SIZE },
  });
  return res.embeddings[0].values;
}

async function ensureCollection(client) {
  const exists = await client.collectionExists(COLLECTION);
  if (!exists.exists) {
    await client.createCollection(COLLECTION, {
      vectors: { size: VECTOR_SIZE, distance: "Cosine" },
    });
    console.log(`Created collection "${COLLECTION}"`);
  } else {
    console.log(`Collection "${COLLECTION}" already exists`);
  }

  await client.createPayloadIndex(COLLECTION, {
    field_name: "filename",
    field_schema: "keyword",
  });
}

async function main() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const client = new QdrantClient({ url: process.env.QDRANT_URL, apiKey: process.env.QDRANT_API_KEY });

  await ensureCollection(client);

  let totalChunks = 0;
  let totalUpserted = 0;

  for (const source of SOURCES) {
    const filePath = path.join(KNOWLEDGE_DIR, source.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`Skipping missing file: ${source.file}`);
      continue;
    }
    const text = fs.readFileSync(filePath, "utf-8");
    const chunks = chunkText(text);
    console.log(`${source.file}: ${chunks.length} chunks`);
    totalChunks += chunks.length;

    await client.delete(COLLECTION, {
      filter: { must: [{ key: "filename", match: { value: source.file } }] },
      wait: true,
    });

    const points = [];
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const id = stableId(source.file, chunk);
      const vector = await embed(ai, chunk, "RETRIEVAL_DOCUMENT");

      points.push({
        id,
        vector,
        payload: {
          text: chunk,
          source_type: source.source_type,
          title: guessTitleFromChunk(chunk, source.title),
          project: guessProjectFromChunk(chunk, source.project || null),
          section: guessSection(chunk),
          filename: source.file,
          url: source.url || null,
          chunk_index: i,
        },
      });
    }

    if (points.length) {
      await client.upsert(COLLECTION, { wait: true, points });
      totalUpserted += points.length;
      console.log(`  upserted ${points.length} points from ${source.file}`);
    }
  }

  const info = await client.getCollection(COLLECTION);
  console.log("\n--- Ingestion complete ---");
  console.log(`Files processed: ${SOURCES.length}`);
  console.log(`Total chunks embedded: ${totalChunks}`);
  console.log(`Total points upserted: ${totalUpserted}`);
  console.log(`Collection point count (server-side): ${info.points_count}`);
}

main().catch((err) => {
  console.error("Ingestion failed:", err);
  process.exit(1);
});
