# Spinny — plan

The classic decision wheel, the nubuza way: quick, kawaii, private, free to run.

## Agreed decisions

| | Decision |
| --- | --- |
| ✅ | Name **Spinny**, slug `spinny`, at `apps.nubuza.com/spinny`. Mascot: the wheel's smiling hub. |
| ✅ | Spanish at the root, English at `/en/`; FAQ on the home page, privacy and terms pages. |
| ✅ | Options stored on the device with idb-keyval, **not encrypted**: a list of choices the user writes to share, unlike BLP/ATS data. Revisit if wheels ever hold anything personal. |
| ✅ | Sharing via URL fragment, validated with valibot (≤100 options, ≤60 chars). |
| ✅ | No Google Drive sync, no Android, no ads in v0.1. |

## Costs

€0/year: static-assets Worker on the free tier, under the existing nubuza.com zone.

## What I need from you

- Approve the name, then deploy (`npm run deploy`) and add the card to nubuza.com.

## Roadmap / maybe later

- `og.jpg` 1200×630 and brand PNGs (`scripts/render-*.mjs`), then `twitter:card` large.
- AdSense: one fixed block under the FAQ once there's content (`monetization.config.json`).
- Several saved wheels, weights per option, tick sound, confetti.
- Playwright e2e (mobile + desktop) and axe in CI; smoke tests on the live site.
- Entry in `nubuza/social/projects.json` for the bot.

## Risks

- Very crowded niche (wheelofnames & co): the edge is speed, privacy and the look.
