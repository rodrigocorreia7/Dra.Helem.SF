/*
 * ─────────────────────────────────────────────────────────────
 *  EDITE AQUI ANTES DE PUBLICAR
 *  Os campos entre [colchetes] são informações que só a médica tem.
 * ─────────────────────────────────────────────────────────────
 */
export const site = {
  doctor: 'Dra. Hélem Machado Almeida',
  shortName: 'Dra. Hélem',
  crm: 'CRM 40098-SC',

  // Telefone no formato internacional, só números (55 + DDD + número)
  whatsappNumber: '5548999999999', // ← [WhatsApp da Dra. Hélem]
  whatsappLabel: '[WhatsApp]',
  instagram: 'https://instagram.com/', // ← [Instagram]
  instagramLabel: '[Instagram]',
  email: 'contato@drahelem.com.br', // ← [E-mail]

  city: '[cidade]',
  attendance: 'Atendimento presencial em [cidade] e online para todo o Brasil',
  yearsLabel: '[X] anos', // ← [anos de atuação]

  associations: 'Membro da ABMEV — Associação Brasileira de Medicina do Estilo de Vida',
};

export const whatsappLink = (msg?: string) =>
  `https://wa.me/${site.whatsappNumber}${
    msg ? `?text=${encodeURIComponent(msg)}` : ''
  }`;

export type Audience = 'mulheres' | 'homens' | 'nao_informado';
