import { useState } from 'react';
import { motion } from 'framer-motion';
import { Venus, Mars, Activity, CheckCircle, Sparkles, ArrowRight, type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { useBooking } from '../lib/booking';
import { Audience } from '../lib/site';
import ShinyText from './ShinyText';
import ScrollExpand from './ScrollExpand';

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
  icon: LucideIcon;
  howWeHelp: string;
  cta: string;
  lineColor: string;
  baseColor: string;
  cards: SymptomCard[];
};

export default function Audiences() {
  const { openBooking } = useBooking();
  const [activeTab, setActiveTab] = useState<Audience>('mulheres');

  const categories: Category[] = [
    {
      id: 'mulheres',
      title: 'Saúde da Mulher',
      subtitle: 'Modulação Hormonal, Peri/Pós-Menopausa e Estilo de Vida',
      badge: 'Para Mulheres',
      icon: Venus,
      lineColor: '#c63e8c',
      baseColor: '#b525e1',
      howWeHelp:
        'Avaliação completa do perfil hormonal (estrogênio, progesterona, tireoide, cortisol), readequação metabólica e suporte emocional integrado.',
      cta: 'Agendar Consulta Feminina',
      cards: [
        {
          id: 'card-mulher-1',
          image: '/images/saude-mulher.webp',
          imageCaption: 'Modulação Hormonal & Vitalidade',
          imagePos: 'object-center',
          symptoms: [
            'Ganho de peso acentuado mesmo mantendo a rotina alimentar',
          ],
        },
        {
          id: 'card-mulher-2',
          image: '/images/w2.webp',
          imageCaption: 'Acompanhamento Peri/Pós-Menopausa',
          imagePos: 'object-center',
          symptoms: [
            'Ondas de calor (fogachos), suores noturnos e insônia',
            'Queda de cabelo, unhas fracas e pele ressecada',
          ],
        },
        {
          id: 'card-mulher-3',
          image: '/images/hormonio-mulher2.webp',
          imageCaption: 'Equilíbrio Metabólico & Emocional',
          imagePos: 'object-center',
          symptoms: [
            'Oscilações severas de humor, irritabilidade ou desânimo',
            'Cansaço matinal crônico e falta de energia física',
            'Inchaço abdominal recorrente e retenção de líquidos',
          ],
        },
      ],
    },
    {
      id: 'homens',
      title: 'Saúde do Homem',
      subtitle: 'Andropausa, Otimização Metabólica e Disposição',
      badge: 'Para Homens',
      icon: Mars,
      lineColor: '#1f50d9',
      baseColor: '#0740c2',
      howWeHelp:
        'Investigação do eixo hormonal masculino (testosterona livre/total, SHBG, prolactina), avaliação de composição corporal e prevenção cardiovascular.',
      cta: 'Agendar Consulta Masculina',
      cards: [
        {
          id: 'card-homem-1',
          image: '/images/hormonio-homem.webp',
          imageCaption: 'Otimização Hormonal Masculina',
          imagePos: 'object-center',
          symptoms: [
            'Queda progressiva na disposição diária e foco mental',
          ],
        },
        {
          id: 'card-homem-2',
          image: '/images/hormonio-homem2.webp',
          imageCaption: 'Vitalidade & Saúde Metabólica',
          imagePos: 'object-center',
          symptoms: [
            'Redução de libido e vitalidade sexual',
            'Dificuldade para ganho e manutenção de massa magra',
          ],
        },
        {
          id: 'card-homem-3',
          image: '/images/hormonio-homem3.webp',
          imageCaption: 'Prevenção Cardiovascular & Sono',
          imagePos: 'object-center',
          symptoms: [
            'Sono não reparador, ronco e cansaço ao acordar',
            'Aumento da gordura abdominal e visceral',
            'Desmotivação e perda de rendimento no trabalho/treino',
          ],
        },
      ],
    },
    {
      id: 'geral',
      title: 'Saúde Geral & Cuidados Metabólicos',
      subtitle: 'Longevidade Saudável, Fadiga Crônica e Prevenção',
      badge: 'Saúde Geral',
      icon: Activity,
      lineColor: '#1fd970',
      baseColor: '#06b62a',
      howWeHelp:
        'Abordagem integral dos pilares da saúde: sono, estresse, microbiota intestinal, micronutrientes e marcadores inflamatórios.',
      cta: 'Agendar Consulta Integrada',
      cards: [
        {
          id: 'card-geral-1',
          image: '/images/hormonio-mulher.webp',
          imageCaption: 'Investigação Clínica Completa',
          imagePos: 'object-[center_75%]',
          symptoms: [
            'Exames laboratoriais de rotina aparentemente "normais", mas persistência de sintomas',
          ],
        },
        {
          id: 'card-geral-2',
          image: '/images/estrategia-metabolica.webp',
          imageCaption: 'Estratégia Metabólica Integrada',
          imagePos: 'object-center',
          symptoms: [
            'Alterações metabólicas iniciais (glicemia, colesterol, esteatose hepática)',
            'Fadiga inexplicada e lentidão digestiva',
          ],
        },
        {
          id: 'card-geral-3',
          image: '/images/prevencao-longevidade.webp',
          imageCaption: 'Prevenção & Longevidade',
          imagePos: 'object-center',
          symptoms: [
            'Sensação de que o corpo "não funciona mais como antes"',
            'Desejo de estruturar um plano de longevidade com respaldo médico',
            'Estresse crônico afetando o desempenho diário',
          ],
        },
      ],
    },
  ];

  const activeCategory = categories.find((category) => category.id === activeTab) ?? categories[0];
  const ActiveIcon = activeCategory.icon;
  const stageImage = activeTab === 'homens'
    ? '/images/homem-saude.webp'
    : activeTab === 'geral'
      ? '/images/dna-helix.webp'
      : activeCategory.cards[0].image;
  const stageImageAlt = activeTab === 'homens'
    ? 'Homem adulto representando saúde e vitalidade masculina'
    : activeTab === 'geral'
      ? 'Hélice de DNA representando a investigação integral da saúde'
      : activeCategory.cards[0].imageCaption;

  return (
    <section id="publicos" className="relative overflow-x-clip bg-ivory py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-clay/20 bg-clay/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-clay">
            <Sparkles size={14} /> Investigação Integral
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight text-forest">
            Recupere sua energia, equilíbrio hormonal e saúde metabólica com uma{' '}
            <span className="italic text-clay">medicina que olha você por inteiro.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink/75 max-w-2xl mx-auto leading-relaxed">
            Cansaço constante, ganho de peso sem explicação, insônia, alterações de humor ou exames alterados? A resposta não está em fórmulas mágicas nem em consultas superficiais, mas na investigação médica profunda das causas raízes do seu corpo.
          </p>

          <div className="metallic-green-border mt-8 rounded-[2rem]">
            <div className="rounded-[calc(2rem-1px)] bg-white/80 p-4 backdrop-blur-sm sm:p-5">
            <div className="mb-4 flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-clay">Escolha por onde começar</p>
                <p className="mt-1 text-sm text-ink/65">Três caminhos de cuidado, uma investigação feita para você.</p>
              </div>
              <span className="rounded-full bg-forest/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-forest">3 caminhos</span>
            </div>

          {/* Category Navigation Buttons: high-contrast targets that remain visible above the media reveal */}
          <div className="grid gap-3 md:grid-cols-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const active = activeTab === cat.id;
              return (
                <div key={cat.id} className="relative group">
                  {/* High-contrast target with an explicit selected state. */}
                  <button
                    onClick={() => setActiveTab(cat.id)}
                    aria-pressed={active}
                    className={`relative flex min-h-[4.25rem] w-full items-center justify-between gap-3 rounded-2xl px-5 py-4 text-left text-sm font-semibold transition-all duration-300 cursor-pointer sm:px-6 sm:text-base ${
                      active
                        ? 'border border-white/20 bg-forest text-ivory'
                        : 'border border-forest/15 bg-white text-forest hover:border-clay hover:bg-clay/5'
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <Icon size={20} className={`shrink-0 transition-colors ${active ? 'text-clay-soft' : 'text-clay'}`} />
                      {active ? (
                        <ShinyText
                          text={cat.title}
                          color="#ffffff"
                          shineColor="#ffd166"
                          speed={2.2}
                          spread={110}
                          className="font-semibold"
                        />
                      ) : (
                        <span>{cat.title}</span>
                      )}
                    </span>
                    <ArrowRight size={17} className={`shrink-0 transition-transform duration-300 ${active ? 'text-clay-soft' : 'text-forest/35 group-hover:translate-x-1 group-hover:text-clay'}`} />
                  </button>
                </div>
              );
            })}
            </div>
          </div>
          </div>
        </div>

        {/* Visual gateway inspired by ScrollExpand: the page scroll reveals the selected path. */}
        <div className="mt-8 text-left">
          <ScrollExpand
            src={stageImage}
            alt={stageImageAlt}
            imageClassName={activeTab === 'mulheres' ? activeCategory.cards[0].imagePos : 'object-center'}
            title={activeCategory.title}
            scrollHint="Role para revelar este caminho"
            stageHeight={620}
            startWidth={66}
            startHeight={62}
            startRadius={28}
            endRadius={20}
            mediaZoom={1.16}
            scrollDistance={0.4}
            holdDistance={0.4}
            smoothing={0.12}
            overlayScrim={0.58}
            className="rounded-[2rem]"
          >
            <div className="w-full max-w-2xl rounded-[1.5rem] border border-white/20 bg-forest/75 p-5 text-left text-white backdrop-blur-md sm:p-7">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-clay-soft">
                <ActiveIcon size={17} /> {activeCategory.badge}
              </div>
              <p className="mt-2 font-display text-xl font-semibold tracking-tight sm:text-2xl">{activeCategory.subtitle}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/75">Veja os sinais, cuidados e possibilidades de acompanhamento para este caminho.</p>
            </div>
          </ScrollExpand>
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
                          <Image
                            src={card.image}
                            alt={card.imageCaption}
                            fill
                            sizes="(min-width: 768px) 33vw, 100vw"
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
