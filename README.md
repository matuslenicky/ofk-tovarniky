# OFK Tovarníky – návrh webu

Návrh nového webu futbalového klubu OFK Tovarníky (Obecný futbalový klub Tovarníky, okres Topoľčany). **Nie je to oficiálna stránka klubu.** Ukážka má v hlavičke pás s týmto upozornením a vyhľadávače ju neindexujú (`noindex`).

Ukážka: https://matuslenicky.github.io/ofk-tovarniky/ · administrácia (ukážka bez ukladania): https://matuslenicky.github.io/ofk-tovarniky/admin/

## Vzhľad

**„Rozdelená obrazovka“ (dizajn v2, 17. 11. 2026).** Svetlý podklad, tmavomodrá z erbu, zlatá a červená len v detailoch. Písmo Sora (nadpisy) a Spectral (text).

- na úvode vľavo pevný panel s erbom, menom klubu, miestom v tabuľke a najbližším zápasom, vpravo sa posúvajú výsledky, program, tabuľka a derby s Topoľčanmi,
- na stránke Klub rovnaké rozdelenie: vľavo erb a citát „Ihrisko je naše!“, vpravo história, Slovenský pohár, ihrisko a obec,
- menu na telefóne je tmavomodrá plocha cez celú obrazovku.

Web sa skladá zo spoločného jadra v2 (`kluby-siet/engine`: `python assemble.py <web>`), vlastný je `src/site.js` (úvod, Klub, nastavenia) a `src/css/skin.css`.

## Obsah a zdroje

- Zápasy, výsledky, strelci, karty, počty divákov, zostavy dospelých, tabuľky a súpisky 6 tímov zo Sportnetu (Futbalnet), verejné API súťaží (`scripts/sportnet.mjs` → `data/sportnet.json`). Vek hráčov sa neukladá, zostavy len pri dospelých.
- Údaje o klube v `data/klub.json`, každá časť s uvedeným zdrojom: adresa, IČO, kontaktná osoba a telefóny z webu obce (Šport), e-mail zo Sportnetu, rok 1924 z erbu, vedenie a ciele v roku 2008 z archívu doterajšieho webu ofktovarniky.tym.sk, tribúna, rekonštrukcie a vlastníctvo areálu z Tovarníckeho občasníka 2013 a 2014, príslušenstvo ihriska zo zmluvy v Centrálnom registri zmlúv, pohárové zápasy 2020/21 – 2024/25 z Wikipédie, história obce z Wikipédie a webu obce.
- Erb OFK a erby súperov zo Sportnetu (`scripts/logos.py`; erb FC Topoľčany pre derby je stiahnutý jednorazovo). Patria príslušným klubom.
- Písmo Zilla Slab a Karla, licencia SIL Open Font License 1.1 (`scripts/fonts.py`).

## Zostavenie

Statický generátor bez závislostí (Node 20+, Python 3 s Pillow na erby):

```
node scripts/sportnet.mjs        # zápasy, tabuľky a súpisky (FULL=1 stiahne znova aj detaily zápasov)
python -I scripts/logos.py       # erby súperov a náš erb do src/img (FORCE=1 stiahne znova)
node build.js                    # data/ + src/ -> dist/ (TODAY=2026-11-17 prepíše dnešný dátum)
node scripts/serve.mjs dist 5340 # náhľad na http://127.0.0.1:5340/
node scripts/deploy.mjs          # nasadenie dist/ na vetvu gh-pages (GitHub Pages)
```

Výsledky sa po zápasoch aktualizujú samé cez GitHub Actions (`.github/workflows/sportnet.yml`).
