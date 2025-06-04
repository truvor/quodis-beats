import Beatstars from '@/app/components/beatstars';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className='row-start-2'>
          <Beatstars></Beatstars>

      </main>
        <footer
            className="row-start-3 flex">
            <span>Developed by</span>
            <a className='underline underline-offset-4 whitespace-pre'
               href='mailto:info@risky4real.com'> Risky4real</a>
        </footer>
    </div>
  );
}
