// Process curated photos: resize to web sizes, write to public/photos.
// Usage: node scripts/process-photos.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WEB = resolve(__dirname, "..");
const ROOT = resolve(WEB, "..");
const SRC_SELENA = resolve(ROOT, "photos/selena project");
const SRC_HAIR = resolve(ROOT, "photos/the hair");
const OUT = resolve(WEB, "public/photos");

const photos = [
  // Hero / brand
  { src: `${SRC_SELENA}/DSC04721.JPG`, name: "hero-salon", caption: "All About Hair wall" },
  { src: `${SRC_HAIR}/P1017920.jpg`, name: "hero-rack", caption: "wig display rack" },

  // Salon / location
  { src: `${SRC_HAIR}/DSC03387.jpg`, name: "salon-1", caption: "wide salon view" },
  { src: `${SRC_HAIR}/DSC03390.jpg`, name: "salon-2", caption: "salon corridor" },
  { src: `${SRC_SELENA}/DSC05027.JPG`, name: "salon-3", caption: "salon front" },

  // Products / displays
  { src: `${SRC_HAIR}/P1017876.jpg`, name: "products-1", caption: "rack display large" },
  { src: `${SRC_HAIR}/P1017885.jpg`, name: "products-2", caption: "color comparison" },
  { src: `${SRC_SELENA}/DSC04776.JPG`, name: "products-3", caption: "color storage" },
  { src: `${SRC_SELENA}/DSC04800.JPG`, name: "products-4", caption: "color storage 2" },
  { src: `${SRC_SELENA}/DSC04826.JPG`, name: "products-5", caption: "rack closeup" },
  { src: `${SRC_SELENA}/DSC04926.JPG`, name: "products-6", caption: "rack closeup 2" },

  // Detail / process
  { src: `${SRC_SELENA}/DSC04876.JPG`, name: "detail-1", caption: "clip-in extensions" },
  { src: `${SRC_SELENA}/DSC04900.JPG`, name: "detail-2", caption: "three hair types compared" },
  { src: `${SRC_SELENA}/DSC04976.JPG`, name: "detail-3", caption: "styling tool with hair" },
  { src: `${SRC_SELENA}/DSC05000.JPG`, name: "detail-4", caption: "styling tool closeup" },
];

async function ensureDir(p) {
  await mkdir(p, { recursive: true });
}

async function process(src, outBase) {
  const meta = await sharp(src).metadata();
  console.log(`  → ${src.split(/[\\/]/).pop()}: ${meta.width}x${meta.height} (${meta.orientation ?? 1})`);

  // Standard size: 1920w max (landscape) or 1600h max (portrait), JPEG quality 82
  const isPortrait = (meta.height ?? 0) > (meta.width ?? 0);

  await sharp(src)
    .rotate() // honor EXIF orientation
    .resize({
      width: isPortrait ? 1280 : 1920,
      height: isPortrait ? 1920 : 1280,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(`${outBase}.jpg`);

  // Smaller thumb for grids
  await sharp(src)
    .rotate()
    .resize({
      width: isPortrait ? 800 : 1200,
      height: isPortrait ? 1200 : 800,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: 80, progressive: true, mozjpeg: true })
    .toFile(`${outBase}-md.jpg`);
}

async function main() {
  await ensureDir(OUT);
  console.log(`Output: ${OUT}\n`);

  let totalIn = 0;
  let totalOut = 0;
  const fs = await import("node:fs/promises");

  for (const p of photos) {
    try {
      console.log(`[${p.name}] ${p.caption}`);
      await process(p.src, resolve(OUT, p.name));

      const inSt = await fs.stat(p.src);
      const outSt = await fs.stat(resolve(OUT, `${p.name}.jpg`));
      const mdSt = await fs.stat(resolve(OUT, `${p.name}-md.jpg`));
      totalIn += inSt.size;
      totalOut += outSt.size + mdSt.size;
      console.log(
        `  ✓ ${(inSt.size / 1024 / 1024).toFixed(1)}MB → ${(outSt.size / 1024).toFixed(0)}KB + ${(mdSt.size / 1024).toFixed(0)}KB\n`
      );
    } catch (e) {
      console.error(`  ✗ ${e.message}\n`);
    }
  }

  console.log(`Total: ${(totalIn / 1024 / 1024).toFixed(1)}MB → ${(totalOut / 1024 / 1024).toFixed(1)}MB`);
}

main();
