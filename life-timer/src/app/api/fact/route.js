// Route Handler to fetch a lifetime-related fact via Wikipedia (free)
// Strategy:
// - For a requested year, fetch the "Events" section from the year's Wikipedia page
// - Parse bullet items from wikitext and deterministically pick one based on the current day
// - If parsing fails, fall back to the year's page summary or a generic message
// Docs:
// - Next.js Route Handlers: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
// - Wikipedia API: https://www.mediawiki.org/wiki/API:Main_page

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get('year');
  if (!year) return Response.json({ error: 'Missing year' }, { status: 400 });

  // Fallback static JSON if errors
  async function fallback() {
    return { text: `You were born around ${year}. The world has changed a lot since then.`, year: Number(year) };
  }

  // Deterministic index for "today"
  function dayIndex() {
    const d = Math.floor(Date.now() / 86400000); // days since epoch UTC
    return d;
  }

  // Wikimedia User-Agent requirement: https://meta.wikimedia.org/wiki/User-Agent_policy
  const UA = 'Life-Timer/0.1 (https://github.com/Anamelechi/Life-timer-production)';

  // Extract bullet items from section HTML (<li> elements)
  function extractBulletsFromHTML(html) {
    if (!html) return [];
    const items = [];
    const liRegex = /<li\b[^>]*>([\s\S]*?)<\/li>/gi;
    let m;
    while ((m = liRegex.exec(html)) !== null) {
      let t = htmlToPlain(m[1]);
      t = stripCitations(t)
        .replace(/\s+/g, ' ')
        .trim();
      if (t && t.length > 20) items.push(t);
    }
    return items;
  }

  // Decode common HTML entities and numeric references
  function decodeHtmlEntities(str) {
    if (!str) return '';
    let s = str
      .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
      .replace(/&#(\d+);/g, (_, num) => String.fromCodePoint(parseInt(num, 10)))
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&(ndash|#8211|#x2013);/g, '–')
      .replace(/&(mdash|#8212|#x2014);/g, '—')
      .replace(/&(ldquo|#8220|#x201C);/g, '“')
      .replace(/&(rdquo|#8221|#x201D);/g, '”')
      .replace(/&(lsquo|#8216|#x2018);/g, '‘')
      .replace(/&(rsquo|#8217|#x2019);/g, '’');
    return s;
  }

  // Remove bracketed citation markers like [57], [citation needed], etc.
  function stripCitations(text) {
    if (!text) return '';
    let t = text;
    // Collapsed multiple numeric refs like [57][58]
    t = t.replace(/(\s*\[\s*\d+\s*\])+\s*/g, ' ');
    // Single bracketed references or maintenance tags
    t = t.replace(/\s*\[(?:\d+|citation needed|clarification needed|when\?|who\?|note \d+)\]\s*/gi, ' ');
    return t;
  }

  // Convert snippet HTML to plain, decoded text with references removed
  function htmlToPlain(snippetHtml) {
    if (!snippetHtml) return '';
    const withoutRefs = snippetHtml
      .replace(/<sup\b[^>]*>[\s\S]*?<\/sup>/gi, '')
      .replace(/<sub\b[^>]*>[\s\S]*?<\/sub>/gi, '');
    const text = withoutRefs
      .replace(/<a[^>]*>([\s\S]*?)<\/a>/gi, '$1')
      .replace(/<\/?(b|i|strong|em|span|small)[^>]*>/gi, '')
      .replace(/<[^>]+>/g, '');
    return decodeHtmlEntities(text);
  }

  async function fetchEventsSectionHTML(y) {
    const api = 'https://en.wikipedia.org/w/api.php';
    // 1) find sections for the page titled by the year (e.g., "1990")
    const secUrl = `${api}?action=parse&page=${encodeURIComponent(y)}&prop=sections&format=json&redirects=1`;
    const secRes = await fetch(secUrl, { next: { revalidate: 0 }, headers: { 'User-Agent': UA } });
    if (!secRes.ok) return null;
    const secJson = await secRes.json();
    const sections = secJson?.parse?.sections || [];
    const eventSection = sections.find((s) => /events/i.test(s.line));
    if (!eventSection) return null;
    const idx = eventSection.index;
    // 2) get HTML for that section
    const txtUrl = `${api}?action=parse&page=${encodeURIComponent(y)}&prop=text&section=${idx}&format=json&formatversion=2&redirects=1`;
    const txtRes = await fetch(txtUrl, { next: { revalidate: 0 }, headers: { 'User-Agent': UA } });
    if (!txtRes.ok) return null;
    const txtJson = await txtRes.json();
    // formatversion=2 returns text as a simple string
    const html = txtJson?.parse?.text || '';
    return html || null;
  }

  async function fetchYearSummary(y) {
    const sumRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(y)}`,
      { next: { revalidate: 0 }, headers: { 'User-Agent': UA } });
    if (!sumRes.ok) return null;
    const json = await sumRes.json();
    return json?.extract || null;
  }

  function monthNameToNumber(name) {
    const months = {
      January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
      July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
    };
    return months[name] || null;
  }

  function firstSentence(s) {
    if (!s) return '';
    // Normalize, decode, and strip citations
    let t = stripCitations(decodeHtmlEntities(s))
      // remove leading carets/citation markers and trailing citation-only phrases
      .replace(/^\^\s*/, '')
      .replace(/\s*Retrieved\s.+$/i, '')
      .replace(/\s*Archived\s.+$/i, '')
      .replace(/\s*CS1\s+[^.]+\.?$/i, '')
      .replace(/\s*\(link\)\s*$/i, '');
    // keep up to first period if very long
    const idx = t.indexOf('.');
    if (idx > 0 && idx < 200) t = t.slice(0, idx + 1);
  t = t.trim();
  // Remove trailing dangling punctuation left by stripped citations
  t = t.replace(/[;:]+\s*$/g, '').replace(/\s{2,}/g, ' ');
  return t;
  }

  function formatFact(y, dateStr, eventText) {
    const core = firstSentence(eventText).replace(/[\s\u00A0]+/g, ' ').trim();
    const quoted = core.endsWith('.') ? `"${core}"` : `"${core}."`;
    if (dateStr) return `In ${y} when you were born, on ${dateStr}, ${quoted}`;
    return `In ${y} when you were born, ${quoted}`;
  }

  try {
    // Try Events first (HTML list items) with month/day extraction
    const html = await fetchEventsSectionHTML(year);
    if (html) {
      const items = [];
      let currentMonth = null;
      const token = /<(h[2-4])[^>]*>\s*<span[^>]*id="(January|February|March|April|May|June|July|August|September|October|November|December)"[^>]*>.*?<\/\1>|<li\b[^>]*>([\s\S]*?)<\/li>/gi;
      let m;
      while ((m = token.exec(html)) !== null) {
        if (m[2]) {
          currentMonth = m[2];
          continue;
        }
        if (m[3]) {
          // Clean inner HTML to text
          const raw = stripCitations(htmlToPlain(m[3]))
            .replace(/\s+/g, ' ')
            .trim();
          if (!raw || raw.length < 20) continue;
          // Skip lines that look like pure references or author lists
          if (/^Writers,|^Author(s)?:|^By\s/i.test(raw)) continue;
          // Try patterns for explicit month/day
          let dateStr = null;
          let text = raw;
          let mm = null, dd = null;
          const fullDate = raw.match(/^(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})(?:\s*\([^)]*\))?\s*[–-]\s*(.+)$/);
          if (fullDate) {
            mm = monthNameToNumber(fullDate[1]);
            dd = parseInt(fullDate[2], 10);
            text = fullDate[3];
          } else {
            const dayOnly = raw.match(/^(\d{1,2})(?:\s*\([^)]*\))?\s*[–-]\s*(.+)$/);
            if (dayOnly && currentMonth) {
              mm = monthNameToNumber(currentMonth);
              dd = parseInt(dayOnly[1], 10);
              text = dayOnly[2];
            }
          }
          if (mm && dd) {
            const monthNames = [ '', 'January','February','March','April','May','June','July','August','September','October','November','December' ];
            dateStr = `${monthNames[mm]} ${dd}`;
          }
          // Only keep items that have a resolved date to avoid reference-only bullets
          if (dateStr) {
            items.push({ dateStr, text });
          }
        }
      }
      if (items.length > 0) {
        const idx = dayIndex() % items.length;
        const pick = items[idx];
        const body = formatFact(Number(year), pick.dateStr, pick.text);
        return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
      }
    }
    // Fallback to summary
    const summary = await fetchYearSummary(year);
    if (summary) {
      const body = formatFact(Number(year), null, summary);
      return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }
    const fb = await fallback();
    return new Response(formatFact(Number(year), null, fb.text), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  } catch (e) {
    const fb = await fallback();
    return new Response(formatFact(Number(year), null, fb.text), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
}
