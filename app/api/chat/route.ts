import Anthropic from "@anthropic-ai/sdk";
import { clientIp, sameOrigin } from "@/lib/ai/guard";
import { MAX_PHOTOS, parsePhotoIds, parsePhotos, savePhotos } from "@/lib/ai/photos";
import type { Lang } from "@/lib/ai/prompt";
import { reply } from "@/lib/ai/receptionist";

const MAX_TURNS = 11;
const MAX_USER_CHARS = 600;
const MAX_ASSISTANT_CHARS = 800;
const MAX_TOTAL_CHARS = 6000;
// Text is capped by MAX_TOTAL_CHARS; the rest is room for two ~700 KB photos as base64.
const MAX_BODY_BYTES = 2_000_000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 25;

// Best-effort per-instance limiter. Real guards: the Vercel Firewall rate limit on /api/chat
// and the Claude Console spend limit.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_REQUESTS;
}

function parseMessages(body: unknown): Anthropic.MessageParam[] | null {
  const raw = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > 40) return null;
  const msgs: Anthropic.MessageParam[] = [];
  let total = 0;
  for (const m of raw.slice(-MAX_TURNS)) {
    const role = (m as { role?: unknown })?.role;
    const content = (m as { content?: unknown })?.content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim().slice(0, role === "user" ? MAX_USER_CHARS : MAX_ASSISTANT_CHARS);
    if (!text) continue;
    if (msgs.at(-1)?.role === role) return null; // must alternate
    total += text.length;
    msgs.push({ role, content: text });
  }
  while (msgs[0]?.role === "assistant") msgs.shift();
  if (msgs.at(-1)?.role !== "user" || total > MAX_TOTAL_CHARS) return null;
  return msgs;
}

const json = (status: number, error: string) => Response.json({ error }, { status });

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json(403, "Forbidden");
  if (!req.headers.get("content-type")?.startsWith("application/json")) return json(415, "Unsupported media type");
  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) return json(413, "Payload too large");

  const ip = clientIp(req);
  if (limited(ip)) return json(429, "Too many requests");

  let body: Record<string, unknown> = {};
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) return json(413, "Payload too large");
    body = JSON.parse(raw);
  } catch {
    return json(400, "Invalid request");
  }
  const messages = parseMessages(body);
  const photos = parsePhotos(body.photos);
  const photoIds = parsePhotoIds(body.photoIds);
  const lang: Lang = body.lang === "id" ? "id" : "en";
  if (!messages || !photos || !photoIds || photos.length + photoIds.length > MAX_PHOTOS) return json(400, "Invalid request");

  // New photos are stored for the booking and shown to the receptionist with this message.
  let ids = photoIds;
  if (photos.length) {
    try {
      ids = [...photoIds, ...(await savePhotos(photos))];
    } catch (err) {
      console.error("[chat] photo upload error", err instanceof Error ? err.message : err);
      return json(500, "Photo upload failed");
    }
    const last = messages[messages.length - 1];
    messages[messages.length - 1] = {
      role: "user",
      content: [
        ...photos.map((b) => ({ type: "image" as const, source: { type: "base64" as const, media_type: "image/jpeg" as const, data: b.toString("base64") } })),
        { type: "text" as const, text: String(last.content) },
      ],
    };
  }

  try {
    const replyStream = reply(messages, { channel: "website", sender: ip, photos: ids }, lang);
    const encoder = new TextEncoder();
    const body = new ReadableStream<Uint8Array>({
      async start(controller) {
        let sent = false;
        try {
          for await (const text of replyStream) {
            controller.enqueue(encoder.encode(text));
            sent = true;
          }
        } catch (err) {
          console.error("[chat] stream error", err instanceof Anthropic.APIError ? err.status : err);
          const msg = "Sorry, something went wrong. Please message the team on WhatsApp.";
          controller.enqueue(encoder.encode(sent ? `\n\n${msg}` : msg));
        } finally {
          controller.close();
        }
      },
      cancel() {
        replyStream.return(undefined);
      },
    });

    return new Response(body, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Photo-Ids": ids.join(",") },
    });
  } catch (err) {
    console.error("[chat] request error", err instanceof Anthropic.APIError ? err.status : err);
    return json(500, "Something went wrong");
  }
}
