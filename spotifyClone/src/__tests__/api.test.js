import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from '../api';

const mockFetch = vi.fn();
global.fetch = mockFetch;

function makeResponse(body, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  };
}

beforeEach(() => {
  mockFetch.mockReset();
});

describe('api.getSongs', () => {
  it('fetches songs from /songs', async () => {
    const songs = [{ id: 1, title: 'Test', artist: 'A', album: 'B', duration: '3:00', cover_url: '', is_liked: false }];
    mockFetch.mockResolvedValueOnce(makeResponse(songs));

    const result = await api.getSongs();
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/songs'),
      expect.objectContaining({ headers: { 'Content-Type': 'application/json' } })
    );
    expect(result).toEqual(songs);
  });

  it('throws on non-ok response', async () => {
    mockFetch.mockResolvedValueOnce(makeResponse({}, 500));
    await expect(api.getSongs()).rejects.toThrow('API error 500');
  });
});

describe('api.getPlaylists', () => {
  it('fetches playlists from /playlists', async () => {
    mockFetch.mockResolvedValueOnce(makeResponse([]));
    const result = await api.getPlaylists();
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/playlists'),
      expect.any(Object)
    );
    expect(result).toEqual([]);
  });
});

describe('api.likeSong / unlikeSong', () => {
  it('POSTs to /liked/:id', async () => {
    mockFetch.mockResolvedValueOnce(makeResponse({ message: 'Song liked' }));
    const result = await api.likeSong(42);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/liked/42'),
      expect.objectContaining({ method: 'POST' })
    );
    expect(result.message).toBe('Song liked');
  });

  it('DELETEs /liked/:id', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, status: 200, json: () => Promise.resolve({ message: 'Song unliked' }) });
    await api.unlikeSong(42);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/liked/42'),
      expect.objectContaining({ method: 'DELETE' })
    );
  });
});

describe('api.createSong', () => {
  it('POSTs song data as JSON', async () => {
    const payload = { title: 'New', artist: 'A', album: 'B', duration: '3:00', cover_url: '' };
    mockFetch.mockResolvedValueOnce(makeResponse({ id: 1, ...payload, is_liked: false }, 201));

    await api.createSong(payload);
    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toContain('/songs');
    expect(options.method).toBe('POST');
    expect(JSON.parse(options.body)).toEqual(payload);
  });
});

describe('api.deleteSong', () => {
  it('DELETEs /songs/:id and returns null for 204', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, status: 204, json: vi.fn() });
    const result = await api.deleteSong(5);
    expect(result).toBeNull();
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/songs/5'),
      expect.objectContaining({ method: 'DELETE' })
    );
  });
});
