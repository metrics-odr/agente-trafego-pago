const { chromium } = require('playwright');
const path = require('path');
const OUT = process.argv[2];

const ORANGE = '#FF5A36', INK = '#0E1116', CREAM = '#F5F3EE', GREEN = '#2BD9A0';

// kind: gasto | fat | normal ; hl = card com a maior quebra
const funis = {
  clinica: {
    titulo: 'FUNIL · CLÍNICA MÉDICA',
    cards: [
      { n: 1, label: 'Gasto', value: 'R$ 6.000,00', kind: 'gasto', note: 'investimento em mídia' },
      { n: 2, label: 'Impressões', value: '120.000', cost: ['CPM', 'R$ 50,00'] },
      { n: 3, label: 'Cliques', value: '2.400', chip: ['CTR', '2,00%'], cost: ['CPC', 'R$ 2,50'] },
      { n: 4, label: 'Form', value: '1.200', chip: ['Tx. Form', '50,00%'], cost: ['CP Form', 'R$ 5,00'] },
      { n: 5, label: 'Leads', value: '480', chip: ['Tx. Lead', '40,00%'], cost: ['CPL', 'R$ 12,50'] },
      { n: 6, label: 'MQLs', value: '240', chip: ['Tx. MQL', '50,00%'], cost: ['CPMQL', 'R$ 25,00'] },
      { n: 7, label: 'Agend. pagos', value: '48', chip: ['Tx. Agd', '20,00%'], cost: ['CPAgd', 'R$ 125,00'], hl: '80%' },
      { n: 8, label: 'Consultas', value: '36', chip: ['Tx. Cons.', '75,00%'], cost: ['CP Consulta', 'R$ 166,67'] },
      { n: 9, label: 'Procedimentos', value: '12', chip: ['Venda', '33,33%'], cost: ['CAC', 'R$ 500,00'] },
      { n: 10, label: 'Faturamento', value: 'R$ 38.400,00', kind: 'fat', note: '= 48 agend. pagos × R$ 800', cost: ['ROAS', '6,4x'] },
    ],
  },
  vsl: {
    titulo: 'FUNIL · VSL',
    cards: [
      { n: 1, label: 'Gasto', value: 'R$ 10.000,00', kind: 'gasto', note: 'investimento em mídia' },
      { n: 2, label: 'Impressões', value: '500.000', cost: ['CPM', 'R$ 20,00'] },
      { n: 3, label: 'Cliques', value: '10.000', chip: ['CTR', '2,00%'], cost: ['CPC', 'R$ 1,00'] },
      { n: 4, label: 'Pageviews', value: '9.000', chip: ['CR', '90,00%'], cost: ['CPPV', 'R$ 1,11'] },
      { n: 5, label: 'Métricas da VSL', kind: 'vsl', note: '% da etapa anterior', items: [
        { l: 'Play Rate', v: '40,00%', s: '3.600 plays' },
        { l: 'Retenção 1 min', v: '50,00%', s: '1.800' },
        { l: 'Alcance do pitch', v: '25,00%', s: '450', hl: '75%' },
        { l: 'Cliques na CTA', v: '80,00%', s: '360' },
      ] },
      { n: 6, label: 'Checkouts', value: '180', chip: ['CTA→Chk', '50,00%'], cost: ['CPCHK', 'R$ 55,56'] },
      { n: 7, label: 'Compras', value: '72', chip: ['ConvChk', '40,00%'], cost: ['CAC', 'R$ 138,89'] },
      { n: 8, label: 'Faturamento', value: 'R$ 35.784,00', kind: 'fat', wide: true, kpis: [['ROAS', '3,58x'], ['Ticket médio', 'R$ 497,00']] },
    ],
  },
  ecommerce: {
    titulo: 'FUNIL · ECOMMERCE',
    cards: [
      { n: 1, label: 'Gasto', value: 'R$ 3.200,00', kind: 'gasto', note: 'investimento em mídia' },
      { n: 2, label: 'Impressões', value: '80.000', cost: ['CPM', 'R$ 40,00'] },
      { n: 3, label: 'Cliques', value: '3.200', chip: ['CTR', '4,00%'], cost: ['CPC', 'R$ 1,00'] },
      { n: 4, label: 'Pageviews', value: '2.880', chip: ['CR', '90,00%'], cost: ['CPPV', 'R$ 1,11'] },
      { n: 5, label: 'Product view', value: '1.440', chip: ['PVR', '50,00%'], cost: ['CPV', 'R$ 2,22'] },
      { n: 6, label: 'Add to cart', value: '360', chip: ['ACR', '25,00%'], cost: ['CPAC', 'R$ 8,89'], hl: '75%' },
      { n: 7, label: 'Checkouts', value: '180', chip: ['VisChk', '50,00%'], cost: ['CPCHK', 'R$ 17,78'] },
      { n: 8, label: 'Compras', value: '63', chip: ['ConvChk', '35,00%'], cost: ['CAC', 'R$ 50,79'] },
      { n: 9, label: 'Faturamento', value: 'R$ 9.450,00', kind: 'fat', wide: true, kpis: [['ROAS', '2,95x'], ['Ticket médio', 'R$ 150,00']] },
    ],
  },
};

function spark(seed, color) {
  let s = seed * 9301 + 49297, y = 0.5, pts = [];
  const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < 26; i++) { y = Math.min(0.95, Math.max(0.1, y + (rnd() - 0.5) * 0.5)); pts.push([i * 5, 30 - y * 28]); }
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  return `<svg class="spark" viewBox="0 0 125 32" preserveAspectRatio="none"><path d="${d}" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round"/></svg>`;
}

function card(c, marked) {
  const hl = marked && c.hl;
  const cls = ['card', c.kind || 'normal', c.wide ? 'wide' : '', hl ? 'hl' : ''].join(' ');
  if (c.kind === 'vsl') {
    const items = c.items.map(it => {
      const h = marked && it.hl;
      return `<div class="mini ${h ? 'hl' : ''}"><div class="ml">${it.l}</div><div class="mv">${it.v}</div><div class="ms">${it.s}</div>${h ? `<div class="tag">QUEBRA ${it.hl}</div>` : ''}</div>`;
    }).join('');
    return `<div class="${cls} full vslbox"><div class="top"><span class="badge">${c.n}</span><span class="lab">${c.label}</span><span class="note">${c.note}</span></div><div class="minis">${items}</div></div>`;
  }
  const chip = c.chip ? `<span class="chip ${hl ? 'on' : ''}"><i>${c.chip[0]}</i> ${c.chip[1]}</span>` : '';
  const sp = c.kind === 'gasto' ? '' : c.kind === 'fat' && !c.wide ? '' : c.kind === 'fat' && c.wide ? spark(c.n * 7 + 3, '#7fd9b8').replace('class="spark"','class="spark big"') : spark(c.n * 7 + 3, c.kind === 'gasto' ? '#59606d' : c.kind === 'fat' ? '#7fd9b8' : '#CFCABD');
  let bottom = '';
  if (c.kpis) bottom = `<div class="kpis">${c.kpis.map(k => `<div><i>${k[0]}</i><b>${k[1]}</b></div>`).join('')}</div>`;
  else bottom = `<div class="bot"><span class="left">${hl ? `<span class="tag">QUEBRA ${c.hl}</span>` : (c.note ? `<span class="nt">${c.note}</span>` : '')}</span>${c.cost ? `<span class="cost"><i>${c.cost[0]}</i> ${c.cost[1]}</span>` : ''}</div>`;
  return `<div class="${cls}${c.wide ? ' full' : ''}"><div class="top"><span class="badge">${c.n}</span><span class="lab">${c.label}</span>${chip}</div>${sp}<div class="val">${c.value}</div>${bottom}</div>`;
}

function html(f, marked) {
  return `<!doctype html><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0}
body{background:transparent;font-family:'Inter',sans-serif;color:${INK}}
#board{width:900px;background:#fff;border:1px solid #E4E0D6;border-radius:28px;padding:18px}
.head{display:flex;justify-content:space-between;align-items:center;padding:2px 6px 14px;font-size:19px;letter-spacing:.12em;font-weight:700;color:#5B6270}
.head span:last-child{font-size:18px;letter-spacing:0;font-weight:500;color:#8a8f99}
.grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:14px}
.card{position:relative;background:${CREAM};border:1.5px solid #E4E0D6;border-radius:18px;padding:14px 16px 12px;min-height:128px;display:flex;flex-direction:column;justify-content:space-between}
.card.full{grid-column:1 / -1}
.card.hl{border:3.5px solid ${ORANGE};padding:12.5px 14.5px 10.5px;background:#FFF3EF}
.top{display:flex;align-items:center;gap:10px}
.badge{width:28px;height:28px;border-radius:50%;background:${INK};color:#fff;font:700 15px 'JetBrains Mono',monospace;display:flex;align-items:center;justify-content:center;flex:none}
.lab{font-size:23px;font-weight:600;color:#4a505c;flex:1;white-space:nowrap}
.chip{font:700 21px 'JetBrains Mono',monospace;background:#fff;border:1.5px solid #D9D4C7;border-radius:999px;padding:3px 12px;white-space:nowrap}
.chip i{font-style:normal;font-weight:500;color:#7b8190;font-size:17px;margin-right:2px}
.chip.on{background:${ORANGE};border-color:${ORANGE};color:#fff}
.chip.on i{color:#ffe3dc}
.val{font-size:48px;font-weight:800;letter-spacing:-1.5px;line-height:1.05;margin-top:6px}
.spark{position:absolute;right:16px;top:50px;width:150px;height:40px;opacity:.9}
.bot{display:flex;justify-content:space-between;align-items:center;margin-top:6px;min-height:26px}
.cost{font:500 20px 'JetBrains Mono',monospace;color:#5B6270}
.cost i,.kpis i{font-style:normal;color:#8a8f99;margin-right:4px}
.tag{font:800 20px 'JetBrains Mono',monospace;color:${ORANGE};letter-spacing:.02em}
.nt{font:500 18px 'Inter';color:#3b6f5c}
.card.gasto .nt{color:#9aa1ad}.spark.big{width:320px;height:70px;top:60px}
.card.gasto{background:${INK};border-color:${INK};color:#fff}
.card.gasto .lab{color:#c7ccd6}.card.gasto .badge{background:#fff;color:${INK}}
.card.fat{background:#DDF7EE;border-color:${GREEN}}
.card.fat .lab{color:#1f6b52}
.card.wide .val{font-size:56px}
.kpis{display:flex;gap:36px;margin-top:6px;font:500 22px 'Inter'}
.kpis i{display:block;font:500 18px 'Inter';color:#3b6f5c;margin:0}
.kpis b{font:800 30px 'Inter'}
.card.wide{flex-direction:column}
.vslbox{padding-bottom:14px}
.vslbox .note{font:500 18px 'Inter';color:#8a8f99}
.minis{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:12px}
.mini{background:#fff;border:1.5px solid #E4E0D6;border-radius:14px;padding:10px 12px;position:relative;min-height:128px}
.mini .ml{font:600 19px 'Inter';color:#4a505c}
.mini .mv{font:800 34px 'Inter';letter-spacing:-1px;margin-top:6px}
.mini .ms{font:500 18px 'JetBrains Mono',monospace;color:#7b8190;margin-top:2px}
.mini.hl{border:3.5px solid ${ORANGE};padding:8.5px 10.5px;background:#FFF3EF}
.mini .tag{font-size:17px;margin-top:6px}
.foot{display:flex;gap:22px;justify-content:center;padding:14px 6px 2px;font:500 17px 'Inter';color:#7b8190}
</style>
<div id="board"><div class="head"><span>${f.titulo}</span><span>exemplo ilustrativo · dados fictícios</span></div>
<div class="grid">${f.cards.map(c => card(c, marked)).join('')}</div>
<div class="foot"><span>Taxa = % da etapa anterior</span><span>Quebra = 100% − taxa</span>${marked ? `<span style="color:${ORANGE};font-weight:700">Laranja = maior quebra depois do clique</span>` : ''}</div></div>`;
}

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ deviceScaleFactor: 2, viewport: { width: 940, height: 900 } });
  const p = await ctx.newPage();
  for (const [k, f] of Object.entries(funis)) {
    for (const marked of [false, true]) {
      await p.setContent(html(f, marked));
      await p.waitForTimeout(150);
      const file = path.join(OUT, `mockup-${k}-${marked ? 'marcado' : 'limpo'}.png`);
      await p.locator('#board').screenshot({ path: file, omitBackground: true });
      console.log(file);
    }
  }
  await b.close();
})();
