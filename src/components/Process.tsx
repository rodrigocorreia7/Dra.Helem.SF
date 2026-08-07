import { motion } from 'framer-motion';
import { CalendarCheck, Stethoscope, LineChart } from 'lucide-react';

const steps = [
  {
    icon: CalendarCheck,
    title: 'Agendamento',
    text: 'Você marca sua consulta e conta o que está sentindo.',
  },
  {
    icon: Stethoscope,
    title: 'Avaliação',
    text: 'Investigação clínica e hormonal completa, com exames quando necessário.',
  },
  {
    icon: LineChart,
    title: 'Plano de acompanhamento',
    text: 'Orientação médica contínua, não uma consulta isolada.',
  },
];

export default function Process() {
  return (
    <section id="processo" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-14 max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.24em] text-clay">Como funciona</p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-forest sm:text-[2.7rem]">
            Um processo simples, sem promessa vazia
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-[1.5rem] border border-forest/12 bg-ivory-deep/50 p-7"
            >
              <span className="font-display text-5xl leading-none text-forest/12">0{i + 1}</span>
              <s.icon className="mt-4 text-clay" size={22} />
              <h3 className="mt-4 font-display text-xl text-forest">{s.title}</h3>
              <p className="mt-2 text-[0.97rem] leading-relaxed text-ink/70">{s.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="rule my-12" />

        <p className="mx-auto max-w-2xl text-center font-display text-xl italic leading-relaxed text-forest sm:text-2xl">
          Aqui não existe “resultado em uma consulta”. Existe acompanhamento real.
        </p>
      </div>
    </section>
  );
}
