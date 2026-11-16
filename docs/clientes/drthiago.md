# Dr Thiago Virgili

Atualizado em 16/11/2026.

## 1. Resumo
| Item | Valor |
|---|---|
| Campo `Cliente` no padrão | `DrThiago` |
| Status | Ativo |
| Funis | `WhatsApp` · `Geral` |
| Pasta no n8n | `DrThiago` (`YRtSf5VPUy0aOp7Q`) |
| Briefing | A preencher |
| Conta Google dona da planilha | `drthiagovirgili.coprod@gmail.com` |

## 2. Funis

### 2.1 WhatsApp
| Item | Valor |
|---|---|
| Origem do lead | Anúncio no Instagram → mensagem pronta no WhatsApp → Kommo (lead não triado) |
| Métrica principal | Conversa iniciada (1 por telefone) |
| Campanhas Meta | A preencher |
| Fluxos n8n | `Flow \| DrThiago \| WhatsApp \| Kommo > Sheets - Registra conversas iniciadas do Instagram` |
| Abas da planilha | `Conversas Iniciadas 💬` |
| Regras | A mensagem entra se CONTÉM qualquer frase da tabela `Frases da Primeira Mensagem` (sem diferenciar maiúsculas e acentos). 1 linha por telefone. Só lê `unsorted.add` |

Frase atual: `Olá! Vim do Instagram e queria agendar uma consulta com Dr. Thiago`. **Para trocar a mensagem do anúncio, editar a tabela de frases** (não precisa republicar o fluxo).

### 2.2 Geral (etapas do Kommo, todos os leads)
| Item | Valor |
|---|---|
| Origem do lead | Lead movido para a etapa **AGENDADO** no Kommo (qualquer origem) |
| Métrica principal | Agendamento (1 por lead) |
| Campanhas Meta | Todas (não filtra origem) |
| Fluxos n8n | `Flow \| DrThiago \| Geral \| Kommo > Sheets - Registra leads agendados` |
| Abas da planilha | `Agendamentos 📅` |
| Regras | Payload bruto guardado no histórico antes de tudo. 1 linha por lead. Nome e telefone vêm da aba Conversas pelo `entity_id`; lead que não está lá entra só com Data e entity_id |

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
| Conta | Subdomínio `contourculptclinique` (`https://contourculptclinique.amocrm.com` / `.kommo.com`), account ID `36177499` |
| Pipeline das conversas | `13296523` |
| Etapas relevantes | `AGENDADO` (ID a confirmar: o webhook não envia `status_id`) |
| Canal WhatsApp | `5511942946718`, "Dr Thiago V" (WhatsApp Lite do Kommo), source_id `23084963` |
| API | Sem token (o Eduardo optou por não gerar) |

## 4. Planilhas
| Planilha | Link / ID | Compartilhada com a conta de serviço? |
|---|---|---|
| `Dr Thiago \| Planilha Central` | https://docs.google.com/spreadsheets/d/1EcPFdCtd75HNN8xz4B7UU2KjSSkEYW4MkQRYgQArnRk (`1EcPFdCtd75HNN8xz4B7UU2KjSSkEYW4MkQRYgQArnRk`) | Sim, Editor |

| Aba | Colunas (ordem) | Quem preenche |
|---|---|---|
| `Conversas Iniciadas 💬` | Data, entity_id, chat_id, contact_id, autor_id, Nome, Mensagem, Telefone, Status | n8n preenche A–H. **Status (I) é da equipe: o n8n não mexe** |
| `Agendamentos 📅` (gid `439827908`) | Data, Nome, Telefone, entity_id | n8n |

Chave para cruzar abas: **`entity_id` = lead_id do Kommo**. Na aba Conversas, `entity_id` e `contact_id` têm o mesmo valor (herança do Make).

## 5. Ativos no n8n (inventário único deste cliente)
### Fluxos
| Nome | ID | Webhook de produção | Onde está configurado na origem | Status |
|---|---|---|---|---|
| `Flow \| DrThiago \| WhatsApp \| Kommo > Sheets - Registra conversas iniciadas do Instagram` | `qPWy230Z8Cw5N8Uj` | `https://n8n.srv2164786.hstgr.cloud/webhook/drthiago-whatsapp-kommo-sheets-conversas` | Kommo → Configurações → Integrações → Web hooks (lead não triado). **Conferir se já aponta para cá e não mais para o Make** | Publicado |
| `Flow \| DrThiago \| Geral \| Kommo > Sheets - Registra leads agendados` | `iK9iVYgAMyxVUUyU` | `https://n8n.srv2164786.hstgr.cloud/webhook/drthiago-geral-kommo-sheets-agendamentos` | Kommo → funil digital → etapa AGENDADO → gatilho Webhook "Quando movido para esta etapa", sem condição | Publicado e recebendo |
| `Flow \| DrThiago \| Geral \| Manual > Sheets - Regrava agendados sobrescritos (uso único)` | `PCyRC8FsN6p1q9Qw` | — | — | Já executado. Pode ser apagado |

### Data tables
| Nome | ID | Colunas | Para quê |
|---|---|---|---|
| `Table \| DrThiago \| WhatsApp \| Frases da Primeira Mensagem` | `R6S6DOuurjZMzzho` | frase | Frases aceitas na primeira mensagem |
| `Table \| DrThiago \| WhatsApp \| Conversas registradas (anti-duplicata)` | `rl3pVO73UzAPoMmP` | chave, telefone, lead_id, registrado_em | Telefones já registrados em Conversas |
| `Table \| DrThiago \| Geral \| Agendamentos registrados (anti-duplicata)` | `6EpypQN05XhKHaAw` | lead_id, telefone, registrado_em | Leads já registrados em Agendamentos |
| `Table \| DrThiago \| Geral \| Payloads do Agendado (histórico)` | `8M8KvwbZrkxyxN8B` | recebido_em, payload | Todo payload bruto da etapa Agendado |

### Credenciais
| Nome | Onde fica | Status |
|---|---|---|
| Google (conta de serviço, compartilhada) | n8n, ver [`setup-geral.md`](../setup-geral.md) §2 | Ativa |
| `Cred \| DrThiago \| Kommo API - contourculptclinique` | n8n, Header Auth | Não criada (sem token). Os nós "Buscar lead/contato no Kommo" falham sem parar o fluxo |

## 6. Payloads conhecidos (confirmados com dados reais)
- **Lead novo não triado** (Web hooks da conta), JSON aninhado:
  `account{id, subdomain, _links.self}` e `unsorted.add[]{lead_id, created_at, pipeline_id, source_data{name, client.id, data[].text, origin.chat_id}, data.contacts[]{name, custom_fields[PHONE].values[].value}}`.
- **Funil digital, lead movido para AGENDADO**: `application/x-www-form-urlencoded`, user-agent `amoCRM-Webhooks/3.0`. Corpo: `leads[status][0][id]`, `account[id]`, `account[subdomain]`. **Só IDs: sem nome, telefone nem etapa.** Ao marcar "aplicar a todos os leads já nesta etapa", o Kommo manda todos ao mesmo tempo (23 em 1 segundo em 15/11).

## 7. Como testar sem sujar dados reais
- Usar IDs fictícios (`TESTE-...`) ou mensagens sem a frase (são descartadas sem gravar).
- Depois de um teste que grava: apagar a linha na aba e a linha correspondente nas data tables `(anti-duplicata)` e `(histórico)`. **Se o lead de teste for real e ficar no controle, o agendamento real dele será ignorado.**

## 8. Acessos
| Data | O quê | Com quem / qual conta |
|---|---|---|
| 15/11/2026 | Planilha Central compartilhada como Editor | Conta de serviço `automations@gen-lang-client-0448992217.iam.gserviceaccount.com` |
| 15/11/2026 | Token de API do Make (us2, `hooks:read`) | Ambiente da sessão do Claude. **Exposto no chat: apagar** |

## 9. Legado (Make)
- Cenário `Dr Thiago Conversas` na conta do Thiago (us2): https://us2.make.com/public/shared-scenario/2aZm6SDRXax/dr-thiago-conversas
- Webhook "Conversa Nova" (hook `3036546`), data store `kommo_primeira_msg` (`198180`).
- A fila de 36 itens foi migrada para o n8n em 15/11 (11 conversas novas gravadas). **Não religar o cenário**: a fila do Make ainda tem os 36 itens e gravaria tudo em dobro.

## 10. Pendências
- [ ] Preencher dados de Meta Ads (BM, conta, pixel, página, campanhas por funil) e incluir o cliente em `contas.md`.
- [ ] Confirmar se o webhook de lead novo do Kommo aponta para o n8n e não para o Make.
- [ ] Apagar o token do Make exposto no chat.
- [ ] Decidir se remove os nós "Buscar lead/contato no Kommo" (sem token não fazem nada).
- [ ] Apagar o fluxo de uso único `PCyRC8FsN6p1q9Qw`.
- [ ] Limpar testes: linhas `TESTE-APAGAR` e `56433815` (gih) na aba Agendamentos e na tabela de agendamentos registrados.
- [ ] Validar o append atômico com envios simultâneos reais.

## 11. Histórico de mudanças
| Data | Mudança |
|---|---|
| 15/11/2026 | Cenário do Make analisado e recriado no n8n (Conversas), com anti-duplicata por telefone |
| 15/11/2026 | 31 telefones já existentes cadastrados no controle de Conversas |
| 15/11/2026 | Fila de 36 itens do Make migrada para o n8n (11 conversas gravadas) |
| 16/11/2026 | Frases da primeira mensagem passam a vir de data table (CONTÉM) |
| 16/11/2026 | Fluxo de Agendados criado; 23 leads da etapa recebidos |
| 16/11/2026 | Envio simultâneo sobrescreveu 22 linhas; corrigido com `Use Append` nos dois fluxos e linhas regravadas |
| 16/11/2026 | Nome e telefone dos agendados passam a vir da aba Conversas pelo entity_id |
