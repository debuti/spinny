# TODO

## Pendiente (dueño)

Turn on AdSense once the account is approved (the app is ready and off until then):

1. Request approval in AdSense for `apps.nubuza.com/spinny`. The pages already carry the
   `google-adsense-account` meta tag.
2. Once approved, go to AdSense → Ads → By ad unit, create a responsive display block and send
   Claude its ID.

## Pendiente (Claude)

- When the owner sends the block ID: put it in `slots.home` of `monetization.config.json` and check
  in a browser that the ad, Google's consent message and the "Privacy and cookies" footer link
  work with the CSP. The AdSense CSP origins in `svelte.config.js` have never run live.

## Excepciones acordadas

- No Google Drive sync or Drive icon (requirements 2 and 3): a wheel has nothing worth syncing. The
  owner agreed on 2026-11-05 to add it only if it ever makes sense.

## Hecho

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
