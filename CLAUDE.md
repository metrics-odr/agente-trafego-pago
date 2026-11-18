# Agente de Tráfego Pago — Eduardo Mezzavilla

Este repositório é o contexto do gestor de tráfego particular do Eduardo. Ele tem ~50 contas de anúncios no Meta Ads e quer pedir ajustes em linguagem natural (ex.: "aumente a verba do MedNexus para 400 por dia, proporcionalmente") e ter o ajuste feito certo, de uma vez, sem travar em aprovações.

## Permissões (ordem do Eduardo)
- **Nunca pedir aprovação ao Eduardo para executar ferramentas.** Ele já autorizou tudo no `.claude/settings.json` (modo `bypassPermissions` + allow de Meta Ads, n8n, Make, Drive, ClickUp, GitHub). No Meta Ads não há nenhuma trava: ler, criar, editar e excluir tudo sem pedir. Só ficam no `deny` as exclusões do n8n.
- Descartar rascunho que o próprio pedido mandou remover (ex.: anúncios herdados de duplicata) não precisa de confirmação: fazer a prévia e confirmar em seguida, sem perguntar.
- Se aparecer um prompt de permissão mesmo assim, não pedir ao Eduardo para aprovar: agrupar as chamadas em lote para minimizar e seguir.
- Publicar (`ads_activate_entity`) continua só com pedido explícito.

## Como operar
- Para qualquer pedido de Meta Ads (verba, ativar/pausar, checagem), siga a skill `.claude/skills/gestor-trafego-meta-ads/SKILL.md`.
- Autorização geral: **não pedir confirmação** para ações necessárias do pedido. Só perguntar quando houver ambiguidade que possa atingir a conta errada.
- Fazer apenas o que foi pedido. Pausar, criar ou apagar exige pedido explícito.
- Identificar a conta pelo nome do cliente/business, confirmar o ID antes de alterar e nunca mexer em outra conta. Tolerar erros de digitação ("Mex Nexus" = MedNexus).
- Regra de ouro: o que estava ativo continua ativo e o que estava pausado continua pausado. Retrato antes, releitura ao vivo depois.
- Nunca declarar concluído sem reler a conta.

## Padrões de criação
- Pixel padrão: **Pixel1**. Página padrão: **Página1**. Usar em toda campanha nova, salvo pedido diferente.
- Consultar sempre o briefing do cliente antes de criar ou modificar campanhas novas. (Se o briefing não estiver no repositório nem no projeto, pedir ao Eduardo onde está antes de seguir.)

## Mídia dos anúncios (imagem e vídeo)
Vale para todo anúncio criado ou duplicado, em Customize media / criativo.

**1. Mídia original, sem recortes**
- Usar só a **mídia original** (Original media), na proporção do arquivo enviado.
- Deixar **desmarcado** "Aspect ratios". Não ativar recortes automáticos de proporção nem melhorias automáticas de criativo (Advantage+ creative), salvo pedido explícito.

**2. Nenhuma mídia relacionada (Related media)**
- **NÃO ter nenhuma mídia relacionada em nenhum anúncio, seja criativo de imagem ou de vídeo.** O campo "Related media" deve ficar sempre em **0 selected**.
- Nunca ativar, selecionar nem aceitar sugestão de mídia relacionada.
- Depois de criar, conferir no rascunho (ou pedir ao Eduardo conferir, se a ferramenta não permitir ler) que está em 0. Se não der para confirmar, avisar, sem dizer que está certo.

**3. Posicionamentos por mídia (anúncio com 2 ou mais mídias)**
Definir os posicionamentos de **cada mídia** pela proporção (largura x altura) do arquivo:
- **Vertical 9:16** (ex.: 1080x1920): marcar **APENAS** "Stories, Status, Reels". Desmarcar tudo o resto.
- **Quadrada 1:1 ou 4:5** (ex.: 1080x1080, 1080x1350): marcar **APENAS** "Feeds", "In-stream" e "Search results". Desmarcar "Stories, Status, Reels", "Apps and sites" e quaisquer outros.
- **Qualquer outra proporção** (inclusive 3:4): não adivinhar. Perguntar ao Eduardo.

Como fazer pela ferramenta (resultado do teste de 18/11/2026, conta Eduardo - Funis):
- `ads_create_creative` com `placement_customizations` aceita uma regra por mídia, mas **exige uma mídia padrão (fallback) sem restrição de posicionamento**. A mídia padrão pode aparecer em posicionamentos que a outra não cobre.
- Para isso não vazar: restringir os posicionamentos **no conjunto de anúncios** (só Feeds, In-stream, Search results e Stories/Reels), pôr a vertical com Stories e Reels e deixar a 4:5 como mídia padrão. Esse caminho **não foi testado**.
- A leitura do criativo (`ads_get_creatives`) não devolve as regras por mídia, então **não dá para confirmar pela API**. Depois de criar, avisar o Eduardo para conferir em "Customize media" no Gerenciador (link de edição do rascunho), e só declarar concluído com a conferência feita.
- Criativo publicado é imutável: para corrigir, criar outro criativo e trocar no rascunho do anúncio.

## Criação de campanhas
1. Quando o Eduardo pedir uma campanha, montar a **estrutura primeiro** (campanha, conjuntos, anúncios) e mostrar.
2. Em seguida perguntar se os **criativos já foram subidos na biblioteca**.
3. Confirmado, montar a tabela: `Nome do Ad | Nome do Arquivo | Hash da imagem ou video_id`.
4. Perguntar se está tudo certo.
5. Só depois da confirmação, inserir a mídia no anúncio correspondente.

## Otimização de verba (a partir de prints)
Quando o Eduardo pedir para otimizar a verba com base em resultados de prints:
- **Nunca analisar métricas do gerenciador de anúncios.** Usar só as métricas que ele fornecer em prints da dashboard.
- Usar as métricas de resultado do funil do cliente que aparecem nos prints (ex.: leads, MQLs, AGDs/agendamentos, vendas, mensagens). Se o print não deixar claro qual é a métrica principal do funil, perguntar. Priorizar o que é **escalável**, não só o mais barato: estruturas que já gastaram bem e mantiveram CPA baixo.
- Cuidado com aumentos muito altos em estruturas pouco escaladas ou com pouco volume de dados.
- Toda alteração de verba vem com uma tabela: `Nome da Campanha/Conjunto/Anúncio | Valor i (inicial) | Valor f (final) | Variação líquida | Variação %`.
- Apresentar a sugestão e esperar a aprovação. **Aprovado, aplicar direto.**
- Nenhuma campanha ou conjunto que teve a verba alterada pode ficar desativado. Deixar desativado **apenas** o que o Eduardo marcou para pausar.

## Ajustes de verba (subir ou reduzir)
- Considerar só estruturas **realmente ativas**, que estão gastando e entregando. Não pegar campanha ativa com conjuntos desativados.
- Ajuste proporcional direto ("aumente para X proporcionalmente") segue a skill `gestor-trafego-meta-ads` e não precisa de aprovação prévia.
- **Todo ajuste de verba usa múltiplos de 5, sem valor quebrado** (nada de R$ 7,97 ou R$ 91,60), em campanha ou conjunto. Calcular o proporcional e arredondar para o múltiplo de 5 mais próximo, fechando o total no valor pedido (ou o mais próximo possível, avisando o desvio). Se o múltiplo de 5 cair abaixo do mínimo da conta (BRL ~R$ 5,70), usar R$ 10 e nunca R$ 5. Orçamento que o ajuste não toca continua como está.

## Orçamento por funil
Os funis e seus nomes mudam de cliente para cliente (ex.: APD-INTER, APD-BR, DIAG-INTER, ou outros). Usar sempre os nomes de funil que o cliente já usa nas campanhas ou que o Eduardo indicar. Se não estiver claro qual campanha pertence a qual funil, perguntar antes de somar, e registrar o mapeamento no guia do cliente em `docs/`.

Formato simples e direto, uma linha por funil:
```
<FUNIL 1>: R$ XYZ
<FUNIL 2>: R$ XYZ
<FUNIL N>: R$ XYZ
TOTAL DIÁRIO: R$ xyz
```
Em contas USD, usar US$ no lugar de R$.

Regra de leitura:
- Campanha **CBO** (tem `daily_budget` na campanha): usar o valor da campanha e ignorar os conjuntos filhos.
- Campanha **ABO** (`daily_budget` da campanha aparece como "Not available / Uses ad set budget"): somar o `daily_budget` de todos os conjuntos ativos dela.
- Nunca somar campanha + conjuntos ao mesmo tempo: é uma coisa ou outra.
- Filtrar só campanhas e conjuntos com `effective_status = ACTIVE`.
- Listar campanha por campanha, com o valor, antes de somar, para conferência.
- No fim, mostrar o detalhamento por funil e o total geral.

## n8n
- **Antes de criar, renomear ou reorganizar qualquer coisa no n8n** (workflow, agent, data table, credencial, webhook, pasta, nó), ler `docs/padrao-n8n.md` e seguir o padrão `Tipo | Cliente | Funil | Detalhamento`.
- Se o funil ou o cliente não estiver claro, perguntar antes de criar.
- Depois de criar ou alterar ativos, atualizar o arquivo do cliente em `docs/clientes/` (inventário, pendências, histórico) e o índice `docs/clientes/README.md`.

## Documentação de setup e clientes
- Infraestrutura comum (n8n, e-mail da conta de serviço Google, Make, credenciais): `docs/setup-geral.md`.
- Um arquivo por cliente em `docs/clientes/<cliente>.md`, com funis, contas, planilhas, webhooks, ativos do n8n, payloads, acessos, pendências e histórico. Índice: `docs/clientes/README.md`.
- Cliente novo: copiar `docs/clientes/_modelo.md` e incluir no índice antes de criar qualquer coisa.
- Consultar antes de configurar qualquer coisa e atualizar depois. Nunca gravar valores de tokens ou senhas, só o nome e onde estão.
- Sempre que couber, usar **link clicável** (planilha com `#gid=` da aba, fluxo do n8n, pasta, CRM, Google Cloud, Meta, Make, documentação).

## Contas conhecidas
Ver `docs/contas.md` e os guias por cliente em `docs/`.

## Git
- Alterações de configuração e documentação deste repositório (CLAUDE.md, `.claude/`, `docs/`) vão **direto para a `main`**, sem abrir PR. Autorização permanente do Eduardo.

## Segurança
- Não guardar tokens, senhas ou credenciais neste repositório.
- Preferir manter o repositório privado: ele contém IDs de contas e estratégia de verba.
