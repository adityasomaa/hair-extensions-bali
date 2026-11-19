import { randomBytes } from "node:crypto";
import { del, put } from "@vercel/blob";
import { BOOKING_PATH, entries, readBooking, reserve, type Booking } from "@/lib/ai/bookings";
import { closingTime, freeInstructors, isDate, schedule, toMinutes, toTime } from "@/lib/ai/schedule";
import { serviceByName, services } from "@/lib/ai/shop";

// The staff side of the same calendar the AI receptionist books into: one private blob per
// appointment under bookings/<date>/, so whatever staff add here the bot sees as taken.

export const stylists = schedule.pools.stylist;

export type AdminBooking = Booking & { path: string; minutes: number; stylist: number; ends: string };

export type AdminInput = {
  name: string;
  mobile: string;
  service: string;
  date: string;
  time: string;
  minutes: number;
  stylist: number;
  hair: string;
  notes: string;
};

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Validates and normalises what the admin form sent. Returns an error message or the input. */
export function parseInput(body: unknown): AdminInput | string {
  const b = (body ?? {}) as Record<string, unknown>;
  const input: AdminInput = {
    name: clean(b.name, 80),
    mobile: clean(b.mobile, 30).replace(/[^\d+ -]/g, ""),
    service: clean(b.service, 80),
    date: clean(b.date, 10),
    time: clean(b.time, 5),
    minutes: Math.round(Number(b.minutes)),
    stylist: Math.round(Number(b.stylist)),
    hair: clean(b.hair, 200),
    notes: clean(b.notes, 500),
  };
  if (input.name.length < 2) return "Nama klien wajib diisi.";
  if (!serviceByName(input.service)) return "Pilih treatment dari daftar.";
  if (!isDate(input.date)) return "Tanggal tidak valid.";
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(input.time)) return "Jam tidak valid.";
  if (!Number.isFinite(input.minutes) || input.minutes < 15 || input.minutes > 480) return "Durasi harus 15–480 menit.";
  if (!stylists.includes(input.stylist)) return "Pilih stylist.";
  const close = closingTime(input.date);
  if (!close) return "Studio tutup di tanggal itu.";
  const start = toMinutes(input.time);
  if (start < toMinutes(schedule.opens)) return `Studio baru buka jam ${schedule.opens}.`;
  if (start + input.minutes > toMinutes(close)) return `Selesainya lewat jam tutup (${close}).`;
  return input;
}

export async function dayBookings(date: string): Promise<AdminBooking[]> {
  const found = await entries(`bookings/${date}/`);
  const rows = await Promise.all(
    found.map(async (e) => {
      const b = await readBooking(e.pathname);
      if (!b) return null;
      return { ...b, path: e.pathname, minutes: e.minutes, stylist: e.instructor, time: toTime(e.start), ends: toTime(e.start + e.minutes) };
    }),
  );
  return rows.filter((r): r is AdminBooking => r !== null).sort((a, b) => a.time.localeCompare(b.time) || a.stylist - b.stylist);
}

/** Who is already booked at that time for that stylist, for a clear error. */
async function clashWith(input: AdminInput, ignore?: string) {
  const start = toMinutes(input.time);
  const others = (await entries(`bookings/${input.date}/`)).filter((e) => e.pathname !== ignore);
  if (freeInstructors("stylist", input.date, start, input.minutes, others).includes(input.stylist)) return null;
  const hit = others.find(
    (e) => e.instructor === input.stylist && start < e.start + e.minutes && e.start < start + input.minutes,
  );
  return hit ? `Stylist ${input.stylist} sudah ada janji ${toTime(hit.start)}–${toTime(hit.start + hit.minutes)}.` : "Jam itu sudah terisi.";
}

/** Creates (no previous) or updates (previous path) an appointment. */
export async function saveBooking(input: AdminInput, previous?: string) {
  const old = previous ? await readBooking(previous) : null;
  if (previous && !old) return { ok: false as const, error: "Janji ini sudah tidak ada. Muat ulang halaman." };

  const clash = await clashWith(input, previous);
  if (clash) return { ok: false as const, error: clash };

  const booking: Booking = {
    code: old?.code ?? `HE-${randomBytes(2).toString("hex").toUpperCase()}`,
    name: input.name,
    mobile: input.mobile,
    service: input.service,
    date: input.date,
    time: input.time,
    hair: input.hair,
    notes: input.notes,
    channel: old?.channel ?? "admin",
    createdAt: old?.createdAt ?? new Date().toISOString(),
  };
  const path = `bookings/${input.date}/${input.time.replace(":", "")}-${input.minutes}-${input.stylist}.json`;

  if (previous === path) {
    // Same time, length and stylist: only the details changed.
    await put(path, JSON.stringify(booking), { access: "private", contentType: "application/json", allowOverwrite: true });
  } else {
    const ok = await reserve(booking, { minutes: input.minutes, pool: "stylist" }, input.stylist, previous);
    if (!ok) return { ok: false as const, error: "Jam itu baru saja terisi. Muat ulang dan pilih jam lain." };
    if (previous) await del(previous);
  }
  console.info("[admin] saved", booking.code, previous ? "updated" : "created", path);
  return { ok: true as const, code: booking.code };
}

export async function deleteBooking(path: string) {
  if (!BOOKING_PATH.test(path)) return false;
  await del(path);
  console.info("[admin] deleted", path);
  return true;
}

export const dayInfo = (date: string) => ({
  date,
  weekday: new Date(`${date}T12:00:00+08:00`).toLocaleDateString("id-ID", { timeZone: "Asia/Makassar", weekday: "long", day: "numeric", month: "long", year: "numeric" }),
  opens: schedule.opens,
  closes: closingTime(date),
  botFrom: schedule.starts[0],
  stylists,
  services: services.map((s) => ({ name: s.name, minutes: s.minutes })),
});
