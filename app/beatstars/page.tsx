'use client';

import {useState, useEffect} from 'react';

type trackData = { v2Id: string };

const Page = () => {
    const [tracklistIds, setTracklistIds] = useState<Array<trackData>>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        const query = `
  query getProfileContentTrackList($memberId: String!, $page: Int, $size: Int) {
    profileTracks(memberId: $memberId, page: $page, size: $size) {
      content {
        v2Id
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
            }};

        fetch('https://core.prod.beatstars.net/graphql?op=getProfileContentTrackList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch tracklist');
                }
                return response.json()}
            )
            .then(data => {
                if (!data || !data.data ) {
                    throw new Error('Failed to fetch tracklist');
                }

                setTracklistIds(data.data.profileTracks.content);
            })
            .catch(error => {
                console.error('Error fetching tracklist:', error);
                setError('Error fetching tracklist');
            });
    }, []);

    return (<>
        {error ? (
          <span>{error}</span>
        ) : null}

        <div className='marketplace-widget'>
            {tracklistIds ? (
              tracklistIds.map(track => {
                  return (
                    <iframe key={track.v2Id}
                            src={`https://beatstars.com/embed/track/?id=${track.v2Id}`}
                            width='100%' height='140'
                            style={{border: 'none'}}></iframe>
                  );
              })
            ) : null}
        </div>
    </>);
};

export default Page;