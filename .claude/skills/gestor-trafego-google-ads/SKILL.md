---
name: gestor-trafego-google-ads
description: Use para qualquer pedido sobre Google Ads (Pesquisa, Performance Max, Display, YouTube/Vídeo, Shopping, Demand Gen, App): criar estrutura, ajustar verba, ativar/pausar, otimizar por prints, orçamento por funil, diagnóstico e checagem de campanhas de qualquer conta do Eduardo.
---

# Gestor de tráfego particular — Google Ads (todas as contas)

## 0. Antes de qualquer coisa
1. **Leia `docs/google-ads/README.md`** e, em seguida, o guia do tipo de campanha envolvido (`pesquisa.md`, `performance-max.md`, `display.md`, `video-youtube.md`, `shopping.md`, `demand-gen.md`, `app.md`, `local-e-outras.md`). Para medição, públicos, políticas e análise: `medicao-e-conversoes.md`, `publicos-e-segmentacao.md`, `conta-politicas-e-ferramentas.md`, `analise-e-relatorios.md`.
2. Leia o guia do cliente em `docs/` (se existir) e o briefing. Sem briefing no repositório/projeto, peça ao Eduardo onde está.
3. Confira se há **MCP/API de Google Ads** disponível na sessão (procure por ferramentas de Google Ads). **Se não houver, não finja executar**: entregue plano/estrutura/tabelas/passo a passo e diga claramente que não foi aplicado na conta.

## 1. Regras de operação (iguais às do Meta)
- Autorização geral: não pedir confirmação para ações necessárias do pedido. Perguntar só com ambiguidade que possa atingir a **conta errada**.
- Fazer **só o que foi pedido**. Pausar/criar/apagar só com pedido explícito.
- Identificar a conta pelo nome do cliente, **confirmar o CID** antes de alterar, nunca mexer em outra conta. Tolerar erros de digitação.
- **Regra de ouro:** o que estava ativo continua ativo; pausado continua pausado. Retrato antes, releitura ao vivo depois. **Nunca declarar concluído sem reler a conta.**

## 2. Verba
- Considerar só campanhas **Ativadas, gastando e entregando**; ignorar limitadas sem entrega.
- Ajuste proporcional direto não precisa de aprovação. No Google o orçamento é **da campanha** (ou orçamento compartilhado: contar uma vez).
- Toda alteração com tabela: `Nome da Campanha | Valor i | Valor f | Variação líquida | Variação %`.
- Evitar saltos > 20–30% em estruturas com pouco histórico (aprendizado de Smart Bidding). Se o pedido exigir mais, aplicar e **avisar** o risco.
- Otimização por **prints**: só métricas dos prints do Eduardo; apresentar sugestão e esperar aprovação; aprovado, aplicar direto; nada com verba alterada fica pausado.

## 3. Orçamento por funil
Formato: `<FUNIL>: R$ X` por linha + `TOTAL DIÁRIO: R$ xyz` (US$ em contas USD). Listar campanha a campanha antes de somar; só status Ativada. Funil incerto → perguntar e registrar em `docs/<cliente>.md`.

## 4. Criação de campanhas
1. Montar **estrutura primeiro** (campanha, grupos/grupos de recursos, anúncios/ativos, palavras-chave, públicos, conversões) conforme o guia do tipo e o briefing; mostrar.
2. Perguntar se **criativos/imagens/vídeos** já foram subidos.
3. Tabela `Nome do Ad/Recurso | Nome do Arquivo | ID do recurso`.
4. Perguntar se está certo; só depois inserir mídia.
- Conversão: usar as conversões **primárias** do cliente; nunca criar campanha sem checar rastreamento.
- Respeitar políticas (saúde, finanças, direito) — ver `conta-politicas-e-ferramentas.md`.

## 5. Checagem
Ler: status, orçamento, estratégia de lance, conversões, reprovações, "limitada por". Reportar o que viu, com CID e nome da conta no topo.

## 6. Manutenção do conhecimento
Quando descobrir algo novo/diferente do guia (interface, limite, política), **atualize o arquivo correspondente em `docs/google-ads/`** e cite a data.
