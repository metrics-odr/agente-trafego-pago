# MedNexus — Instruções e cuidados para operar a conta de anúncios (Meta Ads)

Guia criado a partir do ajuste de orçamento feito em 30/10/2026 (de R$ 510 para ~R$ 100/dia). Serve para evitar os erros encontrados.

## 1. Identificação da conta
- Conta: **Clã da Medicina** — ID `900675294624191` — business **Mednexus** — moeda BRL.
- O usuário (Eduardo) tem ~50 contas de anúncios. Sempre localizar pelo nome do business ("Mednexus") e confirmar o ID antes de qualquer alteração. Nunca alterar outra conta por engano.
- Contas com status DISABLED, UNSETTLED ou CLOSED não são consultáveis; ignorar.

## 2. Autorização
- O usuário deu permissão geral: **não pedir confirmação** para ações necessárias (ajustar orçamento, publicar rascunhos, reativar o que deveria estar rodando).
- Mesmo assim, fazer só o que foi pedido. Mudanças fora do escopo (pausar, criar, apagar) exigem pedido explícito.

## 3. Regra de ouro: o que estava ativo continua ativo, o que estava pausado continua pausado
A Meta pode pausar ou colocar em processamento um item depois de uma edição. Por isso:
1. **Antes** de alterar: tirar um retrato do estado (campanhas, conjuntos e anúncios) com `effective_status`, orçamento e IDs.
2. **Depois** de publicar: ler de novo e comparar com o retrato.
3. Se algo que estava ativo aparecer pausado, reativar. Se algo que estava pausado aparecer ativo, pausar.
4. O status `IN_PROCESS` logo após a publicação é transitório. Reconferir depois de alguns instantes antes de concluir.
5. `CAMPAIGN_PAUSED`, `ADSET_PAUSED` e `AD_PAUSED` são consequência de um pai/filho pausado. Não são erro.

## 4. Orçamento: onde ele fica
- **CBO**: orçamento no nível da campanha.
- **ABO**: orçamento em cada conjunto de anúncios.
- Antes de editar, descobrir em qual nível está. Se o orçamento da campanha vier vazio (n/d), ele está nos conjuntos.
- Somar a verba diária total contando só entidades **ativas** e sem duplicar (campanha CBO + conjuntos não se somam).

## 5. Valores e mínimos
- A API recebe orçamento em **centavos** (R$ 7,84 = `784`).
- Mínimo por conjunto: **R$ 5,13/dia**.
- Mínimo de campanha CBO = R$ 5,13 × número de conjuntos ativos. Exemplos: 2 conjuntos = R$ 10,26; 3 conjuntos = R$ 15,39.
- Abaixo do mínimo, a atualização é aceita como rascunho, mas a publicação falha com "Budget Too Low". Calcular o mínimo antes.
- Em redução proporcional, o mínimo pode distorcer a divisão. Avisar o usuário do desvio.

## 6. Rascunho (draft): a alteração não vale até publicar
- `ads_update_entity` devolve `is_draft: true`. Isso significa que **nada mudou ainda na conta**.
- Para valer: publicar com `ads_activate_entity`, passando todos os IDs alterados em `object_ids` e `publish_as_active: false` (mantém o status atual de cada item).
- Usar `publish_as_active: true` só se a intenção for ativar o item principal.
- A resposta `PUBLISHING` só indica que foi entregue para publicação. **Confirmar sempre lendo a conta ao vivo.**
- Para ver o que está em rascunho: `ads_get_ad_entities` com `object_state=draft`.

## 7. Chamadas em paralelo
- Se uma chamada em lote não devolver resposta, não assumir que rodou. Ler o estado real e só repetir o que faltou.
- Conferir `active_errors` em cada resposta de atualização, mesmo com `success: true`.

## 8. Efeitos colaterais de mexer em orçamento
- Mudança de orçamento pode reiniciar a fase de aprendizado dos conjuntos.
- Com CPM de R$ 90 ou mais, verba baixa reduz muito a entrega. Avisar o usuário.
- Uso de `hide_ui: true` ao atualizar vários itens evita um card de pré-visualização por item.

## 9. Fluxo recomendado para ajuste de verba
1. Identificar a conta e listar campanhas ativas.
2. Levantar orçamento e status de campanhas, conjuntos e anúncios (retrato "antes").
3. Calcular os novos valores (fator = verba nova ÷ verba atual), respeitando os mínimos da seção 5.
4. Aplicar as atualizações (viram rascunho).
5. Conferir `active_errors` e corrigir mínimos.
6. Publicar todos os IDs de uma vez com `publish_as_active: false`.
7. Reler campanhas, conjuntos e anúncios e comparar com o retrato.
8. Corrigir qualquer status que tenha mudado.
9. Informar ao usuário: total novo, tabela antes/depois, desvios da proporção e status final.

## 10. Estado de referência (30/10/2026, após o ajuste)
Verba diária ativa: **R$ 99,77**.

| Grupo | Campanha | ID | Orçamento |
|---|---|---|---|
| Lead Ads | 06/10 Teste Ads (ABO, 5 conjuntos) | 120252068465480463 | R$ 30,33 |
| Lead Ads | 19/10 AD01 (ABO, 3 conjuntos de R$ 6,30) | 120252255136580463 | R$ 18,90 |
| Lead Ads | 02/09 (CBO) | 120252018416760463 | R$ 9,50 |
| Lead Ads | 21/10 AD52 (CBO) | 120252292280010463 | R$ 10,26 |
| Conversão | 30/09 1-3-1 AD01 (CBO) | 120251987813220463 | R$ 15,39 |
| Conversão | 30/09 1-3-1 AD01 V2 (CBO) | 120252255066160463 | R$ 15,39 |

Pendência: a campanha de 02/09 ficou em R$ 9,50 por erro de digitação; o valor proporcional seria R$ 11,76.

Devem permanecer **pausados**: campanhas Teste de Ads 7, 8 e 9, Purchase 11/08 1-3-1 AD01 e Mensagem 30/09; conjuntos AD70, AD71 e Ad64 (sob a campanha de 06/10).
