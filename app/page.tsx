import {GenerateTextResult} from "ai";
import Image from "next/image";
import {Item} from "@/app/components/item/item";

type linkType = {
  name: string,
  url: string,
}

export default async function Home() {
    let summary: string | undefined;

  const linkList = [
    {name: 'Spotify', url: 'https://open.spotify.com/album/4BZoNvMOn2pjZwkOTgsg93?si=9Wfv8RyBT9yuMaCxeuLBzg'},
    {name: 'Apple', url: 'https://music.apple.com/us/album/the-final-chapter/1828336266'},
    {name: 'YT.Music', url: 'https://music.youtube.com/playlist?list=OLAK5uy_nP7pqPqWx3rfDKtPUjbyvOphxtatilR2o'},
    {name: 'Deezer', url: 'https://link.deezer.com/s/30L2NRNXiZjfbHm9ICOkj'},
    {name: 'Audiomack', url: 'https://audiomack.com/quodis/album/the-final-chapter'},
    {name: 'Bandcamp', url: 'https://quodis.bandcamp.com/album/the-final-chapter'},
    {name: 'Pandora', url: 'https://www.pandora.com/artist/quodis/the-final-chapter/AL7jmtgqjgwv2Jc'},
    {name: 'Amazon', url: 'https://music.amazon.com/albums/B0FJG2MKR5'},
    {name: 'iHeart', url: 'https://www.iheart.com/artist/quodis-32463888/albums/the-final-chapter-341168765/'}
  ];

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
          <Image className={'cover'} src='/final_chapter_600x600.jpg'
                 width={600} height={600}
                 alt='EP artwork'/>
          <div className={'button-grid'}>
            {linkList.map((item: linkType) => {
              return (<Item key={item.url} name={item.name} url={item.url}/>);
            })}
          </div>
        </div>
      </>
    );
}
