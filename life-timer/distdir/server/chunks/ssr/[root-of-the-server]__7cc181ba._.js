module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/components/BackButton.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>BackButton
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function BackButton({ fallback = "/device/welcome", label = "Back" }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const goBack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        try {
            const hasHistory = "undefined" !== 'undefined' && window.history && window.history.length > 1;
            const sameOriginRef = typeof document !== 'undefined' && document.referrer && new URL(document.referrer).origin === window.location.origin;
            if (hasHistory || sameOriginRef) {
                router.back();
            } else {
                router.push(fallback);
            }
        } catch  {
            router.push(fallback);
        }
    }, [
        router,
        fallback
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: goBack,
        "aria-label": "Go back",
        className: "inline-flex items-center gap-1 rounded-lg border border-white/30 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": true,
                children: "←"
            }, void 0, false, {
                fileName: "[project]/src/components/BackButton.js",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/BackButton.js",
                lineNumber: 31,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/BackButton.js",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/store/timerStore.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "useTimerStore": ()=>useTimerStore
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
;
const useTimerStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set)=>({
        // Core birth date/time (Date in local time)
        birthDate: null,
        setBirthDate: (date)=>set({
                birthDate: date
            }),
        // Birth location details
        birthCountry: '',
        birthCity: '',
        birthLat: null,
        birthLon: null,
        birthTimeZone: '',
        birthUtcOffsetSeconds: null,
        // Current location details
        currentCountry: '',
        currentCity: '',
        currentLat: null,
        currentLon: null,
        currentTimeZone: '',
        currentUtcOffsetSeconds: null,
        // Bulk setter helpers
        setBirthLocation: (info)=>set((state)=>({
                    birthCountry: info.birthCountry ?? state.birthCountry,
                    birthCity: info.birthCity ?? state.birthCity,
                    birthLat: info.birthLat ?? state.birthLat,
                    birthLon: info.birthLon ?? state.birthLon,
                    birthTimeZone: info.birthTimeZone ?? state.birthTimeZone,
                    birthUtcOffsetSeconds: info.birthUtcOffsetSeconds ?? state.birthUtcOffsetSeconds
                })),
        setCurrentLocation: (info)=>set((state)=>({
                    currentCountry: info.currentCountry ?? state.currentCountry,
                    currentCity: info.currentCity ?? state.currentCity,
                    currentLat: info.currentLat ?? state.currentLat,
                    currentLon: info.currentLon ?? state.currentLon,
                    currentTimeZone: info.currentTimeZone ?? state.currentTimeZone,
                    currentUtcOffsetSeconds: info.currentUtcOffsetSeconds ?? state.currentUtcOffsetSeconds
                })),
        deviceType: null,
        setDeviceType: (type)=>set({
                deviceType: type
            })
    }));
}),
"[project]/src/lib/astro.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ZODIAC": ()=>ZODIAC,
    "computeSunSign": ()=>computeSunSign,
    "generateAstroQuote": ()=>generateAstroQuote,
    "generateDailyInsight": ()=>generateDailyInsight,
    "toZodiacSign": ()=>toZodiacSign
});
const ZODIAC = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces"
];
function toZodiacSign(longitudeDegrees) {
    if (longitudeDegrees == null || isNaN(longitudeDegrees)) return null;
    const lon = (Number(longitudeDegrees) % 360 + 360) % 360;
    return ZODIAC[Math.floor(lon / 30) % 12] || null;
}
function computeSunSign(date) {
    if (!date) return null;
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const ranges = [
        [
            3,
            21,
            4,
            19,
            "Aries"
        ],
        [
            4,
            20,
            5,
            20,
            "Taurus"
        ],
        [
            5,
            21,
            6,
            20,
            "Gemini"
        ],
        [
            6,
            21,
            7,
            22,
            "Cancer"
        ],
        [
            7,
            23,
            8,
            22,
            "Leo"
        ],
        [
            8,
            23,
            9,
            22,
            "Virgo"
        ],
        [
            9,
            23,
            10,
            22,
            "Libra"
        ],
        [
            10,
            23,
            11,
            21,
            "Scorpio"
        ],
        [
            11,
            22,
            12,
            21,
            "Sagittarius"
        ],
        [
            12,
            22,
            1,
            19,
            "Capricorn"
        ],
        [
            1,
            20,
            2,
            18,
            "Aquarius"
        ],
        [
            2,
            19,
            3,
            20,
            "Pisces"
        ]
    ];
    const after = (M, D)=>m > M || m === M && d >= D;
    const before = (M, D)=>m < M || m === M && d <= D;
    for (const [sm, sd, em, ed, name] of ranges){
        if (sm <= em && after(sm, sd) && before(em, ed) || sm > em && (after(sm, sd) || before(em, ed))) {
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
    Pisces: "Compassion and imagination lead your flow."
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
    Pisces: "Rest and create—softness is strength."
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
    Pisces: "Let it flow."
};
function generateAstroQuote(sun, moon, asc, opts = {}) {
    const s = sun && SUN_LINES[sun] ? SUN_LINES[sun] : null;
    const m = moon && MOON_LINES[moon] ? MOON_LINES[moon] : null;
    const a = asc && ASC_LINES[asc] ? ASC_LINES[asc] : null;
    const parts = [
        s,
        m,
        a
    ].filter(Boolean);
    if (parts.length === 0) return "Set your Personal Info to see a chart-aligned note.";
    // Daily rotation: pick 1-3 lines deterministically based on day seed
    const seed = opts.seed ?? new Date().toISOString().slice(0, 10);
    const hash = [
        ...seed
    ].reduce((acc, ch)=>acc * 31 + ch.charCodeAt(0) >>> 0, 0);
    const pick = (arr)=>arr[hash % arr.length];
    const takeCount = hash % 3 + 1; // 1..3 lines
    const pool = parts;
    const chosen = [];
    for(let i = 0; i < Math.min(takeCount, pool.length); i++){
        const idx = (hash + i * 7) % pool.length;
        chosen.push(pool[idx]);
    }
    let text = chosen.join(" ");
    // Light personalization
    const name = opts.name;
    const city = opts.city;
    const tail = [
        name ? `${name},` : null,
        city ? `from ${city}` : null
    ].filter(Boolean).join(" ");
    if (tail) text = `${text} ${tail}`;
    return text;
}
function generateDailyInsight({ sun, moon, asc, seed }) {
    const daySeed = seed || new Date().toISOString().slice(0, 10);
    const hash = [
        ...daySeed + (sun || '') + (moon || '') + (asc || '')
    ].reduce((a, c)=>a * 33 + c.charCodeAt(0) >>> 0, 0);
    const TRAITS = {
        Aries: [
            'act-first',
            'courage',
            'directness'
        ],
        Taurus: [
            'steadiness',
            'patience',
            'grounding'
        ],
        Gemini: [
            'curiosity',
            'dialogue',
            'flexibility'
        ],
        Cancer: [
            'care',
            'home',
            'protection'
        ],
        Leo: [
            'warmth',
            'visibility',
            'play'
        ],
        Virgo: [
            'craft',
            'order',
            'service'
        ],
        Libra: [
            'balance',
            'harmony',
            'bridge'
        ],
        Scorpio: [
            'depth',
            'focus',
            'alchemy'
        ],
        Sagittarius: [
            'truth',
            'horizons',
            'faith'
        ],
        Capricorn: [
            'discipline',
            'structure',
            'legacy'
        ],
        Aquarius: [
            'vision',
            'originality',
            'community'
        ],
        Pisces: [
            'imagination',
            'compassion',
            'flow'
        ]
    };
    const topics = [
        'overthinking',
        'consistency',
        'boundaries',
        'curiosity',
        'rest',
        'courage',
        'focus',
        'letting-go',
        'relationships',
        'play',
        'craft',
        'perspective'
    ];
    const topic = topics[hash % topics.length];
    const s = sun && TRAITS[sun] ? TRAITS[sun][hash % TRAITS[sun].length] : null;
    const m = moon && TRAITS[moon] ? TRAITS[moon][hash % TRAITS[moon].length] : null;
    const a = asc && TRAITS[asc] ? TRAITS[asc][hash % TRAITS[asc].length] : null;
    const title = 'YOUR DAY AT A GLANCE';
    // Builders return two compact paragraphs
    function build(topic) {
        switch(topic){
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
    return {
        title,
        blocks: [
            p1 + tag,
            p2
        ]
    };
}
}),
"[project]/src/app/birth-chart/page.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>BirthChartPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BackButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BackButton.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$timerStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/timerStore.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$astronomy$2d$engine$2f$esm$2f$astronomy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/astronomy-engine/esm/astronomy.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$astro$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/astro.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
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
    if (body === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$astronomy$2d$engine$2f$esm$2f$astronomy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Body"].Sun && typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$astronomy$2d$engine$2f$esm$2f$astronomy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SunPosition"] === 'function') {
        const sp = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$astronomy$2d$engine$2f$esm$2f$astronomy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SunPosition"](date);
        return sp.elon;
    }
    if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$astronomy$2d$engine$2f$esm$2f$astronomy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EclipticLongitude"] === 'function') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$astronomy$2d$engine$2f$esm$2f$astronomy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EclipticLongitude"](body, date);
    }
    // Geocentric equatorial of date, with aberration
    const equ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$astronomy$2d$engine$2f$esm$2f$astronomy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Equator"](body, date, null, true, true);
    const ecl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$astronomy$2d$engine$2f$esm$2f$astronomy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ecliptic"](equ);
    return ecl.elon;
}
function formatOffset(secs) {
    if (secs == null || isNaN(secs)) return '';
    const sign = secs >= 0 ? '+' : '-';
    const abs = Math.abs(secs);
    const h = Math.floor(abs / 3600);
    const m = Math.floor(abs % 3600 / 60);
    return `UTC ${sign}${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}
function BirthChartPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$timerStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTimerStore"])();
    const [hydrated, setHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>setHydrated(true), []);
    const birthLocal = store.birthDate ? new Date(store.birthDate) : null;
    const sunSign = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$astro$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["computeSunSign"])(birthLocal), [
        birthLocal
    ]);
    const birthOffsetFmt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>formatOffset(store.birthUtcOffsetSeconds), [
        store.birthUtcOffsetSeconds
    ]);
    const currentOffsetFmt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>formatOffset(store.currentUtcOffsetSeconds), [
        store.currentUtcOffsetSeconds
    ]);
    // Compute approximate UTC instant from stored local birth + offset
    // Compute precise UTC instant when offset is known; otherwise fall back to local time ISO
    const birthUtcIso = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!birthLocal) return null;
        if (store.birthUtcOffsetSeconds == null) return birthLocal.toISOString();
        const ms = birthLocal.getTime() - store.birthUtcOffsetSeconds * 1000;
        return new Date(ms).toISOString();
    }, [
        birthLocal,
        store.birthUtcOffsetSeconds
    ]);
    // Moon ecliptic longitude and sign using Astronomy Engine
    const moonSign = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        try {
            if (!birthUtcIso) return null;
            const date = new Date(birthUtcIso);
            // Apparent ecliptic longitude of the Moon (geocentric)
            const ecl = eclipticLongitude(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$astronomy$2d$engine$2f$esm$2f$astronomy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Body"].Moon, date);
            const lon = (ecl + 360) % 360;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$astro$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toZodiacSign"])(lon);
        } catch  {
            return null;
        }
    }, [
        birthUtcIso
    ]);
    // Ascendant (rising sign) approximation using local sidereal time and ecliptic geometry
    const ascendant = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        try {
            // Require precise timezone and location for ascendant
            if (!birthLocal || store.birthUtcOffsetSeconds == null || store.birthLat == null || store.birthLon == null) return null;
            const ms = birthLocal.getTime() - store.birthUtcOffsetSeconds * 1000;
            const date = new Date(ms);
            // Observer at birthplace (not used further, kept logic simple)
            // Local apparent sidereal time in degrees
            const gast = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$astronomy$2d$engine$2f$esm$2f$astronomy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SiderealTime"](date); // hours at Greenwich
            const last = (gast + store.birthLon / 15) % 24 * 15; // degrees at location
            // Mean obliquity of the ecliptic (approx, modern epoch)
            const obliq = 23.43928;
            // Ascendant formula: tan(Asc) = 1/(cos e) * [ -cos L / (sin L * cos e + tan φ * sin e) ]
            const phi = store.birthLat * Math.PI / 180;
            const L = last * Math.PI / 180;
            const e = obliq * Math.PI / 180;
            const tanAsc = -Math.cos(L) / (Math.sin(L) * Math.cos(e) + Math.tan(phi) * Math.sin(e));
            let asc = Math.atan(tanAsc) * 180 / Math.PI;
            if (Math.sin(L) < 0) asc += 180;
            asc = (asc + 360) % 360;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$astro$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toZodiacSign"])(asc);
        } catch  {
            return null;
        }
    }, [
        birthUtcIso,
        store.birthLat,
        store.birthLon
    ]);
    // Compute Ascendant degrees value
    const ascendantDegrees = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        try {
            if (!birthLocal || store.birthUtcOffsetSeconds == null || store.birthLat == null || store.birthLon == null) return null;
            const ms = birthLocal.getTime() - store.birthUtcOffsetSeconds * 1000;
            const date = new Date(ms);
            const gast = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$astronomy$2d$engine$2f$esm$2f$astronomy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SiderealTime"](date);
            const last = (gast + store.birthLon / 15) % 24 * 15;
            const obliq = 23.43928;
            const phi = store.birthLat * Math.PI / 180;
            const L = last * Math.PI / 180;
            const e = obliq * Math.PI / 180;
            const tanAsc = -Math.cos(L) / (Math.sin(L) * Math.cos(e) + Math.tan(phi) * Math.sin(e));
            let asc = Math.atan(tanAsc) * 180 / Math.PI;
            if (Math.sin(L) < 0) asc += 180;
            return (asc + 360) % 360;
        } catch  {
            return null;
        }
    }, [
        birthUtcIso,
        store.birthLat,
        store.birthLon
    ]);
    // Compute planetary ecliptic longitudes (geocentric apparent)
    const planets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!birthUtcIso) return [];
        const date = new Date(birthUtcIso);
        const bodies = [
            {
                key: 'Sun',
                body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$astronomy$2d$engine$2f$esm$2f$astronomy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Body"].Sun
            },
            {
                key: 'Moon',
                body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$astronomy$2d$engine$2f$esm$2f$astronomy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Body"].Moon
            },
            {
                key: 'Mercury',
                body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$astronomy$2d$engine$2f$esm$2f$astronomy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Body"].Mercury
            },
            {
                key: 'Venus',
                body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$astronomy$2d$engine$2f$esm$2f$astronomy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Body"].Venus
            },
            {
                key: 'Mars',
                body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$astronomy$2d$engine$2f$esm$2f$astronomy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Body"].Mars
            },
            {
                key: 'Jupiter',
                body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$astronomy$2d$engine$2f$esm$2f$astronomy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Body"].Jupiter
            },
            {
                key: 'Saturn',
                body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$astronomy$2d$engine$2f$esm$2f$astronomy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Body"].Saturn
            },
            {
                key: 'Uranus',
                body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$astronomy$2d$engine$2f$esm$2f$astronomy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Body"].Uranus
            },
            {
                key: 'Neptune',
                body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$astronomy$2d$engine$2f$esm$2f$astronomy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Body"].Neptune
            },
            {
                key: 'Pluto',
                body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$astronomy$2d$engine$2f$esm$2f$astronomy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Body"].Pluto
            }
        ];
        const out = [];
        for (const { key, body } of bodies){
            try {
                const lon = (eclipticLongitude(body, date) % 360 + 360) % 360;
                const sign = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$astro$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toZodiacSign"])(lon);
                const degInSign = lon % 30;
                const deg = Math.floor(degInSign);
                const min = Math.floor((degInSign - deg) * 60);
                const sec = Math.floor(((degInSign - deg) * 60 - min) * 60);
                out.push({
                    key,
                    lon,
                    sign,
                    deg,
                    min,
                    sec
                });
            } catch (e) {
            // skip this body if calc fails to avoid dropping the whole table
            }
        }
        return out;
    }, [
        birthUtcIso
    ]);
    const [note, setNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const chartSigns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const set = new Set();
        if (sunSign) set.add(sunSign);
        if (moonSign) set.add(moonSign);
        if (ascendant) set.add(ascendant);
        for (const p of planets || []){
            if (p?.sign) set.add(p.sign);
        }
        return Array.from(set).sort();
    }, [
        sunSign,
        moonSign,
        ascendant,
        planets
    ]);
    const insight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const day = new Date().toISOString().slice(0, 10);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$astro$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateDailyInsight"])({
            sun: sunSign,
            moon: moonSign,
            asc: ascendant,
            seed: day
        });
    }, [
        sunSign,
        moonSign,
        ascendant
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let aborted = false;
        async function load() {
            try {
                const day = new Date().toISOString().slice(0, 10);
                const params = new URLSearchParams();
                if (sunSign) params.set('sun', sunSign);
                if (moonSign) params.set('moon', moonSign);
                if (ascendant) params.set('asc', ascendant);
                if (birthLocal) params.set('date', toDateOnlyString(birthLocal));
                if (chartSigns.length) params.set('signs', chartSigns.join(','));
                params.set('today', day);
                const res = await fetch(`/api/astro-note?${params.toString()}`, {
                    cache: 'no-store'
                });
                if (!res.ok) throw new Error('note fetch failed');
                const js = await res.json();
                if (!aborted) setNote(js.note || null);
            } catch  {
                if (!aborted) {
                    const seed = new Date().toISOString().slice(0, 10);
                    setNote((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$astro$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateAstroQuote"])(sunSign, moonSign, ascendant, {
                        seed
                    }));
                }
            }
        }
        load();
        return ()=>{
            aborted = true;
        };
    }, [
        sunSign,
        moonSign,
        ascendant,
        birthLocal,
        chartSigns.join(',')
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-start justify-center p-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "w-full max-w-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BackButton$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            fallback: "/age"
                        }, void 0, false, {
                            fileName: "[project]/src/app/birth-chart/page.js",
                            lineNumber: 206,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-xl font-semibold",
                            children: "Birth Chart"
                        }, void 0, false, {
                            fileName: "[project]/src/app/birth-chart/page.js",
                            lineNumber: 207,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "w-[64px]"
                        }, void 0, false, {
                            fileName: "[project]/src/app/birth-chart/page.js",
                            lineNumber: 208,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/birth-chart/page.js",
                    lineNumber: 205,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "glass rounded-2xl p-6 space-y-6",
                    children: [
                        !hydrated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-white/70",
                            children: "Loading…"
                        }, void 0, false, {
                            fileName: "[project]/src/app/birth-chart/page.js",
                            lineNumber: 212,
                            columnNumber: 20
                        }, this),
                        hydrated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-white/90 font-medium",
                                            children: "Your Details"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/birth-chart/page.js",
                                            lineNumber: 216,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-white/80",
                                            children: [
                                                "Birth: ",
                                                birthLocal ? `${toDateOnlyString(birthLocal)} ${toTimeHMString(birthLocal)}` : '—'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/birth-chart/page.js",
                                            lineNumber: 217,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-white/80",
                                            children: [
                                                "Birthplace: ",
                                                store.birthCity || '—',
                                                ", ",
                                                store.birthCountry || ''
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/birth-chart/page.js",
                                            lineNumber: 218,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-white/80",
                                            children: [
                                                "Birth Timezone: ",
                                                store.birthTimeZone || '—',
                                                " ",
                                                birthOffsetFmt ? `(${birthOffsetFmt})` : ''
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/birth-chart/page.js",
                                            lineNumber: 219,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-white/80",
                                            children: [
                                                "Birth UTC instant: ",
                                                birthUtcIso || '—'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/birth-chart/page.js",
                                            lineNumber: 220,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-white/80",
                                            children: [
                                                "Current Location: ",
                                                store.currentCity || '—',
                                                ", ",
                                                store.currentCountry || '',
                                                " ",
                                                currentOffsetFmt ? `(${currentOffsetFmt})` : ''
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/birth-chart/page.js",
                                            lineNumber: 221,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/birth-chart/page.js",
                                    lineNumber: 215,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-white/90 font-medium",
                                            children: "Birth Table"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/birth-chart/page.js",
                                            lineNumber: 225,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: birthUtcIso ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-3",
                                                children: [
                                                    ascendant ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "panel rounded-xl p-4 col-span-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-white/60 tracking-widest",
                                                                children: "ASCENDANT (RISING)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/birth-chart/page.js",
                                                                lineNumber: 232,
                                                                columnNumber: 22
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-lg text-accent",
                                                                children: ascendant
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/birth-chart/page.js",
                                                                lineNumber: 233,
                                                                columnNumber: 22
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-white/50",
                                                                children: ascendantDegrees != null ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$astro$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toZodiacSign"])(ascendantDegrees)} ${Math.floor(ascendantDegrees % 30)}° ${Math.floor((ascendantDegrees % 30 - Math.floor(ascendantDegrees % 30)) * 60)}'` : 'Angle: —'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/birth-chart/page.js",
                                                                lineNumber: 234,
                                                                columnNumber: 22
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/birth-chart/page.js",
                                                        lineNumber: 231,
                                                        columnNumber: 21
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "panel rounded-xl p-4 col-span-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-white/60 tracking-widest",
                                                                children: "ASCENDANT (RISING)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/birth-chart/page.js",
                                                                lineNumber: 238,
                                                                columnNumber: 22
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-white/70",
                                                                children: "Enter exact birth time and city to compute the Ascendant."
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/birth-chart/page.js",
                                                                lineNumber: 239,
                                                                columnNumber: 22
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/birth-chart/page.js",
                                                        lineNumber: 237,
                                                        columnNumber: 21
                                                    }, this),
                                                    [
                                                        'Neptune',
                                                        'Uranus',
                                                        'Jupiter',
                                                        'Mercury',
                                                        'Saturn',
                                                        'Sun',
                                                        'Venus',
                                                        'Mars',
                                                        'Moon',
                                                        'Pluto'
                                                    ].map((label)=>{
                                                        const p = planets.find((x)=>x.key === label);
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "panel rounded-xl p-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs text-white/60 tracking-widest",
                                                                    children: label.toUpperCase()
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/birth-chart/page.js",
                                                                    lineNumber: 248,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-lg text-accent",
                                                                    children: label === 'Sun' ? p?.sign || sunSign || '—' : p?.sign || '—'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/birth-chart/page.js",
                                                                    lineNumber: 249,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs text-white/50",
                                                                    children: p ? `${p.sign} ${p.deg}° ${p.min}' ${p.sec}"` : 'Longitude: —'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/birth-chart/page.js",
                                                                    lineNumber: 250,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, label, true, {
                                                            fileName: "[project]/src/app/birth-chart/page.js",
                                                            lineNumber: 247,
                                                            columnNumber: 22
                                                        }, this);
                                                    })
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/birth-chart/page.js",
                                                lineNumber: 228,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-white/70",
                                                children: "Enter your birth details to compute your full chart."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/birth-chart/page.js",
                                                lineNumber: 256,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/birth-chart/page.js",
                                            lineNumber: 226,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "panel rounded-xl p-4 space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-white/60 tracking-widest",
                                                    children: "CHART-ALIGNED NOTE"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/birth-chart/page.js",
                                                    lineNumber: 260,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-white/90 leading-relaxed",
                                                    children: note || insight?.blocks?.[0] || '—'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/birth-chart/page.js",
                                                    lineNumber: 261,
                                                    columnNumber: 27
                                                }, this),
                                                !note && insight?.blocks?.[1] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-white/80 leading-relaxed",
                                                    children: insight.blocks[1]
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/birth-chart/page.js",
                                                    lineNumber: 263,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/birth-chart/page.js",
                                            lineNumber: 259,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-white/60",
                                            children: "Exact birth time and place are needed for Ascendant and precise degrees."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/birth-chart/page.js",
                                            lineNumber: 266,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-white/60",
                                            children: [
                                                "Update your info in ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    className: "underline",
                                                    href: "/age",
                                                    children: "Personal Info"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/birth-chart/page.js",
                                                    lineNumber: 267,
                                                    columnNumber: 76
                                                }, this),
                                                "."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/birth-chart/page.js",
                                            lineNumber: 267,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pt-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>router.push('/'),
                                                className: "w-full bg-black text-white border border-white font-medium rounded-lg py-2 transition hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed",
                                                disabled: !birthLocal || !store.birthCity || !store.birthUtcOffsetSeconds,
                                                children: "Go to Timer"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/birth-chart/page.js",
                                                lineNumber: 269,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/birth-chart/page.js",
                                            lineNumber: 268,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/birth-chart/page.js",
                                    lineNumber: 224,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/birth-chart/page.js",
                    lineNumber: 211,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/birth-chart/page.js",
            lineNumber: 204,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/birth-chart/page.js",
        lineNumber: 203,
        columnNumber: 3
    }, this);
}
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__7cc181ba._.js.map