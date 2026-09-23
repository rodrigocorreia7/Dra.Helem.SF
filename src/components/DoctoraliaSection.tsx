'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Calendar, ExternalLink, ShieldCheck, MessageCircle, Clock } from 'lucide-react';
import DoctoraliaReviewsCarousel from './DoctoraliaReviewsCarousel';
import DoctoraliaWidget from './DoctoraliaWidget';
import { site, whatsappLink } from '../lib/site';

export default function DoctoraliaSection() {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <section id="avaliacoes" className="bg-[#f7f5f0] py-24 relative overflow-hidden border-b border-forest/10">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-clay/20 bg-clay/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-clay">
            <Star size={13} className="fill-clay" /> Opiniões de Pacientes Verificados
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight text-forest">
            A Experiência de Quem Já Cuidou da Saúde com a Dra. Hélem
          </h2>
          <p className="mt-3 text-base text-ink/75 leading-relaxed">
            Leia os relatos reais de pacientes atendidos em Balneário Camboriú e por Telemedicina em todo o Brasil. Avaliações 100% auditadas pela Doctoralia.
          </p>
        </div>

        {/* 1. Carrossel Nativo com Todas as Avaliações */}
        <DoctoraliaReviewsCarousel />

        {/* 2. Área de Agendamento Online Direto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 rounded-[2.5rem] border border-forest/15 bg-white p-6 sm:p-10 shadow-lg shadow-forest/5"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-8 border-b border-forest/10">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest/70">
                <Clock size={14} className="text-clay" /> Agendamento em Tempo Real
              </span>
              <h3 className="mt-1 font-display text-2xl font-bold text-forest">
                Consulte os Horários Disponíveis na Agenda
              </h3>
              <p className="mt-1 text-sm text-ink/75">
                Você pode verificar vagas abertas e agendar diretamente pelo calendário online ou com nossa equipe pelo WhatsApp.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowCalendar((prev) => !prev)}
                className="flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-ivory transition-all hover:bg-forest-soft active:scale-95 shadow-xs"
              >
                <Calendar size={16} />
                {showCalendar ? 'Ocultar Calendário' : 'Ver Calendário Interativo'}
              </button>

              <a
                href={whatsappLink('Olá! Gostaria de informações sobre horários disponíveis para consulta com a Dra. Hélem.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-emerald-600 bg-emerald-50 px-6 py-3 text-sm font-semibold text-emerald-800 transition-all hover:bg-emerald-100 active:scale-95"
              >
                <MessageCircle size={16} /> Agendar via WhatsApp
              </a>
            </div>
          </div>

          {/* Widget do Calendário Doctoralia (expansível com um clique) */}
          {showCalendar ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 pt-4 min-h-[480px] flex flex-col items-center justify-center"
            >
              <DoctoraliaWidget type="big" opinion={false} />
            </motion.div>
          ) : (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-forest/60">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-emerald-700" />
                Atendimento 100% particular com emissão de nota fiscal para reembolso no seu plano de saúde.
              </span>

              <a
                href={site.doctoralia}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-forest hover:text-clay transition-colors"
              >
                Abrir perfil completo na Doctoralia <ExternalLink size={12} />
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
