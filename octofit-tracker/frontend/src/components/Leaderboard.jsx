import { useEffect, useState } from 'react';
import { buildApiUrl, resolveCollection } from '../api.js';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(buildApiUrl('leaderboard'));
        const payload = await response.json();
        setEntries(resolveCollection(payload));
      } catch (caughtError) {
        setError(caughtError.message || 'Unable to load leaderboard');
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading leaderboard…</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="list-group">
      {entries.map((entry) => (
        <div key={entry._id || entry.rank} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>#{entry.rank || '—'}</strong>
            <div>{entry.userId?.name || entry.userName || 'Unknown user'}</div>
          </div>
          <span className="badge bg-primary rounded-pill">{entry.points ?? 0} pts</span>
        </div>
      ))}
    </div>
  );
}
