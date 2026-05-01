// Convert source MOV → web-optimized MP4 (H.264) + WebM (VP9) + poster JPG.
// Usage: node scripts/process-videos.mjs
import { spawn } from "node:child_process";
import { mkdir, stat } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WEB = resolve(__dirname, "..");
const ROOT = resolve(WEB, "..");
const SRC = resolve(ROOT, "PHOTOS & VIDEOS/The Hair/Video");
const OUT = resolve(WEB, "public/videos");

const FFMPEG = "C:/Users/User/AppData/Local/Microsoft/WinGet/Links/ffmpeg.exe";

const videos = [
  { src: "P1017906.MOV", name: "showcase-blonde-tape", caption: "stylist holding tape-in extensions" },
  { src: "P1017961.MOV", name: "showcase-wavy-rose", caption: "wavy rose-blonde extension on hanger" },
  { src: "P1017962.MOV", name: "showcase-curly-blonde", caption: "curly blonde extension on hanger" },
  { src: "P1017966.MOV", name: "showcase-platinum", caption: "platinum blonde texture closeup" },
  { src: "P1017970.MOV", name: "showcase-bulk-blonde", caption: "blonde bulk extension showcase" },
  { src: "P1017974.MOV", name: "showcase-bulk-dark", caption: "dark bulk extension showcase" },
];

function run(cmd, args) {
  return new Promise((res, rej) => {
    const child = spawn(cmd, args, { stdio: ["ignore", "pipe", "pipe"] });
    let err = "";
    child.stderr.on("data", (d) => (err += d.toString()));
    child.on("close", (code) => {
      if (code === 0) res();
      else rej(new Error(`exit ${code}: ${err.split("\n").slice(-5).join("\n")}`));
    });
  });
}

async function processOne(src, outBase) {
  const inPath = resolve(SRC, src);

  // MP4 (H.264) — universal compatibility, fast hardware decode
  // -vf scale: max width 1080 maintaining aspect ratio (these are vertical 9:16 → 1080x1920 max)
  const mp4 = `${outBase}.mp4`;
  await run(FFMPEG, [
    "-y", "-i", inPath,
    "-vf", "scale='if(gt(iw,ih),min(1280,iw),-2)':'if(gt(ih,iw),min(1280,ih),-2)'",
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", "26",
    "-pix_fmt", "yuv420p",
    "-an", // no audio
    "-movflags", "+faststart",
    "-loglevel", "error",
    mp4,
  ]);

  // Poster frame (1 second in)
  const poster = `${outBase}-poster.jpg`;
  await run(FFMPEG, [
    "-y", "-ss", "1", "-i", inPath,
    "-frames:v", "1",
    "-vf", "scale='if(gt(iw,ih),min(1280,iw),-2)':'if(gt(ih,iw),min(1280,ih),-2)'",
    "-q:v", "3",
    "-loglevel", "error",
    poster,
  ]);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  console.log(`Output: ${OUT}\n`);

  let totalIn = 0;
  let totalOut = 0;

  for (const v of videos) {
    const inPath = resolve(SRC, v.src);
    const outBase = resolve(OUT, v.name);
    try {
      console.log(`[${v.name}] ${v.caption}`);
      const t0 = Date.now();
      await processOne(v.src, outBase);
      const elapsed = ((Date.now() - t0) / 1000).toFixed(1);

      const inSt = await stat(inPath);
      const mp4St = await stat(`${outBase}.mp4`);
      const psSt = await stat(`${outBase}-poster.jpg`);
      totalIn += inSt.size;
      totalOut += mp4St.size + psSt.size;
      console.log(
        `  ✓ ${(inSt.size / 1024 / 1024).toFixed(1)}MB → ${(mp4St.size / 1024 / 1024).toFixed(1)}MB MP4 + ${(psSt.size / 1024).toFixed(0)}KB poster · ${elapsed}s\n`
      );
    } catch (e) {
      console.error(`  ✗ ${e.message}\n`);
    }
  }

  console.log(`Total: ${(totalIn / 1024 / 1024).toFixed(1)}MB → ${(totalOut / 1024 / 1024).toFixed(1)}MB`);
}

main();
