import { useEffect, useState } from 'react';
import { buildApiUrl, resolveCollection } from '../api.js';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(buildApiUrl('workouts'));
        const payload = await response.json();
        setWorkouts(resolveCollection(payload));
      } catch (caughtError) {
        setError(caughtError.message || 'Unable to load workouts');
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading workouts…</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="row g-3">
      {workouts.map((workout) => (
        <div key={workout._id || workout.title} className="col-md-6">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title">{workout.title}</h5>
              <p className="card-text mb-1">{workout.category}</p>
              <p className="card-text text-muted mb-1">
                {workout.difficulty} • {workout.durationMinutes} min
              </p>
              <p className="card-text">Equipment: {Array.isArray(workout.equipment) ? workout.equipment.join(', ') : 'None'}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
