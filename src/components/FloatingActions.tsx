import { site } from "@/lib/site";

export default function FloatingActions() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-100 bg-white/95 p-3 backdrop-blur sm:inset-x-auto sm:bottom-6 sm:left-6 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
      <div className="flex gap-3 sm:flex-col">
        <a
          href={site.phoneHref}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-navy-800 px-5 py-3.5 text-sm font-extrabold text-white shadow-xl transition hover:bg-navy-900 sm:flex-none"
        >
          ☎ تماس فوری
        </a>
        <a
          href="#request"
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-mint-500 px-5 py-3.5 text-sm font-extrabold text-white shadow-xl shadow-mint-500/25 transition hover:bg-mint-600 sm:flex-none"
        >
          📝 درخواست نیرو
        </a>
      </div>
    </div>
  );
}
