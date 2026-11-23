# MedNexus — Briefing e ficha do cliente

> Briefing montado em 23/11/2026 a partir da leitura direta das contas Meta (CA1 e CA2) e dos criativos. Tudo que está marcado **Não verificado** ou **A confirmar com o Eduardo** não é fato: perguntar antes de usar.
> Guia operacional da conta (mínimos, rascunho, status): [../mednexus.md](../mednexus.md). Contas: [../contas.md](../contas.md).
> Nunca gravar tokens ou senhas aqui.

Atualizado em 23/11/2026.

## 1. Resumo
| Item | Valor |
|---|---|
| Campo `Cliente` no padrão | `MedNexus` |
| Status | Ativo |
| O que a MedNexus vende | Serviço de **captação de pacientes para médicos** (promessa: "agenda cheia, sem o médico investir em anúncios ou marketing") |
| Público-alvo dos anúncios | **Médicos**, Brasil, 25 a 65 anos (cargos e formações de medicina) |
| Funis | `LEAD-ADS` (formulário nativo), `PURCHASE` (landing page + pixel). Históricos: `MQL`, `SUBSCRIBE`, `MESSAGE`/WhatsApp |
| Página de destino (venda) | https://mednexus.com.br/agenda-cheia |
| Pasta no n8n | Não verificado |
| Briefing | Este arquivo (não existia briefing anterior no repositório nem no Drive) |

## 2. Contas e ativos Meta
| Item | Valor |
|---|---|
| Business (BM) | Mednexus (`917258955839990`) |
| **CA1** — MedNexus - CA1 | `900675294624191`, BRL. Conta principal de testes e vendas ([guia](../mednexus.md)) |
| **CA2** — MedNexus - CA2 | `621590540931248`, BRL. Hoje roda anúncios MedNexus de Lead Ads. Os docs antigos a tratam como "Clínica Mantelli"; as campanhas antigas de captação e seguidores das páginas Dra. Erica e Dr. Domingos Mantelli estão pausadas e sem gasto |
| Página | **Mednexus** (`847417098465386`). Termos de Lead Ads aceitos |
| Instagram | `17841478226747743` |
| Threads | `17841443447950010` |
| Formulário nativo (CA2) | `1859001165259794`, usado nos anúncios de Lead Ads. O ID só aparece lendo o rascunho de um anúncio duplicado, não na leitura direta do criativo |
| Pixels da CA2 | Pixel Clínica Mantelli (`907106735622332`), Pixel CDM (`1086208922869008`), Clinica Mantelli - CA01 Pixel (`1255766755963910`). **Não existe "Pixel1" na CA2**; os Lead Ads com formulário nativo não usam pixel |
| Pixel da CA1 | Não verificado |
| Público de exclusão (CA1, Purchase) | `Lista \| Compradores \| MedNexus - 2026-07-02` (`120250027354210463`) |
| Mínimo diário por conjunto | R$ 5,70 (campo da conta, `min_daily_budget_cents` = 570) |

## 3. Nomenclatura das campanhas
Padrão: `MEDNEXUS | <ESTRATÉGIA> | <PÚBLICO> | CONV | <FUNIL> | <CBO/ABO> | AAAA-MM-DD | <detalhe>`

| Código | Leitura (inferida pelo uso, confirmar) |
|---|---|
| `E6-VEN` | Estratégia de venda (campanhas atuais) |
| `E2-CAP` | Estratégia de captação (MQL, jun/jul) |
| `P2-FRIO` / `P1-QUENTE` | Público frio / público quente |
| `LEAD-ADS`, `PURCHASE`, `SUBSCRIBE`, `MESSAGE`, `MQL` | Funil / evento |

Conjuntos: `01 | AUTO | Interesses | <anúncio>` (conjunto por anúncio ou por grupo). Anúncios: `adNN_vid_MedNexus-<tema>` (vídeo) e `adNN_est_MedNexus-<tema>` (estático). Os anúncios "AD01" não identificam o criativo: sempre cruzar com o ID e a campanha.

## 4. Funis e resultados (leitura de 23/11/2026)
Atribuição padrão do Meta: 1 dia de visualização + 7 dias de clique. Não é a dashboard do cliente.

### 4.1 LEAD-ADS (formulário nativo no anúncio)
| Campanha | Gasto | Leads | CPL | Status |
|---|---|---|---|---|
| 19/10 AD01 (ABO, 3 conjuntos) | R$ 3.071 | 114 | **R$ 26,94** | Ativa |
| 06/10 Teste Ads (CBO) | R$ 4.583 | 136 | R$ 33,70 | Pausada |
| 02/09 (CBO) | R$ 1.721 | 57 | R$ 30,19 | Pausada |
| 06/11 Teste de Público (ABO) | R$ 1.171 | 40 | R$ 29,26 | Pausada |
| 21/10 AD52 (CBO) | R$ 727 | 14 | R$ 51,90 | Pausada |
| 17/11 AD01 CostCap (CBO, lance com teto) | R$ 370 | 8 | R$ 46,29 | Ativa |
| CA2 06/11 AD01 (ABO) | R$ 407 (30 dias) | 13 | R$ 31,30 | Ativa |
| CA2 17/11 Teste de Ads (ABO) | R$ 295 | 10 | ~R$ 30 | Ativa (AD87 e AD89 pausados) |

Leituras:
- O CPL estável de prospecção está na faixa de **R$ 23 a R$ 34**. Lance com teto (CostCap) piorou o CPL e o CPM; o padrão que funciona é "maior volume".
- CPM dos Lead Ads na CA1 fica em **R$ 134 a R$ 294**: o público de médicos é pequeno e caro. Verba baixa limita a entrega.
- O resultado em leads não mede qualidade. **Leads qualificados (`QUALITY_LEAD`) foi recusado pelo Meta** na CA2 (erro 1815169, "Invalid performance goal"). Provavelmente exige integração de conversão/CRM, **a confirmar**.

### 4.2 PURCHASE (landing page + pixel)
Campanhas "1-3-1" (1 campanha, 3 conjuntos, 1 anúncio por conjunto), CBO, destino `https://mednexus.com.br/agenda-cheia`, otimização para compra (`OFFSITE_CONVERSIONS`), excluindo a lista de compradores.

| Campanha | Gasto | Compras | Custo por compra |
|---|---|---|---|
| 30/09 1-3-1 AD01 (pausada) | R$ 2.756 | 8 | R$ 344 |
| 30/09 1-3-1 AD01 V2 (ativa) | R$ 1.746 | 5 | R$ 349 |
| 30/09 Teste de Ads 8 (pausada) | R$ 1.007 | 4 | **R$ 252** |
| 11/08 1-3-1 AD01 (pausada) | R$ 7.825 | 7 | R$ 1.118 |
| 01/09 BidCap (pausada) | R$ 1.819 | 2 | R$ 910 |
| "Para substituir a vencedora" (pausada) | R$ 10.446 | 1 | R$ 10.446 |

Leituras:
- O custo por compra atual fica entre **R$ 250 e R$ 350**, bem abaixo do histórico (R$ 900 a R$ 10.000).
- Funil medido: visualização de conteúdo → carrinho → checkout → compra (ex.: 30/09 AD01: 96 → 22 → 10 → 8).
- Remarketing quente não funcionou: `P1-QUENTE Teste Hot` (11/09) gastou R$ 829 sem compra; MQL Remarketing (jul) teve CPL de R$ 73.
- **Não há ticket médio, LTV nem meta de CPA neste repositório.** Sem isso não dá para dizer se R$ 250 a R$ 350 por compra é bom. **A confirmar com o Eduardo.**

### 4.3 Históricos (pausados)
`MQL` (jun/jul, CPL R$ 59 a R$ 79), `SUBSCRIBE` (jun, objetivo de vendas com evento Subscribe), `MESSAGE` (WhatsApp, set), formulários antigos `[CAPTURA] [FORMS]` (CPL R$ 17 a R$ 49, volume baixo) e as campanhas `[VENDA DIRETA]` antigas. **Nos últimos 90 dias não existe nenhum evento Subscribe na conta**: se o Eduardo falar em "subscribe", confirmar qual evento é.

## 5. Público, posicionamento e lance (padrão atual)
- **Geografia:** Brasil (residentes e recentes).
- **Idade:** 25 a 65.
- **Segmentação:** formações (Dermatologia, Cirurgia plástica) e **cargos de médico** (Doctor, MD, Dermatologist, Cardiology, Pediatrics, Anesthesiologist, Urologist, Radiologist, Endocrinologist, Orthopedic, OB/GYN etc.). Conjuntos "Top Ads" usam lista parecida, um pouco menor.
- **Advantage audience: desligado** nos conjuntos atuais (todos prospecção fria). Ao criar conjunto novo pela ferramenta, ela liga sozinha; conferir e avisar.
- **Posicionamentos:** automáticos (Advantage+): Facebook, Instagram e WhatsApp Status; Threads nos conjuntos de Purchase da CA1; Audience Network nos conjuntos da CA2.
- **Lance:** maior volume (padrão). Tetos de lance (CostCap, BidCap) já foram testados e pioraram.
- **Público quente:** SEMPRE desligar o Advantage audience (regra do CLAUDE.md).

## 6. Criativos e copy
**Promessa principal:** "Médico, receba pacientes prontos para agendar. Agenda cheia. Sem investir em anúncios em marketing e sem stress."

| Funil | Botão | Destino |
|---|---|---|
| Lead Ads | Cadastre-se (`SIGN_UP`) | Formulário nativo `1859001165259794` |
| Purchase | Saiba mais (`LEARN_MORE`) | `https://mednexus.com.br/agenda-cheia`, título "Atenção você Médico", `url_tags`: `utm_content={{ad.id}}` |

**Desempenho por criativo** (30 e 90 dias; só vale onde há volume):
| Criativo | Onde rodou | Resultado | Leitura |
|---|---|---|---|
| `ad49` médico-maneira-mais-facil | Lead Ads (CA1) | 20 leads, CPL R$ 32 | Melhor volume entre os nomeados |
| `ad83` Motion | Lead Ads (CA1) | 12 leads, CPL R$ 30 | Menor CPL entre os nomeados |
| `ad88` IA-thiago | Lead Ads (CA2) | 6 leads, CPL R$ 17,77 | CTR 3,21% contra mediana de 2,05% dos pares. Volume ainda pequeno |
| `ad77` UGC médico-receba-novos | Purchase (CA1) | 4 compras, R$ 121 | Único criativo diferente com venda e com Content View |
| `ad84` aumente-25%-sua-agenda | Lead Ads (CA1) | CPC R$ 3,73, CPL R$ 43 | Clica barato, formulário converte mal |
| `ad52` receba-pacientes-grátis | Lead Ads | CPL R$ 41 e R$ 75 | Variou muito entre conjuntos |
| `ad64`, `ad85`, `ad86`, `ad70`, `ad71`, `ad89`, `ad90` | vários | CPL R$ 36 a R$ 97 ou sem lead | Pouco volume ou CPL alto |

Regras de mídia (CLAUDE.md): usar a mídia original, sem mídia relacionada, posicionamentos conforme proporção; em público frio manter as melhorias automáticas como no modelo.

## 7. Estado atual (retrato de 23/11/2026)
**CA1 ativa:** Lead 19/10 AD01 (3 conjuntos de R$ 20, R$ 20 e R$ 30), Lead 17/11 CostCap (CBO R$ 50), Purchase 30/09 V2 (CBO R$ 100), Purchase 30/09 V3 (CBO R$ 60).
**CA2 ativa:** 06/11 AD01 (R$ 50) e 17/11 Teste de Ads (AD88 R$ 50 e AD90 R$ 20).
**Rascunho em andamento:** campanha `Reteste` na CA2 (`120257101720670242`) com ad49, ad83 e ad84; falta o ad77 ([ver histórico](#11-histórico-de-mudanças)).

Indicadores da CA2 (leitura de 23/11/2026): score de oportunidade 89/100. Recomendações do Meta: combinar os conjuntos AD88 e AD90 (público parecido, fragmentação; +6 pontos) e usar vídeo vertical 9:16 com áudio em Reels (cerca de 8% menos custo por resultado no AD90).

## 8. O que é importante saber (aprendizados)
1. **Lead Ads prospecção fria funciona em escala moderada** a R$ 23 a R$ 34 por lead; é onde está a maior parte do volume.
2. **Venda direta por compra** saiu de R$ 900+ para R$ 250 a R$ 350 por compra com o 1-3-1 e exclusão de compradores. É o funil mais caro por resultado e o que mais exige medir ticket.
3. **Teto de lance não ajuda** (CostCap e BidCap pioraram).
4. **Remarketing não deu retorno** até aqui.
5. **O mesmo criativo se comporta diferente** entre conjuntos e contas: avaliar com volume, não por 1 ou 2 resultados.
6. **O formulário de Lead Ads é o mesmo em todas as campanhas** da CA2; não trocar e não usar link de site no lugar.
7. **`QUALITY_LEAD` não é aceito hoje.** O padrão é `LEAD_GENERATION`.
8. Mudança de orçamento reinicia o aprendizado; CPM alto com verba baixa reduz a entrega.

## 9. Pendências (para o Eduardo)
- [ ] Ticket médio, LTV, meta de CPL e de CPA da MedNexus.
- [ ] Como o lead do formulário vira venda: quem atende, em quanto tempo, e qual CRM/planilha recebe (ver `docs/clientes/` e n8n; **não verificado**).
- [ ] Definição de "lead qualificado" para a MedNexus (campos do formulário, filtros).
- [ ] Pixel da CA1 e quais eventos ele dispara (Purchase, Subscribe, Lead).
- [ ] Formulário da CA1 (o ID só foi lido na CA2).
- [ ] Se Subscribe ainda é um evento a medir.
- [ ] Contas Mantelli (Dra. Erica e Dr. Domingos): continuam como cliente? Hoje estão paradas.
- [ ] Campo `Cliente` no n8n e pasta: confirmar se já existe.

## 10. Como usar este briefing
- Antes de criar ou duplicar campanha da MedNexus, ler este arquivo e [../mednexus.md](../mednexus.md).
- Pedido de verba, otimização ou reteste: usar as seções 4 e 6 como base e perguntar o que estiver em "Pendências".
- Toda alteração relevante: registrar na seção 11 e na linha do cliente em [README.md](README.md).

## 11. Histórico de mudanças
| Data | Mudança |
|---|---|
| 23/11/2026 | Briefing criado a partir da leitura das contas CA1 e CA2. Rascunho da campanha `MEDNEXUS \| E6-VEN \| P2-FRIO \| CONV \| LEAD-ADS \| ABO \| 2026-11-23 \| Reteste \| CA2` (`120257101720670242`): conjunto `120257101721750242` (R$ 50/dia, Leads), anúncios ad49 `120257101731540242`, ad83 `120257101737850242`, ad84 `120257101739710242`. Faltam: ad77 (vídeo não baixável) e a conferência do Advantage audience |
