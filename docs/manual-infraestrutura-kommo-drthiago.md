# Manual de Infraestrutura: Dr Thiago Virgili (Kommo + n8n + Planilha Central)

Levantado em 20/11/2026. Fonte: leitura direta da API do Kommo (somente GET), do n8n e da planilha, mais prints das telas de automação enviados pelo Eduardo.

> **Como ler:** cada item está marcado como **Verificado** (lido da API, do n8n ou da planilha), **Visto em print** (tela do Kommo, sem leitura por API) ou **Não verificado** (existe, mas não consegui ler o conteúdo). Nunca gravar tokens ou senhas aqui: só o nome da credencial e onde ela fica.
>
> Guia operacional do cliente: [`clientes/drthiago.md`](clientes/drthiago.md). Para replicar em outra conta: [`manual-implementacao-kommo.md`](manual-implementacao-kommo.md).

> **Para o agente (Claude) que ler este manual numa sessão nova:** este documento descreve a conta Kommo da **Contour Clinique** (`contourculptclinique`, Dr Thiago Virgili e Dra Fernanda) e tudo o que está ligado a ela. Para qualquer pedido sobre o Kommo desse cliente, leia nesta ordem: §6 (riscos), §2 (Kommo), §3 (planilha), §4 (n8n), §5 (projeto Lead Ads) e §7 (o que ainda não se sabe). **O que está em §7 não foi verificado: não afirmar como fato, perguntar ao Eduardo ou ler a tela.** O que a API não entrega (Salesbots, automações, mensagens e vídeos dos follow-ups) só se conhece por print ou vídeo do Eduardo. Vocabulário: *lead de entrada* = etapa pré-funil (unsorted); *Salesbot / Robô de vendas* = bot do Kommo; *Beehive* = integração da landing page; *FUP* = follow-up; *entity_id* = id do lead no Kommo.

## 1. Visão geral

```
Meta Ads ─┬─ Anúncio click-to-WhatsApp ─► WhatsApp (Dr Thiago V) ─► Kommo ─► webhook ─► n8n ─► Planilha Central (Conversas Iniciadas)
          ├─ Lead Ads (formulário) ──────► Planilha Central (Lead Instant Form)   [integração com o Kommo: EM PROJETO, nada ligado]
          └─ Landing page (Beehive) ─────► Kommo (tag "LP - Dr Thiago")
Kommo: lead movido p/ AGENDADO ─► webhook ─► n8n ─► Planilha Central (Agendamentos)
```

| Sistema | Identificação | Status |
|---|---|---|
| Kommo | [contourculptclinique.kommo.com](https://contourculptclinique.kommo.com), account ID `36177499` | Verificado |
| n8n | [n8n.srv2164786.hstgr.cloud](https://n8n.srv2164786.hstgr.cloud), pasta [`DrThiago`](https://n8n.srv2164786.hstgr.cloud/projects/srRTMbP5mWVNIiQr/folders/YRtSf5VPUy0aOp7Q/workflows) (`YRtSf5VPUy0aOp7Q`) | Verificado |
| Planilha | [Dr Thiago \| Planilha Central](https://docs.google.com/spreadsheets/d/1EcPFdCtd75HNN8xz4B7UU2KjSSkEYW4MkQRYgQArnRk/edit) (`1EcPFdCtd75HNN8xz4B7UU2KjSSkEYW4MkQRYgQArnRk`), dona: `drthiagovirgili.coprod@gmail.com` | Verificado |
| Make (legado) | Cenário `Dr Thiago Conversas`, **pausado, não religar** | Ver `clientes/drthiago.md` §9 |

## 2. Kommo

### 2.1 Conta e acesso
- Subdomínio `contourculptclinique` (também `.amocrm.com`), account ID `36177499`.
- API v4 por **token de longa duração** de uma integração privada chamada "n8n" (validade informada: 2031). O token não fica no repositório. No n8n: credencial Bearer `Cred | DrThiago | Kommo API - contourculptclinique (Bearer)` (ID `PmUQ0wuZMqEO5hMV`).
- A API responde `application/hal+json`: nos nós HTTP do n8n, **Response Format = JSON**.
- Respostas **sem conteúdo (204)** acontecem quando a consulta não acha nada (ex.: `GET /leads/unsorted` sem leads pendentes). O nó HTTP do n8n dá erro nesse caso: tratar com `onError: continueRegularOutput`.
- **Controle de duplicatas do Kommo: desligado** (Visto em print). Toda deduplicação é feita pelo n8n.

### 2.2 Funis (Verificado)
A conta tem **9 funis**, de **dois profissionais** (Dr Thiago e Dra Fernanda). **Nunca mexer nos funis da Dra Fernanda ao trabalhar para o Dr Thiago.**

| ID | Funil | Pertence a | Leads de entrada (unsorted) |
|---|---|---|---|
| **`13296523`** | **Dr Thiago - PRÉ VENDAS E AGENDAMENTOS** (principal) | Dr Thiago | Ligado |
| `13599039` | Dr Thiago - Follow Up (Bot Triagem) | Dr Thiago | Desligado |
| `14577156` | Dr. Thiago - Comercial | Dr Thiago | Ligado |
| `13311463` | Dr. Thiago Pós Venda | Dr Thiago | Desligado |
| `14055675` | Dra Fernanda - PRÉ VENDAS E AGENDAMENTOS | Dra Fernanda | Ligado |
| `14522244` | Dra Fernanda - Follow Up (Bot Triagem) | Dra Fernanda | Ligado |
| `14577204` | Dra Fernanda - Comercial | Dra Fernanda | Ligado |
| `13311459` | Atendimento | Geral | Desligado |
| `14577392` | Dra Fernanda - Pós Venda | Dra Fernanda | Ligado |

### 2.3 Etapas do funil principal `13296523` (Verificado)
| ID | Etapa | Observação |
|---|---|---|
| `102536263` | **Leads de entrada** | Etapa pré-funil (unsorted) |
| `102536315` | **Atendimento IA** | Onde caem os leads de WhatsApp e da landing page |
| `112619560` | Em Conversa | |
| `112180672` | Respondeu Follow Up | |
| `112179820` | Qualificado | |
| `112619564` | Em negociação | |
| `105162499` | aguardando pgto consulta | |
| `108496639` | **AGENDADO** | Gatilho do fluxo de agendamentos |
| `113775588` | CONFIRMADO | |
| `108496759` / `108496763` / `108496767` | Follow-up 24h / 3 dias / 7 dias | |
| `102536331` / `113180496` / `105163827` | Follow-up 15 / 20 / 30 dias | |
| `112626540` / `112626544` / `113180500` | Follow-up 45 / 60 / 90 dias | |
| `108496771` | NEGOCIAÇAO FUTURA | |
| `142` | Compareceu e fechou procedimento | Etapa de ganho |
| `143` | Sem retorno / Encerrado | Etapa de perda |

Etapas dos demais funis do Dr Thiago (IDs completos): `Follow Up (Bot Triagem)` `104937611` entrada, `108496119`…`108496131`, `112180036`, `112180040`, `112180044`; `Comercial` `112619628` entrada, `112783296`…`112783328`; `Pós Venda` `102653711` entrada, `102653715` Base de Clientes e `Pós 1..6`. Levantamento completo pode ser refeito com o fluxo de leitura (§4.4).

### 2.4 Campos personalizados de lead (Verificado)
| ID | Campo | Tipo | Valores / observação |
|---|---|---|---|
| `2329388` | Origem | select | Trafego, Instagram, Indicação, Google, Recorrencia, Propaganda/Vendedor, Manychat (T)-(C) |
| `2329398` | Profissional | select | Dra. Fernanda, Dr. Thiago, Outros |
| `2608521` | Cidade | select | São Paulo - SP, Presidente Prudente - SP, Outra Cidade |
| `2608523` | Responsável Atendimento | select | Luila, Daniela, Heloisa |
| `2613405` | Queixa / Área de Interesse | textarea | |
| `2613435` | Procedimento de Interesse | multiselect | EndoMELA, Mini Abdominoplastia, Mini Lifting (Abdômen, Braço, Perna), Lifting outras áreas, Correção de Cicatrizes, Deep Plane Facelift… |
| `2613473` | Região do Procedimento | multiselect | Abdômen, Posterior, Braços, Tórax, Coxas, Interno de Coxas, Papada, Pubiana |
| `2614065` | Segmento Follow-up | select | Abdômen Fem, Abdômen Masc, Tórax, Braços, Glúteos, Facial. Os robôs de follow-up têm um bot por segmento com os mesmos nomes (provável dependência, não confirmada) |
| `2613441` / `2613443` | Procedimento Fechado / Próximas Oportunidades | multiselect | |
| `2329404`, `2603232`, `2613567` | Data Agendamento, Próxima consulta, Data de atendimento | date_time | |
| `2613403` | N.A Follow Up | checkbox | |
| `2622997`, `2622999` | ID Agendamento / Procedimentos agendados (Clínica Experts) | text | Integração com a Clínica Experts |
| `2312340`…`2312358` | utm_content, utm_medium, utm_campaign, utm_source, utm_term, utm_referrer, referrer, gclientid, gclid, fbclid | tracking_data | Rastreamento nativo |
| `2617935`…`2617945` | Meta Ads: ID do anúncio, conjunto, campanha, criativo, fonte, ref | tracking_data | Rastreamento de anúncio do Meta |

**Campos do contato:** `2312332` Telefone (código `PHONE`, multitext, enum `MOB`/`WORK`…), `2312334` E-mail, `2312330` Posição, `2613917` Assinatura de marketing (Opt-in/Opt-out), `2622995` ID Paciente (Clínica Experts).

### 2.5 Tags de lead (Verificado)
`Daniela` (319383), `Heloisa` (319979), `luila` (319625), `May` (324667), `Prudente` (320191), `FALHA` (320381), **`LP - Dr Thiago`** (275010), `LP - Dra Fernanda` (314763).

### 2.6 Como os leads reais estão hoje (amostra de 100 leads do funil, 20/11/2026)
- Leads de WhatsApp entram com nome **`Lead #<id>`**, na etapa **Atendimento IA**, com **uma tag de atendente (`Daniela` ou `Heloisa`) em rodízio**, e **sem campos personalizados preenchidos**.
- Leads da landing page entram com nome **`Lead Site - <nome>`**, na etapa Atendimento IA, com a tag **`LP - Dr Thiago`**.
- Responsável do lead: sempre o mesmo usuário (`14920695`) nessa amostra. A atribuição à equipe parece ser pela tag, não pelo responsável. **Inferência**, não confirmada com o robô aberto.
- Distribuição na amostra: 49 Em Conversa, 40 Atendimento IA, 5 Follow-up 3 dias, 2 Respondeu Follow Up, 2 Qualificado.

### 2.7 Automações do funil `13296523` (Visto em print, conteúdo dos bots Não verificado)
| Etapa | Gatilho | Ação | Condição |
|---|---|---|---|
| Leads de entrada | Quando criado nesta etapa | Salesbot **Distribuição** | Nenhuma (todo lead) |
| Leads de entrada | Quando criado nesta etapa | Salesbot **Entrada Thiago** | Nenhuma (todo lead) |
| Atendimento IA | Quando criado nesta etapa | Salesbot **LP - Dr Thiago (Beehive) 2** | Só leads com a tag `LP - Dr Thiago` |
| Atendimento IA | Quando criado nesta etapa | **Webhook** (alimenta a aba Conversas) | — |
| Atendimento IA | Quando movido para esta etapa | **Webhook** | — |
| Follow-up 24h / 3d / 7d | Quando movido | Cria tarefa "Acompanhar" (FOLLOW UP 01/02/03) | — |
| Follow-up 24h / 3d / 7d / 15d / 20d… | Depois de 1 dia / 72h / 96h / 120h… | Altera a etapa do lead para o próximo follow-up | — |
| Follow-up (qualquer) | Mensagem recebida em qualquer canal (pausa de 5 min) | Altera etapa para **Respondeu Follow Up** | — |
| Follow-up 15d, 45d, 60d, 90d | Quando movido | Salesbot "Follow-up Nd – Dr Thiago – <segmento>" (Abdômen Fem, Abdômen Masc, Tórax, Braços, Glúteos, Facial), janela **seg–sáb 09:00–19:00** | Segmento do lead |
| Compareceu e fechou procedimento | Depois de 5 minutos | Move o lead para o funil **Dr. Thiago Pós Venda → Base de Clientes** | — |
| Sem retorno / Encerrado | Quando movido ou criado | Salesbot **Bot Fechar Conversa Perdido** | — |
| AGENDADO | Quando movido para esta etapa | **Webhook** para o n8n (fluxo de agendamentos) | Nenhuma |

**Não verificado:** o conteúdo dos Salesbots **Distribuição** e **Entrada Thiago** (se enviam mensagem, se movem de etapa ou só atribuem). Aberto como pendência (§7).

### 2.7.1 Follow-up automatizado (FUP): mensagens e vídeos (A DOCUMENTAR)
O Eduardo observou **pelo celular** (WhatsApp, lado do lead) que o fluxo de follow-up automatizado **envia vídeos** e mensagens. O que se sabe pelas telas do Kommo: os bots `Follow-up 15D / 45D / 60D / 90D – Dr Thiago – <segmento>` (Abdômen Fem, Abdômen Masc, Tórax, Braços, Glúteos, Facial) e `Follow-up 20D – Dr Thiago (Dra Fernanda)`, `Follow-up 30D` e `90D – Dr Thiago` disparam ao mover o lead para a etapa, em janela **seg–sáb 09:00–19:00**, e os follow-ups de 24h, 3 e 7 dias criam tarefas "Acompanhar" e movem o lead por tempo.

**Falta registrar** (o Eduardo vai enviar os vídeos/prints do celular): por etapa de FUP, a sequência exata de mensagens, o texto, quais vídeos são enviados (nome do arquivo, duração, onde estão hospedados no Kommo), intervalos entre as mensagens e o que o bot faz quando o lead responde. Preencher a tabela abaixo quando chegar:

| Etapa / Bot | Segmento | Msg / vídeo | Texto ou nome do vídeo | Espera | Observação |
|---|---|---|---|---|---|
| _a preencher_ | | | | | |

### 2.8 Fontes de lead e canais (Visto em print)
- WhatsApp **Dr Thiago V** (WhatsApp Lite, número `5511942946718`, source_id `23084963`).
- Segundo canal WhatsApp: `5511943406884` (widget).
- Facebook (lead ads nativo do Kommo): aparece no menu lateral, **estado de conexão Não verificado**.
- **Agente de IA** do Kommo "Clínica Médica Contour assistente de suporte": **Desativado** (Visto em print). Não atua.

### 2.9 Webhooks configurados no Kommo (Visto em print / documentado)
| Onde | Evento | URL de destino |
|---|---|---|
| Funil `13296523`, etapa Atendimento IA | Criado / movido para a etapa | Ver `clientes/drthiago.md` §5 (conferir qual URL cada um usa: o guia lista a de Conversas) |
| Funil `13296523`, etapa AGENDADO | Movido para a etapa | `https://n8n.srv2164786.hstgr.cloud/webhook/drthiago-geral-kommo-sheets-agendamentos` |
| Integrações → Web hooks (conta) | Lead de entrada adicionado | `https://n8n.srv2164786.hstgr.cloud/webhook/drthiago-whatsapp-kommo-sheets-conversas` |

> Observação: o guia do cliente descrevia o gatilho de Conversas como "lead não triado" (`unsorted.add`). O Eduardo confirmou em 20/11 que os gatilhos que mandam para a aba Conversas disparam em **Atendimento IA**. Conferir qual dos dois está ativo antes de mexer.

## 3. Planilha Central (Verificado)
Planilha única do cliente. Abas relevantes:

| Aba | Conteúdo | Quem escreve |
|---|---|---|
| `Conversas Iniciadas 💬` | Data, entity_id, chat_id, contact_id, autor_id, Nome, Mensagem, Telefone, Agendado, Status, Abrir Conversa. ~2.000 linhas | n8n (A–H). Agendado, Status e link: equipe/fórmulas |
| `Agendamentos 📅` | Data, Nome, Telefone, entity_id | n8n |
| **`Lead Instant Form 👥`** | id (`l:...`), created_time, ad_id, ad_name, adset_id/name, campaign_id/name, form_id, form_name, is_organic, platform, 2 perguntas do formulário, full_name, phone_number (`p:+55...`), lead_status. **1 linha, que é o lead de teste da Meta** | Quem escreve nessa aba: **Não verificado** |
| `Leads Landing Page 👥` | Nome, Email, Telefone, Médico, Especialidade, UTMs, fbc, fbp, MQL, Compras… | Integração da LP |
| `Compras 🛒`, `Meta Ads 📥`, `Controle \| Criativos 🎴`, `Páginas 🖥️`, `Links Trackeados 🔗`, `Budget \| Tráfego 💰`, `FSE \| Planilhamento …`, `Swipe File`, `Lista \| Aplicações 👥` | Controle de marketing | Equipe / integrações |

A conta de serviço do Google (`automations@gen-lang-client-0448992217.iam.gserviceaccount.com`) é **Editora** da planilha. Chave para cruzar abas: **`entity_id` = lead_id do Kommo**.

## 4. n8n

### 4.1 Fluxos (Verificado)
| Nome | ID | Status | Faz |
|---|---|---|---|
| `Flow \| DrThiago \| WhatsApp \| Kommo > Sheets - Registra conversas iniciadas do Instagram` | `qPWy230Z8Cw5N8Uj` | Publicado | Webhook → filtra mensagem por frases → 1 linha por telefone na aba Conversas |
| `Flow \| DrThiago \| Geral \| Kommo > Sheets - Registra leads agendados` | `iK9iVYgAMyxVUUyU` | Publicado | Webhook de AGENDADO → busca lead/contato na API → aba Agendamentos |
| `Flow \| DrThiago \| Geral \| Manual > Sheets - Regrava agendados sobrescritos (uso único)` | `PCyRC8FsN6p1q9Qw` | Já executado | Pode ser apagado |
| `Flow \| DrThiago \| Lead Ads \| Manual > Kommo - Lê estrutura (uso único)` | `2cqdDHyFGAZOu0lz` | **Inativo, criado em 20/11/2026** | Só GET no Kommo: funis, etapas, campos, tags, leads recentes. **Pode ser apagado** |

### 4.2 Data tables (Verificado)
`Frases da Primeira Mensagem` (`R6S6DOuurjZMzzho`), `Conversas registradas (anti-duplicata)` (`rl3pVO73UzAPoMmP`), `Agendamentos registrados (anti-duplicata)` (`6EpypQN05XhKHaAw`), `Payloads do Agendado (histórico)` (`8M8KvwbZrkxyxN8B`).

### 4.3 Credenciais (só nomes)
- `Cred | DrThiago | Kommo API - contourculptclinique (Bearer)` (`PmUQ0wuZMqEO5hMV`): **usar esta**.
- `Cred | DrThiago | Kommo API - contourculptclinique` (Header Auth, `Cgo9FqhIAFVTFu5O`): obsoleta (401), apagar à mão.
- Google: `Cred | ESM | Google Service Account account` (`6deuhYvp4Sfr43Qc`), compartilhada.

### 4.4 Fluxo de leitura da estrutura
Reaproveitável em qualquer conta: [`2cqdDHyFGAZOu0lz`](https://n8n.srv2164786.hstgr.cloud/workflow/2cqdDHyFGAZOu0lz). Faz 6 `GET`:
`/api/v4/leads/pipelines`, `/api/v4/leads/custom_fields`, `/api/v4/contacts/custom_fields`, `/api/v4/leads/tags?limit=250`, `/api/v4/leads?filter[pipeline_id]=<id>&with=contacts&limit=100&order[created_at]=desc`, `/api/v4/leads/unsorted?filter[pipeline_id]=<id>&limit=50`.
O **Salesbot e as automações não são legíveis pela API**: só pela tela (Automatize) ou por print.

## 5. Integração Lead Ads → Kommo (EM PROJETO, nada construído)
Regras decididas com o Eduardo em 20/11/2026:
1. O formulário permite iniciar mensagem. **Quem iniciar a mensagem não pode virar lead duplicado.**
2. Quem **não** enviar mensagem precisa aparecer no Kommo para ser recuperado.
3. Ainda **não ligar nem finalizar**: primeiro entender a estrutura para não quebrar nada.

Desenho proposto (aguardando confirmação):
- Fluxo agendado lê a aba `Lead Instant Form 👥`; controle anti-duplicata por `id` (`l:...`).
- Espera ~15 minutos após `created_time`; então busca o telefone no Kommo.
- Achou lead criado depois do preenchimento: não cria nada, só registra no controle.
- Não achou: cria o lead em **Leads de entrada** do funil `13296523`, tag **`Lead Ads - Recuperar`** (não usar `LP - Dr Thiago`, que aciona o Beehive), com campanha, conjunto, anúncio e respostas do formulário.
- Cuidados: `phone_number` vem como `p:+55…` (normalizar); os robôs de entrada rodam em todo lead criado ali; os webhooks de Conversas só gravam mensagens com as frases do anúncio, então um lead sem mensagem é descartado.
- Possível mapeamento (a confirmar com as perguntas do formulário): procedimento → campo `Procedimento de Interesse` / `Segmento Follow-up`; origem → campo `Origem = Trafego`; campo `Profissional = Dr. Thiago`; IDs do Meta → campos `Meta Ads ID do anúncio/conjunto/campanha`.

## 6. Riscos conhecidos
- Conta com **dois profissionais**: um filtro errado de funil grava lead no da Dra Fernanda.
- **Salesbots de entrada** rodam em todo lead criado, inclusive por API. Conteúdo não verificado.
- **Duplicatas**: o Kommo está sem controle de duplicatas.
- Envio simultâneo de webhooks sobrescreve linhas se o Sheets não usar **Use Append** (já corrigido, ver `padrao-n8n.md`).
- O webhook de AGENDADO só manda IDs (sem nome, telefone, etapa): é preciso consultar a API.

## 7. Pendências de verificação
- [ ] Abrir os Salesbots **Distribuição** e **Entrada Thiago** (Salesbot) e documentar os passos.
- [ ] Documentar as mensagens e **vídeos do follow-up automatizado** (§2.7.1), a partir do material que o Eduardo vai mandar pelo celular.
- [ ] Documentar os demais bots: `LP - Dr Thiago (Beehive) 2`, `Bot Fechar Conversa Perdido` e os de follow-up por segmento.
- [ ] Mapear os usuários do Kommo (IDs de Daniela, Heloisa, Luila e do usuário `14920695`) e como o rodízio de atendentes é feito.
- [ ] Confirmar quem escreve na aba `Lead Instant Form 👥` e as 2 perguntas do formulário (colunas M e N).
- [ ] Confirmar que URL cada webhook de Atendimento IA usa.
- [ ] Confirmar se a fonte "Facebook" do Kommo está conectada e se cria leads por conta própria (risco de duplicar com o n8n).
- [ ] Apagar os fluxos de uso único e a credencial obsoleta.

## 8. Histórico
| Data | Mudança |
|---|---|
| 20/11/2026 | Levantamento completo do Kommo (funis, etapas, campos, tags, amostra de leads) pelo fluxo de leitura. Criado este manual |
