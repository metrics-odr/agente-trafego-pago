# Roteiros padronizados de vídeo e mensagem (replicar para outros médicos)

Base: o que está rodando na Le Contour (Dr Thiago Virgili e Dra Fernanda), extraído em 20/11/2026. Fonte e transcrições: [`kommo-videos-contour-clinique.md`](kommo-videos-contour-clinique.md). Onde aplicar no Kommo: [Manual de Implementação](manual-implementacao-kommo.md), Fase 8.

> **Como usar:** trocar tudo que está entre `[colchetes]`. **Não inventar credencial, número, prazo ou resultado**: tudo que for afirmação sobre o médico vem do próprio médico ou da clínica. Nada daqui foi aprovado por médico ou compliance.
>
> **Nota de conformidade (não é parecer jurídico):** vídeo de resultado, "antes/depois", procedimento ao vivo e depoimento são conteúdo regulado pelo CFM (Resolução CFM 2.336/2023 trata de publicidade médica) e exigem **autorização escrita do paciente**. Confirmar com o responsável técnico da clínica antes de usar em anúncio ou automação, principalmente "antes/depois" e promessas de resultado. Cada roteiro abaixo traz o ponto de atenção.

## 0. Padrões técnicos observados
| Tipo | Formato | Duração | Áudio | Onde aparece no funil |
|---|---|---|---|---|
| Institucional | 9:16 (1080x1920) | ~100 s | Narração + legendas curtas | Boas-vindas / confiança |
| Procedimento narrado | 9:16 | ~30 s | Voz do médico | Prova de competência |
| Antes/depois legendado | 9:16 | 10–26 s | Só trilha | Follow-up por segmento |
| Depoimento de paciente | 9:16 ou 1:1 | 10–36 s | Voz do paciente ou trilha | Prova social |
Regras gerais: MP4, vertical 9:16 para WhatsApp/Stories/Reels (ver regra de posicionamentos do `CLAUDE.md`), legenda na tela (muita gente assiste sem som), identificação do médico com **nome e CRM** no fim.

## 1. Institucional da clínica (~100 s, narração)
Estrutura real, em 7 blocos (tempo aproximado):
| Bloco | Tempo | Conteúdo | Texto-modelo |
|---|---|---|---|
| 1. Boas-vindas e lugar | 0–13 s | Nome, bairro/cidade, o que é a clínica | "Seja muito bem-vindo à [CLÍNICA]. Localizada no coração de [BAIRRO], em [CIDADE], somos [TIPO DE ESTRUTURA, ex.: um hospital day] que une tecnologia, experiência e atendimento personalizado para oferecer uma experiência completa aos nossos pacientes." |
| 2. Médico 1 e área | 13–42 s | Nome, especialidade, credenciais verificáveis | "Responsável pelos tratamentos de [ÁREA], está [DR/DRA] [NOME], [ESPECIALIDADE] com [N] anos de experiência, [N] procedimentos realizados[, criador da marca/técnica X]. [FORMAÇÃO: pós-graduações, residência, MBA]." |
| 3. Médico 2 e área | 42–69 s | Segunda especialidade e abordagem | "Na área [ÁREA 2] contamos com [DR/DRA] [NOME], que une conhecimento técnico e um olhar refinado para procedimentos e resultados naturais. Através de uma avaliação detalhada, analisa [o que avalia], respeitando a identidade de cada paciente." |
| 4. Estrutura | 69–84 s | Bloco cirúrgico, equipe, segurança | "A [CLÍNICA] conta com [ESTRUTURA REAL: bloco cirúrgico próprio, N centros cirúrgicos equipados], além de equipe especializada para oferecer segurança em cada procedimento." |
| 5. Pós-operatório | 84–88 s | Cuidado contínuo | "A recuperação e o pós-operatório são o nosso cuidado contínuo depois do procedimento." |
| 6. Fecho | 88–100 s | Promessa de valor + boas-vindas | "Na [CLÍNICA], tecnologia, experiência e cuidado caminham juntos para transformar sua autoestima com segurança e excelência. Seja bem-vindo à [CLÍNICA]." |
Imagens que acompanham: fachada, consulta, equipamentos, centro cirúrgico, equipe, médicos sorrindo, paciente em atendimento (com autorização).
**Atenção:** número de procedimentos e anos de experiência precisam ser **comprováveis**. Com um só médico, pular o bloco 3.

## 2. Procedimento narrado pelo médico (~30 s)
Modelo (extraído do vídeo "Flancos masc"):
1. **Abertura** (0–9 s), médico na sala: "Então finalizamos aqui [PROCEDIMENTO] [DESCRIÇÃO NEUTRA DO PACIENTE, ex.: nesse paciente]."
2. **Complemento** (9–25 s): "No caso desse paciente também realizamos [PROCEDIMENTO ASSOCIADO]. Ficou um resultado [ADJETIVO COERENTE COM O QUE SE VÊ], [DETALHE DA REGIÃO]."
3. **Fecho** (25–30 s): "Do jeito que ele queria." (ou o objetivo do paciente, **sem prometer resultado a quem assiste**).
Em tela: nome do procedimento ("[PROCEDIMENTO] + [ASSOCIADO]") e foto "antes" no canto.
**Atenção:** mostrar procedimento real exige consentimento e cuidado com identificação do paciente; evitar linguagem de promessa.

## 3. Antes/depois legendado, sem fala (10–26 s)
Estrutura real do "FOLLOW ABD", um por **segmento** (Abdômen Fem, Abdômen Masc, Tórax, Braços, Glúteos, Facial):
| Quadro | Legenda em tela |
|---|---|
| 1 | "[QUEIXA DO SEGMENTO, ex.: A gordura localizada]" |
| 2 | "[QUEIXA]... te incomoda?" |
| 3 | "Talvez seja a hora de dar o próximo passo" |
| 4 | "Cada caso precisa de uma avaliação individual" |
| 5 (fecho) | "Agende a sua consulta com [DR/DRA] [NOME COMPLETO]<br>CRM [UF] [NÚMERO]" |
Imagens: antes/depois do segmento + trilha musical sem letra. Cada segmento tem seu vídeo (os bots de follow-up são por segmento).
**Atenção:** "Cada caso precisa de uma avaliação individual" é a frase que protege a comunicação: manter sempre.

## 4. Depoimento de paciente (10–36 s)
Roteiro guia para **gravar o paciente** (perguntas, não texto decorado):
1. "O que mais te incomodava antes de procurar a clínica?"
2. "Como foi o atendimento e a avaliação?"
3. "Como você se sente hoje?"
Regras: o paciente fala em primeira pessoa e com as próprias palavras; **nada de prometer resultado** nem citar preço; termo de uso de imagem assinado; se for enviado por automação, indicar que é depoimento individual.

## 5. Mensagens de texto do funil de follow-up
Textos observados no WhatsApp do Eduardo (20/11/2026). Persona usada: **"Kevelyn, assistente da Le Contour"**. Adaptar nome, clínica e médico.

| Momento | Observado | Modelo |
|---|---|---|
| Resposta ao 1º contato | "Olá, bom dia! Tudo bem? 😊 Sou a Kevelyn, assistente da Le Contour. Para eu te orientar melhor, me conta: qual é a sua principal queixa corporal ou facial hoje?" | "Olá, [bom dia/boa tarde]! Tudo bem? 😊 Sou [ATENDENTE], assistente da [CLÍNICA]. Para eu te orientar melhor, me conta: qual é a sua principal queixa [ÁREA(S) DA CLÍNICA] hoje?" |
| Follow-up com vídeo do médico (~8 dias sem resposta) | "Se esse também é o seu sonho, nós podemos te ajudar! Às vezes, tudo começa com a decisão de dar o primeiro passo em direção ao que você deseja. O que acha de começarmos a transformar esse objetivo em um plano para você?" (vídeo do médico, 0:54) | "Se esse também é o seu objetivo, nós podemos te ajudar! Às vezes tudo começa com a decisão de dar o primeiro passo. O que acha de começarmos a transformar esse objetivo em um plano para você?" + vídeo do médico |
| Follow-up com outra especialidade (~13 dias) | "Oiee! 💗 Você sabia que aqui na clínica também cuidamos da parte facial? 😍 Olha esses resultados lindos de pacientes que fizeram a harmonização Full Face com a Dra. Fernanda! Ela faz um planejamento personalizado para valorizar os traços de cada pessoa ✨ Me conta, você já pensou em fazer algo para realçar…" (restante cortado) | "Oiee! Você sabia que aqui na clínica também cuidamos de [ÁREA 2]? Olha esses resultados de pacientes que fizeram [PROCEDIMENTO] com [DR/DRA]. Ela faz um planejamento personalizado para valorizar os traços de cada pessoa. Me conta, você já pensou em [PERGUNTA DE ABERTURA]?" |
Textos completos, tempos entre mensagens e qual bot envia cada uma: ainda **a documentar** (ver manual de infraestrutura §2.7.1).
**Atenção:** a mensagem 3 fala de uma segunda especialista; só replicar se a clínica tiver mais de um profissional/área e o lead aceitar esse contato.

## 6. Checklist para entregar um kit a outro médico
- [ ] Nome, CRM/UF e especialidade(s) confirmados pelo médico
- [ ] Credenciais e números do institucional **verificados** (anos, nº de procedimentos, formação)
- [ ] Termos de uso de imagem de cada paciente
- [ ] Um vídeo antes/depois legendado **por segmento** da clínica
- [ ] 1 vídeo do médico (30–60 s) se apresentando e convidando para a consulta
- [ ] Textos das mensagens adaptados (persona, clínica, médico)
- [ ] Revisão de conformidade (CFM) pelo responsável da clínica
- [ ] Arquivos em MP4 vertical, com legenda em tela, nome de arquivo **descritivo** (no Kommo hoje quase tudo se chama `video`)
- [ ] Registrar no manual de infraestrutura do cliente qual bot envia cada vídeo, o texto e o intervalo
