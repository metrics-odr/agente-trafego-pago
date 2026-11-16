# Setup geral (operação do Eduardo)

Infraestrutura compartilhada por todos os clientes. Dados de cada cliente ficam em [`clientes/`](clientes/README.md).

> **Segurança:** nunca gravar aqui o valor de tokens, senhas, chaves ou arquivos JSON. Registrar só **o nome e o local** de cada credencial (regra do `CLAUDE.md`).

Atualizado em 16/11/2026.

---

## 1. n8n
| Item | Valor |
|---|---|
| Instância | [https://n8n.srv2164786.hstgr.cloud](https://n8n.srv2164786.hstgr.cloud) (self-hosted na Hostinger, painel: [hpanel.hostinger.com](https://hpanel.hostinger.com)) |
| Projeto | Pessoal do Eduardo (`srRTMbP5mWVNIiQr`). Projetos de equipe não habilitados. Atalhos: [Workflows](https://n8n.srv2164786.hstgr.cloud/home/workflows) · [Credenciais](https://n8n.srv2164786.hstgr.cloud/home/credentials) · [Data tables](https://n8n.srv2164786.hstgr.cloud/home/datatables) · [Execuções](https://n8n.srv2164786.hstgr.cloud/home/executions) |
| Webhook de produção | `https://n8n.srv2164786.hstgr.cloud/webhook/<caminho>` |
| Webhook de teste | `https://n8n.srv2164786.hstgr.cloud/webhook-test/<caminho>` (só responde com "Listen for test event" aberto no editor) |
| Publicar | Nesta versão, "ativo" = **Publicado**. Editar um fluxo publicado altera só o rascunho: clicar em **Publish** para a mudança entrar no ar |
| Conector no claude.ai | `n8n`, com as ferramentas de leitura e de gravação/exclusão em **Sempre permitir** ([abrir conectores](https://claude.ai/customize/connectors)) |
| Permissões no repositório | [`.claude/settings.json`](../.claude/settings.json) libera `mcp__n8n` e bloqueia arquivar workflow, apagar agent, apagar coluna de data table e apagar skill |
| Padrão de nomes e regras técnicas | [`padrao-n8n.md`](padrao-n8n.md) |

Limitação: com o fluxo despublicado ou o servidor fora do ar, o webhook responde 404 e **o dado se perde** (o n8n não enfileira). Mitigação: guardar o payload bruto num histórico (`padrao-n8n.md` §2.7).

### Ativos compartilhados (cliente `Agencia`)
| Tipo | Nome | ID | Observação |
|---|---|---|---|
| Cred | `Google Service Account account` → renomear para `Cred \| Agencia \| Google SA - automations` | `6deuhYvp4Sfr43Qc` | Renomear à mão em [Credenciais](https://n8n.srv2164786.hstgr.cloud/home/credentials) (sem ferramenta para isso) |

## 2. Google (conta de serviço)
| Item | Valor |
|---|---|
| **E-mail para dar acesso de Editor nas planilhas** | `automations@gen-lang-client-0448992217.iam.gserviceaccount.com` |
| Projeto Google Cloud | [`gen-lang-client-0448992217`](https://console.cloud.google.com/home/dashboard?project=gen-lang-client-0448992217) · [Contas de serviço](https://console.cloud.google.com/iam-admin/serviceaccounts?project=gen-lang-client-0448992217) · [Sheets API](https://console.cloud.google.com/apis/library/sheets.googleapis.com?project=gen-lang-client-0448992217) · [Drive API](https://console.cloud.google.com/apis/library/drive.googleapis.com?project=gen-lang-client-0448992217) |
| Credencial no n8n | `Google Service Account account` (`6deuhYvp4Sfr43Qc`), em [Credenciais](https://n8n.srv2164786.hstgr.cloud/home/credentials) |
| Onde está a chave | Só dentro da credencial do n8n. O JSON baixado deve ser apagado do computador |

**Para uma planilha nova funcionar:** abrir a planilha → **Compartilhar** → colar o e-mail acima → **Editor** → desmarcar "Notificar pessoas" → **Compartilhar**.

## 3. Make
| Conta | Zona | Acesso |
|---|---|---|
| Eduardo (`Eduardo Souto`) | [us1.make.com](https://us1.make.com) | Conector Make do claude.ai. Organização `My Organization` (376982), time `Integrações` (147372) |
| Clientes (ex.: Thiago Virgili) | [us2.make.com](https://us2.make.com) | Não acessíveis pelo conector. Leitura pontual só com token do cliente, pelo formulário seguro de credencial (nunca pelo chat) |

## 4. Credenciais salvas no ambiente da sessão do Claude
| Host | Para quê | Status |
|---|---|---|
| `us2.make.com` | Token de API do Make do Thiago (`hooks:read`) usado na migração de 15/11/2026 | **Exposto no chat: apagar no Make (Profile → API access)** |

## 5. Regras do repositório
- Configurações e documentação (`CLAUDE.md`, `.claude/`, `docs/`) vão direto para a `main`, sem PR.
- Cada cliente tem um arquivo em [`docs/clientes/`](clientes/README.md) criado a partir de [`clientes/_modelo.md`](clientes/_modelo.md). O inventário de ativos do n8n de cada cliente fica **só** no arquivo dele.
- Contas de anúncios Meta (lista geral): [`contas.md`](contas.md).

## 6. Histórico de mudanças do setup
| Data | Mudança |
|---|---|
| 15/11/2026 | Conta de serviço Google criada e ligada ao n8n |
| 15/11/2026 | Ferramentas do n8n liberadas no `.claude/settings.json` e no conector do claude.ai |
| 16/11/2026 | Regra de append atômico no Sheets (`padrao-n8n.md` §2.7) após perda de linhas em envio simultâneo |
| 16/11/2026 | Documentação reorganizada em `setup-geral.md` + `clientes/` |
