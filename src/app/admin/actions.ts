"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, checkPassword, expectedToken } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!checkPassword(password)) {
    redirect("/admin?error=1");
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE, expectedToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/admin");
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin");
}
