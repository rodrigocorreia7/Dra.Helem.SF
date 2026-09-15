import React from 'react';
import { site } from '@/src/lib/site';

export default function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: site.doctor,
    image: `${site.url}/images/Dra_Helem_1.webp`,
    description:
      'Médica e Psicóloga especialista em Medicina do Estilo de Vida, saúde hormonal, saúde da mulher e saúde do homem.',
    medicalSpecialty: ['https://schema.org/Endocrine', 'https://schema.org/PreventiveMedicine'],
    url: site.url,
    telephone: site.telephone,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.streetAddress,
      addressLocality: site.city,
      addressRegion: site.state,
      addressCountry: site.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.latitude,
      longitude: site.longitude,
    },
    sameAs: [
      site.instagram,
    ],
    identifier: {
      '@type': 'PropertyValue',
      name: 'CRM',
      value: site.crmNumber,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
