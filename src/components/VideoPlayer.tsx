"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const SCENES = [
  {
    id: 1,
    timeCode: "۰–۵ ثانیه",
    label: "Hook شروع 🎬",
    duration: 5000,
    image: "/images/scene-dark-room.jpg",
    bgGradient: "from-slate-900 via-slate-800 to-slate-900",
    accentColor: "#ef4444",
    accentBg: "bg-red-500",
    sfx: "🚪 صدای در + خروپف",
    techTag: "console.log('اتاق_کثیف')  // ERROR 💀",
    narration: "تا حالا اتاق یه برنامه‌نویس رو بعد از سابمیت کردن پروژه دیدید؟ کثیفی موج می‌زنه! امروز اومدیم این اتاق رو دیباگ کنیم 💻🧹",
    overlayTexts: [
      { text: "⚠️ BUG DETECTED", style: "font-mono text-red-400 text-2xl font-black animate-pulse", delay: 0 },
      { text: "کثیفی.level = CRITICAL", style: "font-mono text-red-300 text-sm", delay: 800 },
      { text: "💀 اتاق برنامه‌نویس پس از deploy", style: "text-white text-base font-bold", delay: 1600 },
    ],
    codeSnippet: `// آخرین commit: ۳ روز پیش
// آخرین حمام: نامشخص 😅
status: CRITICAL_MESS`,
  },
  {
    id: 2,
    timeCode: "۵–۱۵ ثانیه",
    label: "شروع نظافت 🧹",
    duration: 10000,
    image: "/images/scene-cleaning-start.jpg",
    bgGradient: "from-emerald-900 via-emerald-800 to-slate-900",
    accentColor: "#10b981",
    accentBg: "bg-emerald-500",
    sfx: "💦 اسپری پیس‌پیس + ASMR دستمال",
    techTag: "git rm --cached آشغال.exe",
    narration: "اول باید این آشغال‌ها رو Shift + Delete کنیم! لکه‌های قهوه مثل کدهای باگ‌دار چسبیدن ولی نگین جم براشون راه‌حل داره!",
    overlayTexts: [
      { text: "🧹 Shift + Delete", style: "font-mono text-emerald-300 text-2xl font-black", delay: 0 },
      { text: "آشغال‌ها در حال پاک‌سازی...", style: "font-mono text-emerald-200 text-sm animate-pulse", delay: 600 },
      { text: "✅ debug() موفق بود!", style: "font-mono text-green-400 text-base font-bold", delay: 1400 },
    ],
    codeSnippet: `// نگین جم Debug Tool v20.0
rm -rf ./قوطی_ردبول/*
rm -rf ./ماگ_قهوه/*
✅ Clean successful!`,
  },
  {
    id: 3,
    timeCode: "۱۵–۳۵ ثانیه",
    label: "کشف تعرفه‌ها 🔍",
    duration: 20000,
    image: "/images/scene-monitor-tariff.jpg",
    bgGradient: "from-sky-900 via-sky-800 to-slate-900",
    accentColor: "#38bdf8",
    accentBg: "bg-sky-500",
    sfx: "⌨️ کیبورد مکانیکی",
    techTag: "cat تعرفه_1404.txt // 👀 محرمانه!",
    narration: "داشتم دور مانیتورش رو دستمال می‌کشیدم که چشمم خورد به یه سند محرمانه! تعرفه‌های طراحی سایت سال ۱۴۰۵!",
    overlayTexts: [
      { text: "📄 تعرفه_طراحی_سایت_1404.txt", style: "font-mono text-sky-300 text-lg font-black", delay: 0 },
      { text: "🔒 CONFIDENTIAL", style: "font-mono text-red-400 text-sm animate-pulse", delay: 500 },
      { text: "👀 بد نیست شما هم بدونید...", style: "text-white text-base font-bold", delay: 1200 },
    ],
    codeSnippet: `# تعرفه طراحی سایت ۱۴۰۵
# سند: محرمانه 🔒
# منبع: مانیتور برنامه‌نویس خوابیده 😂`,
  },
  {
    id: 4,
    timeCode: "۳۵–۴۵ ثانیه",
    label: "تعرفه سایت‌ساز 💡",
    duration: 10000,
    image: "/images/scene-keyboard-clean.jpg",
    bgGradient: "from-amber-900 via-amber-800 to-slate-900",
    accentColor: "#f59e0b",
    accentBg: "bg-amber-500",
    sfx: "💨 فوت کردن گرد از کیبورد",
    techTag: "npm install وب‌سایت_ارزون --save",
    narration: "سایت‌های آماده و پکیجی از ۵ تا ۱۵ میلیون تومن شروع می‌شه. برای شروع کاره، ولی امکاناتش پایه‌ست.",
    overlayTexts: [
      { text: "💡 سایت‌ساز آماده", style: "text-amber-300 text-2xl font-black", delay: 0 },
      { text: "۵ تا ۱۵ میلیون تومان", style: "font-mono text-amber-200 text-xl font-bold", delay: 600 },
      { text: "⚡ سریع ولی ساده", style: "text-amber-100 text-sm", delay: 1200 },
    ],
    codeSnippet: `// گزینه ۱: سایت‌ساز آماده
price: 5_000_000 - 15_000_000 تومان
delivery: سریع ⚡
features: ['پایه', 'آماده', 'محدود']`,
  },
  {
    id: 5,
    timeCode: "۴۵–۵۵ ثانیه",
    label: "وردپرس و اختصاصی 🖥️",
    duration: 10000,
    image: "/images/scene-pc-case.jpg",
    bgGradient: "from-violet-900 via-violet-800 to-slate-900",
    accentColor: "#a78bfa",
    accentBg: "bg-violet-500",
    sfx: "💨 پمپ باد ووووش",
    techTag: "composer require wordpress/pro && npm run build",
    narration: "سایت شرکتی یا فروشگاهی وردپرسی: ۱۶ تا ۶۵ میلیون. سیستم اختصاصی و امنیت بالا؟ بالای ۷۵ میلیون!",
    overlayTexts: [
      { text: "🖥️ وردپرس حرفه‌ای", style: "text-violet-300 text-xl font-black", delay: 0 },
      { text: "۱۶ – ۶۵ میلیون تومان", style: "font-mono text-violet-200 text-xl font-bold", delay: 500 },
      { text: "💎 اختصاصی: +۷۵ میلیون", style: "text-white text-base font-bold", delay: 1000 },
    ],
    codeSnippet: `// گزینه ۲: وردپرس حرفه‌ای
price: 16_000_000 - 65_000_000 تومان
// گزینه ۳: سیستم اختصاصی  
price: 75_000_000+ تومان 🔥`,
  },
  {
    id: 6,
    timeCode: "۵۵–۶۵ ثانیه",
    label: "پکیج‌های نگین جم 💎",
    duration: 10000,
    image: "/images/scene-clean-room.jpg",
    bgGradient: "from-emerald-800 via-navy-800 to-navy-900",
    accentColor: "#34d399",
    accentBg: "bg-emerald-400",
    sfx: "✨ افکت جادویی Sparkle!",
    techTag: "neginjam.deploy() // ✅ SUCCESS",
    narration: "ما توی نگین جم، خودمون خدمات دیجیتال داریم! پایه ۱۸م، پیشرفته ۳۵م، VIP ۶۵م و سازمانی اختصاصی!",
    overlayTexts: [
      { text: "✨ نگین جم", style: "text-white text-3xl font-black", delay: 0 },
      { text: "🌱 پایه ۱۸م | 🚀 پیشرفته ۳۵م", style: "font-mono text-emerald-300 text-sm font-bold", delay: 500 },
      { text: "💎 VIP ۶۵م | 🏛️ سازمانی توافقی", style: "font-mono text-emerald-200 text-sm font-bold", delay: 1000 },
    ],
    codeSnippet: `// پکیج‌های نگین جم ۱۴۰۵
const packages = {
  basic: '18M تومان ✅',
  advanced: '35M تومان 🚀',
  vip: '65M تومان 💎',
  enterprise: 'توافقی 🏛️'
}`,
  },
  {
    id: 7,
    timeCode: "۶۵–۷۵ ثانیه",
    label: "CTA پایانی 🎯",
    duration: 10000,
    image: "/images/scene-dark-room.jpg",
    bgGradient: "from-emerald-700 via-navy-700 to-navy-900",
    accentColor: "#ffffff",
    accentBg: "bg-white",
    sfx: "🎵 موزیک پرانرژی",
    techTag: "دایرکت('نگین') → success ✅",
    narration: "هم اتاق دیباگ شد هم قیمت‌ها دستتون اومد! برای سفارش نظافت یا طراحی سایت، همین الان کلمه «نگین» رو دایرکت بفرست!",
    overlayTexts: [
      { text: "🎯 همین الان اقدام کن!", style: "text-white text-2xl font-black animate-bounce", delay: 0 },
      { text: "کلمه «نگین» رو دایرکت بفرست", style: "text-emerald-300 text-base font-bold", delay: 600 },
      { text: "☎ ۰۲۱-۷۷۹۴۷۰۳۵", style: "font-mono text-white text-lg font-black", delay: 1200 },
    ],
    codeSnippet: `// CTA Final
sendDirect('نگین') 
  .then(() => getService())
  .then(() => success('🎉'))
// ☎ 021-77947035`,
  },
];

const TOTAL_DURATION = SCENES.reduce((sum, s) => sum + s.duration, 0);

export default function VideoPlayer() {
  const [currentScene, setCurrentScene] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [sceneElapsed, setSceneElapsed] = useState(0);
  const [visibleTexts, setVisibleTexts] = useState<boolean[]>([]);
  const [showCode, setShowCode] = useState(false);
  const [typedCode, setTypedCode] = useState("");
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const sceneElapsedRef = useRef(0);

  const scene = SCENES[currentScene];
  const totalElapsed = SCENES.slice(0, currentScene).reduce((s, sc) => s + sc.duration, 0) + sceneElapsed;
  const overallProgress = (totalElapsed / TOTAL_DURATION) * 100;
  const sceneProgress = (sceneElapsed / scene.duration) * 100;

  // reset texts on scene change
  useEffect(() => {
    setVisibleTexts([]);
    setShowCode(false);
    setTypedCode("");
    sceneElapsedRef.current = 0;
    setSceneElapsed(0);

    if (!playing) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    scene.overlayTexts.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleTexts((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, scene.overlayTexts[i].delay);
      timers.push(t);
    });

    const codeTimer = setTimeout(() => {
      setShowCode(true);
    }, 600);
    timers.push(codeTimer);

    return () => timers.forEach(clearTimeout);
  }, [currentScene, playing, scene.overlayTexts, scene.overlayTexts.length]);

  // typing effect for code
  useEffect(() => {
    if (!showCode || !playing) return;
    const code = scene.codeSnippet;
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setTypedCode(code.slice(0, i));
      if (i >= code.length) clearInterval(t);
    }, 28);
    return () => clearInterval(t);
  }, [showCode, scene.codeSnippet, playing]);

  const tick = useCallback((timestamp: number) => {
    if (lastTimeRef.current === null) {
      lastTimeRef.current = timestamp;
    }
    const delta = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    sceneElapsedRef.current += delta;
    setSceneElapsed(sceneElapsedRef.current);
    setElapsed((prev) => prev + delta);

    if (sceneElapsedRef.current >= SCENES[currentScene].duration) {
      if (currentScene < SCENES.length - 1) {
        setCurrentScene((prev) => prev + 1);
        lastTimeRef.current = null;
      } else {
        // end
        setPlaying(false);
        setCurrentScene(0);
        setElapsed(0);
        sceneElapsedRef.current = 0;
        setSceneElapsed(0);
        lastTimeRef.current = null;
        return;
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [currentScene]);

  useEffect(() => {
    if (playing) {
      lastTimeRef.current = null;
      rafRef.current = requestAnimationFrame(tick);
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing, tick]);

  function handlePlay() {
    if (playing) {
      setPlaying(false);
    } else {
      if (!playing && currentScene === SCENES.length - 1 && sceneElapsed >= scene.duration - 100) {
        setCurrentScene(0);
        setElapsed(0);
        sceneElapsedRef.current = 0;
        setSceneElapsed(0);
      }
      // show texts immediately on play
      scene.overlayTexts.forEach((_, i) => {
        setVisibleTexts((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      });
      setShowCode(true);
      setPlaying(true);
    }
  }

  function jumpToScene(idx: number) {
    setCurrentScene(idx);
    setPlaying(false);
    setElapsed(0);
    sceneElapsedRef.current = 0;
    setSceneElapsed(0);
    lastTimeRef.current = null;
    // show texts for preview
    SCENES[idx].overlayTexts.forEach((_, i) => {
      setVisibleTexts((prev) => {
        const next = [...prev];
        next[i] = true;
        return next;
      });
    });
    setShowCode(true);
    setTypedCode(SCENES[idx].codeSnippet);
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl shadow-black/50">

      {/* ── MAIN SCREEN ── */}
      <div className={`relative aspect-[9/16] w-full overflow-hidden bg-gradient-to-b sm:aspect-video ${scene.bgGradient}`}>
        {/* background image */}
        <Image
          key={scene.image}
          src={scene.image}
          alt={scene.label}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover opacity-40 transition-opacity duration-700"
          priority
        />

        {/* dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

        {/* ── PHONE FRAME overlay ── */}
        <div className="absolute inset-0 flex flex-col">

          {/* top bar — status bar style */}
          <div className="flex items-center justify-between px-5 pt-4 text-[11px] font-bold text-white/70">
            <span className="font-mono">NJ Studio</span>
            <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-black text-white animate-pulse">
              ● LIVE
            </span>
            <span className="font-mono">{scene.timeCode}</span>
          </div>

          {/* scene label chip */}
          <div className="px-5 pt-3">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black text-white ${scene.accentBg}`}>
              {scene.label}
            </span>
          </div>

          {/* ── OVERLAY TEXTS ── */}
          <div className="flex flex-1 flex-col justify-center px-5 gap-3">
            {scene.overlayTexts.map((item, i) => (
              <div
                key={i}
                className={`transition-all duration-500 ${
                  visibleTexts[i] ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                <span className={item.style}>{item.text}</span>
              </div>
            ))}
          </div>

          {/* ── CODE TERMINAL ── */}
          <div className="mx-4 mb-4">
            <div
              className={`overflow-hidden rounded-2xl border border-emerald-400/30 bg-black/70 backdrop-blur transition-all duration-500 ${
                showCode ? "max-h-36 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="mr-2 text-[10px] font-mono text-white/40">neginjam.debug</span>
              </div>
              <pre className="overflow-auto px-4 py-3 font-mono text-[11px] leading-6 text-emerald-300">
                {typedCode}
                {playing && typedCode.length < scene.codeSnippet.length && (
                  <span className="animate-pulse text-white">█</span>
                )}
              </pre>
            </div>
          </div>

          {/* ── NARRATION BAR ── */}
          <div className="mx-4 mb-4">
            <div className="rounded-2xl border border-white/10 bg-black/60 px-4 py-3 backdrop-blur">
              <div className="mb-2 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${scene.accentBg} ${playing ? "animate-pulse" : ""}`} />
                <span className="text-[10px] font-bold text-white/50">🎙️ نریشن</span>
              </div>
              <p className="text-sm font-bold leading-7 text-white">
                {scene.narration}
              </p>
            </div>
          </div>

          {/* SFX badge */}
          <div className="absolute top-16 left-4">
            <span className="rounded-xl border border-white/20 bg-black/50 px-3 py-1.5 text-[10px] font-bold text-white/70 backdrop-blur">
              {scene.sfx}
            </span>
          </div>

          {/* tech tag watermark */}
          <div className="absolute top-20 right-4">
            <span className="rounded-lg bg-black/60 px-2 py-1 font-mono text-[9px] text-emerald-400 backdrop-blur">
              {scene.techTag}
            </span>
          </div>
        </div>

        {/* scene progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div
            className={`h-full transition-none ${scene.accentBg}`}
            style={{ width: `${sceneProgress}%` }}
          />
        </div>
      </div>

      {/* ── CONTROLS ── */}
      <div className="bg-slate-900 p-4">
        {/* overall progress */}
        <div className="mb-3 flex items-center gap-3">
          <span className="w-8 text-right font-mono text-[10px] text-slate-500">
            {Math.floor(totalElapsed / 1000)}s
          </span>
          <div className="relative flex-1 h-2 overflow-hidden rounded-full bg-slate-700">
            <div
              className="absolute inset-y-0 right-0 bg-emerald-500 transition-none"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <span className="w-8 font-mono text-[10px] text-slate-500">75s</span>
        </div>

        {/* play/pause + scene info */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePlay}
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl font-black text-white transition ${
              playing ? "bg-red-500 hover:bg-red-600" : "bg-emerald-500 hover:bg-emerald-600"
            }`}
          >
            {playing ? "⏸" : "▶"}
          </button>

          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-extrabold text-white">{scene.label}</p>
            <p className="text-[11px] text-slate-500">{scene.timeCode} — صحنه {currentScene + 1} از {SCENES.length}</p>
          </div>

          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setCurrentScene(0);
              setElapsed(0);
              sceneElapsedRef.current = 0;
              setSceneElapsed(0);
              setVisibleTexts([]);
              setShowCode(false);
              setTypedCode("");
              lastTimeRef.current = null;
            }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-700 text-sm text-white hover:bg-slate-600"
          >
            ↺
          </button>
        </div>

        {/* scene thumbnails */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {SCENES.map((sc, idx) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => jumpToScene(idx)}
              className={`relative flex-shrink-0 overflow-hidden rounded-xl border-2 transition ${
                currentScene === idx
                  ? "border-emerald-400 scale-105"
                  : "border-transparent opacity-60 hover:opacity-90 hover:border-slate-500"
              }`}
            >
              <div className="relative h-14 w-20">
                <Image
                  src={sc.image}
                  alt={sc.label}
                  fill
                  sizes="80px"
                  className="object-cover brightness-75"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 bg-black/30 p-1">
                  <span className="text-base leading-none">{sc.overlayTexts[0].text.slice(0, 2)}</span>
                  <span className="text-center font-mono text-[8px] font-bold leading-none text-white">
                    {sc.timeCode}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── SHARE / HASHTAGS ── */}
      <div className="border-t border-white/5 bg-slate-950 px-4 py-3">
        <div className="flex flex-wrap gap-2">
          {["#نگین_جم", "#دیباگ_نظافت", "#اتاق_برنامه_نویس", "#ASMR", "#وایرال"].map((tag) => (
            <span key={tag} className="rounded-full bg-slate-800 px-3 py-1 text-[11px] font-bold text-slate-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
