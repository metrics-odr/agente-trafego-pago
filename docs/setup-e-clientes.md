# Setup geral e dados dos clientes

Referência rápida de **onde fica cada coisa**: URLs, IDs, e-mails, webhooks, planilhas e credenciais de cada cliente e do setup geral.

> **Segurança:** este arquivo **nunca** guarda o valor de tokens, senhas, chaves ou arquivos JSON de credencial (regra do `CLAUDE.md`). Aqui fica só **o nome e o local** de cada credencial. Os valores ficam salvos no próprio n8n, no Make ou no ambiente da sessão.
>
> Atualizar este arquivo sempre que criar ou mudar webhook, planilha, credencial ou fluxo. Padrão de nomes: [`padrao-n8n.md`](padrao-n8n.md).

Atualizado em 16/11/2026.

---

## 1. Setup geral (operação do Eduardo)

### 1.1 n8n
| Item | Valor |
|---|---|
| Instância | `https://n8n.srv2164786.hstgr.cloud` (self-hosted na Hostinger) |
| Projeto | Pessoal do Eduardo (`srRTMbP5mWVNIiQr`). Projetos de equipe não habilitados |
| Prefixo de webhook (produção) | `https://n8n.srv2164786.hstgr.cloud/webhook/<caminho>` |
| Prefixo de webhook (teste) | `https://n8n.srv2164786.hstgr.cloud/webhook-test/<caminho>` (só responde com "Listen for test event" aberto no editor) |
| Conector no claude.ai | `n8n`, com as ferramentas de leitura e de gravação/exclusão em **Sempre permitir** |
| Permissões no repositório | `.claude/settings.json` libera `mcp__n8n` e bloqueia arquivar workflow, apagar agent, apagar coluna de data table e apagar skill |

Observação: com o workflow despublicado ou o servidor fora do ar, o webhook responde 404 e **o dado se perde** (o n8n não enfileira). Ver regras em `padrao-n8n.md` §2.7.

### 1.2 Google (conta de serviço)
| Item | Valor |
|---|---|
| **E-mail para dar acesso de Editor nas planilhas** | `automations@gen-lang-client-0448992217.iam.gserviceaccount.com` |
| Projeto Google Cloud | `gen-lang-client-0448992217` (APIs Sheets e Drive ativadas) |
| Credencial no n8n | `Google Service Account account` (ID `6deuhYvp4Sfr43Qc`). Renomear para `Cred \| Agencia \| Google SA - automations` |
| Onde está a chave | Só dentro da credencial do n8n. O arquivo JSON baixado deve ser apagado do computador |

Para uma planilha nova funcionar: **Compartilhar → colar o e-mail acima → Editor → desmarcar "Notificar pessoas"**.

### 1.3 Make
| Conta | Zona | Observação |
|---|---|---|
| Eduardo (`Eduardo Souto`) | `us1.make.com` | Conectada ao conector Make do claude.ai. Organização `My Organization` (376982), time `Integrações` (147372) |
| Thiago Virgili | `us2.make.com` | Onde estava o cenário antigo "Dr Thiago Conversas". Não acessível pelo conector |

Token de API do Make do Thiago: salvo no **ambiente da sessão do Claude** (rede, host `us2.make.com`), só leitura (`hooks:read`). **Ele foi exposto no chat em 15/11/2026: apagar no Make (Profile → API access) e, se precisar de novo, gerar outro pelo formulário seguro.**

### 1.4 Repositório
- Configurações e documentação (`CLAUDE.md`, `.claude/`, `docs/`) vão direto para a `main`, sem PR.
- Padrão de nomes e regras técnicas do n8n: [`padrao-n8n.md`](padrao-n8n.md).
- Contas de anúncios Meta por cliente: [`contas.md`](contas.md).

---

## 2. Clientes

### 2.1 DrThiago (Dr Thiago Virgili)

#### Dados do cliente
| Item | Valor |
|---|---|
| Campo `Cliente` no padrão | `DrThiago` |
| Funis | `WhatsApp` (conversas vindas do Instagram) · `Geral` (etapas do Kommo que valem para todos os leads) |
| CRM | Kommo, subdomínio `contourculptclinique` (`https://contourculptclinique.amocrm.com` / `.kommo.com`), account ID `36177499` |
| Pipeline das conversas | `13296523` (visto no payload de lead não triado) |
| WhatsApp que recebe os leads | `5511942946718`, canal "Dr Thiago V" (WhatsApp Lite do Kommo), source_id `23084963` |
| Conta Google dona da planilha | `drthiagovirgili.coprod@gmail.com` |
| Pasta no n8n | `DrThiago` (`YRtSf5VPUy0aOp7Q`) |

#### Planilha central
| Item | Valor |
|---|---|
| Nome | `Dr Thiago \| Planilha Central` |
| Link | https://docs.google.com/spreadsheets/d/1EcPFdCtd75HNN8xz4B7UU2KjSSkEYW4MkQRYgQArnRk |
| ID | `1EcPFdCtd75HNN8xz4B7UU2KjSSkEYW4MkQRYgQArnRk` |
| Editores necessários | e-mail da conta de serviço (§1.2), já compartilhada |
| Aba `Conversas Iniciadas 💬` | Colunas A–I: Data, entity_id, chat_id, contact_id, autor_id, Nome, Mensagem, Telefone, **Status (preenchida pela equipe, o n8n não mexe)** |
| Aba `Agendamentos 📅` (gid `439827908`) | Colunas A–D: Data, Nome, Telefone, entity_id |

Chave para cruzar as abas: **`entity_id` = lead_id do Kommo**. Na aba Conversas, `entity_id` e `contact_id` têm o mesmo valor (herança do Make).

#### Fluxos no n8n
| Fluxo | ID | Webhook (produção) | Onde configurar no Kommo | Status |
|---|---|---|---|---|
| `Flow \| DrThiago \| WhatsApp \| Kommo > Sheets - Registra conversas iniciadas do Instagram` | `qPWy230Z8Cw5N8Uj` | `https://n8n.srv2164786.hstgr.cloud/webhook/drthiago-whatsapp-kommo-sheets-conversas` | Configurações → Integrações → Web hooks, evento de lead novo não triado | Publicado. Kommo ainda aponta para o Make? Conferir |
| `Flow \| DrThiago \| Geral \| Kommo > Sheets - Registra leads agendados` | `iK9iVYgAMyxVUUyU` | `https://n8n.srv2164786.hstgr.cloud/webhook/drthiago-geral-kommo-sheets-agendamentos` | Funil digital → etapa **AGENDADO** → gatilho Webhook "Quando movido para esta etapa", sem condição | Publicado e recebendo |
| `Flow \| DrThiago \| Geral \| Manual > Sheets - Regrava agendados sobrescritos (uso único)` | `PCyRC8FsN6p1q9Qw` | — | — | Já executado. Pode ser apagado |

#### Regras dos fluxos
- **Conversas:** a mensagem entra se CONTÉM qualquer frase da tabela de frases (sem diferenciar maiúsculas e acentos). Uma linha por telefone. Lê só `unsorted.add`.
- **Agendados:** todo lead que entra na etapa AGENDADO, uma linha por lead. Nome e telefone vêm da aba Conversas pelo `entity_id`; leads que não estão lá entram só com Data e entity_id.
- Os dois usam `Use Append` no Sheets (envios simultâneos não se sobrescrevem).

#### Data tables (n8n)
| Tabela | ID | Para quê |
|---|---|---|
| `Table \| DrThiago \| WhatsApp \| Frases da Primeira Mensagem` | `R6S6DOuurjZMzzho` | Frases aceitas na primeira mensagem. **Editar aqui para trocar a mensagem do anúncio**, sem republicar |
| `Table \| DrThiago \| WhatsApp \| Conversas registradas (anti-duplicata)` | `rl3pVO73UzAPoMmP` | Telefones já registrados em Conversas |
| `Table \| DrThiago \| Geral \| Agendamentos registrados (anti-duplicata)` | `6EpypQN05XhKHaAw` | Leads já registrados em Agendamentos |
| `Table \| DrThiago \| Geral \| Payloads do Agendado (histórico)` | `8M8KvwbZrkxyxN8B` | Todo payload bruto recebido do Kommo na etapa Agendado |

Frase atual da primeira mensagem: `Olá! Vim do Instagram e queria agendar uma consulta com Dr. Thiago`.

#### Formato dos payloads do Kommo (confirmados com dados reais)
- **Lead novo não triado** (`unsorted.add`), JSON aninhado: `account{id, subdomain, _links.self}`, `unsorted.add[]{lead_id, created_at, pipeline_id, source_data{name, client.id, data[].text, origin.chat_id}, data.contacts[]{name, custom_fields[PHONE]}}`.
- **Funil digital, lead movido de etapa:** `application/x-www-form-urlencoded`, user-agent `amoCRM-Webhooks/3.0`. Corpo: `leads[status][0][id]`, `account[id]`, `account[subdomain]`. **Só IDs: sem nome, telefone ou etapa.**

#### Credenciais
| Credencial | Onde fica | Status |
|---|---|---|
| Google (conta de serviço) | n8n, `Google Service Account account` | Ativa |
| `Cred \| DrThiago \| Kommo API - contourculptclinique` | n8n (Header Auth `Authorization: Bearer <token>`) | **Não criada.** Sem ela, os nós "Buscar lead/contato no Kommo" falham sem parar o fluxo |
| Token de API do Make (us2) | Ambiente da sessão do Claude | Exposto no chat: apagar no Make |

#### Legado (Make)
- Cenário `Dr Thiago Conversas`, conta do Thiago (us2): https://us2.make.com/public/shared-scenario/2aZm6SDRXax/dr-thiago-conversas
- Webhook "Conversa Nova" (hook `3036546`), data store `kommo_primeira_msg` (`198180`).
- A fila de 36 itens de 15/11 foi migrada para o n8n (11 conversas novas gravadas). **Não religar o cenário**: a fila do Make ainda tem os 36 itens e gravaria tudo em dobro.

#### Pendências
- Renomear a credencial Google no n8n para o padrão.
- Apagar o token do Make exposto no chat.
- Conferir se o webhook de lead novo do Kommo já aponta para o n8n e não mais para o Make.
- Decidir se remove os nós "Buscar lead/contato no Kommo" (sem token eles não fazem nada).
