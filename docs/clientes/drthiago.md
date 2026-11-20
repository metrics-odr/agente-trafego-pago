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
| [`Flow \| DrThiago \| Geral \| Manual > Sheets - Regrava agendados sobrescritos (uso único)`](https://n8n.srv2164786.hstgr.cloud/workflow/PCyRC8FsN6p1q9Qw) | `PCyRC8FsN6p1q9Qw` | — | — | Já executado. Pode ser apagado |

### Data tables
Abrir em [Data tables](https://n8n.srv2164786.hstgr.cloud/home/datatables).

| Nome | ID | Colunas | Para quê |
|---|---|---|---|
| `Table \| DrThiago \| WhatsApp \| Frases da Primeira Mensagem` | `R6S6DOuurjZMzzho` | frase | Frases aceitas na primeira mensagem |
| `Table \| DrThiago \| WhatsApp \| Conversas registradas (anti-duplicata)` | `rl3pVO73UzAPoMmP` | chave, telefone, lead_id, registrado_em | Telefones já registrados em Conversas |
| `Table \| DrThiago \| Geral \| Agendamentos registrados (anti-duplicata)` | `6EpypQN05XhKHaAw` | lead_id, telefone, registrado_em | Leads já registrados em Agendamentos |
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
- [ ] Lead Ads → Kommo: ver projeto em [Manual de Infraestrutura §5](../manual-infraestrutura-kommo-drthiago.md). Falta abrir os Salesbots Distribuição e Entrada Thiago e documentar o FUP com vídeos.
- [ ] Apagar o [fluxo de leitura do Kommo](https://n8n.srv2164786.hstgr.cloud/workflow/2cqdDHyFGAZOu0lz) (uso único).

## 11. Histórico de mudanças
| Data | Mudança |
|---|---|
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
