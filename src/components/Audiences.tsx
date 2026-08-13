import { useState } from 'react';
import { motion } from 'framer-motion';
import { Venus, Mars, Activity, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { useBooking } from '../lib/booking';
import { Audience } from '../lib/site';

type SymptomCard = {
  id: string;
  image: string;
  imageCaption: string;
  imagePos?: string;
  symptoms: string[];
};

type Category = {
  id: Audience;
  title: string;
  subtitle: string;
  badge: string;
  icon: any;
  howWeHelp: string;
  cta: string;
  cards: SymptomCard[];
};

export default function Audiences() {
  const { openBooking } = useBooking();
  const [activeTab, setActiveTab] = useState<Audience>('mulheres');

  const categories: Category[] = [
    {
      id: 'mulheres',
      title: '🌸 Saúde da Mulher',
      subtitle: 'Modulação Hormonal, Peri/Pós-Menopausa e Estilo de Vida',
      badge: 'Para Mulheres',
      icon: Venus,
      howWeHelp:
        'Avaliação completa do perfil hormonal (estrogênio, progesterona, tireoide, cortisol), readequação metabólica e suporte emocional integrado.',
      cta: 'Agendar Consulta Feminina',
      cards: [
        {
          id: 'card-mulher-1',
          image: '/images/hormonio-mulher.webp',
          imageCaption: 'Modulação Hormonal & Vitalidade',
          imagePos: 'object-[center_15%]',
          symptoms: [
            'Ganho de peso acentuado mesmo mantendo a rotina alimentar',
          ],
        },
        {
          id: 'card-mulher-2',
          image: '/images/hormonio-mulher2.webp',
          imageCaption: 'Acompanhamento Peri/Pós-Menopausa',
          imagePos: 'object-center',
          symptoms: [
            'Ondas de calor (fogachos), suores noturnos e insônia',
            'Queda de cabelo, unhas fracas e pele ressecada',
          ],
        },
        {
          id: 'card-mulher-3',
          image: '/images/hormonio-mulher3.webp',
          imageCaption: 'Redução do Inchaço & Retenção',
          imagePos: 'object-[center_15%]',
          symptoms: [
            'Inchaço, dor ou peso nas pernas (investigação de retenção/lipedema)',
            'Oscilações bruscas de humor, ansiedade e névoa mental (brain fog)',
          ],
        },
      ],
    },
    {
      id: 'homens',
      title: '👨 Saúde do Homem',
      subtitle: 'Andropausa, Performance e Saúde Prostática',
      badge: 'Para Homens',
      icon: Mars,
      howWeHelp:
        'Diagnóstico preciso da saúde masculina, otimização metabólica/hormonal (testosterona), manejo prostático clínico (prostatite, HPB) e plano de longevidade.',
      cta: 'Agendar Consulta Masculina',
      cards: [
        {
          id: 'card-homem-1',
          image: '/images/hormonio-homem.webp',
          imageCaption: 'Otimização Hormonal Masculina',
          imagePos: 'object-[center_15%]',
          symptoms: [
            'Cansaço físico e mental persistente ao longo do dia',
            'Dificuldade para perder gordura abdominal e ganho de massa magra lento',
          ],
        },
        {
          id: 'card-homem-2',
          image: '/images/hormonio-homem3.webp',
          imageCaption: 'Performance, Libido & Saúde Prostática',
          imagePos: 'object-[center_15%]',
          symptoms: [
            'Redução da libido, disposição e foco profissional',
            'Alterações no sono, ronco e acordar já fadigado',
            'Dúvidas sobre alterações na próstata (PSA), hipertensão ou glicose alta',
          ],
        },
      ],
    },
    {
      id: 'geral',
      title: '🏥 Saúde Geral & Cuidados Metabólicos',
      subtitle: 'Medicina Clínica Preventiva para Todas as Idades',
      badge: 'Para Todos',
      icon: Activity,
      howWeHelp:
        'Medicina clínica preventiva e terapêutica. Reversão de marcadores metabólicos alterados com tratamentos fundamentados pela medicina baseada em evidências e nutrição funcional.',
      cta: 'Agendar Acompanhamento Clínico',
      cards: [
        {
          id: 'card-geral-1',
          image: '/images/ENSAIOMED-94.webp',
          imageCaption: 'Investigação Clínica Completa',
          imagePos: 'object-[center_15%]',
          symptoms: [
            'Pré-diabetes ou glicose no limite do laboratório',
            'Colesterol e triglicerídeos alterados (dislipidemia)',
            'Gordura no fígado (esteatose hepática)',
          ],
        },
        {
          id: 'card-geral-2',
          image: '/images/Dra_Helem_3.webp',
          imageCaption: 'Acompanhamento Metabólico Personalizado',
          imagePos: 'object-[center_15%]',
          symptoms: [
            'Inflamação crônica silenciosa e fadiga sem diagnóstico',
            'Necessidade de reestruturação de hábitos sem radicalismo',
          ],
        },
      ],
    },
  ];

  return (
    <section id="publicos" className="relative py-24 bg-ivory overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-clay/20 bg-clay/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-clay">
            <Sparkles size={14} /> Investigação Integral
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight text-forest">
            Sinais de que seu corpo precisa de uma investigação integral
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink/75">
            Cada organismo expressa desequilíbrios metabólicos e hormonais de forma única. Selecione a área correspondente ao seu momento de vida:
          </p>

          {/* Navigation Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const active = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 ${
                    active
                      ? 'bg-forest text-ivory shadow-lg shadow-forest/20 scale-105'
                      : 'border border-forest/15 bg-white text-forest/80 hover:border-forest/40 hover:bg-forest/5'
                  }`}
                >
                  <Icon size={18} className={active ? 'text-clay-soft' : ''} />
                  {cat.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Category Content Grid */}
        <div className="mt-12">
          {categories.map((cat) => {
            if (cat.id !== activeTab) return null;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Section Subheader */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-forest/12 pb-6">
                  <div>
                    <span className="inline-block rounded-full bg-forest/8 px-4 py-1 text-xs font-bold uppercase tracking-wider text-forest">
                      {cat.badge}
                    </span>
                    <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-forest">
                      {cat.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-clay">{cat.subtitle}</p>
                  </div>
                  <button
                    onClick={() => openBooking(cat.id)}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 text-xs font-bold uppercase tracking-wider text-ivory transition-all hover:bg-forest-soft hover:shadow-md"
                  >
                    {cat.cta} <ArrowRight size={14} />
                  </button>
                </div>

                {/* Cards Grid: Each card has its image + specific symptoms */}
                <div className={`grid gap-6 ${cat.cards.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
                  {cat.cards.map((card, idx) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="flex flex-col justify-between overflow-hidden rounded-3xl border border-forest/15 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:border-forest/30"
                    >
                      <div>
                        {/* Image Container with clear top framing */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-forest/5 border-b border-forest/10">
                          <img
                            src={card.image}
                            alt={card.imageCaption}
                            className={`h-full w-full object-cover ${card.imagePos || 'object-[center_15%]'} transition-transform duration-500 hover:scale-105`}
                            loading="lazy"
                          />
                          <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-forest/80 px-3.5 py-1.5 text-xs font-semibold text-ivory backdrop-blur-md">
                            {card.imageCaption}
                          </div>
                        </div>

                        {/* Symptoms List */}
                        <div className="p-6 space-y-3">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-clay">
                            Sintomas Relacionados:
                          </p>
                          <ul className="space-y-3">
                            {card.symptoms.map((sym, sIdx) => (
                              <li key={sIdx} className="flex items-start gap-3 text-sm text-ink/80 leading-snug">
                                <CheckCircle size={17} className="mt-0.5 shrink-0 text-clay" />
                                <span>{sym}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="p-6 pt-0">
                        <button
                          onClick={() => openBooking(cat.id)}
                          className="w-full rounded-2xl border border-forest/15 bg-[#faf8f5] py-2.5 text-xs font-semibold text-forest transition-colors hover:bg-forest hover:text-ivory"
                        >
                          Tratar estes sintomas →
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* How We Help Summary Box */}
                <div className="rounded-3xl border border-forest/15 bg-forest text-ivory p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="max-w-2xl">
                    <span className="text-xs font-bold uppercase tracking-widest text-clay-soft">
                      Como Ajudamos na Prática Clínica
                    </span>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-ivory/90">
                      {cat.howWeHelp}
                    </p>
                  </div>
                  <button
                    onClick={() => openBooking(cat.id)}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-clay px-7 py-3.5 text-sm font-semibold text-ivory shadow-lg transition-all hover:bg-clay-soft hover:text-forest"
                  >
                    {cat.cta} →
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
