import { db } from "@/db";
import { partnershipRequests } from "@/db/schema";
import { isAdmin } from "@/lib/auth";
import { generateTrackingCode } from "@/lib/requests";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: "داده ارسالی نامعتبر است." }, { status: 400 });
  }

  const raw = (body ?? {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const fullName = str(raw.fullName);
  const phone = str(raw.phone).replace(/[\s-]/g, "");
  const businessName = str(raw.businessName);
  const businessType = str(raw.businessType);
  const partnershipArea = str(raw.partnershipArea);
  const notes = str(raw.notes).slice(0, 600);

  const errors: Record<string, string> = {};
  if (fullName.length < 3) errors.fullName = "نام و نام خانوادگی را کامل وارد کنید.";
  if (!/^0?9\d{9}$/.test(phone) && !/^0?\d{10}$/.test(phone)) {
    errors.phone = "شماره تماس معتبر نیست.";
  }
  if (!partnershipArea) errors.partnershipArea = "حوزه همکاری را انتخاب کنید.";

  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  try {
    const code = `NJP-${generateTrackingCode().replace("NJ-", "")}`;
    const [created] = await db
      .insert(partnershipRequests)
      .values({
        code,
        fullName: fullName.slice(0, 120),
        phone: phone.startsWith("0") ? phone : `0${phone}`,
        businessName: businessName.slice(0, 160),
        businessType: businessType.slice(0, 100),
        partnershipArea: partnershipArea.slice(0, 200),
        notes,
      })
      .returning({ code: partnershipRequests.code });

    return Response.json(
      {
        ok: true,
        code: created.code,
        message: "درخواست همکاری شما ثبت شد. کارشناسان ما به‌زودی با شما تماس می‌گیرند.",
      },
      { status: 201 },
    );
  } catch {
    return Response.json(
      { ok: false, message: "خطا در ثبت درخواست. لطفاً دوباره تلاش کنید." },
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
    .from(partnershipRequests)
    .orderBy(desc(partnershipRequests.createdAt))
    .limit(200);
  return Response.json({ ok: true, requests: rows });
}
