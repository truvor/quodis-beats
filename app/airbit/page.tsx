'use client';

import {useState, useEffect} from 'react';

type trackData = { alias: string, name: string };

const Airbit = () => {
    const [tracklistData, setTracklistData] = useState<Array<trackData>>();
    useEffect(() => {

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
            }};

        fetch('https://api.airbit.com/gpl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trackListBody),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch tracklist');
                }
                return response.json();
            })
            .then((responseData) => {
                setTracklistData(responseData.data.searchBeatsByUser.data.map((item: trackData) => ({
                    alias: item.alias,
                    name: item.name
                })));
            })
            .catch((error) => {
                console.error('Error fetching tracklist:', error);
            });
    }, []);

    return (<>
        {tracklistData ? (
            tracklistData.map(trackData => {
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
    </>);
};

export default Airbit;