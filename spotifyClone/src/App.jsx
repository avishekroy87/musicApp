import { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Player from './components/Player';
import { api } from './api';
import './App.css';

export default function App() {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(30);
  const [likedIds, setLikedIds] = useState(new Set());
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [songsData, playlistsData] = await Promise.all([
        api.getSongs(),
        api.getPlaylists(),
      ]);
      setSongs(songsData);
      setPlaylists(playlistsData);
      setLikedIds(new Set(songsData.filter(s => s.is_liked).map(s => s.id)));
      if (songsData.length > 0 && !currentSong) {
        setCurrentSong(songsData[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const toggleLike = async (id) => {
    const isLiked = likedIds.has(id);
    // Optimistic update
    setLikedIds(prev => {
      const next = new Set(prev);
      isLiked ? next.delete(id) : next.add(id);
      return next;
    });
    try {
      if (isLiked) {
        await api.unlikeSong(id);
      } else {
        await api.likeSong(id);
      }
    } catch {
      // Revert on failure
      setLikedIds(prev => {
        const next = new Set(prev);
        isLiked ? next.add(id) : next.delete(id);
        return next;
      });
    }
  };

  const playSong = (song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  const nextSong = () => {
    if (!songs.length) return;
    const idx = songs.findIndex(s => s.id === currentSong?.id);
    const next = songs[(idx + 1) % songs.length];
    setCurrentSong(next);
    setIsPlaying(true);
    setProgress(0);
  };

  const prevSong = () => {
    if (!songs.length) return;
    const idx = songs.findIndex(s => s.id === currentSong?.id);
    const prev = songs[(idx - 1 + songs.length) % songs.length];
    setCurrentSong(prev);
    setIsPlaying(true);
    setProgress(0);
  };

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-logo">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="#1DB954">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
        </div>
        <p>Connecting to server...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-loading">
        <div className="error-icon">⚠️</div>
        <h2>Cannot connect to backend</h2>
        <p className="error-detail">{error}</p>
        <p className="error-hint">Make sure FastAPI is running on <code>http://localhost:8000</code></p>
        <button className="retry-btn" onClick={loadData}>Retry</button>
      </div>
    );
  }

  return (
    <div className="app">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} playlists={playlists} />
      <MainContent
        songs={songs}
        playlists={playlists}
        currentSong={currentSong}
        isPlaying={isPlaying}
        likedIds={likedIds}
        toggleLike={toggleLike}
        playSong={playSong}
        activeNav={activeNav}
      />
      {currentSong && (
        <Player
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          volume={volume}
          setVolume={setVolume}
          progress={progress}
          setProgress={setProgress}
          likedIds={likedIds}
          toggleLike={toggleLike}
          nextSong={nextSong}
          prevSong={prevSong}
          shuffle={shuffle}
          setShuffle={setShuffle}
          repeat={repeat}
          setRepeat={setRepeat}
        />
      )}
    </div>
  );
}
