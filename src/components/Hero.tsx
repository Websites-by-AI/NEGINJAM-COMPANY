import Image from "next/image";
import { site, stats } from "@/lib/site";

const pillars = [
  { icon: "🧹", label: "نظافت حرفه‌ای", color: "bg-emerald-500/20 text-emerald-200 border-emerald-500/30" },
  { icon: "💻", label: "طراحی سایت", color: "bg-sky-500/20 text-sky-200 border-sky-500/30" },
  { icon: "🎬", label: "تولید ویدیو", color: "bg-indigo-500/20 text-indigo-200 border-indigo-500/30" },
  { icon: "🤝", label: "همکاری دوجانبه", color: "bg-amber-500/20 text-amber-200 border-amber-500/30" },
];

export default function Hero() {
  return (
    <section id="home" className="hero-gradient relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      {/* glow blobs */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-emerald-400/15 blur-3xl" />
      <div className="pointer-events-none absolute top-20 right-0 h-72 w-72 rounded-full bg-indigo-400/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />

      <div className="container-nj relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* LEFT: text */}
        <div className="animate-fade-up text-white">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            شرکت رسمی با شماره ثبت {site.registrationNumber}
          </span>

          <h1 className="mt-6 text-4xl font-black leading-[1.3] text-balance-fa md:text-6xl">
            شرکت خدماتی
            <span className="mx-2 block bg-gradient-to-l from-emerald-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              نگین جم
            </span>
          </h1>

          <p className="mt-3 text-xl font-bold text-navy-100 md:text-2xl">{site.sloganSecondary}</p>

          {/* 3 pillars */}
          <div className="mt-7 flex flex-wrap gap-2">
            {pillars.map((p) => (
              <span
                key={p.label}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold ${p.color}`}
              >
                {p.icon} {p.label}
              </span>
            ))}
          </div>

          <p className="mt-6 max-w-xl text-base leading-9 text-navy-100 md:text-lg">
            نگین جم با بیش از <b className="text-white">۲۰ سال سابقه</b> در نظافت، اکنون خدمات{" "}
            <b className="text-sky-300">طراحی سایت</b> و{" "}
            <b className="text-indigo-300">تولید ویدیو</b> را نیز ارائه می‌دهد. با مدل{" "}
            <b className="text-amber-300">همکاری دوجانبه</b> ما، هر دو طرف رشد می‌کنند.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#request"
              className="rounded-2xl bg-emerald-500 px-7 py-4 text-base font-extrabold text-white shadow-xl shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-600"
            >
              ثبت درخواست خدمات
            </a>
            <a
              href="#partnership"
              className="rounded-2xl border border-amber-400/40 bg-amber-400/10 px-7 py-4 text-base font-extrabold text-amber-200 backdrop-blur transition hover:-translate-y-0.5 hover:bg-amber-400/20"
            >
              🤝 درخواست همکاری
            </a>
            <a
              href={site.phoneHref}
              className="rounded-2xl border border-white/25 bg-white/10 px-7 py-4 text-base font-extrabold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              ☎ {site.phoneFa}
            </a>
          </div>
        </div>

        {/* RIGHT: logo card + floating chips */}
        <div className="relative flex items-center justify-center">
          <div className="gem-shine relative mx-auto w-72 overflow-hidden rounded-[2.5rem] border-2 border-white/20 bg-white/5 p-6 shadow-2xl shadow-navy-950/50 backdrop-blur md:w-80">
            <div className="relative mx-auto h-64 w-64 md:h-72 md:w-72">
              <Image
                src="/images/logo.png"
                alt="لوگوی شرکت خدماتی نگین جم — همکاری دوجانبه"
                fill
                priority
                sizes="300px"
                className="object-contain drop-shadow-2xl"
              />
            </div>
            <p className="mt-4 text-center text-xs font-bold text-navy-100 opacity-80">
              {site.slogan}
            </p>
          </div>

          {/* floating service chips */}
          <div className="animate-float absolute -top-4 -right-2 rounded-2xl border border-emerald-200 bg-white px-4 py-3 shadow-xl">
            <p className="text-xs font-extrabold text-navy-800">🧹 نظافت حرفه‌ای</p>
            <p className="text-[10px] text-navy-500">بیش از ۲۰ سال تجربه</p>
          </div>

          <div className="animate-float absolute -bottom-4 -left-2 rounded-2xl border border-sky-200 bg-white px-4 py-3 shadow-xl" style={{ animationDelay: "1.5s" }}>
            <p className="text-xs font-extrabold text-navy-800">💻 طراحی سایت</p>
            <p className="text-[10px] text-navy-500">وب‌سایت + فروشگاه + سئو</p>
          </div>

          <div className="animate-float absolute top-1/2 -left-8 hidden -translate-y-1/2 rounded-2xl border border-indigo-200 bg-white px-4 py-3 shadow-xl md:block" style={{ animationDelay: "3s" }}>
            <p className="text-xs font-extrabold text-navy-800">🎬 تولید ویدیو</p>
            <p className="text-[10px] text-navy-500">تیزر • موشن • ریلز</p>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="container-nj relative mt-16 md:mt-20">
        <div className="grid grid-cols-2 gap-4 rounded-3xl border border-white/12 bg-white/8 p-6 backdrop-blur md:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-3xl font-black text-white md:text-4xl">{item.value}</p>
              <p className="mt-1 text-xs text-navy-100 md:text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
