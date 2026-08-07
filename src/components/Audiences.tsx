import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Venus, Mars } from 'lucide-react';
import { useBooking } from '../lib/booking';

type Symptom = {
  id: number;
  audience: 'mulheres' | 'homens';
  label: string;
  sort_order: number;
};

function Card({
  icon,
  eyebrow,
  title,
  items,
  loading,
  onClick,
  tone,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  items: Symptom[];
  loading: boolean;
  onClick: () => void;
  tone: 'clay' | 'forest';
}) {
  const accent = tone === 'clay' ? 'text-clay' : 'text-sage';
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col rounded-[1.75rem] border border-forest/12 bg-ivory p-7 shadow-sm transition-shadow hover:shadow-xl hover:shadow-forest/8 sm:p-9"
    >
      <div className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-forest/12 ${accent}`}>
        {icon}
      </div>
      <p className="text-[11px] uppercase tracking-[0.24em] text-forest/50">{eyebrow}</p>
      <h3 className="mt-3 font-display text-2xl leading-snug text-forest sm:text-[1.7rem]">{title}</h3>

      <ul className="mt-6 flex-1 space-y-3.5">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <li key={i} className="h-4 w-4/5 animate-pulse rounded bg-forest/8" />
            ))
          : items.map((s) => (
              <li key={s.id} className="flex items-start gap-3 text-[0.97rem] text-ink/75">
                <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${tone === 'clay' ? 'bg-clay' : 'bg-sage'}`} />
                {s.label}
              </li>
            ))}
      </ul>

      <button
        onClick={onClick}
        className="mt-8 w-full rounded-full border border-forest/25 px-6 py-3.5 text-sm font-medium text-forest transition-all hover:bg-forest hover:text-ivory"
      >
        Quero entender meus hormônios
      </button>
    </motion.div>
  );
}

const DEFAULT_SYMPTOMS: Symptom[] = [
  { id: 1, audience: 'mulheres', label: 'Ganho de peso mesmo fazendo "tudo certo"', sort_order: 1 },
  { id: 2, audience: 'mulheres', label: 'Calores, insônia e oscilação de humor', sort_order: 2 },
  { id: 3, audience: 'mulheres', label: 'Inchaço e dor nas pernas (possível lipedema)', sort_order: 3 },
  { id: 4, audience: 'mulheres', label: 'Cansaço persistente e névoa mental', sort_order: 4 },
  { id: 5, audience: 'homens', label: 'Cansaço persistente, mesmo dormindo bem', sort_order: 1 },
  { id: 6, audience: 'homens', label: 'Dificuldade para ganhar massa ou perder gordura', sort_order: 2 },
  { id: 7, audience: 'homens', label: 'Queda de libido ou disposição no dia a dia', sort_order: 3 },
  { id: 8, audience: 'homens', label: 'Sono não reparador e perda de rendimento no treino', sort_order: 4 },
];

export default function Audiences() {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { openBooking } = useBooking();

  const fetchSymptoms = async () => {
    try {
      const res = await fetch('/api/symptoms');
      if (!res.ok) throw new Error('Falha ao carregar');
      const data = await res.json();
      setSymptoms(Array.isArray(data) && data.length > 0 ? data : DEFAULT_SYMPTOMS);
    } catch {
      setSymptoms(DEFAULT_SYMPTOMS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSymptoms();
  }, []);

  return (
    <section id="publicos" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.24em] text-clay">Para quem é</p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-forest sm:text-[2.7rem]">
            Cada corpo tem uma história hormonal diferente
          </h2>
        </div>

        {error && (
          <p className="mb-6 rounded-xl border border-clay/30 bg-clay/8 px-4 py-3 text-sm text-clay">
            {error}
          </p>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <Card
            icon={<Venus size={20} />}
            eyebrow="Para mulheres 40+"
            title="Se você sente que seu corpo mudou e ninguém explica direito o porquê"
            items={symptoms.filter((s) => s.audience === 'mulheres')}
            loading={loading}
            onClick={() => openBooking('mulheres')}
            tone="clay"
          />
          <Card
            icon={<Mars size={20} />}
            eyebrow="Para homens"
            title="Se a energia, o rendimento no treino ou a disposição não são mais os mesmos"
            items={symptoms.filter((s) => s.audience === 'homens')}
            loading={loading}
            onClick={() => openBooking('homens')}
            tone="forest"
          />
        </div>
      </div>
    </section>
  );
}
