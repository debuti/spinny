# Spinny

Spin the wheel to pick between options. Type one option per line, spin, done. Lives at
**apps.nubuza.com/spinny** (Spanish at `/`, English at `/en/`).

- No server, no accounts: options stay on the device (IndexedDB, `spinny` DB).
- Winner picked with `crypto.getRandomValues` (no modulo bias); the wheel animates to it.
- Share a wheel with a link: options go in the fragment (`#w=<base64url>`), never sent.

## Stack

SvelteKit (adapter-static, every page prerendered), Svelte 5, TypeScript strict, valibot,
idb-keyval. Static-assets-only Cloudflare Worker (`wrangler.jsonc`, no `main`).

## Develop

```sh
npm install
npm run dev        # http://localhost:5173/spinny/
npm run check && npm run lint && npm test
npm run build      # build/spinny/ + build/_headers
npm run preview    # wrangler dev on :8788, with the real _headers
```

## Deploy

`npm run deploy` (build + `wrangler deploy`), with `CLOUDFLARE_API_TOKEN` and
`CLOUDFLARE_ACCOUNT_ID` (the nubuza.com token works). Route: `apps.nubuza.com/spinny*`.
To move to its own domain: `BASE_PATH= npm run build`.

Copyright (c) 2026 nubuza, all rights reserved.
