# Návod — od souborů k živému webu na ledinskych.cz

Tenhle dokument tě provede kompletní cestou: od úprav textů, přes upload fotek přes Cloudinary, RSVP přes Formspree, až po nasazení na Cloudflare Pages a nastavení DNS u Wedos.

Cíl: web pojede na `https://ledinskych.cz`, hosting bude **zdarma**, fotky od hostů poletí do Cloudinary, RSVP odpovědi ti přijdou e-mailem.

---

## Co máš v balíku

Ve složce `Webové stránky` jsou tyto soubory:

- **`index.html`** — hlavní stránka webu (všechny sekce: hero, program, místo, ubytování, dress code, dary, RSVP, fotky, kontakt).
- **`styles.css`** — vzhled webu (minimalistický, sage zelený akcent).
- **`script.js`** — JavaScript (navigace, animace, Cloudinary upload widget). **Tady budeš dosazovat svoje Cloudinary údaje.**
- **`tisk-qr.html`** — samostatná A5 stránka s QR kódem pro hosty. Otevřeš v prohlížeči a vytiskneš.
- **`NAVOD.md`** — tento návod.

---

## Krok 1 — Doplň si vlastní obsah

Otevři `index.html` v libovolném textovém editoru (Poznámkový blok, VS Code, Notepad++…) a uprav podle sebe:

- **Telefony v sekci „Kontakt"** — řádky `+420 …` nahraď skutečnými čísly.
- **Jména svědků** — nahraď „Jméno" jmény tvých svědků.
- **Program dne** — časy a popisy si přizpůsob.
- **Adresa** v sekci „Místo" — můžeš doplnit konkrétnější adresu apartmánů.
- **Cokoliv dalšího**, co jsi říkal, že doplníš průběžně — kdykoliv otevřeš `index.html`, najdi text a přepiš.

Změny si vždy můžeš zkontrolovat tak, že na soubor `index.html` poklikáš → otevře se v prohlížeči lokálně.

---

## Krok 2 — Cloudinary (úložiště fotek od hostů)

Cloudinary je služba, kam se budou ukládat fotky od hostů. **Free tier 25 GB**, na svatbu víc než dost.

1. Jdi na **https://cloudinary.com/users/register_free** a založ si účet (zdarma, stačí e-mail).
2. Po registraci se ocitneš na **Dashboard**. Vlevo nahoře vidíš **Cloud name** — krátký řetězec, něco jako `dxy1abcd2`. **Tohle si zkopíruj.**
3. V levém menu otevři **Settings** (ikona ozubeného kola) → karta **Upload**.
4. Roluj dolů na sekci **Upload presets** → klikni **Add upload preset**.
5. Nastav:
   - **Preset name**: nech jak je (vygeneruje se něco jako `abcd1234`), nebo si dej třeba `svatba`.
   - **Signing Mode**: přepni na **Unsigned**. ⚠️ Důležité — bez tohoto nebude upload z webu fungovat.
   - **Folder**: napiš `svatba-martina-honza` (sem se budou všechny fotky řadit).
   - Ostatní můžeš nechat defaultně.
6. Klikni **Save**. Zkopíruj si **název presetu**.

Teď otevři soubor `script.js` v editoru a nahoře najdi tyto řádky:

```js
const CLOUDINARY_CLOUD_NAME = 'TVUJ_CLOUD_NAME';
const CLOUDINARY_UPLOAD_PRESET = 'TVUJ_UPLOAD_PRESET';
```

Nahraď `TVUJ_CLOUD_NAME` skutečným cloud name z kroku 2, a `TVUJ_UPLOAD_PRESET` skutečným názvem presetu z kroku 5. Ulož.

**Pozn.:** Pokud chceš, později můžeš v Cloudinary nastavit i omezení (max velikost, povolené formáty) — už to máme ošetřené i v `script.js`.

---

## Krok 3 — Formspree (RSVP formulář)

Aby ti odpovědi z RSVP formuláře chodily na e-mail bez vlastního serveru, použijeme Formspree.

1. Jdi na **https://formspree.io** → **Get started free**.
2. Zaregistruj se (free tier = 50 odpovědí měsíčně).
3. Po přihlášení klikni **+ New form**, pojmenuj ho např. „Svatba RSVP", nastav e-mail kam to má chodit.
4. Po vytvoření uvidíš **endpoint URL** — vypadá takhle: `https://formspree.io/f/abcd1234`.
5. Zkopíruj ten kód za posledním lomítkem (např. `abcd1234`).
6. Otevři `index.html`, najdi řádek:

   ```html
   <form class="rsvp-form" action="https://formspree.io/f/TVUJ_KOD" method="POST">
   ```

   Nahraď `TVUJ_KOD` skutečným kódem. Ulož.

**První testovací odeslání** musíš potvrdit kliknutím v e-mailu, který ti Formspree pošle — pak už se to chová automaticky.

---

## Krok 4 — Nahrání na GitHub

GitHub bude hosting tvých zdrojových souborů. Z něj pak Cloudflare Pages bere kód a publikuje ho na internetu.

1. Jdi na **https://github.com** a založ si účet (pokud nemáš).
2. Vpravo nahoře **+** → **New repository**.
3. **Repository name**: třeba `svatba-web`. **Public**. Nech ostatní defaultně. Klikni **Create repository**.
4. Na další obrazovce uvidíš návod „uploading an existing file" — klikni na odkaz **uploading an existing file**.
5. Přetáhni do okna **všechny** soubory ze složky `Webové stránky` (`index.html`, `styles.css`, `script.js`, `tisk-qr.html`, `NAVOD.md`).
6. Dole napiš commit message (např. „První verze") → **Commit changes**.

Hotovo. Soubory máš na GitHubu.

**Pokud později uděláš změnu v souboru:** klikni na soubor v GitHubu → tužka „Edit" → uprav → **Commit changes**. Cloudflare to automaticky znovu nasadí.

---

## Krok 5 — Cloudflare Pages (samotný hosting)

Cloudflare Pages je úplně zdarma a má neomezený provoz — perfektní pro tohle.

1. Jdi na **https://dash.cloudflare.com/sign-up** a založ si účet zdarma.
2. V levém menu **Workers & Pages** → záložka **Pages** → **Create application** → **Connect to Git**.
3. Propoj svůj GitHub účet (klik **Connect GitHub**, povol přístup k repozitáři `svatba-web`).
4. Vyber repo `svatba-web` → **Begin setup**.
5. Nech defaultní nastavení:
   - **Project name**: `svatba-web` (nebo cokoliv).
   - **Production branch**: `main`.
   - **Build command**: prázdné.
   - **Build output directory**: `/` (lomítko).
6. Klik **Save and Deploy**.

Za chvíli ti Cloudflare zobrazí URL typu `https://svatba-web.pages.dev` — to je tvůj web. **Otestuj, že funguje.**

---

## Krok 6 — Propojení s doménou ledinskych.cz (DNS u Wedos)

Teď web nasměrujeme na tvou doménu.

### 6a) V Cloudflare Pages přidej custom doménu

1. V Cloudflare Pages otevři svůj projekt → záložka **Custom domains** → **Set up a custom domain**.
2. Napiš `ledinskych.cz` → **Continue**.
3. Cloudflare ti ukáže DNS záznam, který máš nastavit u Wedos. Bude to typicky **CNAME** záznam ukazující na `svatba-web.pages.dev`.
4. Stejně přidej i `www.ledinskych.cz`.

> **Alternativa (čistší):** Cloudflare ti nabídne přesunout celou DNS doménu pod Cloudflare. To je doporučované — pak nemusíš nastavovat nic u Wedos a získáš zdarma rychlejší DNS, SSL, ochranu, atd. Pokud chceš, řeknu ti přesný postup; jinak se dá nastavit jen CNAME níž.

### 6b) Nastavení u Wedos (varianta bez přesunu DNS)

1. Přihlas se na **https://client.wedos.com**.
2. **Domény** → klik na `ledinskych.cz` → **DNS záznamy**.
3. Smaž stávající `A` záznam pro `@` (kořen domény) — pokud nějaký existuje s odkazem na parking page.
4. Přidej tyto záznamy (přesné hodnoty ti dá Cloudflare po kliknutí na **Set up a custom domain**, tady je obecný formát):

   | Typ   | Název | Hodnota                              | TTL   |
   |-------|-------|--------------------------------------|-------|
   | CNAME | `@`   | `svatba-web.pages.dev`               | 1800  |
   | CNAME | `www` | `svatba-web.pages.dev`               | 1800  |

   ⚠️ Některé registrátory neumožňují CNAME na kořeni (`@`). Pokud Wedos protestuje, musíš místo CNAME zadat **A záznamy** s IP adresami, které ti dá Cloudflare (typicky `192.0.2.x` nebo podobné — Cloudflare ti je ukáže). Stačí to doslova opsat z Cloudflare.

5. Ulož.
6. Vrať se do Cloudflare Pages → tam vidíš stav. Propsání DNS trvá řádově **minuty až 24 hodin**, většinou je to do hodiny.
7. Cloudflare ti automaticky vygeneruje **HTTPS certifikát** — po pár minutách bude `https://ledinskych.cz` fungovat.

---

## Krok 7 — QR kód pro hosty na svatbě

1. Otevři `tisk-qr.html` v prohlížeči (poklikej, nebo přetáhni do Chromu).
2. QR kód se vygeneruje automaticky a vede na `https://ledinskych.cz/#fotky` (přímo na sekci s uploadem).
3. **Tisk**: Ctrl+P (Windows) nebo Cmd+P (Mac) → vyber **A5** formát papíru → **Tisk**.
4. Vytiskni si tolik kopií, kolik chceš (na stoly, k Instax tiskárně, k baru…).

**Tip:** QR kód můžeš testovat i bez svatby — naskenuj svým telefonem, ověř že se otevře web, vyzkoušej nahrát fotku.

---

## Krok 8 — Jak to celé funguje na svatbě

1. **Host** naskenuje QR kód u stolu.
2. Otevře se mu `ledinskych.cz/#fotky` na telefonu.
3. Klikne na **Nahrát fotku**, vybere foto ze své galerie, počká pár vteřin.
4. Fotka se uloží do tvého Cloudinary účtu, do složky `svatba-martina-honza`.
5. **Ty (nebo někdo pověřený obsluhou tiskárny)** máš v Cloudinary otevřenou složku v prohlížeči nebo v mobilu — nové fotky se objevují průběžně. Vybereš tu hezkou, stáhneš na telefon (palec → stáhnout).
6. Z mobilní galerie pošleš do **Fujifilm Instax app** (Sdílet → Instax) a vytiskneš.

> **Praktické tipy:**
> - Mít u tiskárny 1 člověka stačí. Ideálně někdo, kdo si v klidu sedne a má v mobilu otevřený Cloudinary + Instax app.
> - Tiskárny Instax tisknou poměrně pomalu (1 fotka ~15 s) a baterie i kazety dojdou — počítej s rezervou.
> - Filtrace v Cloudinary: v Media Library můžeš řadit podle data nahrání (nejnovější nahoře), takže obsluha hned vidí čerstvé fotky.

---

## Update obsahu po nasazení

Kdykoliv budeš chtít cokoliv změnit (přidat sekci, opravit datum, doplnit kontakt):

1. V GitHubu otevři příslušný soubor (`index.html`).
2. Tužka **Edit** → uprav → **Commit changes**.
3. Cloudflare Pages během cca 1 minuty znovu nasadí změny na `ledinskych.cz`.

Pokud chceš místo GitHub web editoru používat něco komfortnějšího, můžeš si nainstalovat **GitHub Desktop** (zdarma) — ten ti synchronizuje složku z počítače.

---

## Checklist před spuštěním

- [ ] Dosazený `CLOUDINARY_CLOUD_NAME` a `CLOUDINARY_UPLOAD_PRESET` v `script.js`
- [ ] Dosazený Formspree kód v `index.html` (atribut `action`)
- [ ] Doplněné telefony a jména v sekci „Kontakt"
- [ ] Otestováno nahrání fotky z mobilu (skrz QR i přímo na webu)
- [ ] Otestováno odeslání RSVP formuláře (přišlo na e-mail)
- [ ] `https://ledinskych.cz` funguje a má HTTPS visačku zámku
- [ ] Vytištěné A5 QR kódy do stolů

---

## Když něco nefunguje

**Cloudinary upload říká „Upload zatím není nastaven"** → nemáš dosazené proměnné v `script.js` (krok 2). Po úpravě commitni změnu do GitHubu, Cloudflare ji znovu nasadí.

**RSVP formulář nic nedělá nebo končí chybou** → zkontroluj endpoint v `index.html` (krok 3). První odeslání musíš ručně potvrdit v e-mailu od Formspree.

**Doména ukazuje na něco jiného než web** → DNS změny trvají někdy hodiny. Otestuj `nslookup ledinskych.cz` v terminálu (Windows: cmd → `nslookup ledinskych.cz`). Pokud výsledek ukazuje jinou IP než Cloudflare, čekej.

**Web nemá HTTPS** → po prvním napojení trvá pár minut, než Cloudflare vystaví certifikát. Pokud po hodině ne, restartuj custom domain v Cloudflare Pages (Remove → Add znova).

---

Hodně štěstí! Když na něco narazíš, ozvi se. ✿
