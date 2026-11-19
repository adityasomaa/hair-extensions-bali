// Prints every appointment in the calendar store: node --env-file=.env.local scripts/list-bookings.mjs
import { get, list } from "@vercel/blob";

let cursor;
do {
  const page = await list({ prefix: "bookings/", cursor });
  for (const b of page.blobs) {
    const res = await get(b.pathname, { access: "private", useCache: false });
    const j = res?.statusCode === 200 ? JSON.parse(await new Response(res.stream).text()) : {};
    console.log(b.pathname, "|", j.code, "|", j.name, "|", j.service, "|", j.channel);
  }
  cursor = page.cursor;
} while (cursor);
