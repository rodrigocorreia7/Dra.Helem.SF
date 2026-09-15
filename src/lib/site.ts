export const site = {
  doctor: 'Dra. Hélem Machado Almeida',
  shortName: 'Dra. Hélem',
  crm: 'CRM 40098-SC',
  crmNumber: '40098-SC',
  titles: 'Médica & Psicóloga',
  association: 'Membro do Colégio Brasileiro de Medicina do Estilo de Vida (CBMEV)',
  
  // Contatos
  whatsappNumber: '554791512620', // WhatsApp institucional da clínica (+55 47 9151-2620)
  whatsappFormatted: '+55 47 9151-2620',
  telephone: '+554791512620',
  whatsappLabel: 'Falar no WhatsApp',
  instagram: 'https://instagram.com/drahelemmachado',
  instagramLabel: '@drahelemmachado',
  email: 'contato@drahelemmachado.com.br',
  
  // Localização e Endereço
  streetAddress: 'Rua 981, 196 - Centro',
  city: 'Balneário Camboriú',
  state: 'SC',
  postalCode: '88330-750',
  country: 'BR',
  address: 'Rua 981, 196 - Centro, Balneário Camboriú - SC',
  latitude: -26.9842,
  longitude: -48.6378,
  
  url: 'https://www.drahelemmachado.com.br',
  attendance: 'Atendimento presencial em Balneário Camboriú/SC e Telemedicina para todo o Brasil',
  
  headline: 'Recupere sua energia, equilíbrio hormonal e saúde metabólica com uma medicina que olha você por inteiro.',
  subheadline: 'Cansaço constante, ganho de peso sem explicação, insônia, alterações de humor ou exames alterados? A resposta não está em fórmulas mágicas nem em consultas superficiais, mas na investigação médica profunda das causas raízes do seu corpo.',
};

export const whatsappLink = (msg?: string) =>
  `https://wa.me/${site.whatsappNumber}${
    msg ? `?text=${encodeURIComponent(msg)}` : ''
  }`;

export type Audience = 'mulheres' | 'homens' | 'geral' | 'nao_informado';

