import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** The app lives under apps.nubuza.com/spinny (see wrangler.jsonc). BASE_PATH= to move it. */
export const BASE = process.env.BASE_PATH ?? '/spinny';

/** Cloudflare Web Analytics (cookieless), injected at the edge when enabled. */
const ANALYTICS = {
	script: 'https://static.cloudflareinsights.com',
	connect: 'https://cloudflareinsights.com'
};

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
				'script-src': ['self', ANALYTICS.script],
				// The wheel's rotation is an inline style.
				'style-src': ['self', 'unsafe-inline'],
				'img-src': ['self', 'data:'],
				'font-src': ['self'],
				'connect-src': ['self', ANALYTICS.connect],
				'frame-src': ['none'],
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
