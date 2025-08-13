"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTimerStore } from "@/store/timerStore";
import BackButton from "@/components/BackButton";

function toDateOnlyString(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function toTimeHMString(d) {
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}
function combineDateTime(dateStr, timeStr = "00:00") {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split("-").map((x) => parseInt(x, 10));
  const [hh, mm] = (timeStr || "00:00").split(":").map((x) => parseInt(x, 10));
  return new Date(y, (m || 1) - 1, d || 1, hh || 0, mm || 0, 0, 0);
}

export default function AgeSelectionPage() {
  const router = useRouter();
  const { birthDate, setBirthDate } = useTimerStore();
  const [dateStr, setDateStr] = useState("");
  const [timeStr, setTimeStr] = useState("00:00");

  useEffect(() => {
    // hydrate from localStorage if present
    const savedDate = typeof window !== "undefined" ? localStorage.getItem("life-timer:birthDate") : null;
    const savedTime = typeof window !== "undefined" ? localStorage.getItem("life-timer:birthTime") : null;
    if (savedDate) setDateStr(savedDate);
    if (savedTime) setTimeStr(savedTime);
    if (birthDate && !savedDate) {
      const d = new Date(birthDate);
      setDateStr(toDateOnlyString(d));
      setTimeStr(toTimeHMString(d));
    }
  }, [birthDate]);

  const onSave = () => {
    const d = combineDateTime(dateStr, timeStr || "00:00");
    if (!d || isNaN(d)) return;
    setBirthDate(d);
    if (typeof window !== "undefined") {
      localStorage.setItem("life-timer:birthDate", dateStr);
      localStorage.setItem("life-timer:birthTime", timeStr || "00:00");
    }
  router.push("/");
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <main className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <BackButton fallback="/device/welcome" />
          <h1 className="text-xl font-semibold">Select Your Birth Date & Time</h1>
          <span className="w-[64px]" />
        </div>
        <div className="glass rounded-2xl p-6 space-y-4">
          <label className="block text-sm text-white/80">
            Date
            <input
              type="date"
              className="mt-1 w-full bg-transparent border border-white/20 rounded px-3 py-2 text-sm focus:outline-none"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
            />
          </label>
          <label className="block text-sm text-white/80">
            Time (optional)
            <input
              type="time"
              step="60"
              className="mt-1 w-full bg-transparent border border-white/20 rounded px-3 py-2 text-sm focus:outline-none"
              value={timeStr}
              onChange={(e) => setTimeStr(e.target.value)}
            />
          </label>
          <button
            onClick={onSave}
            className="w-full bg-black text-white border border-white font-medium rounded-lg py-2 transition hover:bg-black/90"
            disabled={!dateStr}
          >
            Continue
          </button>
        </div>
      </main>
    </div>
  );
}
