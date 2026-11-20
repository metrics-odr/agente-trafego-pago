# Plano: preencher a Planilha Central do Dr Thiago com os leads que compraram

Levantado em 20/11/2026. Só leitura (GET) no Kommo; nada foi criado, alterado ou gravado na planilha ou no Kommo. Contexto: [`manual-infraestrutura-kommo-drthiago.md`](manual-infraestrutura-kommo-drthiago.md), [`clientes/drthiago.md`](clientes/drthiago.md).

## 1. Onde estão os compradores no Kommo (Verificado, leitura ao vivo)

**Por etapa.** Quem comprou fica na etapa **`Compareceu e fechou procedimento`** (status `142`, etapa de ganho do Kommo) do funil `13296523` (Dr Thiago - PRÉ VENDAS E AGENDAMENTOS).

| Critério | Resultado |
|---|---|
| Leads na etapa 142 do funil `13296523` | **30** |
| Leads na etapa 142 de `14577156` (Comercial) e `13311463` (Pós Venda) | 0 |
| Profissional (campo `2329398`) | 29 Dr. Thiago, **1 Dra. Fernanda** |
| Origem (campo `2329388`) | 17 Trafego, 8 Instagram, 1 Indicação, 4 vazio |
| Mês de `closed_at` | 2026-03: 1, 04: 7, 05: 13, 06: 9. **Nenhum de julho a novembro** |
| Nome do lead | 25 `Lead #id`, 2 `Lead Site - nome`, 3 outros |
| Contatos vinculados | todos têm contato |

**Não é por tag nem por campo.** Só 1 dos 30 tem tag (`LP - Dr Thiago`). O campo `Procedimento Fechado` (`2613441`) está **vazio nos 30**. `price` (valor da venda) é **0 nos 30**: não há valor de venda no Kommo.

**Funil Pós Venda `13311463`** (para onde a automação deveria mandar quem fechou, após 5 min): só **10 leads** (8 Novo Interesse, 1 Venda perdida, 1 Base de Clientes). Os 30 compradores **não foram movidos para lá**, então esse funil não é fonte de compradores.

## 2. Pontos que o levantamento não resolve (decidir antes de construir)

1. **Qual aba e quais colunas.** O link tem `gid=510373601`, mas o conector do Drive não informa o `gid` das abas, então **não consegui identificar qual aba é**. Candidatas:
   - `Compras 🛒` (A–Q: Data, Nome, Email, Telefone, Produto, Oferta, Faturamento, Receita, Método de Pagamento, utm, Campanha, Conjunto, Anúncio, UF, Cidade, Zip, Endereço). Tem ~10 mil linhas e formato de infoproduto: confirmar que é a aba do Dr Thiago e não de outra operação.
   - `Leads Landing Page 👥`, colunas `Compra Detectada`, `Faturamento Detectado`, `Receita Detectada`, `Data Compra` (Q–U), que cruzam por telefone/e-mail.
2. **Definição de "comprou".** Pelo Kommo é a etapa 142 (30 leads, todos até junho). Não há compra de julho a novembro: ou não houve, ou a equipe não está movendo para 142. **Não verificado**; perguntar ao Eduardo/equipe.
3. **Valor.** Sem preço no Kommo. Faturamento/Receita ficam em branco ou vêm de outra fonte (Clínica Experts: campos `2622997`/`2622999`, **não lidos**).
4. **O lead da Dra Fernanda** na etapa 142 do funil do Dr Thiago: excluir (regra do repositório) ou incluir? Proposta: excluir e avisar.
5. ~~Uma vez ou contínuo~~ **Decidido pelo Eduardo em 20/11/2026: só fluxo contínuo por webhook, sem carga única.** Os 30 leads que já estão na etapa 142 **não entram** na planilha (só os movidos para a etapa daqui para frente).

## 3. Plano de implementação

Fluxos **inativos** na pasta `DrThiago`, nomes pelo [`padrao-n8n.md`](padrao-n8n.md); só publicar com ordem do Eduardo.

**Fase 0. Decisões** (seção 2): aba e colunas, definição de comprador, Fernanda, contínuo ou não.

**Fase 1. Mapeamento das colunas.** Ler o cabeçalho da aba escolhida (`gid` identificado pelo Eduardo, ou lendo as abas por nome pelo Sheets no n8n). Montar a tabela `Coluna | Origem no Kommo | Regra`. Proposta para o que o Kommo tem:

| Dado | Origem |
|---|---|
| Data | `closed_at` do lead (dd/MM/aaaa HH:mm:ss, fuso São Paulo) |
| Nome / Telefone | contato (`name` e campo `PHONE`, só dígitos com 55) via `GET /api/v4/contacts/<id>` |
| entity_id | id do lead |
| Origem | campo `2329388` |
| Campanha / Conjunto / Anúncio | campos Meta Ads `2617935`…`2617945` (preenchidos só em parte dos leads: **conferir**) |
| Produto / Faturamento / Receita | **sem fonte no Kommo**: em branco até decidir (item 3) |

**Fase 2. Carga única (backfill). DESCARTADA pelo Eduardo; não construir.** Fluxo manual `Flow | DrThiago | Geral | Manual > Sheets - Preenche leads que compraram (uso único)`:
1. `GET /api/v4/leads?filter[statuses][0][pipeline_id]=13296523&filter[statuses][0][status_id]=142&with=contacts&limit=250` (paginar).
2. Filtrar `Profissional = Dr. Thiago`.
3. Buscar telefone de cada contato; normalizar.
4. Dedup contra a aba (por `entity_id`/telefone), para não duplicar nada que a equipe já preencheu à mão.
5. Gravar com **Use Append ligado**, só as colunas da Fase 1; colunas da equipe não são tocadas.
6. Registrar no controle só depois de a planilha confirmar.

**Fase 3. Contínuo (APROVADO, é o que será construído; falta a aba/colunas da Fase 0).** Gatilho Webhook na etapa `Compareceu e fechou procedimento` do Kommo (como o de AGENDADO): fluxo `Flow | DrThiago | Geral | Kommo > Sheets - Registra leads que compraram`, com payload bruto em data table de histórico, anti-duplicata por `lead_id`, busca de lead/contato na API (o webhook só traz IDs) e `Use Append`. Cuidado: ao marcar "aplicar a todos os leads já nesta etapa" o Kommo dispara um webhook por lead de uma vez.

**Fase 4. Verificação dupla.** Releitura 1: contagem de linhas gravadas = leads elegíveis (esperado 29 se Fernanda for excluída) e conferência por `entity_id`. Releitura 2, separada: listar a aba e achar duplicatas, faltantes e linhas fora do pedido. Teste com lead fictício `TESTE-...` e limpeza depois.

**Fase 5. Documentação e limpeza.** Atualizar `clientes/drthiago.md` (inventário e histórico) e este plano. O Eduardo apaga à mão o fluxo de leitura [`jmrezUvcXOtCYjZf`](https://n8n.srv2164786.hstgr.cloud/workflow/jmrezUvcXOtCYjZf) (uso único, criado nesta investigação) e o antigo `2cqdDHyFGAZOu0lz`.

## 4. Riscos
- Gravar na aba errada (ver item 1 da seção 2) ou lead da Dra Fernanda na planilha do Dr Thiago.
- Planilha com mais de uma pessoa editando: usar só append e não mexer em colunas da equipe.
- Valor de venda inexistente no Kommo: não inventar; deixar em branco.

## 5. Estado em 20/11/2026 (decisões e construção)

**Decisões do Eduardo:** só fluxo contínuo por webhook; aba **`Compras 🛒`**; leads da Dra Fernanda **entram**, com uma coluna indicando de quem é (Dr. Thiago ou Dra. Fernanda). Isto substitui a proposta de excluí-los (seção 2, item 4).

**Aba `Compras 🛒` (Verificado):** só tem o cabeçalho (linha 1, colunas A–Q: Data, Nome, Email, Telefone, Produto, Oferta, Faturamento, Receita, Método de Pagamento, utm_cap-source, Campanha, Conjunto, Anúncio, UF, Cidade, Zip Code, Endereço). Nenhuma venda lançada. **Falta criar a coluna R com o cabeçalho `Profissional`** (o fluxo grava nela).

**Fluxo construído, INATIVO:** [`Flow | DrThiago | Geral | Kommo > Sheets - Registra leads que compraram`](https://n8n.srv2164786.hstgr.cloud/workflow/PQAMxyyAqoiHr35w) (`PQAMxyyAqoiHr35w`). Webhook `https://n8n.srv2164786.hstgr.cloud/webhook/drthiago-geral-kommo-sheets-compras`. Tabelas: `Compras registradas (anti-duplicata)` (`vH3XqXwJ7YpnVJsQ`) e `Payloads da etapa Compareceu e fechou (histórico)` (`XIPLen8kCAJU2XVQ`).

| Coluna da aba | Origem |
|---|---|
| Data | `closed_at` do lead (senão, agora), fuso São Paulo |
| Nome, Email, Telefone | contato principal do lead (telefone só dígitos) |
| Produto | campo `Procedimento Fechado` (`2613441`), hoje vazio nos leads |
| Faturamento | `price` do lead, só se maior que 0 |
| utm_cap-source | campo `Origem` (`2329388`) |
| Campanha, Conjunto, Anúncio | campos Meta Ads do lead (só se preenchidos) |
| Cidade | campo `Cidade` (`2608521`) |
| **Profissional (R)** | campo `Profissional` (`2329398`): Dr. Thiago, Dra. Fernanda, Outros ou Não informado |
| Oferta, Receita, Método de Pagamento, UF, Zip Code, Endereço | em branco (sem fonte no Kommo) |

**Teste a seco (20/11/2026, sem gravar):** lead real `38765725` (Lead Site - Cassia): saiu `Cassia | 5511945357820 | Trafego | Dr. Thiago | 18/04/2026 11:20:43`. Só funil `13296523` e etapa `142` passam; outros eventos são descartados.

**Falta:** (1) cabeçalho `Profissional` em R1; (2) gatilho de webhook no Kommo (funil `13296523` → etapa Compareceu e fechou procedimento → "Quando movido para esta etapa" → URL acima), **"aplicar a todos os leads já nesta etapa" **pode** ser marcado (decisão do Eduardo, 20/11): a coluna Data usa o `closed_at` de cada lead, então os 30 antigos entram com a data real da venda (27/03 a 12/06 nos testes), não no dia do envio; (3) um teste real e a verificação dupla; (4) ordem do Eduardo para publicar. A etapa tem automação que move o lead ao Pós Venda após 5 min: o webhook dispara antes. Leads da Dra Fernanda no funil dela (`14055675`) **não** estão cobertos (outro funil, exigiria outro gatilho).

**Envio em massa (testado a seco em 20/11/2026):** com 4 leads no mesmo aviso, 3 saíram com datas distintas (`27/03/2026`, `18/04/2026`, `12/06/2026`) e 1 lead inexistente foi desviado para falha. O teste achou e corrigiu um defeito (o nó de montar a linha processava só o 1º lead; agora é um por lead). Falhas (Kommo não devolveu lead/contato, limite de requisições) não geram linha nem controle: vão para o histórico com o texto `FALHA: ...`, e as consultas ao Kommo têm até 5 tentativas. Ordem das linhas na aba = ordem de chegada, não cronológica (ordenar a aba por Data depois). Para reenviar um lead que falhou: tirar da etapa e voltar, ou reaplicar a automação (o controle ignora os já registrados).
