export const ZODIAC = [
  "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
  "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
];

export function toZodiacSign(longitudeDegrees) {
  if (longitudeDegrees == null || isNaN(longitudeDegrees)) return null;
  const lon = ((Number(longitudeDegrees) % 360) + 360) % 360;
  return ZODIAC[Math.floor(lon / 30) % 12] || null;
}

export function computeSunSign(date) {
  if (!date) return null;
  const m = date.getMonth() + 1;
  const d = date.getDate();
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

const SUN_LINES = {
  Aries: "Your spark thrives on courage and fresh starts.",
  Taurus: "Patience and consistency are your power moves.",
  Gemini: "Curiosity fuels your connections and growth.",
  Cancer: "You nurture what matters and protect your peace.",
  Leo: "Your warmth and confidence light the room.",
  Virgo: "Precision and service make your magic real.",
  Libra: "Harmony and fairness guide your choices.",
  Scorpio: "Depth and transformation define your path.",
  Sagittarius: "Truth-seeking and freedom shape your journey.",
  Capricorn: "Discipline turns your vision into legacy.",
  Aquarius: "Originality and community are your compass.",
  Pisces: "Compassion and imagination lead your flow.",
};

const MOON_LINES = {
  Aries: "Act on what you feel—directly and bravely.",
  Taurus: "Stability soothes—slow down and savor.",
  Gemini: "Talk it out—thoughts settle when shared.",
  Cancer: "Honor your tides—home is your anchor.",
  Leo: "Express your heart—be seen and celebrated.",
  Virgo: "Organize your inner world to find calm.",
  Libra: "Connection restores—lean into trusted bonds.",
  Scorpio: "Feel deeply—alchemize what hurts.",
  Sagittarius: "Move and learn—space clears emotions.",
  Capricorn: "Contain, then act—steadiness heals.",
  Aquarius: "Zoom out—perspective sets you free.",
  Pisces: "Rest and create—softness is strength.",
};

const ASC_LINES = {
  Aries: "Lead with boldness.",
  Taurus: "Build with care.",
  Gemini: "Ask better questions.",
  Cancer: "Make it feel safe.",
  Leo: "Bring the joy.",
  Virgo: "Make it useful.",
  Libra: "Balance the room.",
  Scorpio: "Guard your energy.",
  Sagittarius: "Keep it honest.",
  Capricorn: "Structure the steps.",
  Aquarius: "Include everyone.",
  Pisces: "Let it flow.",
};

export function generateAstroQuote(sun, moon, asc, opts = {}) {
  const s = sun && SUN_LINES[sun] ? SUN_LINES[sun] : null;
  const m = moon && MOON_LINES[moon] ? MOON_LINES[moon] : null;
  const a = asc && ASC_LINES[asc] ? ASC_LINES[asc] : null;
  const parts = [s, m, a].filter(Boolean);
  if (parts.length === 0) return "Set your Personal Info to see a chart-aligned note.";
  // Daily rotation: pick 1-3 lines deterministically based on day seed
  const seed = opts.seed ?? new Date().toISOString().slice(0,10);
  const hash = [...seed].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 0);
  const pick = (arr) => arr[hash % arr.length];
  const takeCount = (hash % 3) + 1; // 1..3 lines
  const pool = parts;
  const chosen = [];
  for (let i = 0; i < Math.min(takeCount, pool.length); i++) {
    const idx = (hash + i * 7) % pool.length;
    chosen.push(pool[idx]);
  }
  let text = chosen.join(" ");
  // Light personalization
  const name = opts.name;
  const city = opts.city;
  const tail = [name ? `${name},` : null, city ? `from ${city}` : null].filter(Boolean).join(" ");
  if (tail) text = `${text} ${tail}`;
  return text;
}

// Deterministic daily insight in a concise, quote-like style.
export function generateDailyInsight({ sun, moon, asc, seed }) {
  const daySeed = seed || new Date().toISOString().slice(0,10);
  const hash = [...daySeed + (sun||'') + (moon||'') + (asc||'')]
    .reduce((a,c)=>((a*33 + c.charCodeAt(0))>>>0), 0);

  const TRAITS = {
    Aries: ['act-first', 'courage', 'directness'],
    Taurus: ['steadiness', 'patience', 'grounding'],
    Gemini: ['curiosity', 'dialogue', 'flexibility'],
    Cancer: ['care', 'home', 'protection'],
    Leo: ['warmth', 'visibility', 'play'],
    Virgo: ['craft', 'order', 'service'],
    Libra: ['balance', 'harmony', 'bridge'],
    Scorpio: ['depth', 'focus', 'alchemy'],
    Sagittarius: ['truth', 'horizons', 'faith'],
    Capricorn: ['discipline', 'structure', 'legacy'],
    Aquarius: ['vision', 'originality', 'community'],
    Pisces: ['imagination', 'compassion', 'flow'],
  };

  const topics = [
    'overthinking', 'consistency', 'boundaries', 'curiosity', 'rest',
    'courage', 'focus', 'letting-go', 'relationships', 'play', 'craft', 'perspective'
  ];
  const topic = topics[hash % topics.length];
  const s = sun && TRAITS[sun] ? TRAITS[sun][hash % TRAITS[sun].length] : null;
  const m = moon && TRAITS[moon] ? TRAITS[moon][hash % TRAITS[moon].length] : null;
  const a = asc && TRAITS[asc] ? TRAITS[asc][hash % TRAITS[asc].length] : null;

  const title = 'YOUR DAY AT A GLANCE';

  // Builders return two compact paragraphs
  function build(topic) {
    switch (topic) {
      case 'overthinking':
        return [
          'Count up how much time you spend second‑guessing yourself.',
          'Your habit of replaying decisions isn’t thoroughness—it’s fear. Your first instinct already knew. Trade doubt for one small action today.'
        ];
      case 'consistency':
        return [
          'It takes 28 days to change a pattern.',
          'Skip the shortcut. Show up for the boring reps. Momentum is built in quiet minutes you almost dismiss. Keep going.'
        ];
      case 'boundaries':
        return [
          'A clear no protects a better yes.',
          'Choose one place to draw a line. Discipline is a form of care—for your energy, focus, and future self.'
        ];
      case 'curiosity':
        return [
          'Ask one better question.',
          'You don’t need all the answers today. You need an honest question that opens the next door.'
        ];
      case 'rest':
        return [
          'Rest is productive.',
          'Your nervous system can’t sprint forever. Take twenty quiet minutes. Notice how clarity returns when you stop forcing it.'
        ];
      case 'courage':
        return [
          'Do the brave version of the same task.',
          'Fear is loud when the step matters. Let it ride along without driving. Press send.'
        ];
      case 'focus':
        return [
          'Reduce the problem to the next ten minutes.',
          'Pick one small slice and finish it. Focus turns big things into done things.'
        ];
      case 'letting-go':
        return [
          'Stop negotiating with what you’ve already outgrown.',
          'You’re allowed to set down what’s heavy. Space invites the right thing to arrive.'
        ];
      case 'relationships':
        return [
          'Say what you mean kindly and specifically.',
          'Assumptions multiply in silence. One clear sentence can rescue a whole day.'
        ];
      case 'play':
        return [
          'Let yourself enjoy something unproductive.',
          'Joy isn’t a reward for finishing—it’s fuel that helps you continue.'
        ];
      case 'craft':
        return [
          'Make one thing 5% better.',
          'Excellence is a series of small corrections. Tighten a detail and ship it.'
        ];
      case 'perspective':
      default:
        return [
          'Zoom out one level.',
          'This moment is a scene, not the whole story. Adjust the frame, then choose the next right move.'
        ];
    }
  }

  // Personalize lightly with sign roles
  const [p1, p2] = build(topic);
  const spice = [];
  if (s) spice.push(s.replace('-', ' '));
  if (m) spice.push(`${moon} Moon`);
  if (a) spice.push(`${asc} Rising`);
  const tag = spice.length ? ` (${spice.join(' • ')})` : '';

  return { title, blocks: [p1 + tag, p2] };
}
