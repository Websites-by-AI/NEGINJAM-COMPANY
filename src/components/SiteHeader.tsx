"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`hidden bg-navy-950 text-navy-100 transition-all md:block ${
          scrolled ? "h-0 overflow-hidden opacity-0" : "h-10 opacity-100"
        }`}
      >
        <div className="container-nj flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2">📍 {site.address}</span>
            <span className="flex items-center gap-2">🕘 {site.hours}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-mint-500/15 px-3 py-1 text-mint-300">
              شماره ثبت {site.registrationNumber}
            </span>
            <a href={site.phoneHref} className="font-bold text-white hover:text-mint-300">
              ☎ {site.phoneFa}
            </a>
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-navy-100 bg-white/95 shadow-lg shadow-navy-900/5 backdrop-blur"
            : "bg-transparent"
        }`}
      >
        <div className="container-nj flex h-[72px] items-center justify-between gap-4">
          <Link href="#home" className="flex items-center gap-3">
            <span className="relative h-12 w-12 overflow-hidden rounded-xl bg-white ring-1 ring-navy-100">
              <Image src="/images/logo.png" alt="لوگوی نگین جم" fill sizes="48px" className="object-cover" />
            </span>
            <span className="leading-tight">
              <span
                className={`block text-lg font-extrabold ${scrolled ? "text-navy-800" : "text-white"}`}
              >
                نگین جم
              </span>
              <span
                className={`block text-[11px] font-medium ${
                  scrolled ? "text-navy-500" : "text-mint-300"
                }`}
              >
                {site.slogan}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  scrolled
                    ? "text-navy-700 hover:bg-navy-50 hover:text-navy-900"
                    : "text-navy-50 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#request"
              className="hidden rounded-xl bg-mint-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-mint-500/25 transition hover:bg-mint-600 sm:inline-flex"
            >
              درخواست نیرو
            </a>
            <a
              href={site.phoneHref}
              className={`rounded-xl border px-4 py-2.5 text-sm font-bold transition ${
                scrolled
                  ? "border-navy-200 text-navy-800 hover:bg-navy-50"
                  : "border-white/30 text-white hover:bg-white/10"
              }`}
            >
              ☎ تماس
            </a>
            <button
              type="button"
              aria-label="منو"
              onClick={() => setOpen((v) => !v)}
              className={`grid h-11 w-11 place-items-center rounded-xl border lg:hidden ${
                scrolled ? "border-navy-200 text-navy-800" : "border-white/30 text-white"
              }`}
            >
              <span className="text-lg">{open ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-navy-100 bg-white lg:hidden">
            <nav className="container-nj grid grid-cols-2 gap-2 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-navy-50 px-4 py-3 text-sm font-semibold text-navy-800"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#request"
                onClick={() => setOpen(false)}
                className="col-span-2 rounded-xl bg-mint-500 px-4 py-3 text-center text-sm font-bold text-white"
              >
                ثبت درخواست خدمات
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
