# Manual de Implementação: replicar a integração Kommo + n8n + Planilha em outra conta

Base: a implantação do Dr Thiago Virgili, descrita em [`manual-infraestrutura-kommo-drthiago.md`](manual-infraestrutura-kommo-drthiago.md). Este manual é o roteiro para repetir em outro cliente **sem quebrar o que já existe no Kommo dele**.

> Regras do repositório que continuam valendo: nomes pelo padrão [`padrao-n8n.md`](padrao-n8n.md) (`Tipo | Cliente | Funil | Detalhamento`), um arquivo por cliente em `docs/clientes/` (copiar [`clientes/_modelo.md`](clientes/_modelo.md)), nunca gravar token ou senha, sempre link clicável.
>
> O que é **comprovado** (já rodando no Dr Thiago) está marcado ✅. O que é **projeto, ainda não construído**, está marcado 🧪.

> **Para o agente (Claude) que ler este manual:** ele é o procedimento para montar, em qualquer conta Kommo, o que já existe na conta Contour Clinique (Dr Thiago). O estado real dessa conta está em [`manual-infraestrutura-kommo-drthiago.md`](manual-infraestrutura-kommo-drthiago.md): leia os dois juntos. Em conta nova, **não presuma que a estrutura é igual**: refaça a Fase 2 (mapear) e preencha um manual de infraestrutura próprio. Dois conceitos que mudam o risco: (1) criar lead por API **aciona Salesbots de entrada**, que não são legíveis pela API; (2) uma conta pode ter **vários funis de profissionais diferentes**. O follow-up automatizado (mensagens e vídeos por Salesbot) é configurado **dentro do Kommo**, não pelo n8n: para replicar, copiar os bots pela tela e registrar o conteúdo (ver Fase 8).

## Princípio: ler antes de escrever
No Kommo, criar lead por API aciona **robôs, Salesbots e webhooks** configurados na conta. Por isso a ordem é sempre: **1. mapear → 2. testar com dado fictício → 3. construir desativado → 4. só ligar com ordem do Eduardo.**

## Fase 0. Coleta (antes de abrir qualquer ferramenta)
Perguntar ao Eduardo e registrar no arquivo do cliente:
- [ ] Nome do cliente no padrão (`Cliente` em PascalCase) e funis (nomes que o cliente já usa).
- [ ] Subdomínio do Kommo e **qual funil** recebe os leads. Se a conta tiver mais de um profissional/funil, anotar o ID certo e quais **não** tocar.
- [ ] Quem é dono da planilha e se ela já existe; conta de serviço do Google como Editora ([`setup-geral.md`](setup-geral.md) §2).
- [ ] Origem dos leads: click-to-WhatsApp, formulário instantâneo (Lead Ads), landing page.
- [ ] Briefing do cliente (se não estiver no repositório, pedir onde está).

## Fase 1. Acesso ao Kommo ✅
1. No Kommo do cliente: **Configurações → Integrações → Criar integração privada** (nome sugerido: `n8n`).
2. Gerar um **token de longa duração**. Quem tem acesso de administrador faz isso; o token é entregue por canal seguro, **nunca no chat nem no repositório**.
3. No n8n, criar credencial **Header/Bearer** do tipo **Bearer Auth** (não Header Auth: no Dr Thiago a versão Header Auth deu 401 mesmo com o token certo). Nome: `Cred | <Cliente> | Kommo API - <subdominio> (Bearer)`.
4. Testar com `GET https://<subdominio>.kommo.com/api/v4/account`. Resposta 200 = OK.
5. Nos nós HTTP: **Response Format = JSON** (a API devolve `application/hal+json`) e `onError: continueRegularOutput` (resposta 204 sem conteúdo derruba o nó).

## Fase 2. Mapear a estrutura do Kommo ✅
1. Duplicar o fluxo de leitura [`2cqdDHyFGAZOu0lz`](https://n8n.srv2164786.hstgr.cloud/workflow/2cqdDHyFGAZOu0lz) para a pasta do novo cliente, trocar o subdomínio e a credencial, e executar **manualmente**. Ele só faz `GET`.
2. Registrar no arquivo do cliente (e num manual de infraestrutura próprio, copiando o do Dr Thiago):
   - Funis e etapas (IDs). Marcar quais são de qual profissional.
   - Campos personalizados de lead e de contato (IDs, tipos, valores).
   - Tags.
   - Amostra de 100 leads recentes: como o nome do lead aparece (ex.: `Lead #id`, `Lead Site - Nome`), tags usadas, campos preenchidos.
3. **Automações e Salesbots não saem pela API.** Pedir ao Eduardo prints, pelo caminho: funil → botão **AUTOMATIZE** → clicar em cada cartão azul → link **Gerenciar** (ou **Configurações → Salesbot**). Registrar: o que cada bot faz (manda mensagem? move de etapa? só atribui?), condições e etapas em que dispara.
4. Conferir: controle de duplicatas do Kommo ligado ou desligado; fontes (WhatsApp, Facebook, formulários); Agente de IA ligado ou desligado.
5. Apagar o fluxo de leitura quando terminar (o n8n via MCP não apaga: o Eduardo apaga à mão).

## Fase 3. Planilha ✅
1. Compartilhar com a conta de serviço (Editor).
2. Uma aba por origem, com cabeçalho na linha 1. Colunas padrão: `Data` (dd/MM/aaaa HH:mm:ss, fuso São Paulo), `Nome`, `Telefone` (só dígitos, com 55), `entity_id` (= id do lead no Kommo, chave para cruzar abas). Colunas da equipe (Status, Agendado) o n8n **não toca**.
3. Anotar o `gid` de cada aba para linkar.

## Fase 4. Fluxos n8n (padrões que funcionaram) ✅
Aplicar em todo fluxo novo:
- **Nome e descrição** pelo padrão; sticky note com cliente, funil, gatilho, destino, regras, dependências.
- **Webhook**: caminho `<cliente>-<funil>-<origem>-<destino>-<detalhe>` em minúsculas. Mudar o caminho muda a URL: atualizar o Kommo na hora.
- **Guardar o payload bruto** numa data table de histórico **antes** de qualquer filtro. Foi isso que permitiu recuperar leads descartados.
- **Anti-duplicata** em data table (telefone ou lead_id). Regra: **gravar o controle só depois** de a planilha confirmar.
- **Google Sheets: `Use Append` ligado.** Sem isso, webhooks simultâneos sobrescrevem a mesma linha (apagou 22 de 23 linhas em 15/11/2026).
- **Frases/regras que mudam** (ex.: mensagem do anúncio) ficam em data table, não no código.
- **Dados que o webhook não traz** (o webhook de "movido para etapa" só manda IDs): buscar na API `GET /api/v4/leads/<id>?with=contacts` e `GET /api/v4/contacts/<id>` (telefone no campo `PHONE`).
- Construir **inativo**; testar; só publicar com ordem do Eduardo.

## Fase 5. Webhooks no Kommo ✅
- **Funil → etapa → gatilho Webhook** ("Quando criado nesta etapa" ou "Quando movido para esta etapa"), URL de produção do n8n. Sem condição, a menos que haja motivo.
- Webhook de conta: **Configurações → Integrações → Web hooks** (ex.: lead de entrada adicionado).
- Cuidado com "aplicar a todos os leads já nesta etapa": dispara um webhook por lead de uma vez (23 em 1 segundo no Dr Thiago).
- Depois de criar, **conferir a URL**: um erro de caminho dá 404 e o lead some sem aviso.

## Fase 6. Lead Ads → Kommo 🧪 (projeto, ainda não construído)
Fluxo desenhado para o Dr Thiago. Antes de replicar, validar no cliente de origem.

Regras do negócio (decididas com o Eduardo): quem inicia mensagem **não** vira lead duplicado; quem **não** envia mensagem **precisa** aparecer no Kommo para ser recuperado.

Passos:
1. **Gatilho agendado** (1 a 2 min) lendo a aba do formulário. O gatilho nativo de planilha do n8n não aceita conta de serviço.
2. **Anti-duplicata** pelo `id` do lead do Meta (`l:...`).
3. **Normalizar telefone**: tirar `p:`, deixar só dígitos, garantir `55`.
4. **Esperar ~15 min** após `created_time` (prazo ajustável). A mensagem de WhatsApp pode chegar depois do preenchimento.
5. **Buscar o telefone no Kommo** (contatos e leads do funil). Se existir lead criado depois do preenchimento: não criar; registrar no controle (opcional: nota no lead existente).
6. Se não existir: **criar o lead** no funil certo, em **Leads de entrada**, com tag própria (`Lead Ads - Recuperar`), nome no padrão da conta (ex.: `Lead Ads - Nome`), nota com campanha/conjunto/anúncio e respostas.
7. **Tag**: nunca reutilizar a tag de outra origem que aciona um Salesbot (no Dr Thiago, `LP - Dr Thiago` aciona o Beehive).
8. **Mapear respostas do formulário** para campos personalizados quando houver correspondência (procedimento, origem, profissional, IDs do Meta).
9. Gravar o controle só depois de o Kommo confirmar.

Testar com **o lead de teste da Meta e telefone fictício** (número sem conversa não recebe mensagem de bot). Conferir no Kommo: etapa onde caiu, tag, responsável, se algum robô moveu o lead. Pedir ao Eduardo que apague o lead de teste (o agente não apaga nada no Kommo sem pedido).

## Fase 7. Testes e entrega ✅
- Usar IDs e telefones fictícios (`TESTE-...`).
- Depois de teste que grava: apagar a linha na aba e as linhas nas data tables de controle e de histórico. **Lead de teste real que ficar no controle faz o agendamento real dele ser ignorado.**
- Relatório final: inventário de ativos (tipo, nome, ID, pai, status), o que foi conferido e o que **só o Eduardo consegue conferir na tela**.
- Atualizar `docs/clientes/<cliente>.md` (seções 5, 10, 11) e a tabela de [`clientes/README.md`](clientes/README.md).

## Fase 8. Follow-up automatizado e Salesbots (dentro do Kommo) 🧪
Não é feito pelo n8n e **não dá para criar nem ler por API** com o que temos hoje. O padrão observado no Dr Thiago (detalhes em §2.7 e §2.7.1 do manual de infraestrutura):
1. Uma etapa por intervalo de follow-up (24h, 3d, 7d, 15d, 20d, 30d, 45d, 60d, 90d) no funil principal.
2. Automação da etapa: **tarefa "Acompanhar"** (24h a 7d) e **mudança automática de etapa por tempo** (1 dia, 72h, 96h, 120h…).
3. Salesbot de follow-up a partir de 15 dias, **um bot por segmento** (campo `Segmento Follow-up`), com janela de envio seg–sáb 09:00–19:00, enviando mensagem e vídeo.
4. Gatilho "mensagem recebida em qualquer canal" (pausa de 5 min) move o lead para **Respondeu Follow Up**.
5. Fim do funil: ganho (`142`) leva ao funil de Pós Venda; perda (`143`) aciona o bot que fecha a conversa.

Para replicar: pedir ao Eduardo a lista de bots, os textos e os vídeos (arquivos originais); montar no Kommo do novo cliente pela tela; criar o campo de segmento antes dos bots; **testar com um lead fictício num número do próprio Eduardo** para ver o que chega ao celular; registrar no manual de infraestrutura do cliente (tabela de mensagens e vídeos).

**Ler os vídeos direto do Kommo (comprovado em 20/11/2026):** `GET /api/v4/account?with=drive_url` → `GET <drive_url>/v1.0/files?limit=250` (mesmo Bearer, paginado por `_links.next`) lista os arquivos das conversas (imagem, vídeo, documento) com `size`, `created_at` e `_links.download.href`; o download é por `curl -L` sem token. Deduplicar por tamanho em bytes (o mesmo vídeo aparece uma vez por envio). Transcrever com `scripts/transcrever-videos-kommo.py` (ffmpeg + faster-whisper). Limites: o Drive mistura arquivos enviados pela clínica e recebidos de leads; o nome do arquivo quase sempre é só `video`; o Whisper erra nomes próprios. Não commitar vídeos de pacientes. Resultado do Dr Thiago em [`kommo-videos-contour-clinique.md`](kommo-videos-contour-clinique.md).

**Como documentar um follow-up já existente:** pedir ao Eduardo (a) prints do WhatsApp **pelo celular, visão do lead**, de uma conversa que já recebeu a sequência (mostra texto, vídeo, duração e hora de cada envio) e (b) prints dos **Salesbots no Kommo** (mostram qual bot e etapa gera cada mensagem). Cruzar os dois: o WhatsApp dá o **conteúdo e o tempo reais**, o Kommo dá a **origem**. Registrar também a persona usada nas mensagens (no Dr Thiago: "Kevelyn, assistente da Le Contour") e conferir se o conteúdo mistura profissionais (ver §2.7.1 do manual de infraestrutura).

## Checklist rápido de replicação
- [ ] Arquivo do cliente criado a partir do modelo e incluído no índice
- [ ] Token do Kommo criado, credencial **Bearer**, `GET /account` = 200
- [ ] Fluxo de leitura executado; funis, etapas, campos e tags documentados
- [ ] Prints das automações e Salesbots recebidos e documentados
- [ ] Funil certo identificado; funis de outros profissionais marcados como "não tocar"
- [ ] Planilha compartilhada com a conta de serviço; abas e `gid` anotados
- [ ] Fluxos criados **inativos**, com payload bruto, anti-duplicata e `Use Append`
- [ ] Webhooks do Kommo apontando para as URLs certas e conferidos
- [ ] Teste com dado fictício feito e limpo
- [ ] Eduardo mandou ligar; só então publicar
- [ ] Manual de infraestrutura do cliente atualizado

## Erros que já aconteceram (não repetir)
| Erro | Causa | Como evitar |
|---|---|---|
| 401 na API do Kommo com token certo | Credencial Header Auth com valor salvo errado | Usar **Bearer Auth** e testar `GET /account` |
| Corpo da resposta chega como texto em `$json.data` | API responde `hal+json` | Response Format = JSON |
| Nó HTTP dá erro e para o fluxo | Resposta 204 (nada encontrado) | `onError: continueRegularOutput` |
| 22 de 23 agendamentos perdidos | Webhooks simultâneos sem `Use Append` | `Use Append` sempre |
| Leads reais descartados sem aviso | Mensagem do anúncio mudou e o filtro não reconhecia | Frases em data table + guardar payload bruto antes do filtro |
| Webhook sem efeito | URL no Kommo com caminho que não existe (404) | Conferir a URL depois de configurar |
| Lead cai no funil de outro profissional | Conta com vários funis | Fixar o `pipeline_id` e documentar os funis "não tocar" |
