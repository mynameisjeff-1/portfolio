import type { VercelRequest, VercelResponse } from "@vercel/node";
// Importing this is the point: it pulls in @google/genai, @qdrant/js-client-rest
// and groq-sdk, the same module graph /api/chat needs, so the instance's cold
// start is paid here (triggered on page load) instead of on the visitor's
// first real question.
import "./_lib/rag";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(204).end();
}
