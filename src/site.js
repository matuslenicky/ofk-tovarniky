// Statický generátor webu OFK Tovarníky: data/ + src/ -> dist/   (node build.js; TODAY=2026-11-17 prepíše dnešný dátum)
// Zostavuje ho kluby-siet/engine/assemble.py zo spoločného jadra v2 a tohto súboru (vzhľad, úvod, stránka Klub).
// Kostra „Rozdelená obrazovka“: na úvode vľavo pevný panel s erbom, menom klubu, najbližším zápasom a miestom
// v tabuľke, vpravo sa posúvajú výsledky, program, tabuľka a derby s Topoľčanmi. Tmavomodrá z erbu, zlatá a červená
// len v detailoch, svetlý podklad. Písmo Sora (nadpisy) a Spectral (text).
const SKIN = {
  nav: 'bar', theme: '#1d3360', brand: 'OFK Tovarníky', brandSub: 'od roku 1924',
  fonts: ['sora-700.woff', 'spectral-400.woff', 'spectral-600.woff'],
  sources: 'História podľa Tovarníckeho občasníka, Wikipédie a archívu bývalého webu klubu.',
  adminHero: 'Futbal v Tovarníkoch od roku 1924',
  adminFacts: club.historia.map((h) => ({ k: h.rok, t: h.text })),
  links: [[club.obecUrl, 'Šport na webe obce'], [club.staryWeb, 'Archív bývalého webu klubu']],
};
const NAV = [['zapasy/', 'Zápasy'], ['tabulky/', 'Tabuľky'], ['timy/', 'Tímy'], ['klub/', 'Klub'], ['kontakt/', 'Kontakt']];
const DESC = `${club.nazov} – futbal v Tovarníkoch od roku ${club.zalozenie}. Zápasy, výsledky, tabuľky a súpisky áčka (${A.leagueName}) a mládeže, pohárové derby s Topoľčanmi.`;

add('', {
  title: `futbal od roku ${club.zalozenie}`, active: '', bodyClass: 'home',
  body: (R) => {
    const m = nextA || lastA;
    const row = A.table?.rows.find((r) => r.our);
    const wl = winterLine();
    return `<div class="wrap split">
  <aside class="split-l" aria-labelledby="hero-h">
    <img class="split-crest" src="${R}img/erb-240.webp" alt="${esc(club.erbAlt)}" width="${Math.round(132 * CREST_R)}" height="132">
    <h1 class="split-h" id="hero-h">OFK Tovarníky</h1>
    <p class="split-sub">Futbal od roku ${club.zalozenie} · ${esc(A.leagueName)}${A.pos ? ` · ${A.pos}. miesto` : ''}</p>
    ${m ? `<div class="next">
      <p class="next-k">${m.past ? 'Posledný zápas' : 'Najbližší zápas'}</p>
      <p class="next-o">${m.home ? 'doma proti' : 'vonku,'} <b>${esc(m.opponent)}</b></p>
      <p class="next-d"><time datetime="${m.date}">${dLong(m.date)}</time>${m.past ? (m.score ? ` · <b>${m.gf}:${m.ga}</b> ${RES[m.res].toLowerCase()}` : '') : ` · ${esc(m.time || '')}`}</p>
      ${m.past ? '' : `<p class="next-cd"><span class="cd" data-kickoff="${isoLocal(m.date, m.time)}" hidden></span></p>`}
      <p class="btns">${m.past ? '' : `<a class="btn" href="${R}kalendar/zapas-${m.id}.ics" download>${I.cal}Do kalendára</a>`}<a class="btn btn--line" href="${R}${m.url}">Detail zápasu</a></p>
    </div>` : ''}
    ${wl ? `<p class="split-pause">${wl}</p>` : ''}
  </aside>
  <div class="split-r">
    <section class="block" aria-labelledby="res-h">${secHead('Posledné výsledky', 'res-h', more(`${R}zapasy/#z-vys`, 'Všetky'))}${fxList(results.filter((x) => x.score).slice(0, 6), R)}</section>
    <section class="block" aria-labelledby="prog-h">${secHead('Program', 'prog-h', more(`${R}zapasy/`, 'Celý program'))}${upcoming.length ? fxList(upcoming.slice(0, 5), R) : '<p>Ďalšie zápasy zatiaľ nie sú vyžrebované.</p>'}</section>
    ${A.table ? `<section class="block" aria-labelledby="tab-h">${secHead(esc(A.leagueName), 'tab-h', more(`${R}tabulky/`, 'Tabuľky'), row ? `Áčko · ${row.pts} ${pw(row.pts, 'bod', 'body', 'bodov')}` : 'Áčko')}${tableHtml(A.table, R)}</section>` : ''}
    <section class="block block--derby" aria-labelledby="der-h">
      ${secHead('Derby s Topoľčanmi', 'der-h', more(`${R}klub/`, 'Klub'))}
      <p>${esc(club.derby.text)}</p>
      <ul class="derby">${club.derby.zapasy.map((z) => `<li><b>${esc(z.rok)}</b><span>${esc(z.kolo)}, v Topoľčanoch</span><span class="derby-s">${esc(z.skore).replace(/ /g, '')}</span><small>${esc(z.text)}</small></li>`).join('')}</ul>
    </section>
  </div>
</div>`;
  },
});

add('klub/', {
  title: 'Klub', active: 'klub/', desc: `${club.nazov}: futbal od roku ${club.zalozenie}, história, Slovenský pohár a derby s Topoľčanmi, ihrisko a obec Tovarníky.`,
  body: (R) => `${pageHead({ title: 'Klub', sub: `${esc(club.pravnyNazov)}, futbal od roku ${club.zalozenie}. Farby ${esc(club.farby)}.`, R, crumbs: [[null, 'Klub']] })}
<section class="sec sec--first"><div class="wrap split split--page">
  <aside class="split-l split-l--page">
    <img class="split-crest" src="${R}img/erb-240.webp" alt="${esc(club.erbAlt)}" width="${Math.round(132 * CREST_R)}" height="132" loading="lazy">
    <blockquote class="quote"><p>„${esc(club.ihrisko.citat)}“</p><footer>${esc(club.ihrisko.citatZdroj)}</footer></blockquote>
  </aside>
  <div class="split-r">
    <section class="block" aria-labelledby="his-h">
      ${secHead('História', 'his-h')}
      <ol class="hist">${club.historia.map((h) => `<li><b>${esc(h.rok)}</b><p>${esc(h.text)}</p></li>`).join('')}</ol>
    </section>
    <section class="block" aria-labelledby="cup-h">
      ${secHead('Slovenský pohár', 'cup-h', '', 'Skóre v poradí domáci : hostia')}
      <div class="tbl-wrap"><table class="tbl tbl--cup"><caption class="sr">Pohárové zápasy OFK Tovarníky</caption>
        <thead><tr><th scope="col" class="tl">Ročník</th><th scope="col" class="tl">Zápas</th><th scope="col">Skóre</th></tr></thead>
        <tbody>${club.pohar.sezony.flatMap((s) => s.zapasy.map(([h, a, sk, note]) => `<tr><td class="tl nw">${esc(s.sezona)}</td><th scope="row" class="tl">${esc(h)} – ${esc(a)}${note ? `<small>${esc(note)}</small>` : ''}</th><td class="nw">${esc(sk).replace(/ /g, '')}</td></tr>`)).join('')}</tbody>
      </table></div>
    </section>
    <section class="block" aria-labelledby="ih-h">
      ${secHead(esc(club.ihrisko.nazov), 'ih-h', '', 'Ihrisko')}
      <p>${esc(club.ihrisko.pribeh)}</p>
      <p>${esc(club.ihrisko.tribuna)}</p>
    </section>
    <section class="block" aria-labelledby="ob-h">
      ${secHead('Tovarníky', 'ob-h', '', 'Obec')}
      <p>${esc(club.obec.text)}</p>
      <p>${esc(club.obec.topolcany)}</p>
      <p class="note">Zdroje: Tovarnícky občasník 2013 a 2014, Wikipédia, web obce, archív bývalého webu klubu, Sportnet.</p>
    </section>
  </div>
</div></section>`,
});
