type trackData = { v2Id: string, title: string };

export default async function Page() {
  const results = await fetch(`${process.env.BASE_URL}/api/beatstars`,
    {next: {revalidate: 86400}});

  let trackList: trackData[] = [];
  if (results.ok) {
    trackList = await results.json();
  } else {
    throw new Error('Failed to fetch tracklist');
  }

  return (
    <div className='marketplace-widget md:w-2/3 lg:w-1/2 xl:w-1/3'>
      {trackList ? (
        trackList.map(track => {
          return (
            <iframe key={track.v2Id}
                    src={`https://beatstars.com/embed/track/?id=${track.v2Id}`}
                    width='100%' height='140'
                    style={{border: 'none'}}
                    title={track.title}></iframe>
          );
        })
      ) : null}
    </div>);
};
