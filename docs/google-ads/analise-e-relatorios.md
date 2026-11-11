# Análise, diagnóstico e relatórios

## 1. Princípio do Eduardo
Ao otimizar **a partir de prints**: usar **somente as métricas da dashboard fornecida** (leads, MQLs, AGDs, vendas, mensagens…). **Não analisar métricas do gerenciador de anúncios** por conta própria. Se não estiver claro qual é a métrica principal do funil, **perguntar**. Priorizar o que é **escalável** (gastou bem e manteve CPA baixo), não só o mais barato. Cuidado com aumentos grandes em estruturas pouco escaladas.

Alteração de verba → tabela: `Nome | Valor i | Valor f | Variação líquida | Variação %`. Apresentar, esperar aprovação, depois aplicar direto. Nada com verba alterada fica pausado; pausar só o marcado.

## 2. Métricas por camada
| Camada | Métrica | Sinal |
|---|---|---|
| Alcance | Impressões, IS, IS perdida (orçamento/classificação), Top IS | Espaço para crescer |
| Atração | CTR, CPC | Relevância do anúncio |
| Tráfego | Cliques, taxa de rejeição, tempo | Qualidade do clique |
| Conversão | Taxa de conversão, conversões, CPA | Página e oferta |
| Receita | Valor de conversão, ROAS, ticket | Retorno |
| Funil real | Leads → MQL → AGD → venda (CRM/dashboard) | **Fonte de verdade** |

## 3. Diagnóstico por sintoma
| Sintoma | Causas prováveis | Ação |
|---|---|---|
| Impressões baixas | Orçamento/lance baixo, QS baixo, segmentação estreita, anúncio reprovado | Ver IS perdida, corrigir |
| CTR baixo | Anúncio genérico, palavra errada, posição baixa | Reescrever, ativos, negativas |
| CPC alto | Concorrência, QS baixo, correspondência ampla | QS, exata/frase, negativas |
| Cliques sem conversão | Página fraca, oferta, tráfego ruim, tracking quebrado | Auditar termos, LP, tag |
| Conversões sem qualidade | Conversão primária errada, sem offline | Importar qualificado, ajustar metas |
| CPA subindo | Fadiga, concorrência, mudança de lance, sazonalidade | Revisar termos/criativos, estabilidade da conta |
| Gasto estourou | Orçamento diário médio (até 2×), lance ampla | Ajustar, rever termos |
| Campanha parou | Pagamento, política, datas, orçamento 0 | Checklist de conta |

## 4. Análises obrigatórias em Pesquisa
- **Termos de pesquisa** (por conversão e por custo sem conversão).
- **Palavras-chave** (QS, conversão, IS).
- **Anúncios** (RSA: combinações, ativos).
- **Segmentos**: dispositivo, hora/dia, local, público.
- **Auction insights**: concorrentes, IS sobreposta, taxa de posição superior.
- **Páginas de destino**: taxa de conversão por URL.

## 5. Análises obrigatórias em PMax/Demand Gen/Vídeo
- **Distribuição por canal** (PMax), **grupos de recursos**, **recursos** (qualidade), **públicos**, **termos/categorias**, **insights**.
- **Conversões por visualização** (VTC) separadas.
- Cuidado com **marca/remarketing inflando** resultado (comparar com Pesquisa de marca).

## 6. Rotina
**Diária (rápida)**: gasto x orçamento, campanhas "Sem veiculação", reprovações, conversões zeradas.
**Semanal**: termos de pesquisa (negativas), anúncios, orçamento por estrutura, CPA por funil.
**Quinzenal/mensal**: criativos, públicos, páginas, metas de lance, testes; fechamento com CRM.

## 7. Relatório ao cliente / Eduardo
- **Resumo**: gasto, conversões, CPA/ROAS, funil real.
- **O que mudou** (alterações e porquê).
- **Próximos passos**.
- **Orçamento por funil** (formato padrão do repositório; Google: orçamento por campanha ativa).
- Observações sobre confiabilidade dos dados.

## 8. Orçamento por funil no Google Ads
- Fonte: orçamento diário de cada campanha com status **Ativada** e entregando.
- Listar campanha → valor antes de somar.
- Sem regra CBO/ABO no Google; só campanha.
- **Orçamento compartilhado**: contar uma vez (valor do orçamento, não por campanha).
- **Moeda**: R$ (BRL) / US$ (USD).
- Se não estiver claro o funil de cada campanha, **perguntar** e registrar em `docs/<cliente>.md`.

## 9. Significância e decisão
- Decidir com **volume**; poucos cliques/conversões = ruído.
- Janela mínima: 7 dias (ideal 14), exceto emergências (gasto sem tracking).
- Evitar mudar muitas variáveis juntas.
- Mudanças de lance/meta: 10–20% por vez; dar tempo (3–7 dias) antes de reavaliar.
- Efeito de **conversão atrasada**: dados recentes subestimam; olhar coortes.

## 10. Erros de análise
- Confiar só no painel do Google (não no funil real).
- Cortar por CPA sem olhar escala/volume.
- Comparar CPA entre canais com intenção diferente (Pesquisa x Display).
- Ignorar janela de atribuição e conversão atrasada.
