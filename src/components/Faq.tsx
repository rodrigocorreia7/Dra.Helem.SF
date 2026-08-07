import { useEffect, useState } from 'react';
import { Plus, Minus } from 'lucide-react';

type Faq = { id: number; question: string; answer: string };

export default function FaqSection() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState<number | null>(null);

  const fetchFaqs = async () => {
    try {
      const res = await fetch('/api/faqs');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setFaqs(Array.isArray(data) ? data : []);
      if (Array.isArray(data) && data[0]) setOpen(data[0].id);
    } catch {
      setError('Não foi possível carregar as dúvidas agora.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <section id="duvidas" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.24em] text-clay">Dúvidas frequentes</p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-forest sm:text-[2.5rem]">
            Antes de agendar, talvez você esteja se perguntando
          </h2>
        </div>

        {error && (
          <p className="rounded-xl border border-clay/30 bg-clay/8 px-4 py-3 text-sm text-clay">{error}</p>
        )}

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-2xl bg-forest/6" />
            ))}
          </div>
        ) : (
          <div className="divide-y divide-forest/12 border-y border-forest/12">
            {faqs.map((f) => (
              <div key={f.id}>
                <button
                  onClick={() => setOpen(open === f.id ? null : f.id)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-display text-lg text-forest">{f.question}</span>
                  <span className="shrink-0 text-clay">
                    {open === f.id ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-400 ease-out ${
                    open === f.id ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pr-8 text-[0.97rem] leading-relaxed text-ink/70">{f.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
