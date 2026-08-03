import { useEffect, useState } from 'react';
import { buildApiUrl, resolveCollection } from '../api.js';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(buildApiUrl('activities'));
        const payload = await response.json();
        setActivities(resolveCollection(payload));
      } catch (caughtError) {
        setError(caughtError.message || 'Unable to load activities');
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading activities…</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="row g-3">
      {activities.map((activity) => (
        <div key={activity._id || activity.type} className="col-md-6">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title">{activity.type}</h5>
              <p className="card-text mb-1">
                {activity.userId?.name || activity.userName || 'Unknown user'}
              </p>
              <p className="card-text text-muted mb-1">
                {activity.durationMinutes} min • {activity.calories} calories
              </p>
              <p className="card-text">{activity.notes || 'No notes provided'}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
