# MedNexus

> Documento único do cliente, separado por tópico. Guia operacional do Meta Ads (passo a passo de ajuste de verba): [../mednexus.md](../mednexus.md).
> **Nunca** gravar valores de tokens ou senhas: só o nome e o local da credencial. Dados pessoais de leads (nome, telefone, e-mail) não entram aqui.
> Itens marcados **Não verificado** são hipóteses ou leitura parcial: confirmar antes de agir.

Atualizado em 24/11/2026.

## Índice
1. [Resumo](#1-resumo)
2. [Tráfego pago (Meta Ads)](#2-tráfego-pago-meta-ads)
3. [Oferta e funil comercial](#3-oferta-e-funil-comercial)
4. [Atendimento e automações (Umbler Talk)](#4-atendimento-e-automações-umbler-talk)
5. [Dados e planilha](#5-dados-e-planilha)
6. [Ativos no n8n](#6-ativos-no-n8n)
7. [Automação em estudo: lista diária de leads para o Adriano](#7-automação-em-estudo-lista-diária-de-leads-para-o-adriano)
8. [Pendências](#8-pendências)
9. [Acessos](#9-acessos)
10. [Histórico](#10-histórico)

---

## 1. Resumo
| Item | Valor |
|---|---|
| Campo `Cliente` no padrão | `MedNexus` |
| Status | Ativo |
| O que vende | Sistema de captação de pacientes para médicos e profissionais da saúde (ver §3) |
| Funis | A definir. Usar `Geral` até o Eduardo indicar o nome |
| Pasta no n8n | `MedNexus` (`hR1cAjU9b5L0fJ9l`) |
| Atendimento | Adriano Freitas (humano, dono da conta na Umbler), Rosi Nunes (agente) e bot da Umbler Talk |
| Planilha central | [MEDNEXUS \| Planilha Central](https://docs.google.com/spreadsheets/d/1npTWHf_taXBhGlOT-WFtlt7CvX44sVbKf8WGs8nQhgE/edit) |
| Briefing do cliente | Não está no repositório. Pedir ao Eduardo onde está antes de criar ou mudar campanhas |

Caminho do lead: anúncio no Meta (clique para WhatsApp) → bot da Umbler → conversa com o Adriano (vídeo no Meet) → link de pagamento da Greenn → venda registrada na planilha.

---

## 2. Tráfego pago (Meta Ads)

### 2.1 Contas
| Item | Valor |
|---|---|
| Business (BM) | Mednexus (`917258955839990`) |
| Conta de anúncios principal | **Clã da Medicina** (`900675294624191`), BRL. Tem guia próprio: [../mednexus.md](../mednexus.md) |
| Segunda conta operável | **Clínica Mantelli** (`621590540931248`), BRL |
| Conta a ignorar | `unknown (Read-Only)` (`2429519390905186`), INR, somente leitura |
| Regra | Se o pedido não disser qual conta, perguntar (usar Clã da Medicina só se o contexto deixar claro) |

### 2.2 Estrutura das campanhas (referência de 30/10/2026)
| Grupo | Campanha | Tipo de orçamento |
|---|---|---|
| Lead Ads | 06/10 Teste Ads (5 conjuntos) | ABO |
| Lead Ads | 19/10 AD01 (3 conjuntos) | ABO |
| Lead Ads | 02/09 | CBO |
| Lead Ads | 21/10 AD52 | CBO |
| Conversão | 30/09 1-3-1 AD01 | CBO |
| Conversão | 30/09 1-3-1 AD01 V2 | CBO |

Verba diária ativa em 30/10: **R$ 99,77** (após reduzir de R$ 510). IDs e valores completos no [guia](../mednexus.md).
Devem permanecer **pausados**: Teste de Ads 7, 8 e 9, Purchase 11/08 1-3-1 AD01, Mensagem 30/09 e os conjuntos AD70, AD71 e Ad64.

### 2.3 Cuidados específicos (do guia)
- Mínimo por conjunto: R$ 5,13/dia. Campanha CBO: R$ 5,13 vezes o número de conjuntos ativos. Abaixo disso a publicação falha com "Budget Too Low".
- CPM de R$ 90 ou mais: verba baixa reduz muito a entrega.
- Orçamento na API vai em centavos. Edição vira rascunho e só vale depois de publicar.
- Regra de ouro: o que estava ativo continua ativo e o que estava pausado continua pausado. Tirar retrato antes e reler depois.
- Todo ajuste de verba usa múltiplos de 5 (regra geral do CLAUDE.md). Atenção: o mínimo da conta é pequeno (R$ 5,13), então o caso "usar R$ 10 e nunca R$ 5" se aplica.

### 2.4 Origem dos leads vindos do anúncio
- Anúncio de clique para WhatsApp: a **primeira mensagem do lead traz o ID do anúncio** no começo do texto (ex.: `120248960832430463 - Oi, tenho dúvidas e quero conhecer a MedNexus`). Dá para cruzar o lead com o anúncio e a campanha de origem.
- Existe também **Lead Form Nativo** (formulário do Meta) e campanhas de **Conversão** (1-3-1). A planilha tem abas separadas (ver §5).
- Frases de entrada vistas: "Oi, tenho dúvidas e quero conhecer a MedNexus" e "vi seu perfil e gostaria de conhecer a MedNexus" (esta vem de perfil do Instagram, sem ID de anúncio).
- A planilha guarda a série diária do Meta (`Meta Ads 📥`: dia, ID do anúncio, campanha, gasto, impressões, leads) e os criativos (`Criativos 🎴`, siglas como AD01 e AD52).

### 2.5 Pendências de tráfego
- [ ] Campanha de 02/09 ficou em R$ 9,50 por erro de digitação (o proporcional seria R$ 11,76).
- [ ] Briefing do cliente: localizar (ver §1).

---

## 3. Oferta e funil comercial
Aprendido das 4 conversas de leads que fecharam, enviadas pelo Eduardo em 24/11/2026 (leads anônimos; especialidades: emagrecimento, psicologia, nutrologia, alergia e pediatria).

### 3.1 O produto, como o time apresenta
- Sistema de captação que "faz a busca ativa no Google" (por geolocalização e intenção de busca), qualifica o lead e entrega para a secretária ou para o WhatsApp do médico agendar.
- O médico **não precisa investir em tráfego pago, produzir conteúdo ou contratar agência**. "Não somos agência de marketing." O tráfego é "próprio (não é Ads)".
- Entrega junto: **site vinculado ao sistema**, com o WhatsApp de preferência do médico. Suporte pela equipe de sucesso do cliente, via WhatsApp. O lead chega à secretária com mensagem pré-definida.
- Prova social: 4 imagens de resultados e um áudio. Argumento recorrente: "8 a 12 novos pacientes por mês", curva de crescimento, "os 2-3 primeiros meses são de estruturação" (cenário conservador).

### 3.2 Preço e modelo (como aparece nas conversas)
| Item | Observado |
|---|---|
| Preço cheio | R$ 1.800 por mês |
| Oferta apresentada | "Condição diferenciada" no plano anual, "abrimos 4 vagas nesse preço". Valores citados: R$ 367 por mês e R$ 697 por mês |
| Alternativa de 6 meses | 6 vezes de R$ 356 ("durante a parceria pode migrar para o anual") e total de R$ 4.182 dividido por 6 igual a R$ 697 (a diferença para o valor cheio seria taxa da plataforma de pagamento) |
| Contrato | Não há contrato assinado: o checkout da **Greenn** (links `payfast.greenn.com.br/146464/offer/...`) concentra as obrigações |
| Modelo | Anual por padrão, "não é engessado": aceitaram 6 meses quando o lead recusou o anual |

Os valores variam de uma conversa para outra. **Não verificado** qual é a tabela oficial de preços e vagas.

### 3.3 Roteiro de venda (padrão que aparece nas 4 conversas)
1. Bot qualifica (especialidade, pacientes por semana, preço da consulta, se investe em marketing, site ou Instagram).
2. Humano (Adriano) assume, responde dúvidas e propõe **vídeo chamada de 15 minutos** (pelo Google Meet, "de preferência pelo notebook"). Link do Meet enviado cerca de 5 minutos antes.
3. Humano manda o link da Greenn com o desconto. Pagamento confirmado: "Parabéns pela compra! Nossa equipe de sucesso do cliente vai te chamar".

### 3.4 Tempos até fechar (4 casos)
Mesmo dia, 1 dia, 3 dias e cerca de 4 semanas (esta com retomada humana 23 dias depois do silêncio). Amostra pequena: não generalizar.

### 3.5 Objeções vistas
Contrato anual ("não tenho interesse em anual"), quando começam os resultados, quantos leads por semana, se é possível filtrar por cidade e perfil social, valor do investimento, "como é possível sem anúncio?", se há garantia e se há contrato. Quem pergunta fora do roteiro do bot não recebe resposta do bot (ver §4.4).

---

## 4. Atendimento e automações (Umbler Talk)

### 4.1 Conta e API (somente leitura, verificado em 24/11/2026)
| Item | Valor |
|---|---|
| Plataforma | Umbler Talk (uTalk). Documentação: [app-utalk.umbler.com/api/docs](https://app-utalk.umbler.com/api/docs/index.html) |
| API | `https://app-utalk.umbler.com/api`. Especificação completa em `/api/docs/v1/docs.json` (não `swagger.json`, que dá 404) |
| Autenticação | Bearer. Quase todas as rotas pedem `organizationId` na consulta |
| Organização | `mednexus`, id `ajMlvCQ8P2Hg3g4U` |
| Usuário do token | Adriano Freitas, com permissões Member, Operator, Admin e Owner |
| Limite | 100 leituras a cada 5 segundos (cabeçalho `x-ratelimit-remaining`) |
| Setor padrão | `Geral` (`ajMlvCQ8P2Hg3g4X`) |
| Membro do Adriano (id usado na transferência do bot) | `ajMlvCQ8P2Hg3g4S` |

**Como gerar o token:** no menu azul da página de documentação, abrir **"Primeiros passos"** (o item de cima, acima de "API"; o item "API" do menu da Umbler Talk só leva à documentação). O passo 1 tem o link para gerar o token no "account": **novo token**, dar um nome, **criar**, copiar. No Swagger (botão Authorize) o valor leva "Bearer " antes do token.

**Lições de autenticação no n8n:**
- Usar credencial **Bearer Auth** com **só o token** (sem a palavra "Bearer"). No Kommo do Dr Thiago a credencial Header Auth deu 401 com o token certo; a Bearer funcionou.
- O token inteiro, como a Umbler entrega (nome do token, data e código), é um valor só. Funcionou colado inteiro.
- Descobrir a organização: `GET /v1/members/me/`.

**Rotas úteis (lidas ou na especificação):**
| Para quê | Rota |
|---|---|
| Canais | `GET /v1/channels/` |
| Bots e fluxos (configuração completa dos passos) | `GET /v1/bots/`, `GET /v1/bots/flowchart/` |
| Execuções reais de um fluxo | `GET /v1/bots/flowchart/botinstances/` (botId, Skip, Take, startUTC, endUTC) |
| Chats com filtros (estado, última mensagem, datas, setor, telefone) | `GET /v1/chats/` (parâmetros `ChatState`, `LastMessage`, `Order`, `ChatOrderBy`, `DateStartCreatedAtUTC`, `Skip`, `Take`) |
| Mensagens de um chat (até 250 por chamada) | `GET /v1/chats/{chatId}/relative-messages/` (`FromEventUTC` obrigatório) |
| Log de atividades | `GET /v1/activity-logs/` |
| Enviar mensagem simples | `POST /v1/messages/simplified/` (ToPhone, FromPhone, OrganizationId, Message) |
| Envio de template e de bot | Existem no conector do Make ("Enviar Mensagem Modelo", "Enviar Chatbot") |

Cuidados da API: várias rotas são marcadas **Unstable** (não suportadas, podem mudar). O campo `totalItems` da lista de chats vem 0 ou -1 e **não é confiável**. Webhooks existem ("Monitorar Canais"), mas o formato do payload **não foi verificado**.

### 4.2 Canais
| Canal | ID | Tipo | Estado |
|---|---|---|---|
| **Adriano API Oficial** | `anS6OpBMF_oRA1d6` | WhatsApp API oficial (Gupshup) | **Live** (é o canal do bot ativo) |
| Suporte Marina | `as6d5L97xlVnRzAE` | WhatsApp | Live |
| Atendentes | `ajMlvCQ8P2Hg3g4V` | Membros | Live |
| Equipe Mednexus API | `aqgEgFcVV8xpF_t-` | WhatsApp API oficial (Gupshup) | WaitingToGoLive (sem bot) |
| Adriano Freitas | `ajMlvCQ8P2Hg3g4W` | WhatsApp (broker) | Disabled |
| Equipe MedNexus | `aoYi4aBlTFsoKWG_` | WhatsApp (broker) | Disabled |
| Teste | `as5mQL97xlVnRzAE` | WhatsApp (broker) | Disabled |

### 4.3 Fluxos de bot
| Fluxo | ID | Ativo | Canal | Observação |
|---|---|---|---|---|
| **Fluxo atendimento versão 2** | `amtTEItDWzqY2xax` | **Sim** | Adriano API Oficial | 98 passos. 36 execuções contadas, a última em 24/11/2026 |
| Primeiro atendimento (antigo) | `ajM-W18X47lFCGbM` | Não | Adriano Freitas (desabilitado) | Última alteração em 30/07/2026. Foi o fluxo da conversa de 30/07 |
| Recuperação MQL | `atPl8d914OXV6Svr` | Não | nenhum | Criado em 17/10/2026, sem execuções |

### 4.4 Fluxo atendimento versão 2: como está configurado
**Entrada**
- Gatilhos: chat criado pelo contato, mensagem do contato e três gatilhos manuais (`Início`, `Recuperação`, `Recuperação com resposta`).
- Se for a **primeira conversa** do contato no canal: espera 5 s, adiciona a tag `Sem contato` (`ajqe4-Vjp4yju0pQ`) e faz a primeira pergunta.
- Se **não** for a primeira conversa: transfere direto para o Adriano. O bot não responde.

**Perguntas, em ordem** (cada uma só avança quando o lead responde; qualquer texto, áudio ou imagem vale, sem validação)
1. Especialidade.
2. Mensagem de apresentação, "Segue alguns resultados" e 4 imagens (pausas de 5 s).
3. Quantos pacientes por semana.
4. "Posso te enviar um áudio?" e envio do áudio.
5. Preço da consulta e ticket médio.
6. Mensagens de curva de crescimento e contratação anual, e a última: "Vc investe em marketing? Me envia site ou Instagram". **Aqui o fluxo termina.**

Pausas entre passos: 5 s, 30 s, 40 s, 2 min e 3 min.

**Follow-up de silêncio** (repete em cada pergunta; 5 mensagens)
| Passo | Quando sai | Texto |
|---|---|---|
| 1 | 1h30 sem resposta | "Muitos médicos chegam até nós pq dependem quase exclusivamente de indicações..." |
| 2 | +6h na pergunta 1, +5h nas demais | "Olá! Conseguiu verificar minha última mensagem?" |
| 3 | +5h | "Imagino que esteja corrido por aí..." |
| 4 | +5h | "Não tenho a intenção de te enviar mensagens em excesso..." |
| 5 | +5h | "Como não tive retorno, vou dar uma pausa no atendimento..." |
| Fim | +24h | O fluxo termina |

**Horário:** cada follow-up só sai entre 07:00 e 23:59 (America/Sao_Paulo). Fora disso espera até 07:00 do dia seguinte.

**Recuperação (gatilhos manuais):** `Recuperação` adiciona a tag, espera 24 h e, se o lead não respondeu, grava uma **nota privada** "o lead não respondeu em 24 h após a última mensagem de recuperação". `Recuperação com resposta` retoma o fluxo após 40 s.

### 4.5 Lacunas encontradas (por que o lead se perde)
1. **Falha de entrega sem plano B.** Toda mensagem espera 2 minutos pela confirmação de entrega, mas o destino de falha (`onDeliveryFail`) está **vazio em todos os passos**. Pelo desenho o bot para em silêncio. **Não verificado** nas execuções reais.
2. **O fluxo termina sem marca.** Depois do follow-up 5 e das 24 h, e depois da última pergunta, o fluxo acaba sem tag e sem registro de que o lead parou. **Não é para o bot avisar o Adriano** (a conversa é dele, decisão do Eduardo em 24/11/2026): o problema é o Adriano perder o controle de quem ficou parado. É isso que a lista diária (§7) resolve.
3. **Fim de semana atrasa.** Na pergunta 1, dois dos agendamentos noturnos valem só de segunda a sexta. Quem calar no sábado à noite recebe o follow-up só na segunda.
4. **A tag `Sem contato` nunca sai sozinha** (o fluxo só adiciona). Só serve de filtro se o Adriano a remover à mão.
5. **Pergunta fora do roteiro é ignorada.** Qualquer resposta avança o passo (visto nas conversas de leads que perguntaram preço e contrato no meio do roteiro). Sem ação: limitação do desenho do bot (Eduardo, 24/11/2026).
6. **Contato recorrente** vai direto ao Adriano, sem o bot e sem alerta além do aviso normal da Umbler.
7. **Mensagens duplicadas no histórico exportado:** as mensagens enviadas pela API aparecem duas vezes, uma como bot e outra como `<sem nome> (usuário desconhecido)`. As do Adriano e da Rosi também aparecem como "sem nome" em parte das conversas. Cuidado ao contar mensagens e ao separar humano de bot por nome.

### 4.6 Como distinguir bot, humano e lead na API
O objeto do chat traz `lastMessage` com `source` (por exemplo `Bot`), `sentByOrganizationMember`, `fromContact`, `botInstance` (nome do fluxo), `messageState` (visto `Received` em mensagem do bot), `question` (id da pergunta do bot) e `eventAtUTC`. Também traz `contact.tags`, `organizationMember` e o setor. Os **valores possíveis de `messageState`** e a forma de reconhecer falha de entrega **não foram verificados**.

### 4.6.1 O que a leitura real mostrou (24/11/2026, 250 chats abertos)
- `source` das mensagens: `Contact` (lead), `Bot`, `Member` (enviada pelo Adriano na Umbler ou por integração em nome dele) e `External` (enviada fora da Umbler; inclui **eco** das mensagens do bot e mensagens do Adriano pelo celular). `External` fica sempre em `Processing`: a Umbler não sabe se chegou.
- `messageState` vistos: `Processing`, `Received`, `Read`, `Played`, `Failed`, `Edited`, `Deleted`.
- **Falhas (`Failed`):** 107 mensagens de `Member` e 11 do `Bot` nos 250 chats. São dois casos diferentes:
  1. **Bot (texto livre):** as falhas aconteceram **mais de 24 h depois da última mensagem do lead** (janela de 24 h da API oficial do WhatsApp). A cadência de follow-up (1h30 + 6h + 5h + 5h + 5h, mais o adiamento noturno) passa das 24 h, e a mensagem 5 ("vou dar uma pausa") costuma falhar. Causa provável, a confirmar com o código de erro.
  2. **Contato ativo (templates):** as mensagens de `Member` a quem nunca escreveu **são templates** (têm `templateId`), não texto livre. Alguns templates falham quase sempre:

| Template | Texto inicial | Entregues | Falharam |
|---|---|---|---|
| `avSFKwtgN-FsNLP8` | "Olá! Fico feliz com o seu interesse na MedNexus" | 1 | 32 |
| `ann8kFZQ7E6feKjE` | "Oi! Tudo bem? Conseguiu verificar minha última mensagem?" | 1 | 20 |
| `anTT4os8TA3cZ5ef` | "Olá! Tudo certo?? Passando pra saber se ficou..." | 1 | 19 |
| `anTRAwR_zqiFVZm0` | "Olá! Será um prazer explicar! Me informa..." | 3 | 17 |
| `av7_a08f7k3tFLSv` | "Olá! Fico feliz com o seu interesse na MedNexus" (versão nova) | 31 | 18 |
| `av7_5U8f7k3tF4t-` | "Oi! Tudo bem? Conseguiu verificar..." (versão nova, 24/11) | 1 | 0 |

  Causa **não verificada** (template pausado ou rejeitado, categoria, limite de frequência de marketing do Meta). Ver o status de cada template no Gerenciador do WhatsApp e o código de erro da mensagem.
- Existe uma **sequência de contato ativo** para leads que não escreveram (provavelmente formulário): template de boas-vindas, template "Conseguiu verificar" cerca de 1h30 a 3h depois e template "Tudo certo?" horas depois, todos enviados como `Member` (Adriano). Depois disso, às 07:52 de 24/11, uma mensagem "Olá, bom dia! Gostaria de seguir o atendimento?" saiu como `External` (fora da Umbler) para vários leads ao mesmo tempo. **Não verificado** onde essa sequência está configurada (não é um bot da Umbler nem fluxo do n8n).
- Regra da lista diária (Eduardo, 24/11/2026): **não listar** lead sem resposta que ainda está numa automação (bot em cadência ou sequência de templates com passos pendentes). Só listar quando a automação já terminou.
- O parâmetro `DateStartCreatedAtUTC` da lista de chats **não filtrou** (vieram chats de agosto). Filtrar pela data de criação no próprio n8n. A lista vem ordenada pela última mensagem: com `Take=250` cobriu tudo com atividade desde 19/11.

### 4.7 Falha de entrega: soluções possíveis (a decidir)
O destino de falha (`onDeliveryFail`) está vazio em todos os passos. A causa das falhas **não é conhecida**: só a medição nas mensagens reais diz se é número inválido, contato sem WhatsApp, janela de 24 h ou bloqueio. Opções:
| Opção | O que faz | Mexe no bot? |
|---|---|---|
| A. Detectar e listar | A lista diária (§7) inclui, na lista 1, o lead cuja mensagem do bot não teve entrega confirmada. O Adriano tenta por ligação ou Instagram | Não |
| B. Marcar o lead | Além de listar, o n8n coloca a tag `Falha de entrega` no chat (`POST /v1/chats/{id}/tags/`), para o Adriano filtrar na Umbler | Não (grava tag, exige aprovação) |
| C. Plano B dentro do fluxo | Em cada passo, `onDeliveryFail` vai para: esperar alguns minutos, reenviar uma vez e, se falhar de novo, adicionar tag `Falha de entrega` e transferir para o Adriano | Sim (editar o fluxo de 98 passos, só com pedido explícito) |
Recomendação: começar por A, medir quantas falhas existem e de que tipo, e só então decidir B ou C.

---

## 5. Dados e planilha
Planilha: [MEDNEXUS \| Planilha Central](https://docs.google.com/spreadsheets/d/1npTWHf_taXBhGlOT-WFtlt7CvX44sVbKf8WGs8nQhgE/edit) (`1npTWHf_taXBhGlOT-WFtlt7CvX44sVbKf8WGs8nQhgE`). Compartilhada com a conta de serviço? **Não verificado.**

| Aba | Conteúdo | Alimentada por |
|---|---|---|
| `Conversas 💬` (~1.957 linhas, desde 30/06/2026) | **Início** da conversa: data, mensagem, nome, telefone, compra (SIM/NÃO), faturamento, receita, campanha, conteúdo, anúncio, especialidade | Webhook da Umbler. Link: [aba](https://docs.google.com/spreadsheets/d/1npTWHf_taXBhGlOT-WFtlt7CvX44sVbKf8WGs8nQhgE/edit?gid=718101807#gid=718101807) (gid informado pelo Eduardo) |
| `New Subscriptions 🛒` | Vendas: data, nome, e-mail, telefone, produto, oferta, faturamento, receita, método, UTMs, campanha, conteúdo, anúncio e endereço (desde 26/06/2026) | Webhook de vendas (Greenn). Link: [aba](https://docs.google.com/spreadsheets/d/1npTWHf_taXBhGlOT-WFtlt7CvX44sVbKf8WGs8nQhgE/edit?gid=510373601#gid=510373601) (gid informado pelo Eduardo) |
| `All Payments 🛒` | Pagamentos (poucas linhas) | Webhook de vendas |
| `Controle de Vendas 🛒` | Resumo de faturamento | Fórmulas |
| `Leads 👥`, `QLFs`, ` DSQs ❌` | Leads do site/formulário com MQL (DSQ ou QLF), fbc, fbp, UTMs | Webhook do site |
| `Lead Form Nativo 👥` | Leads do formulário nativo do Meta | Meta |
| `Meta Ads 📥` | Gasto, impressões e leads por dia e anúncio | Importação do Meta |
| `Criativos 🎴`, `Links Trackeados 🔗`, `Páginas 🖥️`, `Swipe File` | Biblioteca de criativos, links com UTM, páginas e referências | Manual |
| `KPIs 📢`, `Placement`, `Budget \| Tráfego 💰`, `Track da Meta 📊`, `FSE ...`, `Testes` | Painéis e planejamento | Fórmulas e manual |

**Limites:** a aba `Conversas` não tem última mensagem, nem quem falou por último, nem o passo do funil. Serve como lista-mestre de quem iniciou conversa e como base para cruzar com as vendas pelo telefone, mas **não** mede travamento de bot nem tempo de resposta. Esses dados só existem na Umbler.
Leitura pelo conector do Drive entrega apenas uma amostra de cada aba. Para ler as linhas completas pelo n8n é preciso compartilhar a planilha como Editor com a conta de serviço (e-mail em [`../setup-geral.md`](../setup-geral.md)). A aba `Testes` tem a coluna "Tempo" e **não foi lida**.

---

## 6. Ativos no n8n
Pasta: `MedNexus` (`hR1cAjU9b5L0fJ9l`), projeto pessoal do Eduardo.

### Fluxos
| Nome | ID | Status |
|---|---|---|
| [`Flow \| MedNexus \| Geral \| Manual > Umbler - Testa leitura da API`](https://n8n.srv2164786.hstgr.cloud/workflow/ZZ0OtrIo47IOHAUf) | `ZZ0OtrIo47IOHAUf` | Teste manual, só leitura. Apagar à mão quando não for mais necessário |
| [`Flow \| MedNexus \| Geral \| Manual > Umbler - Explora canais, bots e chats`](https://n8n.srv2164786.hstgr.cloud/workflow/b5DfDkADtzgqYsHx) | `b5DfDkADtzgqYsHx` | Exploração manual, só leitura. Apagar à mão quando não for mais necessário |

| [`Flow \| MedNexus \| Geral \| Manual > Umbler - Lista leads dos últimos 3 dias (teste)`](https://n8n.srv2164786.hstgr.cloud/workflow/qotDB1WrfoorLNDX) | `qotDB1WrfoorLNDX` | Teste manual, só leitura: chats abertos e até 100 mensagens de cada. A classificação foi feita fora do n8n (1º teste em 24/11/2026). Base para o fluxo diário |

Nenhum fluxo de produção do MedNexus no n8n. Os webhooks de conversas e de vendas que alimentam a planilha **não estão no n8n** (origem a descobrir: pode ser Make ou outro).

### Credenciais
| Nome | Onde fica | Status |
|---|---|---|
| `Bearer Auth account` (renomear para `Cred \| MedNexus \| Umbler API - mednexus`) | [Credenciais do n8n](https://n8n.srv2164786.hstgr.cloud/home/credentials), ID `8WDy2VzzHe2L6Jre` | Testada em 24/11/2026 (`GET /v1/members/me/` = 200). O token foi colado no chat: **apagar na Umbler e gerar outro** |

---

## 7. Automação em estudo: lista diária de leads para o Adriano
**Objetivo:** todo dia, listar para o Adriano trabalhar à mão os leads que travaram no bot, ficaram sem resposta ou esfriaram. Envio para um número pré-definido ou um canal da conta. **Ainda não construída.**

### 7.1 Regras propostas (provisórias, a validar com o Eduardo)
| Lista | Regra | Limite inicial |
|---|---|---|
| 1. Bot atrasado ou travado | Última mensagem é do lead e o bot não respondeu. Mensagem do bot sem entrega confirmada também entra | 10 minutos (o bot responde em até 3 min, mais 2 min de confirmação) |
| 2. Follow-up que não entrou ou cadência terminada | Pelo calendário da §4.4, a hora em que o próximo follow-up deveria sair já passou e o lead continua na mesma última mensagem. Também entra quem terminou a cadência (mensagem de pausa e 24 h) ou parou na última pergunta | 30 minutos de margem |
| 3. Humano deixou esfriar | Lead respondeu depois que o bot terminou e ninguém falou com ele. Ou o humano falou por último, com proposta ou link, e o lead não voltou | 2 horas úteis e 24 horas. **A calibrar** com as conversas de quem comprou |

**Exclusões:** quem já comprou (cruzar telefone com `New Subscriptions`), quem já foi listado nos últimos N dias e quem disse que não tem interesse.

### 7.1.1 Regras refinadas com o Eduardo (24/11/2026, valem para o relatório que vai ao comercial)
**Categorias do relatório** (cada número aparece uma vez só, na categoria mais urgente):
1. **Respondeu e está esperando o humano** (janela aberta). Mostrar a hora em que a janela fecha.
2. **O humano falou por último e o lead não respondeu** (janela aberta). Nunca misturar com a categoria 1.
3. **Janela de 24 h encerrada, automação sem funcionar:** mais de 24 h desde a última mensagem do lead e nenhuma automação pendente. Só template alcança. Inclui quem parou no bot e a mensagem final do bot falhou.
4. **Nunca responderam:** só receberam template de primeiro contato e os follow-ups falharam. Contato por outro canal.

**Quem sai da lista:**
- Quem comprou ("Parabéns pela compra"), quem deu **negativa na última mensagem** (olhar só a última do lead) e quem do canal `Suporte Marina`.
- Quem ainda está em automação: bot dentro da cadência ou sequência de templates com passos pendentes.
- Bot que terminou com a mensagem de finalização **entregue** ("vou dar uma pausa"). Só entra se ela falhou.
- Lead que disse que vai pensar, analisar ou averiguar ("Vou analisar", "Vou averiguar e te falarei") e foi confirmado: só entra depois de **36 h** sem resposta.
- O humano já assumiu: a etapa passa a ser "Conversa com o humano", não a última pergunta do bot.
- Mensagem recente do humano (menos de cerca de 6 h): ainda é cedo para cobrar.
- Lead que já recebeu proposta de preço e não respondeu: **entra todos os dias**, até responder, recusar ou comprar.

**Link do contato no relatório:** abrir direto o chat na Umbler, no formato `https://app-utalk.umbler.com/chats/<chatId>` (o `chatId` vem de `GET /v1/chats/`, campo `id` do chat). Não usar `wa.me`.

**Cuidados na leitura:** ler a Umbler na hora de montar e enviar (uma leitura de 5 minutos atrás já perdeu uma resposta). `External` é eco do bot ou mensagem enviada fora da Umbler: não conta como resposta do lead.

**Pendências de regra:** (a) confirmar se os follow-ups `External` ("Vamos seguir?", "Gostaria de seguir o atendimento?", disparo das 07:52 para ~30 chats) são automação e onde ficam; (b) decidir se "vou pensar" vira lista com 36 h (janela já fechada) ou com cerca de 20 h (ainda dá texto livre); (c) o Box Seat Productions ficou fora do relatório por causa de (a).

### 7.2 Desenho
1. Fluxo agendado diário (ex.: 09:00) lê as conversas da Umbler (`/v1/chats/`) e as mensagens necessárias, aplica as regras e grava a lista numa aba nova da planilha, com o link `wa.me` de cada lead.
2. Primeiro entregar **sem enviar nada**, só a aba, para o Eduardo validar a lista.
3. Depois, o envio ao Adriano. A API oficial do WhatsApp só permite texto livre dentro das 24 h desde a última mensagem dele ao canal. Fora disso, só **template aprovado** (por exemplo, "Sua lista de contatos do dia" com link para a planilha). Alternativa: e-mail, ClickUp ou Slack.
4. Seguir o padrão de nomes (`Flow | MedNexus | <Funil> | Agendado > Sheets - ...`), `useAppend: true` no Sheets e guardar o controle anti-duplicata só depois da gravação (`padrao-n8n.md` §2.7).

---

## 8. Pendências
- [ ] Apagar o token da Umbler que foi colado no chat, gerar outro e colar direto na credencial do n8n.
- [ ] Renomear a credencial para `Cred | MedNexus | Umbler API - mednexus`.
- [ ] Definir o nome do funil para o padrão de nomes (usar `Geral` por enquanto).
- [ ] Medir nas execuções reais (`/v1/bots/flowchart/botinstances/`): tempo de resposta do bot, mensagens que falham e o que acontece quando `onDeliveryFail` está vazio.
- [ ] Descobrir os valores possíveis de `messageState` e o formato do webhook da Umbler.
- [ ] Confirmar com o Adriano: se ele remove a tag `Sem contato` à mão; quem dispara os gatilhos "Recuperação"; qual é a tabela oficial de preços e vagas.
- [ ] Definir como a lista chega ao Adriano (template aprovado ou outro canal) e o número ou canal de destino.
- [ ] Compartilhar a Planilha Central com a conta de serviço (para o n8n ler) e ler a aba `Testes`.
- [ ] Descobrir onde estão os webhooks de conversas e de vendas que alimentam a planilha (não estão no n8n).
- [ ] Localizar o briefing do cliente.
- [ ] Corrigir no guia de Meta Ads a campanha de 02/09 (R$ 9,50 contra R$ 11,76).
- [ ] Falha de entrega (§4.5, item 1): decidir a solução (ver §4.7). **Não alterar o fluxo da Umbler sem pedido explícito.**
- [ ] Cron de fim de semana (§4.5, item 3): Eduardo respondeu "ok" em 24/11/2026; confirmar se é para corrigir ou deixar como está.
- [ ] Itens 2 e 5 da §4.5: sem ação no bot. O item 2 é coberto pela lista diária (§7).

## 9. Acessos
| Data | O quê | Com quem / qual conta |
|---|---|---|
| 24/11/2026 | Token da API da Umbler (credencial no n8n, só leitura nas chamadas feitas) | Conta do Adriano Freitas na organização `mednexus` |
| 24/11/2026 | Leitura da Planilha Central pelo conector do Drive (amostra) | Conta do Eduardo |

## 10. Histórico
| Data | O que aconteceu |
|---|---|
| 30/10/2026 | Verba do Meta ajustada de R$ 510 para R$ 99,77 (ver guia de Meta Ads) |
| 24/11/2026 | Primeiro estudo da conta de atendimento: 4 conversas de leads que fecharam, planilha central, API e fluxos da Umbler. Pasta e 2 fluxos de teste criados no n8n. Documento do cliente criado |
