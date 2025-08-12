export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="glass max-w-md w-full rounded-2xl p-6 text-center">
        <h1 className="text-xl font-semibold mb-2">Offline</h1>
        <p className="text-white/80">You're offline. Cached content is still available. Reconnect to refresh facts.</p>
      </div>
    </div>
  );
}
