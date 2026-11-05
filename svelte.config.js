import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { readFileSync } from 'node:fs';

/** The app lives under apps.nubuza.com/spinny (see wrangler.jsonc). BASE_PATH= to move it. */
export const BASE = process.env.BASE_PATH ?? '/spinny';

/** Cloudflare Web Analytics (cookieless), injected at the edge when enabled. */
const ANALYTICS = {
	script: 'https://static.cloudflareinsights.com',
	connect: 'https://cloudflareinsights.com'
};

/** AdSense's origins, open only once monetization.config.json has a block ID. */
const { adsense } = JSON.parse(readFileSync('monetization.config.json', 'utf8'));
const ADS_ON = Object.values(adsense.slots).some(Boolean);
const AD_SCRIPTS = [
	'https://pagead2.googlesyndication.com',
	'https://fundingchoicesmessages.google.com',
	'https://*.adtrafficquality.google'
];
const AD_FRAMES = [
	'https://googleads.g.doubleclick.net',
	'https://tpc.googlesyndication.com',
	'https://www.google.com',
	...AD_SCRIPTS
];

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Files land in build/spinny/, so the static-assets Worker serves them at exactly
		// the URLs the pages use.
		adapter: adapter({
			pages: `build${BASE}`,
			assets: `build${BASE}`,
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		paths: { base: BASE, relative: false },
		csp: {
			mode: 'hash',
			directives: {
				'default-src': ['self'],
				'script-src': ['self', ANALYTICS.script, ...(ADS_ON ? AD_SCRIPTS : [])],
				// The wheel's rotation is an inline style.
				'style-src': ['self', 'unsafe-inline'],
				'img-src': ['self', 'data:', ...(ADS_ON ? ['https:'] : [])],
				'font-src': ['self'],
				'connect-src': ['self', ANALYTICS.connect, ...(ADS_ON ? AD_FRAMES : [])],
				'frame-src': ADS_ON ? AD_FRAMES : ['none'],
				'worker-src': ['self'],
				'manifest-src': ['self'],
				'object-src': ['none'],
				'base-uri': ['none'],
				'form-action': ['self'],
				'upgrade-insecure-requests': true
			}
		},
		version: { pollInterval: 0 }
	}
};

export default config;
