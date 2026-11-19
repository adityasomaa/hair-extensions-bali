import { cookies } from "next/headers";
import { adminConfigured, checkPassword, COOKIE, newSession, SESSION_SECONDS } from "@/lib/admin/auth";
import { clientIp, sameOrigin } from "@/lib/ai/guard";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILS = 5;

// Best-effort per-instance limit on wrong passwords; the Vercel Firewall rate limit on /api/
// is the real guard.
const fails = new Map<string, number[]>();
const recentFails = (ip: string) => (fails.get(ip) ?? []).filter((t) => Date.now() - t < WINDOW_MS);

const json = (status: number, body: object) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json(403, { error: "Forbidden" });
  if (!adminConfigured()) return json(503, { error: "Admin belum diaktifkan." });

  const ip = clientIp(req);
  if (recentFails(ip).length >= MAX_FAILS) return json(429, { error: "Terlalu banyak percobaan. Coba lagi 15 menit lagi." });

  let password = "";
  try {
    const body = (await req.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password.slice(0, 200) : "";
  } catch {
    return json(400, { error: "Permintaan tidak valid." });
  }

  if (!checkPassword(password)) {
    fails.set(ip, [...recentFails(ip), Date.now()]);
    if (fails.size > 5000) fails.clear();
    console.warn("[admin] failed login", ip);
    return json(401, { error: "Password salah." });
  }

  fails.delete(ip);
  (await cookies()).set(COOKIE, newSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
  console.info("[admin] login", ip);
  return json(200, { ok: true });
}
