import { useEffect, useState } from 'react';
import { buildApiUrl, resolveCollection } from '../api.js';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(buildApiUrl('users'));
        const payload = await response.json();
        setUsers(resolveCollection(payload));
      } catch (caughtError) {
        setError(caughtError.message || 'Unable to load users');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading users…</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="row g-3">
      {users.map((user) => (
        <div key={user._id || user.email || user.name} className="col-md-6">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text mb-1">{user.email}</p>
              <p className="card-text text-muted">
                Goals: {Array.isArray(user.goals) ? user.goals.join(', ') : 'No goals yet'}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
