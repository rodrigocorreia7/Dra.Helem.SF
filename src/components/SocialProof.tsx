import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, BadgeCheck, GraduationCap, Users } from 'lucide-react';
import { site } from '../lib/site';

type Testimonial = {
  id: number;
  author: string;
  context: string | null;
  quote: string;
};

export default function SocialProof() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const credibility = [
    { icon: BadgeCheck, k: 'CRM ativo', v: site.crm },
    { icon: GraduationCap, k: 'Formação', v: 'Medicina e Psicologia' },
    { icon: Users, k: 'Associação', v: 'Membro da ABMEV' },
  ];

  return (
    <section className="bg-ivory-deep/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.24em] text-clay">Credibilidade</p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-forest sm:text-[2.7rem]">
            {items.length > 0
              ? 'Quem já passou por esse acompanhamento'
              : 'Confiança começa com registro, formação e método'}
          </h2>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-44 animate-pulse rounded-[1.5rem] bg-forest/6" />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {items.map((t, i) => (
              <motion.blockquote
                key={t.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex h-full flex-col rounded-[1.5rem] border border-forest/12 bg-ivory p-7"
              >
                <Quote className="text-clay/60" size={22} />
                <p className="mt-4 flex-1 text-[0.98rem] leading-relaxed text-ink/80">“{t.quote}”</p>
                <footer className="mt-6 border-t border-forest/10 pt-4">
                  <p className="font-display text-base text-forest">{t.author}</p>
                  {t.context && <p className="text-xs text-forest/55">{t.context}</p>}
                </footer>
              </motion.blockquote>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {credibility.map((c, i) => (
              <motion.div
                key={c.k}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-[1.5rem] border border-forest/12 bg-ivory p-7"
              >
                <c.icon className="text-clay" size={22} />
                <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-forest/50">{c.k}</p>
                <p className="mt-2 font-display text-xl text-forest">{c.v}</p>
              </motion.div>
            ))}
          </div>
        )}

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink/60">
          Médica com CRM ativo ({site.crm}), formação em Medicina e Psicologia, membro da ABMEV
          (Associação Brasileira de Medicina do Estilo de Vida).
        </p>
      </div>
    </section>
  );
}
