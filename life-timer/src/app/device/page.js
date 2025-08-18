"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTimerStore } from "@/store/timerStore";
import BackButton from "@/components/BackButton";

export default function DeviceSelectionPage() {
  const router = useRouter();
  const { deviceType, setDeviceType } = useTimerStore();
  const [selected, setSelected] = useState(deviceType || "");
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [androidMsg, setAndroidMsg] = useState("");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("life-timer:deviceType") : null;
    if (saved) setSelected(saved);
  }, []);

  useEffect(() => {
    // Capture the install prompt for Android (Chrome)
    const onBIP = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    const onInstalled = () => {
      setAndroidMsg("Installed! You can now open Life Timer from your home screen.");
      router.push("/");
    };
    window.addEventListener("beforeinstallprompt", onBIP);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBIP);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, [router]);

  const choose = useCallback((type) => {
    setSelected(type);
    setDeviceType(type);
    if (typeof window !== "undefined") {
      localStorage.setItem("life-timer:deviceType", type);
    }
  }, [setDeviceType]);

  const onIOS = () => {
    choose('ios');
    router.push('/device/ios');
  };

  const onAndroid = async () => {
    choose('android');
    // Try the captured prompt if available
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        setDeferredPrompt(null);
        if (outcome === 'accepted') {
          setAndroidMsg('Installing… If not visible yet, check your home screen shortly.');
        } else {
          setAndroidMsg('Install dismissed. You can install from Chrome menu → Install app.');
        }
      } catch (e) {
        setAndroidMsg('Install failed. Open Chrome menu → Install app to add it manually.');
      }
    } else {
      setAndroidMsg('If the prompt didn\'t show, open Chrome menu → Install app (or Add to Home screen).');
    }
  };

  const onContinue = () => router.push('/age');

  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <main className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <BackButton fallback="/device/welcome" />
          <h1 className="text-xl font-semibold">Choose Your Device</h1>
          <span className="w-[64px]" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            className={`panel rounded-2xl p-6 text-center transition border ${selected === 'ios' ? 'border-accent' : 'border-transparent'}`}
            onClick={onIOS}
          >
            <div className="text-3xl"></div>
            <div className="mt-2 text-sm">iOS</div>
          </button>
          <button
            className={`panel rounded-2xl p-6 text-center transition border ${selected === 'android' ? 'border-accent' : 'border-transparent'}`}
            onClick={onAndroid}
          >
            <div className="text-3xl">🤖</div>
            <div className="mt-2 text-sm">Android & Windows</div>
          </button>
        </div>
        {androidMsg && (
          <div className="mt-4 text-sm text-white/80 text-center">{androidMsg}</div>
        )}
    {!androidMsg && (
          <button
            type="button"
            onClick={onContinue}
            className="w-full mt-6 bg-black text-white border border-white font-medium rounded-lg py-2 transition hover:bg-black/90"
          >
  Continue to Personal Info
          </button>
        )}
      </main>
    </div>
  );
}
