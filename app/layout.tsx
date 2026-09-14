import type { Metadata, Viewport } from 'next';
import { Josefin_Sans, REM } from 'next/font/google';
import '../src/index.css';

const siteUrl = 'https://www.drahelemmachado.com.br';
const title = 'Dra. Hélem Machado Almeida | Saúde Hormonal em SC';
const description =
  'Atendimento médico em saúde hormonal, saúde da mulher, saúde do homem e medicina do estilo de vida com Dra. Hélem Machado Almeida, CRM 40098-SC.';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-josefin',
});

const rem = REM({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rem',
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: 'Dra. Hélem Machado Almeida - Medicina & Saúde Hormonal',
      description:
        'Clínica médica de modulação hormonal, saúde da mulher, saúde do homem e medicina do estilo de vida.',
      inLanguage: 'pt-BR',
      publisher: {
        '@id': `${siteUrl}/#physician`,
      },
      potentialAction: {
        '@type': 'ReadAction',
        target: [`${siteUrl}/`],
      },
    },
    {
      '@type': 'MedicalBusiness',
      '@id': `${siteUrl}/#physician`,
      name: 'Dra. Hélem Machado Almeida - Medicina Integrativa',
      alternateName: 'Dra. Hélem Machado',
      medicalSpecialty: [
        'GeneralPractice',
      ],
      identifier: 'CRM 40098-SC',
      description:
        'Médica (CRM 40098-SC) e Psicóloga associada ao CBMEV, atuante em modulação hormonal, saúde integrativa, saúde da mulher (climatério e menopausa) e saúde do homem (andropausa e performance).',
      image: `${siteUrl}/images/Dra_Helem_1.webp`,
      telephone: '+554791512620',
      email: 'contato@drahelemmachado.com.br',
      url: siteUrl,
      sameAs: [
        'https://www.doctoralia.com.br/helem-machado-de-almeida/clinico-geral/itajai',
        'https://www.instagram.com/drahelemmachado/',
      ],
      priceRange: '$$$',
      currenciesAccepted: 'BRL',
      paymentAccepted: 'Cartão de Crédito, PIX, Transferência',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Florianópolis',
        addressRegion: 'SC',
        addressCountry: 'BR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -27.5948,
        longitude: -48.5482,
      },
      memberOf: {
        '@type': 'Organization',
        name: 'CBMEV - Colégio Brasileiro de Medicina do Estilo de Vida',
        url: 'https://cbmev.org.br',
      },
      availableService: [
        {
          '@type': 'MedicalProcedure',
          name: 'Modulação e Reposição Hormonal Personalizada',
          description: 'Protocolos de hormônios bioidênticos e otimização hormonal para homens e mulheres.',
        },
        {
          '@type': 'MedicalProcedure',
          name: 'Saúde da Mulher & Menopausa',
          description: 'Tratamento de sintomas do climatério, fogachos, lipedema, tireoide e metabolismo feminino.',
        },
        {
          '@type': 'MedicalProcedure',
          name: 'Saúde do Homem & Andropausa',
          description: 'Otimização de testosterona, vigor físico, saúde prostática e prevenção cardiovascular.',
        },
        {
          '@type': 'MedicalProcedure',
          name: 'Medicina do Estilo de Vida & Reversão Metabólica',
          description: 'Manejo clínico de esteatose hepática, pré-diabetes e síndrome metabólica.',
        },
      ],
      potentialAction: {
        '@type': 'ReserveAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate:
            'https://wa.me/554791512620?text=Ol%C3%A1%2C%20Dra.%20H%C3%A9lem!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20agendamento%20de%20consulta.',
          inLanguage: 'pt-BR',
          actionPlatform: [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform',
            'http://schema.org/IOSPlatform',
            'http://schema.org/AndroidPlatform',
          ],
        },
        result: {
          '@type': 'Reservation',
          name: 'Agendamento de Consulta Médica com Dra. Hélem Machado Almeida',
        },
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    'Dra. Hélem Machado Almeida',
    'CRM 40098-SC',
    'médica e psicóloga',
    'reposição hormonal',
    'modulação hormonal',
    'saúde da mulher',
    'menopausa',
    'saúde do homem',
    'andropausa',
    'medicina integrativa',
  ],
  authors: [{ name: 'Dra. Hélem Machado Almeida' }],
  alternates: {
    canonical: '/',
    types: {
      'text/markdown': [
        { url: '/llms.txt', title: 'LLM Summary' },
        { url: '/llms-full.txt', title: 'LLM Full Documentation' },
      ],
    },
  },
  verification: {
    google: 'Cb9v0Mri76qqg61YPpB_XqfV_6yKCgds5GT3TAUJvl4',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Dra. Hélem Machado Almeida - Saúde Hormonal & Medicina Integrativa',
    description:
      'Recupere sua energia, equilíbrio hormonal e saúde metabólica com uma medicina que olha você por inteiro. CRM 40098-SC.',
    siteName: 'Dra. Hélem Machado Almeida Medicina',
    locale: 'pt_BR',
    images: [{ url: '/images/Dra_Helem_1.webp' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dra. Hélem Machado Almeida - Saúde Hormonal & Medicina Integrativa',
    description:
      'Atendimento médico e psicológico especializado em modulação hormonal, saúde da mulher, andropausa e medicina do estilo de vida.',
    images: ['/images/Dra_Helem_1.webp'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.webp', type: 'image/webp' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  other: {
    'ai:ready': 'true',
    'ai:knowledge': `${siteUrl}/llms.txt`,
    'ai:actions': `${siteUrl}/llms.txt#acoes`,
    'geo.region': 'BR-SC',
    'geo.placename': 'Florianópolis, Santa Catarina',
    'geo.position': '-27.5948;-48.5482',
    ICBM: '-27.5948, -48.5482',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0d2d26',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" dir="ltr">
      <body className={`${josefin.variable} ${rem.variable} antialiased bg-[#faf8f5] text-[#1e2925] selection:bg-[#c26d47] selection:text-white`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
