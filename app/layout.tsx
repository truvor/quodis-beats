import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import Analytics from '@/app/components/analytics';
import Navbar from '@/app/components/navbar';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Quodis Beats',
  description: 'The website of Quodis, a music producer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <Navbar/>
    <main className='ps-80 pe-80'>
      {children}
    </main>
    <footer className='flex justify-center'>
      <span>Developed by&nbsp;</span>
      <a className='underline underline-offset-4'
         href='https://risky4real.com'>Risky4real</a>
    </footer>
    <Analytics/>
    </body>
    </html>
  );
}
