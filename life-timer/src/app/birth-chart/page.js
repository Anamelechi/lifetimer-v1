"use client";

import Link from "next/link";
import BackButton from "@/components/BackButton";
import { useTimerStore } from "@/store/timerStore";

export default function BirthChartPage() {
  const {
    birthDate,
    birthCountry, birthCity,
    currentCountry, currentCity,
  } = useTimerStore();

  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <main className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <BackButton fallback="/age" />
          <h1 className="text-xl font-semibold">Birth Chart</h1>
          <span className="w-[64px]" />
        </div>
        <div className="glass rounded-2xl p-6 space-y-4">
          {!birthDate ? (
            <p className="text-white/80">Set your birth details first on the About Me page.</p>
          ) : (
            <div className="text-white/90 text-sm space-y-2">
              <div><span className="text-white/60">Birth date/time:</span> {new Date(birthDate).toString()}</div>
              <div><span className="text-white/60">Birth place:</span> {birthCity || '—'}, {birthCountry || '—'}</div>
              <div><span className="text-white/60">Current place:</span> {currentCity || '—'}, {currentCountry || '—'}</div>
              <p className="text-white/70">Coming soon: astrologic birth chart calculation and display.</p>
            </div>
          )}
          <div className="flex items-center justify-between">
            <Link href="/age" className="text-accent">Edit details</Link>
            <Link href="/" className="text-accent">Home</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
