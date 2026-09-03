import crypto from "crypto";

// Splits on blank-line-separated blocks, then regroups into ~sized chunks
// so we don't split mid-thought but also don't ship one giant blob per file.
export function chunkText(
  text: string,
  { maxChars = 1200, minChars = 200 }: { maxChars?: number; minChars?: number } = {}
): string[] {
  const paragraphBlocks = text
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  // Any individual block that is still oversized (e.g. a dense CV section
  // with no blank lines inside it) gets broken down further by single line
  // breaks, rather than only checking this once for the whole document.
  const blocks = paragraphBlocks.flatMap((block) => {
    if (block.length <= maxChars) return [block];
    return block
      .split(/\n/)
      .map((b) => b.trim())
      .filter(Boolean);
  });

  const chunks: string[] = [];
  let current = "";

  for (const block of blocks) {
    if (current && current.length + block.length + 2 > maxChars) {
      chunks.push(current);
      current = block;
    } else {
      current = current ? `${current}\n\n${block}` : block;
    }
  }
  if (current) chunks.push(current);

  // merge any tiny trailing/leading fragments into their neighbor
  const merged: string[] = [];
  for (const c of chunks) {
    if (merged.length && c.length < minChars) {
      merged[merged.length - 1] += `\n\n${c}`;
    } else {
      merged.push(c);
    }
  }
  return merged;
}

// Deterministic UUID (v5-style via sha1) so re-running ingestion on the same
// text produces the same point ID instead of duplicating vectors.
export function stableId(namespace: string, text: string): string {
  const hash = crypto.createHash("sha1").update(`${namespace}:${text}`).digest("hex");
  return [
    hash.slice(0, 8),
    hash.slice(8, 12),
    "5" + hash.slice(13, 16),
    ((parseInt(hash[16], 16) & 0x3) | 0x8).toString(16) + hash.slice(17, 20),
    hash.slice(20, 32),
  ].join("-");
}
