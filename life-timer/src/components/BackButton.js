"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function BackButton({ fallback = "/device/welcome", label = "Back" }) {
  const router = useRouter();

  const goBack = useCallback(() => {
    try {
      const hasHistory = typeof window !== 'undefined' && window.history && window.history.length > 1;
      const sameOriginRef = typeof document !== 'undefined' && document.referrer && new URL(document.referrer).origin === window.location.origin;
      if (hasHistory || sameOriginRef) {
        router.back();
      } else {
        router.push(fallback);
      }
    } catch {
      router.push(fallback);
    }
  }, [router, fallback]);

  return (
    <button
      type="button"
      onClick={goBack}
      aria-label="Go back"
      className="inline-flex items-center gap-1 rounded-lg border border-white/30 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10"
    >
      <span aria-hidden>←</span>
      <span>{label}</span>
    </button>
  );
}
