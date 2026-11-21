// Gera os mockups de funil (dados fictícios) para o carrossel.
// Uso: node gerar-mockups.js <pasta-de-saida>
const { chromium } = require('playwright');
const path = require('path');
const OUT = process.argv[2];
const O = '#FF5A36', INK = '#0E1116', GREEN = '#2BD9A0';

const funis = {
  clinica: {
    titulo: 'FUNIL · CLÍNICA MÉDICA',
    gasto: 'R$ 27.000,00',
    rows: [
      { label: 'Impressões', value: '1.500.000', cost: ['CPM', 'R$ 18,00'] },
      { label: 'Cliques', value: '15.625', conv: ['CTR', '1,04%'], cost: ['CPC', 'R$ 1,73'] },
      { label: 'Form view', value: '12.500', conv: ['CR', '80,00%'], cost: ['CP Form view', 'R$ 2,16'] },
      { label: 'Leads', value: '250', conv: ['ConvForm', '2,00%'], cost: ['CPL', 'R$ 108,00'], hl: '98%' },
      { label: 'MQLs', value: '200', conv: ['Tx MQL', '80,00%'], cost: ['CPMQL', 'R$ 135,00'] },
      { label: 'Agend. pagos', value: '100', conv: ['Tx Agd', '50,00%'], cost: ['CPAgd', 'R$ 270,00'] },
      { label: 'Consultas', value: '99', conv: ['Tx Cons.', '99,00%'], cost: ['CP Consulta', 'R$ 272,73'] },
      { label: 'Procedimentos', value: '12', conv: ['Conv. Proc.', '12,12%'], cost: ['CAC', 'R$ 2.250,00'] },
    ],
    fat: { value: 'R$ 80.000,00', fl: 'agend. × valor', f: '100 × R$ 800', roas: '2,96x' },
    notas: [],
  },
  vsl: {
    titulo: 'FUNIL · VSL',
    gasto: 'R$ 18.000,00',
    rows: [
      { label: 'Impressões', value: '625.000', cost: ['CPM', 'R$ 28,80'] },
      { label: 'Cliques', value: '12.500', conv: ['CTR', '2,00%'], cost: ['CPC', 'R$ 1,44'] },
      { label: 'Pageviews', value: '10.000', conv: ['CR', '80,00%'], cost: ['CPPV', 'R$ 1,80'] },
      { grp: 'DENTRO DA VSL · +15 min', rows: [
        { label: 'Plays', value: '4.000', conv: ['Play Rate', '40,00%'], cost: ['CP Play', 'R$ 4,50'] },
        { label: '1 min assistido', value: '2.000', conv: ['Ret. 1 min', '50,00%'], cost: ['CP 1 min', 'R$ 9,00'] },
        { label: 'Chegaram ao pitch', value: '500', conv: ['Alcance pitch', '25,00%'], cost: ['CP Pitch', 'R$ 36,00'], hl: '75%' },
        { label: 'Cliques na CTA', value: '300', conv: ['Cliques CTA', '60,00%'], cost: ['CP CTA', 'R$ 60,00'] },
      ] },
      { label: 'Checkouts', value: '210', conv: ['CTA→Chk', '70,00%'], cost: ['CPCHK', 'R$ 85,71'] },
      { label: 'Compras', value: '105', conv: ['ConvChk', '50,00%'], cost: ['CAC', 'R$ 171,43'] },
    ],
    fat: { value: 'R$ 52.185,00', fl: 'compras × ticket', f: '105 × R$ 497', roas: '2,90x' },
    notas: ['VisChk (pageview → checkout): 2,10%'],
  },
  ecommerce: {
    titulo: 'FUNIL · ECOMMERCE',
    gasto: 'R$ 3.200,00',
    rows: [
      { label: 'Impressões', value: '80.000', cost: ['CPM', 'R$ 40,00'] },
      { label: 'Cliques', value: '3.200', conv: ['CTR', '4,00%'], cost: ['CPC', 'R$ 1,00'] },
      { label: 'Pageviews', value: '2.880', conv: ['CR', '90,00%'], cost: ['CPPV', 'R$ 1,11'] },
      { label: 'Product view', value: '1.440', conv: ['PVR', '50,00%'], cost: ['CPV', 'R$ 2,22'] },
      { label: 'Add to cart', value: '360', conv: ['ACR', '25,00%'], cost: ['CPAC', 'R$ 8,89'], hl: '75%' },
      { label: 'Checkouts', value: '180', conv: ['VisChk', '50,00%'], cost: ['CPCHK', 'R$ 17,78'] },
      { label: 'Compras', value: '63', conv: ['ConvChk', '35,00%'], cost: ['CAC', 'R$ 50,79'] },
    ],
    fat: { value: 'R$ 9.450,00', fl: 'compras × ticket', f: '63 × R$ 150', roas: '2,95x' },
    notas: [],
  },
};

const flat = rows => rows.flatMap(r => r.grp ? r.rows : [r]);

function html(f, marked) {
  const all = flat(f.rows), n = all.length;
  const step = Math.floor((380 - 216) / (n - 1));
  let i = 0;
  const mkRow = r => {
    const w = 380 - step * i++;
    const hl = marked && r.hl;
    return `<div class="row ${hl ? 'hl' : ''}">
      <div class="cell l">${r.conv ? `<i>${r.conv[0]}</i><b class="${hl ? 'o' : ''}">${r.conv[1]}</b>` : ''}</div>
      <div class="fn"><div class="bar ${hl ? 'hlbar' : ''}" style="width:${w}px"><span class="bl">${r.label}</span><span class="bv">${r.value}</span></div></div>
      <div class="cell r">${r.cost ? `<i>${r.cost[0]}</i><b>${r.cost[1]}</b>` : ''}</div>
      ${hl ? `<span class="tag">QUEBRA ${r.hl}</span>` : ''}</div>`;
  };
  const body = f.rows.map(r => r.grp
    ? `<div class="grp"><span class="glab">${r.grp}</span>${r.rows.map(mkRow).join('')}</div>`
    : mkRow(r)).join('');
  return `<!doctype html><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0}
body{background:transparent;font-family:'Inter',sans-serif;color:${INK}}
#board{width:760px;background:#fff;border:1px solid #E4E0D6;border-radius:24px;padding:18px 16px 14px}
.head{display:flex;justify-content:space-between;align-items:center;padding:0 6px 10px;font-size:16px;letter-spacing:.12em;font-weight:700;color:#5B6270}
.head span:last-child{font-size:14px;letter-spacing:0;font-weight:500;color:#8a8f99}
.cols,.row{display:grid;grid-template-columns:150px 380px 150px;column-gap:24px;position:relative}
.cols{padding-bottom:6px;font:600 12px 'Inter';letter-spacing:.1em;color:#8a8f99;text-align:center}
.cols span:first-child{text-align:right}.cols span:last-child{text-align:left}
.rows{display:flex;flex-direction:column;gap:8px;padding-top:6px}
.row{height:54px;align-items:center}
.fn{display:flex;justify-content:center;height:54px}
.bar{height:54px;border-radius:8px;display:flex;align-items:center;justify-content:space-between;padding:0 14px;background:#E9E5DA;color:${INK}}
.bl{font:600 19px 'Inter'} .bv{font:800 25px 'Inter';letter-spacing:-.02em}
.bar.gasto{background:${INK};color:#fff}.bar.fat{background:${GREEN}}.bar.hlbar{background:${O}}
.cell{display:flex;flex-direction:column;line-height:1.15}
.cell.l{align-items:flex-end;text-align:right}.cell.r{align-items:flex-start}
.cell i{font:500 13px 'Inter';font-style:normal;color:#7b8190;white-space:nowrap}
.cell b{font:800 20px 'JetBrains Mono';white-space:nowrap}.cell b.o{color:${O}}
.row.hl{margin:14px 0 8px}
.row.hl::after{content:'';position:absolute;inset:-4px -8px;border:3px solid ${O};border-radius:14px;pointer-events:none}
.tag{position:absolute;right:4px;top:-17px;background:${O};color:${INK};font:800 14px 'JetBrains Mono';padding:1px 10px;border-radius:6px;z-index:2}
.grp{position:relative;border:2px dashed #B9B4A8;border-radius:16px;margin:10px -8px 4px;padding:14px 6px 6px;display:flex;flex-direction:column;gap:8px}
.glab{position:absolute;top:-11px;left:16px;background:#fff;padding:0 10px;font:700 14px 'JetBrains Mono';color:#5B6270;letter-spacing:.06em}
.foot{display:flex;flex-direction:column;gap:3px;align-items:center;padding-top:14px;font:500 14px 'Inter';color:#7b8190}
.foot .or{color:${O};font-weight:700}
</style>
<div id="board"><div class="head"><span>${f.titulo}</span><span>exemplo ilustrativo · dados fictícios</span></div>
<div class="cols"><span>CONVERSÃO</span><span>VOLUME</span><span>CUSTO POR ETAPA</span></div>
<div class="rows">
  <div class="row"><div class="cell l"></div><div class="fn"><div class="bar gasto" style="width:380px"><span class="bl">Gasto</span><span class="bv">${f.gasto}</span></div></div><div class="cell r"><i>investimento em mídia</i></div></div>
  ${body}
  <div class="row"><div class="cell l"><i>${f.fat.fl}</i><b>${f.fat.f}</b></div><div class="fn"><div class="bar fat" style="width:380px"><span class="bl">Faturamento</span><span class="bv">${f.fat.value}</span></div></div><div class="cell r"><i>ROAS</i><b>${f.fat.roas}</b></div></div>
</div>
<div class="foot"><span>Conversão = % da etapa anterior · Quebra = 100% − conversão · Custo = gasto ÷ volume</span>${f.notas.map(t => `<span>${t}</span>`).join('')}${marked ? '<span class="or">Laranja = maior quebra depois do clique</span>' : ''}</div></div>`;
}

(async () => {
  const b = await chromium.launch();
  const p = await (await b.newContext({ deviceScaleFactor: 2, viewport: { width: 800, height: 1000 } })).newPage();
  for (const [k, f] of Object.entries(funis)) for (const marked of [false, true]) {
    await p.setContent(html(f, marked)); await p.evaluate(() => document.fonts.ready);
    const file = path.join(OUT, `mockup-${k}-${marked ? 'marcado' : 'limpo'}.png`);
    await p.locator('#board').screenshot({ path: file, omitBackground: true });
    console.log(path.basename(file));
  }
  await b.close();
})();
