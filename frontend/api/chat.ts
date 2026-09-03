import type { VercelRequest, VercelResponse } from "@vercel/node";
import { answer, type HistoryMessage } from "./_lib/rag";

export const config = {
  runtime: "nodejs",
};

// Simple in-memory rate limit: one request per IP every 2 seconds.
// Best-effort only — each serverless instance has its own memory, so this
// does not enforce a global limit across concurrent cold starts.
const lastRequestAt = new Map<string, number>();
const MIN_INTERVAL_MS = 2000;

function getAllowedOrigins() {
  return (process.env.ALLOWED_ORIGIN || "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const allowedOrigins = getAllowedOrigins();
  const origin = (req.headers.origin as string) || "";
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = req.body || {};
  const question = (body.question || "").toString().trim();
  if (!question) {
    res.status(400).json({ error: "Missing question" });
    return;
  }
  if (question.length > 2000) {
    res.status(400).json({ error: "Question too long" });
    return;
  }

  const rawHistory = Array.isArray(body.history) ? body.history : [];
  const history: HistoryMessage[] = rawHistory
    .filter((m: any) => m && (m.role === "user" || m.role === "assistant") && typeof m.text === "string")
    .map((m: any) => ({ role: m.role, text: m.text.slice(0, 2000) }))
    .slice(-8);

  const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const last = lastRequestAt.get(ip) || 0;
  if (now - last < MIN_INTERVAL_MS) {
    res.status(429).json({ error: "Too many requests" });
    return;
  }
  lastRequestAt.set(ip, now);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  (res as any).flushHeaders?.();

  try {
    const { stream } = await answer(question, history);
    for await (const chunk of stream) {
      const text = chunk.text || "";
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }
    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err: any) {
    console.error("RAG answer failed:", err.message || err);
    res.write(`data: ${JSON.stringify({ error: true })}\n\n`);
    res.end();
  }
}
