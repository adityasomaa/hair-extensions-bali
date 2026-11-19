import { isAdmin } from "@/lib/admin/auth";
import { dayBookings, dayInfo, deleteBooking, parseInput, saveBooking } from "@/lib/admin/bookings";
import { BOOKING_PATH } from "@/lib/ai/bookings";
import { isDate } from "@/lib/ai/schedule";
import { sameOrigin } from "@/lib/ai/guard";

// Every method checks the admin session here, on the server; the page hiding the panel is
// not the protection.

const json = (status: number, body: object) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
const denied = () => json(401, { error: "Sesi habis. Silakan login lagi." });

async function guard(req: Request, mutating: boolean) {
  if (mutating && !sameOrigin(req)) return json(403, { error: "Forbidden" });
  if (!(await isAdmin())) return denied();
  return null;
}

async function body(req: Request) {
  try {
    return (await req.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

async function run<T>(fn: () => Promise<T>) {
  try {
    return await fn();
  } catch (err) {
    console.error("[admin] calendar error", err instanceof Error ? err.message : err);
    return json(500, { error: "Kalender sedang bermasalah. Coba lagi sebentar." });
  }
}

export async function GET(req: Request) {
  const blocked = await guard(req, false);
  if (blocked) return blocked;
  const date = new URL(req.url).searchParams.get("date") ?? "";
  if (!isDate(date)) return json(400, { error: "Tanggal tidak valid." });
  return run(async () => json(200, { ...dayInfo(date), bookings: await dayBookings(date) }));
}

export async function POST(req: Request) {
  const blocked = await guard(req, true);
  if (blocked) return blocked;
  const input = parseInput(await body(req));
  if (typeof input === "string") return json(400, { error: input });
  return run(async () => {
    const res = await saveBooking(input);
    return res.ok ? json(201, res) : json(409, res);
  });
}

export async function PUT(req: Request) {
  const blocked = await guard(req, true);
  if (blocked) return blocked;
  const b = await body(req);
  const path = typeof b?.path === "string" ? b.path : "";
  if (!BOOKING_PATH.test(path)) return json(400, { error: "Janji tidak dikenali." });
  const input = parseInput(b);
  if (typeof input === "string") return json(400, { error: input });
  return run(async () => {
    const res = await saveBooking(input, path);
    return res.ok ? json(200, res) : json(409, res);
  });
}

export async function DELETE(req: Request) {
  const blocked = await guard(req, true);
  if (blocked) return blocked;
  const b = await body(req);
  const path = typeof b?.path === "string" ? b.path : "";
  if (!BOOKING_PATH.test(path)) return json(400, { error: "Janji tidak dikenali." });
  return run(async () => ((await deleteBooking(path)) ? json(200, { ok: true }) : json(400, { error: "Janji tidak dikenali." })));
}
