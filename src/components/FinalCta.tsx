import { motion } from 'framer-motion';
import { MessageCircle, Instagram, Mail, Calendar } from 'lucide-react';
import { site, whatsappLink } from '../lib/site';
import { useBooking } from '../lib/booking';

export default function FinalCta() {
  const { openBooking } = useBooking();

  return (
    <section id="agendar" className="px-5 pb-24 sm:px-8 sm:pb-32 relative bg-ivory">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grain relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-forest px-6 py-16 text-center text-ivory sm:px-14 sm:py-20 shadow-2xl shadow-forest/20 border border-ivory/15"
      >
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full blur-3xl opacity-50"
          style={{ background: 'radial-gradient(circle, #c26d47 0%, transparent 70%)' }}
        />
        <div className="relative grid items-center gap-10 lg:grid-cols-12">
          <div className="hidden lg:block lg:col-span-4">
            <div className="overflow-hidden rounded-2xl border border-ivory/20 shadow-2xl">
              <img
                src="/images/Dra_Helem_5.webp"
                alt="Dra. Hélem Machado Almeida"
                className="aspect-[3/4] w-full object-cover object-[center_15%]"
                loading="lazy"
              />
            </div>
          </div>

          <div className="lg:col-span-8 lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-ivory/20 bg-ivory/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-clay-soft">
              Agendamento de Consultas
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-bold leading-tight text-ivory">
              Seu corpo não precisa de promessas rápidas. Precisa do cuidado certo.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-ivory/85 leading-relaxed">
              Agende sua consulta com a Dra. Hélem Machado Almeida e dê o primeiro passo rumo a uma vida com mais energia, equilíbrio e saúde de verdade.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <a
                href={whatsappLink(
                  `Olá, Dra. Hélem! Gostaria de obter informações sobre horários disponíveis para consulta.`
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#075e54] px-8 py-4 text-base font-bold text-white shadow-xl transition-all hover:bg-[#0b7367] hover:scale-[1.02] sm:w-auto"
              >
                <MessageCircle size={20} /> 💬 Falar no WhatsApp e Agendar Consulta
              </a>
              <button
                onClick={() => openBooking('geral')}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ivory/30 bg-ivory/10 px-7 py-4 text-base font-semibold text-ivory backdrop-blur-xs transition-all hover:bg-ivory hover:text-forest sm:w-auto"
              >
                <Calendar size={18} /> Formulário Web
              </button>
            </div>

            <p className="mt-8 text-xs text-ivory/60">Contatos diretos da clínica:</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm lg:justify-start text-ivory/80">
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-ivory hover:underline"
              >
                <Instagram size={15} /> {site.instagramLabel}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 hover:text-ivory hover:underline"
              >
                <Mail size={15} /> {site.email}
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-ivory hover:underline"
              >
                <MessageCircle size={15} /> {site.whatsappFormatted}
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
