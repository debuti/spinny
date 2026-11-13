# Spinny

Decision wheel: type one option per line, spin, get a winner. Web app at apps.nubuza.com/spinny (English at the root, Spanish at /es/).

- Wheel: fair random pick (crypto, no bias), animated to the winner.
- Storage: options stay on the device (IndexedDB); no server, no accounts.
- Sharing: a link carries the options in the URL fragment, never sent anywhere.
- First-run wizard, settings (version, commit, build date), privacy and terms pages.
- Ads: one AdSense block (spinny-app) on the wheel page, below the lists.
- Hosting: static files on a Cloudflare Worker.
