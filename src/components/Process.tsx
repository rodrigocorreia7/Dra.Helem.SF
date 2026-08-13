import { motion } from 'framer-motion';
import { CalendarCheck, FileSearch, Sparkles, ArrowRight } from 'lucide-react';
import { useBooking } from '../lib/booking';

export default function Process() {
  const { openBooking } = useBooking();

  const steps = [
    {
      num: '01',
      title: 'Passo 1: Acolhimento & Mapeamento Inicial',
      desc: 'Agendamento simplificado via WhatsApp. Você preenche um formulário pré-consulta detalhado sobre seus sintomas, histórico médico, rotina de sono e alimentação.',
      icon: CalendarCheck,
    },
    {
      num: '02',
      title: 'Passo 2: A Consulta Médica e Diagnóstico',
      desc: 'Atendimento presencial ou online com escuta atenta. Solicitação e análise criteriosa de mais de 40 marcadores laboratoriais e hormonais completos.',
      icon: FileSearch,
    },
    {
      num: '03',
      title: 'Passo 3: Plano Terapêutico Personalizado',
      desc: 'Definição do seu plano de ação: ajustes nutricionais, suplementação baseada em evidências, controle metabólico, regulação hormonal (quando indicada) e metas realistas para 30, 60 e 90 dias.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="processo" className="py-24 bg-ivory relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-forest/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-forest">
            Jornada do Paciente
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight text-forest">
            Sua jornada de transformação em 3 etapas
          </h2>
          <p className="mt-4 text-base text-ink/75">
            Um processo claro, estruturado e transparente desde o primeiro contato até o acompanhamento dos resultados.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative flex flex-col justify-between rounded-[2rem] border border-forest/12 bg-white p-7 shadow-sm transition-all hover:border-forest/30 hover:shadow-xl hover:shadow-forest/8"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-4xl font-extrabold text-clay/30">{step.num}</span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/8 text-forest">
                      <Icon size={22} />
                    </div>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold text-forest leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/75">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-8 border-t border-forest/10 pt-4 flex items-center justify-between text-xs font-semibold text-clay">
                  <span>Etapa {idx + 1} de 3</span>
                  <ArrowRight size={14} />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => openBooking('geral')}
            className="inline-flex items-center gap-2 rounded-full bg-forest px-8 py-4 text-sm font-semibold text-ivory shadow-lg shadow-forest/15 transition-all hover:bg-forest-soft hover:scale-[1.02]"
          >
            Iniciar Meu Agendamento
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
