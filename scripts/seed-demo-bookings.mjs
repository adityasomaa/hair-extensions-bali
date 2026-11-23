// Demo appointments for the next three days, so the AI receptionist and /admin have a
// realistic calendar to show. Same store and file naming as lib/ai/bookings.ts:
// bookings/<date>/<HHMM>-<minutes>-<stylist>.json, channel "demo".
//
// Run: node --env-file=.env.local scripts/seed-demo-bookings.mjs
// Re-running skips appointments that already exist. Delete them from /admin.

import { randomBytes } from "node:crypto";
import { put } from "@vercel/blob";

const DAY_MS = 86_400_000;
const bali = (offset) => new Date(Date.now() + offset * DAY_MS).toLocaleDateString("en-CA", { timeZone: "Asia/Makassar" });

// [day offset, time, minutes, stylist, name, mobile, service, hair, grams]
// Installations: Keratin Bond / Nano Ring 2 hours per 100 g, Weft 1 hour per 100 g.
const DEMO = [
  [1, "12:00", 180, 1, "Emma Wilson", "+61 400 000 101", "Keratin Bond or Nano Ring installation", "shoulder length, fine, light brown; wants 55 cm keratin bond", 150],
  [1, "12:30", 90, 2, "Sari Dewi", "+62 812 0000 0102", "Weft (sew-in) installation", "long, thick, black; wants more volume", 150],
  [1, "15:30", 30, 1, "Chloe Martin", "+61 400 000 103", "Shop visit & colour match", "bob, blonde balayage; undecided on method"],
  [1, "16:00", 120, 2, "Olivia Brown", "+44 7700 000104", "Maintenance / move-up", "existing nano rings, 2 months old, move-up"],
  [2, "12:00", 120, 1, "Jessica Taylor", "+61 400 000 105", "Maintenance / move-up", "existing keratin bonds from us, 3 months old"],
  [2, "13:00", 120, 2, "Ayu Lestari", "+62 813 0000 0106", "Keratin Bond or Nano Ring installation", "short, very fine, dark brown; nano ring", 100],
  [2, "15:00", 30, 1, "Mia Thompson", "+61 400 000 107", "Halo or clip-in fitting", "long, thin ends; halo 50 cm"],
  [3, "12:00", 60, 1, "Hannah Lee", "+61 400 000 108", "Weft (sew-in) installation", "shoulder length, medium, copper", 100],
  [3, "14:00", 30, 2, "Putu Ratna", "+62 857 0000 0109", "Shop visit & colour match", "long, black; colour match for highlights"],
];

for (const [offset, time, minutes, stylist, name, mobile, service, hair, grams] of DEMO) {
  const date = bali(offset);
  const code = `HE-${randomBytes(2).toString("hex").toUpperCase()}`;
  const path = `bookings/${date}/${time.replace(":", "")}-${minutes}-${stylist}.json`;
  const booking = { code, name, mobile, service, date, time, hair, notes: "Contoh janji temu (demo).", channel: "demo", createdAt: new Date().toISOString(), ...(grams ? { grams } : {}) };
  try {
    await put(path, JSON.stringify(booking), { access: "private", contentType: "application/json" });
    console.log("added  ", path, name);
  } catch (err) {
    if (!(err instanceof Error && err.message.includes("already exists"))) throw err;
    console.log("exists ", path);
  }
}
