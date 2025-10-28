import React, { useEffect, useState } from 'react';

const LEADERBOARD_API = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

export default function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        console.log('Fetching from:', LEADERBOARD_API);
        fetch(LEADERBOARD_API)
            .then(res => res.json())
            .then(data => {
                const results = data.results || data;
                setLeaderboard(results);
                console.log('Fetched leaderboard:', results);
            });
    }, []);

    return (
        <div>
            <h2>Leaderboard</h2>
            <ul>
                {leaderboard.map((entry, idx) => (
                    <li key={entry._id || idx}>{entry.team?.name || 'Team'}: {entry.points} pts</li>
                ))}
            </ul>
        </div>
    );
}
