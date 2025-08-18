"use client";

import Link from "next/link";
import BackButton from "@/components/BackButton";
import { useTimerStore } from "@/store/timerStore";
import { useEffect, useMemo, useState } from "react";
import * as Astronomy from "astronomy-engine";

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

		// Moon ecliptic longitude and sign using Astronomy Engine
		const moonSign = useMemo(() => {
			try {
				if (!birthUtcIso || store.birthLat == null || store.birthLon == null) return null;
				const date = new Date(birthUtcIso);
				// Apparent ecliptic longitude of the Moon (geocentric)
				const ecl = Astronomy.EclipticLongitude(Astronomy.Body.Moon, date);
				const lon = ((ecl + 360) % 360);
				const signs = [
					"Aries","Taurus","Gemini","Cancer","Leo","Virgo",
					"Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
				];
				const idx = Math.floor(lon / 30) % 12;
				return signs[idx];
			} catch {
				return null;
			}
				}, [birthUtcIso, store.birthLat, store.birthLon]);

		// Ascendant (rising sign) approximation using local sidereal time and ecliptic geometry
	const ascendant = useMemo(() => {
		try {
			if (!birthUtcIso || store.birthLat == null || store.birthLon == null) return null;
			const date = new Date(birthUtcIso);
			// Observer at birthplace
			const observer = new Astronomy.Observer(store.birthLat, store.birthLon, 0);
				// Local apparent sidereal time in degrees
				const gast = Astronomy.SiderealTime(date); // hours at Greenwich
				const last = ((gast + store.birthLon / 15) % 24) * 15; // degrees at location
				// Mean obliquity of the ecliptic (approx, modern epoch)
				const obliq = 23.43928;
			// Ascendant formula: tan(Asc) = 1/(cos e) * [ -cos L / (sin L * cos e + tan φ * sin e) ]
			const phi = store.birthLat * Math.PI/180;
			const L = last * Math.PI/180;
			const e = obliq * Math.PI/180;
			const tanAsc = -Math.cos(L) / (Math.sin(L)*Math.cos(e) + Math.tan(phi)*Math.sin(e));
			let asc = Math.atan(tanAsc) * 180/Math.PI;
			if (Math.sin(L) < 0) asc += 180;
			asc = (asc + 360) % 360;
			const signs = [
				"Aries","Taurus","Gemini","Cancer","Leo","Virgo",
				"Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
			];
			return signs[Math.floor(asc/30) % 12];
		} catch {
			return null;
		}
	}, [birthUtcIso, store.birthLat, store.birthLon]);

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
															<div className="text-lg text-accent">{moonSign || '—'}</div>
														</div>
									<div className="panel rounded-xl p-4 col-span-2">
										<div className="text-xs text-white/60 tracking-widest">ASCENDANT (RISING)</div>
										<div className="text-lg text-accent">{ascendant || '—'}</div>
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
