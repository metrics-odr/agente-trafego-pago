# Manual: ler fluxos de bot e conversas da Umbler Talk pela API

> Serve para qualquer cliente que use a Umbler Talk. Exemplo completo, com números reais: [clientes/mednexus.md](clientes/mednexus.md) e [clientes/mednexus-diagnostico-umbler-90d.md](clientes/mednexus-diagnostico-umbler-90d.md).
> **Só leitura.** Nunca alterar fluxo, enviar mensagem ou marcar tag sem pedido explícito do Eduardo. Nunca gravar o valor do token neste repositório.

## 1. Acesso
1. Abrir [app-utalk.umbler.com/api/docs](https://app-utalk.umbler.com/api/docs/index.html). No menu azul da esquerda, clicar em **"Primeiros passos"** (o item de cima). O passo 1 tem o link para gerar o token no "account": **novo token**, dar um nome, **criar**, copiar na hora.
2. No n8n: credencial **Bearer Auth** (`httpBearerAuth`) com **só o token**, sem a palavra "Bearer". Nome no padrão: `Cred | <Cliente> | Umbler API - <conta>`. A credencial **Header Auth** deu 401 mesmo com o token certo (caso do Kommo do Dr Thiago).
3. Nos nós HTTP Request usar `authentication: genericCredentialType` e `genericAuthType: httpBearerAuth`.
4. Teste de acesso: `GET https://app-utalk.umbler.com/api/v1/members/me/`. A resposta traz as organizações (o `id` vai no parâmetro `organizationId` de quase todas as outras rotas).
5. O token herda as permissões do usuário que o criou. Se for de administrador, ele consegue alterar coisas: por isso só consultar.
6. Se o token for colado em conversa ou documento, **apagar na Umbler e gerar outro**.

## 2. O que dá para ler
| Para quê | Rota |
|---|---|
| Canais (número, tipo, estado) | `GET /v1/channels/` |
| Lista de bots | `GET /v1/bots/` |
| Configuração completa dos fluxos (passos, textos, tempos) | `GET /v1/bots/flowchart/` |
| Execuções reais de um fluxo | `GET /v1/bots/flowchart/botinstances/` (`botId`, `startUTC`, `endUTC`, `Skip`, `Take`) |
| Chats | `GET /v1/chats/` (`ChatState`, `Skip`, `Take`) |
| Mensagens de um chat | `GET /v1/chats/{chatId}/relative-messages/` (`FromEventUTC` obrigatório) |
| Log de atividades | `GET /v1/activity-logs/` |
| Especificação completa | `https://app-utalk.umbler.com/api/docs/v1/docs.json` (o `swagger.json` dá 404) |

Link para abrir um chat na Umbler: `https://app-utalk.umbler.com/chats/<chatId>`.

## 3. Limites e armadilhas
- **100 chamadas a cada 5 segundos.** Mais que isso dá **429**. Para ler muitas conversas, usar no HTTP Request a opção de lotes (por exemplo, 40 chamadas a cada 5,5 segundos).
- **`/v1/chats/`:** no máximo 250 por página (paginar com `Skip`), ordenado pela última mensagem. O padrão de `ChatState` é `Open` e **não traz chats fechados**: usar `All` (ou `Closed`). `DateStartCreatedAtUTC` não filtrou: filtrar no n8n pela data de criação. `totalItems` não é confiável (vem 0 ou -1).
- **`relative-messages`:** devolve as mensagens mais recentes (usar o momento atual em `FromEventUTC`). Conversas com 100 ou mais mensagens perdem o começo quando se usa `Take=100`.
- **`botinstances`:** cada execução traz a **configuração inteira do bot (cerca de 90 KB)**. Reduzir com um nó Code logo depois, senão a leitura fica pesada. A resposta inclui `status` (`Running`, `Complete`), `navigationPath` (passos percorridos, com horário e erro, se houver) e o passo inicial (automático ou gatilho manual).
- Várias rotas são marcadas **Unstable** na especificação (podem mudar). Não existe, até onde li, endpoint para ler o código de erro de uma mensagem não entregue.
- O resultado do n8n com muitos dados é grande: pedir só o nó final (`nodeNames`) e processar o arquivo salvo fora do chat.

## 4. Campos da mensagem que importam
| Campo | Significado |
|---|---|
| `source` | `Contact` (lead), `Bot`, `Member` (enviada pela Umbler por uma pessoa), `External` (enviada fora da Umbler; também aparece como eco das mensagens do bot) |
| `messageState` | `Processing`, `Received`, `Read`, `Played`, `Failed`, `Edited`, `Deleted`. Mensagens `External` ficam em `Processing` |
| `templateId` | Preenchido quando a mensagem é um template |
| `botInstance` | Nome e id do fluxo que enviou |
| `question.key` | Pergunta do bot a que a mensagem pertence |
| `eventAtUTC` | Horário (UTC). Converter para o horário de São Paulo (UTC-3) |

## 5. Como ler a configuração de um fluxo
Cada passo tem um tipo (`_t`) e aponta para o próximo (`nextStepId`):
| Tipo | O que faz |
|---|---|
| `FlowchartBotChatStartedEvent` | Entrada automática, quando o lead cria a conversa |
| `FlowchartBotManualStartedEvent` | Entrada manual, com nome de gatilho (`triggerName`), iniciada por uma pessoa |
| `ConditionalAction` | Condição (por exemplo, "primeira conversa?") com destino para sim e não |
| `WaitingAction` | Espera um tempo (`interval`), com destino alternativo se o contato responder |
| `RegexStep` | **Pergunta** que espera resposta: `text`, `timeout` (quanto espera), `onTimeout` (o que fazer se não responder), `onDeliveryFail` (o que fazer se a mensagem não for entregue), `confirmationTimeout` |
| `SendMessageAction` | Envia mensagem ou arquivo sem esperar resposta |
| `TagAction` | Adiciona ou remove tag |
| `TimeOfDayStep` | Divide por horário do dia |
| `OneShotCronAction` | Espera até um horário marcado (expressão cron), por exemplo as 07:00 |
| `MemberTransferAction` | Transfere a conversa para uma pessoa |

**Para descobrir a sequência de lembretes:** partir de cada pergunta e seguir `onTimeout`, somando os `timeout`. Cada `TimeOfDayStep` empurra o envio para a manhã seguinte quando cai fora do horário permitido. Um passo sem `nextStepId` é o **fim do fluxo**; confirmar com uma execução real (`status` `Complete` e último passo igual a esse).

## 6. Regra do WhatsApp que explica muitas falhas
- **Janela de 24 horas:** depois de 24 horas sem mensagem do lead, só **template aprovado** é aceito. Texto livre enviado depois disso tende a não ser entregue. No caso do MedNexus, 51% dos textos livres enviados depois das 24 horas não foram entregues, contra 0,1% dos enviados dentro da janela.
- **Somar os tempos da sequência de lembretes** antes de aprovar um fluxo: se a soma passar de 24 horas (considerando a espera da noite), os últimos lembretes vão falhar.
- Preencher `onDeliveryFail` em todos os passos (reenviar, marcar com tag e passar para uma pessoa).

## 7. Roteiro para diagnosticar uma conta
1. Ler canais, bots e fluxos. Registrar no arquivo do cliente: o que está ativo, em qual canal, os tempos e o que acontece no fim.
2. Ler os chats dos últimos 90 dias (abertos e fechados) com as mensagens. Medir: tempo da primeira resposta, perguntas do bot ignoradas, mensagens não entregues (por tipo e por janela de 24 horas), funil por pergunta, taxa de resposta de cada lembrete, o que acontece depois da última pergunta e tempo de resposta da equipe por faixa de horário.
3. Ler as execuções recentes do fluxo (últimos 14 dias bastam) para confirmar o que a configuração diz e ver o uso dos gatilhos manuais.
4. Definir como cada número foi calculado e escrever no documento (a seção 9 do diagnóstico do MedNexus é o modelo).
5. Anotar o que **não** foi verificado.
