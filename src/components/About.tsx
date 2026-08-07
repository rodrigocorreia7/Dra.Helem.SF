import { motion } from 'framer-motion';
import { site } from '../lib/site';

export default function About() {
  return (
    <section id="sobre" className="relative bg-forest py-20 text-ivory sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="overflow-hidden rounded-[2rem] border border-ivory/15">
            <img
              src="/images/2.png"
              alt="Dra. Hélem Michels em consulta e estudo de casos clínicos"
              className="h-[360px] w-full object-cover object-top sm:h-[460px]"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 rounded-2xl bg-clay px-6 py-5 text-ivory shadow-xl">
            <p className="font-display text-xl leading-none">{site.crm}</p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-ivory/80">Registro ativo</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] uppercase tracking-[0.24em] text-clay-soft">Sobre a médica</p>
          <h2 className="mt-4 font-display text-3xl leading-tight sm:text-[2.7rem]">
            Medicina de verdade, não estética disfarçada de saúde
          </h2>

          <div className="mt-7 space-y-5 text-[1.02rem] leading-relaxed text-ivory/80">
            <p>
              Sou médica ({site.crm}) e também psicóloga, e é essa combinação que guia meu jeito de
              atender: investigar a causa hormonal por trás do sintoma, sem ignorar o impacto
              emocional que ele causa na sua vida.
            </p>
            <p>
              Não trabalho com fórmula pronta — cada corpo, cada exame, cada história pede um caminho
              diferente.
            </p>
          </div>

          <dl className="mt-9 grid gap-4 sm:grid-cols-3">
            {[
              { k: 'Formação', v: 'Medicina e Psicologia' },
              { k: 'Atuação', v: site.yearsLabel },
              { k: 'Atendimento', v: site.attendance },
            ].map((item) => (
              <div key={item.k} className="rounded-2xl border border-ivory/12 bg-ivory/5 p-5">
                <dt className="text-[10px] uppercase tracking-[0.22em] text-ivory/50">{item.k}</dt>
                <dd className="mt-2 text-sm leading-snug text-ivory">{item.v}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-sm text-ivory/60">{site.associations}</p>
        </motion.div>
      </div>
    </section>
  );
}
