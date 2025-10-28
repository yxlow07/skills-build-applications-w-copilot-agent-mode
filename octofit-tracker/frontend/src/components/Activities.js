import React, { useEffect, useState } from 'react';

const ACTIVITIES_API = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

export default function Activities() {
    const [activities, setActivities] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        console.log('Fetching from:', ACTIVITIES_API);
        fetch(ACTIVITIES_API)
            .then(res => res.json())
            .then(data => {
                const results = data.results || data;
                setActivities(results);
                console.log('Fetched activities:', results);
            });
    }, []);

    return (
        <div className="card mb-4">
            <div className="card-header bg-info text-white">
                <h2 className="h4 mb-0">Activities</h2>
            </div>
            <div className="card-body">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Type</th>
                            <th>Duration (min)</th>
                            <th>Calories</th>
                            <th>Date</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.map((activity, idx) => (
                            <tr key={activity._id || idx}>
                                <td>{activity.type}</td>
                                <td>{activity.duration}</td>
                                <td>{activity.calories}</td>
                                <td>{activity.date}</td>
                                <td>
                                    <button className="btn btn-sm btn-outline-primary" onClick={() => setSelected(activity)} data-bs-toggle="modal" data-bs-target="#activityModal">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Modal */}
                <div className="modal fade" id="activityModal" tabIndex="-1" aria-labelledby="activityModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="activityModalLabel">Activity Details</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {selected && (
                                    <ul className="list-group">
                                        <li className="list-group-item"><strong>Type:</strong> {selected.type}</li>
                                        <li className="list-group-item"><strong>Duration:</strong> {selected.duration} min</li>
                                        <li className="list-group-item"><strong>Calories:</strong> {selected.calories}</li>
                                        <li className="list-group-item"><strong>Date:</strong> {selected.date}</li>
                                    </ul>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
