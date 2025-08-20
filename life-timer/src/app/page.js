"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const { birthDate, setBirthDate, fullName, setFullName } = useTimerStore();
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
  const savedName = localStorage.getItem("life-timer:fullName");
    if (savedDate) setBirthDate(combineDateTime(savedDate, savedTime || "00:00"));
  if (savedName) setFullName(savedName);
  }, [setBirthDate]);

  // On first visit without birthDate, go to onboarding welcome
  useEffect(() => {
    if (mounted && !birthDate) {
      const hasVisited = localStorage.getItem('life-timer:visited');
      if (!hasVisited) {
        localStorage.setItem('life-timer:visited', '1');
        router.replace('/device/welcome');
      }
    }
  }, [mounted, birthDate, router]);

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

  // Intentionally depend on nowTick to update every second
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  // Compute current time directly; ties to nowTick via dependent computations
  const now = mounted ? new Date() : null;
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
  const daysSinceLastCompletedWeek =
    daysSinceMonthStart != null ? (daysSinceMonthStart % 7) : null;

  // Fetch random fact, cached by year in IndexedDB
  useEffect(() => {
    const run = async () => {
      if (!birthDate) return;
      const year = new Date(birthDate).getFullYear();
  // Rotate the displayed fact daily by including UTC day index in the key
  const dayIndex = Math.floor(Date.now() / 86400000);
  const cacheKey = `fact:${year}:${dayIndex}`;
      const cached = await get(cacheKey);
      if (cached) {
        // Migrate legacy cached objects (from older JSON API) to string
        if (typeof cached === "string") {
          setFact(cached);
          return;
        }
        if (cached && typeof cached === "object") {
          const migrated = typeof cached.text === "string" ? cached.text : String(cached);
          await set(cacheKey, migrated);
          setFact(migrated);
          return;
        }
        // Fallback coercion
        setFact(String(cached));
        return;
      }
      setLoadingFact(true);
      try {
        const res = await fetch(`/api/fact?year=${year}`, { cache: "no-store" });
        if (res.ok) {
          const ct = res.headers.get("content-type") || "";
          let value;
          if (ct.includes("text/plain")) {
            value = await res.text();
          } else if (ct.includes("application/json")) {
            const j = await res.json();
            value = typeof j?.text === "string" ? j.text : JSON.stringify(j);
          } else {
            // Last resort, try text
            value = await res.text();
          }
          await set(cacheKey, value);
          setFact(value);
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
        {/* Top bar with menu */}
        <div className="py-2 flex items-center justify-between">
          <div>
            <h1 className="text-base tracking-wide text-white/90">Life Timer</h1>
            {fullName && (
              <p className="text-xs text-white/60 mt-0.5">Welcome back, {fullName.split(" ")[0]}.</p>
            )}
          </div>
          <div className="relative">
            <MenuDropdown />
          </div>
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
          <Stat label="DAYS" value={mounted ? daysSinceLastCompletedWeek : null} />
          <Stat label="HOURS" value={mounted ? hoursSinceDayStart : null} />
          <Stat label="MINUTES" value={mounted ? minutesSinceHourStart : null} />
          <Stat label="SECONDS" value={mounted ? secondsSinceMinuteStart : null} full />
        </div>

        {!demo && (
          <div className="mt-8 space-y-4">
            {!birthDate && (
              <section className="glass rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-3">Get Started</h2>
                <p className="text-white/80">Add your details to unlock your Birth Chart and personalized facts.</p>
                <div className="mt-4">
                  <Link href="/age" className="bg-black text-white border border-white font-medium rounded-lg px-4 py-2 inline-block hover:bg-black/90">Open Personal Info</Link>
                </div>
              </section>
            )}

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-3">Random Fact</h2>
              {!birthDate && <p className="text-white/70">Set your birth date in Personal Info to fetch a fact.</p>}
              {birthDate && (
                <div>
                  {loadingFact && <p className="text-white/70">Fetching a fun fact…</p>}
                  {fact && <p className="text-white/90 leading-relaxed">{fact}</p>}
                  {!loadingFact && !fact && (
                    <p className="text-white/70">No fact available right now. Try again later.</p>
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
function MenuDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      const el = ref.current;
      if (!el) return;
      if (!el.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="text-sm text-white/80" ref={ref}>
      <button
        className="border border-white/20 rounded-md px-3 py-2 min-h-[40px] min-w-[72px] hover:bg-white/10 active:bg-white/15"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open menu"
      >
        Menu
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 max-w-[80vw] rounded-lg bg-black/85 backdrop-blur border border-white/10 shadow-xl z-30">
          <nav className="py-1.5 max-h-[60vh] overflow-auto" onClick={() => setOpen(false)}>
            <Link href="/device/welcome" className="block px-3 py-2.5 hover:bg-white/10">Welcome</Link>
            <Link href="/device" className="block px-3 py-2.5 hover:bg-white/10">Add to Device</Link>
            <Link href="/age" className="block px-3 py-2.5 hover:bg-white/10">Personal Info</Link>
            <Link href="/birth-chart" className="block px-3 py-2.5 hover:bg-white/10">Birth Chart</Link>
            <Link href="/goals" className="block px-3 py-2.5 hover:bg-white/10">Goals</Link>
          </nav>
        </div>
      )}
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
