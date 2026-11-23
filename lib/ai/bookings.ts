import { randomBytes } from "node:crypto";
import { del, get, list, put } from "@vercel/blob";
import { closingTime, describeDate, freeInstructors, freeSlots, isDate, nextFreeDay, today, toMinutes, toTime, type Entry } from "./schedule";
import { cleanGrams, hoursLabel, minutesFor, serviceByName, shop, type Pool, type Service } from "./shop";

export type Booking = {
  code: string;
  name: string;
  mobile: string;
  service: string;
  date: string;
  time: string;
  hair: string;
  notes: string;
  channel: string;
  createdAt: string;
  /** Grams of hair for installations. */
  grams?: number;
  /** Private blob paths of photos the visitor attached in the chat. */
  photos?: string[];
};

export type BookingRequest = Pick<Booking, "name" | "mobile" | "service" | "date" | "time" | "hair" | "notes"> & { grams?: number };
export type AvailabilityRequest = Pick<Booking, "service" | "date"> & { grams?: number };
export type Sender = { channel: string; sender: string; photos?: string[] };

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 3;

// One private blob per booking, its name holding the time, length and stylist,
// so reading the calendar never opens a file. Blobs refuse to overwrite and each claim is
// re-checked after writing, so two customers racing for the same time can't both win.
export const pathFor = (date: string, time: string, minutes: number, slot: number) =>
  `bookings/${date}/${time.replace(":", "")}-${minutes}-${slot}.json`;
export const BOOKING_PATH = /^bookings\/\d{4}-\d{2}-\d{2}\/\d{4}-\d{1,3}-\d\.json$/;

export async function entries(prefix = "bookings/") {
  const found: (Entry & { pathname: string })[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix, cursor });
    for (const { pathname } of page.blobs) {
      const [, date, file] = pathname.split("/");
      const [time, minutes, slot] = file.replace(".json", "").split("-");
      found.push({ pathname, date, start: toMinutes(`${time.slice(0, 2)}:${time.slice(2)}`), minutes: +minutes, instructor: +slot });
    }
    cursor = page.cursor;
  } while (cursor);
  return found;
}

/**
 * Claims the slot. False means someone else just took the time. `ignore` leaves one
 * booking out of the clash check (the one being moved by the admin panel).
 */
export async function reserve(booking: Booking, length: { minutes: number; pool: Pool }, slot: number, ignore?: string) {
  const start = toMinutes(booking.time);
  const path = pathFor(booking.date, booking.time, length.minutes, slot);
  let written = false;
  try {
    await put(path, JSON.stringify(booking), { access: "private", contentType: "application/json" });
    written = true;
    const others = (await entries()).filter((e) => e.pathname !== path && e.pathname !== ignore);
    if (freeInstructors(length.pool, booking.date, start, length.minutes, others).includes(slot)) return true;
  } catch (err) {
    if (!(err instanceof Error && err.message.includes("already exists"))) throw err;
  }
  if (written) await del(path);
  return false;
}

/** A stored booking's details, or null if it has gone. */
export async function readBooking(pathname: string) {
  const res = await get(pathname, { access: "private", useCache: false });
  if (!res || res.statusCode !== 200) return null;
  return JSON.parse(await new Response(res.stream).text()) as Booking;
}

// Best-effort per-instance limit, so one visitor can't fill the calendar.
const recent = new Map<string, number[]>();
function limited(sender: string) {
  const now = Date.now();
  const times = (recent.get(sender) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.set(sender, times);
  if (recent.size > 5000) recent.clear();
  return times.length >= MAX_PER_WINDOW;
}

const slotsFor = (service: Service, minutes: number, date: string, taken: Entry[]) => freeSlots(service.pool, date, minutes, 1, taken);

export async function availability({ service: name, date, grams: rawGrams }: AvailabilityRequest) {
  const service = serviceByName(name);
  if (!service) return { date, free_times: [] };
  const grams = cleanGrams(rawGrams);
  const minutes = minutesFor(service, grams);
  const taken = await entries();
  const free = slotsFor(service, minutes, date, taken);
  if (free.length)
    return { date, weekday: describeDate(date), service: service.name, ...(service.perHundred ? { grams } : {}), free_times: free, length: hoursLabel(minutes) };
  // Say why, so "nothing left today" isn't reported as "fully booked"
  const why =
    date === today() ? "No more appointment times today." : !closingTime(date) ? "The showroom is closed that day." : "Fully booked that day.";
  return {
    date,
    free_times: [],
    why,
    next_available: nextFreeDay(service.pool, date, minutes, 1, taken),
  };
}

/** Used by every channel: the receptionist's tool and the website form. */
export async function createBooking(input: BookingRequest, from: Sender) {
  const name = input.name.trim().slice(0, 80);
  const mobile = input.mobile.replace(/[^\d+]/g, "");
  const digits = mobile.replace(/\D/g, "");
  const hair = input.hair.trim().slice(0, 200);
  const service = serviceByName(input.service);
  if (name.length < 2) return { booked: false as const, reason: "The customer's name is missing." };
  if (digits.length < 8 || digits.length > 15) return { booked: false as const, reason: "That mobile number doesn't look complete." };
  if (hair.length < 2) return { booked: false as const, reason: "A short description of the client's natural hair and what they want is missing." };
  if (!service) return { booked: false as const, reason: "That isn't one of the services." };
  if (limited(from.sender)) return { booked: false as const, reason: "Too many bookings from this visitor. Please message the team on WhatsApp." };

  const grams = cleanGrams(input.grams);
  const minutes = minutesFor(service, grams);
  const taken = await entries();
  const refused = {
    booked: false as const,
    reason: "That time isn't free.",
    free_times: isDate(input.date) ? slotsFor(service, minutes, input.date, taken) : [],
  };
  if (!refused.free_times.includes(input.time)) return refused;

  const start = toMinutes(input.time);
  const code = `HE-${randomBytes(2).toString("hex").toUpperCase()}`;
  const slot = freeInstructors(service.pool, input.date, start, minutes, taken)[0];
  const ok = await reserve(
    {
      code,
      name,
      mobile,
      service: service.name,
      date: input.date,
      time: input.time,
      hair,
      notes: input.notes.trim().slice(0, 500),
      channel: from.channel,
      createdAt: new Date().toISOString(),
      ...(service.perHundred ? { grams } : {}),
      ...(from.photos?.length ? { photos: from.photos } : {}),
    },
    { minutes, pool: service.pool },
    slot,
  );
  if (!ok) return refused;

  recent.get(from.sender)?.push(Date.now());
  return {
    booked: true as const,
    code,
    service: service.name,
    hair,
    weekday: describeDate(input.date),
    time: input.time,
    ends: toTime(start + minutes),
    ...(from.photos?.length ? { photos_saved: from.photos.length } : {}),
    address: shop.addressShort,
    next_steps:
      service.id === "visit"
        ? "Come with clean, dry hair if you can, so the colour match is accurate. The team will show you the shades and give you the exact price before anything is fitted."
        : "Come with clean, dry hair and no oil or styling products. Send a photo of your hair to the team on WhatsApp beforehand so the right shade and grams are ready for you.",
  };
}
