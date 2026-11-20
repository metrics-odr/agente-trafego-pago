# Vídeos do Drive do Kommo (Contour Clinique): inventário e transcrição

Estudo de 20/11/2026. Complementa o [Manual de Infraestrutura](manual-infraestrutura-kommo-drthiago.md) (§2.7.1) e alimenta os [Roteiros padronizados](roteiros-videos-medicos.md).

> **Privacidade:** vários vídeos são de **pacientes** (rosto e corpo). Este repositório guarda **só descrições e texto transcrito**, nunca os arquivos nem quadros. Não commitar vídeos nem imagens deles.

## 1. Como acessei (reprodutível)
1. `GET /api/v4/account?with=drive_url` → `drive_url` = `https://drive-g.kommo.com` (o host real da listagem foi `drive-c.kommo.com`).
2. `GET <drive_url>/v1.0/files?limit=250` com o **mesmo Bearer** da API do Kommo. A resposta vem **paginada** (`_links.next`) e traz, por arquivo: `uuid`, `name`, `type` (`image`/`video`/`document`), `size`, `created_at`, `source_id` e `_links.download.href`.
3. O link de download (`https://drive-c.kommo.com/download/<uuid-da-conta>/<uuid-do-arquivo>/video.mp4`) **não pede token** e redireciona para um link assinado do Google Storage. Baixa com `curl -L`.
4. Transcrição: `scripts/transcrever-videos-kommo.py` (ffmpeg + faster-whisper, modelo `small`, português). Detalhes e limites no script.
5. Tudo foi feito pelo fluxo temporário do n8n [`2cqdDHyFGAZOu0lz`](https://n8n.srv2164786.hstgr.cloud/workflow/2cqdDHyFGAZOu0lz) (só `GET`; **apagar depois**).

## 2. O que é esse Drive (importante)
- É o **armazenamento de arquivos das conversas** da conta (`source_id` `23084963` = canal WhatsApp "Dr Thiago V"), com pelo menos 1.000 arquivos (4 páginas lidas de 250 e há mais): sobretudo imagens, 32 vídeos e 14 documentos nas 4 primeiras páginas. A listagem tem ainda páginas além da 4ª, **não lidas**.
- Ele mistura **arquivos enviados pelo bot/equipe** e **arquivos recebidos de leads**. Não há flag para separar. **Inferência usada aqui:** o mesmo vídeo (mesmo tamanho em bytes) repetido várias vezes foi enviado a vários leads, logo é material da clínica; vídeo com 1 só cópia e cara de selfie é provavelmente de paciente/lead.
- Os **vídeos que o Eduardo viu no celular** (Dr Thiago na mesa, 0:54, e resultado facial da Dra Fernanda, 0:22 HD) **não foram encontrados** nas 4 páginas lidas (nenhum arquivo tem 54 s; o único de ~22 s é um vídeo de abdômen). Podem estar nas páginas 5+ ou em armazenamento próprio dos Salesbots. **Pendente.**
- Os nomes dos arquivos quase sempre são só `video`: **o nome não identifica o conteúdo**. Há exceções: `FOLLOW ABD`, `Flancos masc`, `WhatsApp Video 2026-11-17 at 14.48.32`.

## 3. Inventário dos 19 vídeos distintos (de 32 arquivos de vídeo lidos)
Distintos = tamanho em bytes diferente. "Cópias" = quantas vezes o mesmo arquivo aparece (indício de envio a vários leads). Fala = o que o Whisper detectou (modelo `small`, pode errar).

| # | Tamanho (bytes) | Duração | Cópias | Nome | Formato | Conteúdo | Fala | Origem provável |
|---|---|---|---|---|---|---|---|---|
| 1 | 12.194.672 | 1:41 | 1 | `video` | 9:16 | **Vídeo institucional da clínica** (fachada, consulta, centro cirúrgico, equipe) | **Sim, narração completa (§4.1)** | Material da clínica |
| 2 | 136.305.471 | 1:41 | 1 | `video` | 1080x1920 | Mesmo vídeo institucional em alta resolução | Idem (#1) | Material da clínica |
| 3 | 4.625.526 | 0:31 | 1 | `Flancos masc` | 9:16 | Procedimento ao vivo "EndoMELA flancos + lipoenxertia glútea", com foto antes inserida | **Sim, médico narra (§4.2)** | Material da clínica |
| 4 | 2.052.015 | 0:10 | 1 | `FOLLOW ABD` | 9:16 | Antes/depois de abdômen com **legendas** (§4.3) e trilha musical | Só música | Material da clínica (follow-up) |
| 5 | 5.697.580 | 0:26 | 7 | `WhatsApp Video 2026-11-17 at 14.48.32` / `video` | 9:16 | Antes/depois de tórax/abdômen ("Antes"/"Depois") | Só música | Material da clínica |
| 6 | 4.582.659 | 0:21 | 2 | `video` | 9:16 | Antes/depois de abdômen ("Antes"/"Depois") | Só música | Material da clínica |
| 7 | 2.442.340 | 0:11 | 2 | `video` | 9:16 | Depoimento de paciente (selfie) | Só música | Provável envio a vários leads |
| 8 | 1.370.665 | 0:07 | 2 | `video` | 9:16 | Rosto de paciente pós-procedimento (vermelhidão, edema), vários ângulos | **Sem áudio** | Provável envio a vários leads |
| 9 | 1.568.201 | 0:16 | 4 | `video` | 1:1 | Rosto de paciente, quadro dividido | Frase curta e incerta: "Baixe o cuchinho, levanta" | Provável envio a vários leads |
| 10 | 3.446.820 | 0:16 | 2 | `video` | 1:1 | Idem #9 (mesma frase) | Idem | Provável envio a vários leads |
| 11 | 4.384.089 | 0:22 | 1 | `video` | 576x832 | Paciente mostrando cicatriz/abdômen no espelho | **Sem áudio** | Provavelmente de paciente |
| 12 | 4.348.007 | 0:20 | 1 | `video` | 9:16 | Paciente (selfie, rosto/pescoço) | Nada claro | Provavelmente de paciente |
| 13 | 8.407.704 | 0:36 | 1 | `video` | 9:16 | Paciente fala das queixas faciais (marcas, "bigode") com a mão no rosto | **Sim, paciente fala (§4.4)** | Provavelmente de paciente |
| 14 | 5.922.627 | 0:34 | 1 | `video` | 1:1 | Quadro dividido, rosto de paciente (duas pessoas) | Nada | Provavelmente de paciente |
| 15 | 3.065.327 | 0:21 | 1 | `video` | 9:16 | Paciente mostra o rosto/papada, TV ao fundo | Nada | Provavelmente de paciente |
| 16 | 2.836.642 | 0:14 | 1 | `video` | 9:16 | Paciente mostra o abdômen/flancos | Nada | Provavelmente de paciente |
| 17 | 2.712.578 | 0:18 | 1 | `video` | 9:16 | Paciente se mostrando no espelho | Silêncio | Provavelmente de paciente |
| 18 | 2.533.448 | 0:15 | 1 | `video` | 9:16 | Paciente de costas mostrando o dorso | Nada | Provavelmente de paciente |
| 19 | 1.382.507 | 0:09 | 1 | `video` | 9:16 | Paciente mostrando as costas/cintura | **Sem áudio** | Provavelmente de paciente |

Onde o Whisper devolve "Música", "E aí" ou "Hello / Golden Youth" é a **trilha musical**, não fala (verificado: volume e legendas na tela).

## 4. Transcrições e textos em tela
Transcrição automática, **revisada pelo contexto**. Correções feitas: "Lei Contour" → "Le Contour", "Tiago" → "Thiago", "reossar/crescer" → "realçar/oferecer". Trecho entre colchetes = incerto.

### 4.1 Vídeo institucional (1:41), narração
> Seja muito bem-vindo à Le Contour Clinic. Localizada no coração [dos Jardins], em São Paulo, somos um hospital day que une tecnologia, experiência e atendimento personalizado para oferecer uma experiência completa aos nossos pacientes.
> Responsável pelos tratamentos de contorno corporal, está o doutor Thiago, médico cirurgião com mais de 15 anos de experiência, mais de 3 mil procedimentos realizados e criador da marca exclusiva de lipo localizada. Doutor Thiago tem três pós-graduações, uma residência médica e um MBA na área de gestão hospitalar.
> Na área facial contamos com a doutora Fernanda, que une conhecimento técnico e um olhar refinado para procedimentos e resultados naturais. Através de uma avaliação detalhada, ela analisa proporções, contornos e características únicas de cada rosto, buscando realçar a beleza de forma harmônica, sofisticada e natural, respeitando a identidade de cada paciente.
> A Le Contour Clinic conta com bloco cirúrgico próprio, com dois centros cirúrgicos totalmente equipados, além de uma equipe especializada e preparada para oferecer segurança em cada procedimento. A recuperação e o pós-operatório são o nosso cuidado contínuo depois do procedimento.
> Na Le Contour Clinic, tecnologia, experiência e cuidado caminham juntos para transformar sua autoestima com segurança e excelência. Seja bem-vindo à Le Contour Clinic.

Imagens: fachada, tablet mostrando o abdômen, médico se preparando, consulta com a Dra Fernanda, placa "Centro Cirúrgico", paciente na maca, o casal de médicos sorrindo. Legendas curtas sincronizadas ("a Le...", "transformar a ela…").

### 4.2 `Flancos masc` (0:31), médico narra o procedimento
> Então finalizamos aqui esse flanco masculino. No caso desse paciente também colocamos aqui uma lipoenxertia glútea. Ficou um resultado muito bom, muito bonito, bem marcado essa região aqui, do jeito que ele queria. Ficou ótimo.

Texto em tela: "EndoMELA Flancos + lipoenxertia glútea". Foto "antes" inserida no canto.

### 4.3 `FOLLOW ABD` (0:10), sem fala, legendas em tela
Sequência: "A gordura localizada" → "te incomoda?" → "Talvez seja a hora de dar o próximo passo" → "Cada caso precisa de uma avaliação individual" → **"Agende a sua consulta com o Dr. Thiago Virgili, CRM SP: 143.788"**. Imagens antes/depois de abdômen com trilha musical.

### 4.4 Paciente (0:36), fala espontânea
Paciente relata, apontando o rosto, que a idade vem chegando, que a parte de cima do rosto e as linhas ao lado da boca ("bigode") a incomodam. É conteúdo de paciente, **resumido** de propósito (não reproduzir literalmente).

### 4.5 Conferir
- O nome comercial na narração é "Le Contour Clinic" e na conta do Kommo "Le Contour" (account name). O CRM SP do Dr Thiago na legenda é `143.788`.
- Vídeo de procedimento (#3) e "antes/depois" são conteúdo regulado (CFM). Antes de reutilizar em outro médico, ver o roteiro e a nota de conformidade em [`roteiros-videos-medicos.md`](roteiros-videos-medicos.md).

## 5. Limites do estudo
- Só 4 páginas de 250 arquivos foram lidas; há mais.
- Os vídeos vistos no celular (0:54 e 0:22) **não foram localizados**.
- Não sei qual Salesbot envia qual vídeo (o Drive não registra isso).
- O Whisper `small` erra nomes próprios e falhas de fala. Nenhum texto aqui foi conferido com o médico.
- Não foram lidos os documentos (`document`) do Drive.
