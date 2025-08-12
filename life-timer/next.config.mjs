// PWA configuration using next-pwa (GenerateSW) per official docs
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const withPWA = require('next-pwa')({
	dest: 'public',
	register: true,
	skipWaiting: true,
	// keep PWA enabled in dev for offline testing
	disable: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Add any Next.js config here
};

// Export PWA-wrapped config
export default withPWA(nextConfig);
