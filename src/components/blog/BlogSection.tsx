import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '../../lib/blog';

export default function BlogSection() {
  return (
    <section id="blog" className="bg-ivory px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-clay">
              Blog - informação que cabe na sua rotina
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-forest sm:text-3xl">
              Artigos recentes
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-forest/70">
              Conteúdo revisado pela Dra. Hélem, sem promessas milagrosas, com base clínica e linguagem direta.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-full border border-forest/15 bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-forest transition-colors hover:bg-forest hover:text-ivory"
          >
            Ver todos os artigos
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
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
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              <div className="p-5 sm:p-6">
                <span className="inline-flex rounded-full bg-forest/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-sage">
                  {post.category}
                </span>
                <h3 className="mt-3 line-clamp-3 font-display text-[17px] font-bold leading-snug text-forest group-hover:text-clay">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-forest/60">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex text-xs font-semibold text-clay group-hover:underline">
                  {post.readingMinutes} min de leitura
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
