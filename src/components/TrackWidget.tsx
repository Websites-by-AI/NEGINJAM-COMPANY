"use client";

import { useState } from "react";
import { formatDateFa } from "@/lib/format";

type TrackedRequest = {
  code: string;
  serviceTitle: string;
  status: string;
  statusLabel: string;
  preferredDate: string;
  timeSlot: string;
  createdAt: string;
};

const STEPS = ["new", "contacted", "scheduled", "done"];

export default function TrackWidget() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<TrackedRequest | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`/api/requests/track?code=${encodeURIComponent(code.trim())}`);
      const data = (await response.json()) as {
        ok: boolean;
        message?: string;
        request?: TrackedRequest;
      };
      if (!data.ok || !data.request) {
        setError(data.message ?? "درخواستی یافت نشد.");
      } else {
        setResult(data.request);
      }
    } catch {
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setLoading(false);
    }
  }

  const activeIndex = result ? STEPS.indexOf(result.status) : -1;

  return (
    <div id="track" className="rounded-3xl border border-navy-100 bg-sand-100 p-6">
      <h3 className="text-lg font-black text-navy-900">پیگیری درخواست</h3>
      <p className="mt-2 text-xs leading-6 text-navy-500">
        کد پیگیری خود را وارد کنید تا وضعیت درخواستتان را ببینید. (نمونه: NJ-A1B2C3)
      </p>

      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="NJ-XXXXXX"
          dir="ltr"
          className="w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-center font-mono text-sm tracking-widest text-navy-900 outline-none focus:border-mint-400 focus:ring-4 focus:ring-mint-100"
        />
        <button
          type="submit"
          disabled={loading}
          className="shrink-0 rounded-xl bg-navy-800 px-6 py-3 text-sm font-bold text-white transition hover:bg-navy-900 disabled:opacity-60"
        >
          {loading ? "..." : "پیگیری"}
        </button>
      </form>

      {error && <p className="mt-4 text-sm font-semibold text-red-600">{error}</p>}

      {result && (
        <div className="mt-5 rounded-2xl border border-mint-200 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-sm font-black text-navy-800">{result.code}</span>
            <span className="rounded-full bg-mint-100 px-3 py-1 text-xs font-bold text-mint-700">
              {result.statusLabel}
            </span>
          </div>
          <p className="mt-3 text-sm text-navy-700">
            خدمت: <b>{result.serviceTitle}</b>
          </p>
          <p className="mt-1 text-xs text-navy-500">
            زمان درخواستی: {result.preferredDate} — {result.timeSlot}
          </p>
          <p className="mt-1 text-xs text-navy-400">ثبت شده در: {formatDateFa(result.createdAt)}</p>

          {result.status !== "cancelled" && (
            <div className="mt-5 flex items-center gap-1">
              {STEPS.map((step, index) => (
                <div key={step} className="flex flex-1 items-center gap-1">
                  <span
                    className={`h-2 flex-1 rounded-full ${
                      index <= activeIndex ? "bg-mint-500" : "bg-navy-100"
                    }`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
