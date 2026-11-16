import Anthropic from "@anthropic-ai/sdk";
import { clientIp, sameOrigin } from "@/lib/ai/guard";
import { reply } from "@/lib/ai/receptionist";

const MAX_TURNS = 11;
const MAX_USER_CHARS = 600;
const MAX_ASSISTANT_CHARS = 800;
const MAX_TOTAL_CHARS = 6000;
const MAX_BODY_BYTES = 16_000;
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

  let messages: Anthropic.MessageParam[] | null;
  try {
    const raw = await req.text();
    messages = raw.length > MAX_BODY_BYTES ? null : parseMessages(JSON.parse(raw));
  } catch {
    messages = null;
  }
  if (!messages) return json(400, "Invalid request");

  try {
    const replyStream = reply(messages, { channel: "website", sender: ip });
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
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("[chat] request error", err instanceof Anthropic.APIError ? err.status : err);
    return json(500, "Something went wrong");
  }
}
