# Google Ads — Fundamentos

## 1. Leilão e Ad Rank
- A cada busca/impressão elegível ocorre um leilão. O vencedor e a posição saem do **Ad Rank**: lance × qualidade (CTR esperado, relevância do anúncio, experiência da página) × impacto de ativos/extensões × contexto (dispositivo, local, hora, público, dispositivo, intenção da busca).
- O **CPC real** costuma ser menor que o lance máximo (paga o necessário para superar o concorrente abaixo).
- **Limiares de Ad Rank**: mesmo com lance alto, anúncio com qualidade baixa pode não aparecer.
- Fora da Pesquisa (Display, vídeo, PMax, Demand Gen), a lógica é de **leilão de inventário/atenção**, com o algoritmo escolhendo o formato e o local.

## 2. Hierarquia
```
Conta (CID de 10 dígitos, ex.: 123-456-7890)
└── Campanha: objetivo, rede, orçamento, lance, localização, idioma, programação, conversões
    └── Grupo de anúncios / Grupo de recursos (PMax) / Grupo de ativos (Demand Gen)
        └── Anúncios, palavras-chave, públicos, produtos
```
- **Conta gerente (MCC)** administra várias contas (as ~50 do Eduardo se encaixam).
- **Status**: Ativada, Pausada, Removida. Status efetivo exibe "Limitada", "Em aprendizado", "Reprovada", "Sem veiculação (orçamento/data/faturamento)".

## 3. Tipos de campanha (2025/2026)
| Tipo | Canais | Controle | Dado necessário |
|---|---|---|---|
| Pesquisa | Resultados de busca (+ parceiros) | Alto | Baixo–médio |
| Performance Max | Pesquisa, YouTube, Display, Discover, Gmail, Maps | Baixo | Médio–alto |
| Shopping | Resultados de Shopping, Imagens, parceiros | Médio | Feed |
| Display | Rede de sites/apps | Médio | Baixo |
| Vídeo | YouTube (in-stream, Shorts, feed) | Médio | Baixo |
| Demand Gen | YouTube, Discover, Gmail | Médio | Médio |
| App | Pesquisa, Play, YouTube, Display | Baixo | Eventos no app |
| Smart | Pesquisa e Display simplificadas | Muito baixo | Mínimo |
| Local/Hotel/Viagens | Maps/hotéis | Variável | Conta específica |

Subtipos de objetivo ao criar: Vendas, Leads, Tráfego do site, Promoção de app, Consideração, Alcance, Promoção de loja, **sem orientação de objetivo**. O objetivo escolhe **metas de conversão** e recursos disponíveis, mas dá para trocar/ajustar.

## 4. Estratégias de lance
- **Manuais**: CPC manual (com CPC otimizado opcional).
- **Automáticas (Smart Bidding)**: Maximizar cliques, Maximizar conversões, Maximizar valor de conversão, **CPA desejado**, **ROAS desejado**, **Parcela de impressões desejada**.
- Em 2025 CPA/ROAS desejados migram em parte para "Maximizar conversões/valor **com meta opcional**" — verificar a interface atual.
- Smart Bidding usa sinais em leilão: dispositivo, local, hora, lista de público, idioma, navegador, SO, texto do anúncio, termo de busca etc.
- **Requisitos práticos:** ~15–30 conversões/30 dias (mais, melhor); conversão estável, sem duplicar; não alterar meta a cada dia; passos de 10–20%.
- **Portfólio de lances**: estratégia compartilhada entre campanhas (útil p/ juntar volume).
- **Ajustes de lance**: dispositivo, local, hora, público, demográficos. Com smart bidding, só há ajustes limitados (ex.: dispositivo -100% para bloquear).
- **Sazonalidade e ajustes de dados**: informar promoções de curta duração e interrupções de tracking.

## 5. Orçamento
- **Diário médio**: pode gastar até 2× no dia, limitado a 30,4× por mês.
- **Compartilhado**: um orçamento para várias campanhas (o Google distribui).
- **Orçamento de campanha por período** (campanhas de duração fixa em alguns tipos, ex.: vídeo/Demand Gen) — verificar disponibilidade.
- **Previsões**: Planejador de desempenho.
- **Limitada por orçamento** vs **limitada por classificação**.
- Escalar: aumentos de 20–30% por vez; monitorar CPA por 3–7 dias; ampliar alcance (palavras, públicos, geo).

## 6. Atribuição
- Padrão: **orientado por dados** (DDA). Outros: último clique, primeiro clique, linear, decaimento, baseado em posição (alguns descontinuados).
- **Janelas**: clique (30–90 dias), visualização, engajamento com visualização (vídeo).
- **Conversões em visualização** (VTC) em vídeo/Display/PMax podem inflar resultados — separar na análise.
- Divergência esperada: Google Ads × GA4 × CRM. Usar uma **fonte de verdade** (CRM/dashboard) para decisão.

## 7. Estrutura de contas grandes (muitas contas)
- Convenção de nomes: `TIPO | Tema | Local | Estratégia | Funil` (ex.: `PESQ | Implante | SP | tCPA | APD`).
- Usar rótulos (labels) para funil/cliente/versão.
- Documentar mapeamento campanha → funil em `docs/<cliente>.md`.

## 8. Glossário
- **CID**: ID da conta. **MCC**: conta gerente.
- **IS**: parcela de impressões; **Abs. Top IS** e **Top IS**: parte superior.
- **CPA/ROAS/CPC/CPM/CPV/vCPM/CPI**.
- **Conversões x Todas as conversões**: primárias (otimizam) x todas (inclui secundárias e conversões cruzadas).
- **Conversões por visualização** (VTC/EVC).
- **Sinal de público** (PMax): sugestão, não restrição.
- **URL final expandida** (PMax/AI Max): o Google pode mandar para outra página do site.
- **Exclusão de marca / lista de marcas**: bloquear termos de marca em PMax/AI Max.
- **Assets**: imagens, vídeos, títulos, descrições, logos, sitelinks etc.
