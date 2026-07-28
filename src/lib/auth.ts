import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "nj_admin";

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD?.trim() || "neginjam1404";
}

function tokenFor(password: string): string {
  return createHash("sha256").update(`negin-jam::${password}`).digest("hex");
}

export function expectedToken(): string {
  return tokenFor(adminPassword());
}

export function checkPassword(candidate: string): boolean {
  const a = Buffer.from(tokenFor(candidate));
  const b = Buffer.from(expectedToken());
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(expectedToken());
  return a.length === b.length && timingSafeEqual(a, b);
}
