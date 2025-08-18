export const dynamic = 'force-dynamic';

// Helper: fetch with timeout
async function fetchWithTimeout(url, opts = {}, timeoutMs = 10000) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...opts, signal: ctrl.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

// Helper: offset at given UTC instant for an IANA zone
function offsetSecondsAtUtc(iana, dateUtc) {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: iana,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  });
  const parts = dtf.formatToParts(dateUtc);
  const get = (t) => Number(parts.find(p => p.type === t)?.value || 0);
  const y = get('year');
  const m = get('month');
  const d = get('day');
  const hh = get('hour');
  const mm = get('minute');
  const ss = get('second');
  const asUtc = Date.UTC(y, m - 1, d, hh, mm, ss);
  return Math.round((asUtc - dateUtc.getTime()) / 1000);
}

// Helper: given local wall time ISO (YYYY-MM-DDTHH:mm:ss) in IANA zone, compute offset seconds via fixed-point iteration
function offsetSecondsAtLocal(iana, atLocalIso) {
  try {
    const [datePart, timePart = '00:00:00'] = atLocalIso.split('T');
    const [y, m, d] = datePart.split('-').map(n => parseInt(n, 10));
    const [hh, mm, ss] = timePart.split(':').map(n => parseInt(n, 10));
    const wallUtcBase = Date.UTC(y, (m || 1) - 1, d || 1, hh || 0, mm || 0, ss || 0);
    let utcMs = wallUtcBase;
    for (let i = 0; i < 5; i++) {
      const off = offsetSecondsAtUtc(iana, new Date(utcMs));
      const nextUtc = wallUtcBase - off * 1000;
      if (Math.abs(nextUtc - utcMs) < 1000) return off;
      utcMs = nextUtc;
    }
    return offsetSecondsAtUtc(iana, new Date(utcMs));
  } catch {
    return null;
  }
}

// Simple geocoding + timezone lookup via Open-Meteo geocoding and local Intl offset calc
// GET /api/geo?city=Rome&country=Italy&at=1990-05-01T12:00
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const city = (searchParams.get('city') || '').trim();
    const country = (searchParams.get('country') || '').trim();
    const at = (searchParams.get('at') || '').trim(); // ISO string for when to evaluate UTC offset
    if (!city) return new Response(JSON.stringify({ error: 'city required' }), { status: 400 });

    // Use Open-Meteo geocoding to resolve lat/lon and timezone
    const q = country ? `${city}, ${country}` : city;
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=1&language=en&format=json`;
    const geoRes = await fetchWithTimeout(geoUrl, { cache: 'no-store' }, 8000);
    if (!geoRes.ok) return new Response(JSON.stringify({ error: 'geocoding_failed' }), { status: geoRes.status });
    const geo = await geoRes.json();
    const first = geo?.results?.[0];
    if (!first) return new Response(JSON.stringify({ error: 'not_found' }), { status: 404 });

    const latitude = first.latitude;
    const longitude = first.longitude;
    const timezone = first.timezone; // IANA name

    // Compute utc offset seconds locally using Intl for the requested time
    let utcOffsetSeconds = null;
    if (timezone) {
      if (at) {
        utcOffsetSeconds = offsetSecondsAtLocal(timezone, at);
      } else {
        utcOffsetSeconds = offsetSecondsAtUtc(timezone, new Date());
      }
    }

    return new Response(
      JSON.stringify({
        latitude,
        longitude,
        timezone,
        utcOffsetSeconds,
        city: first.name,
        country: first.country,
        admin1: first.admin1 || null,
      }),
      { status: 200, headers: { 'content-type': 'application/json' } }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: 'internal_error' }), { status: 500 });
  }
}
