# MedNexus: diagnóstico de automação e abordagem (últimos 90 dias)

> Análise feita em 24/11/2026 com leitura somente leitura da Umbler (API) e da configuração dos 3 fluxos de bot. Sem telefones nem nomes de leads. Documento do cliente: [mednexus.md](mednexus.md).

## 0. Resumo
1. **O bot em si funciona.** Entra em 12 segundos (mediana) e, durante o roteiro, só 1,2% das mensagens dos leads ficaram sem resposta em 15 minutos. O problema não é o bot "travar".
2. **Os vazamentos estão nas bordas do bot:** (a) a mensagem final do bot falha em 61% dos casos por sair depois da janela de 24 h; (b) os templates de contato ativo falham de 17% a 67%; (c) quando o roteiro acaba, o lead cai no colo do humano sem nenhum aviso ou tag; (d) 39 leads terminaram o bot, responderam e **nunca foram respondidos**.
3. **A insistência humana é curta.** Depois do preço, 59% dos leads que não compraram receberam **um único toque** e o atendimento parou. Os toques 2 a 4 ainda tiveram 36% a 47% de resposta em 24 h.
4. **O tempo de resposta humana cai fora do horário comercial.** Entrando às 07h–19h: mediana de 40 min. À noite: 8,5 h. Madrugada: 6,3 h. Fim de semana: 20 h. 44% dos leads entram fora do horário comercial.
5. **A qualidade do lead é irregular:** cerca de 20% de quem respondeu a especialidade **não é médico**, e 5 anúncios entregam de 24% a 35% de não médicos.
6. **A medição é frágil:** a tag `Sem contato` permanece em 35 dos 36 compradores. Não serve de filtro.

## 1. Base e limites
| Item | Valor |
|---|---|
| Chats criados nos últimos 90 dias (26/08 a 24/11) | 996 (canais `Adriano API Oficial` 946, `Equipe Mednexus API` 25, `Equipe MedNexus` 25). Excluídos `Suporte Marina` e `Teste` |
| Mensagens por chat | até as últimas 100. **59 chats têm 100 ou mais mensagens e perderam o começo** (17 dos 36 compradores estão aí): a classificação de origem e o funil desses chats são menos confiáveis |
| Compra | detectada pelo texto "Parabéns pela compra" enviado pela equipe. **36 compras** é um piso. Não foi cruzado com a aba `New Subscriptions` |
| Especialidade | classificada por palavras-chave na resposta ao bot. 24,5% ficaram "indefinido" |
| `External` | eco do bot ou mensagem enviada fora da Umbler. Não conta como resposta do lead |
| Causa das falhas | **não verificada**: a leitura não trouxe o código de erro do WhatsApp |

## 2. Funil real (996 chats)
| Etapa | Chats | Observação |
|---|---|---|
| Entrada | 996 | 330 anúncio com ID, 181 contato ativo (o lead nunca escreveu), 137 formulário, 41 perfil do Instagram, 48 mensagem vazia `Unsupported`, 6 anúncio com ID quebrado `{{ad.id}}` |
| Bot entrou | 778 | 218 sem bot: 119 nunca escreveram, 99 escreveram e o bot não entrou (86 no canal principal, por desenho "primeira conversa?" ou outro motivo; 12 sem resposta de ninguém) |
| Chegou à pergunta 2 (pacientes) | 624 | |
| Pergunta 3 (áudio) | 569 | |
| Pergunta 4 (preço da consulta) | 550 | |
| Pergunta 5, fim do bot | 510 (66% dos chats com bot) | 451 responderam depois dela |
| Recebeu o preço da MedNexus | 295 | |
| Convite ou link de vídeo | 164 | |
| Compra detectada | 36 (3,6% dos chats) | 26 dos 295 que receberam preço (8,8%). Dos 164 convidados para vídeo, 26 compraram (15,9%) |

Tempo até a compra: mediana de 1,1 dia. 44% compram em menos de 24 h e só 3 passam de 7 dias. **O lead quente decide rápido**, então a janela de atenção é curta.

## 3. Diagnóstico da automação
### 3.1 O que funciona
- Entrada: mediana de 12 s, p90 de 48 s. 41 de 815 conversas esperaram mais de 5 min e 30 nunca foram respondidas (3,7%).
- Durante o roteiro: de 3.523 mensagens de leads, 41 ficaram 15 min sem resposta (22 chats).
- Os leads respondem rápido: 76% a 92% em até 1h30. Só 2% respondem depois de 24 h. O primeiro follow-up em 1h30 está bem calibrado.
- Follow-up 1 recupera 40,6% (192 de 473). Follow-ups 2, 3 e 4 recuperam 23,6%, 21,6% e 14,2%.

### 3.2 Onde falha
| # | Problema | Evidência | Efeito |
|---|---|---|---|
| 1 | **Mensagem final ("vou dar uma pausa") sai depois das 24 h**<br><br>Texto completo (última mensagem de silêncio, repetida depois de cada pergunta; depois dela o fluxo espera 24 h e termina):<br><br>_Olá, tudo bem?_<br>_Como não tive retorno, vou dar uma pausa no atendimento._<br><br>_Mas fico a disposição para te explicar de maneira clara e objetiva como podemos te ajudar a *captar mais pacientes sem que vc precise investir em marketing.*_<br><br>_Nós não somos agência de mkt!_<br><br>_Se quiser ter uma captação de pacientes independe, pode me chamar!_<br><br>_Até logo_ | 189 enviadas, 61,4% falharam, 2,1% de resposta. 95% das falhas de texto livre ocorrem mais de 24 h depois da última mensagem do lead | O encerramento do bot não chega e o lead fica sem aviso |
| 2 | **Cadência passa de 24 h** | Pergunta, 1h30, +5 h, +5 h, +5 h, +5 h: cerca de 21,5 h na conta direta. Qualquer cruzamento da noite (23:59 a 07:00) empurra para mais de 24 h. Exemplo: o lead cala às 10:00, os follow-ups saem às 11:30, 16:30 e 21:30, o quarto (02:30) vai para as 07:00 e o quinto sai às 12:00, **26 h depois** | Causa do problema 1 |
| 3 | **Falha de entrega sem plano B** | `onDeliveryFail` vazio em todos os passos. 207 dos 996 chats (20,8%) têm ao menos uma mensagem com falha | O bot para em silêncio |
| 4 | **Templates de contato ativo falham muito** | `avSFKwtgN-FsNLP8` 67%, `anTT4os8TA3cZ5ef` 42%, `av7_a08f7k3tFLSv` 37%, `ann8kFZQ7E6feKjE` 33%, `anTRAwR_zqiFVZm0` 17,5%. Templates personalizados (`as_uDhgOGwiOTbrg`, `ao9RF64Z2n8gTYkp`, `aqsG2M0P3klU5qd3`) falharam 0% | 148 falhas. Hipótese (não verificada): template genérico de marketing em massa é limitado pelo Meta. Falta o código de erro |
| 5 | **Contato ativo não converte** | 181 chats em que o lead nunca escreveu: 0 compras. Em 87 deles nenhuma mensagem foi entregue. Quando o primeiro template chega, 52% respondem | O canal gasta esforço sem retorno |
| 6 | **O roteiro termina sem passar a bola** | Ao fim da pergunta 5 o fluxo acaba, sem tag nem transferência. 39 leads terminaram o bot e **ninguém falou com eles** (de 0 a 86 dias de idade); 39 terminaram o bot, o lead respondeu e ninguém respondeu | Lead perdido sem registro |
| 7 | **O bot ignora o que o lead pergunta** | 466 mensagens com "?" em 293 chats e 138 áudios em 55 chats antes de o humano entrar. 184 leads perguntaram valor durante o bot e 61 (33%) não receberam o valor | O humano precisa corrigir a rota na mão |
| 8 | **Tag `Sem contato` não sai** | Presente em 35 dos 36 compradores e em 714 dos 809 chats com humano | Inútil como filtro |
| 9 | **Disparos em massa fora da Umbler** | 18 disparos ("Gostaria de seguir o atendimento?") com 357 mensagens. 18,8% responderam em 6 h. A Umbler não confirma a entrega | Sem controle, sem registro e sem medição |
| 10 | **Anúncio com ID quebrado** | 6 chats com `{{ad.id}}` literal na primeira mensagem | O rastreio de origem se perde |
| 11 | **Mensagem `Unsupported` na entrada** | 48 chats: o bot entrou em 39, 0 compras | Possível tipo de mensagem que a Umbler não lê. Não verificado |

## 4. Diagnóstico da abordagem humana
| Observação | Dado |
|---|---|
| Primeira resposta humana | mediana de 40 min. P75 10 h. P90 38 h |
| Depois do fim do bot, com o lead respondendo (451) | 52% respondidos em 15 min, 68% em 1 h, 84% em 24 h. **39 nunca respondidos** |
| Resposta por horário de entrada | comercial 07h–19h: 40 min. Noite: 8,5 h. Madrugada: 6,3 h. Fim de semana: 20 h |
| Pós-preço, sem compra (269) | 42 nunca responderam ao preço, 170 foram deixados com a nossa última mensagem, 57 responderam e **ficaram sem retorno nosso**. 189 estão parados há mais de 30 dias |
| Persistência | Dos 212 sem compra que terminaram em sequência de toques sem resposta: **125 (59%) receberam 1 toque**, 47 receberam 2, 17 receberam 3 e 6 receberam 4 |
| Resposta ao 2º, 3º e 4º toque | 46,6% (n=176), 36,4% (n=44) e 40% (n=10) responderam em 24 h |
| Decisão | 35 chats disseram "vou pensar/analisar" e 18 recusaram claramente depois do preço. O resto simplesmente esfriou |
| Objeções (chats que citaram) | preço 337, como funciona 164, agência/tráfego 115, garantia/resultado/prazo 111, contrato/anual 104, telemedicina 64, Pix/parcelamento/desconto 52, "vou pensar" 41, sem interesse 38 |
| Vídeo | Quem foi para o vídeo converte 15,9%. O vídeo é o gargalo certo para empurrar |

## 5. Qualidade do lead e tráfego
- Resposta à pergunta de especialidade (601): **médico 47,6%**, **não médico 19,8%**, indefinido 24,5%, sem resposta 8,2%. Compras: 11 médicos de 286 (3,8%), 3 não médicos de 119 (2,5%), 5 indefinidos de 147.
- Conversão por entrada (piso): anúncio com ID 4,2% (14 de 330). Formulário 0,7% (1 de 137). Perfil do Instagram 0 de 41. Contato ativo 0 de 181. Mensagem vazia 0 de 48. As entradas "outro texto" (9,7%) estão infladas por chats com o começo cortado.
- 37 anúncios com chats. Os 6 maiores (ID: chats, % não médico, compras): `120251576439770463` 49, 35%, 1. `120251169510110463` 48, 24%, 5. `120251169510120463` 45, 24%, 1. `120251169379620463` 32, 28%, 3. `120251987813270463` 21, 35%, 1. `120252255066150463` 18, 29%, 1. Os anúncios `120251481203320463`, `120251987813230463` e `120251732550310463` têm só 7% a 10% de não médicos (compras 0 em 39 chats: amostra pequena).
- Nomes dos anúncios não foram mapeados (precisa consulta ao Meta Ads).

## 6. Pontos de observação (o que monitorar todo dia)
| # | Indicador | Alerta |
|---|---|---|
| 1 | Entrada do bot: p90 do tempo até a primeira resposta | acima de 2 min |
| 2 | Mensagem do lead sem resposta durante o bot (15 min) | mais de 3% |
| 3 | Falha de entrega por template e por origem (bot texto livre, humano, template) | mais de 10% em qualquer template |
| 4 | Taxa de resposta e de entrega de cada follow-up (1 a 5) | follow-up 5 com mais de 20% de falha |
| 5 | Leads que terminaram o bot e não tiveram humano em 1 h | qualquer um |
| 6 | Primeira resposta humana por faixa de horário | mediana acima de 2 h no horário comercial |
| 7 | Leads com preço enviado e sem toque nas últimas 24 h e 72 h | fila diária |
| 8 | Perguntas de valor sem resposta com valor | mais de 10% |
| 9 | Não médicos por anúncio | mais de 25% |
| 10 | Conversão por origem, por etapa e por faixa horária | acompanhamento semanal |
| 11 | Disparos fora da Umbler | registrar cada um |

## 7. Recomendações (em ordem de impacto e facilidade)
**A. Sem mexer no bot da Umbler**
1. Rodar o **relatório diário** (já desenhado) com as 4 categorias e o filtro de médicos.
2. Definir uma **cadência humana de 4 toques** pós-preço (mesmo dia, D+1, D+3, D+7): hoje 59% param no primeiro e os toques 2 a 4 ainda respondem 36% a 47%.
3. **Plantão ou lista das 07:00** para quem entra à noite e no fim de semana (44% dos leads, mediana de 6 a 20 h).
4. **Fila de reativação** com template aprovado: 39 sem resposta nenhuma, 57 sem retorno nosso e 35 do "vou pensar". Os 189 parados há mais de 30 dias só depois de reaquecer.
5. Auditar os **5 templates com falha** no Gerenciador do WhatsApp (status, categoria, qualidade) e guardar o código de erro.
6. Registrar cada **disparo em massa** (data, texto, lista).

**B. Ajustes no fluxo da Umbler (só com pedido explícito)**
1. Encurtar a cadência para que **todas as mensagens livres saiam antes de 24 h**, ou trocar o follow-up 5 por template.
2. Preencher `onDeliveryFail`: reenviar uma vez, depois tag `Falha de entrega` e transferir para o Adriano.
3. **Ao fim do roteiro:** tag `Qualificado, aguardando humano` e transferência. Remover `Sem contato` quando o humano responder.
4. Tratar **pergunta de valor**, "como funciona" e áudio (resposta padrão, ou agente de IA da Umbler).
5. **Triagem de não médico** na pergunta de especialidade (encerrar com educação e poupar o time).
6. Corrigir o `{{ad.id}}` e investigar as mensagens `Unsupported`.

**C. Tráfego e medição**
1. Mapear os anúncios pelo ID e pausar ou ajustar os que mais trazem não médicos.
2. Marcar a compra na Umbler (tag `Comprou`) e conferir com `New Subscriptions`.

## 8. Pendências desta análise
- Confirmar a causa das falhas de template (código de erro).
- Mapear nomes dos anúncios no Meta Ads.
- Cruzar as 36 compras com a aba `New Subscriptions`.
- Reler chats com 100 ou mais mensagens (começo cortado).
- Decidir quais recomendações do bloco B o Eduardo autoriza.
