# Made in Colors (Noovamik)

> **Nunca** gravar valores de tokens ou senhas: só o nome e o local da credencial.

Atualizado em 19/11/2026.

## 1. Resumo
| Item | Valor |
|---|---|
| Campo `Cliente` no padrão | `MadeInColors` |
| Nome na dashboard | Noovamik - Made in Colors (Ecommerce) |
| Status | Ativo |
| Moeda | € (euro). Mercado europeu: FR, DE, UK, NL, CH |
| Idiomas | Francês e inglês |
| Site | https://madeincolors.com/ |
| Dashboard | https://metrics-odr.github.io/dash-madeincolors-store/ |
| Instagram | @made.in.colors |
| Contato da loja | Info@madeincolors.com |
| Briefing | **Não encontrado.** Pedir ao Eduardo onde está antes de criar/alterar campanhas |
| Conta Meta Ads / BM / Pixel / Página | **A confirmar** (não consta em `docs/contas.md`; conferir com `ads_get_ad_accounts`) |

## 2. Produto e oferta (lido do site em 19/11/2026)
Lâmpadas e líquidos para chama decorativa colorida ("a primeira chama decorativa colorida do mundo"). Chama pura, sem fumaça e sem cheiro, posicionada como alternativa segura às velas, para ambiente e presente.

| Produto | Preço | Observação |
|---|---|---|
| Coffret Serenity (Serenity Gift Set) | € 39,95 (de € 49,95) | Promoção Black Friday |
| Coffret Serenity + 1 L Green Flame | € 59,95 (de € 74,90) | |
| 2 Coffrets Serenity | € 69,95 (de € 99,90) | |
| Green 500 ml + 1 refil grátis | € 18,95 | |
| Green 1 L + 1 refil grátis | € 24,95 | |
| Green 3 L + 5 refis grátis | € 59,85 | |

- Oferta: banner de tempo limitado e Black Friday. Algumas listagens aparecem "Sold out": checar estoque antes de escalar.
- Frete: anunciado em 24–48 h; valor calculado no checkout.
- Proteção de encomenda opcional: € 3,90 (quebra, perda ou roubo).
- Klarna citado no rodapé (sem detalhes). Cupons: não vistos. Política de devolução: só o link, conteúdo não lido.
- Prova social: 10.000 chamas no fosso da Torre de Londres (nov/2018, 8 noites). Há seção para profissionais.
- Público: não declarado no site. Ângulos que a conta de busca já usa: presente, decoração, pendaison de crémaillère (housewarming), Natal.

## 3. Dashboard (leitura em 19/11/2026, 10:00 BRT)
- Os dados estão embutidos na página (JSON `payload`), período 01/11 a 19/11/2026. A leitura por fetch comum mostra tudo vazio; é preciso extrair o JSON do HTML.
- Páginas: Overview, Dashboards, Otimização (CAC por campanha/conjunto/anúncio/palavra-chave), Compradores, Relatório, Saúde do funil, Visão de campanha. Metas (CAC, ROAS, verba mensal) **não preenchidas**.
- Canais com dados: **só Google**. Meta, TikTok e Google Shopping aparecem como "sem dados" (páginas Meta e TikTok ocultas). Fonte de vendas: planilha.

### 3.1 Mídia (Google Ads), 12/11 a 19/11
Gasto zerado de 01 a 11/11; começou em 12/11.

| Campanha | Conjunto | Gasto | Impressões | Cliques |
|---|---|---|---|---|
| MIC_E6-VEN_P2-FRIO_CONV_CBO_2026-11-11_EN | AUTO_EN | € 109,44 | 3.548 | 173 |
| MIC_E6-VEN_P2-FRIO_CONV_CBO_2026-11-11_FR | AUTO_FR | € 78,80 | 1.927 | 88 |
| MIC_E6-VEN_P2-FRIO_CONV_CBO_2026-11-11_SHOP_EN | Shopping/PMax | € 0 | 26 | 0 |
| Performance Max-2 | Shopping/PMax | € 0 | 0 | 0 |
| **Total** | | **€ 188,24** | **5.501** | **261** |

Gasto por dia: 12/11 € 11,50 · 13/11 € 4,04 · 14/11 € 32,03 · 15/11 € 57,40 · 16/11 € 34,93 · 17/11 € 23,06 · 18/11 € 19,78 · 19/11 € 5,50 (parcial).
Gasto por país: Alemanha € 73,12 · Reino Unido € 47,92 · França € 29,25 · Holanda € 20,76 · Suíça € 0.
CPC médio ≈ € 0,72; CTR ≈ 4,7%.
Palavras-chave com mais gasto: housewarming gift (€ 51,32 / 79 cliques), lampe d'ambiance (€ 37,19 / 41), cadeau déco maison (€ 16,93 / 21), green flame lamp (€ 15,68 / 26), cadeau noël déco (€ 15,08 / 16).
**Compras atribuídas ao Google: 0** (coluna de compras e valor zerada em todas as linhas).

### 3.2 Vendas (planilha), 12/11 a 18/11
| Item | Valor |
|---|---|
| Pedidos | 9 linhas / 9 unidades |
| Receita total | € 1.165,00, **mas** inclui uma linha de € 844,80 (12/11, Coffret Serenity) fora do padrão de preço |
| Receita sem essa linha | ≈ € 320,20 |
| Origem de todas | `outros / direto`, sem campanha, conjunto ou anúncio |

Há também linhas de € 3,90, € 0,00 (16/11) e € 11,89, sugerindo frete, brinde ou valores parciais. A planilha não atribui nenhuma venda a Meta nem a Google.

### 3.3 Tráfego do site (GA), 09/11 a 19/11
| Origem | Page views | Visitantes | Add to cart | Checkout |
|---|---|---|---|---|
| Meta | 829 | 787 | 15 | 5 |
| Direto | 124 | 46 | 14 | 16 |
| Google (pago) | 100 | 27 | 2 | 0 |
| Google orgânico | 49 | 22 | 3 | 2 |
| Instagram orgânico | 35 | 17 | 2 | 1 |
| Outros / GPT | 50 | 32 | 2 | 3 |

## 4. Leitura e alertas (para a próxima análise)
1. **Meta Ads gera a maior parte do tráfego (787 visitantes) e 5 checkouts, mas a dashboard não tem gasto nem campanhas do Meta.** Falta ligar a conta Meta à dashboard, ou o dado não está sendo carregado. Sem isso não dá para calcular CAC/ROAS do Meta.
2. Google gastou € 188,24 e 261 cliques, mas só 27 visitantes pagos no GA e zero compra atribuída. Possível quebra de rastreamento (UTM/GCLID/conversão) ou campanha de baixa intenção. Conferir tag de conversão antes de julgar a campanha.
3. Todas as vendas caem em "direto", sem atribuição. A venda de € 844,80 distorce o total e precisa ser confirmada.
4. Metas de CAC, ROAS e verba mensal não definidas. Pedir ao Eduardo.
5. Janela curta (8 dias de gasto): sem base para otimizar verba. Seguir a regra do CLAUDE.md: só usar métricas dos prints/dashboard e perguntar a métrica principal do funil (compra).

## 5. Estratégia Google Search (definida em 19/11/2026)
Produto de **atenção, não de intenção**: quase ninguém busca "lâmpada de chama verde". O público compra por presente e decoração, então a busca precisa pegar a intenção de **comprar presente/decor**, não o produto. Volume é o limite; o foco é qualidade da busca, não quantidade.

**Dados da conta que sustentam isso (01–19/11):** as keywords que mais gastaram foram `housewarming gift` (€ 51, 79 cliques), `lampe d'ambiance` (€ 37) e `cadeau déco maison` (€ 17). Os conjuntos são `AUTO_EN` e `AUTO_FR`, ou seja, o Google escolhe os termos. Falta ver o relatório de **termos de pesquisa** (não está na dashboard) para saber o que realmente disparou.

**Temas de keyword (testar em grupos separados, EN e FR):**
1. Presente/ocasião (maior intenção de compra): `cadeau pendaison de crémaillère original`, `cadeau déco maison original`, `idée cadeau insolite`, `unique housewarming gift`, `gift for someone who has everything`, `christmas gift for home decor`.
2. Substituto de vela (problema real): `smokeless candle alternative`, `non toxic candle alternative`, `candle without smoke`, `bougie sans fumée`, `alternative bougie sans odeur`, `flameless candle` só se o produto fizer sentido.
3. Produto/marca (poucas buscas, mas convertem): `green flame lamp`, `green flame refill`, `lampe flamme verte`, `lampe à huile décorative`, nome da marca.
4. Decoração: `lampe d'ambiance`, `veilleuse originale`, `mood lamp gift`. Volume maior, intenção menor: limitar a verba.

**Estrutura:** 1 campanha Search por idioma/mercado, 1 grupo por tema, **correspondência de frase e exata**. Evitar ampla sem sinal forte de conversão. Parar de depender dos grupos `AUTO`. Mercados separados (FR, DE, UK, NL), com anúncio no idioma de cada um (hoje a Alemanha gasta mais do que a França e deve ter anúncio em alemão).

**Negativas desde o início:** `diy`, `recette`, `how to make`, `gratuit/free`, `pdf`, `led`, `electric`, `candle` solto, `chauffe-plat`, `pétrole`, `paraffin`, `oil lamp` industrial/camping, `wick` sozinho, `vintage`, `antique`, `jobs`, `wholesale`, nomes de concorrentes, além do que o relatório de termos mostrar.

**Anúncios (RSA):** vender o benefício e a oferta, não a especificação.
- Ganchos: "Chama verde, sem fumaça e sem cheiro", "Não tóxica", "Presente que ninguém espera", "A decoração que todos comentam", "Entrega em 24–48 h", preço e oferta Black Friday (Coffret Serenity € 39,95, de € 49,95).
- Fixar a headline 1 com o tema da busca (presente, vela, produto) para ficar relevante. Usar extensões de preço, sitelinks (Coffrets, Líquidos, Presentes) e promoção.
- Página de destino por tema: presente → Coffret Serenity; substituto de vela → página de benefício; marca → home.

**Alternativas para atenção (fora de busca pura):** como o produto é de descoberta, Search sozinho terá teto. Reforçar com PMax/Shopping e Demand Gen/YouTube e Meta, e remarketing por RLSA para quem já visitou (o Meta traz 787 visitantes). Search pega a demanda que o Meta cria.

**Antes de mexer:** confirmar rastreamento da conversão de compra (0 compras atribuídas em € 188 gastos) e pegar o relatório de termos de pesquisa. Sem conversão medida, a otimização por CPA fica cega.

### 5.1 Relatório de termos de pesquisa (CSV enviado em 19/11/2026)
Só o grupo `AUTO_FR` (o EN não veio no arquivo). 901 termos, 62 cliques, 1.429 impressões, € 57,10, **0 conversões**. Correspondência ampla: 613 termos, 45 cliques, € 41,90 (73% do gasto). Frase/aproximada: € 8,11. Exata (variante): € 5,35.
| Grupo de termos | Termos | Cliques | Custo |
|---|---|---|---|
| Presente / Natal / crémaillère | 203 | 18 | € 16,23 |
| Marcas e concorrentes (Kartell, Baccarat, Zara Home, Maison du Monde, Sklum, Partylite etc.) | 72 | 19 | € 22,15 |
| Decoração geral | 160 | 14 | € 10,95 |
| Lampe à huile / oil | 44 | 2 | € 2,25 |
| Flamme, vert, bougie, fumée | 23 | 0 | € 0 |

**Leitura:** o Google (ampla) está entregando impressão em tudo que é "lampe" e decoração, e 39% do gasto vai para clique em marca de concorrente (compra de móvel/luminária, sem relação com o produto). Cada termo tem ~1 impressão, então não há termo vencedor para escalar. As buscas realmente próximas do produto (`lampe à huile`, `bougie flamme`, `lampe effet flamme`) têm 1–16 impressões: demanda real é pequena. Os termos de presente mais úteis: `cadeau crémaillère original`, `idée cadeau noël maison`, `cadeau maison`, `lampe a huile en verre`.
**Ação:** pausar ampla; negativar marcas e itens de lampe (champignon, sel, lave, boule, pipistrello, Baccarat, Kartell, led); mover para frase/exata os termos de presente e de lampe à huile/bougie; separar anúncios por tema. Pendente: CSV do grupo `AUTO_EN` (gasto maior, € 109).

### 5.2 Lista de negativas (19/11/2026)
Base: CSV de termos do `AUTO_FR`. A parte EN é equivalente ao FR e **ainda não foi validada com o CSV do `AUTO_EN`**. Cadastrar como **frase** (exceto onde indicado). Nunca negativar `lampe`, `lamp`, `huile`, `oil`, `flamme`, `flame`, `cadeau`, `gift`, `bougie`, `candle`, `décoration`.
**Marcas e lojas (FR):** ikea, leroy merlin, maison du monde, zara home, h&m home, sklum, kartell, baccarat, adnet, mathmos, atmosphera, centrakor, la redoute, westwing, fleux, action, bazar, ampm, lexon, legami, fatboy, philips, artemide, tiffany, ralph lauren, partylite, leitmotiv, nature et decouverte, birdzen, meisenthal, pipistrello, poldina, formano, garrault delord, homing home, roomed, skitso, casagd, lumineo, lumio, sompex, cabanas, bic.
**Tipos de lâmpada fora do produto (FR):** champignon, lave, lampe à lave, lampe de sel, pierre de sel, himalaya, boule, tactile, touch, murale, lampadaire, chevet, abat-jour, tulipe, led, solaire, tiffany, murano, cristal, coquillage, ellipse, bambou, fleur, soja, veilleuse enfant, lampe de chevet, lampe de bureau, lampe à poser design, luminaire, applique, suspension, lustre.
**Intenção errada (FR):** comment, faire soi-même, diy, tuto, tutoriel, recette, gratuit, pdf, pas cher, occasion, ancienne, vintage, imitation, dupe, réparer, mode d'emploi, magasin près de moi, emploi, recrutement, grossiste, revendeur, brocante, leboncoin.
**Combustível/vela (FR) — negativar em frase para não bloquear o produto:** paraffine, pétrole, lampe à pétrole, lampe tempête, mèche seule, bougie parfumée, bougie led, bougie électronique, bougie chauffe-plat, chauffe-plat, cire, soja, bougeoir.
**Decoração fora do foco (FR):** vase, tableau, miroir, rideau, tapis, coussin, mur blanc, décorer un mur, cadre, horloge, guirlande, sapin, crèche, weihnachtsdeko, deko, wohnzimmer.
**EN:** ikea, kartell, mathmos, zara home, lava lamp, salt lamp, himalayan, mushroom lamp, touch lamp, led, solar, floor lamp, table lamp, desk lamp, bedside, chandelier, pendant, wall light, tiffany, murano, crystal, diy, how to, tutorial, recipe, free, pdf, cheap, used, second hand, vintage, antique, repair, manual, jobs, wholesale, supplier, near me, paraffin, kerosene, hurricane lamp, wick only, tea light, scented candle, led candle, electric candle, soy wax, candle holder, candle making, wax, vase, mirror, curtain, rug, cushion, wall art, clock, fairy lights, christmas tree, nativity.
**Não negativar:** `pendaison de crémaillère`, `housewarming`, `idée cadeau`, `cadeau maison`, `déco maison`, `lampe à huile en verre`, `flamme`, `flame`, `green`, `vert`.

### 5.3 Regras de anúncio definidas pelo Eduardo
- **Não mencionar preços nem percentual de desconto nos títulos** dos anúncios (nem "dès 39,95€", nem "-20%"). Black Friday pode aparecer sem número.
- Fixar no máximo 1 título (o do tema da busca). Marca "Made in Colors" não fixada em posição 1.
- **Toda sugestão de título, descrição ou keyword em FR/EN deve vir com a tradução para português ao lado** (tabela `Idioma original | Português`).
- Um anúncio por tema (produto/benefício, presente, substituto de vela), cada um no seu grupo.

### 5.4 Anúncios RSA em francês (19/11/2026) — **SUPERADO, NÃO USAR**
> Esta versão tinha oferta pontual (Black Friday), sem CTA e sem benefício, e foi feita sem ler os documentos de boas práticas. Versão válida: anúncio 1 (produto) refeito em 19/11/2026 seguindo o G002; presente e substituto de vela pendentes de refazer no mesmo molde.

(texto antigo, só histórico):
Três anúncios, um por tema. Título fixado na posição 1 e 15 títulos + 4 descrições por anúncio. Conferir o contador do Google ao colar.
- **Produto e benefício** (fixar `Lampe à Huile Flamme Verte`): Flamme Verte Sans Fumée · Sans Fumée, Sans Odeur · Flamme Verte Non Toxique · Une Flamme Verte Unique · Lampe à Huile Sans Odeur · Lampe à Huile Sans Fumée · Huile Flamme Verte · Recharge Flamme Verte · Déco Flamme Colorée · La Première Flamme Colorée · Découvrez le Coffret Serenity · Offre Spéciale Black Friday · Livraison en 24-48 h · Made in Colors.
- **Presente** (fixar `Cadeau Original Pour la Maison`): Idée Cadeau Noël Insolite · Cadeau de Crémaillère Original · Cadeau Déco Maison Original · Cadeau Noël Original · Un Cadeau Qui Surprend · Cadeau Pour Qui a Tout · Idée Cadeau Déco Insolite · Flamme Verte à Offrir · Coffret Cadeau Serenity · Offrez une Flamme Verte · Sans Fumée, Sans Odeur · Offre Spéciale Black Friday · Livraison en 24-48 h · Made in Colors.
- **Substituto de vela** (fixar `Alternative à la Bougie`): Bougie Sans Fumée ni Odeur · Remplacez Vos Bougies · Flamme Pure, Sans Odeur · Flamme Verte Non Toxique · Lampe à Huile Sans Fumée · Ambiance Bougie, Sans Fumée · Une Flamme Qui Surprend · Lampe à Huile Flamme Verte · La Flamme Verte Chez Vous · Déco Flamme Colorée · Découvrez le Coffret Serenity · Offre Spéciale Black Friday · Livraison en 24-48 h · Made in Colors.
- Descrições e traduções PT completas foram entregues na conversa de 19/11/2026. Versão EN pendente.

### 5.5 Público e motivação (hipótese de 19/11/2026, validar com avaliações e compradores)
O comprador compra a solução de um momento, não uma lâmpada. Cada anúncio fala com uma pessoa:
| Pessoa | Termos reais | Urgência oculta | Motivação |
|---|---|---|---|
| Presenteador com prazo | cadeau crémaillère original, idée cadeau noël, cadeau maison | Data marcada (Natal, casa nova) e medo de presente banal | Ser lembrado, surpreender |
| Anfitrião | décorer, lampe d'ambiance salon | Visita chegando, sala sem ponto focal | Impressionar, gerar conversa |
| Quem quer desacelerar | lampe d'ambiance, ambiance zen | Esgotado, quer ritual de calma | Mudar o clima rápido |
| Incomodado com vela | bougie sans odeur, lampe effet flamme | Fumaça e cheiro estragam o clima | Manter a chama sem o incômodo |
| Curioso do Meta | flamme verte, flamme colorée | "O que é isso?" | Curiosidade |
Momentos: ceia de Natal, jantar a dois, noite com amigos, casa nova, depois do trabalho. Não afirmar nada sobre alergia, asma, crianças ou animais (o site só diz "não tóxico").
Copy por pessoa (FR + PT) entregue na conversa de 19/11/2026: anúncio Presente (medo de presente banal), Ambiente (receber e relaxar) e Substituto de vela (incômodo). Palavras-chave por momento: cadeau noël maison, cadeau couple original, idée déco salon, ambiance romantique maison, lampe détente, bougie sans fumée.
Validar: avaliações e comentários do Instagram (@made.in.colors) e pergunta aos compradores da planilha.

### 5.6 Anúncio "Sérénité" (direção do Eduardo, 19/11/2026)
Direção: criar clima de paz e serenidade para momentos com amigos, meditação ou descanso; a lâmpada de chama verde produz ambiente impressionante e aconchegante. Sem preço, sem oferta pontual, sem afirmação de saúde (meditação e descanso são momentos de uso, não promessa).
- Palavras-chave (frase/exata, FR): lampe à huile flamme verte, lampe flamme verte, lampe ambiance zen, lampe zen déco, déco zen salon, lampe méditation, ambiance méditation maison, lampe détente, ambiance relaxante maison, lampe à huile décorative, lampe à huile en verre, déco méditation, lampe ambiance apaisante, idée déco zen, lampe à flamme décorative.
- Títulos: Lampe Zen à Flamme Verte (fixar pos. 1) · Lampe à Huile Flamme Verte · Ambiance Zen et Sereine · Lampe Méditation Flamme Verte · Une Flamme Verte Apaisante · Sérénité en Un Instant · Déco Zen Qui Impressionne · Moments Calmes entre Amis · Méditation, Repos, Détente · Une Lumière Douce et Verte · Sans Fumée, Sans Odeur · Chaleur et Calme chez Vous · Créez Votre Coin Zen · Découvrez la Serenity · Commandez Votre Lampe.
- Descrições: ver conversa de 19/11/2026 (FR + PT).
- Descrições aprovadas para uso (direção do Eduardo): "Paix et sérénité entre amis, pour méditer ou vous reposer. Découvrez la lampe." · "La lampe à flamme verte crée une ambiance impressionnante et chaleureuse. Commandez." · "Impressionnez amis ou clients avec cet élément de décoration fantastique. Commandez."

### 5.7 Sitelinks (19/11/2026)
Página lida: https://madeincolors.com/products/serenity ("Serenity Gift Set": lâmpada Serenity, 0,5 L de líquido, 2 mechas, 1 funil, caixa de presente; ~40 h de chama; "no smoke or odor"; "non-toxic liquid"; não inflamável se derramar; testado pelo LNE; recarregável; entrega 24–48 h, "ships within 24 h"; devolução em 30 dias; nota 5.0 com 87 avaliações; usos citados: relaxar, jantares, ioga, meditação).
- **Atenção:** a página diz que envia em até 24 h (não 12 h). Antes de usar "expédié sous 12h" em anúncio, confirmar com o cliente. A página também mostra "Sold out" perto do botão: verificar estoque antes de mandar tráfego.
- Sitelink 1 (URL /products/serenity): título "Coffret Serenity" · desc 1 "Flamme verte sans fumée ni odeur" · desc 2 "Prêt à offrir, livraison 24-48 h".
- Parâmetros de rastreamento (URL final suffix): `utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_content=sitelink_serenity`. Conferir se o rastreamento automático (gclid) está ativo.
- Sitelinks adicionais sugeridos devem apontar para páginas diferentes (não repetir a URL da Serenity).

## 6. Pendências
- [ ] Localizar o briefing do cliente.
- [ ] Confirmar conta Meta Ads (ID), BM, pixel e página/Instagram e registrar aqui e em `docs/contas.md`.
- [ ] Definir metas (CAC, ROAS, verba mensal) e funis/nomenclatura das campanhas.
- [ ] Entender por que o Meta não aparece na dashboard.
- [ ] Confirmar a venda de € 844,80 e o rastreamento de conversão do Google.
- [ ] Ler a política de devolução e confirmar frete grátis/valor mínimo.

## 7. Histórico de mudanças
| Data | Mudança |
|---|---|
| 19/11/2026 | Sitelink da Serenity e parâmetros de rastreamento (5.7). |
| 19/11/2026 | Anúncio Sérénité (paz, amigos, meditação, descanso) salvo (5.6). |
| 19/11/2026 | Público, urgência e motivação por tema (5.5). |
| 19/11/2026 | Anúncios RSA FR por tema salvos (5.4). |
| 19/11/2026 | Regras de anúncio (sem preço nos títulos) salvas (5.3). |
| 19/11/2026 | Lista de negativas FR/EN salva (5.2). |
| 19/11/2026 | Análise do relatório de termos de pesquisa (AUTO_FR). |
| 19/11/2026 | Adicionada estratégia Google Search (atenção vs intenção). |
| 19/11/2026 | Arquivo criado com leitura do site e da dashboard. Nada alterado no Meta Ads. |
