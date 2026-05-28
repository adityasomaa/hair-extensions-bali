// AI mention tracker — queries Claude via the Anthropic API to see whether
// "The Hair Extensions Bali" surfaces for hair-extension queries.
//
// Usage:
//   ANTHROPIC_API_KEY=sk-ant-... node scripts/ai-tracking/check-claude.mjs
//
// Outputs: scripts/ai-tracking/results/claude-YYYY-MM-DD.md
//   For each query: mention=yes/no, our_rank, competitors_mentioned, excerpt
//
// Cost: ~10 queries × ~1500 input tokens × ~500 output tokens ≈ $0.05/run on
// claude-sonnet-4.5. Run weekly.

import { writeFile, mkdir } from "node:fs/promises";
import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const RESULTS_DIR = resolve(__dirname, "results");

const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) {
  console.error("Missing ANTHROPIC_API_KEY env var.");
  console.error("Get one at https://console.anthropic.com/settings/keys");
  console.error("Run: ANTHROPIC_API_KEY=sk-ant-... node scripts/ai-tracking/check-claude.mjs");
  process.exit(1);
}

const config = JSON.parse(
  await readFile(resolve(__dirname, "queries.json"), "utf8"),
);

const MODEL = "claude-sonnet-4-5";

async function askClaude(query) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 800,
      // Give Claude the same context a typical user would: a real-world query
      // with no extra hints. We want to see what Claude actually says cold.
      messages: [{ role: "user", content: query }],
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`API error ${res.status}: ${txt}`);
  }

  const json = await res.json();
  return json.content?.[0]?.text ?? "(no text response)";
}

function analyzeMention(text, aliases) {
  const lower = text.toLowerCase();
  const found = aliases.filter((a) => lower.includes(a.toLowerCase()));
  return {
    mentioned: found.length > 0,
    matchedAliases: found,
  };
}

function findCompetitors(text) {
  // Known Bali hair extension competitors — track which ones Claude mentions
  const competitors = [
    "hairshop.store",
    "hairshop store",
    "the shampoo lounge",
    "shampoo lounge",
    "baliluxuryhair",
    "bali luxury hair",
    "iissii",
    "hair club",
    "glospabali",
    "glo spa",
  ];
  const lower = text.toLowerCase();
  return competitors.filter((c) => lower.includes(c));
}

async function main() {
  await mkdir(RESULTS_DIR, { recursive: true });

  const date = new Date().toISOString().slice(0, 10);
  const outPath = resolve(RESULTS_DIR, `claude-${date}.md`);

  const lines = [
    `# AI Mention Tracking — Claude (${MODEL})`,
    "",
    `Date: ${date}`,
    `Target brand: ${config.target_brand}`,
    `Target domain: ${config.target_domain}`,
    "",
    "---",
    "",
  ];

  let mentionCount = 0;
  let competitorCounts = {};

  for (const { id, q, category } of config.queries) {
    console.log(`[${id}] ${q}`);
    let response, error;
    try {
      response = await askClaude(q);
    } catch (e) {
      error = e.message;
    }

    if (error) {
      lines.push(`## ${id} (${category})`, "", `**Q:** ${q}`, "", `**Error:** ${error}`, "", "---", "");
      continue;
    }

    const ours = analyzeMention(response, config.target_aliases);
    const competitors = findCompetitors(response);
    if (ours.mentioned) mentionCount++;
    for (const c of competitors) competitorCounts[c] = (competitorCounts[c] ?? 0) + 1;

    const verdict = ours.mentioned ? "✅ MENTIONED" : "❌ not mentioned";
    console.log(`  ${verdict}${competitors.length ? `  · competitors: ${competitors.join(", ")}` : ""}`);

    lines.push(
      `## ${id} (${category})`,
      "",
      `**Q:** ${q}`,
      "",
      `**Verdict:** ${verdict}`,
      ours.mentioned ? `**Matched aliases:** ${ours.matchedAliases.join(", ")}` : "",
      competitors.length ? `**Competitors mentioned:** ${competitors.join(", ")}` : "",
      "",
      `<details><summary>Full response</summary>`,
      "",
      response,
      "",
      `</details>`,
      "",
      "---",
      "",
    );

    // small delay between calls to be a polite API citizen
    await new Promise((r) => setTimeout(r, 500));
  }

  lines.unshift(
    "",
    `**Summary:** Mentioned in **${mentionCount}/${config.queries.length}** queries.`,
    "",
    Object.keys(competitorCounts).length
      ? `**Competitors that appeared:** ${Object.entries(competitorCounts)
          .sort((a, b) => b[1] - a[1])
          .map(([c, n]) => `${c} (${n}×)`)
          .join(", ")}`
      : "",
    "",
  );

  await writeFile(outPath, lines.join("\n"), "utf8");
  console.log(`\n✓ Saved to ${outPath}`);
  console.log(`  Mentioned in ${mentionCount}/${config.queries.length} queries`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
