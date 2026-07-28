"use client";

import { useState } from "react";
import { partnershipBenefits, partnerTypes } from "@/lib/site";

type FormState = {
  fullName: string;
  phone: string;
  businessName: string;
  businessType: string;
  partnershipArea: string;
  notes: string;
};

const AREAS = [
  "نظافت + تولید ویدیو",
  "نظافت + طراحی سایت",
  "طراحی سایت + تولید ویدیو",
  "هر سه خدمت",
  "ارجاع مشتری و کمیسیون",
  "قرارداد بلندمدت",
  "سایر",
];

const inputClass =
  "w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition placeholder:text-navy-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100";

const initialState: FormState = {
  fullName: "",
  phone: "",
  businessName: "",
  businessType: "",
  partnershipArea: "",
  notes: "",
};

export default function PartnershipSection() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrors({});

    try {
      const res = await fetch("/api/partnership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as {
        ok: boolean;
        code?: string;
        message?: string;
        errors?: Record<string, string>;
      };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrors(data.errors ?? {});
        setMessage(data.message ?? "ثبت انجام نشد.");
        return;
      }

      setStatus("success");
      setCode(data.code ?? "");
      setMessage(data.message ?? "");
      setForm(initialState);
    } catch {
      setStatus("error");
      setMessage("ارتباط با سرور برقرار نشد.");
    }
  }

  return (
    <section id="partnership" className="relative overflow-hidden bg-navy-950 py-20 text-white md:py-28">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -top-20 left-10 h-80 w-80 rounded-full bg-amber-400/8 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-400/8 blur-3xl" />

      <div className="container-nj relative">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300">
            🤝 همکاری دوجانبه
          </span>
          <h2 className="mt-4 text-3xl font-black md:text-4xl">یک رابطه برنده–برنده</h2>
          <p className="mt-4 leading-8 text-navy-200">
            شما مشتریانتان را به ما معرفی کنید، ما مشتریانمان را به شما. هر دو طرف سود می‌کنند.
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {partnershipBenefits.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/8 bg-white/5 p-6 backdrop-blur"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-500/15 text-2xl">
                {item.icon}
              </span>
              <h3 className="mt-4 text-base font-extrabold">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-navy-300">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Partner types */}
        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h3 className="text-center text-lg font-black">چه کسانی می‌توانند همکار نگین جم باشند؟</h3>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {partnerTypes.map((type) => (
              <span
                key={type.label}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold"
              >
                {type.icon} {type.label}
              </span>
            ))}
          </div>
        </div>

        {/* Partnership form */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-black">چرا با نگین جم همکاری کنید؟</h3>
            <ul className="mt-6 space-y-4 text-sm leading-8 text-navy-200">
              <li className="flex gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-amber-500/20 text-[11px] text-amber-300">۱</span>
                ارجاع هر مشتری نظافت = کمیسیون نقدی فوری
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-amber-500/20 text-[11px] text-amber-300">۲</span>
                ارجاع هر پروژه سایت یا ویدیو = درصد مشخص از مبلغ قرارداد
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-amber-500/20 text-[11px] text-amber-300">۳</span>
                تبادل خدمات: بدون پرداخت نقدی، خدمت در برابر خدمت
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-amber-500/20 text-[11px] text-amber-300">۴</span>
                معرفی شما در شبکه ۱۲٬۰۰۰+ مشتری نگین جم
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-amber-500/20 text-[11px] text-amber-300">۵</span>
                قرارداد رسمی، شرایط شفاف، رابطه بلندمدت
              </li>
            </ul>
          </div>

          {status === "success" ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-amber-400/30 bg-amber-500/10 p-8 text-center">
              <span className="text-4xl">🤝</span>
              <h3 className="mt-4 text-xl font-black">درخواست همکاری ثبت شد!</h3>
              <p className="mt-3 text-sm leading-7 text-navy-200">{message}</p>
              <p className="mt-4 rounded-2xl bg-navy-900 px-6 py-3 font-mono text-base font-black tracking-widest text-amber-300">
                {code}
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-amber-600"
              >
                ثبت درخواست جدید
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              noValidate
            >
              <h3 className="text-lg font-black">فرم درخواست همکاری</h3>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <PField label="نام و نام خانوادگی" error={errors.fullName}>
                  <input
                    className={inputClass}
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    placeholder="مثال: علی احمدی"
                  />
                </PField>
                <PField label="شماره موبایل" error={errors.phone}>
                  <input
                    className={inputClass}
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                    inputMode="tel"
                    dir="ltr"
                  />
                </PField>
                <PField label="نام شرکت / کسب‌وکار (اختیاری)">
                  <input
                    className={inputClass}
                    value={form.businessName}
                    onChange={(e) => update("businessName", e.target.value)}
                    placeholder="مثال: آژانس دیجیتال آرتا"
                  />
                </PField>
                <PField label="نوع فعالیت">
                  <input
                    className={inputClass}
                    value={form.businessType}
                    onChange={(e) => update("businessType", e.target.value)}
                    placeholder="مثال: عکاس، طراح، مشاور"
                  />
                </PField>
                <PField label="حوزه همکاری مورد نظر" error={errors.partnershipArea} full>
                  <select
                    className={inputClass}
                    value={form.partnershipArea}
                    onChange={(e) => update("partnershipArea", e.target.value)}
                  >
                    <option value="">انتخاب کنید...</option>
                    {AREAS.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </PField>
                <PField label="توضیحات (اختیاری)" full>
                  <textarea
                    rows={3}
                    className={`${inputClass} resize-none`}
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    placeholder="ایده‌ها، پیشنهاد و جزئیات همکاری..."
                  />
                </PField>
              </div>

              {message && status === "error" && (
                <p className="mt-4 rounded-xl bg-red-900/40 px-4 py-3 text-sm text-red-300">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-5 w-full rounded-2xl bg-amber-500 py-4 text-sm font-extrabold text-white transition hover:bg-amber-600 disabled:opacity-60"
              >
                {status === "loading" ? "در حال ارسال..." : "🤝 ثبت درخواست همکاری"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function PField({
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
      <span className="mb-2 block text-xs font-bold text-navy-200">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs font-bold text-red-400">{error}</span>}
    </label>
  );
}
