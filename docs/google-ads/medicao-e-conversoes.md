# Medição e conversões

A qualidade da conversão define a qualidade do Smart Bidding. Conversão ruim = otimização ruim.

## 1. Componentes
- **Tag do Google (gtag.js)** / **Google Tag Manager (GTM)**: disparo de eventos no site.
- **Ações de conversão** na conta (Metas → Conversões): Site, Chamadas, App, Importação, Local.
- **GA4**: importar conversões/eventos-chave para o Google Ads (ou usar tag nativa; **não duplicar** a mesma conversão).
- **Vinculações**: Google Ads ↔ GA4, ↔ Merchant Center, ↔ YouTube, ↔ Search Console, ↔ Perfil da Empresa.

## 2. Configuração de uma ação de conversão
- **Categoria** (lead, compra, cadastro etc.) e **origem**.
- **Valor**: fixo, dinâmico ou sem valor (para leads, atribuir valor estimado ajuda tROAS/valor).
- **Contagem**: **Uma** (lead — 1 por clique) ou **Todas** (compras).
- **Janelas**: clique (30–90 dias), visualização (1 dia padrão), engajamento.
- **Modelo de atribuição**: orientado por dados (padrão).
- **Primária x Secundária**: só **primárias** entram em "Conversões" e otimizam lance. Secundárias entram em "Todas as conversões" para observação.
- **Metas de conversão** por objetivo (leads, vendas…) definem o que a campanha otimiza.

## 3. Conversões avançadas (Enhanced Conversions)
- Envia dados do cliente (e-mail, telefone, nome, endereço) **com hash SHA-256** para melhorar atribuição.
- **Web** (via tag/GTM) e **Leads** (formulário + importação offline com dados do cliente).
- Reduz perda por cookies e entre dispositivos.

## 4. Importação de conversões offline
- **GCLID** (clique), **GBRAID/WBRAID** (iOS/privacidade) capturados em campo oculto do formulário e salvos no CRM.
- Quando o lead vira **qualificado/agendado/venda**, enviar a conversão (com valor) de volta ao Google Ads (upload manual/planilha, API, Zapier/Make, CRM nativo, GA4 → Ads).
- Janela: até 90 dias após o clique.
- Por que importa: treina o algoritmo por **qualidade**, não só por formulário preenchido. **Crítico** em serviços, saúde, B2B.
- Alternativa: **conversões avançadas para leads** (e-mail/telefone hash).

## 5. Conversões por chamada
- **Do anúncio** (extensão/ativo de chamada com número do Google).
- **Do site** (número substituído dinamicamente).
- **Clique em número** (tag).
- Duração mínima configurável (ex.: 60s) para contar.

## 6. Consent Mode v2 e LGPD
- **Consent Mode v2** (UE/EEA e boas práticas globais): sinais `ad_storage`, `analytics_storage`, `ad_user_data`, `ad_personalization`.
- Modelagem de conversões quando usuário nega consentimento.
- No Brasil, **LGPD**: aviso/banner, política de privacidade; categorias sensíveis (saúde) exigem cuidado extra.

## 7. Verificações essenciais
- **Tag Assistant / Diagnóstico** de conversões: status "Registrando", "Sem dados recentes", "Inativa".
- Teste no site: evento dispara 1× por conversão.
- Duplicidade (GA4 + tag nativa) → inflar conversões.
- Conferir **valor** e **moeda**.
- Comparar com **CRM** semanalmente.

## 8. Ações de conversão típicas
| Negócio | Primárias |
|---|---|
| Lead gen | Envio de formulário, clique WhatsApp/ligação (qualificadas), agendamento, **lead qualificado (offline)** |
| E-commerce | Compra (valor), adicionar ao carrinho (secundária) |
| Clínica | Agendamento confirmado, compareceu (offline) |
| App | Instalação (secundária), compra/assinatura (primária) |

## 9. Boas práticas
- 1 conversão = 1 comportamento de negócio. Evitar milhares de micro-eventos primários.
- Usar **offline + valor** para guiar para o que gera receita.
- Documentar no `docs/<cliente>.md` quais conversões são primárias e por quê.
- Reportar **fonte de verdade** (CRM) ao lado do painel do Google.

## 10. Erros comuns
- Clique em botão e rolagem como primárias.
- Importar GA4 e também ter tag nativa (duplica).
- GCLID perdido (formulário sem campo oculto/redirects).
- Mudar ação de conversão no meio do aprendizado sem ajuste de dados.
- Ignorar iOS (WBRAID/GBRAID).
