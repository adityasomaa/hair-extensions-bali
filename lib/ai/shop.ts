// The receptionist's view of the business. Brand facts come from lib/content.ts (the site's
// single source of truth); this file only adds what the booking calendar needs.
import { brand } from "@/lib/content";

export const shop = {
  name: brand.name,
  address: brand.address,
  addressShort: `${brand.street}, ${brand.locality}`,
  whatsapp: brand.whatsapp.replace(/\D/g, ""),
  whatsappDisplay: brand.whatsappDisplay,
  instagram: brand.instagram,
  hours: brand.hours,
};

export type Pool = "stylist";

export type Service = {
  id: string;
  name: string;
  /** Minutes the chair is booked (for 100 g on installations). */
  minutes: number;
  /** Installations scale with the hair bought: minutes per 100 g (confirmed by the studio, 21 Nov 2026). */
  perHundred?: number;
  pool: Pool;
  short: string;
  length: string;
};

export const services: Service[] = [
  { id: "visit", name: "Shop visit & colour match", minutes: 30, pool: "stylist", short: "Browse the wall, match your shade in daylight and get your exact quote.", length: "30 min" },
  { id: "bond", name: "Keratin Bond or Nano Ring installation", minutes: 120, perHundred: 120, pool: "stylist", short: "Strand-by-strand methods, about 2 hours per 100 g.", length: "about 2 hours per 100 g" },
  { id: "weft", name: "Weft (sew-in) installation", minutes: 60, perHundred: 60, pool: "stylist", short: "Sewn-in wefts, about 1 hour per 100 g.", length: "about 1 hour per 100 g" },
  { id: "halo", name: "Halo or clip-in fitting", minutes: 30, pool: "stylist", short: "Choose your set and learn to put it on yourself.", length: "30 min" },
  { id: "maintenance", name: "Maintenance / move-up", minutes: 120, pool: "stylist", short: "Remove, re-bond or move up your existing extensions.", length: "about 2 hours" },
];

export const serviceNames = services.map((s) => s.name);

/** Grams the visitor is buying: whole number from 50 to 500, 100 when unknown. */
export const cleanGrams = (g: unknown) => (Number.isInteger(g) && (g as number) >= 50 && (g as number) <= 500 ? (g as number) : 100);

/** Minutes a stylist is booked for this appointment, rounded up to the half hour. */
export function minutesFor(service: Service, grams = 100) {
  if (!service.perHundred) return service.minutes;
  return Math.max(30, Math.ceil(((grams / 100) * service.perHundred) / 30) * 30);
}

export const hoursLabel = (m: number) => (m < 60 ? `${m} minutes` : `${m / 60} hour${m === 60 ? "" : "s"}`);
export const serviceByName = (name: string) => services.find((s) => s.name === name);
