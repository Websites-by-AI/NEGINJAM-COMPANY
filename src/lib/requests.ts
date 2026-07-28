import { toEnDigits } from "@/lib/format";

export type RequestInput = {
  fullName: string;
  phone: string;
  address: string;
  district: string;
  serviceSlug: string;
  serviceTitle: string;
  requestType: string;
  preferredDate: string;
  timeSlot: string;
  workers: number;
  notes: string;
};

export type ValidationResult =
  | { ok: true; data: RequestInput }
  | { ok: false; errors: Record<string, string> };

const str = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const CLEANING_SLUGS = [
  "home-cleaning",
  "stairs-cleaning",
  "office-cleaning",
  "building-cleaning",
  "carpet-sofa",
  "after-renovation",
];

export function validateRequest(
  body: unknown,
  validSlugs: string[],
  slugToTitle: Record<string, string>,
): ValidationResult {
  const errors: Record<string, string> = {};
  const raw = (body ?? {}) as Record<string, unknown>;

  const fullName = str(raw.fullName);
  const phone = toEnDigits(str(raw.phone)).replace(/[\s-]/g, "");
  const address = str(raw.address);
  const district = str(raw.district);
  const serviceSlug = str(raw.serviceSlug);
  const preferredDate = toEnDigits(str(raw.preferredDate));
  const timeSlot = str(raw.timeSlot);
  const notes = str(raw.notes).slice(0, 800);
  const workersRaw = Number(toEnDigits(str(raw.workers) || String(raw.workers ?? 1)));
  const workers = Number.isFinite(workersRaw)
    ? Math.min(10, Math.max(1, Math.round(workersRaw)))
    : 1;

  const isCleaning = CLEANING_SLUGS.includes(serviceSlug);
  const requestType = isCleaning ? "cleaning" : serviceSlug.startsWith("commercial") || serviceSlug.includes("video") || serviceSlug.includes("motion") || serviceSlug.includes("social") ? "video" : "web";

  if (fullName.length < 3) errors.fullName = "نام و نام خانوادگی را کامل وارد کنید.";
  if (!/^0?9\d{9}$/.test(phone) && !/^0?\d{10}$/.test(phone)) {
    errors.phone = "شماره تماس معتبر نیست (مثال: ۰۹۱۲۱۲۳۴۵۶۷).";
  }
  if (isCleaning && address.length < 8) errors.address = "آدرس دقیق را وارد کنید.";
  if (!validSlugs.includes(serviceSlug)) errors.serviceSlug = "نوع خدمات را انتخاب کنید.";
  if (!preferredDate) errors.preferredDate = "تاریخ مورد نظر را انتخاب کنید.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      fullName: fullName.slice(0, 120),
      phone: phone.startsWith("0") ? phone : `0${phone}`,
      address: (isCleaning ? address : address || "مشاوره تلفنی").slice(0, 500),
      district: district.slice(0, 80),
      serviceSlug,
      serviceTitle: slugToTitle[serviceSlug] ?? serviceSlug,
      requestType,
      preferredDate: preferredDate.slice(0, 40),
      timeSlot: timeSlot.slice(0, 40) || "هماهنگی تلفنی",
      workers,
      notes,
    },
  };
}

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateTrackingCode(): string {
  let out = "";
  for (let i = 0; i < 6; i += 1) {
    out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return `NJ-${out}`;
}
