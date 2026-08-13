import { motion } from 'framer-motion';
import { ArrowDown, ShieldCheck, Stethoscope, Video, Award } from 'lucide-react';
import { site } from '../lib/site';
import { useBooking } from '../lib/booking';

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  const { openBooking } = useBooking();

  return (
    <section id="topo" className="grain relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28 bg-[#faf8f5]">
      {/* Background radial glows */}
      <div
        className="pointer-events-none absolute -right-32 -top-24 h-[560px] w-[560px] rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, #c26d4744 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -left-48 top-48 h-[500px] w-[500px] rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, #41786c44 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          {/* Badges */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="show"
            variants={fade}
            className="mb-6 flex flex-wrap items-center gap-2"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-forest shadow-xs">
              <ShieldCheck size={14} className="text-clay" />
              {site.crm} · Médica & Psicóloga
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-forest/15 bg-forest/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-forest/80">
              <Award size={13} className="text-clay" />
              ABMEV
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-forest/15 bg-forest/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-forest/80">
              <Video size={13} className="text-forest" />
              Presencial & Telemedicina
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fade}
            className="font-display text-[2.5rem] leading-[1.06] tracking-tight text-forest sm:text-5xl lg:text-[3.6rem]"
          >
            Recupere sua energia, equilíbrio hormonal e saúde metabólica com uma{' '}
            <span className="italic text-clay underline decoration-clay/30 underline-offset-8">
              medicina que olha você por inteiro.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fade}
            className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-ink/80 sm:text-lg"
          >
            Cansaço constante, ganho de peso sem explicação, insônia, alterações de humor ou exames alterados? A resposta não está em fórmulas mágicas nem em consultas superficiais, mas na investigação médica profunda das causas raízes do seu corpo.
          </motion.p>

          {/* Action Button & Micro-copy */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            variants={fade}
            className="mt-9 flex flex-col items-start gap-3"
          >
            <button
              onClick={() => openBooking('geral')}
              className="group inline-flex items-center gap-3 rounded-full bg-forest px-8 py-4 text-base font-semibold text-ivory shadow-xl shadow-forest/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest-soft hover:shadow-2xl hover:shadow-forest/30"
            >
              <Stethoscope size={19} className="text-clay-soft" />
              Quero Agendar Minha Avaliação Integrada
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
            <p className="text-xs text-forest/65 flex items-center gap-1.5 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Atendimento individualizado. Vagas limitadas por mês para garantir acompanhamento próximo.
            </p>
          </motion.div>
        </div>

        {/* Doctor Main Featured Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2.5rem] border border-forest/15 bg-ivory-deep shadow-2xl shadow-forest/12">
            <img
              src="/images/ENSAIOMED-94.webp"
              alt="Dra. Hélem Machado Almeida - Médica e Psicóloga CRM 40098-SC"
              className="h-[420px] w-full object-cover object-[center_15%] sm:h-[540px]"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/75 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-ivory/25 bg-forest/80 p-4.5 backdrop-blur-md text-ivory">
              <p className="font-display text-lg font-semibold">{site.doctor}</p>
              <p className="mt-0.5 text-xs text-ivory/80">
                {site.crm} · Médica e Psicóloga · Membro ABMEV
              </p>
              <p className="mt-2 text-xs italic text-clay-soft border-t border-ivory/15 pt-2">
                "Cuidando da parte bioquímica/hormonal sem negligenciar o aspecto emocional."
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative mx-auto mt-14 flex max-w-6xl items-center gap-3 px-5 text-forest/50 sm:px-8">
        <ArrowDown size={16} className="animate-bounce" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.24em]">Role para explorar a conduta médica</span>
      </div>
    </section>
  );
}
