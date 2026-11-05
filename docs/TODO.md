# TODO

## Pendiente (dueño)

Decide whether Spinny is an exception to these `nubuza-app` requirements or they get built:

- First-run wizard with mascot (requirement 6).
- AdSense with ad blocks (requirement 5). `PLAN.md` agreed "no ads in v0.1".
- Google Drive sync and its icon (requirements 2 and 3). `PLAN.md` agreed "no Google Drive sync
  in v0.1".
- English as the main language at `<base>/` and Spanish at `<base>/es/` (requirement 13). Today
  it is the other way round (`src/lib/paths.ts`). Fixing it changes public URLs, so it needs
  redirects.

## Pendiente (Claude)

- Nothing until the owner decides the above.

## Hecho

- 2026-11-05: Settings (⚙️ in the header) shows version, commit and build date, injected at
  build time (requirement 11).
- 2026-11-05: `docs/TODO.md` created (requirement 7).
