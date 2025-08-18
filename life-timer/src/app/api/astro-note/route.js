export const dynamic = 'force-dynamic';

async function fetchWithTimeout(url, opts = {}, timeoutMs = 8000) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...opts, signal: ctrl.signal, headers: { 'accept': 'application/json', ...(opts.headers||{}) } });
    return res;
  } finally {
    clearTimeout(id);
  }
}

const ZSIGNS = new Set([
  'Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'
]);

function sanitizeSign(s) {
  if (!s) return null;
  const t = s.trim();
  const cap = t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
  return ZSIGNS.has(cap) ? cap : null;
}

function pickDeterministic(arr, seedStr) {
  if (!arr || arr.length === 0) return null;
  const seed = [...(seedStr||'')].reduce((a,c)=>((a*31 + c.charCodeAt(0))>>>0), 0);
  return arr[seed % arr.length];
}

// Ruling bodies (modern where customary), short traits for style
const RULERS = {
  Aries: { body: 'Mars', note: null },
  Taurus: { body: 'Venus', note: null },
  Gemini: { body: 'Mercury', note: null },
  Cancer: { body: 'the Moon', note: null },
  Leo: { body: 'the Sun', note: 'the only sign governed by a star' },
  Virgo: { body: 'Mercury', note: null },
  Libra: { body: 'Venus', note: null },
  Scorpio: { body: 'Pluto', note: 'traditionally ruled by Mars' },
  Sagittarius: { body: 'Jupiter', note: null },
  Capricorn: { body: 'Saturn', note: null },
  Aquarius: { body: 'Uranus', note: 'traditionally ruled by Saturn' },
  Pisces: { body: 'Neptune', note: 'traditionally ruled by Jupiter' },
};

const SIGN_TRAITS = {
  Aries: ['initiative','courage','directness'],
  Taurus: ['steadiness','patience','grounding'],
  Gemini: ['curiosity','communication','adaptability'],
  Cancer: ['care','home','protection'],
  Leo: ['confidence','vitality','magnetism'],
  Virgo: ['craft','precision','service'],
  Libra: ['harmony','fairness','charm'],
  Scorpio: ['intensity','focus','transformation'],
  Sagittarius: ['freedom','truth-seeking','optimism'],
  Capricorn: ['discipline','ambition','structure'],
  Aquarius: ['originality','vision','community'],
  Pisces: ['compassion','imagination','flow'],
};

// Educational metadata for each sign
const SIGN_META = {
  Aries: { element: 'Fire', modality: 'Cardinal', polarity: 'Positive', symbol: 'Ram' },
  Taurus: { element: 'Earth', modality: 'Fixed', polarity: 'Negative', symbol: 'Bull' },
  Gemini: { element: 'Air', modality: 'Mutable', polarity: 'Positive', symbol: 'Twins' },
  Cancer: { element: 'Water', modality: 'Cardinal', polarity: 'Negative', symbol: 'Crab' },
  Leo: { element: 'Fire', modality: 'Fixed', polarity: 'Positive', symbol: 'Lion' },
  Virgo: { element: 'Earth', modality: 'Mutable', polarity: 'Negative', symbol: 'Maiden' },
  Libra: { element: 'Air', modality: 'Cardinal', polarity: 'Positive', symbol: 'Scales' },
  Scorpio: { element: 'Water', modality: 'Fixed', polarity: 'Negative', symbol: 'Scorpion' },
  Sagittarius: { element: 'Fire', modality: 'Mutable', polarity: 'Positive', symbol: 'Archer' },
  Capricorn: { element: 'Earth', modality: 'Cardinal', polarity: 'Negative', symbol: 'Sea-Goat' },
  Aquarius: { element: 'Air', modality: 'Fixed', polarity: 'Positive', symbol: 'Water-Bearer' },
  Pisces: { element: 'Water', modality: 'Mutable', polarity: 'Negative', symbol: 'Fish' },
};

const ELEMENT_EXPLAIN = {
  Fire: 'energizes action and visibility',
  Earth: 'grounds plans into practical results',
  Air: 'stimulates ideas and communication',
  Water: 'deepens feeling and intuition',
};

const MODALITY_EXPLAIN = {
  Cardinal: 'initiates new cycles',
  Fixed: 'stabilizes and sustains',
  Mutable: 'adapts and transitions',
};

const POLARITY_EXPLAIN = {
  Positive: 'expressive/active (Fire, Air)',
  Negative: 'receptive/reflective (Earth, Water)',
};

function educationalLine(sign, seed) {
  const meta = SIGN_META[sign];
  if (!meta) return null;
  const options = [
    () => `Element: ${meta.element} — ${ELEMENT_EXPLAIN[meta.element]}.`,
    () => `Modality: ${meta.modality} — ${MODALITY_EXPLAIN[meta.modality]}.`,
    () => `Polarity: ${meta.polarity} — ${POLARITY_EXPLAIN[meta.polarity]}.`,
    () => `Symbol: the ${meta.symbol}.`,
  ];
  const idx = [...(seed || '')].reduce((a,c)=>((a*29 + c.charCodeAt(0))>>>0), 0) % options.length;
  return options[idx]();
}

// Tropical zodiac date ranges (inclusive), month/day pairs
const SIGN_RANGES = {
  Aries: [3,21,4,19],
  Taurus: [4,20,5,20],
  Gemini: [5,21,6,20],
  Cancer: [6,21,7,22],
  Leo: [7,23,8,22],
  Virgo: [8,23,9,22],
  Libra: [9,23,10,22],
  Scorpio: [10,23,11,21],
  Sagittarius: [11,22,12,21],
  Capricorn: [12,22,1,19],
  Aquarius: [1,20,2,18],
  Pisces: [2,19,3,20],
};

function pickDateWithinSign(sign, seedStr) {
  const r = SIGN_RANGES[sign];
  if (!r) return null;
  const [sm, sd, em, ed] = r;
  const startYear = 2020;
  const start = new Date(Date.UTC(startYear, sm - 1, sd));
  const end = new Date(Date.UTC(sm <= em ? startYear : startYear + 1, em - 1, ed));
  const days = Math.floor((end - start) / 86400000) + 1;
  const seed = [...(seedStr||'')].reduce((a,c)=>((a*33 + c.charCodeAt(0))>>>0), 0);
  const idx = days > 0 ? (seed % days) : 0;
  const pick = new Date(start.getTime() + idx * 86400000);
  return { mm: pick.getUTCMonth() + 1, dd: pick.getUTCDate() };
}

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

async function wikiSummaryForSign(sign) {
  const title = `${sign}_(astrology)`; // documented Wikipedia page naming
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const res = await fetchWithTimeout(url, { cache: 'no-store' });
  if (!res.ok) return null;
  const js = await res.json();
  const extract = js.extract || '';
  // take first sentence or two
  const parts = extract.split(/(?<=[.!?])\s+/).slice(0, 2);
  const text = parts.join(' ').trim();
  return { text, url: js.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}` };
}

async function wikiOnThisDayBirths(month, day) {
  const url = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/births/${month}/${day}`;
  const res = await fetchWithTimeout(url, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

async function wikiOnThisDayEvents(month, day) {
  const url = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`;
  const res = await fetchWithTimeout(url, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

async function wikiOnThisDayHolidays(month, day) {
  const url = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/holidays/${month}/${day}`;
  const res = await fetchWithTimeout(url, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

async function fetchQuotable() {
  try {
    const res = await fetchWithTimeout('https://api.quotable.io/random?maxLength=140&tags=inspirational|wisdom', { cache: 'no-store' }, 6000);
    if (!res.ok) return null;
    const q = await res.json();
    const text = q?.content?.trim();
    const author = q?.author?.trim();
    if (!text) return null;
    return { text: `“${text}”${author ? ` — ${author}` : ''}`, url: 'https://quotable.io' };
  } catch {
    return null;
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sun = sanitizeSign(searchParams.get('sun'));
    const moon = sanitizeSign(searchParams.get('moon'));
    const asc = sanitizeSign(searchParams.get('asc'));
  const date = (searchParams.get('date') || '').trim(); // YYYY-MM-DD (optional legacy)
    const city = (searchParams.get('city') || '').trim();
    const today = (searchParams.get('today') || new Date().toISOString().slice(0,10));
  // Accept a comma-separated list of chart signs to increase variety
  const signsParam = (searchParams.get('signs') || '').split(',').map(s => sanitizeSign(s)).filter(Boolean);

  const sources = [];
  const chunks = [];

    // Build a unique pool of candidate signs from inputs
    const candidateSigns = Array.from(new Set([sun, moon, asc, ...signsParam].filter(Boolean)));
    // Choose one sign deterministically for today
    const chosenSign = pickDeterministic(candidateSigns, today);
    if (chosenSign) {
      const info = await wikiSummaryForSign(chosenSign);
      if (info?.text) { chunks.push({ kind: 'sign', text: info.text, sign: chosenSign, url: info.url }); sources.push(info.url); }
  // Add one rotating educational snippet
  const edu = educationalLine(chosenSign, today + chosenSign);
  if (edu) chunks.push({ kind: 'edu', text: edu });
    }

    // If we have a chosen sign, pull people/events/holidays from a date inside that sign's season
    if (chosenSign) {
      const pickDate = pickDateWithinSign(chosenSign, `${today}-${chosenSign}`);
      if (pickDate) {
        const { mm, dd } = pickDate;
        const [births, events, holidays] = await Promise.all([
          wikiOnThisDayBirths(mm, dd),
          wikiOnThisDayEvents(mm, dd),
          wikiOnThisDayHolidays(mm, dd),
        ]);
        // Person with the sign (born in that season day)
        const bEntries = births?.births || [];
        const bPick = pickDeterministic(bEntries, `b-${today}-${chosenSign}`);
        if (bPick) {
          const person = bPick?.text || bPick?.pages?.[0]?.titles?.normalized || null;
          if (person) {
            const link = bPick?.pages?.[0]?.content_urls?.desktop?.page;
            const monthName = MONTHS[mm-1];
            chunks.push({ kind: 'sign-person', text: `Famous ${chosenSign}: ${person} (born ${monthName} ${dd}).` });
            if (link) sources.push(link);
          }
        }
        // Event and holiday occurring during that sign's season
        const evs = events?.events || [];
        const evPick = pickDeterministic(evs, `ev-${today}-${chosenSign}`);
        if (evPick) {
          const evText = evPick?.text || evPick?.pages?.[0]?.titles?.normalized;
          if (evText) {
            const link = evPick?.pages?.[0]?.content_urls?.desktop?.page;
            const monthName = MONTHS[mm-1];
            chunks.push({ kind: 'sign-event', text: `${chosenSign} season: ${evText} (${monthName} ${dd}).` });
            if (link) sources.push(link);
          }
        }
        const hols = holidays?.holidays || [];
        const holPick = pickDeterministic(hols, `hol-${today}-${chosenSign}`);
        if (holPick) {
          const holText = holPick?.text || holPick?.pages?.[0]?.titles?.normalized;
          if (holText) {
            const link = holPick?.pages?.[0]?.content_urls?.desktop?.page;
            const monthName = MONTHS[mm-1];
            chunks.push({ kind: 'sign-holiday', text: `${chosenSign} season: ${holText} (${monthName} ${dd}).` });
            if (link) sources.push(link);
          }
        }
      }
    } else if (date) {
      // Legacy: share-a-birthday personalization when no sign provided
      const [y, mm, dd] = date.split('-').map(n=>parseInt(n,10));
      if (mm && dd) {
        const births = await wikiOnThisDayBirths(mm, dd);
        const entries = births?.births || [];
        const pick = pickDeterministic(entries, today);
        if (pick) {
          const person = pick?.text || pick?.pages?.[0]?.titles?.normalized || null;
          if (person) {
            const link = pick?.pages?.[0]?.content_urls?.desktop?.page;
            chunks.push({ kind: 'otd', text: `You share a birthday with ${person}.`, person });
            if (link) sources.push(link);
          }
        }
      }
    }

    // Add a free inspirational quote for extra variety
    const quote = await fetchQuotable();
    if (quote?.text) { chunks.push({ kind: 'quote', text: quote.text, url: quote.url }); if (quote.url) sources.push(quote.url); }

    // Build final note
    const pool = chunks.filter(Boolean);
    if (pool.length === 0) {
      return new Response(JSON.stringify({ note: null, sources, seed: today }), { status: 200, headers: { 'content-type': 'application/json' } });
    }
    // Craft a quote-like sentence with light templating instead of concatenating encyclopedic lines.
    const seed = today;
    const hash = [...seed].reduce((a,c)=>((a*31 + c.charCodeAt(0))>>>0), 0);
  const pick = (k) => pool.filter(x => x.kind === k);
  const signPart = pick('sign')[0];
  const signPerson = pick('sign-person')[0];
  const signEvent = pick('sign-event')[0];
  const signHoliday = pick('sign-holiday')[0];
  const eduPart = pick('edu')[0];
  const otds = pick('otd');
    const otd = otds.length ? otds[hash % otds.length] : null;
  const evt = pick('event')[0] || null;
  const hol = pick('holiday')[0] || null;
  const qt = pick('quote')[0] || null;

    // Trim Wikipedia sentences to avoid definitions; keep it human.
    function soften(t) {
      if (!t) return '';
      // remove degree spans and overly formal phrases
      return t.replace(/\s?\(?\d+°[^)]*\)?/g, '').replace(/It spans from.*$/i, '').replace(/Under the tropical zodiac.*$/i, '').trim();
    }

    const parts = [];
    // Craft a concise, human-style sign fact like the provided example
    if (signPart) {
      const rule = RULERS[signPart.sign];
      const traits = SIGN_TRAITS[signPart.sign] || [];
      const traitLine = traits.length ? `${traits[0]}, ${traits[1]}, and ${traits[2]}` : soften(signPart.text);
      const ruled = rule ? `${signPart.sign} is ruled by ${rule.body}` : `${signPart.sign}`;
      const extra = rule?.note ? `, ${rule.note}` : '';
      const text = `${ruled}${extra}. Associated with ${traitLine}.`;
      parts.push(text);
    }
  if (eduPart) parts.push(`${eduPart.text}`);
  if (signPerson) parts.push(`${signPerson.text}`);
  if (signEvent) parts.push(`${signEvent.text}`);
  if (signHoliday) parts.push(`${signHoliday.text}`);
  if (otd) parts.push(`${otd.text}`);
  if (evt) parts.push(`${evt.text}`);
  if (hol) parts.push(`${hol.text}`);
  if (qt) parts.push(`${qt.text}`);

    // Choose 1–2 parts with a seeded shuffle to vary order across days
    const dof = (() => { const d = new Date(today + 'T00:00:00Z'); return Math.floor((d - new Date(Date.UTC(d.getUTCFullYear(),0,0))) / 86400000); })();
    const take = Math.min(2, Math.max(1, 1 + ((hash ^ dof) % 2)));
    const idxs = parts.map((_,i)=>i);
    for (let i = idxs.length - 1; i > 0; i--) {
      const j = (hash + i * 13) % (i + 1);
      [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
    }
    const chosen = idxs.slice(0, take).map(i => parts[i]);
    const note = chosen.join(' ');
    return new Response(JSON.stringify({ note, sources, seed: today }), { status: 200, headers: { 'content-type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'internal_error' }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
}
