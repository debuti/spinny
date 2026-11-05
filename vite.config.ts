import { sveltekit } from '@sveltejs/kit/vite';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'vitest/config';

const pkg = JSON.parse(readFileSync('package.json', 'utf8')) as { version: string };
const commit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
const buildDate = new Date().toISOString().slice(0, 10);

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		__APP_VERSION__: JSON.stringify(pkg.version),
		__APP_COMMIT__: JSON.stringify(commit),
		__APP_BUILD_DATE__: JSON.stringify(buildDate)
	},
	build: { target: 'es2022' },
	test: { include: ['src/**/*.test.ts'], environment: 'node' }
});
