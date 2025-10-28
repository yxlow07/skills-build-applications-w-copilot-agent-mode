import React, { useEffect, useState } from 'react';

const WORKOUTS_API = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

export default function Workouts() {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        console.log('Fetching from:', WORKOUTS_API);
        fetch(WORKOUTS_API)
            .then(res => res.json())
            .then(data => {
                const results = data.results || data;
                setWorkouts(results);
                console.log('Fetched workouts:', results);
            });
    }, []);

    return (
        <div>
            <h2>Workouts</h2>
            <ul>
                {workouts.map((workout, idx) => (
                    <li key={workout._id || idx}>{workout.name} - {workout.difficulty}</li>
                ))}
            </ul>
        </div>
    );
}
