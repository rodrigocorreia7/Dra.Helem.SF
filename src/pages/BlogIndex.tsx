import { useState } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../components/blog/SeoHead';
import { blogPosts, categories, BLOG_BASE } from '../lib/blog';

export default function BlogIndex() {
  const [active, setActive] = useState<string>('Todos');
  const filtered = active === 'Todos' ? blogPosts : blogPosts.filter(p => p.category === active);

  return (
    <>
      <SeoHead
        title="Blog — Saúde hormonal e metabólica | Dra. Hélem Machado Almeida"
        description="Artigos revisados pela Dra. Hélem sobre menopausa, andropausa, esteatose, tireoide e telemedicina. Conteúdo informativo, sem promessas, com base clínica."
        canonical={`${BLOG_BASE}/blog`}
        ogImage={`${BLOG_BASE}/images/Dra_Helem_1.webp`}
        ogType="website"
        jsonLd={[
          {
            '@type': 'Blog',
            '@id': `${BLOG_BASE}/blog#blog`,
            name: 'Blog Dra. Hélem Machado Almeida',
            description: 'Artigos sobre saúde hormonal e metabólica revisados por médica.',
            inLanguage: 'pt-BR',
            url: `${BLOG_BASE}/blog`,
            publisher: { '@id': `${BLOG_BASE}/#physician` },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Início', item: `${BLOG_BASE}/` },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BLOG_BASE}/blog` },
            ],
          },
          {
            '@type': 'ItemList',
            itemListElement: blogPosts.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `${BLOG_BASE}/blog/${p.slug}`,
              name: p.title,
            })),
          },
        ]}
      />

      <section className="px-5 py-10 sm:px-8 sm:py-14 bg-ivory border-b border-forest/10">
        <div className="mx-auto max-w-6xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-clay">Blog</p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-forest max-w-3xl">Saúde hormonal e metabólica, explicada com calma e responsabilidade</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-forest/70">
            Conteúdo informativo revisado pela Dra. Hélem Machado Almeida (CRM 40098-SC). Sem “antes e depois”, sem promessas absolutas — apenas o que a investigação e o acompanhamento podem oferecer, dentro das diretrizes do CFM.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {['Todos', ...categories].map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-colors ${active === cat ? 'bg-forest text-ivory border-forest' : 'bg-white text-forest/80 border-forest/15 hover:border-forest/30'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 sm:py-12 bg-[#faf8f5]">
        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(post => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="group overflow-hidden rounded-[1.5rem] border border-forest/10 bg-white shadow-sm hover:shadow-lg transition-all">
              <div className="aspect-[16/10] overflow-hidden bg-ivory-deep">
                <img src={post.image.src} alt={post.image.alt} className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2 text-[11px] text-forest/60">
                  <span className="rounded-full bg-forest/5 px-3 py-1 font-bold uppercase tracking-wider text-sage">{post.category}</span>
                  <span>•</span>
                  <span>{post.readingMinutes} min</span>
                </div>
                <h2 className="mt-3 font-display text-[17px] font-bold leading-snug text-forest group-hover:text-clay line-clamp-3">{post.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-forest/60 line-clamp-2">{post.excerpt}</p>
                <span className="mt-4 inline-flex text-xs font-semibold text-clay group-hover:underline">Ler artigo →</span>
              </div>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && <p className="mx-auto max-w-6xl py-12 text-center text-sm text-forest/60">Nenhum artigo nesta categoria.</p>}
      </section>
    </>
  );
}
