import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { site, whatsappLink } from '../../../src/lib/site';

const pageUrl = 'https://www.drahelemmachado.com.br/sobre/dra-helem';

export const metadata: Metadata = {
  title: 'Dra. Hélem Machado Almeida — Médica e Psicóloga | CRM 40098-SC',
  description:
    'Biografia e credenciais da Dra. Hélem Machado Almeida (CRM 40098-SC). Médica e Psicóloga atuante em Modulação Hormonal, Saúde da Mulher, Saúde do Homem e Medicina do Estilo de Vida.',
  alternates: {
    canonical: '/sobre/dra-helem',
  },
  openGraph: {
    type: 'profile',
    url: pageUrl,
    title: 'Dra. Hélem Machado Almeida — Médica e Psicóloga | CRM 40098-SC',
    description:
      'Biografia e credenciais da Dra. Hélem Machado Almeida (CRM 40098-SC). Atendimento presencial em Balneário Camboriú e Telemedicina nacional.',
    images: ['/images/Dra_Helem_1.webp'],
  },
};

const profileLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${pageUrl}#page`,
      url: pageUrl,
      name: 'Perfil Profissional — Dra. Hélem Machado Almeida',
      mainEntity: {
        '@id': `${pageUrl}#person`,
      },
    },
    {
      '@type': 'Person',
      '@id': `${pageUrl}#person`,
      name: site.doctor,
      jobTitle: site.titles,
      identifier: site.crm,
      description:
        'Médica (CRM 40098-SC) e Psicóloga associada ao CBMEV, atuante em modulação hormonal, saúde da mulher (climatério e menopausa), saúde do homem (andropausa e performance) e medicina do estilo de vida.',
      image: 'https://www.drahelemmachado.com.br/images/Dra_Helem_1.webp',
      url: pageUrl,
      sameAs: [
        site.doctoralia,
        'https://www.instagram.com/drahelemmachado/',
      ],
      alumniOf: [
        {
          '@type': 'EducationalOrganization',
          name: 'Graduação em Medicina',
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Graduação em Psicologia',
        },
      ],
      memberOf: {
        '@type': 'Organization',
        name: 'CBMEV - Colégio Brasileiro de Medicina do Estilo de Vida',
        url: 'https://cbmev.org.br',
      },
      knowsAbout: [
        'Modulação Hormonal Bioidêntica',
        'Climatério e Menopausa',
        'Andropausa e Otimização de Testosterona',
        'Medicina do Estilo de Vida',
        'Reversão de Esteatose Hepática',
        'Psicologia Comportamental e Saúde Integral',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.drahelemmachado.com.br/' },
        { '@type': 'ListItem', position: 2, name: 'Sobre a Médica', item: pageUrl },
      ],
    },
  ],
};

export default function SobrePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileLd) }}
      />
      <main className="min-h-screen bg-ivory text-[#192420]">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="border-b border-forest/10 bg-ivory px-5 py-4 text-xs text-forest/60 sm:px-8">
          <div className="mx-auto flex max-w-4xl flex-wrap gap-1.5">
            <Link href="/" className="hover:text-forest hover:underline">
              Início
            </Link>
            <span>/</span>
            <span className="text-forest/80 font-medium">Sobre a Médica</span>
          </div>
        </nav>

        {/* Hero do Perfil */}
        <section className="px-5 sm:px-8 pt-10 pb-12">
          <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1 flex flex-col items-center text-center">
              <div className="relative w-48 h-60 sm:w-56 sm:h-72 rounded-2xl overflow-hidden shadow-lg border-2 border-forest/10">
                <Image
                  src="/images/Dra_Helem_1.webp"
                  alt="Dra. Hélem Machado Almeida - Médica e Psicóloga"
                  fill
                  sizes="(max-width: 768px) 224px, 256px"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="mt-4">
                <span className="inline-block px-3 py-1 bg-forest/10 text-forest text-xs font-semibold rounded-full">
                  {site.crm}
                </span>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <h1 className="font-title text-3xl sm:text-4xl text-forest font-bold tracking-tight">
                {site.doctor}
              </h1>
              <p className="text-lg text-[#2d473e] font-medium">
                {site.titles} — Atuação em Modulação Hormonal e Medicina do Estilo de Vida
              </p>
              <p className="text-sm text-forest/70">
                Membro do Colégio Brasileiro de Medicina do Estilo de Vida (CBMEV)
              </p>

              <div className="prose text-[#2d473e] text-sm sm:text-base leading-relaxed space-y-4 pt-2">
                <p>
                  A <strong>Dra. Hélem Machado Almeida (CRM 40098-SC)</strong> construiu sua trajetória combinando a bioquímica médica com a ciência do comportamento através de sua dupla graduação em <strong>Medicina</strong> e <strong>Psicologia</strong>.
                </p>
                <p>
                  Essa integração única permite investigar não apenas exames laboratoriais frios, mas compreender os fatores emocionais, hábitos, privação de sono e sobrecarga de estresse que desregulam os eixos hormonais e o metabolismo.
                </p>
                <p>
                  Sua prática clínica foca na <em>causa raiz</em> das queixas de cansaço contínuo, declínio hormonal no climatério/menopausa, andropausa, esteatose hepática e distúrbios metabólicos, rejeitando soluções superficiais ou prescrições mágicas.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <a
                  href={whatsappLink('Olá, Dra. Hélem! Gostaria de informações sobre agendamento de consulta.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-forest px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-forest/90"
                >
                  Agendar Consulta via WhatsApp
                </a>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-xl border border-forest/20 bg-white px-5 py-3 text-sm font-semibold text-forest hover:bg-forest/5 transition"
                >
                  Ler Artigos Clínicos no Blog
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Pilares Clínicos */}
        <section className="border-t border-forest/10 bg-white/60 px-5 sm:px-8 py-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-title text-2xl text-forest font-bold mb-6">
              Áreas de Atuação e Foco Clínico
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-ivory border border-forest/10 space-y-2">
                <h3 className="font-bold text-forest text-lg">Saúde da Mulher & Climatério</h3>
                <p className="text-sm text-[#2d473e] leading-relaxed">
                  Avaliação aprofundada dos sintomas da peri e pós-menopausa, incluindo fogachos, distúrbios do sono, perda de vitalidade, manejo de lipedema e regulação tireoidiana e adrenal.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-ivory border border-forest/10 space-y-2">
                <h3 className="font-bold text-forest text-lg">Saúde do Homem & Andropausa</h3>
                <p className="text-sm text-[#2d473e] leading-relaxed">
                  Investigação responsável da deficiência androgênica (queda de testosterona), fadiga crônica, perda de massa muscular, saúde metabólica e acompanhamento prostático.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-ivory border border-forest/10 space-y-2">
                <h3 className="font-bold text-forest text-lg">Medicina do Estilo de Vida (MEV)</h3>
                <p className="text-sm text-[#2d473e] leading-relaxed">
                  Protocolos clínicos baseados em evidências para reversão de esteatose hepática (gordura no fígado), pré-diabetes, controle de dislipidemias e longevidade sustentável.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-ivory border border-forest/10 space-y-2">
                <h3 className="font-bold text-forest text-lg">Telemedicina & Presencial</h3>
                <p className="text-sm text-[#2d473e] leading-relaxed">
                  Atendimento presencial no consultório em Balneário Camboriú/SC (Rua 981, 196 - Centro) e consultas online por telemedicina para pacientes de todo o Brasil e exterior, com prescrições e pedidos de exames com assinatura digital válida nacionalmente (ICP-Brasil).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Informações Regulatórias e Éticas CFM */}
        <section className="px-5 sm:px-8 py-10">
          <div className="mx-auto max-w-4xl p-6 rounded-2xl bg-forest/5 border border-forest/15 text-xs text-forest/70 space-y-2 leading-relaxed">
            <p className="font-bold text-forest text-sm">Informações de Conformidade Ética (Resolução CFM nº 2.336/2023):</p>
            <p>
              • Médica Responsável: Dra. Hélem Machado Almeida — CRM 40098-SC.<br />
              • Os atendimentos médicos e condutas terapêuticas são individualizados após avaliação clínica minuciosa e exames complementares quando indicados.<br />
              • Este site tem caráter exclusivamente educativo e informativo, não substituindo a consulta médica presencial ou por telemedicina formalmente agendada.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
