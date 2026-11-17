# Larissa Topper

> Arquivo criado a partir do [modelo](_modelo.md). Só tem o que já foi confirmado; o resto fica como pendência.
> **Nunca** gravar valores de tokens ou senhas.

Atualizado em 17/11/2026.

## 1. Resumo
| Item | Valor |
|---|---|
| Campo `Cliente` no padrão | `LarissaTopper` |
| Status | ativo |
| Funis | `APD-BR`, `APD-INTER`, `DIAG-INTER` (verba); outras campanhas fora desses funis: distribuição (C1/C2), SS Directs |
| Pasta no n8n | não há |
| Briefing | a informar pelo Eduardo |

## 2. Funis (mapeamento de campanhas, confirmado em 17/11/2026)
Aplicação = Versalhes. O funil sai do nome da campanha:

| Funil | Regra no nome | Campanhas (tipo) |
|---|---|---|
| `APD-BR` | `APD ... BR \| YAY` | CBO 06-15 Teste MQL; ABO 04-13 P1 MQL Teste de Ads; ABO 05-27 Teste Públicos; ABO 04-13 BR P2 Teste de Ads |
| `APD-INTER` | `APD ... MUNDO` | CBO 05-14 P2 Top Ads; CBO 04-23 P1 Top Ads; CBO 11-17 P1 CostCap; CBO 11-17 P2 MQL Top Ads; ABO 04-13 MUNDO P2 Teste de Ads |
| `DIAG-INTER` | `DIAG ... MUNDO` | ABO 04-22 Teste de Ads; ABO 04-22 MQL Teste de Ads (criada em 17/11) |

Fora desses funis (não entram em ajuste de APD/DIAG): `C1 | E1-DIST` Seguidores, `C2 | E1-DIST` (ENG e VID), `SS | E2-CAP` Directs Instagram, boosts de posts do Instagram, campanhas antigas Sala Secreta, VR0225, CNR e Black-2025 (ativas sem gasto em 17/11).

## 3. Contas e sistemas
### 3.1 Meta Ads
| Item | Valor |
|---|---|
| Business (BM) | Larissa Topper (`330098771277333`) |
| Conta operável | BM1CA02 - Larissa Topper (`1298650631043487`), BRL |
| Outras contas | ver [../contas.md](../contas.md) (USD sem pagamento e "Read-Only": não editar) |
| Mínimo diário por conjunto | R$ 5,70 (`min_daily_budget_cents` = 570) |

## 10. Pendências
- [ ] Briefing, pixel e página padrão do cliente.
- [ ] Confirmar se o critério P1/P2 também deve virar subfunil.

## 11. Histórico de mudanças
| Data | Mudança |
|---|---|
| 17/11/2026 | Verba total da conta ajustada para ~R$ 3.000/dia cortando só APD e DIAG, em múltiplos de 5: APD-BR R$ 1.705, APD-INTER R$ 790, DIAG-INTER R$ 250, demais R$ 252 (total R$ 2.997). A edição pausou 2 campanhas e 10 conjuntos; todos reativados e conferidos ao vivo. |
