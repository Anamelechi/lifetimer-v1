"use client";

import { useEffect, useMemo, useState } from "react";
import { useTimerStore } from "@/store/timerStore";
import { diffSince, formatMonospaceNumber } from "@/lib/dateCalc";
import { get, set } from "idb-keyval";

export default function Home() {
  const { birthDate, setBirthDate, showWeeks, toggleMode } = useTimerStore();
  const [nowTick, setNowTick] = useState(0);
  const [fact, setFact] = useState(null);
  const [loadingFact, setLoadingFact] = useState(false);

  // Load birthDate from localStorage on first mount
  useEffect(() => {
    const saved = localStorage.getItem("life-timer:birthDate");
    if (saved) setBirthDate(new Date(saved));
  }, [setBirthDate]);

  // Persist birthDate
  useEffect(() => {
    if (birthDate) localStorage.setItem("life-timer:birthDate", new Date(birthDate).toISOString());
  }, [birthDate]);

  // Tick every second
  useEffect(() => {
    const t = setInterval(() => setNowTick((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = useMemo(() => (birthDate ? diffSince(new Date(birthDate)) : null), [birthDate, nowTick]);

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

  const onPick = (e) => {
    const val = e.target.value;
    if (!val) return;
    const d = new Date(val);
    if (!isNaN(d)) setBirthDate(d);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <main className="w-full max-w-3xl space-y-6">
        {/* Card */}
        <section className="glass rounded-2xl p-6 sm:p-8">
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h1 className="text-xl font-semibold tracking-tight">Life Timer</h1>
            <div className="flex items-center gap-2">
              <input
                type="date"
                onChange={onPick}
                className="bg-transparent border border-white/20 rounded px-3 py-2 text-sm focus:outline-none"
                aria-label="Pick birth date"
                value={birthDate ? new Date(birthDate).toISOString().slice(0, 10) : ""}
              />
              <button
                onClick={toggleMode}
                className="border border-white/20 rounded px-3 py-2 text-sm hover:bg-white/10"
              >
                {showWeeks ? "Show Days" : "Show Weeks"}
              </button>
            </div>
          </header>

          {/* Top: large seconds-alive counter */}
          <div className="mt-6 text-center">
            <p className="uppercase text-xs tracking-wider text-white/60 mb-2">Seconds Alive</p>
            <div className="mono text-4xl sm:text-5xl font-medium">
              {diff ? formatMonospaceNumber(diff.totalSeconds) : "–"}
            </div>
          </div>

          {/* Rows */}
          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            <Stat label="Years" value={diff?.years} />
            <Stat label="Months" value={diff?.months} />
            <Stat label={showWeeks ? "Weeks" : "Days"} value={showWeeks ? diff?.weeks : diff?.days} />
            <Stat label="Days" value={diff?.days} className={showWeeks ? "hidden" : ""} />
            <Stat label="Hours" value={diff?.hours} />
            <Stat label="Minutes" value={diff?.minutes} />
            <Stat label="Seconds" value={diff?.seconds} />
          </div>
        </section>

        {/* Random Fact */}
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
      </main>
    </div>
  );
}

function Stat({ label, value, className = "" }) {
  return (
    <div className={`rounded-lg border border-white/10 bg-white/5 p-4 ${className}`}>
      <div className="text-xs uppercase tracking-wider text-white/60">{label}</div>
      <div className="mono text-2xl mt-1">{value ?? "–"}</div>
    </div>
  );
}
