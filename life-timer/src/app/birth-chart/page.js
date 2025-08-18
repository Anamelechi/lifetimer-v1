"use client";

import Link from "next/link";
import BackButton from "@/components/BackButton";
import { useTimerStore } from "@/store/timerStore";
import { useEffect, useMemo, useState } from "react";

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
function computeSunSign(date) {
	if (!date) return null;
	const m = date.getMonth() + 1;
	const d = date.getDate();
	// Tropical Western zodiac date ranges
	const ranges = [
		[3, 21, 4, 19, "Aries"],
		[4, 20, 5, 20, "Taurus"],
		[5, 21, 6, 20, "Gemini"],
		[6, 21, 7, 22, "Cancer"],
		[7, 23, 8, 22, "Leo"],
		[8, 23, 9, 22, "Virgo"],
		[9, 23, 10, 22, "Libra"],
		[10, 23, 11, 21, "Scorpio"],
		[11, 22, 12, 21, "Sagittarius"],
		[12, 22, 1, 19, "Capricorn"],
		[1, 20, 2, 18, "Aquarius"],
		[2, 19, 3, 20, "Pisces"],
	];
	const after = (M, D) => (m > M || (m === M && d >= D));
	const before = (M, D) => (m < M || (m === M && d <= D));
	for (const [sm, sd, em, ed, name] of ranges) {
		if ((sm <= em && after(sm, sd) && before(em, ed)) || (sm > em && (after(sm, sd) || before(em, ed)))) {
			return name;
		}
	}
	return null;
}

export default function BirthChartPage() {
	const store = useTimerStore();
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => setHydrated(true), []);

	const birthLocal = store.birthDate ? new Date(store.birthDate) : null;
	const sunSign = useMemo(() => computeSunSign(birthLocal), [birthLocal]);
	const birthOffsetHours = useMemo(() => store.birthUtcOffsetSeconds != null ? store.birthUtcOffsetSeconds / 3600 : null, [store.birthUtcOffsetSeconds]);
	const currentOffsetHours = useMemo(() => store.currentUtcOffsetSeconds != null ? store.currentUtcOffsetSeconds / 3600 : null, [store.currentUtcOffsetSeconds]);

	// Compute approximate UTC instant from stored local birth + offset
	const birthUtcIso = useMemo(() => {
		if (!birthLocal || store.birthUtcOffsetSeconds == null) return null;
		const ms = birthLocal.getTime() - store.birthUtcOffsetSeconds * 1000;
		return new Date(ms).toISOString();
	}, [birthLocal, store.birthUtcOffsetSeconds]);

	return (
		<div className="min-h-screen flex items-start justify-center p-6">
			<main className="w-full max-w-md">
				<div className="flex items-center justify-between mb-4">
					<BackButton fallback="/age" />
					<h1 className="text-xl font-semibold">Birth Chart</h1>
					<span className="w-[64px]" />
				</div>

				<div className="glass rounded-2xl p-6 space-y-6">
					{!hydrated && <p className="text-white/70">Loading…</p>}
					{hydrated && (
						<>
							<section className="space-y-1">
								<h2 className="text-white/90 font-medium">Your Details</h2>
								<p className="text-sm text-white/80">Birth: {birthLocal ? `${toDateOnlyString(birthLocal)} ${toTimeHMString(birthLocal)}` : '—'}</p>
								<p className="text-sm text-white/80">Birthplace: {store.birthCity || '—'}, {store.birthCountry || ''}</p>
								<p className="text-sm text-white/80">Birth Timezone: {store.birthTimeZone || '—'} {birthOffsetHours != null ? `(UTC ${birthOffsetHours >= 0 ? '+' : ''}${birthOffsetHours}h)` : ''}</p>
								<p className="text-sm text-white/80">Birth UTC instant: {birthUtcIso || '—'}</p>
								<p className="text-sm text-white/80">Current Location: {store.currentCity || '—'}, {store.currentCountry || ''} {currentOffsetHours != null ? `(UTC ${currentOffsetHours >= 0 ? '+' : ''}${currentOffsetHours}h)` : ''}</p>
							</section>

							<section className="space-y-3">
								<h2 className="text-white/90 font-medium">Chart (Lite)</h2>
								<div className="grid grid-cols-2 gap-3">
									<div className="panel rounded-xl p-4">
										<div className="text-xs text-white/60 tracking-widest">SUN SIGN</div>
										<div className="text-lg text-accent">{sunSign || '—'}</div>
									</div>
									<div className="panel rounded-xl p-4">
										<div className="text-xs text-white/60 tracking-widest">MOON SIGN</div>
										<div className="text-lg text-white/80">Coming soon</div>
									</div>
									<div className="panel rounded-xl p-4 col-span-2">
										<div className="text-xs text-white/60 tracking-widest">ASCENDANT (RISING)</div>
										<div className="text-lg text-white/80">Coming soon</div>
									</div>
								</div>
								<p className="text-xs text-white/60">We use your location and exact time to compute a precise chart. Full planetary positions will be added next.</p>
								<div className="text-xs text-white/60">Update your info in <Link className="underline" href="/age">Personal Info</Link>.</div>
							</section>
						</>
					)}
				</div>
			</main>
		</div>
	);
}
