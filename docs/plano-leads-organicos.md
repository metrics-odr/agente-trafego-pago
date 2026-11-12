# Plano: 1 lead por dia, 100% orgânico — eduardomezzavilla.com.br

**Versão:** v3 · **Atualizado em:** 12/11/2026 · **Operação:** 1 pessoa, ~6 a 8h por semana

---

## 1. Público-alvo (ICP)
**Empresas e profissionais que geram leads e investem pelo menos R$ 10 mil/mês em tráfego pago.**

- **Quem decide:** dono do negócio, head de marketing ou comercial. Já tem time de vendas (SDR/closer) ou atendimento que trabalha os leads.
- **Modelos típicos:** high ticket e sessão estratégica, mentorias, lançamento com captação, inside sales, clínicas e saúde, serviços profissionais (advocacia etc.), educação, B2B.
- **Dores de quem investe R$ 10 mil+/mês:**
  - O CPL parece bom, mas o comercial reclama da qualidade dos leads.
  - Não sabe qual campanha ou anúncio gera **MQL, reunião e venda**, só lead.
  - Os dados não chegam do formulário ao CRM, e o Meta otimiza para lead barato em vez de lead que compra.
  - Não consegue escalar sem o custo por venda subir.
- **Fora do ICP:** iniciantes, quem investe menos de R$ 10 mil/mês e quem vende direto no checkout sem gerar lead (VSL de ticket baixo). Esse público pode continuar chegando, mas não é para ele que o conteúdo novo é escrito.

---

## 2. Diagnóstico do conteúdo atual × ICP

**Conclusão:** o blog tem boa base técnica, mas **a maior parte fala com infoprodutor de venda direta e com iniciantes**. Os posts mais alinhados (high ticket e lead scoring) não dizem para quem são e não mostram números na escala do ICP. Nenhum post trata de **lead até a venda no CRM**, que é o problema central de quem investe R$ 10 mil+/mês.

| Aderência | Posts | O que fazer |
|---|---|---|
| **Alta** | Funis de High Ticket e Sessão Estratégica · Lead Scoring com ChatGPT · Server Side (GTM + GA4 + CAPI) · Capturar UTMs no formulário do Elementor · Otimizar campanhas com Looker Studio | Prioridade da Fase 2. Turbinar e reposicionar para o ICP. |
| **Média** | Lançamento pago · 10 passos para blindar lançamento · Benchmark de lançamentos · Funil de vendas · Quando contratar gestor · MCP Meta Ads no Claude · Adveronix · UTMs no rastreamento de vendas | Ajustar o ângulo para leads e escala quando forem atualizados. CTA para a isca. |
| **Baixa** | Funil de VSL (3 posts) · Relatório Looker de VSL · O que é lead (iniciante) · Instalar Pixel no WordPress · Kiwify → Google Sheets · PROCV, SE e SEERRO · Distribuição de conteúdo C1/C2 · Gerador de UTMs | Não apagar (trazem tráfego e autoridade). Não investir mais tempo. CTA só para a isca. |

**Lacunas mais visíveis:**
- Nenhum post sobre **custo por MQL, reunião e venda** por campanha.
- Nada sobre **formulário até o CRM** (RD Station, HubSpot, Kommo, Pipedrive) com UTMs.
- Nada sobre **enviar eventos do CRM ao Meta** (API de Conversões com etapas do funil comercial) para otimizar por lead qualificado.
- Nada sobre **escala de captação** (de R$ 10 mil para R$ 50 mil/mês).
- Nenhum post diz **para quem é**, e os exemplos não usam números da escala do ICP.

---

## 3. A meta em números
- **Meta de volume:** 1 lead/dia ≈ **30 leads/mês**.
- **Meta que importa:** **leads qualificados**, ou seja, que declaram investir R$ 10 mil+/mês. Esse público é menor e mais valioso. Ponto de partida: **1 em cada 3 leads qualificado** (~10/mês no mês 6). O objetivo de longo prazo (12 meses) é 1 lead qualificado por dia.
- Blog com CTA bem colocado e isca digital converte de **1,5% a 3%** dos visitantes. Para 30 leads/mês são necessárias **1.000 a 2.000 visitas orgânicas/mês**. Como o conteúdo vai mirar um nicho mais específico, o volume cresce mais devagar, mas cada visita vale mais.
- **Contar três números:** leads totais, leads qualificados (R$ 10 mil+) e diagnósticos agendados.

**Regra do plano:** parar de perder dados → qualificar e converter quem já chega → trazer mais gente do ICP.

---

## 4. Fase 0 — Medição, qualificação e vazamentos (semana 1, ~5h)

1. **Medição entre domínios no GA4.** O site (`eduardomezzavilla.com.br`) e a LP (`metrics-odr.github.io`) usam a mesma propriedade em domínios diferentes, e cada passagem entre eles vira "referral". Para corrigir:
   - GA4 → Admin → Fluxos de dados → Configurações da tag → **Configurar seus domínios**: adicionar os dois.
   - Em **Listar referências indesejadas**: adicionar os dois.
   - Teste: clicar de um domínio para o outro e conferir o parâmetro `_gl=` na URL.
2. **Pergunta de qualificação em todos os formulários:** "Quanto você investe por mês em tráfego pago?" com as faixas: até R$ 5 mil / R$ 5–10 mil / R$ 10–30 mil / R$ 30–100 mil / acima de R$ 100 mil. É ela que separa o lead qualificado.
3. **Campo "Como me conheceu?"**: Google, ChatGPT/IA, LinkedIn, Instagram, indicação.
4. **Evento-chave no GA4** no envio de formulário (site e LP), com a faixa de investimento como parâmetro.
5. **Links quebrados na home:** "Gratuito >>" e "Saiba mais >>" apontam para `#`.
6. **Contadores da home** ("+ R$ 0 MM"): testar no celular e em conexão lenta. Se aparecer 0, trocar por texto fixo.
7. **Google Search Console** conectado.
8. **Higiene do WordPress:**
   - Marcar como spam os 75 comentários de cassino e instalar um antispam (Antispam Bee ou Akismet).
   - Fazer backup na Hostinger e atualizar os 21 plugins pendentes.

---

## 5. Fase 1 — Oferta e porta de entrada para o ICP (semanas 1 a 3, ~10h)
*A etapa que mais muda o resultado.*

9. **Reposicionar a página de diagnóstico para o ICP.**
   - Hoje diz "exclusivo para infoprodutores". Passa a ser: **"Para quem investe R$ 10 mil+/mês para gerar leads e quer saber quais campanhas geram vendas, não só leads."**
   - Incluir 2 ou 3 mini-cases com números de escala (custo por MQL ou por venda antes e depois).
   - Explicar o que acontece depois do formulário.
   - Tirar o "95%" e as "vagas limitadas".
10. **Porta de entrada: Quiz "Diagnóstico de Rastreamento do Funil de Leads".** É um diagnóstico automático, uma versão de 3 minutos da sua call.
    - **10 a 12 perguntas de sim ou não, em 3 blocos:**
      - Medição: UTMs chegam ao CRM? Existe API de Conversões? Eventos de MQL e venda voltam para o Meta?
      - Funil comercial: sabe a taxa de MQL, de reunião e de no-show por campanha?
      - Operação: faixa de investimento mensal e modelo de venda.
    - **O resultado só sai depois do cadastro** (nome, e-mail, WhatsApp). Ele mostra:
      - nota de 0 a 100 com o nível (cego, parcial ou orientado por dados);
      - os 3 maiores gargalos da pessoa;
      - o próximo passo.
    - **Por que esta e não as outras:**
      - Qualifica o lead (faixa de investimento) e já faz o diagnóstico de forma automática.
      - Dá à pessoa um resultado sobre o funil dela, não um material genérico.
      - Leva naturalmente à call.
    - **Ferramenta:** Tally (gratuito, com pontuação e lógica condicional) ou página própria no site. Capturar UTMs em campos ocultos.
    - **Descartadas como porta de entrada:**
      - Ebook de MQL: baixo valor percebido, e o ICP não lê ebook.
      - Planilha de UTMs: atrai gestores e iniciantes, fora do ICP.
      - Videoaula: pede muito tempo de quem ainda não confia em você. Ela vira **conteúdo da sequência** (item 12).
11. **Roteamento pelo resultado do quiz.**
    - R$ 10 mil+ → página de agendamento do diagnóstico logo após o resultado, já sabendo os gargalos da pessoa.
    - Abaixo disso → recebe o resultado e a sequência de conteúdo.
12. **Sequência curta após o quiz** (3 mensagens em 7 dias):
    - Dia 0: resultado detalhado e o que fazer em cada gargalo.
    - Dia 2: **videoaula "Como eu otimizo campanhas com dados reais de MQL e venda"** (15 a 20 min, tela gravada).
    - Dia 5: um caso com números e o convite para o diagnóstico.
13. **CTA contextual em cada post** (meio e fim), apontando para a isca e, nos posts de aderência alta, também para o diagnóstico.
14. **LP do Método ODR no domínio próprio** (`/metodo-odr/` ou `odr.eduardomezzavilla.com.br`, via CNAME no GitHub Pages), com 301 dos links antigos. Assim a autoridade fica no site principal e o problema de medição some.

---

## 6. Fase 2 — Turbinar e reposicionar os posts de aderência alta (semanas 3 a 6, ~2h por post)

15. **Ordem:** os 5 posts de aderência **alta** (seção 2). Começar pelo que tiver mais impressões no Search Console, em posição 5 a 20.
16. **Reposicionar para o ICP:**
    - Abrir com "para quem é": "Para quem investe R$ 10 mil+/mês e precisa saber quais leads viram venda".
    - Usar exemplos com números dessa escala.
    - Puxar o assunto para lead, MQL, CRM e venda.
17. **Aplicar o padrão "citável por IA":**
    - Resposta direta de 40 a 60 palavras no topo.
    - 1 tabela comparativa.
    - FAQ de 4 a 6 perguntas, com schema FAQ.
    - Box do autor com credenciais (desde 2020, +R$ 5MM gerenciados, +R$ 10MM em projetos), feito uma vez no template de post.
    - Data "Atualizado em".
    - Revisão de português e troca de superlativos por dados.
    - "Rastreamento" no título e no texto, sem mudar URL que já ranqueia.
    - Alt text em todas as imagens.
18. **Server side:** completar os três "Em Breve", escrever em texto o que hoje só aparece em print e adicionar a parte de **eventos de lead e CRM** na API de Conversões.

---

## 7. Fase 3 — Motor de conteúdo para o ICP (mês 2 a 6, 1 post por semana, ~4h cada)
*Só pautas que quem investe R$ 10 mil+/mês para gerar leads pesquisaria.*

| Cluster | Pautas |
|---|---|
| **Qualidade de lead e funil comercial** | CPL x custo por MQL x custo por venda: qual métrica otimizar · Por que leads baratos não compram · Perguntas de formulário que filtram lead ruim · Como reduzir no-show em sessão estratégica · Lead scoring na prática |
| **Do lead à venda (rastreamento + CRM)** | UTMs do formulário até o CRM (RD, HubSpot, Kommo, Pipedrive) · API de Conversões com etapas do CRM: otimizar o Meta para lead qualificado · Atribuição quando a venda acontece semanas depois · Dashboard de custo por reunião e venda por anúncio |
| **Escala de captação** | Como escalar de R$ 10 mil para R$ 50 mil/mês sem o custo por venda explodir · Formulário instantâneo x landing page · Estrutura de conta para captação em escala · Fadiga de criativo em escala |
| **IA na operação de tráfego** | Claude + Meta Ads para gerir várias contas · Relatório automático de leads e vendas com IA · Checklist de segurança para editar campanhas por IA |
| **Decisão e contratação** | Quanto custa um gestor de tráfego para quem investe R$ 10 mil+/mês · Gestor, agência ou time interno · O que um diagnóstico de captação deve analisar |

**Regras de todo post novo:**
- Abrir dizendo para quem é.
- Usar números reais, seus ou de clientes.
- Seguir o padrão "citável por IA".
- CTA para a isca e para o diagnóstico.
- Linkar 2 ou 3 posts do mesmo cluster.

---

## 8. Fase 4 — Distribuição (contínua, ~1h por semana)
19. **LinkedIn como canal único.** É onde estão donos, heads de marketing e comerciais do ICP. Cada post vira 1 publicação com o insight principal e o link. Não abrir outro canal.
20. **1 menção externa por mês:** podcasts e comunidades de marketing e vendas B2B, eventos de inside sales, parceiros (CRMs, Stape).

---

## 9. Rotina semanal (~6 a 8h)

| Dia | Tarefa | Tempo |
|---|---|---|
| Seg | Escrever 1 post novo (ou reposicionar 1 antigo durante a Fase 2) | 3–4h |
| Qua | Revisar, publicar, CTA e FAQ | 1h |
| Qui | Adaptar para o LinkedIn | 1h |
| Sex | Números: leads totais, qualificados, diagnósticos, origem, posições no Search Console | 30min |

---

## 10. O que NÃO fazer agora
- Post para iniciante ou de topo genérico ("o que é marketing digital", Excel básico).
- Novos posts de VSL ou venda direta de ticket baixo.
- Abrir vários canais sociais ao mesmo tempo.
- Redesenhar o site.
- Comprar ferramenta de SEO antes do Search Console ter dados.

---

## 11. Checkpoints

| Quando | Entregas | Meta |
|---|---|---|
| Fim do mês 1 | Fases 0 e 1 prontas: qualificação no formulário, quiz no ar, diagnóstico reposicionado | ~8 a 10 leads/mês, primeiros qualificados medidos |
| Mês 3 | 5 posts de aderência alta reposicionados e ~8 posts novos do ICP | ~15 a 20 leads/mês, ~5 qualificados |
| Mês 6 | ~20 posts do ICP, 1.000 a 2.000 visitas orgânicas/mês | ~30 leads/mês, ~10 qualificados |
| Mês 12 | Clusters completos e autoridade no LinkedIn | Rumo a 1 lead qualificado por dia |

**Pendente:**
- Sessões orgânicas dos últimos 30 dias, para recalibrar as metas.
- Confirmar se **gestores de tráfego** (público da LP do Método ODR) continuam como público secundário ou saem do foco.

---

## Histórico de versões
- **v3 (12/11/2026):** ICP definido (geram leads e investem R$ 10 mil+/mês). Entram: diagnóstico do conteúdo × ICP, meta de leads qualificados, pergunta de faixa de investimento nos formulários, porta de entrada = quiz de diagnóstico de rastreamento (videoaula na sequência), diagnóstico reposicionado, clusters refeitos para o ICP, LinkedIn como canal e higiene do WordPress.
- **v2 (12/11/2026):** LP do Método ODR confirmada em `metrics-odr.github.io`. Entram: medição entre domínios, separação de públicos e LP no domínio próprio.
- **v1 (12/11/2026):** primeira versão do plano.
