import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import Analytics from '@/app/components/analytics';

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
    <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <nav>
      <ul>
        <li>
          <Link href="/"> <span>Beatstars</span></Link>
        </li>
        <li>
          <Link href="/spotify"> <span>Spotify</span></Link>
        </li>
        <li>
          <Link href="/airbit"><span>Airbit</span></Link>
        </li>
        <li>
          <Link href="/more"><span>More</span></Link>
        </li>
      </ul>
    </nav>
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
