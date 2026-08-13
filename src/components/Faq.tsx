import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

type FaqItem = { id: number; question: string; answer: string };

const DEFAULT_FAQS: FaqItem[] = [
  {
    id: 1,
    question: 'A Dra. Hélem atende apenas público +35 ou jovens e idosos também?',
    answer:
      'A Dra. Hélem atende adultos de todas as faixas etárias. Embora o público acima de 35 anos se beneficie enormemente devido ao início do declínio hormonal e metabólico natural, o acompanhamento preventivo e clínico é indicado para qualquer pessoa que busque mais qualidade de vida, controle de exames ou emagrecimento saudável.',
  },
  {
    id: 2,
    question: 'Atende por convênio médico ou apenas particular?',
    answer:
      'Os atendimentos são exclusivamente particulares, o que garante o tempo necessário para uma consulta verdadeiramente aprofundada e sem a correria dos convênios. No entanto, fornecemos nota fiscal e documentação necessária para que você possa solicitar reembolso junto ao seu plano de saúde.',
  },
  {
    id: 3,
    question: 'Como funciona a consulta online (Telemedicina)?',
    answer:
      'A consulta online tem a mesma duração, qualidade e profundidade da consulta presencial. O atendimento é feito por videochamada segura, os exames são solicitados digitalmente e as receitas médicas e suplementações são enviadas com assinatura digital válida em todo o Brasil.',
  },
  {
    id: 4,
    question: 'O foco da consulta é reposição hormonal ou emagrecimento?',
    answer:
      'O foco é a sua saúde integral. Se você precisa emagrecer, tratar gordura no fígado ou pré-diabetes, faremos isso. Se houver indicação médica para modulação ou reposição hormonal, ela será feita de forma segura e individualizada. O objetivo final é vitalidade, disposição e longevidade.',
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(1);

  return (
    <section id="duvidas" className="py-24 bg-ivory relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-forest/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-forest">
            <HelpCircle size={14} className="text-clay" /> Tira-Dúvidas
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-forest">
            Perguntas Frequentes (FAQ)
          </h2>
          <p className="mt-2 text-base text-ink/75">
            Esclareça suas principais dúvidas antes de realizar o agendamento.
          </p>
        </div>

        <div className="divide-y divide-forest/15 rounded-3xl border border-forest/15 bg-white p-6 sm:p-8 shadow-lg shadow-forest/5">
          {DEFAULT_FAQS.map((f) => (
            <div key={f.id} className="py-4 first:pt-0 last:pb-0">
              <button
                onClick={() => setOpen(open === f.id ? null : f.id)}
                className="flex w-full items-center justify-between gap-4 py-2 text-left transition-colors hover:text-clay"
              >
                <span className="font-display text-lg font-semibold text-forest">
                  {f.question}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest/8 text-forest">
                  {open === f.id ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  open === f.id ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-sm sm:text-base leading-relaxed text-ink/80 pr-4">
                    {f.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
