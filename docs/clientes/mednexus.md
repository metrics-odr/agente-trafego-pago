# MedNexus

> Guia de Meta Ads da conta: [../mednexus.md](../mednexus.md). Este arquivo cobre a automação de atendimento (Umbler Talk) e o inventário do n8n.
> **Nunca** gravar valores de tokens ou senhas: só o nome e o local da credencial.

Atualizado em 24/11/2026.

## 1. Resumo
| Item | Valor |
|---|---|
| Campo `Cliente` no padrão | `MedNexus` |
| Status | Ativo |
| Funis | A definir (usar `Geral` até o Eduardo indicar) |
| Pasta no n8n | `MedNexus` (`hR1cAjU9b5L0fJ9l`) |
| Atendimento | Adriano Freitas (humano) + bot da Umbler Talk |
| Objetivo da automação em estudo | Listar todo dia, para o Adriano trabalhar à mão, os leads que travaram no bot, ficaram sem resposta ou esfriaram depois do humano. Ainda não construída. |

## 2. Planilha
| Planilha | Link / ID | Compartilhada com a conta de serviço? |
|---|---|---|
| [`MEDNEXUS \| Planilha Central`](https://docs.google.com/spreadsheets/d/1npTWHf_taXBhGlOT-WFtlt7CvX44sVbKf8WGs8nQhgE/edit) | `1npTWHf_taXBhGlOT-WFtlt7CvX44sVbKf8WGs8nQhgE` | Não verificado |

- Aba `Conversas 💬` (webhook da Umbler, ~1.957 linhas): grava só o **início** da conversa (data, 1ª mensagem, nome, telefone, compra, campanha, anúncio, especialidade). Não tem última mensagem nem passo do funil.
- Aba `New Subscriptions 🛒` (webhook de vendas) e `All Payments 🛒`: vendas.
- Demais abas: Leads, QLFs, DSQs, Lead Form Nativo, Meta Ads, Criativos, Testes.

## 3. Umbler Talk (somente leitura, verificado em 24/11/2026)
| Item | Valor |
|---|---|
| API | `https://app-utalk.umbler.com/api` (especificação em `/api/docs/v1/docs.json`) |
| Autenticação | Bearer. No n8n: credencial **Bearer Auth** com só o token (sem a palavra "Bearer") |
| Organização | `mednexus`, id `ajMlvCQ8P2Hg3g4U` |
| Usuário do token | Adriano Freitas (permissões Member, Operator, Admin, Owner) |
| Limite de leitura | 100 requisições a cada 5 s (cabeçalho `x-ratelimit-remaining`) |
| Canal do bot ativo | `Adriano API Oficial` (`anS6OpBMF_oRA1d6`, WhatsApp API, **Live**) |
| Outros canais | `Equipe Mednexus API` (`aqgEgFcVV8xpF_t-`, WaitingToGoLive), `Suporte Marina` (`as6d5L97xlVnRzAE`, Live), `Adriano Freitas`, `Equipe MedNexus` e `Teste` (Disabled), `Atendentes` (Live) |
| Setor padrão | `Geral` (`ajMlvCQ8P2Hg3g4X`) |
| Tag no início do bot | `Sem contato` (`ajqe4-Vjp4yju0pQ`). O fluxo só adiciona, nunca remove |

Rotas lidas: `GET /v1/members/me/`, `/v1/channels/`, `/v1/bots/`, `/v1/bots/flowchart/`, `/v1/chats/` (todas exigem `organizationId`). O objeto do chat traz `lastMessage` com `source` (Bot ou humano), `messageState`, `sentByOrganizationMember`, `fromContact`, `botInstance` e `eventAtUTC`, além de `contact.tags`.

### Fluxos de bot
| Fluxo | ID | Ativo | Canal |
|---|---|---|---|
| Fluxo atendimento versão 2 | `amtTEItDWzqY2xax` | Sim | Adriano API Oficial |
| Primeiro atendimento (antigo) | `ajM-W18X47lFCGbM` | Não | Adriano Freitas (desabilitado) |
| Recuperação MQL | `atPl8d914OXV6Svr` | Não | nenhum |

### Fluxo atendimento versão 2: como está configurado
- **Início:** se for a primeira conversa do contato no canal, espera 5 s, adiciona a tag `Sem contato` e pergunta a especialidade. Se **não** for a primeira conversa, transfere direto para o Adriano e o bot não responde.
- **Sequência de perguntas** (cada uma só avança quando o lead responde qualquer coisa): especialidade, 4 imagens de resultados, quantos pacientes por semana, áudio, preço da consulta e ticket, "Vc investe em marketing? Me envia site ou Instagram". Depois a última mensagem o fluxo **termina**.
- **Esperas entre passos:** 5 s a 3 min.
- **Follow-up de silêncio (repete em cada pergunta, 5 por pergunta):**
  1. Sem resposta em **1h30**: "Muitos médicos chegam até nós..." 
  2. Mais **6h** (só na pergunta 1; nas demais 5h): "Olá! Conseguiu verificar minha última mensagem?"
  3. Mais **5h**: "Imagino que esteja corrido por aí..."
  4. Mais **5h**: "Não tenho a intenção de te enviar mensagens em excesso..."
  5. Mais **5h**: "Olá, tudo bem? Como não tive retorno, vou dar uma pausa no atendimento..."
  6. Espera **24h** e o fluxo termina, **sem transferir para humano e sem tag**.
- **Horário:** cada follow-up só sai entre 07:00 e 23:59 (America/Sao_Paulo). Fora disso, espera até as 07:00. Na pergunta 1 dois desses agendamentos valem **só de segunda a sexta** (cron `1-5`), os outros valem todos os dias.
- **Entrega:** toda mensagem espera confirmação de entrega por 2 min, mas o destino em caso de falha (`onDeliveryFail`) está **vazio** em todos os passos.
- **Recuperação:** gatilhos manuais `Recuperação` (adiciona a tag, espera 24h e anota em privado "o lead não respondeu em 24 h") e `Recuperação com resposta`.

### Lacunas do fluxo (a confirmar com as execuções reais)
1. Falha de entrega sem destino: o bot para em silêncio.
2. Fim do fluxo sem transferir para humano nem avisar ninguém.
3. Lead que já falou antes vai direto ao Adriano, sem alerta além da própria Umbler.
4. A tag `Sem contato` nunca sai sozinha.

## 4. Ativos no n8n
### Fluxos
| Nome | ID | Status |
|---|---|---|
| [`Flow \| MedNexus \| Geral \| Manual > Umbler - Testa leitura da API`](https://n8n.srv2164786.hstgr.cloud/workflow/ZZ0OtrIo47IOHAUf) | `ZZ0OtrIo47IOHAUf` | Teste, manual, só leitura. Apagar à mão quando não for mais necessário |
| [`Flow \| MedNexus \| Geral \| Manual > Umbler - Explora canais, bots e chats`](https://n8n.srv2164786.hstgr.cloud/workflow/b5DfDkADtzgqYsHx) | `b5DfDkADtzgqYsHx` | Exploração, manual, só leitura. Apagar à mão quando não for mais necessário |

### Credenciais
| Nome | Onde fica | Status |
|---|---|---|
| `Bearer Auth account` (renomear para `Cred \| MedNexus \| Umbler API - mednexus`) | [Credenciais do n8n](https://n8n.srv2164786.hstgr.cloud/home/credentials), ID `8WDy2VzzHe2L6Jre` | Testada em 24/11/2026 (`GET /v1/members/me/` = 200). O token foi colado no chat: **apagar na Umbler e gerar outro** ao fim dos testes |

## 5. Pendências
- [ ] Renomear a credencial da Umbler para o padrão e trocar o token (foi exposto no chat).
- [ ] Definir o funil para o padrão de nomes.
- [ ] Medir nas execuções reais (`/v1/bots/flowchart/botinstances/`) quanto tempo o bot leva para responder e quantas mensagens falham.
- [ ] Definir a regra "humano deixou esfriar".
- [ ] Decidir como o Adriano vai receber a lista (template aprovado ou outro canal).
- [ ] Confirmar se o Adriano remove a tag `Sem contato` à mão.
- [ ] Compartilhar a Planilha Central com a conta de serviço, se for lida pelo n8n.

## 6. Acessos
| Data | O quê | Com quem / qual conta |
|---|---|---|
| 24/11/2026 | Token da API da Umbler (credencial no n8n) | Conta do Adriano Freitas na organização `mednexus` |
