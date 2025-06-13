'use client';

import {useState, useEffect} from 'react';


type statsType = {
    followers: number,
    plays: number,
    tracks: number,
    following: number
};

type trackData = { v2Id: string };

const Page = () => {
    const [stats, setStats] = useState<statsType>();
    const [tracklistIds, setTracklistIds] = useState<Array<trackData>>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        fetch('https://main.v2.beatstars.com/musician?permalink=quodis&fields=stats')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch stats');
                }
                return response.json();
            })
            .then((data) => {
                if (!data || !data.response || data.response.data.code !== 200) {
                    throw new Error('Failed to fetch stats');
                }
                setStats(data.response.data.stats);
            })
            .catch((error) => {
                console.error('Error fetching stats:', error);
                setError('Error fetching stats');
            });

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
        ) : stats ? (
            <p className='flex flex-col'>
                <span>Beatstars Stats:</span>
                <span>Followers: {stats.followers}</span>
                <span>Plays: {stats.plays}</span>
            </p>
        ) : null}

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
    </>);
};

export default Page;