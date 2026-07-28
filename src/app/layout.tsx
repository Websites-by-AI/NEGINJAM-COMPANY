import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: `${site.name} | ${site.slogan}`,
    template: `%s | ${site.shortName}`,
  },
  description:
    "شرکت خدماتی نگین جم: نظافت منزل و ادارات، طراحی سایت، تولید ویدیو و تیزر تبلیغاتی. مدل همکاری دوجانبه برای رشد مشترک. شماره ثبت ۲۰۹۹۵۴. تماس: ۰۲۱-۷۷۹۴۷۰۳۵",
  keywords: [
    "شرکت خدماتی نگین جم",
    "نظافت منزل تهران",
    "طراحی سایت تهران",
    "تولید ویدیو تبلیغاتی",
    "همکاری دوجانبه",
    "تیزر تبلیغاتی",
    "نظافت راه پله",
    "فروشگاه اینترنتی",
    "موشن گرافیک",
    "نارمک",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} | ${site.slogan}`,
    description:
      "نظافت حرفه‌ای، طراحی سایت و تولید ویدیو در تهران. همکاری دوجانبه با کمیسیون برای شرکا.",
    locale: "fa_IR",
    type: "website",
  },
  icons: { icon: "/images/logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#0d2544",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-white text-navy-900 antialiased">{children}</body>
    </html>
  );
}
