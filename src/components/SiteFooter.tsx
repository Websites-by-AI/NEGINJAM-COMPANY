import Image from "next/image";
import Link from "next/link";
import { navLinks, site } from "@/lib/site";

const serviceLinks = [
  { label: "🧹 نظافت منزل", href: "#services" },
  { label: "🪜 نظافت راه‌پله", href: "#services" },
  { label: "🏢 نظافت شرکت‌ها", href: "#services" },
  { label: "💻 طراحی وب‌سایت", href: "#services" },
  { label: "🛒 فروشگاه اینترنتی", href: "#services" },
  { label: "🎬 تیزر تبلیغاتی", href: "#services" },
  { label: "📈 سئو و دیجیتال مارکتینگ", href: "#services" },
  { label: "✨ موشن گرافیک", href: "#services" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-navy-950 pb-28 pt-16 text-navy-200 sm:pb-8">
      <div className="container-nj grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <span className="relative h-14 w-14 overflow-hidden rounded-2xl bg-white">
              <Image src="/images/logo.png" alt="لوگوی نگین جم" fill sizes="56px" className="object-cover" />
            </span>
            <span>
              <span className="block text-lg font-black text-white">{site.name}</span>
              <span className="block text-[11px] text-emerald-400">{site.slogan}</span>
            </span>
          </div>
          <p className="mt-5 text-sm leading-8">
            شماره ثبت {site.registrationNumber}. نظافت حرفه‌ای، طراحی سایت و تولید ویدیو در تهران با
            مدل همکاری دوجانبه برای رشد مشترک.
          </p>
          <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
            <span className="rounded-xl bg-emerald-500/10 py-2 text-emerald-300">🧹 نظافت</span>
            <span className="rounded-xl bg-sky-500/10 py-2 text-sky-300">💻 سایت</span>
            <span className="rounded-xl bg-indigo-500/10 py-2 text-indigo-300">🎬 ویدیو</span>
          </div>
        </div>

        {/* Nav */}
        <div>
          <h3 className="text-sm font-black text-white">دسترسی سریع</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition hover:text-emerald-300">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/admin" className="transition hover:text-emerald-300">
                ورود مدیریت
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-sm font-black text-white">خدمات ما</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {serviceLinks.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="transition hover:text-emerald-300">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-black text-white">ارتباط با ما</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <span>📍</span>
              <span className="leading-7">{site.address}</span>
            </li>
            <li className="flex gap-3">
              <span>☎</span>
              <a href={site.phoneHref} className="font-bold text-white hover:text-emerald-300">
                {site.phoneFa}
              </a>
            </li>
            <li className="flex gap-3">
              <span>🕘</span>
              <span>{site.hours}</span>
            </li>
          </ul>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs leading-6">
            دامنه‌های رسمی:
            <span className="mt-2 block font-mono text-emerald-300" dir="ltr">
              {site.domains.join(" • ")}
            </span>
          </div>

          <a
            href="#partnership"
            className="mt-4 block rounded-2xl bg-amber-500 py-3 text-center text-xs font-bold text-white transition hover:bg-amber-600"
          >
            🤝 درخواست همکاری دوجانبه
          </a>
        </div>
      </div>

      <div className="container-nj mt-12 border-t border-white/10 pt-6 text-center text-xs text-navy-300">
        © {new Date().getFullYear()} تمامی حقوق برای {site.name} محفوظ است. |{" "}
        {site.slogan}
      </div>
    </footer>
  );
}
