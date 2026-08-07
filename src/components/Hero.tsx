import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { site } from '../lib/site';
import { useBooking } from '../lib/booking';

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  const { openBooking } = useBooking();

  return (
    <section id="topo" className="grain relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div
        className="pointer-events-none absolute -right-40 -top-24 h-[520px] w-[520px] rounded-full opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(circle, #d9a18455 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -left-52 top-64 h-[460px] w-[460px] rounded-full opacity-50 blur-3xl"
        style={{ background: 'radial-gradient(circle, #7d9b8c55 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.p
            custom={0}
            initial="hidden"
            animate="show"
            variants={fade}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-forest/15 bg-ivory/60 px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-forest/70"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-clay" />
            Medicina hormonal · Homens e mulheres
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fade}
            className="font-display text-[2.6rem] leading-[1.04] tracking-tight text-forest sm:text-6xl lg:text-[4.1rem]"
          >
            Hormônios em equilíbrio.{' '}
            <span className="italic text-clay">Energia, peso e sono</span> de volta ao seu controle.
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fade}
            className="mt-7 max-w-xl text-[1.02rem] leading-relaxed text-ink/75 sm:text-lg"
          >
            Cansaço, ganho de peso que não responde a dieta, insônia, queda de cabelo — muitas vezes
            o corpo não está “desregulado”, está pedindo um olhar hormonal de verdade. Atendimento
            médico especializado para homens e mulheres.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            variants={fade}
            className="mt-10 flex flex-col items-start gap-4"
          >
            <button
              onClick={() => openBooking()}
              className="group inline-flex items-center gap-3 rounded-full bg-forest px-8 py-4 text-base font-medium text-ivory shadow-xl shadow-forest/15 transition-all hover:-translate-y-0.5 hover:bg-forest-soft"
            >
              Agendar consulta
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
            <p className="text-sm text-forest/60">
              {site.doctor} — {site.crm}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-forest/10 bg-ivory-deep shadow-2xl shadow-forest/10">
            <img
              src="/images/1.jpg"
              alt="Dra. Hélem Michels - Atendimento médico especializado"
              className="h-[380px] w-full object-cover object-top sm:h-[520px]"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/55 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-ivory/25 bg-forest/70 p-4 backdrop-blur-md">
              <p className="font-display text-lg text-ivory">Medicina + Psicologia</p>
              <p className="mt-1 text-sm text-ivory/80">
                Investigação da causa hormonal sem ignorar o impacto emocional.
              </p>
            </div>
          </div>

          <div className="float-slow absolute -left-4 -top-6 hidden rounded-2xl border border-forest/10 bg-ivory px-5 py-4 shadow-xl shadow-forest/10 sm:block">
            <p className="font-display text-2xl text-clay">ABMEV</p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-forest/60">Membro associada</p>
          </div>
        </motion.div>
      </div>

      <div className="relative mx-auto mt-16 flex max-w-6xl items-center gap-3 px-5 text-forest/40 sm:px-8">
        <ArrowDown size={16} />
        <span className="text-[11px] uppercase tracking-[0.24em]">Role para entender</span>
      </div>
    </section>
  );
}
