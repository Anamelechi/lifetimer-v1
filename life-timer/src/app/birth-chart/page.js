"use client";

import Link from "next/link";
import BackButton from "@/components/BackButton";
import { useTimerStore } from "@/store/timerStore";
import { useEffect, useMemo, useState } from "react";
import * as Astronomy from "astronomy-engine";
import { toZodiacSign, computeSunSign, generateAstroQuote, generateDailyInsight } from "@/lib/astro";
import { useRouter } from "next/navigation";

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

// Robust ecliptic longitude for a body (degrees). Falls back to Equator->Ecliptic if needed.
function eclipticLongitude(body, date) {
	// Per Astronomy Engine docs, use SunPosition for solar ecliptic longitude
	if (body === Astronomy.Body.Sun && typeof Astronomy.SunPosition === 'function') {
		const sp = Astronomy.SunPosition(date);
		return sp.elon;
	}
	if (typeof Astronomy.EclipticLongitude === 'function') {
		return Astronomy.EclipticLongitude(body, date);
	}
	// Geocentric equatorial of date, with aberration
	const equ = Astronomy.Equator(body, date, null, true, true);
	const ecl = Astronomy.Ecliptic(equ);
	return ecl.elon;
}

function formatOffset(secs) {
	if (secs == null || isNaN(secs)) return '';
	const sign = secs >= 0 ? '+' : '-';
	const abs = Math.abs(secs);
	const h = Math.floor(abs / 3600);
	const m = Math.floor((abs % 3600) / 60);
	return `UTC ${sign}${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
}

export default function BirthChartPage() {
	const router = useRouter();
	const store = useTimerStore();
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => setHydrated(true), []);

	const birthLocal = store.birthDate ? new Date(store.birthDate) : null;
	const sunSign = useMemo(() => computeSunSign(birthLocal), [birthLocal]);
	const birthOffsetFmt = useMemo(() => formatOffset(store.birthUtcOffsetSeconds), [store.birthUtcOffsetSeconds]);
	const currentOffsetFmt = useMemo(() => formatOffset(store.currentUtcOffsetSeconds), [store.currentUtcOffsetSeconds]);

	// Compute approximate UTC instant from stored local birth + offset
	// Compute precise UTC instant when offset is known; otherwise fall back to local time ISO
	const birthUtcIso = useMemo(() => {
		if (!birthLocal) return null;
		if (store.birthUtcOffsetSeconds == null) return birthLocal.toISOString();
		const ms = birthLocal.getTime() - store.birthUtcOffsetSeconds * 1000;
		return new Date(ms).toISOString();
	}, [birthLocal, store.birthUtcOffsetSeconds]);

		// Moon ecliptic longitude and sign using Astronomy Engine
	const moonSign = useMemo(() => {
			try {
				if (!birthUtcIso) return null;
				const date = new Date(birthUtcIso);
				// Apparent ecliptic longitude of the Moon (geocentric)
		const ecl = eclipticLongitude(Astronomy.Body.Moon, date);
		const lon = ((ecl + 360) % 360);
		return toZodiacSign(lon);
			} catch {
				return null;
			}
				}, [birthUtcIso]);

		// Ascendant (rising sign) approximation using local sidereal time and ecliptic geometry
	const ascendant = useMemo(() => {
		try {
			// Require precise timezone and location for ascendant
			if (!birthLocal || store.birthUtcOffsetSeconds == null || store.birthLat == null || store.birthLon == null) return null;
			const ms = birthLocal.getTime() - store.birthUtcOffsetSeconds * 1000;
			const date = new Date(ms);
			// Observer at birthplace (not used further, kept logic simple)
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
	    return toZodiacSign(asc);
		} catch {
			return null;
		}
	}, [birthUtcIso, store.birthLat, store.birthLon]);

		// Compute Ascendant degrees value
		const ascendantDegrees = useMemo(() => {
			try {
			if (!birthLocal || store.birthUtcOffsetSeconds == null || store.birthLat == null || store.birthLon == null) return null;
			const ms = birthLocal.getTime() - store.birthUtcOffsetSeconds * 1000;
			const date = new Date(ms);
				const gast = Astronomy.SiderealTime(date);
				const last = ((gast + store.birthLon / 15) % 24) * 15;
				const obliq = 23.43928;
				const phi = store.birthLat * Math.PI/180;
				const L = last * Math.PI/180;
				const e = obliq * Math.PI/180;
				const tanAsc = -Math.cos(L) / (Math.sin(L)*Math.cos(e) + Math.tan(phi)*Math.sin(e));
				let asc = Math.atan(tanAsc) * 180/Math.PI;
				if (Math.sin(L) < 0) asc += 180;
				return (asc + 360) % 360;
			} catch { return null; }
		}, [birthUtcIso, store.birthLat, store.birthLon]);

		// Compute planetary ecliptic longitudes (geocentric apparent)
			const planets = useMemo(() => {
				if (!birthUtcIso) return [];
				const date = new Date(birthUtcIso);
				const bodies = [
					{ key: 'Sun', body: Astronomy.Body.Sun },
					{ key: 'Moon', body: Astronomy.Body.Moon },
					{ key: 'Mercury', body: Astronomy.Body.Mercury },
					{ key: 'Venus', body: Astronomy.Body.Venus },
					{ key: 'Mars', body: Astronomy.Body.Mars },
					{ key: 'Jupiter', body: Astronomy.Body.Jupiter },
					{ key: 'Saturn', body: Astronomy.Body.Saturn },
					{ key: 'Uranus', body: Astronomy.Body.Uranus },
					{ key: 'Neptune', body: Astronomy.Body.Neptune },
					{ key: 'Pluto', body: Astronomy.Body.Pluto },
				];
				const out = [];
				for (const { key, body } of bodies) {
							try {
								const lon = ((eclipticLongitude(body, date) % 360) + 360) % 360;
						const sign = toZodiacSign(lon);
						const degInSign = lon % 30;
						const deg = Math.floor(degInSign);
						const min = Math.floor((degInSign - deg) * 60);
						const sec = Math.floor((((degInSign - deg) * 60) - min) * 60);
						out.push({ key, lon, sign, deg, min, sec });
					} catch (e) {
						// skip this body if calc fails to avoid dropping the whole table
					}
				}
				return out;
			}, [birthUtcIso]);

			const [note, setNote] = useState(null);
			const chartSigns = useMemo(() => {
				const set = new Set();
				if (sunSign) set.add(sunSign);
				if (moonSign) set.add(moonSign);
				if (ascendant) set.add(ascendant);
				for (const p of planets || []) { if (p?.sign) set.add(p.sign); }
				return Array.from(set).sort();
			}, [sunSign, moonSign, ascendant, planets]);
			const insight = useMemo(() => {
				const day = new Date().toISOString().slice(0,10);
				return generateDailyInsight({ sun: sunSign, moon: moonSign, asc: ascendant, seed: day });
			}, [sunSign, moonSign, ascendant]);
			useEffect(() => {
				let aborted = false;
				async function load() {
					try {
						const day = new Date().toISOString().slice(0,10);
						const params = new URLSearchParams();
						if (sunSign) params.set('sun', sunSign);
						if (moonSign) params.set('moon', moonSign);
						if (ascendant) params.set('asc', ascendant);
						if (birthLocal) params.set('date', toDateOnlyString(birthLocal));
						if (chartSigns.length) params.set('signs', chartSigns.join(','));
						params.set('today', day);
						const res = await fetch(`/api/astro-note?${params.toString()}`, { cache: 'no-store' });
						if (!res.ok) throw new Error('note fetch failed');
						const js = await res.json();
						if (!aborted) setNote(js.note || null);
					} catch {
						if (!aborted) {
							const seed = new Date().toISOString().slice(0,10);
							setNote(generateAstroQuote(sunSign, moonSign, ascendant, { seed }));
						}
					}
				}
				load();
				return () => { aborted = true; };
			}, [sunSign, moonSign, ascendant, birthLocal, chartSigns.join(',')]);

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
								<p className="text-sm text-white/80">Birth Timezone: {store.birthTimeZone || '—'} {birthOffsetFmt ? `(${birthOffsetFmt})` : ''}</p>
								<p className="text-sm text-white/80">Birth UTC instant: {birthUtcIso || '—'}</p>
								<p className="text-sm text-white/80">Current Location: {store.currentCity || '—'}, {store.currentCountry || ''} {currentOffsetFmt ? `(${currentOffsetFmt})` : ''}</p>
							</section>

														<section className="space-y-3">
																<h2 className="text-white/90 font-medium">Birth Table</h2>
																<div className="space-y-2">
																	{birthUtcIso ? (
																		<div className="grid grid-cols-2 gap-3">
																			{/* Ascendant first (only when computable) */}
																			{ascendant ? (
																				<div className="panel rounded-xl p-4 col-span-2">
																					<div className="text-xs text-white/60 tracking-widest">ASCENDANT (RISING)</div>
																					<div className="text-lg text-accent">{ascendant}</div>
																					<div className="text-xs text-white/50">{ascendantDegrees != null ? `${toZodiacSign(ascendantDegrees)} ${Math.floor(ascendantDegrees % 30)}° ${Math.floor(((ascendantDegrees % 30) - Math.floor(ascendantDegrees % 30)) * 60)}'` : 'Angle: —'}</div>
																				</div>
																			) : (
																				<div className="panel rounded-xl p-4 col-span-2">
																					<div className="text-xs text-white/60 tracking-widest">ASCENDANT (RISING)</div>
																					<div className="text-sm text-white/70">Enter exact birth time and city to compute the Ascendant.</div>
																				</div>
																			)}

																			{/* Map requested order */}
																			{['Neptune','Uranus','Jupiter','Mercury','Saturn','Sun','Venus','Mars','Moon','Pluto'].map((label) => {
																				const p = planets.find(x => x.key === label);
																				return (
																					<div key={label} className="panel rounded-xl p-4">
																						<div className="text-xs text-white/60 tracking-widest">{label.toUpperCase()}</div>
																						<div className="text-lg text-accent">{label === 'Sun' ? (p?.sign || sunSign || '—') : (p?.sign || '—')}</div>
																						<div className="text-xs text-white/50">{p ? `${p.sign} ${p.deg}° ${p.min}' ${p.sec}"` : 'Longitude: —'}</div>
																					</div>
																				);
																			})}
																		</div>
																	) : (
																		<p className="text-sm text-white/70">Enter your birth details to compute your full chart.</p>
																	)}
																</div>
																								<div className="panel rounded-xl p-4 space-y-2">
																								  <div className="text-xs text-white/60 tracking-widest">CHART-ALIGNED NOTE</div>
																								  <div className="text-sm text-white/90 leading-relaxed">{note || insight?.blocks?.[0] || '—'}</div>
																								  {!note && insight?.blocks?.[1] && (
																								    <div className="text-sm text-white/80 leading-relaxed">{insight.blocks[1]}</div>
																								  )}
																								</div>
																<p className="text-xs text-white/60">Exact birth time and place are needed for Ascendant and precise degrees.</p>
																<div className="text-xs text-white/60">Update your info in <Link className="underline" href="/age">Personal Info</Link>.</div>
																<div className="pt-2">
																  <button
																		onClick={() => router.push('/')}
																		className="w-full bg-black text-white border border-white font-medium rounded-lg py-2 transition hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed"
																		disabled={!birthLocal || !store.birthCity || !store.birthUtcOffsetSeconds}
																  >
																		Go to Timer
																  </button>
																</div>
														</section>
						</>
					)}
				</div>
			</main>
		</div>
	);
}
