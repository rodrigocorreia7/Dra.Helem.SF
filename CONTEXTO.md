# Contexto Mestre do Projeto: Dra. Hélem Machado Almeida (Site & Blog Oficial)

Este documento consolida todo o histórico, posicionamento de marca, regras éticas do CFM, arquitetura de software, soluções de engenharia, módulos de SEO e estratégias de conversão do site oficial da **Dra. Hélem Machado Almeida**.

---

## 1. Identidade do Projeto e Posicionamento Médico

- **Profissional**: Dra. Hélem Machado Almeida
- **Registro Profissional**: CRM 40098-SC
- **Diferencial Único de Posicionamento**: Dupla formação como **Médica** e **Psicóloga**, com foco em **Medicina do Estilo de Vida (MEV - Membro Associado ABMEV)**.
- **Nicho**: Medicina Integrativa, Metabólica e Hormonal (Classificado como nicho crítico **YMYL - Your Money or Your Life** pelas diretrizes de qualidade do Google).
- **Não é apenas estética**: O foco clínico é em diagnóstico laboratorial profundo, remissão de sintomas crônicos, reposição hormonal bioidêntica fundamentada em evidências, reversão de pré-diabetes/esteatose e saúde mental associada.
- **Pilares Clínicos de Atuação**:
  1. **Saúde da Mulher**: Modulação e reposição hormonal na pré-menopausa, climatério e menopausa (fogachos, insônia, libido, perda óssea/muscular, lipedema e distúrbios de tireoide/cortisol).
  2. **Saúde do Homem**: Andropausa, declínio de testosterona, sarcopenia, fadiga crônica, disfunção erétil, risco cardiovascular e saúde prostática (PSA, HPB).
  3. **Saúde Metabólica e Longevidade**: Tratamento e reversão de esteatose hepática não alcoólica (gordura no fígado), pré-diabetes, síndrome metabólica e dislipidemias.
  4. **Medicina Integrativa & Comportamental**: Integração corpo-mente na adesão a mudanças de hábitos e saúde neuroendócrina.
- **Modalidades de Atendimento**:
  - Consultas presenciais em Florianópolis / SC.
  - Telemedicina para pacientes de todo o Brasil e exterior, com prescrições digitais padrão CFM (ICP-Brasil).
  - Atendimento 100% particular com emissão de nota fiscal médica para reembolso nos planos de saúde.

---

## 2. Stack Tecnológica & Infraestrutura (`Site app 2`)

- **Core**: React 19 + TypeScript + Vite 7
- **Estilização**: Tailwind CSS v4 + Vanilla CSS otimizado para Core Web Vitals
- **Animações & Interatividade**: Framer Motion / Motion React
- **Roteamento**: React Router DOM v6 com suporte a navegação híbrida SPA (Home ancorada + Blog dinâmico `/blog` e `/blog/:slug`)
- **Hospedagem & CDN**: Vercel Edge Network com rewrite rules configuradas para SPA (`vercel.json`)
- **Tipografia Nobre**: `Josefin Sans` (Títulos e destaques de autoridade) + `REM` (Corpo de texto de alta legibilidade científica).

---

## 3. Engenharia e Desafios Superados no Projeto

1. **Hero Section com Scrub de Vídeo no Scroll**:
   - Vídeo médico de apresentação scrubbado frame-a-frame de acordo com o rolamento da página.
   - **Solução Cross-Platform / Safari iOS**:
     - Desbloqueio do autoplay em background no iOS via priming de carregamento assíncrono.
     - Vídeo comprimido com FFmpeg usando All-Intra (`-g 1`), chaveamento instantâneo de frames e sem faixa de áudio (`-an`) para evitar travamentos de hardware em dispositivos móveis.
2. **Módulo de Blog Clínico com Foco em E-E-A-T**:
   - Estrutura modular em `src/lib/blog.ts` contendo artigos de referência médica:
     - Reposição Hormonal na Menopausa
     - Queda de Testosterona Masculina (Andropausa)
     - Gordura no Fígado (Esteatose Hepática)
     - Medicina do Estilo de Vida e Cortisol
   - Cada artigo inclui: Índice interativo de tópicos (TOC), bloco de "Resposta Rápida" para AI Overviews/Featured Snippets, referências científicas, FAQ estruturado e CTAs contextuais para o WhatsApp da clínica.
3. **Gerenciamento de Navegação (`ScrollManager`)**:
   - Restauração automática de scroll para o topo ao acessar artigos do blog e preservação do scroll suave ao retornar para as âncoras da página principal.

---

## 4. Estrutura Atual de SEO, GEO e Metadados Técnicos

- **Core Web Vitals**: Pontuação máxima no Google PageSpeed Insights (Mobile e Desktop).
- **Metatags Canônicas**: Configuração estrita de `canonical` apontando para `https://www.drahelemmachado.com.br/`.
- **Geolocalização**: Meta tags `geo.region: BR-SC`, `geo.placename: Florianópolis` e coordenadas geográficas `ICBM`.
- **Schema.org em Grafo Interligado (JSON-LD)**:
  - `MedicalBusiness` e `Physician` (Dados da Dra. Hélem, CRM 40098-SC, especialidades, endereço, horários).
  - `ReserveAction` vinculando diretamente ao canal de agendamento.
  - `FAQPage` cobrindo dúvidas de reembolso, exames e telemedicina.
  - `BreadcrumbList` e `BlogPosting` para o blog.
- **Prontidão para Busca Agêntica (GEO / LLMO)**:
  - Arquivos `llms.txt` e `llms-full.txt` na raiz `public/`, liberados no `robots.txt` para rastreadores de IA (Perplexity, GPTBot, ClaudeBot, Gemini).
  - Tags `<meta name="ai:ready" content="true">` e metadados de descoberta semântica.
