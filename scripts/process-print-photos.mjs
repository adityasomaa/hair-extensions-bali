// Process the curated print-pack photos at print quality (~2000px wide,
// JPEG q90). Output to design/wip/print-pack/print-assets/.
//
// Run: node scripts/process-print-photos.mjs   (from web/)
import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WEB = resolve(__dirname, "..");
const ROOT = resolve(WEB, "..");
const SRC_SELENA = resolve(ROOT, "photos/selena project");
const SRC_HAIR = resolve(ROOT, "photos/the hair");
const OUT = resolve(ROOT, "design/wip/print-pack/print-assets");

// Curated mapping — each print section gets a hand-picked photo from raw.
// Subject hints chosen to mirror what's in `product knowledge/` order.
const photos = [
  // Brand / atmosphere
  { src: `${SRC_HAIR}/P1017920.jpg`, name: "cover-rack", caption: "Wig display rack — hero" },
  { src: `${SRC_SELENA}/DSC04721.JPG`, name: "about-salon", caption: "All About Hair wall — about" },

  // Services in product-knowledge order:
  // 3-5: KERATIN BOND
  { src: `${SRC_HAIR}/P1017941.jpg`, name: "keratin-bond", caption: "Keratin-bonded strands with HAIR tags" },
  // 6-8: MICRO RING (using comparison shot with i-tip strands)
  { src: `${SRC_SELENA}/DSC04900.JPG`, name: "micro-ring", caption: "Three hair-type comparison — i-tip bonds" },
  // 9-11: NANO RING (gloved hand close-up of fine strand bundle)
  { src: `${SRC_HAIR}/P1017968.jpg`, name: "nano-ring", caption: "Gloved hand holding fine blonde strands" },
  // 12-14: WEFT (long wefts on rack)
  { src: `${SRC_HAIR}/P1017898.jpg`, name: "weft", caption: "Long weft hanging racks" },
  // 15-16: CLIP-IN (clip-in extensions on dark backdrop)
  { src: `${SRC_SELENA}/DSC04876.JPG`, name: "clip-in", caption: "Clip-in extensions detail" },
  // 18-20: TAPE-IN (substitute — close blonde texture)
  { src: `${SRC_HAIR}/P1017926.jpg`, name: "tape-in", caption: "Close blonde/brown wavy texture" },

  // Optional supporting shots for brochure layouts
  { src: `${SRC_HAIR}/P1017876.jpg`, name: "extra-rack-large", caption: "Large rack display" },
  { src: `${SRC_SELENA}/DSC04976.JPG`, name: "extra-styling", caption: "Styling tool with hair" },
];

async function process(src, name) {
  const meta = await sharp(src).metadata();
  const isPortrait = (meta.height ?? 0) > (meta.width ?? 0);

  // Wider/taller target for print. 2400px on the long edge = high enough
  // for A5 full-bleed at 300 DPI, A4 quarter-page at 300 DPI.
  await sharp(src)
    .rotate() // honor EXIF
    .resize({
      width: isPortrait ? 1800 : 2400,
      height: isPortrait ? 2400 : 1800,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: 90, progressive: true, mozjpeg: true })
    .toFile(resolve(OUT, `${name}.jpg`));
}

async function main() {
  await mkdir(OUT, { recursive: true });
  console.log(`Output: ${OUT}\n`);

  let totalIn = 0;
  let totalOut = 0;

  for (const p of photos) {
    try {
      await process(p.src, p.name);
      const inSt = await stat(p.src);
      const outSt = await stat(resolve(OUT, `${p.name}.jpg`));
      totalIn += inSt.size;
      totalOut += outSt.size;
      console.log(
        `  ✓ ${p.name.padEnd(20)} ${(inSt.size / 1024 / 1024).toFixed(1).padStart(5)}MB → ${(outSt.size / 1024).toFixed(0).padStart(4)}KB · ${p.caption}`
      );
    } catch (e) {
      console.error(`  ✗ ${p.name}: ${e.message}`);
    }
  }

  console.log(
    `\nTotal: ${(totalIn / 1024 / 1024).toFixed(1)}MB → ${(totalOut / 1024 / 1024).toFixed(1)}MB`
  );
}

main();
