// Route Handler to fetch a lifetime-related fact
// Docs:
// - Next.js Route Handlers: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
// - Google Programmable Search API: https://developers.google.com/custom-search/v1/overview
// - Gemini API: https://ai.google.dev/gemini-api/docs/text-generation

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get('year');
  if (!year) return Response.json({ error: 'Missing year' }, { status: 400 });

  // Required environment variables (do not expose to client):
  // GOOGLE_CSE_ID, GOOGLE_API_KEY for Custom Search
  // GEMINI_API_KEY for Gemini
  const CSE_ID = process.env.GOOGLE_CSE_ID;
  const CSE_KEY = process.env.GOOGLE_API_KEY;
  const GEMINI_KEY = process.env.GEMINI_API_KEY;

  // Fallback static JSON if missing config or errors
  async function fallback() {
    return { text: `You were born around ${year}. The world has changed a lot since then.`, year: Number(year) };
  }

  try {
    if (!CSE_ID || !CSE_KEY || !GEMINI_KEY) {
      return Response.json(await fallback());
    }

    // Search the web for events in the birth year
    const q = encodeURIComponent(`${year} notable events`);
    const searchUrl = `https://www.googleapis.com/customsearch/v1?cx=${CSE_ID}&key=${CSE_KEY}&q=${q}`;
    const searchRes = await fetch(searchUrl, { next: { revalidate: 0 } });
    if (!searchRes.ok) return Response.json(await fallback());
    const searchJson = await searchRes.json();
    const top = searchJson.items?.[0];
    if (!top) return Response.json(await fallback());

    // Summarize with Gemini via REST
    const prompt = `Summarize in 1-2 sentences a notable event from this page, suitable as an interesting fact for someone born in ${year}. URL: ${top.link}`;
    const geminiRes = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=' + GEMINI_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });

    if (!geminiRes.ok) return Response.json(await fallback());
    const geminiJson = await geminiRes.json();
    const text = geminiJson.candidates?.[0]?.content?.parts?.[0]?.text || top.title;

    return Response.json({ text, year: Number(year) });
  } catch (e) {
    return Response.json(await fallback());
  }
}
