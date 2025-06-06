'use client';

import {useState, useEffect} from 'react';

type trackData = { alias: string };

const Airbit = () => {
    const [tracklistIds, setTracklistIds] = useState<Array<string>>();
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
        id
        name
        alias
        duration
        playCount
        marketplaceUrl
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
                first: 5,
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
                setTracklistIds(responseData.data.searchBeatsByUser.data.map((item: trackData) => item.alias));
            })
            .catch((error) => {
                console.error('Error fetching tracklist:', error);
            });
    }, []);

    return (<>
        {tracklistIds ? (
            tracklistIds.map((id) => {
                return (
                    <iframe key={id} src={`https://solo.airbit.com/beat/quodisbeats/${id}`} width="100%" height="215px"></iframe>
                );
            })


        ) : null}
    </>);
};

export default Airbit;