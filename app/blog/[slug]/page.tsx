import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_BASE, blogPosts, getPost, type BlogBlock } from '../../../src/lib/blog';
import { site, whatsappLink } from '../../../src/lib/site';

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`));
}

function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith('**') ? (
          <strong key={index} className="font-bold text-forest">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}

function wordCount(blocks: BlogBlock[]) {
  return blocks.reduce((total, block) => {
    if ('text' in block) return total + block.text.split(/\s+/).filter(Boolean).length;
    if ('items' in block) return total + block.items.join(' ').split(/\s+/).filter(Boolean).length;
    return total;
  }, 0);
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const path = `/blog/${post.slug}`;

  return {
    title: post.metaTitle,
    description: post.metaDesc,
    keywords: post.keywords,
    alternates: {
      canonical: path,
    },
    authors: [{ name: site.doctor }],
    openGraph: {
      type: 'article',
      url: path,
      title: post.metaTitle,
      description: post.metaDesc,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [site.doctor],
      images: [post.image.src],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDesc,
      images: [post.image.src],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const canonical = `${BLOG_BASE}/blog/${post.slug}`;
  const ogImage = `${BLOG_BASE}${post.image.src}`;
  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);
  const toc = post.blocks.filter(
    (block): block is { type: 'h2'; id: string; text: string } => block.type === 'h2',
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
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
          url: `${BLOG_BASE}/sobre/dra-helem`,
          sameAs: [
            site.instagram,
            'https://www.doctoralia.com.br/helem-machado-de-almeida/clinico-geral/itajai',
          ],
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
        wordCount: wordCount(post.blocks),
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonical}#faq`,
        mainEntity: post.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: `${BLOG_BASE}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BLOG_BASE}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-ivory text-[#192420]">
        <nav aria-label="Breadcrumb" className="border-b border-forest/10 bg-ivory px-5 py-4 text-xs text-forest/60 sm:px-8">
          <div className="mx-auto flex max-w-4xl flex-wrap gap-1.5">
            <Link href="/" className="hover:text-forest hover:underline">
              Início
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-forest hover:underline">
              Blog
            </Link>
            <span>/</span>
            <span className="line-clamp-1 text-forest/80">{post.title}</span>
          </div>
        </nav>

        <article className="bg-ivory px-5 pb-16 pt-8 sm:px-8">
          <div className="mx-auto max-w-4xl">
            <span className="inline-flex rounded-full bg-forest/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-sage">
              {post.category}
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-forest sm:text-[2.2rem]">
              {post.title}
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-forest/70">{post.excerpt}</p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-forest/60">
              <span className="inline-flex items-center gap-2">
                <Image
                  src="/images/Dra_Helem_2.webp"
                  alt={site.doctor}
                  width={56}
                  height={56}
                  className="h-7 w-7 rounded-full border border-forest/10 object-cover"
                  loading="lazy"
                />
                <span className="font-semibold text-forest">{site.doctor}</span>
                <span>{site.crm}</span>
              </span>
              <span>Atualizado em {formatDate(post.dateModified)}</span>
              <span>{post.readingMinutes} min de leitura</span>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-forest/10">
              <Image
                src={post.image.src}
                alt={post.image.alt}
                width={1200}
                height={675}
                sizes="(min-width: 1024px) 896px, 100vw"
                className="aspect-[16/9] w-full object-cover"
                priority
              />
            </div>

            {post.blocks[0]?.type === 'answer' && (
              <div className="mt-8 rounded-2xl border border-sage/20 bg-sage/5 p-5 sm:p-6">
                <p className="text-[11px] font-bold uppercase tracking-wider text-sage">Resposta direta</p>
                <p className="mt-2 text-[15px] leading-relaxed text-forest">{post.blocks[0].text}</p>
              </div>
            )}

            {toc.length > 0 && (
              <nav aria-label="Sumário" className="mt-8 rounded-2xl border border-forest/10 bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-forest">Neste artigo</p>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {toc.map((heading) => (
                    <li key={heading.id}>
                      <a href={`#${heading.id}`} className="text-forest/70 hover:text-clay hover:underline">
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <div className="mt-8 max-w-none">
              {post.blocks.slice(1).map((block, index) => {
                if (block.type === 'h2') {
                  return (
                    <h2 key={index} id={block.id} className="scroll-mt-28 pt-10 font-display text-xl font-bold text-forest sm:text-2xl">
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === 'p') {
                  return (
                    <p key={index} className="mt-4 text-[15px] leading-7 text-forest/80">
                      <Inline text={block.text} />
                    </p>
                  );
                }
                if (block.type === 'list') {
                  return (
                    <ul key={index} className="mt-4 list-disc space-y-1.5 pl-5 text-[15px] leading-7 text-forest/80 marker:text-clay">
                      {block.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <Inline text={item} />
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (block.type === 'quote') {
                  return (
                    <blockquote key={index} className="mt-6 border-l-4 border-clay/40 bg-clay/5 py-3 pl-4 text-[15px] italic leading-relaxed text-forest/80">
                      {block.text}
                    </blockquote>
                  );
                }
                if (block.type === 'cta') {
                  return (
                    <div key={index} className="mt-10 rounded-2xl bg-forest p-6 text-ivory sm:p-7">
                      <p className="font-display text-lg font-bold">Quer avaliar seu caso com profundidade?</p>
                      <p className="mt-2 text-sm text-ivory/80">
                        Agende uma consulta presencial em SC ou por telemedicina para todo o Brasil.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <a
                          href={whatsappLink(`Olá, li o artigo "${post.title}" e gostaria de avaliar meu caso.`)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-full bg-[#075e54] px-6 py-3 text-sm font-bold text-white hover:bg-[#0b7367]"
                        >
                          Falar no WhatsApp
                        </a>
                        <Link
                          href="/#processo"
                          className="inline-flex items-center justify-center rounded-full border border-ivory/30 px-6 py-3 text-sm font-semibold text-ivory hover:bg-ivory hover:text-forest"
                        >
                          Como funciona a jornada
                        </Link>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>

            <div className="mt-10 rounded-2xl border border-forest/10 bg-white p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-sage">Sobre a autora - E-E-A-T</p>
              <div className="mt-3 flex gap-4">
                <Image
                  src="/images/Dra_Helem_1.webp"
                  alt={site.doctor}
                  width={112}
                  height={112}
                  className="h-14 w-14 rounded-full border border-forest/10 object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="text-sm font-bold text-forest">
                    {site.doctor} - {site.crm} - {site.titles}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-forest/70">
                    Membro do Colégio Brasileiro de Medicina do Estilo de Vida (CBMEV). Conteúdo de caráter informativo, revisado clinicamente e alinhado ao Código de Ética Médica do CFM. Não substitui consulta individual.
                  </p>
                  <Link
                    href="/sobre/dra-helem"
                    className="mt-2 inline-block text-xs font-semibold text-forest underline hover:text-clay"
                  >
                    Ver perfil e credenciais da Dra. Hélem →
                  </Link>
                </div>
              </div>
            </div>

            <section className="mt-10">
              <h2 className="font-display text-xl font-bold text-forest">Dúvidas frequentes</h2>
              <div className="mt-4 divide-y divide-forest/10 rounded-2xl border border-forest/10 bg-white">
                {post.faqs.map((faq, index) => (
                  <details key={index} className="group p-5 open:bg-ivory-deep/40">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-forest">
                      {faq.q}
                      <span className="text-lg leading-none text-clay transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-forest/70">{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {post.references && post.references.length > 0 && (
              <section className="mt-10 rounded-2xl border border-forest/10 bg-white/70 p-5 sm:p-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-sage">
                  Referências & Diretrizes Científicas (E-E-A-T)
                </h3>
                <ul className="mt-3 space-y-1.5 text-xs text-forest/75 list-disc pl-4 leading-relaxed">
                  {post.references.map((ref, idx) => (
                    <li key={idx}>{ref}</li>
                  ))}
                </ul>
              </section>
            )}

            <section className="mt-10">
              <h2 className="font-display text-lg font-bold text-forest">Continue lendo</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="group overflow-hidden rounded-2xl border border-forest/10 bg-white transition-shadow hover:shadow-md"
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-ivory-deep">
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        width={640}
                        height={360}
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-sage">{item.category}</p>
                      <p className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-forest group-hover:text-clay">
                        {item.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/blog" className="mt-4 inline-flex text-sm font-semibold text-clay hover:underline">
                Ver todos os artigos
              </Link>
            </section>

            <p className="mt-10 text-xs leading-relaxed text-forest/50">
              Aviso médico: este conteúdo é educativo e não substitui avaliação médica individual. Decisões sobre
              diagnóstico, exames e tratamento devem ser tomadas em consulta com profissional habilitado.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
