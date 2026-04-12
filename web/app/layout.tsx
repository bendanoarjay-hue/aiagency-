import type { Metadata, Viewport } from 'next';
import { Syne, Cormorant_Garamond, Space_Mono, Archivo } from 'next/font/google';
import './globals.css';

import SmoothScroll from '@/components/SmoothScroll';
import Cursor from '@/components/Cursor';
import Loader from '@/components/Loader';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
  display: 'swap',
});

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  weight: ['400', '500', '700', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://inigo.mnl'),
  title: {
    default: 'INIGO — Luxury Fashion from Manila',
    template: '%s · INIGO',
  },
  description:
    'INIGO is a luxury fashion house from Manila, Philippines. Elevated streetwear meets futuristic couture — hand-cut in Poblacion, engineered for tomorrow.',
  keywords: [
    'INIGO',
    'Manila fashion',
    'luxury fashion Philippines',
    'futuristic couture',
    'elevated streetwear',
    'Poblacion atelier',
  ],
  authors: [{ name: 'INIGO Atelier' }],
  openGraph: {
    type: 'website',
    title: 'INIGO — Luxury Fashion from Manila',
    description:
      'Elevated streetwear meets futuristic couture. A luxury fashion house from Manila.',
    url: 'https://inigo.mnl',
    siteName: 'INIGO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INIGO — Luxury Fashion from Manila',
    description: 'Elevated streetwear meets futuristic couture.',
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${cormorant.variable} ${spaceMono.variable} ${archivo.variable}`}
    >
      <body className="bg-paper text-ink font-sans antialiased selection:bg-ink selection:text-paper">
        <Loader />
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
