import type { Pool } from "./shop";

// The studio's bookable time. Placeholder until the real calendar is connected:
// two stylists, each with one client at a time. To match the business, adjust these values.
export const schedule = {
  timeZone: "Asia/Makassar",
  offset: "+08:00", // Bali (WITA) has no daylight saving
  // The studio opens at 11:00; the AI receptionist offers appointments every half hour
  // from opening, last start 18:30.
  opens: "11:00",
  starts: Array.from({ length: 16 }, (_, i) => `${String(11 + Math.floor(i / 2)).padStart(2, "0")}:${i % 2 ? "30" : "00"}`),
  // Closing time by weekday (0 = Sunday); missing = closed. Open every day 11:00–19:00 WITA.
  closes: { 0: "19:00", 1: "19:00", 2: "19:00", 3: "19:00", 4: "19:00", 5: "19:00", 6: "19:00" } as Record<number, string>,
  bufferMinutes: 0,
  // Each id can take one booking at a time: two stylists (placeholder).
  pools: {
    stylist: [1, 2],
  } as Record<Pool, number[]>,
  minNoticeMinutes: 120,
  maxDaysAhead: 60,
  closedDates: [] as string[], // e.g. "2026-12-25"
};

/** One person's booked time. */
export type Entry = { date: string; start: number; minutes: number; instructor: number };

const DAY_MS = 86_400_000;

export const isDate = (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v));

const at = (date: string, time: string) => new Date(`${date}T${time}:00${schedule.offset}`);
const pad = (n: number) => String(n).padStart(2, "0");
export const toTime = (minutes: number) => `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
export const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export function today(now = new Date()) {
  return now.toLocaleDateString("en-CA", { timeZone: schedule.timeZone });
}

export function addDays(date: string, days: number) {
  return new Date(at(date, "12:00").getTime() + days * DAY_MS).toLocaleDateString("en-CA", { timeZone: schedule.timeZone });
}

export function describeDate(date: string) {
  return at(date, "12:00").toLocaleDateString("en-GB", {
    timeZone: schedule.timeZone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Closing time on a date, or null when the showroom is closed. */
export function closingTime(date: string) {
  if (schedule.closedDates.includes(date)) return null;
  return schedule.closes[at(date, "12:00").getUTCDay()] ?? null;
}

/** People in a pool free for a whole session. */
export function freeInstructors(pool: Pool, date: string, start: number, minutes: number, entries: Entry[]) {
  const end = start + minutes + schedule.bufferMinutes;
  const busy = new Set(
    entries
      .filter((e) => e.date === date && start < e.start + e.minutes + schedule.bufferMinutes && e.start < end)
      .map((e) => e.instructor),
  );
  return schedule.pools[pool].filter((t) => !busy.has(t));
}

/** Start times on a date with enough people free, all finishing by closing time. */
export function freeSlots(pool: Pool, date: string, minutes: number, needed: number, entries: Entry[], now = new Date(), starts = schedule.starts) {
  const first = today(now);
  if (!isDate(date) || date < first || date > addDays(first, schedule.maxDaysAhead)) return [];
  const close = closingTime(date);
  if (!close) return [];

  const earliest = now.getTime() + schedule.minNoticeMinutes * 60_000;
  return starts.filter((time) => {
    const m = toMinutes(time);
    return m + minutes <= toMinutes(close) && at(date, time).getTime() >= earliest && freeInstructors(pool, date, m, minutes, entries).length >= needed;
  });
}

/** The first day after `date` with a free slot, for "nothing free that day". */
export function nextFreeDay(pool: Pool, date: string, minutes: number, needed: number, entries: Entry[], now = new Date(), starts = schedule.starts) {
  for (let i = 1; i <= schedule.maxDaysAhead; i++) {
    const next = addDays(isDate(date) ? date : today(now), i);
    const slots = freeSlots(pool, next, minutes, needed, entries, now, starts);
    if (slots.length) return { date: next, weekday: describeDate(next), free_times: slots };
  }
  return null;
}
