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
	// Use a custom build directory to avoid local .next permission conflicts
	distDir: 'build',
};

// Export PWA-wrapped config
export default withPWA(nextConfig);
