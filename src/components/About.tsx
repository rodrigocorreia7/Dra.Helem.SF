import { motion } from 'framer-motion';
import { ShieldCheck, HeartHandshake, Stethoscope, Users, Award } from 'lucide-react';
import { site } from '../lib/site';

export default function About() {
  const features = [
    {
      icon: HeartHandshake,
      title: 'Consultas Humanizadas e Aprofundadas',
      desc: 'Tempo de escuta dedicado para entender seu histórico, rotina, alimentação e saúde mental sem a correria tradicional dos atendimentos.',
    },
    {
      icon: Stethoscope,
      title: 'Domínio da Prática Clínica',
      desc: 'Experiência real no manejo de patologias metabólicas (diabetes, dislipidemias, fígado gorduroso/esteatose) e otimização hormonal.',
    },
    {
      icon: Users,
      title: 'Cuidado Familiar Integral',
      desc: 'Acompanhamento de homens, mulheres e famílias em diferentes fases da vida, promovendo longevidade e prevenção ativa.',
    },
  ];

  return (
    <section id="sobre" className="relative bg-forest py-24 text-ivory overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -right-32 top-1/4 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #c26d47 0%, transparent 70%)' }}
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] items-center">
          {/* Left Column: Single Featured Image (Dra. Helem 3) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative overflow-hidden rounded-[2.5rem] border border-ivory/20 shadow-2xl">
              <img
                src="/images/Dra_Helem_3.webp"
                alt="Dra. Hélem Machado Almeida - Médica e Psicóloga"
                className="h-[440px] w-full object-cover object-[center_15%] sm:h-[520px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-clay/90 p-4 text-ivory backdrop-blur-md">
                <p className="font-display text-lg font-bold">{site.crm}</p>
                <p className="mt-0.5 text-xs text-ivory/90 uppercase tracking-wider">
                  Médica (CRM 40098-SC) & Psicóloga
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio & Authority Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-ivory/20 bg-ivory/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-clay-soft">
              <Award size={14} /> Sobre a Médica
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight text-ivory">
              Conheça a Dra. Hélem Machado Almeida
            </h2>

            <blockquote className="mt-6 rounded-2xl border-l-4 border-clay bg-ivory/5 p-5 italic text-ivory/90 text-base sm:text-lg leading-relaxed">
              "Acredito que a medicina deve acolher e transformar. O paciente não é um conjunto de sintomas isolados, mas um ser humano completo que merece ser ouvido sem pressa."
            </blockquote>

            <p className="mt-6 text-base leading-relaxed text-ivory/80">
              A Dra. Hélem alia o rigor da ciência médica à sensibilidade da escuta humana. Com formação em <strong>Medicina</strong> ({site.crm}) e <strong>Psicologia</strong>, e como membro associado da <strong>ABMEV (Associação Brasileira de Medicina do Estilo de Vida)</strong>, ela dedica sua prática ao acompanhamento integral de homens, mulheres e famílias.
            </p>

            <div className="mt-8 space-y-4">
              {features.map((f, idx) => (
                <div key={idx} className="flex items-start gap-4 rounded-2xl border border-ivory/12 bg-ivory/5 p-4 transition-all hover:bg-ivory/10">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-clay text-ivory">
                    <f.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-ivory">{f.title}</h3>
                    <p className="mt-1 text-xs sm:text-sm text-ivory/75 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-ivory/70 border-t border-ivory/15 pt-6">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-clay" /> CRM 40098-SC Ativo
              </span>
              <span>•</span>
              <span>Dupla Graduação Medicina + Psicologia</span>
              <span>•</span>
              <span>Atendimento Presencial e Telemedicina</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
