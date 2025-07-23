import {GenerateTextResult} from "ai";

export default async function Home() {
    let summary: string | undefined;

    const summaryResult = await fetch(`${process.env.BASE_URL}/api/summary`, {
      method: 'POST',
      next: {revalidate: 86400}
    });

    if (summaryResult.ok) {
        summary = (await summaryResult.json() as GenerateTextResult<never, never>).text;
    }

    return (
      <>
          <div className={`summary ${summary ? 'open' : ''}`}>
              <div
                className='bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800'>
                  <p className="font-medium">AI-Made Summary about Quodis</p>
                  <p className="text-amber-700">{summary}</p>
              </div>
          </div>

          <div className='mx-auto p-4 md:w-2/3 lg:w-1/2 xl:w-1/3'>
              <iframe
                className='widget'
                src='https://open.spotify.com/embed/artist/4DyidZchSZfnjYlzxDyvDL?utm_source=generator'
                width='100%'
                height='500'
                frameBorder={0}
                allowFullScreen
                allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                loading='lazy'
                title="Most popular on Summary"
              />
          </div>
      </>
    );
}
