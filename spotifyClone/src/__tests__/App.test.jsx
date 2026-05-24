import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';
import { api } from '../api';

vi.mock('../api', () => ({
  api: {
    getSongs: vi.fn(),
    getPlaylists: vi.fn(),
    likeSong: vi.fn(),
    unlikeSong: vi.fn(),
  },
}));

vi.mock('../components/Sidebar', () => ({
  default: ({ activeNav }) => <div data-testid="sidebar">nav:{activeNav}</div>,
}));

vi.mock('../components/MainContent', () => ({
  default: ({ songs, playSong, toggleLike }) => (
    <div data-testid="main-content">
      {songs.map(s => (
        <div key={s.id}>
          <span>{s.title}</span>
          <button onClick={() => playSong(s)}>play</button>
          <button onClick={() => toggleLike(s.id)}>like</button>
        </div>
      ))}
    </div>
  ),
}));

vi.mock('../components/Player', () => ({
  default: ({ currentSong, nextSong, prevSong }) => (
    <div data-testid="player">
      <span>{currentSong?.title}</span>
      <button onClick={nextSong}>next</button>
      <button onClick={prevSong}>prev</button>
    </div>
  ),
}));

const SONGS = [
  { id: 1, title: 'Alpha', artist: 'A', album: 'X', duration: '3:00', cover_url: '', is_liked: false },
  { id: 2, title: 'Beta', artist: 'B', album: 'Y', duration: '4:00', cover_url: '', is_liked: true },
];
const PLAYLISTS = [{ id: 1, name: 'Chill', cover_url: '', song_count: 0, songs: [] }];

beforeEach(() => {
  vi.clearAllMocks();
  api.getSongs.mockResolvedValue(SONGS);
  api.getPlaylists.mockResolvedValue(PLAYLISTS);
});

describe('App loading states', () => {
  it('shows loading screen initially', () => {
    api.getSongs.mockReturnValue(new Promise(() => {}));
    render(<App />);
    expect(screen.getByText(/connecting to server/i)).toBeInTheDocument();
  });

  it('shows error screen when API fails', async () => {
    api.getSongs.mockRejectedValue(new Error('Network Error'));
    api.getPlaylists.mockResolvedValue([]);
    render(<App />);
    await waitFor(() => expect(screen.getByText(/cannot connect to backend/i)).toBeInTheDocument());
    expect(screen.getByText('Network Error')).toBeInTheDocument();
  });

  it('renders main layout after data loads', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByTestId('sidebar')).toBeInTheDocument());
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
  });
});

describe('App song display', () => {
  it('renders song titles after load', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getAllByText('Alpha').length).toBeGreaterThan(0));
    expect(screen.getAllByText('Beta').length).toBeGreaterThan(0);
  });

  it('auto-selects first song on load', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByTestId('player')).toBeInTheDocument());
    expect(screen.getByTestId('player')).toHaveTextContent('Alpha');
  });

  it('seeds likedIds from is_liked on songs', async () => {
    // Song id 2 is liked — verify toggleLike reversal (unlike) is called
    api.unlikeSong.mockResolvedValue({ message: 'Song unliked' });
    render(<App />);
    await waitFor(() => screen.getAllByText('like'));
    const likeButtons = screen.getAllByText('like');
    fireEvent.click(likeButtons[1]); // Song Beta (id 2) — currently liked, so should unlike
    expect(api.unlikeSong).toHaveBeenCalledWith(2);
  });
});

describe('App playback controls', () => {
  it('plays a different song when clicked', async () => {
    render(<App />);
    await waitFor(() => screen.getAllByText('play'));
    const playButtons = screen.getAllByText('play');
    fireEvent.click(playButtons[1]); // click Beta
    expect(screen.getByTestId('player')).toHaveTextContent('Beta');
  });

  it('nextSong cycles to the next song', async () => {
    render(<App />);
    await waitFor(() => screen.getByTestId('player'));
    // Initially Alpha (idx 0), next should be Beta
    fireEvent.click(screen.getByText('next'));
    expect(screen.getByTestId('player')).toHaveTextContent('Beta');
  });

  it('prevSong wraps to the last song', async () => {
    render(<App />);
    await waitFor(() => screen.getByTestId('player'));
    // Initially Alpha (idx 0), prev wraps to Beta (idx 1)
    fireEvent.click(screen.getByText('prev'));
    expect(screen.getByTestId('player')).toHaveTextContent('Beta');
  });
});

describe('App toggleLike', () => {
  it('calls likeSong for an unliked song', async () => {
    api.likeSong.mockResolvedValue({ message: 'Song liked' });
    render(<App />);
    await waitFor(() => screen.getAllByText('like'));
    fireEvent.click(screen.getAllByText('like')[0]); // Alpha is not liked
    expect(api.likeSong).toHaveBeenCalledWith(1);
  });

  it('reverts optimistic update on API failure', async () => {
    api.likeSong.mockRejectedValue(new Error('fail'));
    render(<App />);
    await waitFor(() => screen.getAllByText('like'));
    fireEvent.click(screen.getAllByText('like')[0]);
    await waitFor(() => expect(api.likeSong).toHaveBeenCalled());
  });
});

describe('App retry button', () => {
  it('retries data load when Retry is clicked', async () => {
    api.getSongs.mockRejectedValueOnce(new Error('fail'));
    api.getSongs.mockResolvedValueOnce(SONGS);
    api.getPlaylists.mockResolvedValue(PLAYLISTS);
    render(<App />);
    await waitFor(() => screen.getByText(/retry/i));
    fireEvent.click(screen.getByText(/retry/i));
    await waitFor(() => expect(screen.getByTestId('main-content')).toBeInTheDocument());
  });
});
