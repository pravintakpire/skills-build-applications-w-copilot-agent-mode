const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export function buildApiUrl(resource) {
  const normalizedResource = String(resource || '').replace(/^\/+/, '');
  return `${apiBaseUrl}/${normalizedResource}`;
}

export function resolveCollection(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  if (Array.isArray(payload?.users)) {
    return payload.users;
  }

  if (Array.isArray(payload?.activities)) {
    return payload.activities;
  }

  if (Array.isArray(payload?.teams)) {
    return payload.teams;
  }

  if (Array.isArray(payload?.workouts)) {
    return payload.workouts;
  }

  if (Array.isArray(payload?.leaderboard)) {
    return payload.leaderboard;
  }

  return [];
}
