# Contexto Mestre do Projeto: Dra. Hélem Machado Almeida (Site Oficial & Blog)

Este documento é a **Fonte Única da Verdade (Single Source of Truth)** do projeto. Ele consolida toda a arquitetura de software, posicionamento de marca, regras éticas do CFM, banco de dados, infraestrutura de segurança, módulos de SEO/Schema.org, analytics e status de produção da **Dra. Hélem Machado Almeida**.

> **ATENÇÃO PARA NOVAS SESSÕES / AGENTES**:
> O diretório de desenvolvimento e deploy oficial é **`SITE FINAL NEXT`** (Next.js 16 App Router). O diretório legado `Site app 2` (Vite SPA) não deve mais ser utilizado nem modificado. O repositório Git oficial conectado à Vercel é `https://github.com/rodrigocorreia7/Dra.Helem.SF.git` na branch `main`.

---

## 1. Identidade da Marca, Dados Oficiais e NAP (Name, Address, Phone)

- **Profissional**: Dra. Hélem Machado Almeida
- **Registro Profissional**: CRM 40098-SC
- **Diferencial Único de Posicionamento**: Dupla formação como **Médica** e **Psicóloga**, pós-graduanda/em especialização em **Tratamentos e Modulação Hormonal** (tanto para **saúde da mulher** quanto para **saúde do homem**), combinada com **Medicina do Estilo de Vida (MEV)**, saúde metabólica e conexão corpo-mente.
- **Entidade de Classe**: Membro do **Colégio Brasileiro de Medicina do Estilo de Vida (CBMEV)** — [cbmev.org.br](https://cbmev.org.br).
- **Nicho**: Medicina Integrativa, Tratamentos Hormonais (Andropausa/Testosterona masculina e Menopausa/Climatério feminino), Metabólica e Estilo de Vida (Classificado como nicho crítico **YMYL - Your Money or Your Life** pelo Google).
- **Endereço Físico Oficial**:
  - **Logradouro**: Rua 981, 196 - Centro
  - **Cidade/Estado**: Balneário Camboriú - SC
  - **CEP**: 88330-750
  - **País**: Brasil (`BR`)
  - **Geolocalização**: Latitude `-26.9842`, Longitude `-48.6378`
- **Contatos & Redes**:
  - **Telefone / WhatsApp**: `+55 47 9151-2620` (Institucional da clínica)
  - **E-mail**: `contato@drahelemmachado.com.br`
  - **Instagram**: `https://instagram.com/drahelemmachado`
  - **Doctoralia**: `https://www.doctoralia.com.br/helem-machado-almeida/medico-clinico-geral/balneario-camboriu`
- **Modalidades de Atendimento**:
  - Presencial em Balneário Camboriú / SC.
  - Telemedicina para pacientes de todo o Brasil e exterior, com prescrições e atestados com assinatura digital ICP-Brasil (em conformidade com a Resolução CFM nº 2.314/2022).
  - Atendimento 100% particular com emissão de nota fiscal médica para solicitação de reembolso em planos de saúde.

---

## 2. Stack Tecnológica & Infraestrutura (`SITE FINAL NEXT`)

- **Framework**: **Next.js 16.3.4 (App Router)** com Turbopack
- **Linguagem**: TypeScript (Strict Mode)
- **Renderização**: **SSG (Static Site Generation)** — Todas as páginas de conteúdo (Home, Sobre, Blog e Artigos) são pré-renderizadas como HTML puro no servidor, eliminando o problema de SPAs vazias (`<div id="root"></div>`) para os robôs de busca.
- **Hospedagem & CDN**: Vercel Edge Network
  - Configuração: `vercel.json` na raiz forçando `"framework": "nextjs"`.
- **Estilização**: Tailwind CSS v4 + Vanilla CSS otimizado para Core Web Vitals
- **Animações**: Framer Motion
- **Banco de Dados**: Supabase (PostgreSQL) com cliente resiliente e auto-wake interceptor.
- **Analytics**: Ahrefs Web Analytics (snippet no `<head>` de `app/layout.tsx`).

---

## 3. Segurança, Backend e Headers HTTP

### A. Headers de Segurança HTTP Globais (`next.config.ts`)
Configurados via `async headers()` para todas as rotas (`/(.*)`):
1. **`Referrer-Policy`**: `strict-origin-when-cross-origin`
2. **`X-Content-Type-Options`**: `nosniff`
3. **`X-Frame-Options`**: `SAMEORIGIN`
4. **`Content-Security-Policy` (CSP)**:
   ```text
   default-src 'self';
   script-src 'self' 'unsafe-inline' 'unsafe-eval' https://analytics.ahrefs.com;
   style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
   img-src 'self' data: https: blob:;
   font-src 'self' data: https://fonts.gstatic.com;
   media-src 'self' data: blob:;
   connect-src 'self' https://*.supabase.co https://analytics.ahrefs.com;
   worker-src 'self' blob:;
   frame-ancestors 'self';
   ```

### B. Endpoints de API Seguros (App Router)
- **`app/api/leads/route.ts`**:
  - `POST`: Cadastro público com sanitização rigorosa de caracteres de controle, validação de telefone (10 a 15 dígitos com DDD) e formato de e-mail RFC. Status padrão gravado como `'novo'`.
  - `GET`: **Protegido por Bearer Token** (`ADMIN_SECRET_KEY` ou `SUPABASE_SERVICE_ROLE_KEY`) em conformidade estrita com a LGPD e sigilo médico.
- **`app/api/faqs/route.ts`**: Consulta pública e ordenada de FAQs com cabeçalhos CORS.
- **`app/api/symptoms/route.ts`**: Consulta de sintomas filtrados por público (`mulheres`, `homens`, `geral`).
- **`app/api/testimonials/route.ts`**: Depoimentos públicos apenas onde `published: true`; novos envios são sanitizados e recebem `published: false` por padrão (moderação obrigatória).
- **`src/lib/db-client.ts` & `src/lib/db-wake.ts`**: Camada Supabase com fallbacks que não quebram o build SSG caso variáveis de ambiente não estejam configuradas em CI/CD.

---

## 4. Arquitetura de SEO, Dados Estruturados e E-E-A-T

### A. Sitemap Dinâmico Nativo (`app/sitemap.ts`)
Acessível na URL oficial: **`https://www.drahelemmachado.com.br/sitemap.xml`**
- Home (`/`): prioridade `1.0`, frequência `weekly`
- Blog (`/blog`): prioridade `0.8`, frequência `weekly`
- Sobre a Médica (`/sobre/dra-helem`): prioridade `0.8`, frequência `monthly`
- Artigos individuais (`/blog/[slug]`): prioridade `0.7`, frequência `monthly`, mapeados dinamicamente com a data real `dateModified || datePublished`.

### B. Dados Estruturados Schema.org JSON-LD (`Physician` / `MedicalBusiness`)
- Implementado em: `app/components/StructuredData.tsx` (re-export em `src/components/StructuredData.tsx`).
- Injetado no topo do `<body>` em `app/layout.tsx`.
- Validação oficial em **[validator.schema.org](https://validator.schema.org/)**: **0 ERROS e 0 AVISOS**.
- Valores canônicos de `medicalSpecialty`:
  ```json
  "medicalSpecialty": [
    "https://schema.org/Endocrine",
    "https://schema.org/PrimaryCare"
  ]
  ```
  *(Nota técnica: `PreventiveMedicine` não existe no Schema.org e gerava erro; `PrimaryCare` é a enumeração canônica exata).*
- Variáveis consumidas diretamente de `src/lib/site.ts` (DRY).

### C. Página de Autoria Médica E-E-A-T (`/sobre/dra-helem`)
- Rota dedicada `app/sobre/dra-helem/page.tsx` contendo biografia médica, CRM, dupla formação em Medicina e Psicologia, filiação ao CBMEV e Schema `ProfilePage` e `Person`.
- Todos os artigos do blog apontam o link de autor para esta página.
- Artigos clínicos possuem referências científicas formais (FEBRASGO, Endocrine Society, SBEM, EASL, CFM, CBMEV).

### D. Robots.txt e LLMO / GEO (`app/robots.ts`)
- Arquivo dinâmico `app/robots.ts` gerando `/robots.txt`.
- Libera explicitamente rastreadores de IA: `GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`, etc.
- Arquivos de contexto agêntico mantidos: `public/llms.txt` e `public/llms-full.txt`.

---

## 5. Estrutura de Diretórios Relevantes (`SITE FINAL NEXT`)

```text
SITE FINAL NEXT/
├── app/
│   ├── api/
│   │   ├── faqs/route.ts
│   │   ├── leads/route.ts          # Protegido por Bearer token no GET, validado no POST
│   │   ├── symptoms/route.ts
│   │   └── testimonials/route.ts
│   ├── blog/
│   │   ├── [slug]/page.tsx         # SSG por artigo com referências e Schema BlogPosting
│   │   └── page.tsx                # Listagem do blog
│   ├── components/
│   │   └── StructuredData.tsx      # Schema JSON-LD Physician/PrimaryCare
│   ├── sobre/
│   │   └── dra-helem/page.tsx      # Página de autoridade médica (E-E-A-T)
│   ├── layout.tsx                  # Layout raiz com Ahrefs script, StructuredData e fontes
│   ├── page.tsx                    # Landing page principal
│   ├── robots.ts                   # Robots dinâmico com permissão para IAs
│   └── sitemap.ts                  # Sitemap dinâmico oficial (/sitemap.xml)
├── src/
│   ├── components/                 # Componentes de UI (Hero, About, Audiences, BookingModal, etc.)
│   └── lib/
│       ├── blog.ts                 # Artigos e metadados clínicos do blog
│       ├── db-client.ts            # Cliente Supabase com auto-wake
│       ├── db-wake.ts              # Wake helper
│       └── site.ts                 # Constantes mestre (NAP, contatos, CRM, coordenadas)
├── next.config.ts                  # Configuração do Next.js 16 com headers de segurança HTTP (CSP, etc.)
├── vercel.json                     # Força preset Next.js na Vercel
└── package.json
```

---

## 6. Histórico Recente de Commits Importantes (GitHub `origin/main`)

- `30c4906`: Migração dos endpoints de segurança (`leads`, `faqs`, `symptoms`, `testimonials`), criação do `vercel.json` e conserto do build da Vercel.
- `c1f1678`: Implementação do sitemap dinâmico nativo e componente `StructuredData`.
- `c9f478b`: Instalação do Ahrefs Web Analytics no `<head>`.
- `d190b05`: Inclusão global dos 4 headers de segurança HTTP (CSP, Referrer-Policy, nosniff, SAMEORIGIN).
- `e6f781d`: Correção canônica de `medicalSpecialty` para `PrimaryCare`, atingindo 0 erros no validador do Schema.org.
