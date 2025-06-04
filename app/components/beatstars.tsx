'use client';

import {useState, useEffect} from 'react';


type statsType = {
    followers: number,
    plays: number,
    tracks: number,
    following: number
};

const Beatstars = () => {
    const [stats, setStats] = useState<statsType>();
    const [tracklistIds, setTracklistIds] = useState<string>();
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
/*        fetch('https://core.prod.beatstars.net/graphql?op=getProfileContentTrackList')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch tracklist');
                }
                return response.json();
            })
            .then((data) => {
                if (!data || !data.response || !Array.isArray(data.response.data.content)) {
                    throw new Error('Failed to fetch tracklist');
                }
                setTracklistIds(data.response.data.content);
            })
            .catch((error) => {
                console.error('Error fetching tracklist:', error);
                setError('Error fetching tracklist');
            });*/
    }, []);

    return (<>
        {error ? (
            <span>{error}</span>
        ) : stats ? (
            <p className='flex flex-col'>
                <span>Beatstars Stats:</span>
                <span>Followers: {stats.followers}</span>
                <span>Plays: {stats.plays}</span>

                <span>Tracks: {tracklistIds}</span>
            </p>
        ) : null}
    </>);
};

export default Beatstars;