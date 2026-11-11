# Made In Color — Estrutura de campanha de Pesquisa (Google Ads)

**Status: RASCUNHO/PROPOSTA para validação e aprovação (nada foi criado em conta; sem integração de API).** Data: 11/11/2026.
Pendências antes de subir: CID da conta, briefing do cliente, margem (para meta de ROAS), confirmação de frete/prazo por país, relatório LNE.

## 0. O que está verificado e o que é suposição (ler antes de usar)

| Item | Situação |
|---|---|
| Preços, conteúdo do kit, envio em 12 h, devolução de 30 dias, FR/EN no site | **Verificado no site em 11/11** (navegador) |
| Lista de países e idiomas por campanha | **Decisão do Eduardo**; o encaixe de idioma por país é raciocínio meu |
| Limites de caracteres dos anúncios | **Verificado** por contagem |
| Relatório LNE, classificação de segurança do líquido | **Alegação do site, não conferido** |
| Prazo de entrega por país (NL, DE, LU) | **Não confirmado** |
| Palavras-chave, volumes e CPC | **Hipótese**: nada foi validado no Planejador de Palavras-chave |
| Divisão de verba (€24 / €16) | **Suposição minha**, sem dado; ajustar com CPC e conversão reais |
| Mínimos de conversão para o lance automático (15–30/mês) | Regra prática, não número garantido |
| Alcance em inglês na Alemanha e nos Países Baixos | **Incerto**; pode ser baixo |
| Tag do Google Ads e compra com valor no site | Tag detectada; **disparo da conversão não testado** |

**Esta estrutura é um rascunho para validar, não uma decisão final.** Antes de subir: Planejador de Palavras-chave (volume e CPC por país), CID, briefing, margem, relatório LNE e prazo de entrega por país.

## 1. Premissas fechadas
- **Verba total:** €40/dia.
- **Países:** França, Bélgica, Países Baixos, Alemanha, Luxemburgo.
- **Idiomas do site:** francês e inglês. Francês para França, Bélgica e Luxemburgo (campanha A); inglês para Países Baixos e Alemanha (campanha B).
- Todos os países são da UE (moeda EUR, sem alfândega). Alemanha e Países Baixos em **inglês** alcançam só quem pesquisa em inglês (ver riscos).

## 2. Estrutura (decisão do Eduardo: 2 campanhas, 1 grupo cada, todas as palavras-chave juntas)

| # | Campanha | Países | Idioma (do usuário) | Verba/dia | Grupo | Destino padrão |
|---|---|---|---|---|---|---|
| A | `PESQ | FR | FR+BE+LU` | França, Bélgica, Luxemburgo | Francês | €24 | 1 grupo com todas as palavras-chave FR | `madeincolors.com/` |
| B | `PESQ | EN | NL+DE` | Países Baixos, Alemanha | Inglês | €16 | 1 grupo com todas as palavras-chave EN | `madeincolors.com/en/` |

- O orçamento é da **campanha**. O grupo único recebe todo o gasto.
- **URL final por palavra-chave** (recurso do Google Ads): palavras de refil → página de refil (`/collections/green-flame-liquide`, versão `/en/` em B); palavras de marca → home; demais → `/products/serenity` ou a home. Sem isso, todas as buscas caem na mesma página.
- O **RSA** do grupo único precisa cobrir lâmpada, presente, marca e refil (ver seção 6). A mensagem fica menos específica do que com grupos separados; decisão do Eduardo, a avaliar com dados.
- **Bélgica e Luxemburgo ficam só em A** (francês); B só tem NL e DE.
- **Nomes definitivos** devem seguir o padrão do cliente/Eduardo; os de cima são provisórios.

## 3. Configurações comuns
| Item | Valor |
|---|---|
| Rede | Só Pesquisa (sem parceiros de pesquisa, sem Display) |
| Local | "Presença" (não "presença ou interesse") |
| Correspondência | **Frase e exata**; sem ampla; AI Max desligado |
| Lance (semanas 1–2) | **Maximizar conversões**, sem meta de CPA |
| Conversão primária | **Compra com valor** (só primária relevante; adicionar ao carrinho como secundária) |
| Programação | Todos os dias, 24 h |
| Dispositivos | Todos |
| Públicos | Em **observação** (não restringir) |
| Ativos | Sitelinks, snippets, preço, promoção, imagem, logo |
| Medição | Consent Mode v2 + CMP verificado na UE; auto-tagging ligado; UTMs conforme análise anterior |

## 4. Palavras-chave (frase e exata) — 1 grupo por campanha, mesmas palavras em FR e EN

A campanha A usa a coluna FR; a campanha B usa a coluna EN. Cada linha é o mesmo conceito. **➕ = candidata nova, ainda mais incerta.** **Volumes e CPC não validados.** A lista **não é exaustiva**: a definitiva sai do Planejador de Palavras-chave antes de subir e do relatório de termos de pesquisa depois.

| # | Conceito | FR (campanha A) | EN (campanha B) | |
|---|---|---|---|---|
| 1 | Lâmpada a óleo decorativa | `lampe à huile décorative` | `decorative oil lamp` |  |
| 2 | Lâmpada de ambiente | `lampe d'ambiance` | `ambient lamp` |  |
| 3 | Lâmpada de chama decorativa | `lampe à flamme décorative` | `decorative flame lamp` |  |
| 4 | Decoração de mesa com chama | `déco de table flamme` | `flame table decor` |  |
| 5 | Chama colorida | `flamme colorée` | `colored flame` |  |
| 6 | Chama verde | `flamme verte` | `green flame` |  |
| 7 | Lâmpada de chama verde | `lampe flamme verte` | `green flame lamp` |  |
| 8 | Lâmpada de chama colorida | `lampe flamme colorée` | `colored flame lamp` |  |
| 9 | Presente decoração da casa | `cadeau déco maison` | `home decor gift` |  |
| 10 | Presente decoração original | `cadeau original déco` | `unique decor gift` |  |
| 11 | Presente lâmpada a óleo | `cadeau lampe à huile` | `oil lamp gift` |  |
| 12 | Lâmpada a óleo design | `lampe à huile design` | `design oil lamp` | ➕ |
| 13 | Lâmpada a óleo moderna | `lampe à huile moderne` | `modern oil lamp` | ➕ |
| 14 | Lâmpada a óleo de vidro | `lampe à huile en verre` | `glass oil lamp` | ➕ |
| 15 | Chama verde decorativa | `flamme verte décorative` | `decorative green flame` | ➕ |
| 16 | Decoração com chama verde | `décoration flamme verte` | `green flame decor` | ➕ |
| 17 | Presente de Natal decoração | `cadeau noël déco` | `christmas decor gift` | ➕ |
| 18 | Presente de casa nova | `cadeau pendaison de crémaillère` | `housewarming gift` | ➕ |
| 19 | Marca | `madeincolors` | `madeincolors` |  |
| 20 | Marca (separado) | `made in colors` | `made in colors` |  |
| 21 | Marca (sem o s) | `made in color` | `made in color` | ➕ |
| 22 | Marca + produto | `madeincolors serenity` | `madeincolors serenity` |  |
| 23 | Marca + chama verde | `made in colors flamme verte` | `made in colors green flame` | ➕ |
| 24 | Marca + avaliações | `madeincolors avis` | `madeincolors reviews` | ➕ |
| 25 | Marca + código promocional | `madeincolors code promo` | `madeincolors promo code` | ➕ |
| 26 | Líquido Green Flame | `green flame liquide` | `green flame liquid` |  |
| 27 | Refil de lâmpada a óleo | `recharge lampe à huile` | `oil lamp refill` |  |
| 28 | Líquido para lâmpada a óleo | `liquide pour lampe à huile` | `lamp oil` |  |
| 29 | Óleo de lâmpada sem cheiro | `huile pour lampe sans odeur` | `odorless lamp oil` |  |
| 30 | Óleo de lâmpada sem fumaça | `huile pour lampe sans fumée` | `smokeless lamp oil` |  |
| 31 | Pavio de lâmpada a óleo | `mèche pour lampe à huile` | `oil lamp wick` |  |
| 32 | Refil de chama verde | `liquide flamme verte` | `green flame refill` |  |
| 33 | Combustível de lâmpada a óleo | `combustible lampe à huile` | `oil lamp fuel` | ➕ |

**Total (tabela acima): 33 palavras por campanha; com as buscas simples da seção 4.1 são 38** (cada uma em frase e exata).

**Observações (a validar):**
- `serenity lampe` foi **removida**: "Lampe Serenity" também é produto da Maison Berger e traria tráfego de outro produto.
- Em inglês, `green flame` e `colored flame` tendem a trazer ruído (jogos, química). Em francês, `flamme verte` também traz química. Ficam em frase/exata, com negativas.
- `lamp oil` (inglês) é amplo e atrai quem busca querosene/parafina; depende das negativas.
- `madeincolors code promo` / `promo code` atrai caçadores de cupom: só manter se houver cupom real.
- `cadeau pendaison de crémaillère` / `housewarming gift` é genérico: vigiar no relatório de termos.
- Grafia `colored` (EUA) × `coloured` (Reino Unido): checar no Planejador qual predomina em NL e DE.

### 4.1 Listas para copiar (ordem = prioridade estimada, **sem dado**; 38 por campanha; mesma ordem nos dois idiomas)

Adicionadas em 11/11 por sugestão do Eduardo (buscas simples): `lampe à huile verte` / `green oil lamp`, `lampe à huile flamme verte` / `green flame oil lamp`, `lampe à huile flamme colorée` / `colored flame oil lamp`, `bougie flamme verte` / `green flame candle`, `bougie flamme colorée` / `colored flame candle`.
Atenção: `green oil lamp` / `lampe à huile verte` também casa com lâmpadas de **vidro verde**; `bougie flamme verte` / `green flame candle` atrai quem busca **vela**. Vigiar no relatório de termos.

**FR (campanha A):**
```
madeincolors
made in colors
madeincolors serenity
green flame liquide
recharge lampe à huile
lampe flamme verte
lampe à huile verte
lampe à huile flamme verte
lampe à huile décorative
lampe flamme colorée
lampe à huile flamme colorée
liquide flamme verte
lampe à flamme décorative
liquide pour lampe à huile
huile pour lampe sans odeur
huile pour lampe sans fumée
mèche pour lampe à huile
lampe d'ambiance
flamme verte décorative
flamme colorée
flamme verte
bougie flamme verte
bougie flamme colorée
déco de table flamme
cadeau déco maison
cadeau lampe à huile
cadeau original déco
lampe à huile design
lampe à huile moderne
lampe à huile en verre
décoration flamme verte
made in colors flamme verte
made in color
madeincolors avis
combustible lampe à huile
cadeau noël déco
cadeau pendaison de crémaillère
madeincolors code promo
```

**EN (campanha B):**
```
madeincolors
made in colors
madeincolors serenity
green flame liquid
oil lamp refill
green flame lamp
green oil lamp
green flame oil lamp
decorative oil lamp
colored flame lamp
colored flame oil lamp
green flame refill
decorative flame lamp
lamp oil
odorless lamp oil
smokeless lamp oil
oil lamp wick
ambient lamp
decorative green flame
colored flame
green flame
green flame candle
colored flame candle
flame table decor
home decor gift
oil lamp gift
unique decor gift
design oil lamp
modern oil lamp
glass oil lamp
green flame decor
made in colors green flame
made in color
madeincolors reviews
oil lamp fuel
christmas decor gift
housewarming gift
madeincolors promo code
```

## 5. Negativas (mesmos termos em FR e EN)

| Conceito | FR | EN |
|---|---|---|
| LED | `led` | `led` |
| Elétrico | `électrique` | `electric` |
| Pilhas | `piles` | `batteries` |
| Bateria | `batterie` | `battery` |
| Solar | `solaire` | `solar` |
| Perfume | `parfum` | `perfume` |
| Difusor | `diffuseur` | `diffuser` |
| Catalítica | `catalytique` | `catalytic` |
| Maison Berger | `maison berger` | `maison berger` |
| Petróleo | `pétrole` | `petroleum` |
| Querosene | `kérosène` | `kerosene` |
| Gasolina | `essence` | `gasoline` |
| Parafina | `paraffine` | `paraffin` |
| Álcool | `alcool` | `alcohol` |
| Etanol | `éthanol` | `ethanol` |
| Experimento | `expérience` | `experiment` |
| Química | `chimie` | `chemistry` |
| Sal | `sel` | `salt` |
| Cobre | `cuivre` | `copper` |
| Bórax | `borax` | `borax` |
| Ácido bórico | `acide borique` | `boric acid` |
| Como fazer | `comment faire` | `how to` |
| Faça você mesmo | `diy` | `diy` |
| Tutorial | `tuto` | `tutorial` |
| Fogos de artifício | `feu d'artifice` | `fireworks` |
| Fumígeno | `fumigène` | `smoke bomb` |
| Grátis | `gratuit` | `free` |
| Usado | `occasion` | `used` |
| Lâmpada de lava | `lampe à lave` | `lava lamp` |
| Jogo | `jeu` | `game` |
| Minecraft | `minecraft` | `minecraft` |

Atenção: `jeu` e `gratuit` podem bloquear buscas legítimas (ex.: "jeu de lumière", "livraison gratuite"). Rever no relatório de termos na 1ª semana. Negativas cruzadas entre grupos A/B conferidas também na 1ª semana.

## 6. Anúncios (RSA) — rascunho

Limites verificados: títulos ≤ 30 caracteres, descrições ≤ 90.

### Francês (A)
**Títulos (até 15):**
1. Flamme Verte Décorative
2. Lampe à Flamme Verte
3. Lampe à Huile Décorative
4. Sans Fumée, Sans Odeur
5. Idée Cadeau Originale
6. Coffret Prêt à Offrir
7. Livraison 24-48h
8. Liquide Testé par le LNE
9. Recharge Flamme Verte
10. Marque Française
11. Dès 39,95 €
12. Ambiance Unique à la Maison
13. Véritable Flamme Colorée
14. Retours sous 30 Jours
15. Lampe d'Ambiance Originale

**Descrições (4):**
1. Une vraie flamme verte, sans fumée ni odeur. Coffret Serenity à partir de 39,95 €.
2. Lampe, liquide et mèches inclus. Prêt à offrir, expédié sous 12 h.
3. Retours sous 30 jours. Liquide testé par le LNE. Découvrez la flamme verte.
4. Rechargez votre lampe : liquide Green Flame dès 18,95 €, mèche offerte.

### Inglês (B)
**Títulos (15, verificados ≤ 30 caracteres):** Green Flame Oil Lamp · Decorative Oil Lamp · Real Colored Flame · No Smoke, No Odor · Original Gift Idea · Gift-Ready Box · Green Flame Refill · Refill With Free Wick · Complete Kit From €39.95 · Shipped Within 12 Hours · 30-Day Returns · Made in Colors Green Flame · Unique Home Decor Gift · Lamp, Liquid & Wicks Included · Create a Unique Ambiance
**Descrições (4, verificadas ≤ 90 caracteres) — foco em matar objeção:**
1. A real flame, not LED. Glows green in soft light, no smoke or odor. Shop the Serenity box.
2. Lamp, liquid, 2 wicks and funnel included. Fill, light, enjoy about 40 hours of flame.
3. A gift they'll remember: gift-ready box, ships in 12 hours, 30-day returns, no questions.
4. Already own the lamp? Green Flame refill from €18.95, free wick included. Easy to refill.

**Substituta condicional (só publicar com o relatório LNE em mãos):** trocar a descrição 2 ou 3 por: *Liquid tested by LNE, France's national lab. A real green flame, no smoke, no odor.* (83 caracteres).

**Mapa de objeções → resposta (verificado no site em 11/11):**
| Objeção do visitante | Resposta usada | Onde está comprovado |
|---|---|---|
| "É fogo de verdade ou LED?" | "A real flame, not LED" | FAQ: "véritable flamme colorée… pas un éclairage LED" |
| "A cor aparece mesmo?" | "Glows green in soft light" | FAQ: cor mais visível em ambiente suave, à noite |
| "Cheira ou solta fumaça como vela?" | "no smoke or odor" | Site e FAQ |
| "É complicado? O que vem na caixa?" | "Lamp, liquid, 2 wicks and funnel… Fill, light, enjoy" | Página do kit (lâmpada, 0,5 L, 2 mechas, funil) |
| "Quanto dura / quanto custa manter?" | "about 40 hours of flame" | Página do kit e FAQ (500 ml ≈ 35–40 h) |
| "Serve de presente?" | "gift-ready box" | Página do kit e FAQ |
| "E se eu não gostar / demorar?" | "ships in 12 hours, 30-day returns, no questions" | Página do kit |
| "Já tenho a lâmpada, onde compro o líquido?" | "refill from €18.95, free wick included" | Página de refil |
| "É seguro?" | **Não respondido em anúncio sem o relatório LNE** (substituta acima) | Alegação do site, relatório não conferido |

**Não usei, de propósito:** "tested by LNE" sem relatório; "safe / non-toxic / non-flammable"; "limited edition" (só se o cliente confirmar que é verdade); "Tower of London" (sem comprovação da marca); nota de avaliação (o site mostra 5,0·87 e 4,96·24); prazo de entrega por país; "free delivery" (frete grátis só vimos nos pacotes em francês).

### Regras de copy
- **Não usar:** "pode beber", "não queima", "100% seguro", "não tóxico", "não inflamável". "Testé par le LNE" só com o relatório em mãos.
- **Verificar antes de publicar:** preço (€39,95 / €18,95), "expédié sous 12 h" e "30 jours" (confirmados no site em 11/11); prazo de entrega por país (a promessa "24–48h" pode não valer para NL/DE/LU).
- Com grupo único, o RSA cobre lâmpada, presente, marca e refil: usar títulos de todos os temas e **não fixar** posições, para o Google combinar.
- Torre de Londres: **não** usar em anúncio sem comprovação da marca; manter só no sitelink/página.

**Caminhos de exibição (path 1 / path 2, até 15 caracteres cada):** FR `flamme-verte` / `lampe-a-huile` · EN `green-flame` / `oil-lamp`.
**Títulos com superlativo removidos:** "La Première Flamme de Couleur" e "The First Colored Flame Lamp" foram trocados, porque superlativos exigem comprovação (guia, seção 14). Só voltam se o cliente comprovar.

## 7. Ativos
**Sitelinks:** Serenity (`/products/serenity`) · Liquide/Refil (`/collections/green-flame-liquide`) · Nos Coffrets (`/collections/serenity-pack`) · Notre histoire (`/pages/notre-histoire`) · Instructions (`/pages/instructions`) · Rapport LNE (`/pages/rapport-dessai-officiel`)
**Snippets (Tipos):** Serenity, Green Flame
**Destaques:** Sans fumée ni odeur · Retours 30 jours · Expédition 12 h · Marque française
**Preço, promoção, imagem, logo.**

## 8. Riscos e limites
1. **Alemanha e Países Baixos em inglês:** só pegam quem tem Google em inglês. O volume pode ser baixo e a conversão menor. Se não render nas 2–3 primeiras semanas, o caminho é traduzir o site (DE/NL) e criar campanhas por idioma.
2. **B com €16/dia:** pode ficar abaixo do mínimo para o lance automático aprender. Se acontecer, concentrar B em Países Baixos + Bélgica.
3. **Natal:** CPC mais alto em nov/dez. Janela de aprendizado de 2 semanas já consome parte.
4. **Ainda sem validar:** volume de busca, CPC e taxa de conversão; política de produto do líquido (checar no Policy Manager ao subir).
5. **Dados do site a corrigir:** avaliações inconsistentes (5,0·87 vs 4,96·24); escassez ("édition limitée"); consentimento de cookies.

## 9. Passo a passo de lançamento
1. Confirmar CID, briefing, margem, relatório LNE, frete por país.
2. Conferir Consent Mode v2 e a conversão de compra com valor.
3. Criar A e B com as configurações da seção 3; subir negativas.
4. Cadastrar RSAs e ativos; conferir reprovações.
5. Semanas 1–2: sem alterar lances/metas; checar termos de pesquisa a cada 2–3 dias.
6. Dia 14–21: avaliar CPA/ROAS por campanha e por país; só então definir meta de ROAS e redistribuir verba.

## 10. Auditoria contra o guia `docs/google-ads/` (11/11)

Feita depois de reler `pesquisa.md`, `medicao-e-conversoes.md` e `publicos-e-segmentacao.md`. Antes eu havia montado a estrutura sem reler os guias.

### Corrigido
| Item | O que o guia diz | O que fiz |
|---|---|---|
| Superlativos nos títulos | Evitar superlativos não comprovados (seção 14) | Troquei "La Première Flamme de Couleur" e "The First Colored Flame Lamp" |
| Caminhos de exibição | Path 1/2 reforçam relevância (seção 5) | Adicionados |
| Palavra-chave nos títulos | Incluir a principal em 1–2 títulos (seção 5) | "Lampe à Flamme Verte" e "Green Flame Oil Lamp" entram nos títulos |

### Pontos em que a estrutura escolhida contraria o guia (decisão sua; registro o risco)
1. **Um grupo com 38 palavras de intenções diferentes.** O guia diz "um grupo = uma intenção; evitar grupos com palavras desconexas" (seção 2). Efeito: o anúncio fala de tudo ao mesmo tempo, o Nível de Qualidade (relevância do anúncio) tende a cair e o CPC a subir. Mitigação já prevista: URL final por palavra-chave.
2. **Marca, refil e aquisição na mesma campanha.** O guia lista "juntar marca e não-marca" como erro comum (seção 15, item 7) e recomenda campanha de marca separada (seção 11). Efeito: o CPA de marca, mais barato, mascara o CPA de aquisição.
3. **Verba pequena para lance automático.** O guia diz que orçamento abaixo de ~10× o CPA alvo dá pouco espaço para aprender (seção 7). Com ticket de ~€50 e CPA alvo em torno de €20–25, 10× seria €200–250/dia; temos €24 e €16.
Se quiser reduzir esses riscos sem mudar o orçamento nem o número de campanhas, o caminho é dividir cada campanha em 2–3 grupos (por exemplo: Produto, Presente, Marca+Refil). Decisão do Eduardo.

### Faltava avisar
- **Gasto diário pode chegar a 2× o orçamento** em alguns dias (guia, seção 8). Os €40/dia valem como **média mensal** (~€1.216 por mês, 30,4 × €40). Em um dia ruim o gasto pode passar de €40.
- **Estratégia de lance depende do histórico.** O guia indica CPC manual para conta nova sem dados e "maximizar conversões" quando há volume (seção 7). Eu havia definido "maximizar conversões sem meta" sem conhecer o histórico da conta. **Definir depois de ver o CID:** se a conta não tiver conversões de compra registradas, começar com CPC manual ou maximizar cliques com limite de CPC até aparecerem as primeiras conversões.
- **Risco de conversão duplicada.** O site tem tag do Google Ads e GA4. O guia manda não duplicar a mesma conversão (seção 10). Conferir se a compra não está sendo contada duas vezes (importada do GA4 e pela tag nativa).
- **Negativas só bloqueiam o termo literal** (seção 4): `led` não bloqueia `leds`/`lampe led` como sinônimo de outra forma. Revisar no relatório de termos.
- **Público em observação** (seção 9): adicionar segmentos "em mercado" e listas de remarketing em modo observação, sem restringir alcance.

