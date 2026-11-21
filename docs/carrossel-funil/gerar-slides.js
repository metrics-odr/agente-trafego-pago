const { chromium } = require('playwright');
const path = require('path');
const HANDLE = '[@ da marca]';
const OUT = process.argv[2];
const MK = path.join(__dirname, 'mockups');
const fs = require('fs');
const b64 = f => 'data:image/png;base64,' + fs.readFileSync(path.join(MK, f)).toString('base64');
const O = '#FF5A36', INK = '#0E1116', CREAM = '#F5F3EE';
const TOTAL = 11;

const css = `
*{box-sizing:border-box;margin:0;padding:0}
body{background:#888}
.s{width:1080px;height:1350px;position:relative;overflow:hidden;font-family:'Inter',sans-serif}
.dark{background:${INK};color:#fff}.light{background:${CREAM};color:${INK}}
.abs{position:absolute;left:90px;width:900px}
.t,.fecho,.corpo{text-wrap:balance}
.t{font-weight:800;letter-spacing:-0.025em;line-height:1.08}
.o{color:${O}}
.mono{font-family:'JetBrains Mono',monospace}
.foot{position:absolute;left:90px;right:90px;bottom:32px;display:flex;justify-content:space-between;font:500 26px 'Inter';opacity:.5}
.corpo{font-size:40px;line-height:1.3;font-weight:500}
.fecho{font-size:40px;line-height:1.25;font-weight:800;letter-spacing:-0.01em}
`;
const foot = n => n === 1 ? '' : `<div class="foot"><span>${HANDLE}</span><span>${n}/${TOTAL}</span></div>`;
const wrap = (cls, n, body) => `<!doctype html><meta charset="utf-8"><style>${css}</style><div class="s ${cls}">${body}${foot(n)}</div>`;

// ---------- slides 1-5 e 9-11 ----------
const slides = {};

slides[1] = wrap('dark', 1, `
<div class="abs t" style="top:90px;font-size:84px;line-height:1.08">Seu funil <span class="o">quebra</span> em algum lugar. Você sabe onde?</div>
<div class="abs" style="top:600px;height:190px;display:flex;align-items:center;justify-content:space-between">
${[170,146,122,98,74,50,28].map((h,i,a)=>`<div style="width:96px;height:${h}px;border-radius:8px;background:${i===a.length-1?O:'rgba(255,255,255,.16)'};border:2px solid ${i===a.length-1?O:'rgba(255,255,255,.35)'}"></div>${i<a.length-1?'<div style="flex:1;height:3px;background:rgba(255,255,255,.3)"></div>':''}`).join('')}
</div>
<div class="abs" style="top:930px;font-size:42px;line-height:1.3;font-weight:500;color:rgba(255,255,255,.88)">Como achar o gargalo acompanhando cada etapa, do gasto ao faturamento.</div>
<div class="mono" style="position:absolute;right:90px;bottom:90px;font-size:36px;font-weight:700;color:rgba(255,255,255,.7)">Arrasta →</div>`);

slides[2] = wrap('light', 2, `
<div class="abs t" style="top:90px;font-size:80px">Funil serve para seguir o dinheiro.</div>
<div class="abs corpo" style="top:370px">A intenção do funil é acompanhar o caminho do gasto em mídia em todas as suas etapas, até chegar no faturamento.</div>
<div class="abs mono" style="top:700px;height:120px;display:flex;align-items:center">
  <div style="background:${INK};color:#fff;font-size:34px;font-weight:700;width:230px;height:120px;display:flex;align-items:center;justify-content:center">GASTO</div>
  <div style="flex:1;height:4px;background:${INK}"></div>
  <div style="display:flex;gap:14px;padding:0 14px;background:${CREAM}">${('<i style="display:block;width:14px;height:14px;border-radius:50%;background:'+INK+'"></i>').repeat(3)}</div>
  <div style="flex:1;height:4px;background:${INK}"></div>
  <div style="background:${INK};color:#fff;font-size:34px;font-weight:700;width:310px;height:120px;display:flex;align-items:center;justify-content:center">FATURAMENTO</div>
</div>
<div class="abs fecho" style="top:1000px;font-size:44px">Se você só olha o começo e o fim, perde tudo o que acontece no meio.</div>`);

slides[3] = wrap('dark', 3, `
<div class="abs t" style="top:90px;font-size:72px">Olhar só CPL e ROAS não diz por que o resultado está ruim.</div>
<div class="abs mono" style="top:480px;height:140px;display:flex;align-items:center">
  <div style="width:140px;height:140px;border-radius:50%;border:5px solid #fff;display:flex;align-items:center;justify-content:center;font-size:34px;font-weight:800">CPL</div>
  <div style="flex:1;height:4px;background:rgba(255,255,255,.4)"></div>
  <div style="width:380px;height:140px;background:#2b313c;display:flex;align-items:center;justify-content:center;font-size:110px;font-weight:800;color:${O}">?</div>
  <div style="flex:1;height:4px;background:rgba(255,255,255,.4)"></div>
  <div style="width:140px;height:140px;border-radius:50%;border:5px solid #fff;display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:800">ROAS</div>
</div>
<div class="abs corpo" style="top:720px">O resultado final só mostra que algo deu errado. Ele não mostra onde.</div>
<div class="abs fecho" style="top:960px;font-size:46px">Sem etapas definidas, qualquer ajuste é chute.</div>`);

slides[4] = wrap('light', 4, `
<div class="abs t" style="top:90px;font-size:84px">O que é quebra?</div>
<div class="abs" style="top:260px;font-size:46px;line-height:1.25;font-weight:800;letter-spacing:-0.01em"><span class="o">Quebra</span> é a perda entre uma etapa e a próxima. É quanta gente entrou numa etapa e não chegou na seguinte.</div>
<div class="abs mono" style="top:650px;height:200px;display:flex;align-items:flex-end;justify-content:space-between">
  <div style="width:330px;height:130px;background:${INK};color:#fff;font-size:34px;font-weight:700;display:flex;align-items:center;justify-content:center">1.000 cliques</div>
  <div style="flex:1;position:relative;height:130px;margin:0 20px">
    <div style="position:absolute;top:-62px;left:0;right:0;text-align:center;font-size:52px;font-weight:800;color:${O}">-90%</div>
    <div style="position:absolute;top:63px;left:0;right:26px;height:6px;background:${O}"></div>
    <div style="position:absolute;top:44px;right:0;width:0;height:0;border-left:34px solid ${O};border-top:22px solid transparent;border-bottom:22px solid transparent"></div>
  </div>
  <div style="width:250px;height:130px;background:${INK};color:#fff;font-size:34px;font-weight:700;display:flex;align-items:center;justify-content:center">100 leads</div>
</div>
<div class="abs mono" style="top:880px;font-size:36px;font-weight:700">Conversão: 10% | <span class="o">Quebra: 90%</span></div>
<div class="abs fecho" style="top:1040px;font-size:42px">Toda etapa tem quebra. O que importa é saber qual está fora do normal.</div>`);

slides[5] = wrap('dark', 5, `
<div class="abs t" style="top:90px;font-size:72px">Gargalo é a quebra fora do normal.</div>
<div class="abs" style="top:330px;height:270px;display:flex;align-items:flex-end;justify-content:space-between">
${[[230,0],[200,0],[170,0],[64,1],[52,0]].map(([h,g])=>`<div style="width:150px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:270px">${g?`<div class="mono o" style="font-size:30px;font-weight:800;margin-bottom:10px">GARGALO</div>`:''}<div style="width:150px;height:${h}px;background:${g?O:'#3a414d'}"></div></div>`).join('')}
</div>
<div class="abs" style="top:650px;font-size:38px;line-height:1.3;font-weight:500">Compare cada quebra com o seu próprio histórico e com o que é esperado para aquele tipo de negócio. A etapa que mais se afasta do padrão é o gargalo.</div>
<div class="abs" style="top:900px;font-size:32px;line-height:1.3;font-weight:500;color:rgba(255,255,255,.78)">Atenção: a quebra entre impressão e clique é sempre alta. Quebra alta não é gargalo. Gargalo é a que foge do seu padrão.</div>
<div class="abs fecho" style="top:1090px;font-size:42px">É nela que você mexe primeiro. Não na que é mais fácil de mexer.</div>`);

slides[9] = wrap('dark', 9, `
<div class="abs t" style="top:90px;font-size:76px">Otimizar a etapa errada custa caro.</div>
<div class="abs" style="top:370px">
${['Trocar o criativo quando o gargalo está no comercial.','Subir a verba quando o gargalo está na página.','Cortar campanha boa porque o CPL parece alto.'].map((t,i)=>`<div style="display:flex;align-items:center;gap:30px;padding:40px 0;${i?'border-top:2px solid rgba(255,255,255,.2)':''}"><span class="mono o" style="font-size:64px;font-weight:800;width:60px;flex:none">X</span><span style="font-size:42px;line-height:1.25;font-weight:500">${t}</span></div>`).join('')}
</div>
<div class="abs fecho" style="top:1020px;font-size:46px">Sem o funil mapeado, você corrige o sintoma e mantém a causa.</div>`);

slides[10] = wrap('light', 10, `
<div class="abs t" style="top:90px;font-size:76px">3 passos para achar o seu gargalo.</div>
<div class="abs" style="top:370px">
${[['1','<b>Defina as etapas</b> do seu funil, do gasto ao faturamento.'],['2','<b>Registre o volume</b> de cada etapa no mesmo período.'],['3','<b>Calcule a quebra</b> entre cada par de etapas e ache a que mais foge do padrão.']].map(([n,t])=>`<div style="display:flex;align-items:center;gap:36px;padding:34px 0"><span class="mono o" style="font-size:120px;font-weight:800;width:110px;flex:none;line-height:1">${n}</span><span style="font-size:42px;line-height:1.28;font-weight:500">${t}</span></div>`).join('')}
</div>`);

slides[11] = wrap('dark', 11, `
<div class="abs t" style="top:330px;font-size:80px">Precisa mapear e metrificar seu funil?</div>
<div class="abs" style="top:760px"><div class="mono" style="display:inline-block;background:${O};color:#000;font-size:44px;font-weight:800;padding:34px 56px">Comenta FUNIL</div></div>`);

// ---------- slides 6-8 (mockups) ----------
const MOCK = {
  6: { cls:'light', file:'mockup-clinica-marcado.png', w0:780, ratio:1840/1800,
       title:'Clínica médica: 10 etapas até o faturamento.',
       legenda:'De 240 MQLs, só 48 pagaram o agendamento. <b class="o" style="white-space:nowrap">QUEBRA DE 80%.</b>',
       nota:'Cobrando R$ 800 por consulta, 48 agendamentos pagos viram R$ 38.400 de faturamento.',
       fecho:'Cada agendamento perdido é receita que não entra.' },
  7: { cls:'dark', file:'mockup-vsl-marcado.png', w0:740, ratio:2032/1800,
       title:'VSL: o meio da página também tem funil.',
       legenda:'1.800 pessoas passaram de 1 minuto, mas só 450 chegaram ao pitch. <b class="o" style="white-space:nowrap">QUEBRA DE 75%.</b>',
       fecho:'O público fica, mas sai antes da oferta. O problema não é o anúncio: é o conteúdo antes do pitch.' },
  8: { cls:'light', file:'mockup-ecommerce-marcado.png', w0:780, ratio:1906/1800,
       title:'Ecommerce: onde o cliente desiste?',
       legenda:'De 1.440 visualizações de produto, só 360 viraram carrinho. <b class="o" style="white-space:nowrap">QUEBRA DE 75%.</b>',
       fecho:'Muita visualização e pouco carrinho aponta para página, preço ou oferta. Não para o anúncio.' },
};
function mockSlide(n, w) {
  const m = MOCK[n], h = Math.round(w * m.ratio), x = Math.round((1080 - w) / 2);
  return wrap(m.cls, n, `
<div class="abs t" style="top:90px;font-size:60px">${m.title}</div>
<img src="${b64(m.file)}" style="position:absolute;left:${x}px;top:245px;width:${w}px;height:${h}px">
<div id="blk" class="abs" style="top:${245 + h + 16}px">
  <div style="font-size:30px;line-height:1.28;font-weight:500">${m.legenda}</div>
  ${m.nota ? `<div style="font-size:28px;line-height:1.28;font-weight:500;opacity:.75;margin-top:8px">${m.nota}</div>` : ''}
  <div style="font-size:30px;line-height:1.25;font-weight:800;margin-top:12px">${m.fecho}</div>
</div>`);
}

(async () => {
  const b = await chromium.launch();
  const p = await (await b.newContext({ deviceScaleFactor: 1, viewport: { width: 1080, height: 1350 } })).newPage();
  for (let n = 1; n <= TOTAL; n++) {
    let w = null, info = '';
    if (MOCK[n]) {
      w = MOCK[n].w0;
      for (let step = 0; step <= 4; step++) {
        await p.setContent(mockSlide(n, w)); await p.evaluate(() => document.fonts.ready);
        await p.waitForLoadState('load');
        const bottom = await p.evaluate(() => document.querySelector('#blk').getBoundingClientRect().bottom);
        if (bottom <= 1260 || step === 4) { info = ` mockup ${w}px, bloco termina em y=${Math.round(bottom)}`; break; }
        w -= 10;
      }
    } else {
      await p.setContent(slides[n]); await p.evaluate(() => document.fonts.ready);
    }
    const file = path.join(OUT, `slide-${String(n).padStart(2, '0')}.png`);
    await p.screenshot({ path: file });
    console.log(file + info);
  }
  await b.close();
})();
