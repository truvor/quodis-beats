type trackData = { alias: string, name: string };

export default async function Airbit() {
    const trackListQuery = `
  query SearchBeatsByUser($userId: ID!, $first: Int!, $page: Int!, $search: String!) {
  searchBeatsByUser(
    first: $first
    page: $page
    userId: $userId
    search: $search
    onlyMarketPlace: true
  ) {
    data {
      ... on Beat {
        name
        alias
      }
    }
    paginatorInfo {
      hasMorePages
      total
    }
  }
}
`;
    const trackListBody = {
        operationName: 'SearchBeatsByUser',
        query: trackListQuery,
        variables: {
            first: 3,
            page: 1,
            search: '',
            userId: '98319'
        }
    };

    let trackList: Array<trackData> | undefined = undefined;

    try {
        const result = await fetch('https://api.airbit.com/gpl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trackListBody),
            next: {revalidate: 86400}
        });

        if (!result.ok) {
            throw new Error('Failed to fetch tracklist');

        }

        const trackListData = await result.json();
        trackList = trackListData.data.searchBeatsByUser.data.map((item: trackData) => ({
            alias: item.alias,
            name: item.name
        }));

    } catch (error: unknown) {
        console.error('Error fetching tracklist:', error);
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
