import StoreProvider from '@/store/provider';
import type { Metadata } from 'next';
import { Lato, Open_Sans } from 'next/font/google';
import './globals.scss';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css';

const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Spacenus',
  description: 'Screening test using nextjs and react-leaflet',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${openSans.variable}`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
