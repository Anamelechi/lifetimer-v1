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
	async headers() {
		return [
			{
				source: '/sw.js',
				headers: [
					{ key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, proxy-revalidate' },
					{ key: 'Pragma', value: 'no-cache' },
					{ key: 'Expires', value: '0' },
				],
			},
			{
				source: '/workbox-:hash.js',
				headers: [
					{ key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, proxy-revalidate' },
					{ key: 'Pragma', value: 'no-cache' },
					{ key: 'Expires', value: '0' },
				],
			},
		];
	},
	async redirects() {
		return [
			{ source: '/personal-info', destination: '/age', permanent: false },
		];
	},
};

// Export PWA-wrapped config
export default withPWA(nextConfig);
