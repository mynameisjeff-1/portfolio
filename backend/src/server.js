require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const express = require("express");
const cors = require("cors");
const { answer } = require("./rag");

const app = express();

const allowedOrigins = (process.env.ALLOWED_ORIGIN || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length
      ? allowedOrigins
      : ["http://localhost:5173"],
  })
);
app.use(express.json());

// Simple in-memory rate limit: one request per IP every 2 seconds.
const lastRequestAt = new Map();
const MIN_INTERVAL_MS = 2000;

app.post("/api/chat", async (req, res) => {
  const question = (req.body && req.body.question || "").toString().trim();
  if (!question) {
    res.status(400).json({ error: "Missing question" });
    return;
  }
  if (question.length > 2000) {
    res.status(400).json({ error: "Question too long" });
    return;
  }

  const rawHistory = Array.isArray(req.body && req.body.history) ? req.body.history : [];
  const history = rawHistory
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.text === "string")
    .map((m) => ({ role: m.role, text: m.text.slice(0, 2000) }))
    .slice(-8);

  const ip = req.ip;
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
  res.flushHeaders?.();

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
  } catch (err) {
    console.error("RAG answer failed:", err.message || err);
    res.write(`data: ${JSON.stringify({ error: true })}\n\n`);
    res.end();
  }
});

app.get("/api/health", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => console.log(`RAG server listening on :${PORT}`));
