'use client';

import {useState, useEffect} from 'react';


type statsType = {
    followers: number,
    plays: number,
    tracks: number,
    following: number
};

const Stats = () => {
    const [stats, setStats] = useState<statsType>();
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
    }, []);

    return (<>
        {error ? (
            <span>{error}</span>
        ) : stats ? (
            <p>
                <span>Beatstars Stats:</span>
                <span>Followers: {stats.followers}</span>
                <span>Plays: {stats.plays}</span>
            </p>
        ) : null}
    </>);
};

export default Stats;