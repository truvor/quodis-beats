type trackData = { alias: string, name: string };

export default async function Airbit() {
    const result = await fetch(`${process.env.BASE_URL}/api/airbit`,
      {next: {revalidate: 86400}});

    let trackList: trackData[] = [];
    if (result.ok) {
        trackList = await result.json();
    } else {
        throw new Error('Failed to fetch tracklist from Airbit');
    }

    return (
      <div className='marketplace-widget md:w-2/3 lg:w-1/2 xl:w-1/3'>
          {trackList ? (
            trackList.map(trackData => {
                return (
                  <iframe key={trackData.alias}
                          src={`https://solo.airbit.com/beat/quodisbeats/${trackData.alias}`}
                          width='100%'
                          height='215px'
                          title={trackData.name}
                  ></iframe>
                );
            })
          ) : null}
      </div>);
};
