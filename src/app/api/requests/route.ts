import { db } from "@/db";
import { serviceRequests } from "@/db/schema";
import { getServices } from "@/db/seed";
import { isAdmin } from "@/lib/auth";
import { generateTrackingCode, validateRequest } from "@/lib/requests";
import { STATUS_ORDER } from "@/lib/site";
import { desc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: "داده ارسالی نامعتبر است." }, { status: 400 });
  }

  const services = await getServices();
  const slugToTitle = Object.fromEntries(services.map((s) => [s.slug, s.title]));
  const result = validateRequest(body, Object.keys(slugToTitle), slugToTitle);

  if (!result.ok) {
    return Response.json(
      { ok: false, message: "لطفاً اطلاعات فرم را بررسی کنید.", errors: result.errors },
      { status: 422 },
    );
  }

  try {
    let code = generateTrackingCode();
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const [existing] = await db
        .select({ id: serviceRequests.id })
        .from(serviceRequests)
        .where(eq(serviceRequests.code, code))
        .limit(1);
      if (!existing) break;
      code = generateTrackingCode();
    }

    const [created] = await db
      .insert(serviceRequests)
      .values({ ...result.data, code })
      .returning({ code: serviceRequests.code, createdAt: serviceRequests.createdAt });

    return Response.json(
      {
        ok: true,
        code: created.code,
        message: "درخواست شما با موفقیت ثبت شد. کارشناسان ما به‌زودی تماس می‌گیرند.",
      },
      { status: 201 },
    );
  } catch {
    return Response.json(
      { ok: false, message: "خطا در ثبت درخواست. لطفاً دوباره تلاش کنید یا تماس بگیرید." },
      { status: 500 },
    );
  }
}

export async function GET() {
  if (!(await isAdmin())) {
    return Response.json({ ok: false, message: "دسترسی غیرمجاز" }, { status: 401 });
  }

  const rows = await db
    .select()
    .from(serviceRequests)
    .orderBy(desc(serviceRequests.createdAt))
    .limit(200);

  return Response.json({ ok: true, requests: rows });
}

export async function PATCH(request: Request) {
  if (!(await isAdmin())) {
    return Response.json({ ok: false, message: "دسترسی غیرمجاز" }, { status: 401 });
  }

  let body: { id?: number; status?: string };
  try {
    body = (await request.json()) as { id?: number; status?: string };
  } catch {
    return Response.json({ ok: false, message: "داده نامعتبر" }, { status: 400 });
  }

  const id = Number(body.id);
  const status = String(body.status ?? "");

  if (!Number.isInteger(id) || !STATUS_ORDER.includes(status as (typeof STATUS_ORDER)[number])) {
    return Response.json({ ok: false, message: "پارامتر نامعتبر" }, { status: 400 });
  }

  const [updated] = await db
    .update(serviceRequests)
    .set({ status, updatedAt: new Date() })
    .where(eq(serviceRequests.id, id))
    .returning();

  if (!updated) {
    return Response.json({ ok: false, message: "درخواست یافت نشد" }, { status: 404 });
  }

  return Response.json({ ok: true, request: updated });
}
