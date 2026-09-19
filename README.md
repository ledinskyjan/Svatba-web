# ledinskych.cz

Rodinná stránka Ledinských. Statický web servírovaný Cloudflare Workerem `svatba` (static assets, `wrangler.jsonc`). Push do `main` spustí Workers Build a web se nasadí do pár minut.

- `index.html`, `site.css`: úvodní stránka
- `404.html`: stránka pro neexistující adresy
- `kopi-trip/`: neveřejný staging průvodce (noindex, viz `_headers` a `robots.txt`)

Původní svatební web (20. 6. 2026) je uložený pod git tagem `svatba-2026`.