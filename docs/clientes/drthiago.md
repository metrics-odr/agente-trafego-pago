# Dr Thiago Virgili

Atualizado em 20/11/2026. **Estado completo do Kommo: [Manual de Infraestrutura](../manual-infraestrutura-kommo-drthiago.md). Como replicar: [Manual de Implementação](../manual-implementacao-kommo.md).**

## 1. Resumo
| Item | Valor |
|---|---|
| Campo `Cliente` no padrão | `DrThiago` |
| Status | Ativo |
| Funis | `WhatsApp` · `Geral` |
| Pasta no n8n | [`DrThiago`](https://n8n.srv2164786.hstgr.cloud/projects/srRTMbP5mWVNIiQr/folders/YRtSf5VPUy0aOp7Q/workflows) (`YRtSf5VPUy0aOp7Q`) |
| Briefing | A preencher |
| Conta Google dona da planilha | `drthiagovirgili.coprod@gmail.com` |

## 2. Funis

### 2.1 WhatsApp
| Item | Valor |
|---|---|
| Origem do lead | Anúncio no Instagram → mensagem pronta no WhatsApp → Kommo (lead não triado) |
| Métrica principal | Conversa iniciada (1 por telefone) |
| Campanhas Meta | A preencher |
| Fluxos n8n | [`Flow \| DrThiago \| WhatsApp \| Kommo > Sheets - Registra conversas iniciadas do Instagram`](https://n8n.srv2164786.hstgr.cloud/workflow/qPWy230Z8Cw5N8Uj) |
| Abas da planilha | [`Conversas Iniciadas 💬`](https://docs.google.com/spreadsheets/d/1EcPFdCtd75HNN8xz4B7UU2KjSSkEYW4MkQRYgQArnRk/edit#gid=718101807) |
| Regras | A mensagem entra se CONTÉM qualquer frase da tabela `Frases da Primeira Mensagem` (sem diferenciar maiúsculas e acentos). 1 linha por telefone. Só lê `unsorted.add` |

Frases atuais: `Olá! Vim do Instagram e queria agendar uma consulta com Dr. Thiago`, `Olá! Posso ter mais informações sobre isso?`, `Olá! Posso ter mais informações sobre a consulta?` (as duas últimas adicionadas em 16/11 depois que o anúncio mudou de mensagem). **Para trocar a mensagem do anúncio, editar a tabela de frases** ([Data tables](https://n8n.srv2164786.hstgr.cloud/home/datatables)) (não precisa republicar o fluxo).

### 2.2 Geral (etapas do Kommo, todos os leads)
| Item | Valor |
|---|---|
| Origem do lead | Lead movido para a etapa **AGENDADO** no Kommo (qualquer origem) |
| Métrica principal | Agendamento (1 por lead) |
| Campanhas Meta | Todas (não filtra origem) |
| Fluxos n8n | [`Flow \| DrThiago \| Geral \| Kommo > Sheets - Registra leads agendados`](https://n8n.srv2164786.hstgr.cloud/workflow/iK9iVYgAMyxVUUyU) |
| Abas da planilha | [`Agendamentos 📅`](https://docs.google.com/spreadsheets/d/1EcPFdCtd75HNN8xz4B7UU2KjSSkEYW4MkQRYgQArnRk/edit#gid=439827908) |
| Regras | Payload bruto guardado no histórico antes de tudo. 1 linha por lead. Nome e telefone vêm da API do Kommo (lead com contatos, depois contato: `name` e campo `PHONE`); se a API falhar, da aba Conversas pelo `entity_id`; sem nenhum dos dois entra só com Data e entity_id. Ligado à credencial Bearer e publicado em 17/11/2026 |

## 3. Contas e sistemas
### 3.1 Meta Ads
| Item | Valor |
|---|---|
| Business (BM) | A preencher |
| Conta(s) de anúncios | A preencher (não está em `contas.md`) |
| Pixel | A preencher |
| Página / Instagram | A preencher |

### 3.2 CRM (Kommo)
| Item | Valor |
|---|---|
| Conta | [https://contourculptclinique.kommo.com](https://contourculptclinique.kommo.com) (subdomínio `contourculptclinique`, também `.amocrm.com`), account ID `36177499` · [Integrações e Web hooks](https://contourculptclinique.kommo.com/settings/widgets/) |
| Pipeline das conversas | [`13296523`](https://contourculptclinique.kommo.com/leads/pipeline/13296523) |
| Etapas relevantes | `AGENDADO` (ID a confirmar: o webhook não envia `status_id`) |
| Canal WhatsApp | `5511942946718`, "Dr Thiago V" (WhatsApp Lite do Kommo), source_id `23084963` |
| API | Token de longa duração (integração privada "n8n"), credencial `Cred \| DrThiago \| Kommo API - contourculptclinique (Bearer)`. A API responde `application/hal+json`: nos nós HTTP usar Response Format = JSON, senão o n8n entrega o corpo como texto em `$json.data` |

## 4. Planilhas
| Planilha | Link / ID | Compartilhada com a conta de serviço? |
|---|---|---|
| [`Dr Thiago \| Planilha Central`](https://docs.google.com/spreadsheets/d/1EcPFdCtd75HNN8xz4B7UU2KjSSkEYW4MkQRYgQArnRk/edit) (`1EcPFdCtd75HNN8xz4B7UU2KjSSkEYW4MkQRYgQArnRk`) | Sim, Editor ([e-mail da conta de serviço](../setup-geral.md#2-google-conta-de-serviço)) |

| Aba | Colunas (ordem) | Quem preenche |
|---|---|---|
| [`Conversas Iniciadas 💬`](https://docs.google.com/spreadsheets/d/1EcPFdCtd75HNN8xz4B7UU2KjSSkEYW4MkQRYgQArnRk/edit#gid=718101807) | Data, entity_id, chat_id, contact_id, autor_id, Nome, Mensagem, Telefone, Status | n8n preenche A–H. **Status (I) é da equipe: o n8n não mexe** |
| [`Agendamentos 📅`](https://docs.google.com/spreadsheets/d/1EcPFdCtd75HNN8xz4B7UU2KjSSkEYW4MkQRYgQArnRk/edit#gid=439827908) | Data, Nome, Telefone, entity_id | n8n |

Chave para cruzar abas: **`entity_id` = lead_id do Kommo**. Na aba Conversas, `entity_id` e `contact_id` têm o mesmo valor (herança do Make).

## 5. Ativos no n8n (inventário único deste cliente)
### Fluxos
| Nome | ID | Webhook de produção | Onde está configurado na origem | Status |
|---|---|---|---|---|
| [`Flow \| DrThiago \| WhatsApp \| Kommo > Sheets - Registra conversas iniciadas do Instagram`](https://n8n.srv2164786.hstgr.cloud/workflow/qPWy230Z8Cw5N8Uj) | `qPWy230Z8Cw5N8Uj` | `https://n8n.srv2164786.hstgr.cloud/webhook/drthiago-whatsapp-kommo-sheets-conversas` | [Kommo → Configurações → Integrações → Web hooks](https://contourculptclinique.kommo.com/settings/widgets/) (lead não triado). **Conferir se já aponta para cá e não mais para o Make** | Publicado |
| [`Flow \| DrThiago \| Geral \| Kommo > Sheets - Registra leads agendados`](https://n8n.srv2164786.hstgr.cloud/workflow/iK9iVYgAMyxVUUyU) | `iK9iVYgAMyxVUUyU` | `https://n8n.srv2164786.hstgr.cloud/webhook/drthiago-geral-kommo-sheets-agendamentos` | [Kommo → funil digital](https://contourculptclinique.kommo.com/leads/pipeline/13296523) → etapa AGENDADO → gatilho Webhook "Quando movido para esta etapa", sem condição | Publicado e recebendo |
| [`Flow \| DrThiago \| Lead Ads \| Sheets > Kommo - Cria lead de entrada de quem não iniciou conversa`](https://n8n.srv2164786.hstgr.cloud/workflow/ZOpMsL7IrL8w1wKo) | `ZOpMsL7IrL8w1wKo` | — (agendado a cada 1 min, lê a aba `Lead Instant Form 👥`) | Aba da Planilha Central preenchida pelo Lead Ads em tempo real | **PUBLICADO em 23/11/2026 por ordem do Eduardo.** `DATA_CORTE` = 23/11/2026 10:36 (-03:00): leads anteriores são ignorados. Regras: espera 5 min; 1 por id do Meta; **telefone comparado por DDD + últimos 8 dígitos** (ignora `+55`, máscara e o nono dígito); já tem lead no Kommo (contato confirmado pela mesma chave) ou já está na tabela de conversas registradas = não cria (só nota, quando há lead); falha real na consulta ao Kommo para o fluxo sem registrar; senão cria em Leads de entrada do funil `13296523` com a tag `Lead Ads - Recuperar` |
| [`Flow \| DrThiago \| Geral \| Kommo > Sheets - Registra leads que compraram`](https://n8n.srv2164786.hstgr.cloud/workflow/PQAMxyyAqoiHr35w) | `PQAMxyyAqoiHr35w` | `https://n8n.srv2164786.hstgr.cloud/webhook/drthiago-geral-kommo-sheets-compras` | Kommo → funil `13296523` → etapa `142` Compareceu e fechou procedimento → gatilho Webhook "Quando movido para esta etapa". **AINDA NÃO CRIADO no Kommo** | **PUBLICADO em 26/11/2026 por ordem do Eduardo** (construído 20/11). Sem valor no lead, Faturamento e Receita = 20.000 (ticket médio, ordem do Eduardo). Grava na aba `Compras 🛒`: Data (closed_at), Nome, Email, Telefone, Produto (Procedimento Fechado), Faturamento e Receita (valor do lead; se vazio, 20.000), utm_cap-source (campo Origem), Campanha/Conjunto/Anúncio (IDs de Meta Ads do lead), Cidade, Profissional. Oferta, Método, UF, Zip e Endereço ficam vazios. Confere ao vivo que o lead está na etapa 142 do funil 13296523. Anti-duplicata `vH3XqXwJ7YpnVJsQ`, histórico `XIPLen8kCAJU2XVQ` |
| [`Flow \| DrThiago \| Geral \| Manual > Sheets - Regrava agendados sobrescritos (uso único)`](https://n8n.srv2164786.hstgr.cloud/workflow/PCyRC8FsN6p1q9Qw) | `PCyRC8FsN6p1q9Qw` | — | — | Já executado. Pode ser apagado |

### Meta Ads: campanha Lead Ads (23/11/2026)
Conta **CA 03 - Dr Thiago Virgili** (`1798165994636924`), BM `1268521450802238`. Página `556646554204800`, Instagram `17841408021639808`. Formulário nativo: `DrThiago - Form 001` (`1887461179334504`).

| Tipo | Nome | ID | Pai | Mídia | Estado |
|---|---|---|---|---|---|
| Campanha | `DRTV \| E2-CAP \| P1-QUENTE \| ABO \| LEAD ADS \| 2026-11-07 \| Endomela \| Teste de Ads` | `52643121054382` | n/a | n/a | Publicada ACTIVE (23/11) |
| Conjunto | AUTO \| Mix PQ (R$ 40/dia, ON_AD, LEAD_GENERATION) | `52643121092182` | `52643121054382` | n/a | Publicado (IN_PROCESS na primeira leitura) |
| Anúncio | AD02_VID_Endomela | `52643121186182` | `52643121092182` | vídeo `1044854615117310` | Publicado |
| Anúncio | AD03_VID_Endomela | `52643121166382` | `52643121092182` | vídeo `1478868656489026` | Publicado |
| Rascunho descartável | mesma campanha (duplicata pela tela) | `52643109978782` | n/a | sem mídia | Com erro, público errado (Brasil 18-65). Descartar no Gerenciador |

Origem: campanha de mensagem `52640779432782` (2 conjuntos de R$ 20, unidos em 1 conjunto de R$ 40). Público, posicionamentos (Feed, Stories e Reels do Instagram, mantidos por ordem do Eduardo), vídeos, Página e Instagram iguais ao original; muda só destino (WhatsApp → formulário), CTA (Cadastre-se) e otimização (geração de cadastros).

### Data tables
Abrir em [Data tables](https://n8n.srv2164786.hstgr.cloud/home/datatables).

| Nome | ID | Colunas | Para quê |
|---|---|---|---|
| `Table \| DrThiago \| WhatsApp \| Frases da Primeira Mensagem` | `R6S6DOuurjZMzzho` | frase | Frases aceitas na primeira mensagem |
| `Table \| DrThiago \| WhatsApp \| Conversas registradas (anti-duplicata)` | `rl3pVO73UzAPoMmP` | chave, telefone, lead_id, registrado_em | Telefones já registrados em Conversas |
| `Table \| DrThiago \| Geral \| Agendamentos registrados (anti-duplicata)` | `6EpypQN05XhKHaAw` | lead_id, telefone, registrado_em | Leads já registrados em Agendamentos |
| `Table \| DrThiago \| Lead Ads \| Leads do formulário registrados (anti-duplicata)` | `EbiBgy55PbLmHgmh` | lead_ads_id, telefone, resultado, kommo_lead_id, registrado_em | Leads do formulário já tratados (`criado_em_leads_de_entrada`, `ja_existia_no_kommo`, `sem_telefone_valido`) |
| `Table \| DrThiago \| Geral \| Payloads do Agendado (histórico)` | `8M8KvwbZrkxyxN8B` | recebido_em, payload | Todo payload bruto da etapa Agendado |

### Credenciais
| Nome | Onde fica | Status |
|---|---|---|
| Google (conta de serviço, compartilhada) | [Credenciais do n8n](https://n8n.srv2164786.hstgr.cloud/home/credentials), ver [`setup-geral.md`](../setup-geral.md) §2 | Ativa |
| `Cred \| DrThiago \| Kommo API - contourculptclinique (Bearer)` | [Credenciais do n8n](https://n8n.srv2164786.hstgr.cloud/home/credentials), Bearer Auth, ID `PmUQ0wuZMqEO5hMV` | **Ativa e testada em 17/11/2026** (`GET /api/v4/account` = OK). Token de longa duração da integração privada "n8n" da Kommo (válido até 2031). Ligada aos nós "Buscar lead/contato no Kommo" do fluxo de agendamentos em 17/11/2026 |
| `Cred \| DrThiago \| Kommo API - contourculptclinique` (Header Auth, ID `Cgo9FqhIAFVTFu5O`) | Credenciais do n8n | **Obsoleta**: deu 401 mesmo com o token certo (valor salvo errado). Sem uso em fluxos. Apagar/renomear à mão. Usar a versão Bearer |

## 6. Payloads conhecidos (confirmados com dados reais)
- **Lead novo não triado** ([Web hooks da conta](https://developers.kommo.com/docs/webhooks-general)), JSON aninhado:
  `account{id, subdomain, _links.self}` e `unsorted.add[]{lead_id, created_at, pipeline_id, source_data{name, client.id, data[].text, origin.chat_id}, data.contacts[]{name, custom_fields[PHONE].values[].value}}`.
- **Funil digital, lead movido para AGENDADO** ([doc](https://developers.kommo.com/docs/webhooks-dp)): `application/x-www-form-urlencoded`, user-agent `amoCRM-Webhooks/3.0`. Corpo: `leads[status][0][id]`, `account[id]`, `account[subdomain]`. **Só IDs: sem nome, telefone nem etapa.** Ao marcar "aplicar a todos os leads já nesta etapa", o Kommo manda todos ao mesmo tempo (23 em 1 segundo em 15/11).

## 7. Como testar sem sujar dados reais
- Usar IDs fictícios (`TESTE-...`) ou mensagens sem a frase (são descartadas sem gravar).
- Depois de um teste que grava: apagar a linha na aba e a linha correspondente nas data tables `(anti-duplicata)` e `(histórico)`. **Se o lead de teste for real e ficar no controle, o agendamento real dele será ignorado.**

## 8. Acessos
| Data | O quê | Com quem / qual conta |
|---|---|---|
| 15/11/2026 | [Planilha Central](https://docs.google.com/spreadsheets/d/1EcPFdCtd75HNN8xz4B7UU2KjSSkEYW4MkQRYgQArnRk/edit) compartilhada como Editor | Conta de serviço `automations@gen-lang-client-0448992217.iam.gserviceaccount.com` |
| 15/11/2026 | Token de API do Make (us2, `hooks:read`) | Ambiente da sessão do Claude. **Exposto no chat: apagar** |

## 9. Legado (Make)
- Cenário [`Dr Thiago Conversas`](https://us2.make.com/public/shared-scenario/2aZm6SDRXax/dr-thiago-conversas) na conta do Thiago ([us2.make.com](https://us2.make.com)).
- Webhook "Conversa Nova" (hook `3036546`), data store `kommo_primeira_msg` (`198180`).
- Acesso: o conector Make do Claude está logado na conta do Eduardo e **não enxerga** a conta do Thiago (`Access denied`). Usar a API direta `https://us2.make.com/api/v2/...`, que funciona com a credencial da sessão.
- Cenário está ativo mas **pausado** (`isPaused`), por isso a fila não anda. Último lead real na fila: 15/11 18:33 (frase diferente, descartado). Item vazio em 15/11 20:38 = troca da URL no Kommo.
- A fila de 36 itens foi migrada para o n8n em 15/11 (11 conversas novas gravadas). **Não religar o cenário**: a fila do Make ainda tem os 36 itens e gravaria tudo em dobro.

## 10. Pendências
- [ ] Preencher dados de Meta Ads (BM, conta, pixel, página, campanhas por funil) e incluir o cliente em [`contas.md`](../contas.md).
- [ ] Corrigir a URL do webhook "Lead de entrada adicionado" no Kommo: estava `/webhook/kommo-dr-thiago-conversas` (404). Certo: `/webhook/drthiago-whatsapp-kommo-sheets-conversas`.
- [ ] Remover o gatilho de "lead mudou de etapa" (102536263 → 102536315, duplicado) que aponta para a URL de Conversas (provavelmente no funil digital).
- [ ] Apagar o fluxo criado por engano [`Flow | DrThiago | WhatsApp | Manual > Sheets - Grava conversas perdidas no webhook (uso único)`](https://n8n.srv2164786.hstgr.cloud/workflow/sq78ihYQqMs9BiE1) (nunca executado).
- [ ] Regravar na aba Conversas os leads reais descartados em 16/11 por mensagem fora das frases (conferir execuções com `unsorted[add]` e resultado vazio em "Normalizar conversa").
- [ ] Completar Nome e Telefone das 17 linhas recuperadas em 16/11 (entity_id 56436997 a 56444101).
- [ ] Apagar o token do Make exposto no chat ([us2.make.com](https://us2.make.com) → Profile → API access).
- [ ] Decidir se remove os nós "Buscar lead/contato no Kommo" (sem token não fazem nada).
- [ ] Apagar o [fluxo de uso único](https://n8n.srv2164786.hstgr.cloud/workflow/PCyRC8FsN6p1q9Qw).
- [ ] Limpar testes: linhas `TESTE-APAGAR` e `56433815` (gih) na aba Agendamentos e na tabela de agendamentos registrados.
- [ ] Validar o append atômico com envios simultâneos reais.
- [ ] Localizar no Drive do Kommo (páginas 5+) os vídeos de 0:54 (Dr Thiago) e 0:22 (Dra Fernanda) e saber qual Salesbot envia cada vídeo. Ver [vídeos do Kommo](../kommo-videos-contour-clinique.md).
- [ ] **Lead Ads → Kommo (fluxo `ZOpMsL7IrL8w1wKo` PUBLICADO em 23/11/2026):** ligado por ordem do Eduardo **sem** estes itens do checklist: (a) apagar à mão o lead `56589051` e o contato `53863081` de teste no Kommo; (b) conferir Kommo → Fontes → Facebook (se estiver ligada ao Form 001, o lead entra duas vezes); (c) teste com número real do Eduardo (não se sabe se algum bot manda WhatsApp). Acompanhar os primeiros leads reais na tabela de controle `EbiBgy55PbLmHgmh` e no Kommo. Ver [Manual de Infraestrutura §5](../manual-infraestrutura-kommo-drthiago.md).
- [ ] **Campanha Lead Ads (Meta, CA 03 `1798165994636924`)**: publicada em 23/11/2026, ver §Meta Ads abaixo. Falta conferir na tela: formulário selecionado nos 2 anúncios, mídias, Instagram e "Related media" em 0. Descartar à mão no Gerenciador o rascunho `52643109978782` (a API não exclui rascunho).
- [ ] (histórico) Lead Ads → Kommo: ver projeto em [Manual de Infraestrutura §5](../manual-infraestrutura-kommo-drthiago.md). Falta abrir os Salesbots Distribuição e Entrada Thiago e documentar o FUP com vídeos.
- [ ] Apagar o [fluxo de leitura do Kommo](https://n8n.srv2164786.hstgr.cloud/workflow/2cqdDHyFGAZOu0lz) (uso único).

## 11. Histórico de mudanças
| Data | Mudança |
|---|---|
| 26/11/2026 | Fluxo `PQAMxyyAqoiHr35w` (leads ganhos → aba Compras) retomado: cabeçalho real da aba lido (18 colunas A–R), incluída a coluna Receita e a conferência ao vivo da etapa 142. **Publicado em 26/11** a pedido do Eduardo; ticket médio 20.000 quando o lead não tem valor; faltam o gatilho no Kommo, teste com lead real e ordem do Eduardo para publicar. Criados por engano nesta sessão (apagar à mão): fluxo de leitura `ot2t5e2GDLleh8HB` e a data table `Payloads dos Ganhos (histórico)` (`kZoEkbe4BYYusJJd`), duplicada da `XIPLen8kCAJU2XVQ` |
| 26/11/2026 | **API de Conversões do Meta** ligada nos dois fluxos, pixel `Pixel Thiago Virgili` (`1309021197390072`, BM `1268521450802238`): `Purchase` no fluxo de Compras (`PQAMxyyAqoiHr35w`) e `Schedule` no de Agendados (`iK9iVYgAMyxVUUyU`). Ramo paralelo depois de gravar na planilha; event_id `purchase_<lead>` / `schedule_<lead>`; `action_source` system_generated; user_data com em, ph, fn, ln, ct, st, country, external_id, fbc (se o lead tem fbclid) e lead_id do Lead Ads (se houver no campo Queixa), tudo com SHA-256; custom_data com valor/BRL, produto, profissional, origem, UTMs e IDs do Meta Ads. Purchase só vai com venda de até 7 dias; sem valor real usa o ticket médio e marca `valor_estimado`. Pulos e falhas vão para o histórico de cada fluxo. **Token da API de Conversões está dentro do nó HTTP de cada fluxo (não em credencial) e foi colado no chat: gerar outro e mover para uma credencial Bearer do n8n.** Não testado com lead real |
| 25/11/2026 | Fluxo Lead Ads → Kommo: no caminho do **lead que já existia** (mandou mensagem antes dos 5 min), as respostas do formulário agora vão para o campo **Queixa / Área de Interesse** (`2613405`), igual ao lead novo, em vez de nota. Lê o lead antes: campo vazio = grava o bloco; com texto = acrescenta no fim; já com o `ID Lead Ads` = não duplica. Nota removida. Publicado por ordem do Eduardo. **Ainda não testado em lead real** e leads antigos (ex.: #56739479, Sara) seguem só com a nota |
| 23/11/2026 | Fluxo Lead Ads → Kommo: telefone normalizado (DDD + 8 dígitos) e checagem também na tabela `Conversas registradas`; corrige risco de duplicata por 9º dígito (a tabela tem números de 12 e 13 dígitos). Simulado offline e testado em execução manual (sem leads elegíveis) |
| 23/11/2026 | Fluxo Lead Ads → Kommo **publicado** (ordem do Eduardo), `DATA_CORTE` ajustado para 23/11 10:36. Campanha Lead Ads `52643121054382` publicada na CA 03 com o formulário `DrThiago - Form 001` (`1887461179334504`). Rascunho duplicado `52643109978782` (público errado, com erro) marcado como DELETED pela API, mas ainda aparece como rascunho: descartar à mão |
| 20/11/2026 | Fluxo Lead Ads → Kommo construído (inativo) e testado com lead fictício `56589051`: criado em Leads de entrada, movido pelos robôs para Atendimento IA com tag `Heloisa`; o fluxo de Conversas descartou o aviso |
| 20/11/2026 | Estudo dos vídeos do Drive do Kommo (19 distintos nas 4 primeiras páginas, transcritos) e roteiros padronizados em [`roteiros-videos-medicos.md`](../roteiros-videos-medicos.md) |
| 20/11/2026 | Levantamento do Kommo (9 funis, campos, tags, automações vistas em print) e criação dos Manuais de Infraestrutura e Implementação. Criado o fluxo temporário [`2cqdDHyFGAZOu0lz`](https://n8n.srv2164786.hstgr.cloud/workflow/2cqdDHyFGAZOu0lz) (só leitura, inativo, apagar). Projeto Lead Ads → Kommo definido, **nada ligado** |
| 15/11/2026 | Cenário do Make analisado e recriado no n8n (Conversas), com anti-duplicata por telefone |
| 15/11/2026 | 31 telefones já existentes cadastrados no controle de Conversas |
| 15/11/2026 | Fila de 36 itens do Make migrada para o n8n (11 conversas gravadas) |
| 16/11/2026 | Frases da primeira mensagem passam a vir de data table (CONTÉM) |
| 16/11/2026 | Fluxo de Agendados criado; 23 leads da etapa recebidos |
| 16/11/2026 | Envio simultâneo sobrescreveu 22 linhas; corrigido com `Use Append` nos dois fluxos e linhas regravadas |
| 16/11/2026 | Nome e telefone dos agendados passam a vir da aba Conversas pelo entity_id |
| 16/11/2026 | Diagnóstico: Conversas parou em 15/11 18:27. Webhook de lead de entrada estava com URL inexistente (404) e a URL certa recebia só avisos de mudança de etapa (descartados) |
| 16/11/2026 | Diagnóstico "nenhum lead na planilha": webhook já chegava com `unsorted.add`, mas o anúncio passou a usar outra mensagem ("Olá! Posso ter mais informações sobre isso?" / "...sobre a consulta?") e o filtro descartava. Frases adicionadas na tabela. Descartados antes disso (ex.: lead 56445977 Mariana Lopes, 14:15; 56455433 Gil, 16:18) não foram regravados |
| 16/11/2026 | 17 leads perdidos reenviados pelo próprio fluxo de Conversas (só data, ID e mensagem padrão; sem nome/telefone). No controle anti-duplicata entram com chave `lead_<id>` |
