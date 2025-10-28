import React, { useEffect, useState } from 'react';

const USERS_API = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log('Fetching from:', USERS_API);
        fetch(USERS_API)
            .then(res => res.json())
            .then(data => {
                const results = data.results || data;
                setUsers(results);
                console.log('Fetched users:', results);
            });
    }, []);

    return (
        <div>
            <h2>Users</h2>
            <ul>
                {users.map((user, idx) => (
                    <li key={user._id || idx}>{user.name} ({user.email})</li>
                ))}
            </ul>
        </div>
    );
}
