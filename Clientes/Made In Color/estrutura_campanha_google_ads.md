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

**Total: 33 palavras por campanha** (cada uma em frase e exata).

**Observações (a validar):**
- `serenity lampe` foi **removida**: "Lampe Serenity" também é produto da Maison Berger e traria tráfego de outro produto.
- Em inglês, `green flame` e `colored flame` tendem a trazer ruído (jogos, química). Em francês, `flamme verte` também traz química. Ficam em frase/exata, com negativas.
- `lamp oil` (inglês) é amplo e atrai quem busca querosene/parafina; depende das negativas.
- `madeincolors code promo` / `promo code` atrai caçadores de cupom: só manter se houver cupom real.
- `cadeau pendaison de crémaillère` / `housewarming gift` é genérico: vigiar no relatório de termos.
- Grafia `colored` (EUA) × `coloured` (Reino Unido): checar no Planejador qual predomina em NL e DE.

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
2. La Première Flamme de Couleur
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
**Títulos:** Green Flame Decorative Lamp · The First Colored Flame Lamp · Decorative Oil Lamp · No Smoke, No Odor · Original Gift Idea · Gift-Ready Box · Real Colored Flame · Green Flame Refill · French Brand · From €39.95 · 30-Day Returns · Unique Home Ambiance · Fast Shipping in Europe
**Descrições:**
1. A real green flame with no smoke or odor. Serenity box from €39.95.
2. Lamp, liquid and wicks included. Gift-ready, shipped within 12 hours.
3. 30-day returns. Liquid tested by the LNE lab. Discover the green flame.
4. Refill your lamp: Green Flame liquid from €18.95, wick included.

### Regras de copy
- **Não usar:** "pode beber", "não queima", "100% seguro", "não tóxico", "não inflamável". "Testé par le LNE" só com o relatório em mãos.
- **Verificar antes de publicar:** preço (€39,95 / €18,95), "expédié sous 12 h" e "30 jours" (confirmados no site em 11/11); prazo de entrega por país (a promessa "24–48h" pode não valer para NL/DE/LU).
- Com grupo único, o RSA cobre lâmpada, presente, marca e refil: usar títulos de todos os temas e **não fixar** posições, para o Google combinar.
- Torre de Londres: **não** usar em anúncio sem comprovação da marca; manter só no sitelink/página.

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
