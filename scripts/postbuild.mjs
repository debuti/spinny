// Cloudflare reads _headers and _redirects from the root of the assets directory (build/), but SvelteKit
// copies static/ into build/spinny/. Move them up and drop anything else left in build/.
import { existsSync, readdirSync, renameSync, rmSync } from 'node:fs';

const APP = (process.env.BASE_PATH ?? '/spinny').replace(/^\//, '');
if (APP) {
	const ROOT = ['_headers', '_redirects'];
	for (const name of ROOT) {
		const from = `build/${APP}/${name}`;
		if (existsSync(from)) renameSync(from, `build/${name}`);
	}
	for (const entry of readdirSync('build'))
		if (![APP, ...ROOT].includes(entry)) rmSync(`build/${entry}`, { recursive: true, force: true });
}
