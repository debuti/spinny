# Spinny — plan

The classic decision wheel, the nubuza way: quick, kawaii, private, free to run.

## Agreed decisions

| | Decision |
| --- | --- |
| ✅ | Name **Spinny**, slug `spinny`, at `apps.nubuza.com/spinny`. Mascot: the wheel's smiling hub. |
| ✅ | English at the root, Spanish at `/es/`; the old `/en/` URLs redirect. FAQ on the home page, privacy and terms pages. |
| ✅ | Options stored on the device with idb-keyval, **not encrypted**: a list of choices the user writes to share, unlike BLP/ATS data. Revisit if wheels ever hold anything personal. |
| ✅ | Sharing via URL fragment, validated with valibot (≤100 options, ≤60 chars). |
| ✅ | **Exception to the nubuza rules, agreed with the owner: no Google Drive sync or Drive icon.** A wheel has nothing worth syncing; add it if that ever changes. |
| ✅ | AdSense prepared but off until the account is approved: with no block ID in `monetization.config.json` there is no script, block or CSP opening. |
| ✅ | No Android in v0.1. |

## Costs

€0/year: static-assets Worker on the free tier, under the existing nubuza.com zone.

## What I need from you

- Approve the name, then deploy (`npm run deploy`) and add the card to nubuza.com.

## Roadmap / maybe later

- `og.jpg` 1200×630 and brand PNGs (`scripts/render-*.mjs`), then `twitter:card` large.
- Several saved wheels, weights per option, tick sound, confetti.
- Playwright e2e (mobile + desktop) and axe in CI; smoke tests on the live site.
- Entry in `nubuza/social/projects.json` for the bot.

## Risks

- Very crowded niche (wheelofnames & co): the edge is speed, privacy and the look.
