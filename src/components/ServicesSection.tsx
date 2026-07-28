"use client";

import Image from "next/image";
import { useState } from "react";
import type { Service } from "@/db/schema";
import { formatToman } from "@/lib/format";
import { serviceDivisions } from "@/lib/site";

const divisionStyles: Record<
  string,
  { badge: string; btnBg: string; checkBg: string; checkText: string }
> = {
  cleaning: {
    badge: "bg-emerald-100 text-emerald-700",
    btnBg: "bg-emerald-600 hover:bg-emerald-700",
    checkBg: "bg-emerald-100",
    checkText: "text-emerald-700",
  },
  web: {
    badge: "bg-sky-100 text-sky-700",
    btnBg: "bg-sky-600 hover:bg-sky-700",
    checkBg: "bg-sky-100",
    checkText: "text-sky-700",
  },
  video: {
    badge: "bg-indigo-100 text-indigo-700",
    btnBg: "bg-indigo-600 hover:bg-indigo-700",
    checkBg: "bg-indigo-100",
    checkText: "text-indigo-700",
  },
};

export default function ServicesSection({ services }: { services: Service[] }) {
  const [activeDiv, setActiveDiv] = useState<string>("cleaning");

  const filtered = services.filter((s) => s.division === activeDiv);

  const divInfo = serviceDivisions.find((d) => d.id === activeDiv);
  const styles = divisionStyles[activeDiv] ?? divisionStyles.cleaning;

  return (
    <section id="services" className="section-grid relative bg-sand-100 py-20 md:py-28">
      <div className="container-nj">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-navy-100 px-4 py-1.5 text-xs font-bold text-navy-700">
            خدمات ما
          </span>
          <h2 className="mt-4 text-3xl font-black text-navy-900 md:text-4xl">
            سه حوزه تخصصی، یک شریک قابل اعتماد
          </h2>
          <p className="mt-4 leading-8 text-navy-600">
            از نظافت حرفه‌ای تا طراحی سایت و تولید ویدیو؛ همه چیز زیر یک سقف.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {serviceDivisions.map((division) => (
            <button
              key={division.id}
              type="button"
              onClick={() => setActiveDiv(division.id)}
              className={`flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-bold transition ${
                activeDiv === division.id
                  ? "border-transparent bg-navy-900 text-white shadow-lg"
                  : "border-navy-100 bg-white text-navy-700 hover:border-navy-300 hover:bg-navy-50"
              }`}
            >
              <span className="text-lg">{division.icon}</span>
              {division.title}
            </button>
          ))}
        </div>

        {/* Division heading */}
        {divInfo && (
          <div className="mt-8 flex items-center gap-3">
            <span className={`rounded-xl px-3 py-1.5 text-xs font-bold ${styles.badge}`}>
              {divInfo.icon} {divInfo.title}
            </span>
            <span className="text-sm text-navy-500">{divInfo.subtitle}</span>
          </div>
        )}

        {/* Cards */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => (
            <article
              key={service.slug}
              className="group flex flex-col overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-navy-900/10"
            >
              <div className="relative h-48 overflow-hidden">
                {service.imageUrl ? (
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="h-full w-full bg-navy-100" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-950/10 to-transparent" />
                <span className="absolute bottom-3 right-4 flex items-center gap-2 text-base font-extrabold text-white">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15 text-lg backdrop-blur">
                    {service.icon}
                  </span>
                  {service.title}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm leading-7 text-navy-600">{service.summary}</p>

                <ul className="mt-5 space-y-2.5 text-sm text-navy-700">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] ${styles.checkBg} ${styles.checkText}`}>
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-end justify-between border-t border-dashed border-navy-100 pt-5">
                  <div>
                    <p className="text-[11px] text-navy-400">شروع قیمت از</p>
                    <p className="text-lg font-black text-navy-800">
                      {formatToman(service.priceFrom)}
                      <span className="mr-1 text-xs font-bold text-navy-500">تومان</span>
                    </p>
                    <p className="text-[11px] text-navy-400">{service.priceUnit}</p>
                  </div>
                  <a
                    href="#request"
                    className={`rounded-xl px-4 py-2.5 text-sm font-bold text-white transition ${styles.btnBg}`}
                  >
                    ثبت درخواست
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-navy-500">
          خدمت مورد نظرتان در لیست نیست؟ با ما تماس بگیرید؛ راه‌حل سفارشی ارائه می‌دهیم.
        </p>
      </div>
    </section>
  );
}
