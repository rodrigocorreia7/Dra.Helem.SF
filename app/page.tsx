import App from '../src/App';

const siteUrl = 'https://www.drahelemmachado.com.br';

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      '@id': `${siteUrl}/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Sobre a Dra. Hélem', item: `${siteUrl}/#sobre` },
        { '@type': 'ListItem', position: 3, name: 'Diferenciais', item: `${siteUrl}/#diferenciais` },
        { '@type': 'ListItem', position: 4, name: 'Públicos Atendidos', item: `${siteUrl}/#publicos` },
        { '@type': 'ListItem', position: 5, name: 'Perguntas Frequentes', item: `${siteUrl}/#duvidas` },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteUrl}/#duvidas`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'A Dra. Hélem atende apenas público +35 ou jovens e idosos também?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A Dra. Hélem atende adultos de todas as faixas etárias. Embora o público acima de 35 anos se beneficie devido ao início do declínio hormonal e metabólico natural, o acompanhamento preventivo e clínico é indicado para qualquer pessoa que busque mais qualidade de vida, controle de exames ou emagrecimento saudável.',
          },
        },
        {
          '@type': 'Question',
          name: 'Atende por convênio médico ou apenas particular?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Os atendimentos são exclusivamente particulares, o que garante o tempo necessário para uma consulta aprofundada. A equipe fornece nota fiscal e documentação para solicitação de reembolso junto ao plano de saúde.',
          },
        },
        {
          '@type': 'Question',
          name: 'Como funciona a consulta online por telemedicina?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A consulta online tem a mesma duração, qualidade e profundidade da consulta presencial. O atendimento é feito por videochamada, os exames são solicitados digitalmente e as receitas são enviadas com assinatura digital válida em todo o Brasil.',
          },
        },
        {
          '@type': 'Question',
          name: 'O foco da consulta é reposição hormonal ou emagrecimento?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'O foco é a saúde integral. Se houver indicação para emagrecimento, controle metabólico ou modulação hormonal, o plano é definido de forma individualizada após avaliação clínica.',
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }} />
      <App />
    </>
  );
}
