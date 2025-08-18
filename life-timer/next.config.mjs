// PWA configuration using next-pwa (GenerateSW) per official docs
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const withPWA = require('next-pwa')({
	dest: 'public',
	register: true,
	skipWaiting: true,
	// Disable SW in development to prevent dev caching masking UI changes
	disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Use a custom build directory to avoid local .next permission conflicts
	distDir: 'build',
	async redirects() {
		return [
			{ source: '/personal-info', destination: '/age', permanent: false },
		];
	},
};

// Export PWA-wrapped config
export default withPWA(nextConfig);
