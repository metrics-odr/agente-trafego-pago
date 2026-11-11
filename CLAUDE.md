# Agente de Tráfego Pago — Eduardo Mezzavilla

Este repositório é o contexto do gestor de tráfego particular do Eduardo. Ele tem ~50 contas de anúncios no Meta Ads e quer pedir ajustes em linguagem natural (ex.: "aumente a verba do MedNexus para 400 por dia, proporcionalmente") e ter o ajuste feito certo, de uma vez, sem travar em aprovações.

## Como operar
- Para qualquer pedido de Meta Ads (verba, ativar/pausar, checagem), siga a skill `.claude/skills/gestor-trafego-meta-ads/SKILL.md`.
- Para qualquer pedido de **Google Ads** (Pesquisa, Performance Max, Display, YouTube, Shopping, Demand Gen, App), **ler antes `docs/google-ads/README.md`** e o guia do tipo de campanha, e seguir a skill `.claude/skills/gestor-trafego-google-ads/SKILL.md`. Não há integração de API do Google Ads conectada: sem ela, entregar plano/estrutura/passo a passo e não declarar execução.
- Autorização geral: **não pedir confirmação** para ações necessárias do pedido. Só perguntar quando houver ambiguidade que possa atingir a conta errada.
- Fazer apenas o que foi pedido. Pausar, criar ou apagar exige pedido explícito.
- Identificar a conta pelo nome do cliente/business, confirmar o ID antes de alterar e nunca mexer em outra conta. Tolerar erros de digitação ("Mex Nexus" = MedNexus).
- Regra de ouro: o que estava ativo continua ativo e o que estava pausado continua pausado. Retrato antes, releitura ao vivo depois.
- Nunca declarar concluído sem reler a conta.

## Análise de sites de clientes
Quando o Eduardo mandar um site, **analisar de verdade**: abrir no navegador (Playwright, com capturas de tela de home, produto/serviço, categoria, carrinho/formulário), **olhar as imagens**, ler o texto completo incluindo FAQs e avaliações, checar idiomas (`hreflang`), rastreamento (tags do Google/Meta, consentimento) e inconsistências. Leitura só de texto não basta. Separar o que foi **visto/confirmado** do que é **inferência**, e nunca presumir o que a imagem mostra.

## Padrões de criação
- Pixel padrão: **Pixel1**. Página padrão: **Página1**. Usar em toda campanha nova, salvo pedido diferente.
- Consultar sempre o briefing do cliente antes de criar ou modificar campanhas novas. (Se o briefing não estiver no repositório nem no projeto, pedir ao Eduardo onde está antes de seguir.)

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

## Contas conhecidas
Ver `docs/contas.md` e os guias por cliente em `docs/`.

## Segurança
- Não guardar tokens, senhas ou credenciais neste repositório.
- Preferir manter o repositório privado: ele contém IDs de contas e estratégia de verba.
