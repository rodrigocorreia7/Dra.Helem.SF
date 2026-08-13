export const site = {
  doctor: 'Dra. Hélem Machado Almeida',
  shortName: 'Dra. Hélem',
  crm: 'CRM 40098-SC',
  titles: 'Médica & Psicóloga',
  association: 'Membro Associado da ABMEV (Associação Brasileira de Medicina do Estilo de Vida)',
  
  // Contatos
  whatsappNumber: '554791512620', // WhatsApp institucional da clínica (+55 47 9151-2620)
  whatsappFormatted: '+55 47 9151-2620',
  whatsappLabel: 'Falar no WhatsApp',
  instagram: 'https://instagram.com/drahelem.machado',
  instagramLabel: '@drahelem.machado',
  email: 'contato@drahelemmachado.com.br',
  
  city: 'Florianópolis / Santa Catarina',
  attendance: 'Atendimento presencial e online (Telemedicina para todo o Brasil)',
  
  headline: 'Recupere sua energia, equilíbrio hormonal e saúde metabólica com uma medicina que olha você por inteiro.',
  subheadline: 'Cansaço constante, ganho de peso sem explicação, insônia, alterações de humor ou exames alterados? A resposta não está em fórmulas mágicas nem em consultas superficiais, mas na investigação médica profunda das causas raízes do seu corpo.',
};

export const whatsappLink = (msg?: string) =>
  `https://wa.me/${site.whatsappNumber}${
    msg ? `?text=${encodeURIComponent(msg)}` : ''
  }`;

export type Audience = 'mulheres' | 'homens' | 'geral' | 'nao_informado';

