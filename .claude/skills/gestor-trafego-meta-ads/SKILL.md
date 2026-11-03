---
name: gestor-trafego-meta-ads
description: Use para qualquer pedido de ajuste de verba, ativar ou pausar, ou checagem de campanhas no Meta Ads de qualquer conta de anúncios do Eduardo (ex.: aumentar verba para X proporcionalmente).
---

# Gestor de tráfego particular — Meta Ads (todas as contas)

O Eduardo tem ~50 contas de anúncios e autorizou executar sem pedir confirmação: não pergunte "posso prosseguir?". Faça só o que foi pedido. Pausar, criar ou apagar só com pedido explícito. O único motivo para parar e perguntar é ambiguidade que pode atingir a conta errada.

## 1. Identificar a conta (nunca errar de conta)
- Procure com `ads_get_ad_accounts` pelo nome do cliente/business que o usuário citou. Tolere erros de digitação ("Mex Nexus" = MedNexus = Clã da Medicina, ID 900675294624191, BRL).
- Se houver 0 ou 2+ contas plausíveis, pergunte qual (liste nome + ID). Se houver exatamente 1, siga e diga qual conta e ID usou no início do relatório.
- Ignore contas DISABLED, UNSETTLED ou CLOSED. Toda chamada usa o ID da conta confirmada; nunca reaproveite ID de outra conta.
- Pedido sem conta definida ("todas as contas"): trate conta por conta, com retrato e relatório separados, e só nas contas que o usuário indicou.

## 2. Regra de ouro: status
O que estava ativo continua ativo; o que estava pausado continua pausado. A Meta pode pausar ou pôr em processamento depois de editar. Por isso sempre: retrato ANTES, publicação, releitura DEPOIS, correção de diferenças. Nunca confie em listas fixas de pausados: use o retrato.
- `IN_PROCESS` logo após publicar é transitório: reconfira após alguns instantes.
- `CAMPAIGN_PAUSED`, `ADSET_PAUSED`, `AD_PAUSED` são consequência de pai/filho pausado, não erro.

## 3. Fluxo de ajuste de verba
1. Retrato antes: `ads_get_ad_entities` (com `hide_ui: true`) de campanhas, conjuntos e anúncios: id, nome, effective_status, objetivo, daily_budget. Se o orçamento da campanha vier vazio, é ABO (verba nos conjuntos); senão é CBO (verba na campanha). Não some CBO + seus conjuntos.
2. Verba atual = soma só de entidades ATIVAS (pausadas não entram), sem duplicar.
3. Fator = verba nova ÷ verba atual. Cada orçamento ativo × fator. Aplique ao funil/campanhas que o usuário indicou; se ele disse "campanhas da conta", todas as ativas. API em centavos (R$ 7,84 = 784).
4. Mínimos: descubra o mínimo da moeda/conta (na conta BRL: R$ 5,13 por conjunto/dia; CBO = mínimo × nº de conjuntos ativos). Em outras moedas confirme via erros ou `ads_get_field_context`. Abaixo do mínimo a publicação falha ("Budget Too Low"). Ao subir verba isso raramente pega, ao reduzir sim; avise desvios.
5. Anomalias: se um valor atual parecer erro de digitação, mantenha a proporção dos valores atuais e destaque no relatório, sem corrigir por conta própria (ex.: MedNexus, campanha 02/09 está em R$ 9,50, proporcional seria R$ 11,76).
6. Aplique com `ads_update_entity` (vira rascunho, `is_draft: true`: nada vale ainda). Confira `active_errors` em cada resposta mesmo com success true. Se um lote não responder, não assuma que rodou: releia e repita só o que faltou.
7. Publique todos os IDs alterados de uma vez com `ads_activate_entity` (`object_ids` completo, `publish_as_active: false`). Use `true` só se o pedido for ativar o item.
8. Releia ao vivo, compare com o retrato, corrija status que mudou. `object_state=draft` não deve mais listar rascunhos pendentes. Confirme que a soma ativa bate com o valor pedido (ou explique o desvio).

## 4. Relatório final (curto)
Conta e ID usados; verba total antes → depois; tabela antes/depois por campanha/conjunto; desvios por mínimo ou anomalias; status final confirmado. Avise que mudança de orçamento pode reiniciar a fase de aprendizado e que CPM alto com verba baixa reduz a entrega.

## 5. Outros pedidos de gestor
Para ativar/pausar, checar performance ou diagnóstico, use o mesmo padrão: identificar conta, retrato antes, agir, reler ao vivo, relatório curto. Nunca declare concluído sem reler a conta.
