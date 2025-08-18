"use client";

import Link from "next/link";

export default function DeviceWelcomePage() {
  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <main className="w-full max-w-md">
        <h1 className="text-center text-2xl font-semibold mb-4">Welcome to Life Timer</h1>
        <div className="glass rounded-2xl p-6 space-y-4">
          <p className="text-white/90 leading-relaxed">
            ⏳ Every second you see is one you’ve lived and one you’ll never get back.

You’ve already traveled through countless sunrises, heartbeats, and breaths to arrive at this moment. Now you can watch your story unfold in real time down to the exact second so you remember that life isn’t someday, it’s right now.
          </p>
          <p className="text-white/80 text-sm">
            Enter your Personal Info (birth date/time and locations) to unlock your Birth Chart and precise stats,
            or set up your device for quick access from your home screen.
          </p>
          <div className="space-y-3 mt-2">
            <Link
              href="/age"
              className="block w-full text-center bg-black text-white border border-white rounded-lg py-2 hover:bg-black/90"
            >
              Open Personal Info
            </Link>
            <Link
              href="/device"
              className="block w-full text-center bg-black text-white border border-white rounded-lg py-2 hover:bg-black/90"
            >
              Select Device
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
