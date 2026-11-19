import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

// One shared staff password (ADMIN_PASSWORD, server-only env). The session cookie is
// "<expiry>.<hmac>" keyed on that password, so changing the password logs everyone out.
// Without the env var the panel stays locked: there is no default password.

export const COOKIE = "he_admin";
export const SESSION_SECONDS = 12 * 60 * 60;

const password = () => process.env.ADMIN_PASSWORD ?? "";
export const adminConfigured = () => password().length >= 8;

const sign = (exp: string) => createHmac("sha256", `he-admin-session:${password()}`).update(exp).digest("base64url");
const sha = (v: string) => createHash("sha256").update(v).digest();

export function checkPassword(input: string) {
  return adminConfigured() && timingSafeEqual(sha(input), sha(password()));
}

export function newSession() {
  const exp = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
  return `${exp}.${sign(exp)}`;
}

export function validSession(token: string | undefined) {
  if (!token || !adminConfigured()) return false;
  const [exp, mac] = token.split(".");
  if (!exp || !mac || !/^\d+$/.test(exp) || Number(exp) * 1000 < Date.now()) return false;
  const expected = Buffer.from(sign(exp));
  const given = Buffer.from(mac);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

/** For server components and route handlers: is this request from a logged-in admin? */
export async function isAdmin() {
  return validSession((await cookies()).get(COOKIE)?.value);
}
