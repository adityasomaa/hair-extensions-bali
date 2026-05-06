// Generate favicon set from a single SVG master.
// Outputs (file conventions per Next.js 16 docs):
//   app/icon.png         (32×32, served as <link rel="icon">)
//   app/apple-icon.png   (180×180, served as <link rel="apple-touch-icon">)
//   app/favicon.ico      (multi-size 16+32+48 ICO, served as default favicon)
//
// Run: node scripts/generate-favicon.mjs
import sharp from "sharp";
import pngToIco from "png-to-ico";
import { mkdir, writeFile, stat } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WEB = resolve(__dirname, "..");
const APP = resolve(WEB, "app");

// SVG master — 512×512.
// Design: warm-dark rounded square + champagne-gold serif H drawn as
// vector rectangles (so it renders identically on every OS, no font
// dependency). Subtle gold ring at the inner edge for depth.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <!-- Background plate -->
  <rect width="512" height="512" rx="96" fill="#0e0b09"/>

  <!-- Subtle inner ring -->
  <rect x="32" y="32" width="448" height="448" rx="72" fill="none"
        stroke="#c9a87c" stroke-width="2" opacity="0.18"/>

  <!-- Serif H — drawn as overlapping rectangles for crisp render at any size -->
  <!-- Left stem -->
  <rect x="142" y="138" width="56" height="236" fill="#c9a87c"/>
  <!-- Right stem -->
  <rect x="314" y="138" width="56" height="236" fill="#c9a87c"/>
  <!-- Crossbar -->
  <rect x="170" y="237" width="172" height="38" fill="#c9a87c"/>

  <!-- Serif feet — slightly wider rectangles top/bottom of each stem -->
  <rect x="120" y="132" width="100" height="14" fill="#c9a87c"/>
  <rect x="120" y="368" width="100" height="14" fill="#c9a87c"/>
  <rect x="292" y="132" width="100" height="14" fill="#c9a87c"/>
  <rect x="292" y="368" width="100" height="14" fill="#c9a87c"/>
</svg>`;

async function pngBuffer(size) {
  return sharp(Buffer.from(svg))
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function main() {
  await mkdir(APP, { recursive: true });

  const targets = [
    { name: "icon.png", size: 32 },
    { name: "apple-icon.png", size: 180 },
  ];

  for (const t of targets) {
    const buf = await pngBuffer(t.size);
    await writeFile(resolve(APP, t.name), buf);
    console.log(`  ✓ ${t.name} (${t.size}×${t.size}, ${(buf.length / 1024).toFixed(1)} KB)`);
  }

  // Multi-size ICO for legacy browsers + Windows pinned tabs.
  const icoSizes = await Promise.all(
    [16, 32, 48].map((size) => pngBuffer(size))
  );
  const icoBuf = await pngToIco(icoSizes);
  await writeFile(resolve(APP, "favicon.ico"), icoBuf);
  console.log(`  ✓ favicon.ico (16+32+48 multi-size, ${(icoBuf.length / 1024).toFixed(1)} KB)`);

  // Sanity-check sizes
  console.log("\nFinal:");
  for (const t of [...targets, { name: "favicon.ico" }]) {
    const s = await stat(resolve(APP, t.name));
    console.log(`  ${t.name}: ${(s.size / 1024).toFixed(1)} KB`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
