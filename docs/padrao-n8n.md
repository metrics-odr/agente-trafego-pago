# Padrão de nomes e organização do n8n

> **Leitura obrigatória.** Consultar este documento **sempre** antes de criar, renomear ou reorganizar qualquer coisa no n8n (workflow, agent, data table, credencial, webhook, pasta, nó). Se algo não estiver coberto aqui, perguntar ao Eduardo e registrar a decisão neste arquivo antes de seguir.

Instância: [https://n8n.srv2164786.hstgr.cloud](https://n8n.srv2164786.hstgr.cloud) (self-hosted na Hostinger, projeto pessoal do Eduardo, sem projetos de equipe).

---

## 1. Regra geral

Todo ativo segue a estrutura:

```
Tipo | Cliente | Funil | Detalhamento
```

- Separador: **espaço + barra vertical + espaço** (` | `). Nunca usar `-`, `/` ou `_` no lugar do separador.
- Os quatro campos aparecem **sempre na mesma ordem**.
- Quem olha só o nome precisa entender **o que é, de quem é, de qual funil e o que faz**.

### 1.1 Campo `Tipo`
| Tipo | Usar para |
|---|---|
| `Flow` | Workflow (automação) |
| `Agent` | Agente de IA do n8n (aba Agents) |
| `Table` | Data table (banco de dados interno do n8n) |
| `Cred` | Credencial |

Pastas e caminhos de webhook têm regra própria (seções 6 e 7).

### 1.2 Campo `Cliente`
- PascalCase, **sem espaço, sem acento, sem "Dr." separado**: `DrThiago`, `MedNexus`, `LarissaTopper`, `ThaisJunqueira`, `DaviBraga`, `MayaMassafera`.
- O mesmo cliente tem **exatamente o mesmo nome em todos os ativos** (workflow, table, pasta, webhook). Nunca `Dr Thiago` em um e `DrThiago` em outro.
- Ativo que serve a vários clientes (da operação do Eduardo): `Agencia`.
- Cliente novo: criar `clientes/<cliente>.md` a partir de `clientes/_modelo.md` e incluir no índice antes de criar o primeiro ativo.

### 1.3 Campo `Funil`
- Usar o nome de funil que o cliente **já usa nas campanhas** ou que o Eduardo indicar (ex.: `APD-BR`, `APD-INTER`, `DIAG-INTER`). Mesma regra do CLAUDE.md para orçamento por funil.
- Escrever exatamente como aparece nas campanhas (maiúsculas, hífens).
- Ativo que atende a todos os funis do cliente: `Geral`.
- **Se não estiver claro a qual funil o ativo pertence, perguntar antes de criar.** Registrar o funil no arquivo do cliente em `clientes/`.

### 1.4 Campo `Detalhamento`
- Português, com acentos permitidos, primeira letra maiúscula.
- Workflows: `Origem > Destino - Ação` (ver seção 2).
- Demais tipos: regras próprias nas seções abaixo.

---

## 2. Workflows (`Flow`)

### 2.1 Nome
```
Flow | <Cliente> | <Funil> | <Origem> > <Destino> - <Ação em poucas palavras>
```
- `Origem`: de onde vem o dado/gatilho (`Kommo`, `Meta Ads`, `Typeform`, `Webhook LP`, `Agenda`…). Nome do sistema, não do nó.
- `Destino`: onde o resultado é gravado ou enviado (`Sheets`, `Kommo`, `WhatsApp`, `Meta CAPI`, `Slack`…).
- Mais de um destino: `Sheets + Kommo`.
- `Ação`: verbo no presente + objeto, curto (`Registra conversas iniciadas`, `Envia lead para CRM`, `Atualiza verba diária`).
- Fluxo agendado sem origem externa: usar `Agendado` como origem (`Agendado > Sheets - Atualiza relatório diário`).
- Limite do n8n: 128 caracteres.

Exemplos:
```
Flow | DrThiago | APD-BR | Kommo > Sheets - Registra conversas iniciadas do Instagram
Flow | MedNexus | Geral | Webhook LP > Kommo - Cria lead do formulário
Flow | Agencia | Geral | Agendado > Sheets - Exporta gasto diário das contas
```

### 2.2 Descrição (campo "Description" do workflow)
Obrigatória em todo workflow. Limite do n8n: **255 caracteres**. Modelo fixo, nesta ordem:

```
Faz: <o que faz, uma frase>. Gatilho: <evento que dispara>. Grava em: <destino exato>. Regra: <filtro/dedup principal>.
```

- `Grava em` cita o destino exato (planilha + aba, pipeline do CRM, tabela).
- `Regra` cita o filtro ou a regra anti-duplicata. Se não houver, escrever `Regra: nenhuma`.
- Sem emojis.

Exemplo:
```
Faz: registra cada conversa nova vinda do Instagram. Gatilho: webhook do Kommo (lead não triado). Grava em: Planilha Central, aba Conversas Iniciadas. Regra: só a frase pronta do anúncio; 1 linha por telefone.
```

### 2.3 Nota adesiva (sticky note) dentro do workflow
Todo workflow tem uma sticky note no topo do canvas com:
```
## <Detalhamento do nome>
- Cliente / Funil: <Cliente> / <Funil>
- Gatilho: <origem + URL do webhook, se houver>
- Destino: <destino exato>
- Regras: <filtros, anti-duplicata, campos ignorados>
- Dependências: <credenciais e data tables usadas, pelo nome padronizado>
- Pendências: <o que falta configurar, ou "nenhuma">
```

### 2.4 Nós
- Verbo no infinitivo + objeto, em português: `Normalizar conversa`, `Gravar na planilha`, `Registrar no controle`, `Buscar lead no Kommo`.
- Gatilho: `Gatilho - <Origem> <evento>` (ex.: `Gatilho - Kommo lead novo`).
- IF/Switch: pergunta curta com `?` (`Ainda não registrado?`, `Tem telefone?`).
- Nomes únicos e sem números automáticos (`Code1`, `HTTP Request2` são proibidos).
- **Ao renomear um nó, atualizar todas as expressões que o citam** (`$('Nome do nó')`). Rodar teste depois.

### 2.5 Grupos de nós (frames)
- Nome curto da etapa: `Filtro e registro`, `Enriquecimento`, `Envio`.
- Descrição de até 145 caracteres dizendo o que a etapa faz.

### 2.6 Versões
- Toda alteração salva com `versionName` curto no imperativo/presente: `Remove coluna Link da Conversa`, `Troca auth do Sheets para conta de serviço`.

### 2.7 Regras técnicas obrigatórias
Lições aprendidas em produção. Valem para todo workflow novo e toda alteração.

**Google Sheets: sempre usar append atômico**
- Todo nó Google Sheets com operação **Append** deve ter `Options → Use Append` **ligado** (`useAppend: true`).
- Motivo: sem essa opção o n8n primeiro lê qual é a próxima linha vazia e depois escreve nela. Quando vários webhooks chegam ao mesmo tempo (ex.: o Kommo enviando todos os leads de uma etapa de uma vez), todas as execuções leem a mesma linha e **uma sobrescreve a outra**. Em 15/11/2026 isso apagou 22 de 23 agendamentos do DrThiago.
- Com `useAppend: true` o Google acrescenta cada linha no fim de forma atômica, sem perda.
- Ao revisar um workflow existente, conferir essa opção em todos os nós de append.

**Webhooks: guardar o payload bruto antes de processar**
- Quando o formato do payload não é conhecido ou o sistema de origem pode mandar envios em massa, o primeiro passo após o gatilho é gravar o payload bruto numa data table `(histórico)`. Assim nada se perde e dá para reprocessar.

**Anti-duplicata: gravar o controle só depois do destino**
- A tabela `(anti-duplicata)` é gravada **depois** que o destino (planilha, CRM) confirmou a gravação. Se o destino falhar, o registro não fica marcado e pode ser reprocessado.

---

## 3. Agents (`Agent`)
```
Agent | <Cliente> | <Funil> | <Função do agente>
```
Ex.: `Agent | DrThiago | APD-BR | Qualifica leads do WhatsApp`. Descrição no mesmo modelo da seção 2.2, trocando `Gatilho` pelo canal (`Canal: WhatsApp`).

---

## 4. Data tables (`Table`)

O n8n chama de **Data table**: um banco de dados simples embutido no próprio n8n (aba Overview → Data tables). Não é Google Sheets.

### 4.1 Nome
```
Table | <Cliente> | <Funil> | <Conteúdo> (<finalidade>)
```
- `Finalidade` comum: `anti-duplicata`, `fila`, `cache`, `histórico`, `config`.
- Data tables não têm campo de descrição: a finalidade fica no nome.

Exemplos:
```
Table | DrThiago | APD-BR | Conversas registradas (anti-duplicata)
Table | DrThiago | Geral | Lista de clientes (1FN)
```

### 4.2 Colunas
- `snake_case`, minúsculas, sem acento, sem espaço: `telefone`, `lead_id`, `registrado_em`.
- **Não criar coluna `id`**: o n8n gera sozinho.
- Uma informação por coluna (1FN): nada de listas ou vários valores numa célula.
- Chaves de busca/anti-duplicata em coluna própria (ex.: `chave`), já normalizadas (telefone só com dígitos).
- Data/hora: texto `DD/MM/AAAA HH:mm:ss` no fuso `America/Sao_Paulo`, nome terminando em `_em` (`registrado_em`, `atualizado_em`).
- Renomear coluna exige ajustar todos os nós que a usam.

### 4.3 Referência nos workflows
- Sempre referenciar a table **pelo ID** no nó (não pelo nome). Assim renomear a table não quebra nada.

---

## 5. Credenciais (`Cred`)

```
Cred | <Dono> | <Serviço> - <Conta ou identificador>
```
- `Dono` = **quem é dono da conta**, não quem usa:
  - `Agencia`: conta do Eduardo/operação que serve vários clientes (ex.: conta de serviço Google).
  - `<Cliente>`: conta do cliente (token do Kommo dele, BM dele, Google dele).
- Credencial não tem funil.
- `Conta ou identificador`: parte não sensível que permite reconhecer a conta (início do e-mail, subdomínio, nome da BM). **Nunca** colocar token, senha ou chave no nome.

Exemplos:
```
Cred | Agencia | Google SA - automations
Cred | DrThiago | Kommo API - contourculptclinique
Cred | MedNexus | Google OAuth - marketing
```

Regras:
- Uma credencial por conta real. Não duplicar a mesma conta com nomes diferentes.
- Sempre referenciar pelo ID nos nós (renomear não quebra).
- Chaves e arquivos JSON de credencial nunca entram neste repositório nem no chat.

---

## 6. Webhooks (caminho da URL)

O webhook não tem nome, tem **caminho**, que vira a URL `https://n8n.srv2164786.hstgr.cloud/webhook/<caminho>`.

```
<cliente>-<funil>-<origem>-<destino>-<assunto>
```
- Tudo minúsculo, palavras separadas por hífen, sem acento, sem espaço, sem barra.
- Mesmos valores do nome do workflow.
- Um caminho por workflow. Nunca reaproveitar URL entre workflows ou clientes.
- **Mudar o caminho muda a URL**: atualizar o sistema que envia (Kommo, LP, Make) na mesma hora.

Exemplo: `drthiago-apd-br-kommo-sheets-conversas`

---

## 7. Pastas
- Uma pasta por cliente, com o nome exato do campo `Cliente`: `DrThiago`, `MedNexus`, `Agencia`.
- Subpasta por funil só quando o cliente tiver **mais de 5 workflows**: `DrThiago / APD-BR`.
- Nenhum workflow fica solto na raiz.

---

## 8. Tags
- Não usar tags de status nem de funil (o funil já está no nome).
- Tags são opcionais e só para sistema: `kommo`, `sheets`, `meta-ads`, `whatsapp`. Minúsculas, hífen.

---

## 9. Checklist antes de criar qualquer coisa no n8n
1. Ler este documento.
2. Confirmar `Cliente` e `Funil` em `clientes/README.md`. Se o funil não estiver claro, perguntar.
3. Montar os nomes: workflow, descrição, data tables, credenciais, caminho do webhook, nós.
4. Conferir se já existe credencial/data table reutilizável (não duplicar).
5. Criar dentro da pasta do cliente.
6. Preencher descrição e sticky note no modelo.
7. Conferir as regras técnicas da seção 2.7 (ex.: `useAppend` ligado em todo append do Sheets).
8. Testar.
9. Atualizar o arquivo do cliente em `clientes/` (inventário, pendências e histórico) e o índice `clientes/README.md`.

## 10. Clientes, funis e inventário
- Lista oficial de clientes (campo `Cliente`) e funis: [`clientes/README.md`](clientes/README.md).
- Inventário de ativos do n8n: **no arquivo de cada cliente** (`clientes/<cliente>.md`, seção 5). Ativos compartilhados (`Agencia`): [`setup-geral.md`](setup-geral.md).
- Não manter inventário neste arquivo: ele guarda só regras.
