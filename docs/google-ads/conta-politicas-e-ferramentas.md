# Conta, políticas, faturamento e ferramentas

## 1. Estrutura de acessos
- **Conta gerente (MCC)** com contas de cliente vinculadas.
- **Níveis de acesso**: Administrador, Padrão, Somente leitura, Somente e-mail.
- Convite de vinculação MCC ↔ cliente; o cliente aprova.
- **CID** (ID de 10 dígitos) é a identidade da conta. **Confirmar sempre o CID antes de alterar.**
- Para scripts/API/Editor: **token de desenvolvedor** (MCC), **OAuth** (nunca guardar no repositório).

## 2. Faturamento
- **Cartão/boleto (pós-pago ou pré-pago)** e **fatura mensal** (crédito liberado).
- **Pré-pago**: saldo; para a veiculação quando acaba.
- **Pós-pago**: limite de crédito.
- **Orçamento de conta** (account budget): limite total por período — ainda existe em algumas contas.
- **Impostos** (BR): notas fiscais mensais; atenção à moeda (BRL/USD).
- **Pagamento falho** = campanhas param ("Sem veiculação: faturamento").

## 3. Políticas — principais categorias
- **Proibido**: produtos falsificados, ferramentas de hacking, conteúdo perigoso, práticas desonestas.
- **Restrito**: álcool, jogos de azar, saúde e medicamentos, conteúdo adulto, política, serviços financeiros, direitos autorais, marcas.
- **Saúde/medicamentos**: sem prescrição sem certificação; sem "cura"; sem fotos "antes/depois" explícitas; remarketing e segmentação sensível restritos.
- **Finanças**: divulgação de taxas/termos, empréstimos com requisitos específicos.
- **Direito**: claims de resultado ("garantido") proibidos.
- **Padrões editoriais**: pontuação, letras maiúsculas, símbolos, qualidade da página.
- **Destino**: página funcional, consistente, segura, sem malware, sem pop-up enganoso.
- **Política de dados pessoais**: sem segmentar por atributos sensíveis.

## 4. Reprovações
- Ver **Política → Status do anúncio** ("Reprovado", "Aprovado limitado").
- Corrigir e **reenviar** ou **recorrer** em caso de revisão equivocada.
- Reprovação em lote por **política de destino** (página fora do ar).
- Anúncios reprovados prejudicam a **reputação da conta**.

## 5. Suspensões
- **Prática comercial inaceitável**, **solicitação de pagamento suspeito**, **atividade de contorno de sistemas** (cloaking).
- Recurso via formulário; documentação do negócio.
- Prevenir: dados consistentes, site claro, políticas e contato visíveis.

## 6. Verificação
- **Verificação do anunciante** (identidade e atividade comercial).
- **Certificação de saúde/finanças** quando exigido.
- Necessária para continuar veiculando em certos setores.

## 7. Ferramentas
- **Google Ads Editor**: edição em massa offline, importação/exportação CSV, revisão de alterações. Excelente para ~50 contas.
- **Planejador de palavras-chave**: volume, tendência, CPC estimado, ideias (por URL/termo).
- **Planejador de desempenho**: previsão de orçamento/ROAS.
- **Planejador de alcance**: vídeo.
- **Central de públicos**, **Biblioteca compartilhada**: negativas, orçamentos, públicos, posicionamentos.
- **Relatório de alterações** (Histórico de alterações): quem mudou o quê.
- **Recomendações** e **Pontuação de otimização**: usar com ceticismo; muitas recomendações aumentam gasto.
- **Experimentos** (campanha rascunho/experiência): teste A/B de lances, estruturas, PMax x padrão.
- **Regras automatizadas**: pausar/ativar por condição, ajustar orçamento por hora.
- **Scripts** (JavaScript): relatórios, alertas de orçamento, verificação de links quebrados.
- **Google Ads API** + **MCC** + **Looker Studio** (conectores) + **BigQuery** (transferências).
- **Google Analytics 4**, **Search Console**, **Merchant Center**, **Google Tag Manager**.

## 8. Operação em escala (50+ contas)
- Padrão de **nomenclatura** e **rótulos**.
- **Scripts de MCC** com alertas (orçamento estourado, conversão zerada, campanha limitada, reprovação).
- **Looker Studio** com visão por cliente.
- Planilha de controle (CID, moeda, orçamento, metas, funil).
- **Rotina** semanal de verificação por conta.

## 9. Segurança
- Acessos por e-mail pessoal; revisar saída de ex-colaboradores.
- **Verificação em duas etapas**.
- Nunca colocar tokens ou senhas no repositório.
- Revisar **notificações** de política e de faturamento.

## 10. Quando algo "não roda"
Checklist rápido:
1. Faturamento/pagamento ok?
2. Campanha, grupo e anúncio **ativados** (e datas)?
3. Anúncio aprovado? Palavra-chave elegível?
4. Orçamento e lance viáveis? **Limitada** por orçamento/classificação?
5. Segmentação restritiva (local, público em segmentação, horário)?
6. Conversão registrando? Aprendizado/mudança recente?
7. Políticas de destino e site.
