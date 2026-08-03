import { useEffect, useState } from 'react';
import { buildApiUrl, resolveCollection } from '../api.js';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(buildApiUrl('teams'));
        const payload = await response.json();
        setTeams(resolveCollection(payload));
      } catch (caughtError) {
        setError(caughtError.message || 'Unable to load teams');
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading teams…</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="row g-3">
      {teams.map((team) => (
        <div key={team._id || team.name} className="col-md-6">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title">{team.name}</h5>
              <p className="card-text mb-1">Coach: {team.coach}</p>
              <p className="card-text text-muted">
                Members: {Array.isArray(team.members) ? team.members.length : 0}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
