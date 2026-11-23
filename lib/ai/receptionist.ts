import Anthropic from "@anthropic-ai/sdk";
import { availability, createBooking, type AvailabilityRequest, type BookingRequest, type Sender } from "./bookings";
import { serviceNames, shop } from "./shop";
import { contextBlock, SYSTEM_PROMPT, type Lang } from "./prompt";

// The receptionist itself, independent of where the conversation happens: the website's
// /api/chat is one channel, and WhatsApp or Instagram can call reply() the same way.

const MODEL = "claude-haiku-5-5";
// Room for adaptive thinking, tool calls and a confirmation; 400 could end in an empty reply.
const MAX_OUTPUT_TOKENS = 2000;
const MAX_TOOL_ROUNDS = 4;

const client = new Anthropic();

const SERVICE = { type: "string", enum: serviceNames, description: "The appointment type, exactly as named in the list." };
const GRAMS = {
  type: "integer",
  description: "Grams of hair for an installation (it sets how long the appointment is). 100 if they don't know yet, and 100 for appointments that aren't installations.",
};
const MAINTENANCE_METHODS = ["Keratin Bond", "Nano Ring", "Weft", "all"];

/** Shown to the visitor as a price table in the chat, not as text. */
export const tableMarker = (method: string) => `[[maintenance:${method.toLowerCase().replace(/\s+/g, "-")}]]`;

const TOOLS: Anthropic.Tool[] = [
  {
    name: "check_availability",
    description:
      "List the free appointment start times on a date for an appointment type, in Bali time (WITA). Returns the next day with free times when that date has none.",
    strict: true,
    input_schema: {
      type: "object",
      properties: {
        service: SERVICE,
        date: { type: "string", description: "The date, as YYYY-MM-DD." },
        grams: GRAMS,
      },
      required: ["service", "date", "grams"],
      additionalProperties: false,
    },
  },
  {
    name: "book_appointment",
    description:
      "Book a free time. It is confirmed the moment this succeeds, so call it only once the customer has chosen the appointment type and time and given their name, WhatsApp number and a description of their hair.",
    strict: true,
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string", description: "The customer's full name." },
        mobile: { type: "string", description: "The customer's WhatsApp number, as given." },
        service: SERVICE,
        grams: GRAMS,
        date: { type: "string", description: "The date, as YYYY-MM-DD." },
        time: { type: "string", description: "A time from check_availability, as HH:MM." },
        hair: { type: "string", description: "Their natural hair and the result they want, as they described it, e.g. 'shoulder length, fine, dark brown; wants 50 cm, keratin bond'." },
        notes: { type: "string", description: "Garments and how many, style or colour in mind, number of people in a wedding party, budget if mentioned. Empty if none." },
      },
      required: ["name", "mobile", "service", "grams", "date", "time", "hair", "notes"],
      additionalProperties: false,
    },
  },
  {
    name: "show_maintenance_prices",
    description:
      "Show the maintenance price table (remove, re-install, new glue, weft repositioning; with hair bought from us and with outside hair) in the chat. Use it whenever someone asks about maintenance, move-ups, refits or removal prices.",
    strict: true,
    input_schema: {
      type: "object",
      properties: {
        method: { type: "string", enum: MAINTENANCE_METHODS, description: "The method they asked about, or all." },
      },
      required: ["method"],
      additionalProperties: false,
    },
  },
];

async function runTool(tool: Anthropic.ToolUseBlock, from: Sender): Promise<Anthropic.ToolResultBlockParam> {
  try {
    const result =
      tool.name === "show_maintenance_prices"
        ? { shown: true, note: "The visitor now sees the table. Don't repeat the numbers; add one short line at most." }
        : tool.name === "check_availability"
          ? await availability(tool.input as AvailabilityRequest)
          : await createBooking(tool.input as BookingRequest, from);
    return { type: "tool_result", tool_use_id: tool.id, content: JSON.stringify(result) };
  } catch (err) {
    console.error("[receptionist] tool error", tool.name, err instanceof Error ? err.message : err);
    return { type: "tool_result", tool_use_id: tool.id, is_error: true, content: "The calendar is unavailable right now." };
  }
}

/** Streams the receptionist's reply, running its tools along the way. */
export async function* reply(messages: Anthropic.MessageParam[], from: Sender, lang: Lang = "en"): AsyncGenerator<string> {
  const convo = [...messages];
  let sent = false;

  for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: MAX_OUTPUT_TOKENS,
      thinking: { type: "adaptive" },
      output_config: { effort: "low" },
      tools: TOOLS,
      system: [
        { type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
        { type: "text", text: contextBlock(new Date(), lang) },
      ],
      messages: convo,
    });

    let wrote = false;
    let done = false;
    try {
      for await (const event of stream) {
        if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
          yield event.delta.text;
          sent = wrote = true;
        }
      }
      done = true;
    } finally {
      if (!done) stream.abort(); // the visitor left mid-reply
    }

    const final = await stream.finalMessage();
    if (final.stop_reason === "refusal") {
      yield "I can't help with that here. Please message the team on WhatsApp and they'll help you.";
      return;
    }
    if (final.stop_reason !== "tool_use") {
      if (final.stop_reason === "max_tokens" && sent) yield "…";
      if (!sent) {
        console.error("[receptionist] no text in reply", final.stop_reason);
        yield `Sorry, I couldn't answer that just now. Please message the team on WhatsApp: ${shop.whatsappDisplay}`;
      }
      return;
    }

    if (wrote) yield "\n\n";
    const calls = final.content.filter((b): b is Anthropic.ToolUseBlock => b.type === "tool_use");
    for (const c of calls) {
      if (c.name === "show_maintenance_prices") {
        yield `${tableMarker(String((c.input as { method?: string }).method ?? "all"))}\n\n`;
        sent = true;
      }
    }
    convo.push({ role: "assistant", content: final.content });
    convo.push({ role: "user", content: await Promise.all(calls.map((c) => runTool(c, from))) });
  }

  console.error("[receptionist] ran out of tool rounds");
  yield `Sorry, I couldn't finish that. Please message the team on WhatsApp: ${shop.whatsappDisplay}`;
}
