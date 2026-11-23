import { randomBytes } from "node:crypto";
import { put } from "@vercel/blob";
import { today } from "./schedule";

// Photos visitors attach in the chat (their hair from behind, a goal picture). The browser
// shrinks them to JPEG first; here they're checked, stored privately, and later attached to
// the booking so staff can see them in /admin.

export const MAX_PHOTOS = 2;
const MAX_BYTES = 700_000;
export const PHOTO_PATH = /^uploads\/\d{4}-\d{2}-\d{2}\/[a-f0-9]{16}\.jpg$/;

/** Decodes the new photos; null if any is not a reasonably sized JPEG. */
export function parsePhotos(raw: unknown): Buffer[] | null {
  if (raw === undefined) return [];
  if (!Array.isArray(raw) || raw.length > MAX_PHOTOS) return null;
  const out: Buffer[] = [];
  for (const p of raw) {
    if (typeof p !== "string" || p.length > MAX_BYTES * 1.4) return null;
    const buf = Buffer.from(p, "base64");
    const isJpeg = buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
    if (!isJpeg || buf.length > MAX_BYTES) return null;
    out.push(buf);
  }
  return out;
}

/** Photo ids the browser already got back from earlier messages. */
export function parsePhotoIds(raw: unknown): string[] | null {
  if (raw === undefined) return [];
  if (!Array.isArray(raw) || raw.length > MAX_PHOTOS) return null;
  return raw.every((p) => typeof p === "string" && PHOTO_PATH.test(p)) ? (raw as string[]) : null;
}

export async function savePhotos(photos: Buffer[]) {
  return Promise.all(
    photos.map(async (buf) => {
      const path = `uploads/${today()}/${randomBytes(8).toString("hex")}.jpg`;
      await put(path, buf, { access: "private", contentType: "image/jpeg" });
      return path;
    }),
  );
}
