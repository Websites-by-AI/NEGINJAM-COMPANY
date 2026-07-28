"use client";

import { useState } from "react";
import { coverageAreas } from "@/lib/site";

type ServiceOption = { slug: string; title: string; division: string };

type FormState = {
  fullName: string;
  phone: string;
  district: string;
  address: string;
  serviceSlug: string;
  workers: string;
  preferredDate: string;
  timeSlot: string;
  notes: string;
};

const TIME_SLOTS = ["۸ تا ۱۲ صبح", "۱۲ تا ۴ بعدازظهر", "۴ تا ۸ عصر", "هماهنگی تلفنی"];

const DIVISION_LABEL: Record<string, string> = {
  cleaning: "🧹 خدمات نظافت",
  web: "💻 طراحی سایت",
  video: "🎬 تولید ویدیو",
};

const inputClass =
  "w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition placeholder:text-navy-300 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100";

export default function RequestForm({ services }: { services: ServiceOption[] }) {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    phone: "",
    district: "",
    address: "",
    serviceSlug: services[0]?.slug ?? "",
    workers: "1",
    preferredDate: "",
    timeSlot: "هماهنگی تلفنی",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");
  const [successCode, setSuccessCode] = useState<string | null>(null);

  const selectedService = services.find((s) => s.slug === form.serviceSlug);
  const isCleaningService = selectedService?.division === "cleaning";

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    setErrors({});

    try {
      const payload = {
        ...form,
        workers: Number(form.workers),
        address: form.address || "مشاوره تلفنی",
      };
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as {
        ok: boolean;
        code?: string;
        message?: string;
        errors?: Record<string, string>;
      };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setErrors(data.errors ?? {});
        setMessage(data.message ?? "ثبت درخواست انجام نشد.");
        return;
      }

      setStatus("idle");
      setSuccessCode(data.code ?? "");
      setForm({
        fullName: "",
        phone: "",
        district: "",
        address: "",
        serviceSlug: services[0]?.slug ?? "",
        workers: "1",
        preferredDate: "",
        timeSlot: "هماهنگی تلفنی",
        notes: "",
      });
    } catch {
      setStatus("error");
      setMessage("ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.");
    }
  }

  if (successCode) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-xl shadow-navy-900/5">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-100 text-3xl">✅</span>
        <h3 className="mt-5 text-xl font-black text-navy-900">درخواست شما ثبت شد</h3>
        <p className="mt-3 text-sm leading-8 text-navy-600">
          همکاران ما در سریع‌ترین زمان با شما تماس می‌گیرند. کد پیگیری:
        </p>
        <p className="mt-4 inline-block rounded-2xl bg-navy-900 px-6 py-3 font-mono text-lg font-black tracking-widest text-emerald-300">
          {successCode}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setSuccessCode(null)}
            className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
          >
            ثبت درخواست جدید
          </button>
          <a
            href="#track"
            className="rounded-xl border border-navy-200 px-5 py-3 text-sm font-bold text-navy-800 transition hover:bg-navy-50"
          >
            پیگیری درخواست
          </a>
        </div>
      </div>
    );
  }

  // Group services by division for grouped select
  const grouped = services.reduce<Record<string, ServiceOption[]>>((acc, s) => {
    if (!acc[s.division]) acc[s.division] = [];
    acc[s.division].push(s);
    return acc;
  }, {});

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-navy-100 bg-white p-6 shadow-xl shadow-navy-900/5 md:p-8"
      noValidate
    >
      <h3 className="text-xl font-black text-navy-900">فرم درخواست خدمات</h3>
      <p className="mt-2 text-sm text-navy-500">
        نظافت، طراحی سایت یا تولید ویدیو — هر خدمتی نیاز دارید را انتخاب کنید.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Field label="نام و نام خانوادگی" error={errors.fullName}>
          <input
            className={inputClass}
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            placeholder="مثال: علی محمدی"
          />
        </Field>

        <Field label="شماره موبایل" error={errors.phone}>
          <input
            className={inputClass}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="۰۹۱۲۱۲۳۴۵۶۷"
            inputMode="tel"
            dir="ltr"
          />
        </Field>

        <Field label="نوع خدمات" error={errors.serviceSlug} full>
          <select
            className={inputClass}
            value={form.serviceSlug}
            onChange={(e) => update("serviceSlug", e.target.value)}
          >
            {Object.entries(grouped).map(([div, items]) => (
              <optgroup key={div} label={DIVISION_LABEL[div] ?? div}>
                {items.map((service) => (
                  <option key={service.slug} value={service.slug}>
                    {service.title}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </Field>

        {isCleaningService && (
          <>
            <Field label="منطقه / محله">
              <input
                className={inputClass}
                list="nj-areas"
                value={form.district}
                onChange={(e) => update("district", e.target.value)}
                placeholder="مثال: نارمک"
              />
              <datalist id="nj-areas">
                {coverageAreas.map((area) => (
                  <option key={area} value={area} />
                ))}
              </datalist>
            </Field>
            <Field label="تعداد نیروی مورد نیاز">
              <select
                className={inputClass}
                value={form.workers}
                onChange={(e) => update("workers", e.target.value)}
              >
                {[1, 2, 3, 4, 5].map((count) => (
                  <option key={count} value={String(count)}>{count} نفر</option>
                ))}
              </select>
            </Field>
            <Field label="آدرس دقیق" error={errors.address} full>
              <input
                className={inputClass}
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="خیابان، کوچه، پلاک و واحد"
              />
            </Field>
          </>
        )}

        <Field label="تاریخ / زمان شروع مورد نظر" error={errors.preferredDate}>
          <input
            type="date"
            className={inputClass}
            value={form.preferredDate}
            onChange={(e) => update("preferredDate", e.target.value)}
            dir="ltr"
          />
        </Field>

        {isCleaningService && (
          <Field label="بازه زمانی">
            <select
              className={inputClass}
              value={form.timeSlot}
              onChange={(e) => update("timeSlot", e.target.value)}
            >
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </Field>
        )}

        <Field label="توضیحات تکمیلی (اختیاری)" full>
          <textarea
            rows={3}
            className={`${inputClass} resize-none`}
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            placeholder={
              isCleaningService
                ? "متراژ، تعداد اتاق، جزئیات کار..."
                : "هدف پروژه، رنگ‌بندی مورد نظر، نمونه مرجع..."
            }
          />
        </Field>
      </div>

      {message && status === "error" && (
        <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 w-full rounded-2xl bg-emerald-500 py-4 text-base font-extrabold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "در حال ثبت..." : "ثبت درخواست"}
      </button>
      <p className="mt-4 text-center text-xs text-navy-400">
        ثبت درخواست رایگان است. هزینه فقط پس از تأیید شما دریافت می‌شود.
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  full,
  children,
}: {
  label: string;
  error?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${full ? "md:col-span-2" : ""}`}>
      <span className="mb-2 block text-xs font-bold text-navy-700">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs font-semibold text-red-600">{error}</span>}
    </label>
  );
}
