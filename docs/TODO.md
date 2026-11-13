# TODO

## Pendiente (dueño)

- Nothing right now.

## Pendiente (Claude)

- Click through saved lists and the example spin in a real browser: this container has no Chromium,
  so v0.3.0 was checked only with unit tests, svelte-check and the build. Add Playwright e2e.
- Once AdSense starts serving on apps.nubuza.com/spinny, check in a real browser that the ad, Google's
  consent message and the "Privacy and cookies" footer link work with the CSP.

## Excepciones acordadas

- No Google Drive sync or Drive icon (requirements 2 and 3): a wheel has nothing worth syncing. The
  owner agreed on 2026-11-05 to add it only if it ever makes sense, and confirmed it on 2026-11-13
  after saved lists were added.

## Hecho

- 2026-11-13: Privacy and terms link to nubuza's umbrella pages (nubuza.com/privacy/, /terms/,
  /es/ in Spanish); ads paragraph adds adssettings.google.com. v0.3.1.
- 2026-11-13: Saved lists (save, load, overwrite, delete; up to 50, on the device) and the example
  options now spin on a first visit. Privacy updated. Released as v0.3.0.
- 2026-11-13: AdSense on: block `spinny-app` (3283003295) in `slots.app` (renamed from `home`); TLDR.md
  added. Released as v0.2.1.
- 2026-11-05: First-run wizard with the mascot, repeatable from Settings (requirement 6).
- 2026-11-05: AdSense prepared and off: `monetization.config.json`, `AdSlot`, conditional CSP,
  privacy paragraph and consent link (requirement 5).
- 2026-11-05: English at `<base>/`, Spanish at `<base>/es/`, and `/en/*` redirects to the root
  (requirement 13).
- 2026-11-05: Privacy and terms completed: date, contact, minors, GDPR rights, user content and
  intellectual property; linked from Settings too (requirement 10).
- 2026-11-05: Settings (⚙️ in the header) shows version, commit and build date, injected at
  build time (requirement 11).
- 2026-11-05: `docs/TODO.md` created (requirement 7).
