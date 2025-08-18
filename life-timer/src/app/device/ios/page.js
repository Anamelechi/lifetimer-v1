"use client";

import Link from "next/link";
import BackButton from "@/components/BackButton";

export default function IOSInstructionsPage() {
  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <main className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <BackButton fallback="/device/welcome" />
          <h1 className="text-xl font-semibold">Add to Home Screen (iOS)</h1>
          <span className="w-[64px]" />
        </div>
        <div className="glass rounded-2xl p-6 space-y-4">
          <ol className="list-decimal list-inside space-y-2 text-white/90">
            <li>Open this app in Safari.</li>
            <li>Tap the Share button (the square with an up arrow).</li>
            <li>Scroll down and tap &quot;Add to Home Screen&quot;.</li>
            <li>Optionally rename, then tap &quot;Add&quot;.</li>
          </ol>
          <p className="text-white/70 text-sm">
            Tip: If you don&apos;t see the option, ensure you&apos;re using Safari (not inside another in-app browser),
            and that the site is reachable over HTTPS.
          </p>
          <div className="flex items-center justify-between mt-2">
            <Link href="/device" className="text-accent">Back</Link>
            <Link href="/age" className="bg-black text-white border border-white font-medium rounded-lg px-3 py-1.5 transition hover:bg-black/90">Continue</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
