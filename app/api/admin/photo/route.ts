import { get } from "@vercel/blob";
import { isAdmin } from "@/lib/admin/auth";
import { PHOTO_PATH } from "@/lib/ai/photos";

// Visitors' chat photos are private blobs; staff see them through here, logged in only.
export async function GET(req: Request) {
  if (!(await isAdmin())) return new Response("Unauthorized", { status: 401 });
  const path = new URL(req.url).searchParams.get("path") ?? "";
  if (!PHOTO_PATH.test(path)) return new Response("Not found", { status: 404 });
  try {
    const res = await get(path, { access: "private" });
    if (!res || res.statusCode !== 200) return new Response("Not found", { status: 404 });
    return new Response(res.stream, { headers: { "Content-Type": "image/jpeg", "Cache-Control": "private, max-age=3600" } });
  } catch (err) {
    console.error("[admin] photo error", err instanceof Error ? err.message : err);
    return new Response("Not found", { status: 404 });
  }
}
