# OFK Tovarníky – návrh webu

Návrh nového webu futbalového klubu OFK Tovarníky (Obecný futbalový klub Tovarníky, okres Topoľčany). **Nie je to oficiálna stránka klubu.** Ukážka má v hlavičke pás s týmto upozornením a vyhľadávače ju neindexujú (`noindex`).

Ukážka: https://matuslenicky.github.io/ofk-tovarniky/ · administrácia (ukážka bez ukladania): https://matuslenicky.github.io/ofk-tovarniky/admin/

## Vzhľad

**„Klasy“** podľa erbu: modrý štít, v červenom poli tri zlaté klasy.

- poradie áčka v **dožinkovom venci** z klasov na úvode (po jeseni 2026 prvé miesto v V. lige Severozápad),
- **pás zlatého poľa s klasmi** pod hlavičkou podstránok a nad pätou, história klubu ako **steblo so zrnami**,
- **mladé klasy**: mládežnícke tímy, prvé miesta zvýraznené,
- **derby so susednými Topoľčanmi** na červenom poli (Tovarníky boli v rokoch 1976 – 1992 súčasťou mesta), **pohárová kronika** po sezónach,
- citát z obecného občasníka **„Ihrisko je naše!“** pri ihrisku,
- hlavička v dvoch riadkoch: modrá s erbom a telefónom, pod ňou červený pás s menu; na telefóne menu ako dlaždice, ktoré sa vysunú zhora,
- písmo **Zilla Slab** (pätkové, ako tlač starých plagátov) a **Karla**.

Klub nemá vlastné fotky na webe ani sociálne siete, preto je vzhľad postavený na grafike z erbu. Fotky od klubu sa dajú doplniť neskôr.

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
