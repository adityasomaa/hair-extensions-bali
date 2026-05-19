import "server-only";
import { googleReviews as fallback, type GoogleReview } from "./content";

const REVALIDATE_SECONDS = 3600; // 1 hour
const PLACES_API_URL = "https://places.googleapis.com/v1/places";
const MIN_RATING = 4;

/**
 * Raw shape from Google Places API (New) for a single review.
 * See: https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places#Review
 */
type RawReview = {
  name?: string;
  rating?: number;
  text?: { text?: string; languageCode?: string };
  originalText?: { text?: string; languageCode?: string };
  authorAttribution?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  };
  relativePublishTimeDescription?: string;
  publishTime?: string;
};

type PlacesResponse = {
  reviews?: RawReview[];
  rating?: number;
  userRatingCount?: number;
};

/**
 * Fetch live Google Reviews for the business, filter to 4+ stars,
 * normalise to our `GoogleReview` shape. Cached for 1 hour via ISR.
 *
 * Requires env vars:
 *   GOOGLE_PLACES_API_KEY  — restricted to Places API (New)
 *   GOOGLE_PLACE_ID        — the business's Place ID
 *
 * If either env var is missing, OR the API call fails for any reason,
 * we silently fall back to the manual `googleReviews` array in
 * `lib/content.ts` so the page never breaks.
 *
 * Google's API returns at most 5 reviews per fetch — this is a hard
 * limit of the Places API and cannot be paginated. The reviews returned
 * are Google's mix of "most relevant" + "most recent". After filtering
 * to 4+ stars there may be fewer than 5; if zero remain after filter,
 * we fall back to the manual list.
 */
export async function getReviews(): Promise<GoogleReview[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    if (process.env.NODE_ENV === "development") {
      console.info(
        "[reviews] GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID not set — using manual fallback."
      );
    }
    return fallback;
  }

  try {
    const res = await fetch(`${PLACES_API_URL}/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        // Field mask — fetch only what we need (cheaper, faster)
        "X-Goog-FieldMask": "reviews,rating,userRatingCount",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(
        `[reviews] Places API HTTP ${res.status}:`,
        body.slice(0, 500)
      );
      return fallback;
    }

    const data = (await res.json()) as PlacesResponse;
    const raw = data.reviews ?? [];

    const filtered = raw
      .filter(
        (r): r is RawReview & { rating: number } =>
          typeof r.rating === "number" && r.rating >= MIN_RATING
      )
      .map(normaliseReview)
      .filter((r): r is GoogleReview => r !== null);

    return filtered.length ? filtered : fallback;
  } catch (err) {
    console.error("[reviews] fetch failed:", err);
    return fallback;
  }
}

function normaliseReview(raw: RawReview & { rating: number }): GoogleReview | null {
  const quote = (raw.text?.text ?? raw.originalText?.text ?? "").trim();
  if (!quote) return null; // Skip rating-only reviews

  const rating = clampRating(raw.rating);
  if (rating === null) return null;

  return {
    rating,
    quote,
    name: raw.authorAttribution?.displayName?.trim() || "Google user",
    location: "Verified Google review",
    service: "",
    when: raw.relativePublishTimeDescription || "recent",
  };
}

function clampRating(n: number): 4 | 5 | null {
  if (n >= 5) return 5;
  if (n >= 4) return 4;
  return null;
}

/** Convenience export for the home page. */
export type { GoogleReview };
