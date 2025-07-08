import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import Script from "next/script";
import {SpeedInsights} from "@vercel/speed-insights/next";
import './globals.css';
import Navbar from '@/app/components/navbar/navbar';
import Media from "@/app/components/media/media";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Quodis. Buy Beats: R&B, Hip-Hop, Trap, and Lo-Fi',
  description: 'Listen to and buy original R&B, Hip-Hop, Trap, and Lo-Fi beats by Quodis Beats. Available on most DSPs and markeptlaces.',
  icons: {
    icon: '/icon.png'
  },
  keywords: ['Quodis', 'Buy R&B Beats', 'Buy Beats'],
  authors:[{name: 'Risky4real', url: 'https://risky4real.com'}],
  creator: 'Risky4real',
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
    <Media/>
    <main>
      {children}
    </main>

    <footer className='mt-6 bg-white shadow-sm dark:bg-gray-800 flex-shrink-0'>
      <div
        className='w-full mx-auto max-w-screen-xl p-4 flex justify-center'>
      <span
        className='text-base text-gray-500 sm:text-center dark:text-gray-400'>Developed by <a
        href='https://risky4real.com'
        className='underline underline-offset-4'>Risky4real</a>
      </span>
      </div>
    </footer>

    <Script
      src={'https://cloud.umami.is/script.js'}
      data-website-id='de2e8101-b828-4d1f-a43b-98ea88db4186'
      strategy='afterInteractive'
    />
    <SpeedInsights/>
    </body>
    </html>
  );
}
