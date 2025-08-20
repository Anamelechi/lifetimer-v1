"use client";

import { useEffect, useMemo, useState } from "react";
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

async function fetchGeo(city, country, atIso) {
  const params = new URLSearchParams();
  if (city) params.set("city", city);
  if (country) params.set("country", country);
  if (atIso) params.set("at", atIso);
  const res = await fetch(`/api/geo?${params.toString()}`, { cache: "no-store" });
  if (!res.ok) throw new Error("geo lookup failed");
  return res.json();
}

export default function PersonalInfoPage() {
  const router = useRouter();
  const store = useTimerStore();

  const [dateStr, setDateStr] = useState("");
  const [timeStr, setTimeStr] = useState("00:00");
  const [fullName, setFullName] = useState("");

  const [birthCountry, setBirthCountry] = useState("");
  const [birthCity, setBirthCity] = useState("");
  const [birthResolved, setBirthResolved] = useState(null);
  const [birthResolving, setBirthResolving] = useState(false);

  const [currentCountry, setCurrentCountry] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [currentResolved, setCurrentResolved] = useState(null);
  const [currentResolving, setCurrentResolving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form validation
  const formValid = useMemo(() => {
    return dateStr && dateStr.length > 0;
  }, [dateStr]);

  const hasMinimalData = useMemo(() => {
    return dateStr && fullName.trim();
  }, [dateStr, fullName]);

  const hasCompleteData = useMemo(() => {
    return hasMinimalData && birthCity && birthCountry;
  }, [hasMinimalData, birthCity, birthCountry]);

  // hydrate from localStorage/store
  useEffect(() => {
    const savedDate = localStorage.getItem("life-timer:birthDate");
    const savedTime = localStorage.getItem("life-timer:birthTime");
  const savedName = localStorage.getItem("life-timer:fullName");
    if (savedDate) setDateStr(savedDate);
    if (savedTime) setTimeStr(savedTime);
  if (savedName) setFullName(savedName);
    if (store.birthDate && !savedDate) {
      const d = new Date(store.birthDate);
      setDateStr(toDateOnlyString(d));
      setTimeStr(toTimeHMString(d));
    }
    // locations
    setBirthCountry(store.birthCountry || localStorage.getItem("life-timer:birthCountry") || "");
    setBirthCity(store.birthCity || localStorage.getItem("life-timer:birthCity") || "");
    setCurrentCountry(store.currentCountry || localStorage.getItem("life-timer:currentCountry") || "");
    setCurrentCity(store.currentCity || localStorage.getItem("life-timer:currentCity") || "");
  }, [store.birthDate, store.birthCountry, store.birthCity, store.currentCountry, store.currentCity]);

  const birthAtISO = useMemo(() => {
    if (!dateStr) return null;
    const t = timeStr || "00:00";
    return `${dateStr}T${t}:00`;
  }, [dateStr, timeStr]);

  // Debounced auto-resolve for birth when date/city change
  useEffect(() => {
    if (!birthCity || !birthAtISO) return;
    const t = setTimeout(() => {
      resolveBirth();
    }, 600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [birthCity, birthCountry, birthAtISO]);

  // Debounced auto-resolve for current when city changes
  useEffect(() => {
    if (!currentCity) return;
    const t = setTimeout(() => {
      resolveCurrent();
    }, 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCity, currentCountry]);

  const resolveBirth = async () => {
    if (!birthCity) return;
    setBirthResolving(true);
    try {
      const data = await fetchGeo(birthCity, birthCountry, birthAtISO || undefined);
      setBirthResolved(data);
    } catch (e) {
      setBirthResolved(null);
    } finally {
      setBirthResolving(false);
    }
  };

  const resolveCurrent = async () => {
    if (!currentCity) return;
    setCurrentResolving(true);
    try {
      const data = await fetchGeo(currentCity, currentCountry, undefined);
      setCurrentResolved(data);
    } catch (e) {
      setCurrentResolved(null);
    } finally {
      setCurrentResolving(false);
    }
  };

  const onSave = async () => {
    setSaveSuccess(false);
    
    // Save name first
    store.setFullName(fullName || "");
    localStorage.setItem("life-timer:fullName", fullName || "");

    const d = combineDateTime(dateStr, timeStr || "00:00");
    if (d && !isNaN(d)) {
      store.setBirthDate(d);
      localStorage.setItem("life-timer:birthDate", dateStr);
      localStorage.setItem("life-timer:birthTime", timeStr || "00:00");
    }
    // Ensure we have timezone/offset resolved for birth
    let birthInfo = birthResolved;
    if (!birthInfo || birthInfo.utcOffsetSeconds == null) {
      try {
        birthInfo = await fetchGeo(birthCity, birthCountry, birthAtISO || undefined);
      } catch {}
    }
    // Save birth location
    store.setBirthLocation({
      birthCountry,
      birthCity,
      birthLat: birthInfo?.latitude ?? null,
      birthLon: birthInfo?.longitude ?? null,
      birthTimeZone: birthInfo?.timezone ?? '',
      birthUtcOffsetSeconds: birthInfo?.utcOffsetSeconds ?? null,
    });
    localStorage.setItem("life-timer:birthCountry", birthCountry || "");
    localStorage.setItem("life-timer:birthCity", birthCity || "");

    // Ensure we have current offset (optional)
    let currInfo = currentResolved;
    if ((!currInfo || currInfo.utcOffsetSeconds == null) && currentCity) {
      try { currInfo = await fetchGeo(currentCity, currentCountry, undefined); } catch {}
    }
    // Save current location
    store.setCurrentLocation({
      currentCountry,
      currentCity,
      currentLat: currInfo?.latitude ?? null,
      currentLon: currInfo?.longitude ?? null,
      currentTimeZone: currInfo?.timezone ?? '',
      currentUtcOffsetSeconds: currInfo?.utcOffsetSeconds ?? null,
    });
    localStorage.setItem("life-timer:currentCountry", currentCountry || "");
    localStorage.setItem("life-timer:currentCity", currentCity || "");

    setSaveSuccess(true);
    
    // Navigate based on data completeness
    if (hasCompleteData) {
      router.push("/birth-chart");
    } else {
      setTimeout(() => router.push("/"), 1500); // Show success message briefly
    }
  };

  const currentOffsetHours = useMemo(() => {
    const s = currentResolved?.utcOffsetSeconds ?? store.currentUtcOffsetSeconds;
    return s != null ? (s / 3600) : null;
  }, [currentResolved, store.currentUtcOffsetSeconds]);

  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <main className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <BackButton fallback="/device/welcome" />
          <h1 className="text-xl font-semibold">Personal Info</h1>
          <span className="w-[64px]" />
        </div>

        <div className="glass rounded-2xl p-6 space-y-6">
          <section className="space-y-3">
            <h2 className="text-white/90 font-medium">About You</h2>
            <label className="block text-sm text-white/80">
              Full Name
              <input type="text" placeholder="e.g., Ada Lovelace" className="mt-1 w-full bg-transparent border border-white/20 rounded px-3 py-2 text-sm focus:outline-none"
                value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </label>
          </section>

          <section className="space-y-3">
            <h2 className="text-white/90 font-medium">Birth Details</h2>
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm text-white/80 col-span-1">
                Date
                <input type="date" className="mt-1 w-full bg-transparent border border-white/20 rounded px-3 py-2 text-sm focus:outline-none" value={dateStr} onChange={(e) => setDateStr(e.target.value)} />
              </label>
      <label className="block text-sm text-white/80 col-span-1">
    Time
                <input type="time" step="60" className="mt-1 w-full bg-transparent border border-white/20 rounded px-3 py-2 text-sm focus:outline-none" value={timeStr} onChange={(e) => setTimeStr(e.target.value)} />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm text-white/80">
                Country
                <input type="text" placeholder="e.g., Italy" className="mt-1 w-full bg-transparent border border-white/20 rounded px-3 py-2 text-sm focus:outline-none" value={birthCountry} onChange={(e) => setBirthCountry(e.target.value)} />
              </label>
              <label className="block text-sm text-white/80">
                City
                <input type="text" placeholder="e.g., Rome" className="mt-1 w-full bg-transparent border border-white/20 rounded px-3 py-2 text-sm focus:outline-none" value={birthCity} onChange={(e) => setBirthCity(e.target.value)} />
              </label>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={resolveBirth} className="bg-black text-white border border-white rounded-lg px-3 py-2 text-sm hover:bg-black/90" disabled={!birthCity || birthResolving}>
                {birthResolving ? "Resolving…" : "Lookup Timezone"}
              </button>
              {birthResolved && (
                <div className="text-xs text-white/80">
                  {birthResolved.timezone} (UTC {birthResolved.utcOffsetSeconds >= 0 ? "+" : ""}{(birthResolved.utcOffsetSeconds/3600).toFixed(1)}), {birthResolved.latitude?.toFixed(2)}, {birthResolved.longitude?.toFixed(2)}
                </div>
              )}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-white/90 font-medium">Current Location</h2>
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm text-white/80">
                Country
                <input type="text" placeholder="e.g., United Kingdom" className="mt-1 w-full bg-transparent border border-white/20 rounded px-3 py-2 text-sm focus:outline-none" value={currentCountry} onChange={(e) => setCurrentCountry(e.target.value)} />
              </label>
              <label className="block text-sm text-white/80">
                City
                <input type="text" placeholder="e.g., London" className="mt-1 w-full bg-transparent border border-white/20 rounded px-3 py-2 text-sm focus:outline-none" value={currentCity} onChange={(e) => setCurrentCity(e.target.value)} />
              </label>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={resolveCurrent} className="bg-black text-white border border-white rounded-lg px-3 py-2 text-sm hover:bg-black/90" disabled={!currentCity || currentResolving}>
                {currentResolving ? "Resolving…" : "Lookup Timezone"}
              </button>
              {currentResolved && (
                <div className="text-xs text-white/80">
                  {currentResolved.timezone} (UTC {currentResolved.utcOffsetSeconds >= 0 ? "+" : ""}{(currentResolved.utcOffsetSeconds/3600).toFixed(1)})
                </div>
              )}
            </div>
            {currentOffsetHours != null && (
              <p className="text-xs text-white/70">Current UTC offset: {currentOffsetHours >= 0 ? "+" : ""}{currentOffsetHours}h</p>
            )}
          </section>

          {/* Save Button with Status */}
          <div className="space-y-3">
            {saveSuccess && (
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 text-center">
                <p className="text-green-400 text-sm">✓ Information saved successfully!</p>
              </div>
            )}
            
            {!formValid && (
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                <p className="text-yellow-400 text-sm">📅 Please enter your birth date to continue</p>
              </div>
            )}
            
            {formValid && !hasCompleteData && (
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
                <p className="text-blue-400 text-sm">⭐ Add birth location for your complete Birth Chart</p>
              </div>
            )}

            <button 
              onClick={onSave} 
              className={`w-full border font-medium rounded-lg py-3 transition ${
                hasCompleteData 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500' 
                  : formValid 
                    ? 'bg-black hover:bg-black/90 text-white border-white'
                    : 'bg-gray-600 text-gray-300 border-gray-500 cursor-not-allowed'
              }`}
              disabled={!formValid}
            >
              {hasCompleteData ? '⭐ Save & View Birth Chart' : hasMinimalData ? '📊 Save & Go to Timer' : '💾 Save Information'}
            </button>
            
            {formValid && (
              <div className="text-center">
                <button 
                  onClick={() => router.push('/')}
                  className="text-white/70 hover:text-white text-sm underline"
                >
                  Skip to Life Timer →
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
