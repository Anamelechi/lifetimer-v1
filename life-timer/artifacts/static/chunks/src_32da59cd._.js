(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/BackButton.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>BackButton
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function BackButton(param) {
    let { fallback = "/device/welcome", label = "Back" } = param;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const goBack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BackButton.useCallback[goBack]": ()=>{
            try {
                const hasHistory = "object" !== 'undefined' && window.history && window.history.length > 1;
                const sameOriginRef = typeof document !== 'undefined' && document.referrer && new URL(document.referrer).origin === window.location.origin;
                if (hasHistory || sameOriginRef) {
                    router.back();
                } else {
                    router.push(fallback);
                }
            } catch (e) {
                router.push(fallback);
            }
        }
    }["BackButton.useCallback[goBack]"], [
        router,
        fallback
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: goBack,
        "aria-label": "Go back",
        className: "inline-flex items-center gap-1 rounded-lg border border-white/30 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": true,
                children: "←"
            }, void 0, false, {
                fileName: "[project]/src/components/BackButton.js",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_s(BackButton, "y16mrqc4nEF2IPGj5AwOAkHoNjY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = BackButton;
var _c;
__turbopack_context__.k.register(_c, "BackButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/store/timerStore.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useTimerStore": ()=>useTimerStore
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
;
const useTimerStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set)=>({
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
        setBirthLocation: (info)=>set((state)=>{
                var _info_birthCountry, _info_birthCity, _info_birthLat, _info_birthLon, _info_birthTimeZone, _info_birthUtcOffsetSeconds;
                return {
                    birthCountry: (_info_birthCountry = info.birthCountry) !== null && _info_birthCountry !== void 0 ? _info_birthCountry : state.birthCountry,
                    birthCity: (_info_birthCity = info.birthCity) !== null && _info_birthCity !== void 0 ? _info_birthCity : state.birthCity,
                    birthLat: (_info_birthLat = info.birthLat) !== null && _info_birthLat !== void 0 ? _info_birthLat : state.birthLat,
                    birthLon: (_info_birthLon = info.birthLon) !== null && _info_birthLon !== void 0 ? _info_birthLon : state.birthLon,
                    birthTimeZone: (_info_birthTimeZone = info.birthTimeZone) !== null && _info_birthTimeZone !== void 0 ? _info_birthTimeZone : state.birthTimeZone,
                    birthUtcOffsetSeconds: (_info_birthUtcOffsetSeconds = info.birthUtcOffsetSeconds) !== null && _info_birthUtcOffsetSeconds !== void 0 ? _info_birthUtcOffsetSeconds : state.birthUtcOffsetSeconds
                };
            }),
        setCurrentLocation: (info)=>set((state)=>{
                var _info_currentCountry, _info_currentCity, _info_currentLat, _info_currentLon, _info_currentTimeZone, _info_currentUtcOffsetSeconds;
                return {
                    currentCountry: (_info_currentCountry = info.currentCountry) !== null && _info_currentCountry !== void 0 ? _info_currentCountry : state.currentCountry,
                    currentCity: (_info_currentCity = info.currentCity) !== null && _info_currentCity !== void 0 ? _info_currentCity : state.currentCity,
                    currentLat: (_info_currentLat = info.currentLat) !== null && _info_currentLat !== void 0 ? _info_currentLat : state.currentLat,
                    currentLon: (_info_currentLon = info.currentLon) !== null && _info_currentLon !== void 0 ? _info_currentLon : state.currentLon,
                    currentTimeZone: (_info_currentTimeZone = info.currentTimeZone) !== null && _info_currentTimeZone !== void 0 ? _info_currentTimeZone : state.currentTimeZone,
                    currentUtcOffsetSeconds: (_info_currentUtcOffsetSeconds = info.currentUtcOffsetSeconds) !== null && _info_currentUtcOffsetSeconds !== void 0 ? _info_currentUtcOffsetSeconds : state.currentUtcOffsetSeconds
                };
            }),
        deviceType: null,
        setDeviceType: (type)=>set({
                deviceType: type
            })
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/astro.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ZODIAC": ()=>ZODIAC,
    "computeSunSign": ()=>computeSunSign,
    "generateAstroQuote": ()=>generateAstroQuote,
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
function generateAstroQuote(sun, moon, asc) {
    const s = sun && SUN_LINES[sun] ? SUN_LINES[sun] : null;
    const m = moon && MOON_LINES[moon] ? MOON_LINES[moon] : null;
    const a = asc && ASC_LINES[asc] ? ASC_LINES[asc] : null;
    const parts = [
        s,
        m,
        a
    ].filter(Boolean);
    if (parts.length === 0) return "Set your Personal Info to see a chart-aligned note.";
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return parts.join(" ");
    return "".concat(parts[0], " ").concat(parts[1], " ").concat(parts[2]);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/birth-chart/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>BirthChartPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BackButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BackButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$timerStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/timerStore.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$astronomy$2d$engine$2f$esm$2f$astronomy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/astronomy-engine/esm/astronomy.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$astro$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/astro.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
    return "".concat(y, "-").concat(m, "-").concat(day);
}
function toTimeHMString(d) {
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return "".concat(hh, ":").concat(mm);
}
function BirthChartPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$timerStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTimerStore"])();
    const [hydrated, setHydrated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BirthChartPage.useEffect": ()=>setHydrated(true)
    }["BirthChartPage.useEffect"], []);
    const birthLocal = store.birthDate ? new Date(store.birthDate) : null;
    const sunSign = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BirthChartPage.useMemo[sunSign]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$astro$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeSunSign"])(birthLocal)
    }["BirthChartPage.useMemo[sunSign]"], [
        birthLocal
    ]);
    const birthOffsetHours = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BirthChartPage.useMemo[birthOffsetHours]": ()=>store.birthUtcOffsetSeconds != null ? store.birthUtcOffsetSeconds / 3600 : null
    }["BirthChartPage.useMemo[birthOffsetHours]"], [
        store.birthUtcOffsetSeconds
    ]);
    const currentOffsetHours = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BirthChartPage.useMemo[currentOffsetHours]": ()=>store.currentUtcOffsetSeconds != null ? store.currentUtcOffsetSeconds / 3600 : null
    }["BirthChartPage.useMemo[currentOffsetHours]"], [
        store.currentUtcOffsetSeconds
    ]);
    // Compute approximate UTC instant from stored local birth + offset
    const birthUtcIso = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BirthChartPage.useMemo[birthUtcIso]": ()=>{
            if (!birthLocal || store.birthUtcOffsetSeconds == null) return null;
            const ms = birthLocal.getTime() - store.birthUtcOffsetSeconds * 1000;
            return new Date(ms).toISOString();
        }
    }["BirthChartPage.useMemo[birthUtcIso]"], [
        birthLocal,
        store.birthUtcOffsetSeconds
    ]);
    // Moon ecliptic longitude and sign using Astronomy Engine
    const moonSign = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BirthChartPage.useMemo[moonSign]": ()=>{
            try {
                if (!birthUtcIso || store.birthLat == null || store.birthLon == null) return null;
                const date = new Date(birthUtcIso);
                // Apparent ecliptic longitude of the Moon (geocentric)
                const ecl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$astronomy$2d$engine$2f$esm$2f$astronomy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EclipticLongitude"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$astronomy$2d$engine$2f$esm$2f$astronomy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Body"].Moon, date);
                const lon = (ecl + 360) % 360;
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$astro$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toZodiacSign"])(lon);
            } catch (e) {
                return null;
            }
        }
    }["BirthChartPage.useMemo[moonSign]"], [
        birthUtcIso,
        store.birthLat,
        store.birthLon
    ]);
    // Ascendant (rising sign) approximation using local sidereal time and ecliptic geometry
    const ascendant = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BirthChartPage.useMemo[ascendant]": ()=>{
            try {
                if (!birthUtcIso || store.birthLat == null || store.birthLon == null) return null;
                const date = new Date(birthUtcIso);
                // Observer at birthplace (not used further, kept logic simple)
                // Local apparent sidereal time in degrees
                const gast = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$astronomy$2d$engine$2f$esm$2f$astronomy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SiderealTime"](date); // hours at Greenwich
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
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$astro$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toZodiacSign"])(asc);
            } catch (e) {
                return null;
            }
        }
    }["BirthChartPage.useMemo[ascendant]"], [
        birthUtcIso,
        store.birthLat,
        store.birthLon
    ]);
    // Compute sun ecliptic longitude for table (approximate by date range for sign only; degrees left blank)
    const chartQuote = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BirthChartPage.useMemo[chartQuote]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$astro$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateAstroQuote"])(sunSign, moonSign, ascendant)
    }["BirthChartPage.useMemo[chartQuote]"], [
        sunSign,
        moonSign,
        ascendant
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-start justify-center p-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "w-full max-w-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BackButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            fallback: "/age"
                        }, void 0, false, {
                            fileName: "[project]/src/app/birth-chart/page.js",
                            lineNumber: 88,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-xl font-semibold",
                            children: "Birth Chart"
                        }, void 0, false, {
                            fileName: "[project]/src/app/birth-chart/page.js",
                            lineNumber: 89,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "w-[64px]"
                        }, void 0, false, {
                            fileName: "[project]/src/app/birth-chart/page.js",
                            lineNumber: 90,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/birth-chart/page.js",
                    lineNumber: 87,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "glass rounded-2xl p-6 space-y-6",
                    children: [
                        !hydrated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-white/70",
                            children: "Loading…"
                        }, void 0, false, {
                            fileName: "[project]/src/app/birth-chart/page.js",
                            lineNumber: 94,
                            columnNumber: 20
                        }, this),
                        hydrated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-white/90 font-medium",
                                            children: "Your Details"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/birth-chart/page.js",
                                            lineNumber: 98,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-white/80",
                                            children: [
                                                "Birth: ",
                                                birthLocal ? "".concat(toDateOnlyString(birthLocal), " ").concat(toTimeHMString(birthLocal)) : '—'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/birth-chart/page.js",
                                            lineNumber: 99,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-white/80",
                                            children: [
                                                "Birthplace: ",
                                                store.birthCity || '—',
                                                ", ",
                                                store.birthCountry || ''
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/birth-chart/page.js",
                                            lineNumber: 100,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-white/80",
                                            children: [
                                                "Birth Timezone: ",
                                                store.birthTimeZone || '—',
                                                " ",
                                                birthOffsetHours != null ? "(UTC ".concat(birthOffsetHours >= 0 ? '+' : '').concat(birthOffsetHours, "h)") : ''
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/birth-chart/page.js",
                                            lineNumber: 101,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-white/80",
                                            children: [
                                                "Birth UTC instant: ",
                                                birthUtcIso || '—'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/birth-chart/page.js",
                                            lineNumber: 102,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-white/80",
                                            children: [
                                                "Current Location: ",
                                                store.currentCity || '—',
                                                ", ",
                                                store.currentCountry || '',
                                                " ",
                                                currentOffsetHours != null ? "(UTC ".concat(currentOffsetHours >= 0 ? '+' : '').concat(currentOffsetHours, "h)") : ''
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/birth-chart/page.js",
                                            lineNumber: 103,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/birth-chart/page.js",
                                    lineNumber: 97,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-white/90 font-medium",
                                            children: "Birth Table"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/birth-chart/page.js",
                                            lineNumber: 107,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "panel rounded-xl p-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-white/60 tracking-widest",
                                                            children: "SUN"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/birth-chart/page.js",
                                                            lineNumber: 110,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-lg text-accent",
                                                            children: sunSign || '—'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/birth-chart/page.js",
                                                            lineNumber: 111,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-white/50",
                                                            children: "Longitude: —"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/birth-chart/page.js",
                                                            lineNumber: 112,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/birth-chart/page.js",
                                                    lineNumber: 109,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "panel rounded-xl p-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-white/60 tracking-widest",
                                                            children: "MOON"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/birth-chart/page.js",
                                                            lineNumber: 115,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-lg text-accent",
                                                            children: moonSign || '—'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/birth-chart/page.js",
                                                            lineNumber: 116,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-white/50",
                                                            children: [
                                                                "Longitude: ",
                                                                birthUtcIso ? "".concat((__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$astronomy$2d$engine$2f$esm$2f$astronomy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EclipticLongitude"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$astronomy$2d$engine$2f$esm$2f$astronomy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Body"].Moon, new Date(birthUtcIso)) % 360).toFixed(1), "°") : '—'
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/birth-chart/page.js",
                                                            lineNumber: 117,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/birth-chart/page.js",
                                                    lineNumber: 114,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "panel rounded-xl p-4 col-span-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-white/60 tracking-widest",
                                                            children: "ASCENDANT (RISING)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/birth-chart/page.js",
                                                            lineNumber: 120,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-lg text-accent",
                                                            children: ascendant || '—'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/birth-chart/page.js",
                                                            lineNumber: 121,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-white/50",
                                                            children: [
                                                                "Angle: ",
                                                                "—"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/birth-chart/page.js",
                                                            lineNumber: 122,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/birth-chart/page.js",
                                                    lineNumber: 119,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/birth-chart/page.js",
                                            lineNumber: 108,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "panel rounded-xl p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-white/60 tracking-widest",
                                                    children: "CHART-ALIGNED NOTE"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/birth-chart/page.js",
                                                    lineNumber: 126,
                                                    columnNumber: 18
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-white/90 leading-relaxed",
                                                    children: chartQuote
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/birth-chart/page.js",
                                                    lineNumber: 127,
                                                    columnNumber: 18
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/birth-chart/page.js",
                                            lineNumber: 125,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-white/60",
                                            children: "We use your location and exact time to compute a precise chart. Full planetary positions will be added next."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/birth-chart/page.js",
                                            lineNumber: 129,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-white/60",
                                            children: [
                                                "Update your info in ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    className: "underline",
                                                    href: "/age",
                                                    children: "Personal Info"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/birth-chart/page.js",
                                                    lineNumber: 130,
                                                    columnNumber: 76
                                                }, this),
                                                "."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/birth-chart/page.js",
                                            lineNumber: 130,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pt-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>router.push('/'),
                                                className: "w-full bg-black text-white border border-white font-medium rounded-lg py-2 transition hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed",
                                                disabled: !birthLocal || !store.birthCity || !store.birthUtcOffsetSeconds,
                                                children: "Go to Timer"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/birth-chart/page.js",
                                                lineNumber: 132,
                                                columnNumber: 18
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/birth-chart/page.js",
                                            lineNumber: 131,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/birth-chart/page.js",
                                    lineNumber: 106,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/birth-chart/page.js",
                    lineNumber: 93,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/birth-chart/page.js",
            lineNumber: 86,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/birth-chart/page.js",
        lineNumber: 85,
        columnNumber: 3
    }, this);
}
_s(BirthChartPage, "GqKirr3m+Cy99ijDN3KgyPIjBts=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$timerStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTimerStore"]
    ];
});
_c = BirthChartPage;
var _c;
__turbopack_context__.k.register(_c, "BirthChartPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_32da59cd._.js.map