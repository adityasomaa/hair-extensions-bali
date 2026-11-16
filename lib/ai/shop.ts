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
  /** Minutes the chair is booked. Placeholders until the team confirms real timings. */
  minutes: number;
  pool: Pool;
  short: string;
  length: string;
};

export const services: Service[] = [
  { id: "visit", name: "Shop visit & colour match", minutes: 30, pool: "stylist", short: "Browse the wall, match your shade in daylight and get your exact quote.", length: "30 min" },
  { id: "bond", name: "Keratin Bond or Nano Ring installation", minutes: 180, pool: "stylist", short: "Strand-by-strand methods, about 1 hour per 100 strands.", length: "about 3 hours" },
  { id: "weft", name: "Weft (sew-in) installation", minutes: 150, pool: "stylist", short: "Sewn-in wefts, about 2 hours for 100–200 g.", length: "about 2.5 hours" },
  { id: "tape", name: "Tape-in installation", minutes: 90, pool: "stylist", short: "About 30 minutes per 20 pieces.", length: "about 1.5 hours" },
  { id: "halo", name: "Halo or clip-in fitting", minutes: 30, pool: "stylist", short: "Choose your set and learn to put it on yourself.", length: "30 min" },
  { id: "maintenance", name: "Maintenance / move-up", minutes: 120, pool: "stylist", short: "Remove, re-bond or re-tape your existing extensions.", length: "about 2 hours" },
];

export const serviceNames = services.map((s) => s.name);
export const serviceByName = (name: string) => services.find((s) => s.name === name);
