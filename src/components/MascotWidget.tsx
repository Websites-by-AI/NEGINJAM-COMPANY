"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const MESSAGES_SHY = [
  "سلام! من نگین هستم 👋 می‌تونم کمک کنم؟",
  "ممنون که به سایت ما اومدید... 🥹",
  "خدمات ما واقعاً با کیفیته، قول میدم! 🤫",
  "اگه سوالی دارید خوشحال میشم جواب بدم 😊",
  "برای همکاری دوجانبه هم آماده‌ایم! 🤝",
  "شماره ما: ۰۲۱-۷۷۹۴۷۰۳۵ 📞",
];

const MESSAGES_SHADY = [
  "ما بهترین نظافت‌کاران تهران هستیم 😎",
  "طراحی سایت؟ ما حلش می‌کنیم 💻",
  "تیزر تبلیغاتی می‌خوای؟ بیا پیش ما 🎬",
  "۲۰ سال سابقه — بقیه رو ول کن! 😏",
  "همکاری با نگین جم = درآمد بیشتر 🤑",
  "اعتماد شما، تعهد ماست 💪",
];

const TIPS = [
  { icon: "🧹", text: "نظافت بعد از بازسازی تخصص ماست!" },
  { icon: "💻", text: "سایت حرفه‌ای با قیمت مناسب" },
  { icon: "🎬", text: "تیزر ۳۰ ثانیه‌ای ظرف ۵ روز" },
  { icon: "🤝", text: "همکاری دوجانبه با کمیسیون" },
  { icon: "⚡", text: "اعزام نیرو در کمتر از ۲ ساعت" },
];

type Mood = "shy" | "shady";

export default function MascotWidget() {
  const [open, setOpen] = useState(false);
  const [mood, setMood] = useState<Mood>("shy");
  const [messageIndex, setMessageIndex] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [blinking, setBlinking] = useState(false);
  const [bouncing, setBouncing] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const messages = mood === "shy" ? MESSAGES_SHY : MESSAGES_SHADY;

  // rotate message every 4s
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
      setShowBubble(false);
      setTimeout(() => setShowBubble(true), 150);
    }, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [messages.length, mood]);

  // rotate tip every 6s
  useEffect(() => {
    const t = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % TIPS.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  // random blink
  useEffect(() => {
    const blink = () => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 200);
    };
    const t = setInterval(blink, Math.random() * 3000 + 2000);
    return () => clearInterval(t);
  }, []);

  function toggleMood() {
    setMood((prev) => (prev === "shy" ? "shady" : "shy"));
    setMessageIndex(0);
    setBouncing(true);
    setTimeout(() => setBouncing(false), 600);
  }

  function handleAvatarClick() {
    if (!open) {
      setOpen(true);
    } else {
      toggleMood();
    }
  }

  const tip = TIPS[tipIndex];

  return (
    <div className="fixed bottom-24 left-4 z-50 flex flex-col items-end gap-2 sm:bottom-8 sm:left-6">
      {/* Chat bubble */}
      {open && (
        <div
          className={`transition-all duration-300 ${
            showBubble ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <div className="relative mb-2 max-w-[240px] rounded-2xl rounded-bl-sm border border-navy-100 bg-white px-4 py-3 shadow-xl shadow-navy-900/15">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-navy-200 text-[10px] text-navy-700 hover:bg-red-100 hover:text-red-600"
            >
              ✕
            </button>
            <p className="text-xs font-bold leading-6 text-navy-800">
              {messages[messageIndex]}
            </p>

            {/* mood switcher */}
            <button
              type="button"
              onClick={toggleMood}
              className="mt-2 flex items-center gap-1.5 rounded-lg bg-navy-50 px-2 py-1 text-[10px] font-bold text-navy-600 transition hover:bg-navy-100"
            >
              {mood === "shy" ? "🕶️ حالت باحال!" : "🥹 حالت خجالتی!"}
            </button>

            {/* tip strip */}
            <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2 py-1.5 text-[10px] text-emerald-700">
              <span>{tip.icon}</span>
              <span className="font-semibold leading-5">{tip.text}</span>
            </div>

            {/* CTA */}
            <a
              href="#request"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-lg bg-emerald-500 py-2 text-center text-[10px] font-extrabold text-white transition hover:bg-emerald-600"
            >
              ثبت درخواست رایگان →
            </a>

            {/* tail */}
            <div className="absolute -bottom-2 right-4 h-4 w-4 rotate-45 border-b border-r border-navy-100 bg-white" />
          </div>
        </div>
      )}

      {/* Avatar button */}
      <button
        type="button"
        onClick={handleAvatarClick}
        aria-label="باز کردن دستیار نگین"
        className={`group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 shadow-xl transition-all duration-300 focus:outline-none
          ${mood === "shy"
            ? "border-emerald-300 bg-emerald-50 shadow-emerald-200"
            : "border-indigo-400 bg-indigo-50 shadow-indigo-200"
          }
          ${bouncing ? "animate-bounce" : "hover:-translate-y-1 hover:scale-110"}
        `}
      >
        <span
          className={`absolute inset-0 transition-opacity duration-200 ${blinking ? "opacity-0" : "opacity-100"}`}
        >
          <Image
            src={mood === "shy" ? "/images/mascot-shy.png" : "/images/mascot-shady.png"}
            alt={mood === "shy" ? "نگین — حالت خجالتی" : "نگین — حالت باحال"}
            fill
            sizes="64px"
            className="object-cover"
          />
        </span>

        {/* notification dot when closed */}
        {!open && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-black text-white shadow">
            !
          </span>
        )}
      </button>

      {/* label */}
      <p className="text-center text-[9px] font-bold text-navy-400">
        {mood === "shy" ? "🥹 نگین" : "😎 نگین"}
      </p>
    </div>
  );
}
