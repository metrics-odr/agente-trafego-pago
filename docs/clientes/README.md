# Clientes: índice

Um arquivo por cliente, criado a partir de [`_modelo.md`](_modelo.md). Infraestrutura comum: [`../setup-geral.md`](../setup-geral.md). Padrão de nomes do n8n: [`../padrao-n8n.md`](../padrao-n8n.md). Contas Meta: [`../contas.md`](../contas.md). Manuais do Kommo: [infraestrutura (Contour Clinique)](../manual-infraestrutura-kommo-drthiago.md) · [implementação (replicar em outra conta)](../manual-implementacao-kommo.md) · [vídeos do Kommo](../kommo-videos-contour-clinique.md) · [roteiros para outros médicos](../roteiros-videos-medicos.md).

Regras:
- Nome do arquivo = campo `Cliente` em minúsculas (`DrThiago` → `drthiago.md`).
- O campo `Cliente` e os nomes de funil aqui são os oficiais: usar exatamente igual no n8n, nas data tables, nos webhooks e nas pastas.
- O inventário de ativos do n8n de cada cliente fica **só** no arquivo do cliente.
- Ao criar ou mudar qualquer coisa de um cliente: atualizar o arquivo dele (seções 5, 10 e 11) e a linha dele nesta tabela.

| Cliente (campo) | Nome comercial | Funis | Automações n8n | Arquivo | Status |
|---|---|---|---|---|---|
| `DrThiago` | Dr Thiago Virgili | `WhatsApp`, `Geral` | 2 fluxos publicados | [drthiago.md](drthiago.md) | Ativo |
| `MedNexus` | MedNexus (Clã da Medicina, Clínica Mantelli) | A mapear | — | [../mednexus.md](../mednexus.md) (guia Meta Ads) | Ativo |
| `LarissaTopper` | Larissa Topper | `APD-BR`, `APD-INTER`, `DIAG-INTER` | — | [larissatopper.md](larissatopper.md) | Ativo |
| `MadeInColors` | Made in Colors (Noovamik) | A mapear | — | [madeincolors.md](madeincolors.md) | Ativo |
| `ThaisJunqueira` | Thais Junqueira | A mapear | — | só em `contas.md` | Ativo |
| `DaviBraga` | Davi Braga | A mapear | — | só em `contas.md` | Ativo |
| `MayaMassafera` | Maya Massafera | A mapear | — | só em `contas.md` | Ativo |
| `Agencia` | Operação do Eduardo | `Geral` | Credencial Google compartilhada | [../setup-geral.md](../setup-geral.md) | Ativo |

Clientes de `contas.md` ainda sem campo definido (Bitribut, Secrê, Império Médico — contas CA4 e CA6 já confirmadas em `contas.md` —, Eduardo ESM): definir o nome em PascalCase quando forem ganhar automação ou arquivo próprio.
