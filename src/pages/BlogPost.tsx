import { Link, useParams, Navigate } from 'react-router-dom';
import SeoHead from '../components/blog/SeoHead';
import { getPost, blogPosts, BLOG_BASE } from '../lib/blog';
import { site, whatsappLink } from '../lib/site';

function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('**') ? <strong key={i} className="font-bold text-forest">{p.slice(2, -2)}</strong> : <span key={i}>{p}</span>,
      )}
    </>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = slug ? getPost(slug) : undefined;
  if (!post) return <Navigate to="/blog" replace />;

  const canonical = `${BLOG_BASE}/blog/${post.slug}`;
  const ogImage = `${BLOG_BASE}${post.image.src}`;
  const related = blogPosts.filter(p => p.slug !== post.slug).slice(0, 2);

  const articleLd = {
    '@type': 'BlogPosting',
    '@id': `${canonical}#article`,
    headline: post.title,
    description: post.metaDesc,
    image: ogImage,
    inLanguage: 'pt-BR',
    isAccessibleForFree: true,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: {
      '@type': 'Person',
      name: site.doctor,
      jobTitle: site.titles,
      identifier: site.crm,
      url: `${BLOG_BASE}/#sobre`,
      sameAs: site.instagram,
    },
    publisher: {
      '@type': 'Organization',
      name: site.doctor,
      url: BLOG_BASE,
      logo: { '@type': 'ImageObject', url: `${BLOG_BASE}/images/logo_icone.webp` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    keywords: post.keywords.join(', '),
    articleSection: post.category,
    wordCount: post.blocks.reduce((a, b) => a + (('text' in b && b.text) ? b.text.split(/\s+/).length : 0), 0),
  };

  const faqLd = {
    '@type': 'FAQPage',
    '@id': `${canonical}#faq`,
    mainEntity: post.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbLd = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: `${BLOG_BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BLOG_BASE}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
    ],
  };

  const toc = post.blocks.filter(b => b.type === 'h2') as { type: 'h2'; id: string; text: string }[];

  return (
    <>
      <SeoHead
        title={post.metaTitle}
        description={post.metaDesc}
        canonical={canonical}
        ogImage={ogImage}
        ogType="article"
        keywords={post.keywords}
        jsonLd={[articleLd, faqLd, breadcrumbLd]}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="px-5 sm:px-8 py-4 bg-ivory border-b border-forest/10 text-xs text-forest/60">
        <div className="mx-auto max-w-4xl flex flex-wrap gap-1.5">
          <Link to="/" className="hover:text-forest hover:underline">Início</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-forest hover:underline">Blog</Link>
          <span>/</span>
          <span className="text-forest/80 line-clamp-1">{post.title}</span>
        </div>
      </nav>

      <article className="px-5 sm:px-8 pb-16 pt-8 bg-ivory">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex rounded-full bg-forest/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-sage">{post.category}</span>
          <h1 className="mt-3 font-display text-3xl sm:text-[2.2rem] font-bold leading-tight text-forest">{post.title}</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-forest/70">{post.excerpt}</p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-forest/60">
            <span className="inline-flex items-center gap-2">
              <img src="/images/Dra_Helem_2.webp" alt={site.doctor} className="h-7 w-7 rounded-full object-cover border border-forest/10" loading="lazy" />
              <span className="font-semibold text-forest">{site.doctor}</span>
              <span>· {site.crm}</span>
            </span>
            <span>•</span>
            <time dateTime={post.dateModified}>Atualizado em {new Date(post.dateModified).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</time>
            <span>•</span>
            <span>{post.readingMinutes} min de leitura</span>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-forest/10">
            <img src={post.image.src} alt={post.image.alt} className="w-full aspect-[16/9] object-cover" loading="eager" />
          </div>

          {/* Answer box for snippet/GEO */}
          {post.blocks[0]?.type === 'answer' && (
            <div className="mt-8 rounded-2xl border border-sage/20 bg-sage/5 p-5 sm:p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-sage">Resposta direta</p>
              <p className="mt-2 text-[15px] leading-relaxed text-forest">{post.blocks[0].text}</p>
            </div>
          )}

          {/* TOC */}
          {toc.length > 0 && (
            <nav aria-label="Sumário" className="mt-8 rounded-2xl border border-forest/10 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-forest">Neste artigo</p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {toc.map(h => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="text-forest/70 hover:text-clay hover:underline">— {h.text}</a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Content */}
          <div className="prose prose-neutral max-w-none mt-8 prose-p:text-forest/80 prose-strong:text-forest prose-headings:font-display prose-headings:text-forest">
            {post.blocks.slice(1).map((b, i) => {
              if (b.type === 'h2') return <h2 key={i} id={b.id} className="scroll-mt-28 mt-10 font-display text-xl sm:text-2xl font-bold text-forest">{b.text}</h2>;
              if (b.type === 'p') return <p key={i} className="mt-4 text-[15px] leading-7 text-forest/80"><Inline text={b.text} /></p>;
              if (b.type === 'list') return (
                <ul key={i} className="mt-4 list-disc pl-5 space-y-1.5 text-[15px] leading-7 text-forest/80 marker:text-clay">
                  {b.items.map((it, j) => <li key={j}><Inline text={it} /></li>)}
                </ul>
              );
              if (b.type === 'quote') return <blockquote key={i} className="mt-6 border-l-4 border-clay/40 bg-clay/5 pl-4 py-3 text-[15px] italic leading-relaxed text-forest/80">{b.text}</blockquote>;
              if (b.type === 'cta') return (
                <div key={i} className="mt-10 rounded-2xl bg-forest p-6 sm:p-7 text-ivory">
                  <p className="font-display text-lg font-bold">Quer avaliar seu caso com profundidade?</p>
                  <p className="mt-2 text-sm text-ivory/80">Agende uma consulta (presencial em SC ou telemedicina para todo o Brasil) e receba um plano individualizado.</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a href={whatsappLink(`Olá, li o artigo "${post.title}" e gostaria de avaliar meu caso.`)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#075e54] px-6 py-3 text-sm font-bold text-white hover:bg-[#0b7367]">Falar no WhatsApp</a>
                    <Link to="/#processo" className="inline-flex items-center justify-center rounded-full border border-ivory/30 px-6 py-3 text-sm font-semibold text-ivory hover:bg-ivory hover:text-forest">Como funciona a jornada</Link>
                  </div>
                </div>
              );
              return null;
            })}
          </div>

          {/* E-E-A-T footer */}
          <div className="mt-10 rounded-2xl border border-forest/10 bg-white p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-sage">Sobre a autora · E-E-A-T</p>
            <div className="mt-3 flex gap-4">
              <img src="/images/Dra_Helem_1.webp" alt={site.doctor} className="h-14 w-14 rounded-full object-cover border border-forest/10" loading="lazy" />
              <div>
                <p className="text-sm font-bold text-forest">{site.doctor} — {site.crm} · {site.titles}</p>
                <p className="mt-1 text-xs leading-relaxed text-forest/70">Membro Associado da ABMEV. Conteúdo de caráter informativo, revisado clinicamente e alinhado ao Código de Ética Médica do CFM. Não substitui consulta individual.</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <section className="mt-10">
            <h2 className="font-display text-xl font-bold text-forest">Dúvidas frequentes</h2>
            <div className="mt-4 divide-y divide-forest/10 rounded-2xl border border-forest/10 bg-white">
              {post.faqs.map((f, i) => (
                <details key={i} className="group p-5 open:bg-ivory-deep/40">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-forest">
                    {f.q}
                    <span className="text-clay group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-forest/70">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Related */}
          <section className="mt-10">
            <h2 className="font-display text-lg font-bold text-forest">Continue lendo</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.map(r => (
                <Link key={r.slug} to={`/blog/${r.slug}`} className="group overflow-hidden rounded-2xl border border-forest/10 bg-white hover:shadow-md transition-shadow">
                  <div className="aspect-[16/9] overflow-hidden bg-ivory-deep">
                    <img src={r.image.src} alt={r.image.alt} className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-sage">{r.category}</p>
                    <p className="mt-1 text-sm font-bold leading-snug text-forest group-hover:text-clay line-clamp-2">{r.title}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/blog" className="mt-4 inline-flex text-sm font-semibold text-clay hover:underline">Ver todos os artigos →</Link>
          </section>

          <p className="mt-10 text-xs leading-relaxed text-forest/50">
            Aviso médico: este conteúdo é educativo e não substitui avaliação médica individual. Decisões sobre diagnóstico, exames e tratamento devem ser tomadas em consulta com profissional habilitado.
          </p>
        </div>
      </article>
    </>
  );
}
