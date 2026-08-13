import { motion } from 'framer-motion';
import { Microscope, Activity, Brain, CheckCircle2 } from 'lucide-react';
import { useBooking } from '../lib/booking';

export default function Differential() {
  const { openBooking } = useBooking();

  const pillars = [
    {
      icon: Microscope,
      step: '01',
      title: 'Investigação Clínica Profunda',
      desc: 'Não olhamos apenas para os "valores de referência" genéricos dos exames de sangue. Buscamos as taxas ideais para o seu bem-estar, energia e longevidade.',
    },
    {
      icon: Activity,
      step: '02',
      title: 'Tratamento da Causa Raiz',
      desc: 'Seja cuidando de uma esteatose hepática (gordura no fígado), desinflamando o organismo ou equilibrando hormônios, o foco é devolver o funcionamento correto ao seu corpo.',
    },
    {
      icon: Brain,
      step: '03',
      title: 'União entre Corpo e Mente',
      desc: 'Por ser também Psicóloga, a Dra. Hélem compreende como o estresse crônico, o burnout e o comportamento alimentar afetam diretamente seus hormônios e exames.',
    },
  ];

  return (
    <section id="diferenciais" className="relative py-24 bg-ivory-deep/40 overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-clay/20 bg-clay/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-clay">
                O Diferencial Médico
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-forest/12 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-forest/70 shadow-xs">
                <Activity size={13} className="text-clay" /> Foco em Disposição & Longevidade
              </span>
            </div>

            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.15] text-forest">
              Medicina de Verdade: Por que não acreditamos em <span className="italic text-clay">"fórmulas mágicas"</span>?
            </h2>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-ink/80">
              Muito se fala hoje em tratamentos hormonais e estéticos como se fossem a solução rápida para todos os problemas. Na prática, prescrever hormônios ou remédios sem organizar o metabolismo, a inflamação corporal e a mente é como tentar construir uma casa pelo telhado.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink/75">
              A <strong>Dra. Hélem Machado Almeida</strong> atua sob os pilares da <strong>Medicina do Estilo de Vida (MEV)</strong> e da <strong>Medicina Integrativa</strong>, oferecendo uma conduta científica rigorosa e individualizada.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {pillars.map((p, idx) => (
                <motion.div
                  key={p.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="rounded-2xl border border-forest/10 bg-ivory p-5 shadow-sm transition-all hover:border-forest/30 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl font-bold text-clay/40">{p.step}</span>
                    <p.icon className="h-6 w-6 text-forest" />
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-forest leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink/70">
                    {p.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={() => openBooking('geral')}
                className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3.5 text-sm font-semibold text-ivory shadow-lg shadow-forest/15 transition-all hover:bg-forest-soft hover:scale-[1.02]"
              >
                <CheckCircle2 size={18} className="text-clay-soft" />
                Agendar Consulta Médica Integrada
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[2.5rem] border border-forest/15 shadow-2xl shadow-forest/10 bg-white">
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-forest/5">
                <img
                  src="/images/Dra_Helem_5.webp"
                  alt="Dra. Hélem Machado Almeida em consulta médica integral"
                  className="h-full w-full object-cover object-[center_85%]"
                  loading="lazy"
                />
              </div>
              <div className="p-5 bg-forest text-ivory border-t border-forest/20">
                <p className="font-display text-lg font-semibold">Investigação Metabólica & Hormonal</p>
                <p className="mt-1 text-xs text-ivory/80 leading-relaxed">
                  "O paciente não é um conjunto de sintomas isolados, mas um ser humano completo que merece ser ouvido sem pressa."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
