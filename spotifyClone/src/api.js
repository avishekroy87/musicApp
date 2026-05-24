const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  getSongs: () => request('/songs'),
  getPlaylists: () => request('/playlists'),
  getLikedSongs: () => request('/liked'),

  likeSong: (id) => request(`/liked/${id}`, { method: 'POST' }),
  unlikeSong: (id) => request(`/liked/${id}`, { method: 'DELETE' }),

  createSong: (data) => request('/songs', { method: 'POST', body: JSON.stringify(data) }),
  deleteSong: (id) => request(`/songs/${id}`, { method: 'DELETE' }),

  createPlaylist: (data) => request('/playlists', { method: 'POST', body: JSON.stringify(data) }),
  deletePlaylist: (id) => request(`/playlists/${id}`, { method: 'DELETE' }),
};
