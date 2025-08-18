export const dynamic = 'force-dynamic';

// Simple geocoding + timezone lookup via Open-Meteo public APIs
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
    const geoRes = await fetch(geoUrl, { cache: 'no-store' });
    if (!geoRes.ok) throw new Error('geocoding failed');
    const geo = await geoRes.json();
    const first = geo?.results?.[0];
    if (!first) return new Response(JSON.stringify({ error: 'not_found' }), { status: 404 });

    const latitude = first.latitude;
    const longitude = first.longitude;
    const timezone = first.timezone; // IANA name

    // Query Open-Meteo timezone endpoint to get UTC offset seconds (supports optional time param)
    const tzUrl = new URL('https://api.open-meteo.com/v1/timezone');
    tzUrl.searchParams.set('latitude', String(latitude));
    tzUrl.searchParams.set('longitude', String(longitude));
    if (at) tzUrl.searchParams.set('time', at);

    const tzRes = await fetch(tzUrl, { cache: 'no-store' });
    if (!tzRes.ok) throw new Error('timezone failed');
    const tz = await tzRes.json();

    return new Response(
      JSON.stringify({
        latitude,
        longitude,
        timezone: tz?.timezone || timezone,
        utcOffsetSeconds: tz?.utc_offset_seconds ?? null,
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
