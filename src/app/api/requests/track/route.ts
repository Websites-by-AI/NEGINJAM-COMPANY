import { db } from "@/db";
import { serviceRequests } from "@/db/schema";
import { toEnDigits } from "@/lib/format";
import { STATUS_LABELS } from "@/lib/site";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = toEnDigits(searchParams.get("code")?.trim() ?? "").toUpperCase();

  if (!/^NJ-[A-Z0-9]{6}$/.test(code)) {
    return Response.json(
      { ok: false, message: "کد پیگیری معتبر نیست. نمونه صحیح: NJ-A1B2C3" },
      { status: 400 },
    );
  }

  const [found] = await db
    .select({
      code: serviceRequests.code,
      serviceTitle: serviceRequests.serviceTitle,
      status: serviceRequests.status,
      preferredDate: serviceRequests.preferredDate,
      timeSlot: serviceRequests.timeSlot,
      createdAt: serviceRequests.createdAt,
    })
    .from(serviceRequests)
    .where(eq(serviceRequests.code, code))
    .limit(1);

  if (!found) {
    return Response.json({ ok: false, message: "درخواستی با این کد پیدا نشد." }, { status: 404 });
  }

  return Response.json({
    ok: true,
    request: { ...found, statusLabel: STATUS_LABELS[found.status] ?? found.status },
  });
}
