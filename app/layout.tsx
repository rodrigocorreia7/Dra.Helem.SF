import type { Metadata, Viewport } from 'next';
import { Geist, REM } from 'next/font/google';
import StructuredData from './components/StructuredData';
import '../src/index.css';

const siteUrl = 'https://www.drahelemmachado.com.br';
const title = 'Dra. Hélem Machado Almeida | Saúde Hormonal em SC';
const description =
  'Atendimento médico em saúde hormonal, saúde da mulher, saúde do homem e medicina do estilo de vida com Dra. Hélem Machado Almeida, CRM 40098-SC.';

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
});

const rem = REM({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rem',
});



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
    'geo.placename': 'Balneário Camboriú, Santa Catarina',
    'geo.position': '-26.9842;-48.6378',
    ICBM: '-26.9842, -48.6378',
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
      <head>
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="5vOoibK9krNi/CcFENGGXg"
          async
        />
      </head>
      <body className={`${geist.variable} ${rem.variable} antialiased bg-[#faf8f5] text-[#1e2925] selection:bg-[#c26d47] selection:text-white`}>
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
