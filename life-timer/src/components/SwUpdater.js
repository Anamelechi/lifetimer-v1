"use client";

import { useEffect } from "react";

export default function SwUpdater() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    let reloaded = false;
    const onControllerChange = () => {
      if (reloaded) return;
      reloaded = true;
      // New service worker took control; reload to get fresh assets
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);

    navigator.serviceWorker.getRegistration().then((reg) => {
      if (!reg) return;
      // Try to promote any waiting SW immediately
      if (reg.waiting) {
        try { reg.waiting.postMessage({ type: "SKIP_WAITING" }); } catch {}
      }
      // Trigger an update check
      try { reg.update(); } catch {}
      // If a new SW is being installed, nudge it to activate ASAP
      reg.addEventListener("updatefound", () => {
        const sw = reg.installing;
        if (!sw) return;
        sw.addEventListener("statechange", () => {
          if (sw.state === "installed" && navigator.serviceWorker.controller) {
            try { reg.waiting?.postMessage({ type: "SKIP_WAITING" }); } catch {}
          }
        });
      });
    });

    return () => {
      try { navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange); } catch {}
    };
  }, []);
  return null;
}
