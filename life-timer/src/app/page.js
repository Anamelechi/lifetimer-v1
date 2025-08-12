"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTimerStore } from "@/store/timerStore";
import { diffSince } from "@/lib/dateCalc";
import { get, set } from "idb-keyval";

function formatDotGroupedNumber(n) {
  try {
    const s = typeof n === "number" ? Math.trunc(n).toString() : (n ?? "").toString();
    return s.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  } catch {
    return String(n ?? "");
  }
}

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

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen p-6" />}> 
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  const search = useSearchParams();
  const { birthDate, setBirthDate } = useTimerStore();
  const [nowTick, setNowTick] = useState(0);
  const [fact, setFact] = useState(null);
  const [loadingFact, setLoadingFact] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Design demo mode: render the exact UI and numbers from the screenshot
  const demo = search?.get("demo") === "1";

  // Load birthDate from localStorage on first mount (date + time separately to avoid TZ shift)
  useEffect(() => {
    const savedDate = localStorage.getItem("life-timer:birthDate");
    const savedTime = localStorage.getItem("life-timer:birthTime");
    if (savedDate) setBirthDate(combineDateTime(savedDate, savedTime || "00:00"));
  }, [setBirthDate]);

  // Persist birthDate (store local date and time separately)
  useEffect(() => {
    if (birthDate) {
      const d = new Date(birthDate);
      localStorage.setItem("life-timer:birthDate", toDateOnlyString(d));
      localStorage.setItem("life-timer:birthTime", toTimeHMString(d));
    }
  }, [birthDate]);

  // Tick every second
  useEffect(() => {
    const t = setInterval(() => setNowTick((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Mark client mount to avoid SSR/client time mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  const live = useMemo(
    () => (mounted && birthDate ? diffSince(new Date(birthDate)) : null),
    [mounted, birthDate, nowTick]
  );
  const demoData = useMemo(
    () => ({
      years: 26,
      months: 0,
      weeks: 8,
      days: 5,
      hours: 19,
      minutes: 34,
      seconds: 28,
      totalSeconds: 823030468,
    }),
    []
  );
  const diff = demo ? demoData : live;

  // Additional breakdowns per request
  const now = useMemo(() => (mounted ? new Date() : null), [mounted, nowTick]);
  const startOfDay = useMemo(
    () => (now ? new Date(now.getFullYear(), now.getMonth(), now.getDate()) : null),
    [now]
  );
  const startOfHour = useMemo(
    () => (now ? new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()) : null),
    [now]
  );
  const startOfMonth = useMemo(() => (now ? new Date(now.getFullYear(), now.getMonth(), 1) : null), [now]);
  const hoursSinceDayStart = now && startOfDay ? Math.floor((now - startOfDay) / 3600000) : null;
  const minutesSinceHourStart = now && startOfHour ? Math.floor((now - startOfHour) / 60000) : null;
  const secondsSinceMinuteStart = now ? now.getSeconds() : null;
  const daysSinceMonthStart = now && startOfMonth ? Math.floor((now - startOfMonth) / (24 * 3600000)) : null;
  const weeksSinceMonthStart = daysSinceMonthStart != null ? Math.floor(daysSinceMonthStart / 7) : null;

  // Fetch random fact, cached by year in IndexedDB
  useEffect(() => {
    const run = async () => {
      if (!birthDate) return;
      const year = new Date(birthDate).getFullYear();
      const cacheKey = `fact:${year}`;
      const cached = await get(cacheKey);
      if (cached) {
        setFact(cached);
        return;
      }
      setLoadingFact(true);
      try {
        const res = await fetch(`/api/fact?year=${year}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          await set(cacheKey, data);
          setFact(data);
        }
      } catch {}
      finally {
        setLoadingFact(false);
      }
    };
    run();
  }, [birthDate]);

  const onPickDate = (e) => {
    const dateStr = e.target.value;
    if (!dateStr) return;
    const timeStr = birthDate ? toTimeHMString(new Date(birthDate)) : "00:00";
    const d = combineDateTime(dateStr, timeStr);
    if (!isNaN(d)) setBirthDate(d);
  };

  const onPickTime = (e) => {
    const timeStr = e.target.value;
    const dateStr = birthDate ? toDateOnlyString(new Date(birthDate)) : null;
    if (!dateStr) return; // require a date first
    const d = combineDateTime(dateStr, timeStr || "00:00");
    if (!isNaN(d)) setBirthDate(d);
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <main className="w-full max-w-md">
        {/* Top bar */}
        <div className="py-2 text-center">
          <h1 className="text-base tracking-wide text-white/90">Life Timer</h1>
        </div>

        {/* Seconds Alive + Dial */}
        <div className="mt-2 text-center">
          <p className="uppercase text-xs tracking-[0.2em] text-white/60 mb-3">Seconds Alive</p>
          <Dial>
            <span className="mono text-3xl sm:text-4xl font-semibold text-accent dial-value">
              {mounted && diff ? formatDotGroupedNumber(diff.totalSeconds) : "–"}
            </span>
          </Dial>
        </div>

        {/* Stats grid 2 columns in requested order */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <Stat label="YEARS" value={mounted ? diff?.years : null} />
          <Stat label="MONTHS" value={mounted ? diff?.months : null} />
          <Stat label="WEEKS" value={mounted ? weeksSinceMonthStart : null} />
          <Stat label="DAYS" value={mounted ? daysSinceMonthStart : null} />
          <Stat label="HOURS" value={mounted ? hoursSinceDayStart : null} />
          <Stat label="MINUTES" value={mounted ? minutesSinceHourStart : null} />
          <Stat label="SECONDS" value={mounted ? secondsSinceMinuteStart : null} full />
        </div>

        {/* Hidden inputs/fact in demo */}
        {!demo && (
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="date"
                onChange={onPickDate}
                className="bg-transparent border border-white/20 rounded px-3 py-2 text-sm focus:outline-none"
                aria-label="Pick birth date"
                value={birthDate ? toDateOnlyString(new Date(birthDate)) : ""}
              />
              <input
                type="time"
                step="60"
                onChange={onPickTime}
                className="bg-transparent border border-white/20 rounded px-3 py-2 text-sm focus:outline-none"
                aria-label="Pick time of birth"
                value={birthDate ? toTimeHMString(new Date(birthDate)) : ""}
                placeholder="00:00"
              />
            </div>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-3">Random Fact</h2>
              {!birthDate && <p className="text-white/70">Pick your birth date to fetch a fact.</p>}
              {birthDate && (
                <div>
                  {loadingFact && <p className="text-white/70">Fetching a fun fact…</p>}
                  {fact && (
                    <div>
                      <p className="text-white/90 leading-relaxed">{fact.text}</p>
                      {fact.year && <p className="mt-2 text-xs text-white/60">Year: {fact.year}</p>}
                    </div>
                  )}
                  {!loadingFact && !fact && (
                    <p className="text-white/70">No fact available offline. Try again online.</p>
                  )}
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

function Stat({ label, value, className = "", full = false }) {
  return (
    <div className={`${full ? "col-span-2" : ""} rounded-xl panel p-5 text-center ${className}`}>
      <div className="mono text-3xl text-accent">{value ?? "–"}</div>
      <div className="mt-1 text-[10px] tracking-[0.25em] text-white/60">{label}</div>
    </div>
  );
}

function Dial({ children }) {
  const ticks = new Array(12).fill(0);
  // Dial geometry (keep in sync with CSS .dial width/height & border)
  const dialSize = 230; // px
  const dialBorder = 4; // px
  const radius = dialSize / 2 - dialBorder;
  const baseTick = 36; // previous tick length for reference
  const innerGap = 8; // gap between tick inner end and number area
  return (
    <div className="mx-auto dial">
      <div className="relative w-full h-full flex items-center justify-center">
        {ticks.map((_, i) => {
          const isCardinal = i % 3 === 0; // 12,3,6,9 o'clock
          const len = isCardinal ? baseTick * 0.5 : baseTick * 0.25; // 50% vs 25%
          const shift = radius - len - innerGap;
          return (
            <span
              key={i}
              className="tick"
              style={{
                width: `${len}px`,
                transform: `rotate(${(i * 360) / 12}deg) translateX(${shift}px)`,
              }}
            />
          );
        })}
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}
