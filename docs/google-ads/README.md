# Google Ads — Base de conhecimento (índice)

Leia este índice primeiro em **qualquer** pedido de Google Ads, depois o guia do tipo de campanha envolvido.

> **Aviso de validade:** o Google Ads muda rápido (nomes, limites, recursos). Este material é conhecimento de referência. Quando houver conta conectada ou documentação oficial acessível, **confirmar o comportamento atual** antes de afirmar números, limites ou nomes de recursos. Registrar neste repositório o que for confirmado/corrigido.
>
> **Execução:** não há MCP/API de Google Ads conectado neste repositório. Sem isso, o trabalho é planejamento, estrutura, análise (a partir de prints do Eduardo) e instruções passo a passo. Nunca declarar que algo foi feito na conta sem poder reler a conta.

## Mapa dos guias

| Arquivo | Conteúdo |
|---|---|
| [`fundamentos.md`](fundamentos.md) | Leilão, Ad Rank, hierarquia, tipos de campanha, lances, orçamento, atribuição, glossário |
| [`pesquisa.md`](pesquisa.md) | Rede de Pesquisa (RSA, palavras-chave, negativas, QS) + **AI Max for Search** |
| [`performance-max.md`](performance-max.md) | Performance Max (grupos de recursos, sinais, feed, exclusões) |
| [`display.md`](display.md) | Rede de Display e remarketing |
| [`video-youtube.md`](video-youtube.md) | YouTube/Vídeo (ações de vídeo, in-stream, Shorts, alcance) |
| [`shopping.md`](shopping.md) | Shopping, Merchant Center, feed |
| [`demand-gen.md`](demand-gen.md) | Demand Gen (e o antigo Discovery) |
| [`app.md`](app.md) | Campanhas de app |
| [`local-e-outras.md`](local-e-outras.md) | Local, Smart, Hotel/Viagens, Chamadas, antigas |
| [`medicao-e-conversoes.md`](medicao-e-conversoes.md) | Tag, GTM, GA4, conversões avançadas, offline, Consent Mode, atribuição |
| [`publicos-e-segmentacao.md`](publicos-e-segmentacao.md) | Públicos, listas, Customer Match, localização, exclusões |
| [`conta-politicas-e-ferramentas.md`](conta-politicas-e-ferramentas.md) | MCC, acessos, faturamento, políticas, reprovações, Editor, API, scripts, regras, experimentos |
| [`analise-e-relatorios.md`](analise-e-relatorios.md) | Diagnóstico, métricas, rotina, relatórios, otimização por prints |

## Qual tipo escolher (resumo)

| Objetivo | Tipo principal |
|---|---|
| Capturar quem já busca (leads/vendas) | **Pesquisa** |
| Vender produto com feed, escala, múltiplos canais | **Shopping** + **Performance Max** |
| Leads/vendas multicanal com automação | **Performance Max** |
| Descoberta visual (YouTube, Discover, Gmail) | **Demand Gen** |
| Alcance/consideração em vídeo | **Vídeo (YouTube)** |
| Remarketing, awareness barato | **Display** |
| Instalar/engajar app | **App** |
| Loja física | **Local** (hoje dentro de PMax com metas de loja) |
| Negócio pequeno, sem gestão | **Smart** (evitar para clientes do Eduardo) |

## Regras do Eduardo aplicadas ao Google Ads

- Autorização geral: **sem pedir confirmação** para ações necessárias do pedido; perguntar só se houver risco de atingir **conta/cliente errado**.
- Fazer **apenas o que foi pedido**. Pausar/criar/apagar só com pedido explícito.
- Identificar a **conta pelo nome do cliente**, conferir o **ID (CID)** antes de alterar. Tolerar erros de digitação.
- **Regra de ouro:** o que estava ativo continua ativo; pausado continua pausado. Retrato antes, releitura depois. Nunca declarar concluído sem reler.
- **Criação:** estrutura primeiro (campanha → grupos/conjuntos → anúncios), perguntar se criativos estão na biblioteca, montar tabela `Nome do Ad | Nome do Arquivo | ID/hash`, confirmar, só então inserir mídia. Consultar o **briefing do cliente**.
- **Verba:** tabela `Nome | Valor i | Valor f | Variação líquida | Variação %`. Considerar só estruturas **realmente ativas e entregando**. Otimização por prints: aguardar aprovação, depois aplicar direto; nada que teve verba alterada fica pausado; pausar só o que o Eduardo marcou.
- **Orçamento por funil:** formato `<FUNIL>: R$ X` + `TOTAL DIÁRIO`. No Google Ads o orçamento é **sempre na campanha** (não existe CBO/ABO). Somar só campanhas com status **Ativada** e entregando; listar campanha a campanha antes de somar. Contas em USD usam US$.
- **Nunca** guardar tokens, senhas ou credenciais no repositório.
- Pixel/Página padrão (Pixel1/Página1) são conceitos do **Meta**; no Google usar a **tag/conversões do cliente** e o que o briefing indicar.

## Equivalências Meta ↔ Google (para quem vem do Meta)

| Meta | Google Ads |
|---|---|
| Campanha | Campanha |
| Conjunto de anúncios | Grupo de anúncios (Pesquisa) / Grupo de recursos (PMax) / Grupo de anúncios (Vídeo/Display/Demand Gen) |
| Anúncio | Anúncio / Recursos (assets) |
| CBO | Orçamento da campanha (sempre) |
| ABO | Não existe; orçamento compartilhado é opcional (portfólio) |
| Pixel / CAPI | Tag do Google / Conversões avançadas / importação offline |
| Públicos | Segmentos de público (observação x segmentação) |
| Learning phase | Período de aprendizado de smart bidding |
| Status Ativo/Pausado | Ativada / Pausada / Removida |
