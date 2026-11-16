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
4. Mínimos: leia `min_daily_budget_cents` da conta em `ads_get_ad_accounts` (hoje BRL = 549, ou seja R$ 5,49; USD = 100). Mínimo por conjunto/dia; CBO = mínimo × nº de conjuntos ativos. Em 30/10 o mínimo da Clã da Medicina era R$ 5,13: o valor muda, então sempre use o campo da conta. Abaixo do mínimo a publicação falha ("Budget Too Low"). Ao subir verba isso raramente pega, ao reduzir sim; avise desvios.
5. Anomalias: se um valor atual parecer erro de digitação, mantenha a proporção dos valores atuais e destaque no relatório, sem corrigir por conta própria (ex.: MedNexus, campanha 02/09 está em R$ 9,50, proporcional seria R$ 11,76).
6. Aplique com `ads_update_entity`. **Atenção (confirmado em 16/11/2026, conta Larissa Topper):** com o modo rascunho desligado, a edição vai direto ao vivo (`is_draft: false`) e o Meta **pausa o item automaticamente** (`status_forced_to_paused: true`, `updated_fields` mostra `"status":"PAUSED"`). Isso aconteceu em 10 de 11 itens editados. Se vier `is_draft: true`, vale o fluxo do passo 7. Confira `active_errors` em cada resposta mesmo com success true. Se um lote não responder, não assuma que rodou: releia e repita só o que faltou.
7. Se `is_draft: true`: publique todos os IDs alterados de uma vez com `ads_activate_entity` (`object_ids` completo, `publish_as_active: false`). Se `is_draft: false` e o item foi pausado pela edição: reative cada item que estava ativo com `ads_activate_entity` (`publish_as_active: true`, um por entidade, campanha antes de conjunto). Não reative o que já estava pausado antes (retrato). Se `status_forced_to_paused` vier `false`, não precisa reativar.
8. Releia ao vivo, compare com o retrato, corrija status que mudou. `object_state=draft` não deve mais listar rascunhos pendentes. Confirme que a soma ativa bate com o valor pedido (ou explique o desvio).

## 4. Relatório final (curto)
Conta e ID usados; verba total antes → depois; tabela antes/depois por campanha/conjunto; desvios por mínimo ou anomalias; status final confirmado. Avise que mudança de orçamento pode reiniciar a fase de aprendizado e que CPM alto com verba baixa reduz a entrega.

## 5. Outros pedidos de gestor
Para ativar/pausar, checar performance ou diagnóstico, use o mesmo padrão: identificar conta, retrato antes, agir, reler ao vivo, relatório curto. Nunca declare concluído sem reler a conta.

## 6. Aprendizados de otimização (valem para todas as contas)
- **CBO ou ABO vem da configuração do Meta**, não do nome: `daily_budget` na campanha = CBO; sem orçamento na campanha e com `daily_budget` nos conjuntos = ABO. O nome serve só de conferência.
- **Valores sempre em múltiplos de 5.** Respeitar o mínimo da conta (BRL ~R$ 5,49): conjunto de teste que não pode cair abaixo disso fica em R$ 10, nunca em R$ 5.
- **Todo ajuste vem com a justificativa**, uma linha por campanha/conjunto, com as métricas que motivaram (CPMQL, CPAGD, ROAS-F, ROAS-R, vendas, tendência recente). Nunca remover a justificativa ao reformatar.
- **Formato do plano (sem tabelas):** CBO primeiro (campanha: de R$ X para R$ Y), depois ABO (campanha e, abaixo, cada conjunto com a verba). No fim, verba por funil e a conferência da soma.
- **Dados:** usar a dashboard do cliente (não só o Meta). Reproduzir a lógica dela: gasto com imposto, só leads pagos e vendas atribuídas pela data de cadastro do lead. Comparar janelas de 3, 7, 14 e 30 dias e o período pedido.
- **Redistribuição entre funis:** decidir primeiro a verba por funil (custo por venda, ROAS de caixa e faturamento, ticket médio e tendência recente) e só depois dividir dentro de cada funil.
- **Campanhas pausadas com bom resultado** não são reativadas sem pedido, mas devem ser mencionadas no plano.
- **Avisos ao cliente:** texto curto, com o formato por funil e uma linha de motivo por funil.
