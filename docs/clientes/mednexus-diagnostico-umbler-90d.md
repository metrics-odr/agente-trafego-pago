# MedNexus: diagnóstico da automação e da abordagem com os leads (últimos 90 dias)

> Análise feita em 24/11/2026, só com leitura da Umbler (nada foi enviado nem alterado), sobre as conversas dos últimos 90 dias e a configuração dos 3 fluxos de bot. O documento não tem telefones nem nomes de leads. Documento do cliente: [mednexus.md](mednexus.md).

## Como ler este documento
| Termo | O que significa aqui |
|---|---|
| **Conversa** | Cada atendimento de um lead na Umbler (a Umbler chama de "chat") |
| **Bot** | O atendimento automático do fluxo "Fluxo atendimento versão 2": faz 5 perguntas em sequência |
| **Lembrete (follow-up)** | Mensagem automática que o bot manda quando o lead para de responder. Cada pergunta do bot tem até 5 lembretes |
| **Template** | Mensagem pré-aprovada pelo WhatsApp. É o único tipo que pode ser enviado quando já se passaram 24 horas desde a última mensagem do lead |
| **Janela de 24 horas** | Prazo de 24 horas desde a última mensagem do lead. Dentro dele pode-se mandar texto livre. Depois, só template |
| **Toque** | Cada vez que a nossa equipe escreve para um lead que não respondeu à mensagem anterior, com pelo menos 2 horas de intervalo |
| **Mediana** | O valor do meio: metade dos casos é mais rápida que ele e metade é mais lenta |
| **Humano** | O Adriano ou outra pessoa da equipe (não o bot) |

## 0. Resumo
1. **O bot funciona bem na maior parte do tempo.** Ele responde ao primeiro contato em 12 segundos (mediana). Enquanto o bot está conduzindo a conversa, só 41 de 3.523 mensagens dos leads (1,2%) ficaram mais de 15 minutos sem resposta. O problema não é o bot travar.
2. **Os problemas estão no começo e no fim do bot e nas mensagens que falham:**
   - A mensagem final do bot não chega em 61% dos envios (116 de 189), porque sai depois de 24 horas.
   - Entre 18 e 23/11 os templates do Lead Ads falharam de 60% a 100% por dia. A equipe já corrigiu.
   - Depois da última pergunta o bot não manda mais nada.
   - 39 leads responderam à última pergunta do bot e nunca receberam resposta de ninguém.
3. **A equipe insiste pouco depois de falar o preço.** Entre as conversas em que a nossa equipe foi a última a escrever, 64% pararam depois de uma única mensagem. Quando houve uma segunda, terceira ou quarta mensagem, de 36% a 47% dos leads responderam em até 24 horas.
4. **Fora do horário comercial a resposta humana demora.** Para leads que chegam entre 07h e 19h, metade recebe resposta humana em até 40 minutos. Para os que chegam à noite, em até 8,5 horas. De madrugada, 6,3 horas. No fim de semana, 20 horas. 44% dos leads chegam fora do horário comercial.
5. **Cerca de 1 em cada 5 leads que informaram a especialidade não é médico** (20%). Cinco anúncios trazem de 24% a 35% de não médicos.
6. **A tag `Sem contato` não ajuda a filtrar:** continua em 35 dos 36 leads que compraram.

## 1. Base e limites
| Item | Valor |
|---|---|
| Período | Conversas criadas de 26/08 a 24/11/2026: **996 conversas** (946 no canal `Adriano API Oficial`, 25 em `Equipe Mednexus API` e 25 em `Equipe MedNexus`). Deixei de fora os canais `Suporte Marina` e `Teste` |
| Mensagens lidas por conversa | Só as últimas 100. **59 conversas têm 100 ou mais mensagens e perderam o começo.** 17 das 36 compras estão nessas conversas, então a origem e as etapas dessas conversas são menos confiáveis |
| Como contei as compras | Pelo texto "Parabéns pela compra" enviado pela equipe. Foram **36 compras**. É o mínimo, porque pode haver compra sem essa mensagem. Não cruzei com a aba `New Subscriptions` da planilha |
| Como identifiquei a especialidade | Por palavras-chave na resposta do lead. 24,5% das respostas ficaram como "indefinido" |
| Mensagens `External` | São o eco das mensagens do bot ou mensagens enviadas fora da Umbler. Não contam como resposta do lead |
| Causa das falhas de entrega | **Não verificada.** A leitura não trouxe o código de erro do WhatsApp |

## 2. Caminho dos 996 leads até a compra
| Etapa | Conversas | Observação |
|---|---|---|
| Chegaram | 996 | 330 por anúncio (a primeira mensagem traz o ID do anúncio), 181 do Lead Ads sem mensagem do lead (receberam template), 137 com a mensagem "Preenchi seu formulário", 41 vieram do perfil do Instagram, 48 com mensagem vazia (tipo `Unsupported`), 6 com o ID do anúncio quebrado (`{{ad.id}}`) e o restante com outros textos |
| O bot entrou | 778 | Em 218 conversas o bot não entrou: 119 nunca escreveram e 99 escreveram mas o bot não entrou (86 no canal principal, porque o fluxo passa direto para o Adriano quando o contato já tinha conversado antes, ou por outro motivo; em 12 delas ninguém respondeu) |
| Pergunta 2 (pacientes por semana) | 624 | É maior que a pergunta 1 porque parte das conversas entra no fluxo sem a primeira pergunta |
| Pergunta 3 (posso enviar um áudio?) | 569 | |
| Pergunta 4 (preço da consulta) | 550 | |
| Pergunta 5, a última do bot | 510 (66% das conversas com bot) | 451 leads responderam a ela |
| Receberam o preço da MedNexus | 295 | |
| Receberam convite ou link de vídeo (Google Meet) | 164 | |
| Compraram | 36 (3,6% das 996) | Dos 295 que receberam o preço, 26 compraram (8,8%). Dos 164 que receberam convite de vídeo, 26 compraram (15,9%) |

**Tempo até comprar:** metade dos compradores comprou em até 1,1 dia depois de a conversa começar. 16 dos 36 (44%) compraram em menos de 24 horas e só 3 compraram depois de mais de 7 dias. O lead que vai comprar decide rápido, então a atenção da equipe precisa ser rápida.

## 3. Diagnóstico da automação
### 3.1 O que funciona
- **Primeira resposta:** metade dos leads recebe resposta em até 12 segundos e 9 em cada 10 em até 48 segundos. Em 41 das 815 conversas (5%) a primeira resposta demorou mais de 5 minutos, e 30 conversas (3,7%) nunca receberam resposta.
- **Durante as perguntas do bot:** de 3.523 mensagens de leads, 41 (1,2%) ficaram mais de 15 minutos sem resposta. Isso aconteceu em 22 conversas.
- **Os leads respondem rápido às perguntas:** de 76% a 92% respondem em até 1 hora e 30 minutos. Só 2% respondem depois de 24 horas. Por isso o primeiro lembrete, enviado depois de 1h30, está no tempo certo.
- **Os lembretes funcionam, principalmente o primeiro:**

| Lembrete | Texto começa com | Enviados | Não entregues | Lead respondeu em até 8 horas |
|---|---|---|---|---|
| 1 | "Muitos médicos chegam até nós..." | 473 | 15 (3,2%) | 192 (40,6%) |
| 2 | "Olá! Conseguiu verificar minha última mensagem?" | 313 | 21 (6,7%) | 74 (23,6%) |
| 3 | "Imagino que esteja corrido por aí..." | 259 | 20 (7,7%) | 56 (21,6%) |
| 4 | "Não tenho a intenção de te enviar mensagens em excesso..." | 218 | 21 (9,6%) | 31 (14,2%) |
| 5 (mensagem final) | "Olá, tudo bem? Como não tive retorno, vou dar uma pausa..." | 189 | **116 (61,4%)** | 4 (2,1%) |

### 3.2 Onde falha
| # | Problema | O que os dados mostram | Consequência |
|---|---|---|---|
| 1 | **Mensagem final:** Olá, tudo bem?<br>Como não tive retorno, vou dar uma pausa no atendimento.<br><br>Mas fico a disposição para te explicar de maneira clara e objetiva como podemos te ajudar a *captar mais pacientes sem que vc precise investir em marketing.*<br><br>Nós não somos agência de mkt!<br><br>Se quiser ter uma captação de pacientes independe, pode me chamar!<br><br>Até logo | Dessa mensagem foram enviadas 189 e 116 (61,4%) não foram entregues. Só 4 leads (2,1%) responderam a ela. Entre as 212 mensagens de texto livre (sem template) que falharam, 201 (95%) saíram mais de 24 horas depois da última mensagem do lead | É a última tentativa automática de reativar o lead e ela não chega em 6 de cada 10 envios. Depois dela o bot não faz mais nada, e o lead fica parado sem nenhuma marcação que ajude o time a lembrar dele |
| 2 | **A sequência de lembretes passa de 24 horas** | Depois de cada pergunta o bot espera 1h30 e manda o lembrete 1. Depois espera mais 5 horas para cada lembrete seguinte (6 horas depois do lembrete 1 na primeira pergunta). Somando, a mensagem final sai cerca de 21,5 horas depois da pergunta. Entre 23:59 e 07:00 o bot não envia: espera até 07:00. Exemplo: o lead para de responder às 10:00, os lembretes saem às 11:30, 16:30 e 21:30, o quarto cairia às 02:30 e vai para as 07:00, e o quinto sai às 12:00, **26 horas depois** | É por isso que a mensagem final falha (problema 1): depois de 24 horas sem mensagem do lead, o WhatsApp só aceita template |
| 3 | **Quando uma mensagem falha, o bot não tem plano B** | Toda mensagem do bot espera 2 minutos pela confirmação de entrega, mas o campo "o que fazer se a entrega falhar" (`onDeliveryFail`) está vazio em todos os passos. 207 das 996 conversas (21%) tiveram pelo menos uma mensagem não entregue | Pelo desenho, o fluxo para sem avisar ninguém. Eu não confirmei isso nas execuções reais |
| 4 | **Os templates do Lead Ads falharam entre 18 e 23/11 (já corrigido pela equipe)** | São os templates que o Adriano envia quando o lead cadastra no Lead Ads e não manda mensagem. Mensagens não entregues por dia: de 0% a 29% até 17/11; **60% em 18/11, 100% em 19/11 e em 20/11, 70% em 23/11 (57 de 82)**; 12% em 24/11 (1 de 8 envios, amostra ainda pequena). As taxas altas por template (de 17% a 67% no período inteiro) vêm desses dias | Nesses dias a maior parte dos leads do Lead Ads não recebeu o primeiro contato. A correção foi informada pelo Eduardo em 24/11 e **eu não a verifiquei**: falta acompanhar os próximos dias e guardar o código de erro se voltar a falhar |
| 5 | **Depois da última pergunta o bot não manda mais nada** | A última pergunta do bot é "Vc investe em marketing? Me envia por gentileza seu site ou Instagram". O fluxo termina nela, e isso foi conferido de três formas: (1) na configuração do fluxo esse passo não tem próximo passo; (2) na execução registrada pela Umbler de uma conversa que chegou até ali, a situação do bot é "Complete" (concluído) e o último passo é essa mensagem; (3) em nenhuma das 510 conversas que chegaram a essa pergunta o bot mandou mensagem depois. Todas as mensagens posteriores vieram do lead (4.157) ou da equipe (7.495). As perguntas anteriores têm até 5 lembretes cada. 59 leads não responderam a essa pergunta, e 39 deles nunca foram procurados por ninguém depois (24 desses 39 estão parados há mais de 30 dias). **A mensagem de preço ("Preço: R$1.800 mensal...") não faz parte de nenhum fluxo do bot**: foi enviada pela equipe, em 472 casos fora da Umbler e em 1 pela própria Umbler, e nunca antes da última pergunta | O lead que fica em silêncio na última pergunta não recebe nenhum lembrete automático, ao contrário das outras perguntas. Existe um fluxo de recuperação, mas ele só roda se alguém o iniciar à mão (ver seção 3.3). Dos 7 leads que ficaram em silêncio na última pergunta e chegaram nos últimos 14 dias, só 1 teve a recuperação iniciada |
| 6 | **Lead respondeu à última pergunta e ninguém respondeu** | 451 leads responderam à última pergunta do bot. O Adriano respondeu a 412 (metade em até 9,5 minutos). **39 (9%) nunca receberam resposta**: 5 esperam há até 7 dias, 13 há entre 8 e 30 dias e 21 há mais de 30 dias | O lead respondeu e foi ignorado. O bot não marca esse lead como "esperando atendimento", então o time não tem como filtrar quem ficou sem resposta |
| 7 | **O bot ignora o que o lead pergunta** | Antes de o humano entrar, 293 conversas tiveram mensagens do lead com "?" (466 mensagens no total) e 55 conversas tiveram áudios (138 áudios). Em 184 conversas o lead perguntou o valor durante o bot e em 61 delas (33%) o Adriano não mandou nenhuma mensagem com valor em reais | O bot segue o roteiro sem responder, e o humano precisa voltar à pergunta do lead |
| 8 | **A tag `Sem contato` nunca é removida** | O fluxo coloca a tag no início e não tira. Ela continua em 35 dos 36 compradores e em 714 das 809 conversas em que houve resposta humana | Não dá para usar a tag para saber quem já foi atendido |

### 3.3 O fluxo de recuperação (é manual)
O "Fluxo atendimento versão 2" tem dois gatilhos de recuperação que **só rodam quando alguém os inicia à mão** na Umbler, conversa por conversa ou em lote. Nenhuma regra os inicia sozinha.

- **O que ele faz:** o gatilho "Recuperação" coloca a tag `Sem contato`, espera 24 horas e, se o lead responder nesse prazo, o bot retoma as perguntas ("Recuperação com resposta"). Se o lead não responder, o fluxo só grava uma nota interna ("Recuperação: o lead não respondeu em 24 h..."). **Ele não envia nenhuma mensagem ao lead por conta própria.**
- **Como a equipe usa:** nos últimos 14 dias (10 a 24/11) o fluxo teve 235 execuções: 85 automáticas (começam quando uma conversa nova chega) e 150 manuais (145 de "Recuperação" e 5 de "Recuperação com resposta"), em 61 conversas. Foram 62 execuções manuais em 23/11 e 30 em 24/11, contra no máximo 14 por dia nos dias anteriores. Das 138 recuperações de conversas que estão na base, 96 (70%) começaram até 60 minutos depois de uma mensagem da equipe, ou seja, a equipe escreve ao lead e inicia a recuperação para o bot retomar se ele responder.
- **Resultado:** das 54 recuperações iniciadas há mais de 48 horas (conversas da base), em 38 (70%) o lead não respondeu e só ficou a nota interna. Em 16 (30%) o lead respondeu e o bot retomou a sequência de perguntas. O lead respondeu em até 48 horas em 17 (31%).
- **Limite desta leitura:** a Umbler só devolveu as execuções dos últimos 14 dias. Não sei como foi a recuperação antes disso.
- **As mensagens "Gostaria de seguir o atendimento?" enviadas em massa não estão ligadas a esse fluxo:** só 2 das 143 recuperações tiveram uma mensagem enviada fora da Umbler até 30 minutos de distância.

## 4. Diagnóstico da abordagem da equipe
| Observação | O que os dados mostram |
|---|---|
| Tempo até a primeira resposta humana, contado a partir da primeira mensagem do lead | Metade das conversas é respondida em até 40 minutos. Em 1 de cada 4 a espera passa de 10 horas, e em 1 de cada 10 passa de 38 horas |
| Leads que responderam à última pergunta do bot (451) | 234 (52%) foram respondidos em até 15 minutos, 306 (68%) em até 1 hora e 381 (84%) em até 24 horas. 39 nunca foram respondidos |
| Resposta humana conforme o horário em que o lead chegou | Das 07h às 19h: metade em até 40 minutos. À noite (19h a 24h): 8,5 horas. De madrugada (00h a 07h): 6,3 horas. No fim de semana: 20 horas |
| Leads que receberam o preço e não compraram (269) | 42 nunca responderam ao preço. Em 170 a nossa mensagem foi a última. 57 responderam e ficaram sem retorno nosso. 189 dessas conversas estão sem mensagem há mais de 30 dias |
| Quantas mensagens a equipe manda antes de parar (195 conversas com preço, sem compra, em que a nossa equipe foi a última a escrever) | 125 (64%) pararam depois de 1 toque, 47 (24%) depois de 2, 17 (9%) depois de 3 e 6 (3%) depois de 4 |
| Quantos respondem ao 2º, 3º e 4º toque | Ao 2º toque, 82 de 176 leads responderam em até 24 horas (46,6%). Ao 3º, 16 de 44 (36,4%). Ao 4º, 4 de 10 (40%). Os números do 3º e do 4º são pequenos |
| Quem disse que ia pensar ou recusou, depois do preço | 35 conversas com "vou pensar", "vou analisar" ou parecido, e 18 com recusa clara. O restante simplesmente parou de responder |
| Assuntos que os leads mais levantaram (conversas em que o lead citou o tema) | preço 337, como funciona 164, agência ou tráfego pago 115, garantia, resultado ou prazo 111, contrato ou plano anual 104, telemedicina 64, Pix, parcelamento ou desconto 52, "vou pensar" 41, sem interesse 38 |
| Vídeo | Quem recebeu convite para o vídeo comprou mais: 26 de 164 (15,9%), contra 26 de 295 (8,8%) entre todos que receberam o preço |

## 5. Qualidade do lead e anúncios
- **Especialidade informada** (601 conversas em que o bot perguntou a especialidade): 286 médicos (47,6%), 119 não médicos como psicólogos, terapeutas, nutricionistas, fisioterapeutas e dentistas (19,8%), 147 respostas que não consegui classificar (24,5%) e 49 que não responderam (8,2%). Compras: 11 entre os 286 médicos (3,8%), 3 entre os 119 não médicos (2,5%) e 5 entre os 147 sem classificação (3,4%).
- **Compras por tipo de primeira mensagem** (mínimo, conforme o limite explicado na seção 1): anúncio com ID 14 de 330 (4,2%); mensagem "Preenchi seu formulário" 1 de 137 (0,7%); perfil do Instagram 0 de 41; lead do Lead Ads que não escreveu 1 de 207 (0,5%); mensagem vazia 0 de 48. Para as demais conversas ("outro texto") a taxa de 9,7% (18 de 186) não é confiável, porque inclui conversas longas que perderam o começo.
- **Anúncios:** 37 anúncios geraram conversas. Os 6 com mais conversas, onde "% de não médicos" considera só quem informou a especialidade:

| ID do anúncio | Conversas | Não médicos | Compras |
|---|---|---|---|
| `120251576439770463` | 49 | 35% | 1 |
| `120251169510110463` | 48 | 24% | 5 |
| `120251169510120463` | 45 | 24% | 1 |
| `120251169379620463` | 32 | 28% | 3 |
| `120251987813270463` | 21 | 35% | 1 |
| `120252255066150463` | 18 | 29% | 1 |

  Os anúncios `120251481203320463`, `120251987813230463` e `120251732550310463` trouxeram só de 7% a 10% de não médicos, mas são poucas conversas (39 no total, nenhuma compra). Não mapeei os nomes dos anúncios (precisa consultar o Meta Ads).

## 6. O que acompanhar todo dia
| # | O que medir | Quando acender o alerta |
|---|---|---|
| 1 | Tempo até a primeira resposta do bot (9 em cada 10 conversas) | Mais de 2 minutos |
| 2 | Mensagens do lead que ficam mais de 15 minutos sem resposta durante o bot | Mais de 3% |
| 3 | Mensagens não entregues, por template e por tipo (bot, humano, template) | Mais de 10% em qualquer template |
| 4 | Entrega e resposta de cada lembrete do bot (de 1 a 5) | Lembrete 5 com mais de 20% não entregue |
| 5 | Leads que terminaram o bot e ficaram mais de 1 hora sem resposta humana | Qualquer um |
| 6 | Tempo até a primeira resposta humana por faixa de horário | Metade acima de 2 horas no horário comercial |
| 7 | Leads que receberam o preço e estão sem mensagem nossa há 24 horas e há 72 horas | Lista diária |
| 8 | Leads que perguntaram o valor e não receberam | Mais de 10% |
| 9 | Percentual de não médicos por anúncio | Mais de 25% |
| 10 | Compras por origem, por etapa e por faixa de horário | Acompanhamento semanal |

## 7. Recomendações (da mais fácil e de maior impacto para a mais trabalhosa)
**A. Sem mexer no bot da Umbler**
1. Rodar o **relatório diário** (já desenhado) com as 4 categorias e só médicos que confirmaram a especialidade.
2. Definir **4 toques depois do preço**: no mesmo dia, 1 dia depois, 3 dias depois e 7 dias depois. Hoje 64% das conversas param no primeiro toque, e os toques seguintes ainda têm de 36% a 47% de resposta.
3. Ter uma **lista às 07:00** (ou plantão) para os leads que chegam à noite e no fim de semana, que são 44% e esperam de 6 a 20 horas.
4. Montar uma **fila de reativação com template aprovado** para: os 39 leads que responderam e ninguém respondeu, os 57 que responderam depois do preço e ficaram sem retorno, e os 35 que disseram que iam pensar. As 189 conversas paradas há mais de 30 dias devem esperar uma mensagem de reaquecimento antes.
5. **Acompanhar os templates do Lead Ads** nos próximos dias para confirmar a correção (24/11: 1 mensagem não entregue em 8 envios) e guardar o código de erro de qualquer nova falha.

**B. Ajustes no fluxo da Umbler (só com pedido explícito do Eduardo)**
1. **Encurtar a sequência de lembretes** para que todos os textos livres saiam antes de 24 horas, ou trocar o lembrete 5 por um template.
2. **Preencher o campo "se a entrega falhar"**: reenviar uma vez e, se falhar de novo, colocar a tag `Falha de entrega` e passar a conversa para o Adriano.
3. **Ao fim das 5 perguntas:** colocar a tag `Qualificado, aguardando humano` e passar a conversa para o Adriano. Tirar a tag `Sem contato` quando o humano responder.
4. **Responder ao lead que pergunta o valor ou "como funciona", e ao que manda áudio**, com uma resposta padrão ou com o agente de IA da Umbler.
5. **Separar quem não é médico** já na pergunta de especialidade, encerrando a conversa com educação, para poupar o tempo da equipe.

**C. Anúncios e medição**
1. Descobrir o nome dos anúncios pelo ID e pausar ou ajustar os que mais trazem não médicos.
2. Marcar a compra na Umbler (tag `Comprou`) e conferir com a aba `New Subscriptions`.

## 8. O que ainda falta conferir
- A causa das falhas de entrega (código de erro do WhatsApp) e se a correção dos templates do Lead Ads se mantém.
- O nome dos anúncios, no Meta Ads.
- As 36 compras contra a aba `New Subscriptions` da planilha.
- As 59 conversas com 100 ou mais mensagens, que perderam o começo.
- Quais itens do bloco B o Eduardo autoriza.
