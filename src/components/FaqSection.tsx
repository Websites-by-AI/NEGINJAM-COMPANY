"use client";

import { useState } from "react";
import { faqs } from "@/lib/site";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-sand-100 py-20 md:py-28">
      <div className="container-nj grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <span className="inline-block rounded-full bg-navy-100 px-4 py-1.5 text-xs font-bold text-navy-700">
            سوالات متداول
          </span>
          <h2 className="mt-4 text-3xl font-black leading-relaxed text-navy-900 md:text-4xl">
            پاسخ پرسش‌های رایج شما
          </h2>
          <p className="mt-4 leading-8 text-navy-600">
            اگر پاسخ سوال خود را پیدا نکردید، کافی است تماس بگیرید؛ همکاران ما راهنمایی‌تان می‌کنند.
          </p>
          <a
            href="#request"
            className="mt-6 inline-block rounded-2xl bg-navy-800 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-mint-600"
          >
            پرسش خود را ثبت کنید
          </a>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div
                key={faq.q}
                className={`overflow-hidden rounded-2xl border bg-white transition ${
                  isOpen ? "border-mint-300 shadow-lg shadow-navy-900/5" : "border-navy-100"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-right"
                >
                  <span className="text-sm font-extrabold text-navy-900 md:text-base">{faq.q}</span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm transition ${
                      isOpen ? "rotate-45 bg-mint-500 text-white" : "bg-navy-50 text-navy-700"
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-dashed border-navy-100 px-6 py-5 text-sm leading-8 text-navy-600">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
