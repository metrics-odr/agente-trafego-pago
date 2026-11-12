# Plano: 1 lead por dia, 100% orgânico — eduardomezzavilla.com.br

**Versão:** v2 · **Atualizado em:** 12/11/2026
**Operação:** 1 pessoa · ~6 a 8h por semana

---

## 1. A meta em números
- 1 lead/dia ≈ **30 leads/mês**.
- Blog com CTA bem colocado e isca digital converte de **1,5% a 3%** dos visitantes em lead. Para 30 leads/mês são necessárias **1.000 a 2.000 visitas orgânicas/mês**.
- Hoje as portas de entrada são pedidos grandes: o **diagnóstico gratuito de 1h**, para infoprodutores, e a **LP do Método ODR**, para gestores de tráfego. Quem acabou de ler um post raramente dá esse passo. A maior alavanca **não é tráfego, é uma porta de entrada mais fácil**.
- **Contar dois números:** leads de isca (deixou contato) e leads de oferta (pediu diagnóstico ou entrou pela LP do ODR).

**Regra do plano:** parar de perder dados e leads → converter melhor quem já chega → trazer mais gente.

---

## 2. Os dois públicos e para onde cada um vai
O blog já atrai os dois públicos. Falta mandar cada um para a oferta certa.

| Público | Posts que atraem | Oferta de destino |
|---|---|---|
| **Gestores de tráfego** | UTM, server side, Looker Studio, Adveronix, MCP Meta Ads/Claude, pixel | LP Método ODR |
| **Infoprodutores** | Funil de VSL, lançamento, high ticket, quando contratar gestor, benchmark | Diagnóstico gratuito |

---

## 3. Fase 0 — Consertar medição e vazamentos (semana 1, ~4h)

1. **Medição entre domínios no GA4.** O site (`eduardomezzavilla.com.br`) e a LP (`metrics-odr.github.io`) usam a mesma propriedade GA4 em domínios diferentes. Por isso cada passagem entre eles vira sessão nova com origem "referral" e a origem real (Google, ChatGPT) se perde.
   - GA4 → Admin → Fluxos de dados → Configurações da tag → **Configurar seus domínios**: adicionar os dois.
   - Em **Listar referências indesejadas**: adicionar os dois.
   - Teste: clicar de um domínio para o outro e confirmar o parâmetro `_gl=` na URL.
2. **Links quebrados na home.** "Gratuito >>" e "Saiba mais >>" apontam para `#`. Apontar para `/diagnostico/` e para as páginas de serviço.
3. **Contadores da home** ("+ R$ 0 MM", "0 anos"). Testar em conexão lenta e no celular. Se aparecer 0, a prova social vira antiprova: trocar por texto fixo.
4. **Evento-chave.** Marcar o envio de formulário (site e LP) como evento-chave no GA4.
5. **Campo "Como me conheceu?"** nos formulários: Google, ChatGPT/IA, Instagram, LinkedIn, indicação. Pega o que o GA4 não mede.
6. **Google Search Console** conectado ao domínio principal. É ele que alimenta a Fase 2.

---

## 4. Fase 1 — Criar a porta de entrada fácil (semanas 1 a 3, ~8h)
*É a etapa que mais muda o resultado.*

7. **Uma isca digital** (só **uma**, bem feita) trocada por nome, e-mail e WhatsApp. Opções com material já pronto:
   - Template Looker Studio de VSL com dados reais (**recomendada**: é a ponte natural para o Método ODR e o diagnóstico).
   - Planilha Gerador de UTMs (hoje aberta, passa a pedir contato).
   - Checklist de rastreamento em 15 itens.
8. **CTA contextual em cada post:** um bloco no meio e outro no fim, com a isca do tema e o link para a oferta do público certo (seção 2).
9. **Sequência curta para quem baixou a isca** (3 mensagens em 7 dias): entrega, um insight com caso real e o convite para o diagnóstico ou para a LP do ODR.
10. **Página de diagnóstico mais confiável:**
    - 2 ou 3 depoimentos ou mini-cases com número (CPA antes e depois).
    - Explicar o que acontece depois do formulário.
    - Tirar o "95%" e as "vagas limitadas", que não têm explicação.
11. **LP do Método ODR no domínio próprio.** Servir em `eduardomezzavilla.com.br/metodo-odr/` ou `odr.eduardomezzavilla.com.br` (GitHub Pages aceita domínio próprio via CNAME). Isso soma autoridade ao domínio principal e elimina o problema de medição entre domínios. Depois, fazer 301 ou atualizar os links antigos.

---

## 5. Fase 2 — Turbinar os posts que já existem (semanas 3 a 6, ~2h por post)
*O ganho mais rápido em SEO, porque esses posts já estão indexados.*

12. No Search Console, achar as páginas em **posição 5 a 20** com mais impressões. Essas são os **5 posts prioritários**.
13. Aplicar em cada um o padrão "citável por IA":
    - Resposta direta de 40 a 60 palavras no topo.
    - 1 tabela comparativa.
    - FAQ de 4 a 6 perguntas com schema FAQ.
    - Box do autor com credenciais (desde 2020, +R$ 5MM gerenciados, +R$ 10MM em projetos).
    - Data "Atualizado em".
    - Revisão de português e troca de superlativos por dados.
    - Termo padrão **"rastreamento"** (sair de "trackeamento"/"traqueamento", inclusive na categoria).
    - Alt text em todas as imagens.
14. **Começar pelo post de server side:** completar os três "Em Breve", escrever em texto o que hoje só aparece em print e corrigir os typos.

---

## 6. Fase 3 — Motor de conteúdo (mês 2 a 6, 1 post por semana, ~4h cada)
*Só conteúdo que atrai quem pode virar cliente. Nada de topo de funil genérico.*

| Cluster | Público | Pautas |
|---|---|---|
| **Rastreamento / dados reais** | Gestores | Quanto custa rastreamento server side · Stape vale a pena? · Por que o gerenciador mostra mais vendas que a Hotmart/Kiwify · Janela de atribuição para infoproduto |
| **IA + Meta Ads** (pouca concorrência em PT) | Gestores | Claude para gestor de tráfego · Relatório automático de Meta Ads com IA · Checklist de segurança para editar campanhas por IA |
| **Funil de VSL / perpétuo** | Infoprodutores | Métricas e benchmark de funil de VSL · CPA ideal para infoproduto de R$ 97 a 497 · Quando escalar um funil de VSL |
| **Contratação** | Infoprodutores | Quanto custa um gestor de tráfego para infoproduto · Gestor ou agência · O que um diagnóstico de tráfego deve analisar |

Todo post novo nasce no padrão da Fase 2, com isca e oferta do público certo e links para 2 ou 3 posts do mesmo cluster.

---

## 7. Fase 4 — Distribuição mínima (contínua, ~1h por semana)
15. **Um** canal social, onde o cliente está (LinkedIn ou Instagram). Cada post vira 1 publicação com resumo e link. Não abrir um segundo canal.
16. **1 menção externa por mês** para autoridade e citação por IA: comunidades de tráfego, guest post, podcast, parceiros (Stape, Kiwify).

---

## 8. Rotina semanal (~6 a 8h)

| Dia | Tarefa | Tempo |
|---|---|---|
| Seg | Escrever 1 post novo (ou otimizar 1 antigo durante a Fase 2) | 3–4h |
| Qua | Revisar, publicar, CTA e FAQ | 1h |
| Qui | Adaptar o post para o canal social | 1h |
| Sex | Números: leads por origem, top páginas, posições no Search Console | 30min |

---

## 9. O que NÃO fazer agora
- Post de topo genérico ("o que é marketing digital").
- Abrir YouTube, TikTok e LinkedIn ao mesmo tempo.
- Redesenhar o site.
- Comprar ferramenta de SEO antes do Search Console ter dados.

---

## 10. Checkpoints

| Quando | Entregas | Meta |
|---|---|---|
| Fim do mês 1 | Fases 0 e 1 prontas, isca no ar | ~8 a 10 leads/mês |
| Mês 3 | 5 posts otimizados e ~8 novos | ~15 a 20 leads/mês |
| Mês 6 | ~20 posts novos, 1.000 a 2.000 visitas orgânicas/mês | ~30 leads/mês |

**Pendente para recalibrar as metas:** sessões orgânicas dos últimos 30 dias e quantos leads vieram de cada origem.

---

## Histórico de versões
- **v2 (12/11/2026):** LP do Método ODR confirmada em `metrics-odr.github.io` (não está quebrada). Entram: medição entre domínios no GA4, separação dos dois públicos (gestores → ODR, infoprodutores → diagnóstico) e migração da LP para o domínio próprio.
- **v1 (12/11/2026):** primeira versão do plano.
