# Dra. Helem Machado Almeida - Site Next.js

Versao Next.js do site institucional, com home, blog estatico, rotas SEO, sitemap, robots e endpoint de leads.

## Desenvolvimento

- `npm run dev`: abre o servidor local.
- `npm run build`: valida a versao de producao.
- `npm run start`: executa a build de producao localmente.

## Rotas

- `/`
- `/blog`
- `/blog/[slug]`
- `/api/leads`

Variaveis para envio de leads: `NEXT_PUBLIC_SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`.
