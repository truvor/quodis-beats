import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import Analytics from '@/app/components/analytics';
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
  title: 'Quodis Beats',
  description: 'The website of Quodis Beats, a music producer: R&B, Hip-Hop, Trap, Lo-Fi',
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
    <main className='mx-auto p-4 md:w-2/3 lg:w-1/2 xl:w-1/3'>
      {children}
    </main>

    <footer className='mt-8 bg-white shadow-sm dark:bg-gray-800 flex-shrink-0'>
      <div
        className='w-full mx-auto max-w-screen-xl p-4 flex justify-center'>
      <span
        className='text-base text-gray-500 sm:text-center dark:text-gray-400'>Developed by <a
        href='https://risky4real.com'
        className='underline underline-offset-4'>Risky4real</a>
      </span>
      </div>
    </footer>

    <Analytics/>
    </body>
    </html>
  );
}
