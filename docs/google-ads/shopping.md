# Shopping (Merchant Center + campanhas)

Anúncios de produto com imagem, título, preço e loja, alimentados por **feed** do **Merchant Center (MC)**. Aparecem em Pesquisa, aba Shopping, Imagens, YouTube, Display/Discover (via PMax).

## 1. Pré-requisitos
- Conta **Merchant Center** com site verificado e reivindicado, políticas de devolução/frete/contato configuradas.
- **Feed de produtos**: via API, arquivo (Google Sheets, CSV/TSV/XML) ou plataforma (Shopify, WooCommerce, Nuvemshop etc. com app oficial).
- Vínculo **MC ↔ Google Ads**.
- Dados estruturados (schema Product) no site (ajuda na validação).
- Políticas de produto e de varejo (ver §8).

## 2. Atributos do feed (essenciais)
`id`, `title`, `description`, `link`, `image_link`, `availability`, `price`, `brand`, `gtin` / `mpn`, `condition`, `google_product_category`, `product_type`, `shipping`, `item_group_id` (variantes), `custom_label_0–4`, `sale_price`, `adult`, `age_group`, `color/size/gender` (moda).
- **Título** é o fator-chave: marca + produto + atributos relevantes (cor, tamanho, modelo) na ordem de busca.
- **Imagem**: fundo limpo, produto centralizado, sem texto/marca d'água.
- **Preço/estoque** idênticos entre feed e página (divergência reprova).
- **Rótulos personalizados** (custom labels): margem, ticket, sazonalidade, "best seller" — base para segmentar lances.
- **Feeds suplementares** para ajustar dados sem mexer no principal.

## 3. Tipos de campanha de Shopping
- **Shopping padrão (clássico)**: controle por grupo de produtos e **palavras-chave negativas**; lance manual ou smart. Perda de espaço para PMax em muitos casos.
- **Performance Max com feed**: dominante hoje (inclui Shopping, Pesquisa, YouTube, Display).
- **Anúncios de listagem local** (inventário local) e **produtos locais**.
- **Anúncios de coleção/vitrine** (em Demand Gen/PMax).
- **Programa Merchant**: listagens gratuitas ("listagens sem custo") se elegível.

## 4. Estrutura recomendada (padrão)
```
SHOP | Marca       (baixa prioridade/negativos cruzados)
SHOP | Mais vendidos (rótulo personalizado)
SHOP | Margem alta
SHOP | Geral
```
- **Prioridade de campanha**: alta/média/baixa para empurrar termos mais específicos (funil de negativas).
- **Subdivisão** por marca/categoria/ID/rótulo para controlar lances por grupo.
- Em PMax: **grupos de listagem** substituem a subdivisão.

## 5. Lance e orçamento
- **ROAS desejado** (e-commerce): valor de conversão e **receita real** (idealmente por ID de produto).
- **Maximizar valor de conversão**.
- Lance por grupo de produtos (manual) com base em margem.
- Orçamento proporcional ao catálogo e margem; sazonalidade (Black Friday, Natal, Dia das Mães) com **ajustes de sazonalidade**.

## 6. Diagnóstico
- **Diagnóstico do MC**: itens reprovados, desatualizados, GTIN ausente, preço divergente, imagem ruim, página de destino quebrada.
- **Relatório de competitividade de preços** (benchmark).
- **Relatório de produto** (impressões, cliques, conversões por item); **produtos sem impressões**.
- **Parcela de impressões de Shopping** (perda por orçamento/classificação).

## 7. Boas práticas
- Prioridade no **feed**: título, imagem, preço e GTIN.
- Enriquecer com **custom labels** e **feeds suplementares**.
- Atualização frequente do feed (ao menos diário; estoque e preço em tempo real quando possível).
- Excluir produtos de baixa margem/sem estoque.
- **Frete grátis** e **avaliações de produto/loja** ajudam CTR e conversão.
- **Promoções** (feed de promoções) e **selos** (Compre aqui etc.).

## 8. Políticas
- Proibidos/restritos: armas, produtos perigosos, medicamentos sob prescrição, conteúdo adulto restrito, falsificados, produtos de venda restrita por lei.
- Obrigatório: política de devolução, informações de contato, checkout seguro (HTTPS), dados consistentes.

## 9. Erros comuns
- Divergência de preço/estoque entre feed e site.
- Título pobre ("Camiseta") sem atributos.
- Todos os produtos no mesmo grupo sem priorizar margem/vendedores.
- Não olhar o **MC** (a maioria dos problemas está lá).
- Esperar controle de termos como em Pesquisa (limitado).
