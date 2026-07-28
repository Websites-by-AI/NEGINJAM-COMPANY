import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MascotWidget from "@/components/MascotWidget";
import VideoPlayer from "@/components/VideoPlayer";
import {
  videoScenario,
  webPackages,
  videoPackages,
  partnershipStages,
  filmingTips,
  site,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "استودیو محتوا — دیباگ اتاق برنامه‌نویس | نگین جم",
  description:
    "پخش آنلاین سناریوی ویدیویی «دیباگ اتاق برنامه‌نویس» + پکیج‌های طراحی سایت و تولید ویدیو. طرح همکاری دوجانبه نگین جم.",
};

export default function StudioPage() {
  return (
    <>
      <SiteHeader />
      <main className="pb-24 sm:pb-0">

        {/* ── HERO ── */}
        <section className="hero-gradient relative overflow-hidden pt-36 pb-12 text-white md:pt-44 md:pb-16">
          <div className="pointer-events-none absolute -top-20 right-10 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="container-nj relative">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/40 bg-indigo-500/15 px-5 py-2 text-sm font-bold text-indigo-200">
                🎬 استودیو محتوا و ایده‌های ویدیویی
              </span>
              <h1 className="mt-5 text-3xl font-black leading-snug md:text-5xl">
                {videoScenario.title}
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-navy-100">
                {videoScenario.subtitle}
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold backdrop-blur">
                  ⏱ {videoScenario.duration}
                </span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold backdrop-blur">
                  🎨 {videoScenario.style}
                </span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold backdrop-blur">
                  📱 ۷ صحنه کامل
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── VIDEO PLAYER + STORYBOARD ── */}
        <section className="bg-slate-950 py-12 md:py-16">
          <div className="container-nj">
            <div className="grid items-start gap-6 lg:grid-cols-[1fr_380px]">

              {/* Storyboard list */}
              <div>
                <h2 className="mb-6 text-2xl font-black text-white">
                  📋 استوری‌بورد کامل
                  <span className="mr-2 text-sm font-normal text-slate-400">— هر صحنه رو کلیک کن</span>
                </h2>
                <div className="space-y-3">
                  {videoScenario.scenes.map((scene, index) => (
                    <div
                      key={scene.timeCode}
                      className={`group relative overflow-hidden rounded-2xl border border-white/8 bg-white/4 transition hover:border-white/15 hover:bg-white/8`}
                    >
                      <div className="grid grid-cols-[120px_1fr] md:grid-cols-[180px_1fr]">
                        {/* scene thumb */}
                        <div className="relative h-full min-h-[96px] overflow-hidden">
                          <Image
                            src={scene.image}
                            alt={scene.label}
                            fill
                            sizes="180px"
                            className="object-cover brightness-50"
                          />
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-2 text-center">
                            <span className="text-2xl">{scene.emoji}</span>
                            <span className="rounded-full bg-black/60 px-2 py-0.5 font-mono text-[9px] font-bold text-white">
                              {scene.timeCode}
                            </span>
                          </div>
                        </div>

                        {/* content */}
                        <div className="grid gap-2 p-4 md:grid-cols-3">
                          <div>
                            <p className="mb-1 text-[9px] font-black uppercase tracking-wider text-slate-600">📷 تصویر</p>
                            <p className="text-xs leading-6 text-slate-300">{scene.visual}</p>
                          </div>
                          <div>
                            <p className="mb-1 text-[9px] font-black uppercase tracking-wider text-slate-600">🎵 SFX</p>
                            <p className="text-xs leading-6 text-slate-300">{scene.sfx}</p>
                          </div>
                          <div className={`rounded-xl bg-gradient-to-br p-3 ${scene.bgColor}`}>
                            <p className="mb-1 text-[9px] font-black uppercase tracking-wider text-white/50">🎙️ نریشن</p>
                            <p className={`text-xs font-bold leading-6 ${scene.accent}`}>
                              «{scene.narration.slice(0, 80)}...»
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* filming tips */}
                <div className="mt-8">
                  <h3 className="mb-5 text-xl font-black text-white">🎥 راهنمای فیلم‌برداری</h3>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {filmingTips.map((tip) => (
                      <div key={tip.title} className="rounded-2xl border border-white/8 bg-white/4 p-4">
                        <span className="text-2xl">{tip.icon}</span>
                        <h4 className="mt-2 text-sm font-extrabold text-white">{tip.title}</h4>
                        <p className="mt-1.5 text-xs leading-6 text-slate-400">{tip.tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sticky Video Player */}
              <div className="lg:sticky lg:top-28">
                <h2 className="mb-4 text-center text-lg font-black text-white">
                  ▶ پیش‌نمایش ویدیو
                </h2>
                <VideoPlayer />

                {/* hashtags */}
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {videoScenario.hashtags.map((tag) => (
                    <span key={tag} className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-[11px] font-bold text-indigo-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WEB PACKAGES ── */}
        <section className="bg-white py-16 md:py-20">
          <div className="container-nj">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-block rounded-full bg-sky-100 px-4 py-1.5 text-xs font-bold text-sky-700">
                💻 پکیج‌های طراحی سایت ۱۴۰۵
              </span>
              <h2 className="mt-4 text-3xl font-black text-navy-900 md:text-4xl">
                همون تعرفه‌هایی که تو ویدیو دیدید!
              </h2>
              <p className="mt-3 leading-8 text-navy-600">
                شفاف، منصفانه و با ضمانت کیفیت
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {webPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative flex flex-col rounded-3xl border-2 p-6 transition hover:-translate-y-1.5 hover:shadow-2xl ${pkg.color} ${
                    pkg.popular ? "ring-2 ring-sky-400 ring-offset-2" : ""
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-sky-500 px-4 py-1.5 text-xs font-black text-white shadow-lg">
                      ⭐ محبوب‌ترین
                    </span>
                  )}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-3xl">{pkg.emoji}</span>
                      <h3 className="mt-2 text-lg font-black text-navy-900">{pkg.name}</h3>
                    </div>
                    <span className={`rounded-xl px-2.5 py-1 text-[10px] font-black text-white ${pkg.badgeColor}`}>
                      {pkg.deliveryDays} روز
                    </span>
                  </div>
                  <p className="my-4 border-t border-navy-100 pt-4 text-2xl font-black text-navy-900">
                    {pkg.price}
                    {pkg.priceNum > 0 && <span className="mr-1 text-sm font-bold text-navy-500">تومان</span>}
                  </p>
                  <ul className="flex-1 space-y-2 text-sm">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-navy-700">
                        <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full text-[8px] text-white ${pkg.badgeColor}`}>✓</span>
                        {f}
                      </li>
                    ))}
                    {pkg.notIncluded.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-navy-300 line-through">
                        <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-navy-100 text-[8px] text-navy-400">✕</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/#request"
                    className={`mt-5 block rounded-2xl py-3 text-center text-sm font-extrabold text-white transition hover:opacity-90 ${pkg.badgeColor}`}
                  >
                    {pkg.priceNum === 0 ? "مشاوره رایگان" : "انتخاب این پکیج"}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VIDEO PACKAGES ── */}
        <section className="bg-slate-950 py-14 text-white">
          <div className="container-nj">
            <div className="mx-auto max-w-xl text-center">
              <span className="inline-block rounded-full border border-pink-400/40 bg-pink-500/10 px-4 py-1.5 text-xs font-bold text-pink-300">
                🎬 پکیج‌های تولید ویدیو
              </span>
              <h2 className="mt-4 text-3xl font-black">ویدیوهایی که وایرال می‌شن</h2>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {videoPackages.map((pkg) => (
                <div key={pkg.name} className={`group rounded-3xl border-2 p-6 transition hover:-translate-y-1 ${pkg.color}`}>
                  <span className="text-4xl">{pkg.emoji}</span>
                  <h3 className="mt-3 text-lg font-black text-navy-900">{pkg.name}</h3>
                  <p className="mt-1 text-2xl font-black text-navy-900">
                    {pkg.price}
                    <span className="mr-1 text-xs font-bold text-navy-500">{pkg.unit}</span>
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-navy-700">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full text-[8px] text-white ${pkg.badge}`}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="/#request" className={`mt-5 block rounded-2xl py-3 text-center text-sm font-extrabold text-white transition hover:opacity-90 ${pkg.badge}`}>
                    سفارش این پکیج
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PARTNERSHIP STAGES ── */}
        <section className="bg-white py-16 md:py-20">
          <div className="container-nj">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-block rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold text-amber-700">
                🤝 طرح همکاری دوجانبه
              </span>
              <h2 className="mt-4 text-3xl font-black text-navy-900 md:text-4xl">
                ما دانش هم منتقل می‌کنیم
              </h2>
              <p className="mt-3 text-base leading-8 text-navy-600 italic">
                «ما فقط خدمات ارائه نمی‌دهیم؛ دانش و ابزار رشد را نیز در اختیار شما قرار می‌دهیم.»
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {partnershipStages.map((stage) => (
                <div key={stage.stage} className="rounded-3xl border border-navy-100 bg-sand-100 p-7 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl">
                  <div className="flex items-center gap-3">
                    <span className={`grid h-12 w-12 place-items-center rounded-2xl text-xl text-white ${stage.color}`}>
                      {stage.icon}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-navy-500">{stage.stage}</p>
                      <h3 className="text-base font-black text-navy-900">{stage.title}</h3>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-3">
                    {stage.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-navy-700">
                        <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] text-white ${stage.color}`}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="hero-gradient mt-10 overflow-hidden rounded-3xl p-8 text-white md:p-12">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-2xl font-black">مزایای همکاری دوجانبه</h3>
                  <ul className="mt-5 space-y-3 text-sm leading-8 text-navy-100">
                    {[
                      "کاهش هزینه‌های بلندمدت",
                      "انتقال دانش و مهارت به مجموعه شما",
                      "استقلال در مدیریت سایت و تولید محتوا",
                      "درآمد از ارجاع مشتری (کمیسیون)",
                      "معرفی برند شما در شبکه ۱۲٬۰۰۰+ مشتری نگین جم",
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-[10px] text-white">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
                    <p className="text-2xl font-black text-amber-300">«همکاری برد–برد»</p>
                    <p className="mt-3 leading-8 text-navy-100 text-sm">
                      شما مشتریانتان را به ما معرفی کنید و ما هم مشتریانمان را به شما. از هر ارجاع موفق کمیسیون نقدی دریافت کنید.
                    </p>
                    <a href="/#partnership" className="mt-5 block rounded-2xl bg-amber-500 py-3 text-center text-sm font-extrabold text-white transition hover:bg-amber-600">
                      ثبت درخواست همکاری
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-sand-100 py-12">
          <div className="container-nj text-center">
            <h2 className="text-2xl font-black text-navy-900">آماده‌ای شروع کنی؟ 🚀</h2>
            <p className="mt-3 text-navy-600">برای سفارش ویدیو، طراحی سایت یا درخواست همکاری تماس بگیر</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href={site.phoneHref} className="rounded-2xl bg-navy-900 px-7 py-4 text-sm font-extrabold text-white transition hover:bg-navy-800">
                ☎ {site.phoneFa}
              </a>
              <a href="/#request" className="rounded-2xl bg-emerald-500 px-7 py-4 text-sm font-extrabold text-white shadow-lg transition hover:bg-emerald-600">
                ثبت درخواست آنلاین
              </a>
              <Link href="/" className="rounded-2xl border border-navy-200 px-7 py-4 text-sm font-extrabold text-navy-700 transition hover:bg-white">
                ← بازگشت به سایت اصلی
              </Link>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
      <MascotWidget />
    </>
  );
}
