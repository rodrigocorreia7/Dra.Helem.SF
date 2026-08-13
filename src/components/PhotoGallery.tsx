import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, User, Venus, Mars } from 'lucide-react';

type PhotoItem = {
  id: string;
  src: string;
  category: 'dra_helem' | 'mulher' | 'homem';
  title: string;
  subtitle: string;
  aspect?: string;
  position?: string;
};

const PHOTOS: PhotoItem[] = [
  {
    id: 'dra-1',
    src: '/images/Dra_Helem_1.webp',
    category: 'dra_helem',
    title: 'Dra. Hélem Machado Almeida',
    subtitle: 'CRM 40098-SC · Médica e Psicóloga',
    position: 'object-center',
  },
  {
    id: 'dra-2',
    src: '/images/Dra_Helem_2.webp',
    category: 'dra_helem',
    title: 'Escuta Atenta e Humanizada',
    subtitle: 'Consultas aprofundadas com tempo dedicado',
    position: 'object-[center_15%]',
  },
  {
    id: 'dra-3',
    src: '/images/Dra_Helem_3.webp',
    category: 'dra_helem',
    title: 'Investigação Clínica Completa',
    subtitle: 'Análise detalhada de exames e estilo de vida',
    position: 'object-[center_15%]',
  },
  {
    id: 'dra-4',
    src: '/images/Dra_Helem_4.webp',
    category: 'dra_helem',
    title: 'Medicina e Psicologia Integradas',
    subtitle: 'Visão holística do corpo e da mente',
    position: 'object-[center_15%]',
  },
  {
    id: 'dra-5',
    src: '/images/Dra_Helem_5.webp',
    category: 'dra_helem',
    title: 'Acompanhamento Contínuo',
    subtitle: 'Planos terapêuticos de 30, 60 e 90 dias',
    position: 'object-[center_15%]',
  },
  {
    id: 'ensaio-94',
    src: '/images/ENSAIOMED-94.webp',
    category: 'dra_helem',
    title: 'Prática Médica Baseada em Evidências',
    subtitle: 'Membro Associada da ABMEV',
    position: 'object-[center_15%]',
  },
  {
    id: 'mulher-1',
    src: '/images/hormonio-mulher.webp',
    category: 'mulher',
    title: 'Modulação Hormonal Feminina',
    subtitle: 'Equilíbrio de estrogênio, progesterona e tireoide',
    position: 'object-[center_15%]',
  },
  {
    id: 'mulher-2',
    src: '/images/hormonio-mulher2.webp',
    category: 'mulher',
    title: 'Cuidado na Peri e Pós-Menopausa',
    subtitle: 'Controle de fogachos, sono e alteração de peso',
    position: 'object-center',
  },
  {
    id: 'mulher-3',
    src: '/images/hormonio-mulher3.webp',
    category: 'mulher',
    title: 'Vitalidade e Redução de Inflamação',
    subtitle: 'Manejo de retenção hídrica, lipedema e fadiga',
    position: 'object-[center_15%]',
  },
  {
    id: 'homem-1',
    src: '/images/hormonio-homem.webp',
    category: 'homem',
    title: 'Saúde Hormonal Masculina',
    subtitle: 'Otimização da testosterona e andropausa',
    position: 'object-[center_15%]',
  },
  {
    id: 'homem-3',
    src: '/images/hormonio-homem3.webp',
    category: 'homem',
    title: 'Performance e Saúde Prostática',
    subtitle: 'Recuperação da energia, libido e foco diário',
    position: 'object-[center_15%]',
  },
];

export default function PhotoGallery() {
  const [filter, setFilter] = useState<'todos' | 'dra_helem' | 'mulher' | 'homem'>('todos');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const filteredPhotos =
    filter === 'todos' ? PHOTOS : PHOTOS.filter((p) => p.category === filter);

  return (
    <section id="galeria" className="py-24 bg-ivory relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-forest/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-forest">
            <Sparkles size={14} className="text-clay" /> Galeria Visual & Atendimento
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight text-forest">
            Conheça nosso espaço, conduta médica e áreas de modulação
          </h2>
          <p className="mt-4 text-base text-ink/75 leading-relaxed">
            Nossa abordagem reúne atendimento presencial acolhedor e suporte em telemedicina com imagens dedicadas ao cuidado integral de homens e mulheres.
          </p>

          {/* Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'todos', label: 'Todas as Fotos (11)', icon: Sparkles },
              { id: 'dra_helem', label: 'Dra. Hélem Machado (6)', icon: User },
              { id: 'mulher', label: 'Saúde Feminina (3)', icon: Venus },
              { id: 'homem', label: 'Saúde Masculina (2)', icon: Mars },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                    active
                      ? 'bg-forest text-ivory shadow-md shadow-forest/20'
                      : 'border border-forest/15 bg-white text-forest/70 hover:border-forest/40 hover:text-forest'
                  }`}
                >
                  <Icon size={14} className={active ? 'text-clay-soft' : ''} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Photo Grid with proper portrait aspect ratios and clear text placement */}
        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredPhotos.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedPhoto(item)}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-forest/12 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest/10"
              >
                {/* Photo Container with 4:5 portrait ratio and top/center framing */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-forest/5">
                  <img
                    src={item.src}
                    alt={item.title}
                    className={`h-full w-full object-cover ${item.position || 'object-[center_15%]'} transition-transform duration-500 group-hover:scale-105`}
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 rounded-full bg-forest/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ivory backdrop-blur-md">
                    {item.category === 'dra_helem'
                      ? 'Dra. Hélem'
                      : item.category === 'mulher'
                      ? 'Feminina'
                      : 'Masculina'}
                  </div>
                </div>

                {/* Text Content cleanly separated below image */}
                <div className="p-5 bg-white flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-base font-bold text-forest leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-ink/70 leading-relaxed">{item.subtitle}</p>
                  </div>
                  <span className="mt-3 text-[11px] font-semibold text-clay group-hover:underline">
                    Clique para ampliar 🔍
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] max-w-3xl overflow-hidden rounded-3xl border border-white/20 bg-forest text-ivory shadow-2xl flex flex-col"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 shadow-md"
                aria-label="Fechar galeria"
              >
                <X size={20} />
              </button>

              <div className="flex-1 overflow-hidden bg-black flex items-center justify-center min-h-0">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="max-h-[72vh] w-auto max-w-full object-contain mx-auto"
                />
              </div>
              <div className="p-6 bg-forest shrink-0">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-clay-soft">
                  {selectedPhoto.category === 'dra_helem'
                    ? 'Dra. Hélem Machado Almeida'
                    : selectedPhoto.category === 'mulher'
                    ? 'Saúde da Mulher & Modulação'
                    : 'Saúde do Homem & Andropausa'}
                </span>
                <h3 className="mt-1 font-display text-xl font-bold text-ivory">
                  {selectedPhoto.title}
                </h3>
                <p className="mt-1 text-sm text-ivory/80">{selectedPhoto.subtitle}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
