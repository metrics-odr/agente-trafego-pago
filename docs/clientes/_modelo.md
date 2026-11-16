# <Nome comercial do cliente>

> Modelo. Copiar para `docs/clientes/<cliente>.md` (nome do arquivo = campo `Cliente` em minúsculas, ex.: `drthiago.md`), apagar as instruções entre `<>` e incluir o cliente no [índice](README.md).
> **Nunca** gravar valores de tokens ou senhas: só o nome e o local da credencial.

Atualizado em <DD/MM/AAAA>.

## 1. Resumo
| Item | Valor |
|---|---|
| Campo `Cliente` no padrão | `<PascalCase, ex.: DrThiago>` |
| Status | `<ativo / pausado / encerrado>` |
| Funis | `<lista dos funis, ex.: APD-BR, WhatsApp, Geral>` |
| Pasta no n8n | `<nome>` (`<id>`) |
| Briefing | `<link ou local>` |
| Contatos | `<nome e papel; e-mails só se forem necessários para acessos>` |

## 2. Funis
<Uma subseção por funil. O nome do funil é exatamente o usado nas campanhas.>

### 2.x <FUNIL>
| Item | Valor |
|---|---|
| Origem do lead | `<ex.: anúncio Instagram → WhatsApp>` |
| Métrica principal | `<o que conta como resultado: conversa, MQL, agendamento, venda>` |
| Campanhas Meta | `<nomes ou prefixo das campanhas deste funil>` |
| Fluxos n8n | `<nomes padronizados>` |
| Abas da planilha | `<abas que este funil alimenta>` |
| Regras | `<filtros, anti-duplicata, frases etc.>` |

## 3. Contas e sistemas
### 3.1 Meta Ads
| Item | Valor |
|---|---|
| Business (BM) | `<nome>` (`<id>`) |
| Conta(s) de anúncios | `<nome>` (`<id>`), moeda |
| Pixel | `<nome>` (`<id>`) |
| Página / Instagram | `<nome>` (`<id>`) |

### 3.2 CRM
| Item | Valor |
|---|---|
| Sistema | `<Kommo, RD, HubSpot...>` |
| Conta | `<subdomínio, account id>` |
| Pipelines | `<nome>` (`<id>`) |
| Etapas relevantes | `<nome>` (`<status_id>`) |
| Canais (WhatsApp etc.) | `<número, nome do canal>` |

## 4. Planilhas
| Planilha | Link / ID | Compartilhada com a conta de serviço? |
|---|---|---|

| Aba | Colunas (ordem) | Quem preenche |
|---|---|---|

Chave para cruzar abas: `<coluna>`.

## 5. Ativos no n8n (inventário único deste cliente)
### Fluxos
| Nome | ID | Webhook de produção | Onde está configurado na origem | Status |
|---|---|---|---|---|

### Data tables
| Nome | ID | Colunas | Para quê |
|---|---|---|---|

### Credenciais
| Nome | Onde fica | Status |
|---|---|---|

## 6. Payloads conhecidos
<Formato real de cada webhook recebido, confirmado com dados reais: content-type, campos, o que NÃO vem.>

## 7. Como testar sem sujar dados reais
<Ex.: usar IDs fictícios TESTE-..., e onde apagar depois (planilha + data tables).>

## 8. Acessos
| Data | O quê | Com quem / qual conta |
|---|---|---|

## 9. Legado
<Cenários antigos (Make, Zapier) e o que não pode ser religado.>

## 10. Pendências
- [ ] <item>

## 11. Histórico de mudanças
| Data | Mudança |
|---|---|
