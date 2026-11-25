# MedNexus (Clã da Medicina)

> Guia de Meta Ads da conta: [`../mednexus.md`](../mednexus.md). **Nunca** gravar valores de tokens ou senhas.

Atualizado em 25/11/2026.

## 1. Resumo
| Item | Valor |
|---|---|
| Campo `Cliente` no padrão | `MedNexus` |
| Status | ativo |
| Funis | `Lead Ads` (formulário nativo → WhatsApp). Demais a mapear |
| Pasta no n8n | `MedNexus` (`hR1cAjU9b5L0fJ9l`) |

## 2. Funis
### 2.1 Lead Ads
| Item | Valor |
|---|---|
| Origem do lead | Formulário nativo do Meta (`Form MedNexus-copy`) → aba Lead Form Nativo 👥 → WhatsApp Oficial (Umbler) |
| Campanhas Meta | `MEDNEXUS | ... | LEAD-ADS | ...` |
| Fluxos n8n | `Flow | MedNexus | Lead Ads | Sheets > Umbler - Envia template para lead que não iniciou conversa` |
| Regras | Lead que não mandou mensagem em 3 min recebe o template de recuperação |

## 3. Contas e sistemas
### 3.1 Meta Ads
Conta Clã da Medicina (`900675294624191`). Detalhes em [`../mednexus.md`](../mednexus.md).

### 3.2 WhatsApp (Umbler uTalk)
| Item | Valor |
|---|---|
| Organização | `mednexus` (`ajMlvCQ8P2Hg3g4U`) |
| API | `https://app-utalk.umbler.com/api/v1/` · [documentação](https://app-utalk.umbler.com/api/docs/index.html) |
| Usuário do token | Adriano Freitas (`ajMlvCQ8P2Hg3g4S`) |
| Canal oficial em uso | Adriano API Oficial, +55 31 99573-7575 (`anS6OpBMF_oRA1d6`) |
| Outros canais | Equipe Mednexus API (+55 31 97241-9943, aguardando ir ao ar), Suporte Marina (broker), canais broker desativados |
| Bot de atendimento | Fluxo atendimento versão 2 (`amtTEItDWzqY2xax`), gatilhos manuais "Recuperação" e "Recuperação com resposta" |
| Template de recuperação | Recuperação MQL especialidade v2 - novo (`av7_a08f7k3tFLSv`), MARKETING, sem variáveis |

Endpoints usados: `GET /contacts/phone/` (contato pelo telefone, com `channels[].lastActiveUTC` = última mensagem do lead), `GET /contacts/{id}/chats/`, `GET /chats/{id}/relative-messages/`, `POST /template-messages/simplified/` (`fromPhone`, `toPhone`, `templateId`, `params`, `organizationId`).

## 4. Planilhas
| Planilha | Link / ID | Compartilhada com a conta de serviço? |
|---|---|---|
| MEDNEXUS \| Planilha Central | [abrir](https://docs.google.com/spreadsheets/d/1npTWHf_taXBhGlOT-WFtlt7CvX44sVbKf8WGs8nQhgE/edit) | Sim (leitura confirmada em 25/11/2026) |

| Aba | Colunas relevantes | Quem preenche |
|---|---|---|
| [Lead Form Nativo 👥](https://docs.google.com/spreadsheets/d/1npTWHf_taXBhGlOT-WFtlt7CvX44sVbKf8WGs8nQhgE/edit#gid=1586709478) | `id` (`l:...`), `created_time` (ISO com fuso, ex. `2026-11-25T07:18:04-05:00`), `phone_number` (`p:+55...`), `Iniciou Conversa?`, `Iniciou Recuperação`, `Erro Umbler` | Webhook do Lead Ads (pode falhar) + automação antiga (colunas de recuperação) |
| [Conversas 💬](https://docs.google.com/spreadsheets/d/1npTWHf_taXBhGlOT-WFtlt7CvX44sVbKf8WGs8nQhgE/edit#gid=718101807) | Data, Mensagem, Nome, Telefone, Campanha, Conjunto, Anúncio | Webhook (pode falhar; o fluxo novo não depende dela) |

## 5. Ativos no n8n
### Fluxos
| Nome | ID | Status |
|---|---|---|
| [Flow \| MedNexus \| Lead Ads \| Sheets > Umbler - Envia template para lead que não iniciou conversa](https://n8n.srv2164786.hstgr.cloud/workflow/pKztD0C0GcKtXdWW) | `pKztD0C0GcKtXdWW` | Publicado em 25/11/2026 |
| Fluxos manuais `... Manual > Umbler - ... (teste)` | vários | Só leitura, apagar depois |

### Data tables
| Nome | ID | Colunas | Para quê |
|---|---|---|---|
| Table \| MedNexus \| Lead Ads \| Leads conferidos na Umbler (anti-duplicata) | `VEPTHg2QPq4ZmDXd` | lead_ads_id, telefone, resultado (`template_enviado`, `erro_envio`, `iniciou_conversa`, `sem_telefone_valido`), umbler_http, umbler_mensagem_id, erro, lead_criado_em, registrado_em | 1 conferência/envio por lead e log do resultado |

### Credenciais
| Nome | Status |
|---|---|
| `Cred | MedNexus | Umbler` (`8WDy2VzzHe2L6Jre`) | Token do usuário Adriano Freitas |
| `Cred | ESM | Google Service Account account` (`6deuhYvp4Sfr43Qc`) | Leitura da planilha |

## 6. Regras do fluxo de recuperação
- Roda a cada minuto; considera só leads criados depois de 25/11/2026 12:05 (BRT), com 3 a 60 min de idade.
- "Iniciou conversa" = o lead mandou mensagem no canal oficial a partir de 15 min antes do formulário (`lastActiveUTC` do contato na Umbler). Não usa a aba Conversas.
- Não iniciou: envia o template e grava o resultado na tabela. Não escreve na planilha.

## 9. Legado
- Existe uma **automação antiga externa** (não está no n8n nem no Make do Eduardo; provável Apps Script na planilha) que envia o mesmo template ~3 min após o lead e preenche `Iniciou Recuperação` / `Erro Umbler`. Usa o usuário Adriano na API. Confirmado no chat do lead da linha 415 em 25/11/2026.
- Por ordem do Eduardo (25/11/2026), as duas rodam em paralelo: o lead pode receber o template duas vezes.

## 10. Pendências
- [ ] Decidir se a automação antiga será desligada; localizar onde ela está.
- [ ] Coluna `Iniciou Conversa?` marca SIM em lead que só respondeu depois do template (linha 415): revisar a regra da automação antiga.
- [ ] Mapear demais funis.
- [ ] Apagar os fluxos manuais de teste da pasta MedNexus.

## 11. Histórico de mudanças
| Data | Mudança |
|---|---|
| 25/11/2026 | Criado o fluxo de recuperação de Lead Ads via Umbler e a tabela de controle; publicado |
