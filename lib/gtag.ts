// Google Ads conversion helpers.
//
// The base Google tag (gtag.js, AW-16655338849) is loaded in app/layout.tsx.
// This module fires the "Contact (1)" conversion event — created in Google
// Ads with goal "Contact: a customer makes contact by phone, text, email,
// or chat" — whenever a visitor clicks through to WhatsApp.

export const ADS_ID = "AW-16655338849";

/** Conversion label for "Contact (1)" (Click-type conversion action). */
export const CONTACT_SEND_TO = "AW-16655338849/EC-ICIrOhL0cEOGa8YU-";

/** Conversion label for the booking-form submit conversion action. */
export const BOOKING_SEND_TO = "AW-16655338849/zfY_CLKztr0cEOGa8YU-";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Report a Contact conversion to Google Ads. Fire-and-forget: all our
 * WhatsApp links open in a new tab (or via window.open), so we don't
 * need Google's event_callback redirect dance — gtag uses sendBeacon
 * under the hood and survives the navigation.
 */
export function reportContactConversion() {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", { send_to: CONTACT_SEND_TO });
}

/**
 * Report a Booking conversion — fired ONLY when the booking form is
 * successfully submitted (validation passed, WhatsApp handoff opened).
 * Higher-intent than a plain Contact click, tracked with a nominal
 * value per Google Ads setup.
 */
export function reportBookingConversion() {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", {
    send_to: BOOKING_SEND_TO,
    value: 1.0,
    currency: "IDR",
  });
}
