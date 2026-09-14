import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_BASE, blogPosts, categories } from '../../src/lib/blog';

const title = 'Blog - Saúde hormonal e metabólica | Dra. Hélem Machado Almeida';
const description =
  'Artigos revisados pela Dra. Hélem sobre menopausa, andropausa, esteatose, tireoide e telemedicina. Conteúdo informativo, sem promessas, com base clínica.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    type: 'website',
    url: '/blog',
    title,
    description,
    images: ['/images/Dra_Helem_1.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/Dra_Helem_1.webp'],
  },
};

export default function BlogPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
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
        itemListElement: blogPosts.map((post, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${BLOG_BASE}/blog/${post.slug}`,
          name: post.title,
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-[#faf8f5] text-[#192420]">
        <section className="border-b border-forest/10 bg-ivory px-5 py-10 sm:px-8 sm:py-14">
          <div className="mx-auto max-w-6xl">
            <Link href="/" className="text-xs font-bold uppercase tracking-[0.18em] text-forest/55 hover:text-clay">
              Início
            </Link>
            <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.22em] text-clay">Blog</p>
            <h1 className="mt-2 max-w-3xl font-display text-3xl font-bold text-forest sm:text-4xl">
              Saúde hormonal e metabólica, explicada com calma e responsabilidade
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-forest/70">
              Conteúdo informativo revisado pela Dra. Hélem Machado Almeida (CRM 40098-SC). Sem promessas absolutas,
              com foco em investigação clínica e cuidado individual.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {['Todos', ...categories].map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-forest/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-forest/80"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#faf8f5] px-5 py-10 sm:px-8 sm:py-12">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-3xl border border-forest/10 bg-white shadow-sm transition-all hover:shadow-lg"
              >
                <div className="aspect-[16/10] overflow-hidden bg-ivory-deep">
                  <Image
                    src={post.image.src}
                    alt={post.image.alt}
                    width={640}
                    height={400}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-[11px] text-forest/60">
                    <span className="rounded-full bg-forest/5 px-3 py-1 font-bold uppercase tracking-wider text-sage">
                      {post.category}
                    </span>
                    <span>{post.readingMinutes} min</span>
                  </div>
                  <h2 className="mt-3 line-clamp-3 font-display text-[17px] font-bold leading-snug text-forest group-hover:text-clay">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-forest/60">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex text-xs font-semibold text-clay group-hover:underline">
                    Ler artigo
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
