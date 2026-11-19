import { cookies } from "next/headers";
import { COOKIE } from "@/lib/admin/auth";
import { sameOrigin } from "@/lib/ai/guard";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return Response.json({ error: "Forbidden" }, { status: 403 });
  (await cookies()).delete(COOKIE);
  return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
