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

## REGRA-MESTRA: subir anúncios duplicando campanha
Sempre que o Eduardo pedir para duplicar qualquer campanha e subir anúncios, em qualquer conta, dia ou sessão:

1. **Ler por inteiro, antes de agir,** as seções "Mídia dos anúncios" e "Duplicar campanha e subir novos anúncios" deste arquivo. Não resumir de memória e não pular nenhum item.
2. **Aplicar todos os itens.** Montar uma checklist com cada item (descrição, URL de destino, parâmetros de URL, CTA, formulário nativo, página, Instagram, pixel, objetivo, orçamento, público, posicionamentos, mídia, Related media, rascunho/pausado) e marcar um a um com o valor do original e o valor da duplicata.
3. **Qualquer diferença entre o original e a duplicata, ou qualquer item que não puder ser lido, copiado ou confirmado, deve ser avisada ao Eduardo ANTES de concluir.** Dizer qual item, o que há no original e o que há na duplicata. Não corrigir em silêncio e não declarar "pronto".
4. **Nunca concluir com item pendente.** Só dizer que terminou quando a checklist estiver completa, com a releitura ao vivo e a tabela comparativa sem diferenças, ou com todas as diferenças já avisadas.
5. Se uma instrução deste arquivo conflitar com o pedido do momento ou com o que a ferramenta consegue fazer, avisar e perguntar, sem escolher sozinho.

## Mídia dos anúncios (imagem e vídeo)
Vale para todo anúncio criado ou duplicado.

**1. Mídia original, sem recortes**
- Usar só a mídia original, na proporção do arquivo. "Aspect ratios" desmarcado. Sem recortes automáticos nem melhorias automáticas de criativo (Advantage+ creative), salvo pedido do Eduardo.

**2. Mídia relacionada (Related media)**
- Nenhum anúncio pode ter mídia relacionada, seja imagem ou vídeo. O campo deve ficar em 0 selecionadas.
- **Não há ferramenta que leia ou controle esse campo.** Nunca dizer que está em 0 sem o Eduardo ter conferido na tela. Sempre pedir a conferência.

**3. Posicionamentos por proporção**
- Vertical 9:16 (ex.: 1080x1920): só Stories e Reels (Facebook e Instagram).
- 4:5 ou 1:1 (ex.: 1080x1350): só Feed e In-stream. **Não incluir "Search results" do Instagram**: na tela ele aparece como posicionamento vertical do grupo de Stories e a imagem de feed fica errada ali. O Search do Facebook ainda não foi confirmado: só incluir se o Eduardo confirmar.
- Qualquer outra proporção (inclusive 3:4): não adivinhar, perguntar ao Eduardo.

**4. Anúncio com 2 ou mais mídias: como criar (testado em 18/11/2026)**
- **Usar** `ads_create_ad` com o criativo inline (`asset_feed_spec`), com `optimization_type: "PLACEMENT"`, cada imagem com um `adlabels` e uma regra em `asset_customization_rules` para cada mídia (`image_label` + `customization_spec` com plataformas e posições). **Todas as mídias com regra explícita, sem mídia padrão sem restrição.** Incluir `instagram_user_id` no `object_story_spec`.
- **Não usar** `ads_create_creative` com `placement_customizations` nem `multi_media`: o primeiro exige uma mídia padrão que vaza para outros posicionamentos, e no teste o anúncio ficou sem mídia na tela, sem Instagram e com o erro #1815589 (descrição no botão, obsoleta). O `multi_media` deixa o Meta escolher a mídia e não permite regra por posicionamento.
- **Conjunto de anúncios:** os posicionamentos do conjunto devem ser exatamente a soma das regras das mídias. Se faltar ou sobrar, o Meta usa a mídia no lugar errado.
- Anúncio de mídia única: pode usar `ads_create_creative` simples (`image_hash`) com `instagram_user_id`, sem `description`.
- Criativo publicado é imutável. Para corrigir, usar `ads_update_entity` no rascunho do anúncio com o criativo inline completo.

**5. Conferência obrigatória antes de dizer "pronto"**
Ler de volta com `ads_get_ad_entities` (`object_state=draft`) e confirmar, anúncio por anúncio:
1. `validation_status` = VALIDATED e `active_errors` vazio, sem nenhum outro erro além dos conhecidos da conta (ver item 7).
2. Cada `image_hash` / `video_id` enviado aparece no anúncio.
3. `instagram_user_id` presente.
4. Cada mídia só em seus posicionamentos (as regras do rascunho batem com a tabela do item 3) e nenhuma posição repetida entre mídias.
5. `adapt_to_placement` e melhorias automáticas em OPT_OUT.
A leitura da API **não prova** o que a tela mostra. Depois de criar, mandar ao Eduardo o link de edição do rascunho e pedir: as mídias aparecem, o Instagram está selecionado, cada mídia está no grupo certo e "Related media" está em 0. Só declarar concluído depois disso.

**6. Rascunhos**
- Não deixar rascunho vazio, sem mídia ou com erro. Se um teste ou tentativa der errado, apagar os rascunhos e os criativos criados por ele ao final e avisar o que foi removido.

**7. Bloqueios conhecidos**
- "Advertiser is missing" (anunciante verificado) bloqueia a publicação em rascunhos criados pela ferramenta na conta de teste. Avisar o Eduardo.
- Publicar (`ads_activate_entity`) só com pedido explícito. Rascunho criado pela ferramenta entra como ACTIVE ao publicar.

## Duplicar campanha e subir novos anúncios
Quando o Eduardo pedir para duplicar uma campanha e subir anúncios novos, a duplicata e os anúncios novos mantêm **EXATAMENTE** o que o original tem. A **única coisa que muda é a mídia** do anúncio (imagem ou vídeo), além do nome, se o Eduardo pedir.

**Deve ser idêntico ao original**
- Texto principal (primary text), título (headline) e **descrição**.
- **URL de destino**, incluindo parâmetros de URL (`url_tags`, UTMs) e link de exibição (`display_link`).
- **Botão de CTA** (`call_to_action_type`).
- **Lead ads com formulário nativo:** o **mesmo formulário** (`lead_gen_form_id`), conforme a subseção abaixo.
- Página e perfil do Instagram, pixel e evento de conversão, objetivo, otimização, orçamento, público, posicionamentos, programação e lance, nos três níveis (campanha, conjunto e anúncio).

**Passo a passo**
1. **Varredura do original antes de criar.** Ler campanha, conjuntos e anúncios (`ads_get_ad_entities`) e o criativo de cada anúncio (`ads_get_creatives`, incluindo `object_story_spec`, `asset_feed_spec` e `url_tags`). Anotar tudo.
2. **Montar a duplicata** a partir dessa varredura. Preferir `ads_duplicate_entity` quando ele preservar a configuração. Se for preciso criar um criativo novo só para trocar a mídia, copiar do original cada campo da lista acima, campo por campo, sem preencher nada por conta própria (o Meta pode preencher a descrição sozinho com o texto do site, e `url_tags` não pode ser adicionado depois).
3. **Comparar e mostrar.** Montar uma tabela `Campo | Original | Duplicata` (campanha, conjunto e anúncio) e conferir que tudo é igual, menos a mídia. Qualquer diferença: corrigir antes de seguir.
4. **Mídia nova:** seguir as regras da seção "Mídia dos anúncios".
5. Tudo como rascunho/pausado. Publicar só com pedido explícito.
6. Só declarar concluído depois da releitura ao vivo e da tabela comparativa sem diferenças. Se algum campo não puder ser lido ou copiado pela ferramenta, avisar qual, sem dizer que está igual.

**Lead ads com formulário nativo (instant form)**
- Identificar na varredura do original: conjunto com destino "no anúncio" (`destination_type = ON_AD`, objetivo de leads) e, no criativo, o formulário em `lead_gen_form_id` (dentro do botão de CTA no `object_story_spec`, lido com `ads_get_creatives`).
- A duplicata e **todos os anúncios novos** devem usar **exatamente o mesmo formulário** (mesmo ID), com o mesmo CTA, e o conjunto deve manter o mesmo destino "no anúncio".
- Ao criar o criativo novo, passar `lead_gen_form_id` com o ID copiado do original e o mesmo `call_to_action_type`. **Nunca** escolher outro formulário nem trocar por link de site para "dar certo".
- A tabela de comparação deve ter uma linha própria: `Formulário (ID) | Original | Duplicata`.
- Se a ferramenta recusar o `lead_gen_form_id` (o suporte depende do app e pode estar desligado), **parar e avisar o Eduardo**, sem criar o anúncio com outro destino. Dizer qual foi o erro.

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
