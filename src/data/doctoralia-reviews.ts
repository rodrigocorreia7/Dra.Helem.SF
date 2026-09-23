export interface DoctoraliaReview {
  id: number;
  author: string;
  date: string;
  rating: number;
  verified: boolean;
  type: 'telemedicina' | 'presencial';
  comment: string;
  doctorAnswer?: string;
}

export const doctoraliaSummary = {
  score: 5.0,
  maxScore: 5.0,
  totalReviews: 14,
  recommendationPercentage: 100,
  source: 'Doctoralia Brasil',
  profileUrl:
    'https://www.doctoralia.com.br/helem-machado-almeida/medico-clinico-geral/balneario-camboriu',
};

export const doctoraliaReviews: DoctoraliaReview[] = [
  {
    id: 1,
    author: 'Luciane Garcias',
    date: '6 de março de 2026',
    rating: 5,
    verified: true,
    type: 'presencial',
    comment:
      'Profissional extremamente competente e humana! Seu método aplicado durante a consulta transmite confiança! Satisfação!',
  },
  {
    id: 2,
    author: 'Jacilene O. Carvalho',
    date: '28 de fevereiro de 2026',
    rating: 5,
    verified: true,
    type: 'presencial',
    comment:
      'Atendimento maravilhoso, uma ótima profissional, muito atenciosa, eu amei!',
  },
  {
    id: 3,
    author: 'Liane Veiga',
    date: '16 de janeiro de 2026',
    rating: 5,
    verified: true,
    type: 'telemedicina',
    comment:
      'Uma pessoa muito atenciosa, não faz apenas o básico, faz aquilo que é necessário, faz a diferença.',
  },
  {
    id: 4,
    author: 'Arilio Maurício',
    date: '22 de novembro de 2025',
    rating: 5,
    verified: true,
    type: 'presencial',
    comment:
      'Ótima doutora, explica tudo certinho, atenciosa, excelente profissional.',
  },
  {
    id: 5,
    author: 'Ewerton Alberto',
    date: '7 de novembro de 2025',
    rating: 5,
    verified: true,
    type: 'presencial',
    comment:
      'Bem legal, ótimo atendimento. Vou voltar com os exames para mais uma consulta.',
  },
  {
    id: 6,
    author: 'Maysa',
    date: '23 de setembro de 2025',
    rating: 5,
    verified: true,
    type: 'presencial',
    comment:
      'Excelente profissional! Tirou todas as minhas dúvidas com clareza e acolhimento.',
  },
  {
    id: 7,
    author: 'Evertton Philipi',
    date: '17 de agosto de 2025',
    rating: 5,
    verified: true,
    type: 'telemedicina',
    comment:
      'Excelente atendimento, muito atenciosa e explicou com detalhes todo o caso.',
  },
  {
    id: 8,
    author: 'H.G.',
    date: '11 de maio de 2025',
    rating: 5,
    verified: true,
    type: 'presencial',
    comment:
      'Local organizado, bom atendimento. A doutora Hélem explicou com excelência tudo o que eu tinha que seguir. Indico a clínica e a doutora!',
    doctorAnswer:
      'Fico muito feliz com seu reconhecimento. Saber que se sentiu bem cuidado e acolhido é extremamente gratificante. Estou à disposição sempre que precisar!',
  },
  {
    id: 9,
    author: 'Marcio',
    date: '1 de maio de 2025',
    rating: 5,
    verified: true,
    type: 'telemedicina',
    comment:
      'Ótima consulta, Dra. Hélem passa um atendimento diferenciado e muito atencioso.',
    doctorAnswer:
      'Agradeço pela confiança e pelas palavras. Mesmo à distância, meu compromisso é oferecer um atendimento humano, atencioso e resolutivo, com a escuta qualificada que cada paciente merece.',
  },
  {
    id: 10,
    author: 'Mahira Morais',
    date: '21 de abril de 2025',
    rating: 5,
    verified: true,
    type: 'telemedicina',
    comment:
      'Me atendeu com excelência em todos os quesitos, me explicou claramente o que estava acontecendo e em quanto tempo o tratamento faria efeito.',
    doctorAnswer:
      'Grata! Seu feedback é importante para continuar prestando um atendimento de qualidade, acolhedor e humanizado.',
  },
];
