'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Calendar, ExternalLink, ShieldCheck, MessageCircle } from 'lucide-react';
import DoctoraliaWidget from './DoctoraliaWidget';
import { site, whatsappLink } from '../lib/site';

export default function DoctoraliaSection() {
  const [activeTab, setActiveTab] = useState<'calendar' | 'certificate'>('calendar');

  return (
    <section id="avaliacoes" className="bg-[#f7f5f0] py-20 relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-clay/20 bg-clay/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-clay">
            <Star size={13} className="fill-clay" /> Avaliações Verificadas & Agendamento
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl leading-tight text-forest">
            Agende sua Consulta e Veja Opiniões Reais na Doctoralia
          </h2>
          <p className="mt-3 text-base text-ink/75">
            Consulte a disponibilidade de horários em tempo real para atendimento presencial em Balneário Camboriú ou Telemedicina para todo o Brasil.
          </p>

          {/* Abas de alternância de visualização */}
          <div className="mt-6 inline-flex rounded-full bg-forest/8 p-1 border border-forest/12">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold transition-all ${
                activeTab === 'calendar'
                  ? 'bg-forest text-ivory shadow-sm'
                  : 'text-forest/70 hover:text-forest'
              }`}
            >
              <Calendar size={14} /> Agendamento & Avaliações
            </button>
            <button
              onClick={() => setActiveTab('certificate')}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold transition-all ${
                activeTab === 'certificate'
                  ? 'bg-forest text-ivory shadow-sm'
                  : 'text-forest/70 hover:text-forest'
              }`}
            >
              <ShieldCheck size={14} /> Certificado de Opiniões
            </button>
          </div>
        </div>

        {/* Card do Widget */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 rounded-[2.5rem] border border-forest/15 bg-white p-4 sm:p-8 shadow-xl shadow-forest/5"
        >
          {activeTab === 'calendar' ? (
            <div className="min-h-[480px] flex flex-col items-center justify-center">
              <DoctoraliaWidget type="big" opinion={true} />
            </div>
          ) : (
            <div className="min-h-[260px] flex flex-col items-center justify-center py-6">
              <DoctoraliaWidget type="certificate" opinion={false} />
            </div>
          )}

          {/* Rodapé do Card */}
          <div className="mt-6 border-t border-forest/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-forest/70">
            <span className="flex items-center gap-1.5 text-center sm:text-left">
              <ShieldCheck size={15} className="text-emerald-700 shrink-0" />
              Perfil oficial verificado pela Doctoralia Brasil (CRM 40098-SC).
            </span>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={site.doctoralia}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-forest hover:text-clay transition-colors"
              >
                Abrir perfil na Doctoralia <ExternalLink size={12} />
              </a>
              <span className="text-forest/30">|</span>
              <a
                href={whatsappLink('Olá! Gostaria de tirar dúvidas sobre o agendamento de consulta com a Dra. Hélem.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
              >
                <MessageCircle size={13} /> Agendar via WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
