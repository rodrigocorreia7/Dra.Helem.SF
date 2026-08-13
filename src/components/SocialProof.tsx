import { motion } from 'framer-motion';
import { BadgeCheck, GraduationCap, Users, TrendingUp, CheckCircle, Quote } from 'lucide-react';
import { site } from '../lib/site';

export default function SocialProof() {
  const credibility = [
    { icon: BadgeCheck, k: 'Registro Médico', v: site.crm },
    { icon: GraduationCap, k: 'Dupla Formação', v: 'Medicina e Psicologia' },
    { icon: Users, k: 'Membro Ativo', v: 'ABMEV - Estilo de Vida' },
  ];

  return (
    <section id="casos" className="bg-ivory-deep/50 py-24 relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-clay/20 bg-clay/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-clay">
            <TrendingUp size={14} /> Resultados & Prática Clínica
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight text-forest">
            Evidência Científica e Acompanhamento de Casos Reais
          </h2>
          <p className="mt-3 text-base text-ink/75">
            A verdadeira medicina integrativa se comprova na evolução concreta dos exames laboratoriais e na qualidade de vida.
          </p>
        </div>

        {/* Featured Real Clinical Case Study */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 rounded-[2.5rem] border border-forest/15 bg-white p-8 sm:p-10 shadow-xl shadow-forest/8"
        >
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-emerald-100 text-emerald-800 px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
                  Estudo de Caso Clínico Real
                </span>
                <span className="text-xs text-ink/60">Evolução em 90 dias</span>
              </div>
              <h3 className="mt-4 font-display text-2xl sm:text-3xl font-bold text-forest leading-snug">
                Reversão de Pré-Diabetes e Normalização Lipídica sem Radicalismo
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink/80">
                <strong>Paciente masculino, homem jovem:</strong> Apresentava exames com pré-diabetes (glicemia de jejum e HbA1c alteradas), dislipidemia (colesterol/triglicerídeos elevados) e queixa de fadiga crônica.
              </p>
              <div className="mt-4 space-y-2 text-sm text-ink/75">
                <p className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-1 shrink-0 text-clay" />
                  <strong>Conduta Aplicada:</strong> Intervenção focada na Mudança do Estilo de Vida (MEV), otimização de micronutrientes específicos (Cúrcuma, Vitaminas do Complexo B e D em doses individualizadas) e manejo do estresse.
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-1 shrink-0 text-emerald-600" />
                  <strong>Resultado em 3 Meses:</strong> Normalização completa do perfil lipídico, saída da faixa de pré-diabetes, eliminação do cansaço e recuperação da disposição diária.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 rounded-2xl border border-forest/10 bg-[#faf8f5] p-6 text-center">
              <Quote className="mx-auto text-clay" size={32} />
              <p className="mt-3 text-sm italic text-ink/80 leading-relaxed">
                "A medicina integrativa investiga a causa raiz dos sintomas para restaurar a vitalidade, a energia e o equilíbrio metabólico do corpo de forma duradoura."
              </p>
              <p className="mt-4 font-display text-xs font-bold uppercase tracking-wider text-forest">
                Dra. Hélem Machado Almeida
              </p>
              <p className="text-[11px] text-forest/60">CRM 40098-SC</p>
            </div>
          </div>
        </motion.div>

        {/* Credibility Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {credibility.map((c, idx) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.k}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-center gap-4 rounded-2xl border border-forest/12 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest text-clay-soft">
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-forest/50">{c.k}</p>
                  <p className="mt-0.5 font-display text-base font-bold text-forest">{c.v}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
