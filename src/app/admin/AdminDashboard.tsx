"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { formatDateFa, toFa } from "@/lib/format";
import { STATUS_LABELS, STATUS_ORDER } from "@/lib/site";

export type AdminRequest = {
  id: number;
  code: string;
  fullName: string;
  phone: string;
  address: string;
  district: string;
  serviceTitle: string;
  requestType: string;
  preferredDate: string;
  timeSlot: string;
  workers: number;
  notes: string;
  status: string;
  createdAt: string;
};

const statusStyles: Record<string, string> = {
  new: "bg-amber-100 text-amber-800",
  contacted: "bg-sky-100 text-sky-800",
  scheduled: "bg-indigo-100 text-indigo-800",
  done: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

const typeStyles: Record<string, { badge: string; label: string }> = {
  cleaning: { badge: "bg-emerald-100 text-emerald-700", label: "🧹 نظافت" },
  web:      { badge: "bg-sky-100 text-sky-700",         label: "💻 سایت" },
  video:    { badge: "bg-indigo-100 text-indigo-700",   label: "🎬 ویدیو" },
};

export default function AdminDashboard({ requests }: { requests: AdminRequest[] }) {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter]   = useState<string>("all");
  const [query, setQuery] = useState("");
  const [pending, startTransition] = useTransition();
  const [busyId, setBusyId] = useState<number | null>(null);

  const counts = useMemo(() => {
    const base: Record<string, number> = { all: requests.length };
    for (const status of STATUS_ORDER) {
      base[status] = requests.filter((r) => r.status === status).length;
    }
    return base;
  }, [requests]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return requests.filter((item) => {
      const okStatus = statusFilter === "all" || item.status === statusFilter;
      const okType   = typeFilter === "all"   || item.requestType === typeFilter;
      const okQuery  = q.length === 0 ||
        [item.code, item.fullName, item.phone, item.serviceTitle, item.district]
          .join(" ").toLowerCase().includes(q);
      return okStatus && okType && okQuery;
    });
  }, [requests, statusFilter, typeFilter, query]);

  async function updateStatus(id: number, status: string) {
    setBusyId(id);
    try {
      await fetch("/api/requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      startTransition(() => router.refresh());
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-5">

      {/* ── STATUS FILTER CARDS ── */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {(["all", ...STATUS_ORDER] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setStatusFilter(key)}
            className={`rounded-2xl border px-3 py-3 text-right transition ${
              statusFilter === key
                ? "border-emerald-400 bg-emerald-50 shadow-sm"
                : "border-navy-100 bg-white hover:border-navy-200"
            }`}
          >
            <span className="block text-[11px] text-navy-500">
              {key === "all" ? "همه" : STATUS_LABELS[key]}
            </span>
            <span className="mt-0.5 block text-xl font-black text-navy-900">
              {toFa(counts[key] ?? 0)}
            </span>
          </button>
        ))}
      </div>

      {/* ── TYPE + SEARCH ROW ── */}
      <div className="flex flex-wrap gap-3">
        <div className="flex gap-2">
          {[
            { key: "all", label: "همه نوع‌ها" },
            { key: "cleaning", label: "🧹 نظافت" },
            { key: "web",      label: "💻 سایت" },
            { key: "video",    label: "🎬 ویدیو" },
          ].map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTypeFilter(t.key)}
              className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                typeFilter === t.key
                  ? "bg-navy-900 text-white"
                  : "border border-navy-100 bg-white text-navy-600 hover:border-navy-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="🔍  جستجوی نام، کد، شماره، خدمت..."
          className="flex-1 min-w-[200px] rounded-2xl border border-navy-100 bg-white px-5 py-2.5 text-sm outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
        />
        <span className="self-center rounded-xl bg-navy-100 px-3 py-2 text-xs font-bold text-navy-600">
          {toFa(visible.length)} نتیجه
        </span>
      </div>

      {/* ── REQUEST CARDS ── */}
      {visible.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-navy-200 bg-white p-14 text-center text-sm text-navy-500">
          درخواستی با این فیلتر پیدا نشد.
        </div>
      ) : (
        <div className="space-y-3">
          {visible.map((item) => {
            const typeInfo = typeStyles[item.requestType] ?? typeStyles.cleaning;
            return (
              <article
                key={item.id}
                className={`rounded-3xl border border-navy-100 bg-white p-5 shadow-sm transition ${
                  busyId === item.id || pending ? "opacity-60" : ""
                }`}
              >
                {/* header row */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-xl bg-navy-900 px-3 py-1.5 font-mono text-xs font-black tracking-widest text-emerald-300">
                      {item.code}
                    </span>
                    <span className="text-base font-extrabold text-navy-900">{item.fullName}</span>
                    <a
                      href={`tel:${item.phone}`}
                      dir="ltr"
                      className="rounded-lg bg-navy-50 px-3 py-1 font-mono text-xs font-bold text-navy-700 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      📞 {item.phone}
                    </a>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${typeInfo.badge}`}>
                      {typeInfo.label}
                    </span>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusStyles[item.status] ?? "bg-navy-100 text-navy-700"}`}>
                    {STATUS_LABELS[item.status] ?? item.status}
                  </span>
                </div>

                {/* info grid */}
                <div className="mt-4 grid gap-3 text-sm md:grid-cols-4">
                  <InfoBox label="نوع خدمات" value={item.serviceTitle} />
                  <InfoBox label="زمان درخواستی" value={`${toFa(item.preferredDate) || "—"} | ${item.timeSlot}`} />
                  <InfoBox label="نیروی درخواستی" value={`${toFa(item.workers)} نفر`} />
                  <InfoBox label="منطقه" value={item.district || "—"} />
                  <InfoBox label="آدرس" value={item.address} className="md:col-span-2" />
                  {item.notes && <InfoBox label="توضیحات" value={item.notes} className="md:col-span-2" />}
                </div>

                {/* status buttons */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-navy-100 pt-4">
                  <span className="text-xs text-navy-400">
                    🕐 {formatDateFa(item.createdAt)}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {STATUS_ORDER.map((status) => (
                      <button
                        key={status}
                        type="button"
                        disabled={item.status === status || busyId === item.id}
                        onClick={() => updateStatus(item.id, status)}
                        className={`rounded-xl px-3 py-2 text-xs font-bold transition disabled:cursor-not-allowed ${
                          item.status === status
                            ? "bg-navy-900 text-white"
                            : "bg-navy-50 text-navy-700 hover:bg-emerald-100 hover:text-emerald-800"
                        }`}
                      >
                        {STATUS_LABELS[status]}
                      </button>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

function InfoBox({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={`rounded-xl bg-sand-100 px-4 py-3 ${className}`}>
      <span className="block text-[11px] text-navy-400">{label}</span>
      <span className="mt-1 block text-sm font-semibold leading-6 text-navy-800">{value}</span>
    </div>
  );
}
