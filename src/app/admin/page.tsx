import Link from "next/link";
import type { Metadata } from "next";
import { db } from "@/db";
import { serviceRequests, partnershipRequests } from "@/db/schema";
import { isAdmin } from "@/lib/auth";
import { site, STATUS_LABELS } from "@/lib/site";
import { desc } from "drizzle-orm";
import AdminDashboard, { type AdminRequest } from "./AdminDashboard";
import { loginAction, logoutAction } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "پنل مدیریت — نگین جم",
  robots: { index: false, follow: false },
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; tab?: string }>;
}) {
  const params = await searchParams;
  const authorized = await isAdmin();

  /* ── LOGIN PAGE ── */
  if (!authorized) {
    return (
      <main className="hero-gradient grid min-h-screen place-items-center px-4 py-16">
        <form
          action={loginAction}
          className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl shadow-navy-950/40"
        >
          <div className="mb-6 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="نگین جم" className="h-20 w-20 rounded-2xl object-cover shadow" />
          </div>
          <h1 className="text-center text-xl font-black text-navy-900">{site.name}</h1>
          <p className="mt-1 text-center text-xs text-navy-500">پنل مدیریت اختصاصی</p>

          <label className="mt-7 block">
            <span className="mb-2 block text-xs font-bold text-navy-700">رمز عبور مدیریت</span>
            <input
              type="password"
              name="password"
              dir="ltr"
              autoComplete="current-password"
              className="w-full rounded-xl border border-navy-100 px-4 py-3.5 text-sm outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              placeholder="••••••••••••"
            />
          </label>

          {params.error && (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3">
              <span className="text-red-500">⚠️</span>
              <p className="text-xs font-bold text-red-700">رمز عبور نادرست است. دوباره تلاش کنید.</p>
            </div>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-2xl bg-navy-900 py-4 text-sm font-extrabold text-white transition hover:bg-emerald-600"
          >
            🔑 ورود به پنل مدیریت
          </button>

          <div className="mt-5 rounded-xl border border-navy-100 bg-sand-100 px-4 py-3 text-center text-xs text-navy-500">
            رمز پیش‌فرض: <span className="font-mono font-bold text-navy-700">neginjam1404</span>
          </div>

          <Link
            href="/"
            className="mt-4 block text-center text-xs font-semibold text-navy-400 hover:text-navy-700"
          >
            ← بازگشت به سایت اصلی
          </Link>
        </form>
      </main>
    );
  }

  /* ── FETCH DATA ── */
  const [rawRequests, rawPartnership] = await Promise.all([
    db.select().from(serviceRequests).orderBy(desc(serviceRequests.createdAt)).limit(300),
    db.select().from(partnershipRequests).orderBy(desc(partnershipRequests.createdAt)).limit(200),
  ]);

  const requests: AdminRequest[] = rawRequests.map((row) => ({
    id: row.id,
    code: row.code,
    fullName: row.fullName,
    phone: row.phone,
    address: row.address,
    district: row.district,
    serviceTitle: row.serviceTitle,
    requestType: row.requestType,
    preferredDate: row.preferredDate,
    timeSlot: row.timeSlot,
    workers: row.workers,
    notes: row.notes,
    status: row.status,
    createdAt: row.createdAt.toISOString(),
  }));

  // quick stats
  const statCounts = {
    totalRequests: requests.length,
    totalPartnership: rawPartnership.length,
    newRequests: requests.filter((r) => r.status === "new").length,
    doneRequests: requests.filter((r) => r.status === "done").length,
    cleaning: requests.filter((r) => r.requestType === "cleaning").length,
    web: requests.filter((r) => r.requestType === "web").length,
    video: requests.filter((r) => r.requestType === "video").length,
  };

  const activeTab = params.tab === "partnership" ? "partnership" : "requests";

  return (
    <main className="min-h-screen bg-sand-100 pb-20">

      {/* ── HEADER ── */}
      <header className="bg-navy-900 py-5 text-white shadow-xl">
        <div className="container-nj flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="نگین جم" className="h-12 w-12 rounded-xl object-cover" />
            <div>
              <h1 className="text-lg font-black">پنل مدیریت نگین جم</h1>
              <p className="text-xs text-navy-300">{site.slogan}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/studio" className="rounded-xl border border-white/20 px-4 py-2.5 text-xs font-bold transition hover:bg-white/10">
              🎬 استودیو
            </Link>
            <Link href="/" className="rounded-xl border border-white/20 px-4 py-2.5 text-xs font-bold transition hover:bg-white/10">
              🌐 سایت
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="rounded-xl bg-red-500/80 px-4 py-2.5 text-xs font-bold transition hover:bg-red-600">
                خروج
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="container-nj mt-6 space-y-6">

        {/* ── KPI CARDS ── */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {[
            { label: "کل درخواست‌ها", value: statCounts.totalRequests, icon: "📋", bg: "bg-navy-800 text-white" },
            { label: "درخواست جدید", value: statCounts.newRequests, icon: "🆕", bg: "bg-amber-500 text-white" },
            { label: "انجام‌شده", value: statCounts.doneRequests, icon: "✅", bg: "bg-emerald-500 text-white" },
            { label: "همکاری‌ها", value: statCounts.totalPartnership, icon: "🤝", bg: "bg-indigo-500 text-white" },
            { label: "🧹 نظافت", value: statCounts.cleaning, icon: "", bg: "bg-white border border-emerald-200" },
            { label: "💻 سایت", value: statCounts.web, icon: "", bg: "bg-white border border-sky-200" },
            { label: "🎬 ویدیو", value: statCounts.video, icon: "", bg: "bg-white border border-indigo-200" },
          ].map((card) => (
            <div key={card.label} className={`rounded-2xl p-4 text-center ${card.bg}`}>
              {card.icon && <div className="text-2xl">{card.icon}</div>}
              <div className={`mt-1 text-2xl font-black ${card.bg.includes("text-white") ? "" : "text-navy-900"}`}>
                {card.value}
              </div>
              <div className={`mt-1 text-[11px] font-semibold ${card.bg.includes("text-white") ? "opacity-80" : "text-navy-500"}`}>
                {card.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── TABS ── */}
        <div className="flex gap-2">
          <Link
            href="/admin?tab=requests"
            className={`rounded-xl px-5 py-3 text-sm font-bold transition ${
              activeTab === "requests"
                ? "bg-navy-900 text-white shadow-lg"
                : "border border-navy-100 bg-white text-navy-700 hover:border-navy-300"
            }`}
          >
            📋 درخواست‌های خدمات ({statCounts.totalRequests})
          </Link>
          <Link
            href="/admin?tab=partnership"
            className={`rounded-xl px-5 py-3 text-sm font-bold transition ${
              activeTab === "partnership"
                ? "bg-navy-900 text-white shadow-lg"
                : "border border-navy-100 bg-white text-navy-700 hover:border-navy-300"
            }`}
          >
            🤝 درخواست‌های همکاری ({statCounts.totalPartnership})
          </Link>
        </div>

        {/* ── REQUESTS TAB ── */}
        {activeTab === "requests" && <AdminDashboard requests={requests} />}

        {/* ── PARTNERSHIP TAB ── */}
        {activeTab === "partnership" && (
          <div className="space-y-4">
            {rawPartnership.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-navy-200 bg-white p-14 text-center text-sm text-navy-500">
                هنوز درخواست همکاری ثبت نشده.
              </div>
            ) : (
              rawPartnership.map((item) => (
                <article key={item.id} className="rounded-3xl border border-navy-100 bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-xl bg-indigo-900 px-3 py-1.5 font-mono text-xs font-black tracking-widest text-indigo-300">
                        {item.code}
                      </span>
                      <span className="text-base font-extrabold text-navy-900">{item.fullName}</span>
                      <a href={`tel:${item.phone}`} dir="ltr" className="rounded-lg bg-navy-50 px-3 py-1 font-mono text-xs font-bold text-navy-700">
                        {item.phone}
                      </a>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                      item.status === "new" ? "bg-amber-100 text-amber-800" :
                      item.status === "contacted" ? "bg-sky-100 text-sky-800" :
                      item.status === "scheduled" ? "bg-indigo-100 text-indigo-800" :
                      item.status === "done" ? "bg-emerald-100 text-emerald-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {STATUS_LABELS[item.status] ?? item.status}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 text-sm md:grid-cols-4">
                    {[
                      { label: "نام شرکت / کسب‌وکار", value: item.businessName || "—" },
                      { label: "نوع فعالیت", value: item.businessType || "—" },
                      { label: "حوزه همکاری", value: item.partnershipArea || "—" },
                      { label: "ثبت شده", value: new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium", timeZone: "Asia/Tehran" }).format(item.createdAt) },
                    ].map((info) => (
                      <div key={info.label} className="rounded-xl bg-sand-100 px-4 py-3">
                        <span className="block text-[11px] text-navy-400">{info.label}</span>
                        <span className="mt-1 block text-sm font-semibold text-navy-800">{info.value}</span>
                      </div>
                    ))}
                    {item.notes && (
                      <div className="rounded-xl bg-sand-100 px-4 py-3 md:col-span-4">
                        <span className="block text-[11px] text-navy-400">توضیحات</span>
                        <span className="mt-1 block text-sm font-semibold text-navy-800">{item.notes}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 border-t border-dashed border-navy-100 pt-4">
                    <span className="text-xs text-navy-400">تغییر وضعیت:</span>
                    {(["new", "contacted", "scheduled", "done", "cancelled"] as const).map((st) => (
                      <span key={st} className={`rounded-xl px-3 py-1.5 text-xs font-bold ${
                        item.status === st ? "bg-navy-900 text-white" : "bg-navy-50 text-navy-600"
                      }`}>
                        {STATUS_LABELS[st]}
                      </span>
                    ))}
                  </div>
                </article>
              ))
            )}
          </div>
        )}

      </div>
    </main>
  );
}
