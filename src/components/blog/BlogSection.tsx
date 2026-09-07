import { Link } from 'react-router-dom';
import { blogPosts } from '../../lib/blog';

export default function BlogSection() {
  return (
    <section id="blog" className="px-5 py-16 sm:px-8 sm:py-20 bg-ivory">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-clay">Blog · Informação que cabe na sua rotina</p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-forest">Artigos recentes</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-forest/70">
              Conteúdo revisado pela Dra. Hélem — sem promessas milagrosas, com base clínica e linguagem direta. Atualizado regularmente.
            </p>
          </div>
          <Link to="/blog" className="inline-flex items-center justify-center rounded-full border border-forest/15 bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-forest hover:bg-forest hover:text-ivory transition-colors">
            Ver todos os artigos
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="group overflow-hidden rounded-[1.5rem] border border-forest/10 bg-white shadow-sm hover:shadow-lg transition-all">
              <div className="aspect-[16/10] overflow-hidden bg-ivory-deep">
                <img src={post.image.src} alt={post.image.alt} className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-700" loading="lazy" />
              </div>
              <div className="p-5 sm:p-6">
                <span className="inline-flex rounded-full bg-forest/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-sage">{post.category}</span>
                <h3 className="mt-3 font-display text-[17px] font-bold leading-snug text-forest group-hover:text-clay line-clamp-3">{post.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest/60 line-clamp-2">{post.excerpt}</p>
                <span className="mt-4 inline-flex text-xs font-semibold text-clay group-hover:underline">{post.readingMinutes} min de leitura →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
