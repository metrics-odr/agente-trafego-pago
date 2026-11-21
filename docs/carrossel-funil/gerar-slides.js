const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const HANDLE = '@eduardosmrm';
const OUT = process.argv[2];
const MK = path.join(__dirname, 'mockups');
const ratioOf = f => { const b = fs.readFileSync(path.join(MK, f)); return b.readUInt32BE(20) / b.readUInt32BE(16); };
const b64 = f => 'data:image/png;base64,' + fs.readFileSync(path.join(MK, f)).toString('base64');
const O = '#FF5A36', INK = '#0E1116', CREAM = '#F5F3EE', TOTAL = 11;

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.s{width:1080px;height:1350px;position:relative;overflow:hidden;font-family:'Inter',sans-serif;text-align:center}
.dark{background:${INK};color:#fff}.light{background:${CREAM};color:${INK}}
.col{position:absolute;left:90px;top:100px;width:900px;height:1160px;display:flex;flex-direction:column;justify-content:space-between}
.mono{font-family:'JetBrains Mono',monospace}
.o{color:${O}}
.T{font-weight:800;letter-spacing:-0.035em;line-height:1.02;text-wrap:balance}
.B{font-size:46px;line-height:1.28;font-weight:500;text-wrap:pretty}
.F{font-size:54px;line-height:1.14;font-weight:800;letter-spacing:-0.02em;text-wrap:balance}
.F::before{content:'';display:block;width:120px;height:8px;background:${O};margin:0 auto 24px}
.foot{position:absolute;left:90px;right:90px;bottom:30px;display:flex;justify-content:space-between;font:500 26px 'Inter';opacity:.5}
.prog{position:absolute;left:90px;top:44px;width:900px;display:flex;gap:8px}
.prog i{flex:1;height:7px;border-radius:4px}
.dark .prog i{background:rgba(255,255,255,.2)}.dark .prog i.on{background:#fff}
.light .prog i{background:rgba(14,17,22,.15)}.light .prog i.on{background:${INK}}
.prog i.cur{background:${O}!important}
`;
const prog = n => n === 1 ? '' : `<div class="prog">${Array.from({length:TOTAL},(_,i)=>`<i class="${i+1<n?'on':''} ${i+1===n?'cur':''}"></i>`).join('')}</div>`;
const foot = n => n === 1 ? '' : `<div class="foot"><span>${HANDLE}</span><span>${n}/${TOTAL}</span></div>`;
const wrap = (cls, n, body) => `<!doctype html><meta charset="utf-8"><style>${css}</style><div class="s ${cls}">${prog(n)}${body}${foot(n)}</div>`;
const S = {};

// ---------- CAPA ----------
function capa(titleHtml, fs) {
  const bars = [['Impressão',900,0],['Clique',790,0],['Lead',680,0],['Agendamento',540,1],['Venda',380,0]];
  return wrap('dark', 1, `
<div style="position:absolute;left:90px;top:90px;width:900px;height:1080px;display:flex;flex-direction:column;justify-content:space-between">
  <div class="T" style="font-size:${fs}px">${titleHtml}</div>
  <div style="display:flex;flex-direction:column;gap:10px;align-items:center">
  ${bars.map(([l,w,bb])=>`<div style="position:relative;width:${w}px;height:54px;background:${bb?O:'rgba(255,255,255,.14)'};color:${bb?'#000':'rgba(255,255,255,.8)'};display:flex;align-items:center;justify-content:center;font:700 27px 'JetBrains Mono';border-radius:6px">${l}${bb?'<b style="font-size:46px;margin-left:16px">?</b>':''}</div>`).join('')}
  </div>
  <div style="font-size:44px;line-height:1.25;font-weight:500;color:#fff">Como achar o gargalo acompanhando cada etapa, do gasto ao faturamento.</div>
</div>
<div class="mono" style="position:absolute;left:50%;transform:translateX(-50%);white-space:nowrap;bottom:36px;background:${O};color:#000;font-size:36px;font-weight:800;padding:14px 30px;border-radius:999px">Arrasta →</div>`);
}
S[1] = capa(`Seu funil <span class="o">quebra</span> em algum lugar. Você sabe onde?`, 116);
S['1-alt'] = capa(`Onde seu funil está <span class="o">perdendo</span> dinheiro?`, 140);

// ---------- 2 ----------
S[2] = wrap('light', 2, `<div class="col">
<div class="T" style="font-size:112px">Funil serve para seguir o dinheiro.</div>
<div class="B">A intenção do funil é acompanhar o caminho do gasto em mídia em todas as suas etapas, até chegar no faturamento.</div>
<div class="mono" style="height:150px;display:flex;align-items:center">
  <div style="background:${INK};color:#fff;font-size:44px;font-weight:800;width:270px;height:150px;display:flex;align-items:center;justify-content:center">GASTO</div>
  <div style="flex:1;height:6px;background:${INK}"></div>
  <div style="display:flex;gap:14px;padding:0 14px">${('<i style="display:block;width:22px;height:22px;border-radius:50%;background:'+O+'"></i>').repeat(3)}</div>
  <div style="flex:1;height:6px;background:${INK}"></div>
  <div style="background:${INK};color:#fff;font-size:44px;font-weight:800;width:400px;height:150px;display:flex;align-items:center;justify-content:center">FATURAMENTO</div>
</div>
<div class="F">Se você só olha o começo e o fim, perde tudo o que acontece no meio.</div></div>`);

// ---------- 3 ----------
S[3] = wrap('dark', 3, `<div class="col">
<div class="T" style="font-size:96px">Olhar só CPL e ROAS não diz por que o resultado está ruim.</div>
<div class="mono" style="height:200px;display:flex;align-items:center">
  <div style="width:200px;height:200px;border-radius:50%;border:7px solid #fff;display:flex;align-items:center;justify-content:center;font-size:48px;font-weight:800;flex:none">CPL</div>
  <div style="flex:1;height:6px;background:rgba(255,255,255,.4)"></div>
  <div style="width:300px;height:200px;background:#2b313c;display:flex;align-items:center;justify-content:center;font-size:150px;font-weight:800;color:${O};flex:none">?</div>
  <div style="flex:1;height:6px;background:rgba(255,255,255,.4)"></div>
  <div style="width:200px;height:200px;border-radius:50%;border:7px solid #fff;display:flex;align-items:center;justify-content:center;font-size:44px;font-weight:800;flex:none">ROAS</div>
</div>
<div class="B">O resultado final só mostra que algo deu errado. Ele não mostra onde.</div>
<div class="F">Sem etapas definidas, qualquer ajuste é chute.</div></div>`);

// ---------- 4 ----------
S[4] = wrap('light', 4, `<div class="col">
<div class="T" style="font-size:112px">O que é quebra?</div>
<div style="font-size:48px;line-height:1.24;font-weight:800;letter-spacing:-0.015em;text-wrap:pretty"><span class="o">Quebra</span> é a perda entre uma etapa e a próxima. É quanta gente entrou numa etapa e não chegou na seguinte.</div>
<div>
  <div class="mono" style="display:flex;align-items:flex-end;justify-content:space-between">
    <div style="width:330px;height:190px;background:${INK};color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center"><b style="font-size:76px;line-height:1">1.000</b><span style="font-size:34px;font-weight:700;margin-top:6px">cliques</span></div>
    <div style="flex:1;position:relative;height:190px;margin:0 16px">
      <div style="position:absolute;top:20px;left:0;right:0;text-align:center;font-size:62px;font-weight:800;color:${O}">-90%</div>
      <div style="position:absolute;top:110px;left:0;right:30px;height:8px;background:${O}"></div>
      <div style="position:absolute;top:86px;right:0;width:0;height:0;border-left:40px solid ${O};border-top:28px solid transparent;border-bottom:28px solid transparent"></div>
    </div>
    <div style="width:240px;height:190px;background:${INK};color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center"><b style="font-size:76px;line-height:1">100</b><span style="font-size:34px;font-weight:700;margin-top:6px">leads</span></div>
  </div>
  <div class="mono" style="margin-top:26px;font-size:40px;font-weight:800">Conversão: 10% | <span class="o">Quebra: 90%</span></div>
</div>
<div class="F">Toda etapa tem quebra. O que importa é saber qual está fora do normal.</div></div>`);

// ---------- 5 ----------
S[5] = wrap('dark', 5, `<div class="col">
<div class="T" style="font-size:100px">Gargalo é a quebra fora do normal.</div>
<div style="height:250px;display:flex;align-items:flex-end;justify-content:space-between">
${[[240,0],[205,0],[170,0],[62,1],[48,0]].map(([h,g])=>`<div style="width:158px;height:250px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end">${g?`<div class="mono o" style="font-size:34px;font-weight:800;margin-bottom:10px">GARGALO</div>`:''}<div style="width:158px;height:${h}px;background:${g?O:'#3a414d'}"></div></div>`).join('')}
</div>
<div style="font-size:40px;line-height:1.28;font-weight:500">Compare cada quebra com o seu próprio histórico e com o que é esperado para aquele tipo de negócio. A etapa que mais se afasta do padrão é o gargalo.</div>
<div style="font-size:34px;line-height:1.28;font-weight:500;color:rgba(255,255,255,.75)">Atenção: a quebra entre impressão e clique é sempre alta. Quebra alta não é gargalo. Gargalo é a que foge do seu padrão.</div>
<div class="F" style="font-size:46px">É nela que você mexe primeiro. Não na que é mais fácil de mexer.</div></div>`);

// ---------- 9 ----------
S[9] = wrap('dark', 9, `<div class="col">
<div class="T" style="font-size:108px">Otimizar a etapa errada custa caro.</div>
<div style="display:flex;flex-direction:column;gap:18px">
${['Trocar o criativo quando o gargalo está no comercial.','Subir a verba quando o gargalo está na página.','Cortar campanha boa porque o CPL parece alto.'].map(t=>`<div style="background:rgba(255,255,255,.07);border-radius:18px;padding:34px 36px;font-size:46px;line-height:1.2;font-weight:600;text-wrap:balance"><span class="mono o" style="font-weight:800;margin-right:14px">X</span>${t}</div>`).join('')}
</div>
<div class="F">Sem o funil mapeado, você corrige o sintoma e mantém a causa.</div></div>`);

// ---------- 10 ----------
S[10] = wrap('light', 10, `<div class="col" style="justify-content:flex-start;gap:56px">
<div class="T" style="font-size:100px">3 passos para achar o seu gargalo.</div>
<div style="display:flex;flex-direction:column;gap:34px">
${[['1','<b>Defina as etapas</b> do seu funil, do gasto ao faturamento.'],['2','<b>Registre o volume</b> de cada etapa no mesmo período.'],['3','<b>Calcule a quebra</b> entre cada par de etapas e ache a que mais foge do padrão.']].map(([n,t])=>`<div><div class="mono o" style="font-size:112px;font-weight:800;line-height:1">${n}</div><div style="font-size:44px;line-height:1.2;font-weight:500;margin-top:4px;text-wrap:balance">${t}</div></div>`).join('')}
</div></div>`);

// ---------- 11 ----------
S[11] = wrap('dark', 11, `<div class="col" style="justify-content:center;gap:90px">
<div class="T" style="font-size:132px">Precisa mapear e metrificar seu funil?</div>
<div class="mono" style="background:${O};color:#000;font-size:70px;font-weight:800;padding:46px 0;text-align:center;border-radius:18px">Comenta FUNIL</div></div>`);

// ---------- 6-8 ----------
const MOCK = {
  6: { cls:'light', file:'mockup-clinica-marcado.png', w0:720,
       title:'Clínica médica: 10 etapas até o faturamento.',
       legenda:'De 12.500 form views, só 250 viraram leads.', q:'QUEBRA DE 98%.',
       nota:'Cobrando R$ 800 por consulta, 100 agendamentos pagos viram R$ 80.000 de faturamento.',
       fecho:'Antes de culpar o comercial, olhe o formulário.' },
  7: { cls:'dark', file:'mockup-vsl-marcado.png', w0:720,
       title:'VSL: o meio da página também tem funil.',
       legenda:'2.000 pessoas passaram de 1 minuto, mas só 500 chegaram ao pitch.', q:'QUEBRA DE 75%.',
       fecho:'O público fica, mas sai antes da oferta. O problema não é o anúncio: é o conteúdo antes do pitch.' },
  8: { cls:'light', file:'mockup-ecommerce-marcado.png', w0:720,
       title:'Ecommerce: onde o cliente desiste?',
       legenda:'De 1.440 visualizações de produto, só 360 viraram carrinho.', q:'QUEBRA DE 75%.',
       fecho:'Muita visualização e pouco carrinho aponta para página, preço ou oferta. Não para o anúncio.' },
};
function mock(n, w) {
  const m = MOCK[n], h = Math.round(w * ratioOf(m.file)), x = Math.round((1080 - w) / 2);
  return wrap(m.cls, n, `
<div class="T" style="position:absolute;left:90px;top:96px;width:900px;font-size:66px">${m.title}</div>
<img src="${b64(m.file)}" style="position:absolute;left:${x}px;top:254px;width:${w}px;height:${h}px">
<div id="blk" style="position:absolute;left:90px;width:900px;top:${254 + h + 14}px">
  <div style="font-size:36px;line-height:1.22;font-weight:600">${m.legenda}</div>
  <div class="o" style="font-size:92px;line-height:1.02;font-weight:800;letter-spacing:-0.03em;white-space:nowrap;margin-top:4px">${m.q}</div>
  ${m.nota ? `<div style="font-size:28px;line-height:1.25;font-weight:500;opacity:.75;margin-top:8px">${m.nota}</div>` : ''}
  <div style="font-size:32px;line-height:1.2;font-weight:800;margin-top:12px;text-wrap:balance"><div style="width:90px;height:6px;background:${O};margin:0 auto 10px"></div>${m.fecho}</div>
</div>`);
}

(async () => {
  const b = await chromium.launch();
  const p = await (await b.newContext({ deviceScaleFactor: 1, viewport: { width: 1080, height: 1350 } })).newPage();
  const keys = [...Array(TOTAL)].map((_, i) => i + 1).concat(['1-alt']);
  for (const k of keys) {
    let info = '';
    if (MOCK[k]) {
      let w = MOCK[k].w0;
      for (; w >= 560; w -= 10) {
        await p.setContent(mock(k, w)); await p.evaluate(() => document.fonts.ready);
        const bt = await p.evaluate(() => document.querySelector('#blk').getBoundingClientRect().bottom);
        if (bt <= 1262) { info = ` mockup ${w}px, texto termina em y=${Math.round(bt)}`; break; }
      }
    } else {
      await p.setContent(S[k]); await p.evaluate(() => document.fonts.ready);
      const o = await p.evaluate(() => { const c = document.querySelector('.col'); return c ? c.scrollHeight - c.clientHeight : 0; });
      if (o > 0) info = ` ⚠ overflow ${o}px`;
    }
    const f = path.join(OUT, k === '1-alt' ? 'slide-01-alternativa.png' : `slide-${String(k).padStart(2, '0')}.png`);
    await p.screenshot({ path: f });
    console.log(path.basename(f) + info);
  }
  await b.close();
})();
