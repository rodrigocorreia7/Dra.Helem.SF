'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Quote,
  MessageSquare,
  ShieldCheck,
  ExternalLink,
  MapPin,
  Video,
} from 'lucide-react';
import { doctoraliaReviews, doctoraliaSummary } from '../data/doctoralia-reviews';
import { site } from '../lib/site';

export default function DoctoraliaReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);

  // Ajusta a quantidade de cards exibidos conforme a largura da tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, doctoraliaReviews.length - cardsPerPage);

  const prev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const visibleReviews = doctoraliaReviews.slice(
    currentIndex,
    currentIndex + cardsPerPage
  );

  return (
    <div className="w-full">
      {/* Placar de Reputação no Doctoralia */}
      <div className="mb-10 rounded-2xl border border-forest/15 bg-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="flex flex-col items-center justify-center rounded-2xl bg-[#faf8f5] border border-forest/10 px-6 py-4">
            <span className="font-display text-4xl font-bold text-forest">5.0</span>
            <div className="mt-1 flex items-center gap-0.5 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="mt-1 text-[11px] font-semibold text-forest/60 uppercase tracking-wider">
              Nota Máxima
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-800 px-3 py-0.5 text-xs font-semibold">
                <CheckCircle2 size={13} /> {doctoraliaSummary.totalReviews} Opiniões Verificadas
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-forest/8 text-forest px-3 py-0.5 text-xs font-semibold">
                <ShieldCheck size={13} /> 100% Recomendada
              </span>
            </div>
            <p className="mt-2 text-sm text-ink/80 leading-relaxed">
              Avaliações reais auditadas pela plataforma <strong>Doctoralia Brasil</strong> de pacientes atendidos em Balneário Camboriú e por Telemedicina.
            </p>
          </div>
        </div>

        {/* Controles de Navegação */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            aria-label="Avaliação anterior"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/20 bg-white text-forest transition-all hover:bg-forest hover:text-ivory hover:border-forest shadow-xs active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Próxima avaliação"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/20 bg-white text-forest transition-all hover:bg-forest hover:text-ivory hover:border-forest shadow-xs active:scale-95"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Grid de Cards Visíveis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {visibleReviews.map((rev) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col justify-between rounded-3xl border border-forest/12 bg-white p-6 sm:p-7 shadow-sm transition-all hover:shadow-md hover:border-forest/25"
            >
              <div>
                {/* Cabeçalho do Card */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest font-bold text-base">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-display text-base font-bold text-forest leading-tight">
                        {rev.author}
                      </h4>
                      <span className="text-[11px] text-forest/55">{rev.date}</span>
                    </div>
                  </div>

                  <Quote className="text-clay/25 shrink-0" size={24} />
                </div>

                {/* Estrelas e Tag de Consulta */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-y border-forest/8 py-2.5">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-forest/70">
                    {rev.type === 'telemedicina' ? (
                      <>
                        <Video size={12} className="text-forest/60" /> Teleconsulta
                      </>
                    ) : (
                      <>
                        <MapPin size={12} className="text-forest/60" /> Presencial Balneário
                      </>
                    )}
                  </span>
                </div>

                {/* Comentário do Paciente */}
                <p className="mt-4 text-sm leading-relaxed text-ink/80">
                  "{rev.comment}"
                </p>
              </div>

              {/* Resposta da Dra. Hélem (se houver) */}
              {rev.doctorAnswer && (
                <div className="mt-5 rounded-2xl bg-[#faf8f5] border border-forest/10 p-3.5 text-xs text-ink/75 leading-relaxed">
                  <div className="flex items-center gap-1.5 mb-1.5 text-forest font-semibold">
                    <MessageSquare size={13} className="text-clay" />
                    <span>Resposta da Dra. Hélem:</span>
                  </div>
                  <p className="italic text-ink/70">"{rev.doctorAnswer}"</p>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Indicadores de Posição / Bolinhas */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Ir para página ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              currentIndex === i ? 'w-8 bg-forest' : 'w-2 bg-forest/20 hover:bg-forest/40'
            }`}
          />
        ))}
      </div>

      {/* Link de transparência */}
      <div className="mt-8 text-center">
        <a
          href={site.doctoralia}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold text-forest/75 hover:text-clay transition-colors underline underline-offset-4"
        >
          Ver todas as avaliações diretamente no perfil oficial da Doctoralia Brasil
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}
