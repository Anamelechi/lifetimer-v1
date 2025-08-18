(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/SwUpdater.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>SwUpdater
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function SwUpdater() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SwUpdater.useEffect": ()=>{
            if ("object" === "undefined" || !("serviceWorker" in navigator)) return;
            let reloaded = false;
            const onControllerChange = {
                "SwUpdater.useEffect.onControllerChange": ()=>{
                    if (reloaded) return;
                    reloaded = true;
                    // New service worker took control; reload to get fresh assets
                    window.location.reload();
                }
            }["SwUpdater.useEffect.onControllerChange"];
            navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
            navigator.serviceWorker.getRegistration().then({
                "SwUpdater.useEffect": (reg)=>{
                    if (!reg) return;
                    // Try to promote any waiting SW immediately
                    if (reg.waiting) {
                        try {
                            reg.waiting.postMessage({
                                type: "SKIP_WAITING"
                            });
                        } catch (e) {}
                    }
                    // Trigger an update check
                    try {
                        reg.update();
                    } catch (e) {}
                    // If a new SW is being installed, nudge it to activate ASAP
                    reg.addEventListener("updatefound", {
                        "SwUpdater.useEffect": ()=>{
                            const sw = reg.installing;
                            if (!sw) return;
                            sw.addEventListener("statechange", {
                                "SwUpdater.useEffect": ()=>{
                                    if (sw.state === "installed" && navigator.serviceWorker.controller) {
                                        try {
                                            var _reg_waiting;
                                            (_reg_waiting = reg.waiting) === null || _reg_waiting === void 0 ? void 0 : _reg_waiting.postMessage({
                                                type: "SKIP_WAITING"
                                            });
                                        } catch (e) {}
                                    }
                                }
                            }["SwUpdater.useEffect"]);
                        }
                    }["SwUpdater.useEffect"]);
                }
            }["SwUpdater.useEffect"]);
            return ({
                "SwUpdater.useEffect": ()=>{
                    try {
                        navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
                    } catch (e) {}
                }
            })["SwUpdater.useEffect"];
        }
    }["SwUpdater.useEffect"], []);
    return null;
}
_s(SwUpdater, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = SwUpdater;
var _c;
__turbopack_context__.k.register(_c, "SwUpdater");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_components_SwUpdater_1aadf61c.js.map