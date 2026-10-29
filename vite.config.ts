import { sveltekit } from '@sveltejs/kit/vite';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'vitest/config';

const pkg = JSON.parse(readFileSync('package.json', 'utf8')) as { version: string };

export default defineConfig({
	plugins: [sveltekit()],
	define: { __APP_VERSION__: JSON.stringify(pkg.version) },
	build: { target: 'es2022' },
	test: { include: ['src/**/*.test.ts'], environment: 'node' }
});
