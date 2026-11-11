# Google Ads — Rede de Pesquisa (guia de referência)

Guia de Rede de Pesquisa. Índice geral: [`README.md`](README.md). Complementa o fluxo de Meta Ads; **não há skill nem MCP de Google Ads conectado neste repositório**, então este guia serve para análise, planejamento e criação de estrutura.

> Regra do repositório vale aqui também: estrutura primeiro, depois confirmação, depois execução. Consultar o briefing do cliente antes de criar campanhas.

---

## 1. Como o Google Ads funciona

- **Leilão a cada busca.** O Google decide quais anúncios aparecem e em que posição usando o **Ad Rank**: lance × Nível de Qualidade (expectativa de CTR, relevância do anúncio, experiência da página) × impacto de extensões/ativos × contexto (dispositivo, local, hora).
- **Você não paga o lance máximo.** O CPC real é o mínimo necessário para superar o concorrente logo abaixo (leilão de segundo preço adaptado).
- **Intenção ativa.** Diferente do Meta (interrupção), a Pesquisa captura demanda existente. Bom para fundo de funil.

## 2. Hierarquia da conta

```
Conta
└── Campanha (orçamento, rede, localização, idioma, estratégia de lance, conversões)
    └── Grupo de anúncios (tema de palavras-chave)
        ├── Palavras-chave + correspondências + negativas
        └── Anúncios (RSA)
```
- Orçamento, localização, idioma, programação e estratégia de lance ficam na **campanha**.
- Tema/intenção fica no **grupo de anúncios**. Um grupo = uma intenção. Evitar grupos com 50 palavras desconexas.
- Hoje o padrão é grupos **enxutos por tema** (não precisa mais de SKAG, mas a coerência palavra → anúncio → página continua essencial).

## 3. Tipos de campanha (contexto)

| Tipo | Uso |
|---|---|
| **Pesquisa** | Texto na SERP, intenção alta. Foco deste guia. |
| Performance Max | Todos os canais, automatizado. Pouco controle, precisa de volume de conversão. |
| Demand Gen | Descoberta (YouTube, Discover, Gmail). |
| Display / Vídeo | Reconhecimento e remarketing. |
| Shopping | E-commerce com feed do Merchant Center. |
| App | Instalações. |

Em campanha de Pesquisa, desativar **Rede de Display** (e, em geral, **parceiros de pesquisa** até testar) para não diluir o dado.

## 4. Palavras-chave e tipos de correspondência

| Tipo | Sintaxe | Atinge |
|---|---|---|
| **Ampla** | `advogado trabalhista` | Variações, sinônimos, intenções relacionadas. Mais volume, mais ruído. Só funciona bem com lance automático + conversões confiáveis. |
| **Frase** | `"advogado trabalhista"` | Buscas que contêm o sentido da frase, com termos antes/depois. Melhor equilíbrio. |
| **Exata** | `[advogado trabalhista]` | Mesmo significado/intenção (inclui variantes próximas). Máximo controle. |

Pontos-chave:
- Correspondências **exata e frase** capturam "variantes próximas" (erros, plural, sinônimos de mesma intenção).
- **Negativas** só têm correspondência literal: a negativa ampla **não** bloqueia sinônimos.
- Estratégia típica: começar com **frase + exata** em temas de maior intenção; usar ampla só com histórico de conversões e smart bidding.

### Negativação (essencial)
- Revisar o **Relatório de termos de pesquisa** semanalmente (no início, a cada 2–3 dias).
- Negativas comuns: `grátis`, `gratuito`, `curso`, `vagas`, `emprego`, `pdf`, `modelo`, `o que é`, `como fazer` (se o objetivo é lead de compra), concorrentes (se não for estratégia deles), termos de outras cidades/áreas.
- Níveis: **grupo**, **campanha**, **lista compartilhada** (reaproveitar entre campanhas). Usar negativas de campanha para blindar tudo; de grupo para evitar canibalização entre grupos.

## 5. Anúncios — RSA (Responsive Search Ads)

- Até **15 títulos** (30 caracteres) e **4 descrições** (90 caracteres). O Google combina e testa.
- Mínimo recomendado: 8–12 títulos variados, 3–4 descrições.
- Variar os ângulos: palavra-chave, benefício, prova social, diferencial, preço/condição, CTA, localização, urgência (com honestidade).
- **Fixação (pin)** só quando for obrigatório (ex.: aviso legal em saúde/finanças). Fixar demais derruba a distribuição.
- Incluir a palavra-chave principal em pelo menos 1–2 títulos.
- **Classificação do anúncio** (Ruim → Excelente): usar como guia, não como meta absoluta.
- **URL final** coerente com a intenção. **Caminhos de exibição** (path 1/2) reforçam a relevância.

### Ativos (antigas extensões) — usar todos os que fizerem sentido
- **Sitelinks** (4+), **Frases de destaque** (callouts), **Snippets estruturados**.
- **Chamada** (telefone), **Local** (Perfil da Empresa), **Formulário de lead**, **Preço**, **Promoção**, **Imagem**, **Logotipo e nome da empresa**.
- Impactam Ad Rank e CTR; custo zero extra além do clique.

## 6. Nível de Qualidade (Quality Score)

Nota 1–10 por palavra-chave, composta de:
1. **CTR esperado**
2. **Relevância do anúncio**
3. **Experiência na página de destino**

QS alto reduz CPC e melhora posição. É diagnóstico, não KPI final. Melhorar: grupos temáticos, palavra no anúncio, landing page rápida, mobile, mensagem alinhada.

## 7. Estratégias de lance

| Estratégia | Quando usar |
|---|---|
| **CPC manual** | Conta nova sem dados, controle fino, teste de palavras. |
| **Maximizar cliques** | Início/teste de tráfego, com limite de CPC. Raramente para lead. |
| **Maximizar conversões** | Quer volume, sem meta de CPA. Cuidado com CPA explodindo. |
| **CPA desejado (tCPA)** | Tem histórico (~30+ conversões/30 dias). Meta de custo por lead/venda. |
| **Maximizar valor de conversão / ROAS desejado (tROAS)** | Conversões com valores diferentes, e-commerce, vendas. |
| **Parcela de impressões desejada** | Marca e posição topo (defesa de marca). |

Regras práticas:
- Smart bidding precisa de **conversão confiável** e **volume**. Dados ruins = otimização ruim.
- Após mudar estratégia ou meta, há **período de aprendizado** (~1–2 semanas). Evitar mexer a cada dia.
- Alterações de tCPA: ajustar em passos pequenos (10–20%).
- Orçamento coerente com a meta: se o orçamento diário é menor que ~10× o CPA alvo, o sistema tem pouco espaço para aprender.

## 8. Orçamento e entrega

- **Orçamento diário** (o Google pode gastar até 2× em um dia, mas respeita a média mensal: 30,4× o diário).
- Status **"Limitado pelo orçamento"** = perdendo impressões por verba; **"Limitado por classificação"** = lance/QS insuficientes.
- Métricas de oportunidade: **Parcela de impressões (IS)**, **IS perdida por orçamento**, **IS perdida por classificação**, **IS na parte superior**.
- Escalar: subir verba em passos (20–30%) enquanto CPA se mantém; ampliar palavras (frase/ampla) e novas campanhas por tema.

## 9. Segmentação

- **Localização**: usar **"Presença"** (pessoas que estão ou regularmente estão no local) em vez de "Presença ou interesse", salvo turismo. Excluir locais irrelevantes.
- **Idioma**: do usuário, não do anúncio.
- **Programação de anúncios**: horário comercial quando há ligação/atendimento; 24h se o formulário converte sempre.
- **Dispositivos**: ajustar lances se houver diferença forte (com smart bidding os ajustes de dispositivo ficam limitados).
- **Públicos** em Pesquisa: usar em modo **Observação** (dá dado, sem restringir) ou **Segmentação** (restringe). Listas de remarketing, in-market, afinidade, dados do cliente.

## 10. Rastreamento de conversões (base de tudo)

- **Tag do Google (gtag)** + **Google Tag Manager**; **Conversões avançadas** (hash de e-mail/telefone) para melhor atribuição.
- Importar do **GA4** ou configurar **ações de conversão** nativas. Evitar duplicar a mesma conversão.
- **Ações primárias** (entram em "Conversões" e otimizam o lance) vs **secundárias** (só observação). Marcar como primária só o que representa lead/venda real.
- **Chamadas**: conversões por ligação do anúncio e do site; definir duração mínima.
- **Importação offline** (GCLID): enviar leads qualificados/vendas do CRM para treinar o algoritmo por **qualidade**, não só por volume. Muito importante para serviços e saúde.
- **Modelo de atribuição**: padrão é orientado por dados.
- **Consent Mode v2** e LGPD: configurar consentimento para não perder dados.

## 11. Estrutura recomendada (exemplo de partida)

Para um negócio local de serviço (ex.: clínica):
```
Campanha: PESQ | Marca            -> [nome da clínica], "nome da clínica"
Campanha: PESQ | Serviço A | Cidade -> grupos por procedimento/intenção
Campanha: PESQ | Serviço B | Cidade
Campanha: PESQ | Concorrentes (opcional, com cuidado)
Campanha: PESQ | Genéricas amplas (teste, só com dados)
```
- Separar **marca** das demais (CPA muito diferente; evita mascarar a performance).
- Orçamentos separados por prioridade de negócio.
- Convenção de nomes consistente (rede | tema | local | estratégia) facilita relatório em ~50 contas.

## 12. Rotina de otimização

**Diário/semanal**
- Gasto vs orçamento, anomalias, anúncios reprovados, queda de conversão (checar tag).
- Termos de pesquisa → novas negativas e novas palavras.
- Status "limitado".

**Quinzenal/mensal**
- Performance por palavra, anúncio (RSA), dispositivo, horário, local.
- Testar novos títulos/descrições; pausar anúncios fracos com dados suficientes.
- Revisar QS, páginas de destino, metas de CPA/ROAS.
- Auction insights (concorrentes, IS, posição).

**Princípios**
- Decidir com **volume suficiente** (evitar conclusões com 5 cliques).
- Mudar **uma variável por vez** quando possível.
- Otimizar para a **métrica de negócio** (lead qualificado, venda), não para clique.

## 13. Métricas-chave

| Métrica | Leitura |
|---|---|
| Impressões / IS | Alcance e share de mercado |
| CTR | Relevância do anúncio |
| CPC médio | Custo do clique |
| Taxa de conversão | Qualidade da página/tráfego |
| Conversões / CPA | Resultado e custo |
| ROAS / valor de conversão | Retorno em vendas |
| QS | Diagnóstico de qualidade |
| Parcela perdida (orçamento/classificação) | Onde há espaço para crescer |

Atenção: no Google Ads, "Conversões" depende das ações marcadas como primárias; comparar sempre com o dado do CRM/dashboard.

## 14. Políticas e cuidados

- **Saúde, finanças, direito, política**: restrições e certificações (ex.: medicamentos, saúde com restrição de segmentação, instituições financeiras). Verificar antes de subir.
- Evitar promessas absolutas, "cura", "garantido", superlativos não comprovados, marcas registradas de terceiros em texto sem autorização.
- Página de destino precisa ser acessível, com política de privacidade e conteúdo consistente com o anúncio.
- Anúncio reprovado: corrigir e reenviar; apelo só quando for revisão equivocada.

## 15. Erros comuns

1. Deixar **Rede de Display** e **parceiros** ligados sem querer.
2. Correspondência ampla sem smart bidding ou sem dado.
3. Não revisar termos de pesquisa e não negativar.
4. Muitas conversões "primárias" sem valor real (clique em botão, rolagem).
5. Mudar lance/meta todo dia, nunca saindo do aprendizado.
6. Mandar tudo para a home em vez da página específica.
7. Juntar marca e não-marca na mesma campanha.
8. Orçamento minúsculo para tCPA alto.
9. Não importar conversões offline em negócios de lead qualificado.

## 16. Ponte com este repositório

- **Tabela de variação de verba** (`Nome | Valor i | Valor f | Variação líquida | Variação %`) vale igual para Google Ads.
- **Orçamento por funil**: no Google Ads só há orçamento por campanha (não existe CBO/ABO). Somar os orçamentos de campanhas **ativas** por funil.
- **Regra de ouro**: o que estava ativo continua ativo; o que estava pausado continua pausado. Retrato antes, releitura depois.
- **Otimização por prints**: usar só as métricas fornecidas em prints da dashboard; não analisar métricas do gerenciador.
- Se o Eduardo quiser operar Google Ads por linguagem natural como no Meta, o próximo passo é conectar um MCP/API de Google Ads e criar uma skill `gestor-trafego-google-ads` espelhando a do Meta.

## 17. Glossário rápido

- **SERP**: página de resultados. **RSA**: anúncio responsivo de pesquisa. **QS**: nível de qualidade.
- **IS**: parcela de impressões. **tCPA / tROAS**: CPA / ROAS desejado.
- **GCLID**: identificador de clique do Google (para conversões offline).
- **Termo de pesquisa**: o que o usuário digitou; **palavra-chave**: o que você licita.
- **Negativa**: termo que bloqueia exibição.

---

## 18. AI Max for Search e correspondência ampla (evolução recente)

- **AI Max for Search**: pacote de recursos ligável por campanha de Pesquisa. Inclui **expansão de termos de pesquisa** (vai além das palavras-chave, estilo ampla/DSA), **personalização de texto** (ajusta títulos/descrições ao termo e à página) e **expansão de URL final** (pode enviar a outra página do site).
- **Controles**: exclusões de marca / inclusão de marca, **negativas**, **exclusões de URL**, **segmentação de local por intenção**; relatórios de termos com correspondência por origem.
- **Quando testar**: conta com conversões confiáveis e volume, para achar demanda nova. **Cuidado** em nichos regulados (saúde, jurídico, finanças): pode gerar texto/URL não revisados.
- **Boa prática**: testar em **experimento** (50/50) antes de ligar na campanha principal; manter exata/frase nas intenções críticas; vigiar termos irrelevantes e a página de destino escolhida.
- **Smart Bidding + ampla**: combinação recomendada pelo Google; funciona com conversão limpa. Sem isso, preferir frase/exata.
- **DSA** é gradualmente absorvido por esses recursos; checar a interface atual.

## 19. Campanhas multi-país e multi-idioma (aprendizados)
- **Uma campanha por idioma.** O idioma da campanha é o do usuário; palavra-chave, anúncio e página precisam estar no mesmo idioma. O Google **não traduz** palavras-chave.
- **O mesmo país pode estar em campanhas de idiomas diferentes** (ex.: Bélgica em FR e EN) sem sobreposição, porque o idioma do usuário separa o público. Com verba pequena, concentrar mais vale que cobrir tudo.
- **Paridade:** se o cliente quer as mesmas palavras em dois idiomas, montar uma tabela lado a lado, conceito por conceito.
- **Checar colisão de nome:** antes de usar o nome de um produto como palavra-chave, buscar se outra marca vende algo com o mesmo nome (ex.: "Lampe Serenity" é também da Maison Berger).
- **Checar conflito entre negativas e palavras-chave** próprias (uma negativa pode bloquear o que você quer comprar).
- **Superlativos** ("o primeiro", "o melhor") só com comprovação.
- **Um grupo com muitas intenções** reduz relevância e QS; se o cliente optar por isso, usar **URL final por palavra-chave** e registrar o risco.
- **O orçamento diário vale como média**: o gasto de um dia pode chegar a 2×.
- **Antes de definir lance automático**, ver o histórico de conversões da conta; sem histórico, começar manual ou com cliques limitados.
- **Conferir duplicidade de conversão** entre tag nativa e GA4.

## 20. Referências cruzadas
Ver [`fundamentos.md`](fundamentos.md), [`medicao-e-conversoes.md`](medicao-e-conversoes.md), [`publicos-e-segmentacao.md`](publicos-e-segmentacao.md), [`analise-e-relatorios.md`](analise-e-relatorios.md).
