# Made In Color — Estrutura de campanha de Pesquisa (Google Ads)

**Status: PROPOSTA para aprovação (nada foi criado em conta; sem integração de API).** Data: 11/11/2026.
Pendências antes de subir: CID da conta, briefing do cliente, margem (para meta de ROAS), confirmação de frete/prazo por país, relatório LNE.

## 1. Premissas fechadas
- **Verba total:** €40/dia.
- **Países:** França, Bélgica, Países Baixos, Alemanha, Luxemburgo.
- **Idiomas do site:** francês e inglês. Francês para França e Bélgica; inglês para os demais.
- Todos os países são da UE (moeda EUR, sem alfândega). Alemanha e Países Baixos em **inglês** alcançam só quem pesquisa em inglês (ver riscos).

## 2. Estrutura

| # | Campanha | Países | Idioma (do usuário) | Verba/dia | Destino |
|---|---|---|---|---|---|
| A | `PESQ | FR | França+Bélgica | Aquisição` | França, Bélgica | Francês | €22 | `madeincolors.com/` |
| B | `PESQ | EN | NL+DE+LU+BE | Aquisição` | Países Baixos, Alemanha, Luxemburgo, Bélgica | Inglês | €14 | `madeincolors.com/en/` |
| C | `PESQ | Marca | 5 países` | Todos os 5 | **Todos os idiomas** | €4 | `/` (FR) e `/en/` (EN) por anúncio |

- A **Bélgica** entra em A (francês) e em B (inglês). Não há sobreposição, porque o idioma da campanha separa os usuários (um flamengo com Google em inglês cai em B; um valão com Google em francês cai em A). Quem usa holandês/alemão no navegador **não é alcançado** por A nem B.
- **Nomes definitivos** devem seguir o padrão do cliente/Eduardo (ex.: `MADEINCOLORS_VEN_FRIO_SEARCH_..._2026-11-11_...`); os de cima são provisórios.

### Grupos de anúncios
**A (FR):** Categoria · Diferencial · Presente · Refil
**B (EN):** Categoria · Diferencial · Presente (opcional, ver nota) · Refil
**C (Marca):** Marca (um grupo FR, um EN)

> Nota: com €14 em B, começar B **sem** "Presente" e com 3 grupos (Categoria, Diferencial, Refil). Presente em inglês é genérico e caro.

## 3. Configurações comuns
| Item | Valor |
|---|---|
| Rede | Só Pesquisa (sem parceiros de pesquisa, sem Display) |
| Local | "Presença" (não "presença ou interesse") |
| Correspondência | **Frase e exata**; sem ampla; AI Max desligado |
| Lance (semanas 1–2) | **Maximizar conversões**, sem meta de CPA |
| Lance C | Maximizar conversões, ou participação de impressões ~90% no topo |
| Conversão primária | **Compra com valor** (só primária relevante; adicionar ao carrinho como secundária) |
| Programação | Todos os dias, 24 h |
| Dispositivos | Todos |
| Públicos | Em **observação** (não restringir) |
| Ativos | Sitelinks, snippets, preço, promoção, imagem, logo |
| Medição | Consent Mode v2 + CMP verificado na UE; auto-tagging ligado; UTMs conforme análise anterior |

## 4. Palavras-chave (frase e exata; volumes ainda não medidos)

### A — Francês
**Categoria:** `lampe à huile décorative`, `lampe d'ambiance`, `lampe à flamme décorative`, `déco de table flamme`, `lampe à huile design`
**Diferencial:** `flamme colorée`, `flamme verte`, `lampe flamme verte`, `lampe à flamme de couleur`
**Presente:** `cadeau déco maison`, `cadeau original déco`, `cadeau pendaison de crémaillère`, `cadeau lampe à huile`
**Refil:** `recharge lampe à huile`, `liquide pour lampe à huile`, `huile pour lampe sans odeur`, `mèche pour lampe à huile`, `liquide flamme verte`

### B — Inglês
**Categoria:** `decorative oil lamp`, `modern oil lamp`, `table oil lamp`, `ambient lamp with flame`
**Diferencial:** `colored flame lamp`, `green flame lamp`, `colored flame oil lamp`
**Refil:** `oil lamp refill`, `lamp oil refill`, `smokeless lamp oil`, `green flame liquid`
*(Presente opcional: `gift for home decor`, `unique home decor gift`)*

### C — Marca (mesmas palavras em qualquer idioma)
`madeincolors`, `made in colors`, `madeincolors serenity`, `serenity lampe madeincolors`, `green flame liquide`

## 5. Negativas (listas compartilhadas por idioma)

**FR:** `led`, `électrique`, `piles`, `batterie`, `solaire`, `parfum`, `diffuseur`, `catalytique`, `maison berger`, `pétrole`, `kérosène`, `essence`, `alcool`, `éthanol`, `expérience`, `chimie`, `sel`, `cuivre`, `borax`, `acide borique`, `comment faire`, `diy`, `tuto`, `feu d'artifice`, `fumigène`, `gratuit`, `occasion`, `lampe à lave`, `jeu`
**EN:** `led`, `electric`, `battery`, `solar`, `perfume`, `diffuser`, `kerosene`, `paraffin`, `ethanol`, `alcohol`, `experiment`, `chemistry`, `salt`, `copper`, `borax`, `boric acid`, `how to`, `diy`, `tutorial`, `fireworks`, `smoke bomb`, `free`, `used`, `lava lamp`, `game`, `minecraft`

Negativas cruzadas entre grupos A/B (para um grupo não roubar o termo do outro) devem ser conferidas no relatório de termos na 1ª semana.

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
- Distribuir cada grupo para os títulos mais relevantes (ex.: Refil usa 9, 7, 14; Presente usa 5, 6, 13); fixar o mínimo possível.
- Torre de Londres: **não** usar em anúncio sem comprovação da marca; manter só no sitelink/página.

## 7. Ativos
**Sitelinks:** Serenity (`/products/serenity`) · Liquide/Refil (`/collections/green-flame-liquide`) · Nos Coffrets (`/collections/serenity-pack`) · Notre histoire (`/pages/notre-histoire`) · Instructions (`/pages/instructions`) · Rapport LNE (`/pages/rapport-dessai-officiel`)
**Snippets (Tipos):** Serenity, Green Flame
**Destaques:** Sans fumée ni odeur · Retours 30 jours · Expédition 12 h · Marque française
**Preço, promoção, imagem, logo.**

## 8. Riscos e limites
1. **Alemanha e Países Baixos em inglês:** só pegam quem tem Google em inglês. O volume pode ser baixo e a conversão menor. Se não render nas 2–3 primeiras semanas, o caminho é traduzir o site (DE/NL) e criar campanhas por idioma.
2. **B com €14/dia:** pode ficar abaixo do mínimo para o lance automático aprender. Se acontecer, concentrar B em Países Baixos + Bélgica.
3. **Natal:** CPC mais alto em nov/dez. Janela de aprendizado de 2 semanas já consome parte.
4. **Ainda sem validar:** volume de busca, CPC e taxa de conversão; política de produto do líquido (checar no Policy Manager ao subir).
5. **Dados do site a corrigir:** avaliações inconsistentes (5,0·87 vs 4,96·24); escassez ("édition limitée"); consentimento de cookies.

## 9. Passo a passo de lançamento
1. Confirmar CID, briefing, margem, relatório LNE, frete por país.
2. Conferir Consent Mode v2 e a conversão de compra com valor.
3. Criar A, B e C com as configurações da seção 3; subir negativas.
4. Cadastrar RSAs e ativos; conferir reprovações.
5. Semanas 1–2: sem alterar lances/metas; checar termos de pesquisa a cada 2–3 dias.
6. Dia 14–21: avaliar CPA/ROAS por campanha e por país; só então definir meta de ROAS e redistribuir verba.
