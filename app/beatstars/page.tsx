type trackData = { v2Id: string, title: string };

export default async function Page () {
    const query = `
  query getProfileContentTrackList($memberId: String!, $page: Int, $size: Int) {
    profileTracks(memberId: $memberId, page: $page, size: $size) {
      content {
        v2Id
        title
      }
    }
  }
`;

    const body = {
        operationName: 'getProfileContentTrackList',
        query,
        variables: {
            memberId: 'MR141266',
            page: 0,
            size: 5,
        }
    };

    let trackList: Array<trackData> | undefined = undefined;

    try {
        const result = await fetch('https://core.prod.beatstars.net/graphql?op=getProfileContentTrackList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
            next: {revalidate: 86400}
        });

        if (!result.ok) {
            throw new Error('Failed to fetch tracklist');

        }
        const trackListData = await result.json();
        if (!trackListData || !trackListData.data) {
            throw new Error('Failed to fetch tracklist');
        }

        trackList = trackListData.data.profileTracks.content;

    } catch (error) {
        console.error('Error fetching tracklist:', error);
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
