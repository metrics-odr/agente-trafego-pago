# Plano de migração Make → n8n — MedNexus (Leads gerados e Vendas realizadas)

Elaborado em 26/11/2026 a partir da leitura dos cenários no Make (somente leitura; nada foi criado, alterado ou desligado). Padrão de nomes: [`padrao-n8n.md`](padrao-n8n.md). Cliente: [`clientes/mednexus.md`](clientes/mednexus.md).

> **Segurança:** o token da Meta que está dentro do cenário do Make **não** foi copiado para cá. Nunca gravar valores de tokens neste repositório.

---

## 1. Onde estão as automações

Make `us1.make.com`, organização `My Organization` (1615439), time `My Team` (647864), criado por Thiago Costa, com a conexão Google do Eduardo. (O `setup-geral.md` cita outra organização/time, 376982/147372: está desatualizado ou é outra conta. Corrigir depois.)
Não consultei a zona `us2.make.com` (contas de clientes). Se houver cenário do MedNexus lá, ficou fora deste levantamento.

| Cenário (ID) | Webhook | Estado | Papel | Migrar? |
|---|---|---|---|---|
| **Assinatura Green > Google Sheets** (4800251) | `Green \| Subscription` (2756148) | **Ativo**, 48 execuções, 5 erros | **Vendas realizadas** | **Sim** |
| **Leads Gerados > Google Sheets** (4802201) | `Form \| Lead` (2757448) | **Desligado**, 0 execuções, última edição 09/07/2026 | **Leads gerados** (planilha + Meta CAPI) | **Sim** |
| Umbler > Sheets (4848063) | `Umbler \| Lead` (2783624) | **Ativo**, 230 execuções, 0 erros | Mensagem inicial do WhatsApp → aba Conversas | Fora do pedido, mas precisa migrar para largar o Make (ver §7) |
| `[Automatiza] Disparo Closer` e `(RMKT)`, `Integration Webhooks` | recebe-wp, RMKT | Desligados, 0 execuções | Sem uso | Não migrar; arquivar no Make |
| Data store `MedNexus` (88115) | — | 154 registros | Anti-duplicata das vendas | Migrar o conteúdo (§4.3) |

**Planilha de destino:** [MEDNEXUS | Planilha Central](https://docs.google.com/spreadsheets/d/1npTWHf_taXBhGlOT-WFtlt7CvX44sVbKf8WGs8nQhgE/edit) (a mesma do fluxo de recuperação já no n8n).

---

## 2. Como cada automação funciona hoje

### 2.1 Vendas: Assinatura Green > Google Sheets
Gatilho: webhook da Green (autenticado pelo cabeçalho `x-make-apikey`). Evento do exemplo: `saleUpdated`, `type: sale`, `status: paid`, produto "MedNexus Plataforma", oferta "MedNexus", cartão em 12x.

```
Webhook Green
 └─ Data store MedNexus: existe a chave client.id?
     ├─ SIM (cliente recorrente) → aba "All Payments 🛒" (1 linha)
     └─ NÃO (assinatura nova)    → grava client.id no data store
                                   → aba "New Subscriptions 🛒" (1 linha)
                                   → aba "All Payments 🛒" (1 linha)
```
Sem filtro de status (paga, pendente, reembolsada) e sem filtro de produto/oferta.

Campos gravados (ambas as abas, mesma origem):

| Coluna | Valor no Make |
|---|---|
| A Data | `formatDate(sale.updated_at + contract.start_date; DD/MM/YYYY)` |
| B Nome / C Email / D Telefone | `client.name` / `client.email` / `client.cellphone` |
| E Produto / F Oferta | `product.name` / `offer.name` |
| G Faturamento | `product.amount` |
| H Receita | `currentSale.seller_balance` (formato `1.234,56`) |
| I Método | `offer.method` |
| M, N, O | `client.uf`, `client.city`, `client.zipcode` (ver achado 3) |
| J, K, L (utm/campanha/conjunto/anúncio) | **não são gravadas**: vêm de fórmula da planilha |

Registro no data store: chave `client.id`; dados `contract_id`, `client_email`, `processed_at` (`sale.created_at`).

### 2.2 Leads: Leads Gerados > Google Sheets
Gatilho: webhook do formulário do site (`Form Pré-WhatsApp`, id `17ee739`, formato Elementor: `fields.<campo>.value`), autenticado por `x-make-apikey`.

```
Webhook do formulário
 ├─ Google Sheets: 1 linha na aba "Leads 👥"
 └─ Router → se "Você é Médico?" contém SIM  E  especialidade NÃO contém "terap"
             → HTTP POST Meta Conversions API (2 eventos: Lead e MQL)
```
Colunas gravadas em `Leads 👥`: A data (hoje, DD/MM/AAAA), B nome, C email, E "é médico?", F especialidade, G a K utm_source, utm_campaign, utm_medium, utm_term, utm_content, L fbc, M fbp, N user_agent, O client_ip, P external_id. **D (telefone) não é gravada.** As colunas Q a U (MQL = QLF/DSQ, Comprou?, Faturamento, Receita, Data) e as abas `QLFs` e ` DSQs ❌` são calculadas na planilha.

Meta CAPI: dataset/pixel `6055994897786240`, `action_source: website`, `event_time` em segundos, e-mail com SHA-256 (minúsculo, sem espaços), `external_id` com SHA-256, `fbp`/`fbc`/user agent/IP, `custom_data` com utm_source, utm_campaign, utm_medium e specialty. Os dois eventos (Lead e MQL) vão no mesmo POST. Graph API v19.0.

### 2.3 Conversas: Umbler > Sheets
Webhook da Umbler (`NewChat`) → 1 linha em `Conversas 💬`: A data da última mensagem, B texto da mensagem (ex.: `REF049 - Oi, tenho dúvidas...`), C nome do contato, D telefone. O código `REFxxx` na mensagem é o que liga a conversa ao anúncio (por fórmula).

---

## 3. Achados que mudam a migração

1. **Token da Meta em texto puro** dentro do módulo HTTP do cenário de leads. Quem abre o cenário no Make vê; o valor também apareceu nesta sessão. **Rotacionar o token** e guardar o novo só numa credencial do n8n (criada pelo formulário seguro, nunca no chat).
2. **O cenário de leads está desligado** (0 execuções; a aba `Leads 👥` tem ~1.265 linhas de 01/07/2026 em diante). Descobrir **quem alimenta hoje** a aba `Leads 👥` e o CAPI (outro fluxo? a mesma automação externa citada em `clientes/mednexus.md` §9?) antes de ligar qualquer coisa no n8n. Se não descobrir, existe risco de dado duplicado ou de CAPI duplicado.
3. **Colunas desalinhadas em `New Subscriptions`:** o Make grava UF/Cidade/CEP nas colunas M, N, O, mas o cabeçalho dessa aba tem `Anúncio` em M e UF/Cidade/CEP/Endereço em N a Q. Em `All Payments` o alinhamento está certo. No n8n, mapear **por nome de coluna**, não por posição.
4. **Receita sempre vazia:** o Make lê `currentSale.seller_balance`, campo que não existe no payload do exemplo (o valor está em `sale.seller_balance`). A coluna H das abas de vendas aparece em branco. Corrigir muda o que a planilha mostra: **decisão do Eduardo** (§8).
5. **Sem filtro de status:** qualquer `saleUpdated` vira linha (pendente, reembolsada…). Conferir no histórico da Green quais status chegam. Sugestão: gravar só `status = paid`.
6. **Corrida no anti-duplicata:** em 10/11 houve 3 erros `Duplicate key` (reprocessamento) e em 04/11 chegaram 4 vendas em 3 segundos. No n8n a verificação "existe?" e a gravação são passos separados e dois eventos do mesmo cliente simultâneos passam juntos.
7. **Data:** `updated_at` + `start_date` concatenados e sem fuso explícito. No n8n usar `America/Sao_Paulo` e o campo `sale.paid_at` (ou `updated_at`, conforme decisão).
8. **CAPI com problemas de qualidade:** sem `event_id` (o Pixel do navegador e o CAPI contam o mesmo Lead duas vezes); `fbc`/`fbp`/IP/user agent vazios são enviados como a palavra `"vazio"` (piora a correspondência); sem `event_source_url`; Graph v19.0 antiga. Corrigir só depois da paridade (§6, fase 5).
9. **Escrita na planilha:** a conta de serviço do n8n hoje tem só leitura confirmada. Precisa de **Editor** (o Make usa o Google OAuth do Eduardo).
10. **Linhas pré-formatadas:** `New Subscriptions` tem formato até a linha ~10.100 e as colunas J a M são fórmulas. Testar o append do n8n numa **cópia** da planilha para ver se as fórmulas continuam calculando nas linhas novas.

---

## 4. Desenho no n8n

Pasta `MedNexus` (`hR1cAjU9b5L0fJ9l`), projeto pessoal. Funil proposto: `Geral` (o `Lead Ads` do cliente é só o formulário nativo → WhatsApp; confirmar em §8).

### 4.1 Workflows

| Nome | Caminho do webhook |
|---|---|
| `Flow \| MedNexus \| Geral \| Webhook LP > Sheets + Meta CAPI - Registra lead e envia Lead e MQL` | `mednexus-geral-lp-sheets-capi-leads` |
| `Flow \| MedNexus \| Geral \| Green > Sheets - Registra venda e assinatura nova` | `mednexus-geral-green-sheets-vendas` |
| `Flow \| MedNexus \| Geral \| Umbler > Sheets - Registra conversa iniciada` | `mednexus-geral-umbler-sheets-conversas` |

Cada um com descrição (modelo "Faz / Gatilho / Grava em / Regra"), sticky note e nós nomeados conforme `padrao-n8n.md` §2. `Grava em` cita planilha + aba.

### 4.2 Estrutura de cada fluxo

**Vendas (Green)**
1. `Gatilho - Green venda` (Webhook, autenticação por cabeçalho, responde 200 na hora).
2. `Guardar payload bruto` → data table de histórico (regra §2.7).
3. `Pago?` (status `paid`, se confirmado) e `Normalizar venda` (Code: telefone, data em BRT, valores).
4. `Cliente já registrado?` consulta a data table anti-duplicata pela `client.id`.
5. Não registrado → `Gravar em New Subscriptions` e `Gravar em All Payments`; registrado → só `Gravar em All Payments`. **Append atômico ligado** (`useAppend: true`).
6. `Registrar no controle` na data table **depois** de o Sheets confirmar.
7. Erro de qualquer etapa fica visível no histórico (status `erro`) para reprocessar.

Para a corrida (achado 6): o webhook só grava na tabela de histórico com status `pendente` e um segundo gatilho **agendado a cada 1 min** processa a fila uma venda por vez. O volume é baixo (dezenas por mês), então o atraso de até 1 min não importa e elimina a corrida.

**Leads (formulário)**
1. `Gatilho - Formulário lead novo` (Webhook, autenticação por cabeçalho).
2. `Guardar payload bruto`.
3. `Gravar na aba Leads` (mesmas colunas de §2.2, por nome de coluna, data em BRT, append atômico).
4. `É médico e não é terapeuta?` (mesma regra: contém "sim", especialidade não contém "terap", sem diferenciar maiúsculas).
5. `Enviar Lead e MQL para a Meta` (HTTP Request, credencial dedicada, hashes SHA-256 no Code com `crypto`).
6. `Registrar envio` (data table: lead, resultado HTTP, `fbtrace_id`).
Falha no CAPI não pode impedir a gravação na planilha: o passo 3 vem antes e o 5 tem tratamento de erro próprio.

**Conversas (Umbler)**: `Gatilho - Umbler chat novo` → `Normalizar conversa` → `Gravar na aba Conversas` (append atômico). Mesma regra de histórico bruto.

### 4.3 Tabelas e credenciais

| Tipo | Nome | Conteúdo / observação |
|---|---|---|
| Table | `Table \| MedNexus \| Geral \| Webhooks recebidos (histórico)` | `origem`, `payload`, `status`, `erro`, `recebido_em`, `processado_em` |
| Table | `Table \| MedNexus \| Geral \| Clientes com assinatura registrada (anti-duplicata)` | `chave` (client.id), `email`, `registrado_em`. **Importar os 154 registros do data store do Make** (inclui chaves antigas por contrato e por hash de e-mail; manter como estão) |
| Table | `Table \| MedNexus \| Geral \| Eventos Meta CAPI enviados (histórico)` | `lead_email_hash`, `eventos`, `http`, `fbtrace_id`, `enviado_em` |
| Cred | `Cred \| MedNexus \| Webhook - cabeçalho de autenticação` | substitui o `x-make-apikey` |
| Cred | `Cred \| MedNexus \| Meta CAPI - dataset 6055994897786240` | **token novo** (rotacionado) |
| Cred | `Cred \| Agencia \| Google SA - automations` (`6deuhYvp4Sfr43Qc`) | reaproveitar; dar Editor na planilha |

---

## 5. Mapa de campos (Make → n8n)

| Origem (payload) | Destino |
|---|---|
| `client.name`, `.email`, `.cellphone` | `Nome`, `Email`, `Telefone` |
| `product.name`, `offer.name` | `Produto`, `Oferta` |
| `product.amount` | `Faturamento` (formato `R$` conforme a coluna) |
| `sale.seller_balance` (Make usa `currentSale.seller_balance`, vazio) | `Receita` (decisão §8) |
| `offer.method` | `Método de Pagamento` |
| `client.uf`, `.city`, `.zipcode` | `UF`, `Cidade`, `Zip Code` (por nome de coluna) |
| `fields.name/email/medico/area.value` | `Nome`, `Email`, `Médico?`, `Especialidade` (aba Leads) |
| `fields.utm_*`, `fbc`, `fbp`, `user_agent`, `client_ip`, `external_id` | colunas G a P da aba Leads e `user_data`/`custom_data` do CAPI |
| `Payload.Content.LastMessage.CreatedAtUTC`, `.Content`, `Contact.Name`, `Contact.PhoneNumber` | `Data`, `Mensagem`, `Nome`, `Telefone` (aba Conversas) |

---

## 6. Fases

**Fase 0: pré-requisitos (antes de construir)**
- Eduardo responde as decisões do §8.
- Dar **Editor** à conta de serviço na planilha (e-mail em `setup-geral.md` §2).
- Eduardo cria a credencial do token novo da Meta e do cabeçalho do webhook pelo formulário seguro.
- Achar o que alimenta `Leads 👥` hoje (achado 2).
- Pedir à Green os status/eventos enviados pela webhook (ou olhar o painel) para fechar o filtro (achado 5).
- Fazer uma **cópia da planilha** (`MEDNEXUS | Planilha Central (TESTE n8n)`) para os testes.

**Fase 1: construir** os três fluxos (despublicados) + tabelas + importar o data store. Ler `docs/clientes/mednexus.md` e `padrao-n8n.md` §9 antes.

**Fase 2: testar na cópia da planilha** com payloads reais copiados das execuções do Make (usar o histórico de execuções do cenário como amostra). Conferir cada coluna, o formato de data/valor, as fórmulas das colunas J a M em `New Subscriptions` e o limite de linhas. Para o CAPI: usar `test_event_code` do Gerenciador de Eventos, sem sujar o dataset real.

**Fase 3: execução em paralelo (sombra)**: Green e formulário continuam no Make; o n8n recebe cópia só do que for possível (a Green aceita mais de uma URL? se não, repetir o payload do Make para o n8n por um módulo HTTP temporário) e grava **na cópia** da planilha. Comparar linha a linha por 3 a 7 dias ou 5 vendas reais, o que vier depois.

**Fase 4: virada** (uma automação por vez, começando por Vendas, a mais simples e a de maior risco financeiro):
1. Apontar o fluxo n8n para a planilha real e publicar.
2. Trocar a URL do webhook na Green (e, depois, no formulário do site e na Umbler) para `https://n8n.srv2164786.hstgr.cloud/webhook/<caminho>`, com o cabeçalho novo.
3. Desligar o cenário correspondente no Make **no mesmo minuto**, para não duplicar linha.
4. Conferir a próxima venda/lead real ponta a ponta (planilha, tabela de controle, execução do n8n).

**Fase 5: melhorias** (só com a paridade confirmada): `event_id` no CAPI, não enviar `"vazio"`, atualizar a Graph API, corrigir Receita e o alinhamento de colunas, se aprovados.

**Fase 6: encerramento**: desligar (não apagar) os cenários no Make por 30 dias, depois arquivar; apagar a conexão e o data store; atualizar `docs/clientes/mednexus.md` (seções 5, 10, 11) e `docs/clientes/README.md`.

### Rollback
Manter o cenário do Make desligado, mas intacto por 30 dias. Para voltar: religar o cenário e restaurar a URL do webhook na Green/site/Umbler. Como o n8n guarda o payload bruto, o que chegou durante a falha pode ser reprocessado.

### Risco principal
Com o fluxo despublicado ou o servidor fora, o webhook responde 404 e o dado se perde (o n8n não enfileira). A Green e o formulário não reenviam sozinhos. Mitigação: monitorar a instância na semana da virada e, para vendas, conferir diariamente a planilha contra o painel da Green.

---

## 7. Sobre a Umbler > Sheets
Não estava no pedido, mas é um cenário ativo na mesma conta do Make. Se ficar de fora, o Make continua rodando só por ele (e a conexão Google do Eduardo continua vinculada). Recomendo migrar junto: é o mais simples (1 webhook → 1 linha).

---

## 8. Decisões pendentes (Eduardo)
1. Funil no nome dos fluxos: `Geral` (proposto) ou outro? Os leads do site (formulário pré-WhatsApp) e as vendas da Green pertencem a qual funil?
2. Migrar também a Umbler > Sheets agora?
3. Receita (coluna H): manter vazia, como está, ou preencher com `sale.seller_balance`?
4. Gravar só vendas com status `paid`?
5. Alinhar UF/Cidade/CEP de `New Subscriptions` ao cabeçalho (corrige a posição) ou replicar a posição atual?
6. Quem alimenta `Leads 👥` hoje, já que o cenário do Make está desligado?
7. Rotacionar o token da Meta e criar a credencial do n8n pelo formulário seguro.
8. Janela da virada (sugestão: dia útil, de manhã, com Eduardo disponível).
