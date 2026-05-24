import './Player.css';

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.05 3.606l13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"/>
  </svg>
);

const PauseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"/>
  </svg>
);

const SkipNextIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.7 3a.7.7 0 0 0-.7.7v6.805L5.05 3.606A.7.7 0 0 0 4 4.212v15.576a.7.7 0 0 0 1.05.606L17 13.495V20.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-1.6z"/>
  </svg>
);

const SkipPrevIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.3 3a.7.7 0 0 1 .7.7v6.805l11.95-6.899a.7.7 0 0 1 1.05.606v15.576a.7.7 0 0 1-1.05.606L7 13.495V20.3a.7.7 0 0 1-.7.7H4.7a.7.7 0 0 1-.7-.7V3.7a.7.7 0 0 1 .7-.7h1.6z"/>
  </svg>
);

const ShuffleIcon = ({ active }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={active ? '#1DB954' : 'currentColor'}>
    <path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L9.17 10.5l-.936 1.12L2.115 4.38A2.25 2.25 0 0 0 .39 3.5zm13.209 7.855a.75.75 0 0 1 1.06 0l2.83 2.828-2.83 2.828a.75.75 0 1 1-1.06-1.06L15.109 15H13.16a2.25 2.25 0 0 1-1.724-.804l-1.39-1.657.914-1.047 1.39 1.657c.328.39.816.617 1.348.617h1.96l-1.017-1.018a.75.75 0 0 1 0-1.06z"/>
  </svg>
);

const RepeatIcon = ({ active }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={active ? '#1DB954' : 'currentColor'}>
    <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5h-1.5v-5A2.25 2.25 0 0 0 12.25 2.5h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5zM8 11.5H6.5l-3 3 3 3H8v-2h4.25a2.25 2.25 0 0 0 2.25-2.25v-5h1.5v5A3.75 3.75 0 0 1 12.25 17H8v2l-3-3 3-3v2z"/>
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? '#1DB954' : 'none'} stroke={filled ? '#1DB954' : '#b3b3b3'} strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const VolumeIcon = ({ level }) => {
  if (level === 0) return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 3.86v16.28a1 1 0 0 1-1.6.8L5.5 16H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3.5l5.9-4.94A1 1 0 0 1 13 3.86zm7.71 3.43a1 1 0 0 1 0 1.42L19.12 10.7l1.59 2a1 1 0 1 1-1.59 1.22L17.54 12l-1.58 2a1 1 0 0 1-1.59-1.22l1.59-2-1.59-1.99a1 1 0 1 1 1.59-1.22L17.54 10l1.59-1.58a1 1 0 0 1 1.41 0z"/>
    </svg>
  );
  if (level < 50) return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 3.86v16.28a1 1 0 0 1-1.6.8L5.5 16H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3.5l5.9-4.94A1 1 0 0 1 13 3.86zm4.04 4.53a3.5 3.5 0 0 1 0 7.22v-1.99a1.5 1.5 0 0 0 0-3.24V8.39z"/>
    </svg>
  );
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 3.86v16.28a1 1 0 0 1-1.6.8L5.5 16H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3.5l5.9-4.94A1 1 0 0 1 13 3.86zm7.02 1.37a7.5 7.5 0 0 1 0 13.54v-2.21a5.5 5.5 0 0 0 0-9.12V5.23zm-3 3a3.5 3.5 0 0 1 0 7.22v-1.99a1.5 1.5 0 0 0 0-3.24V8.39z"/>
    </svg>
  );
};

export default function Player({
  currentSong, isPlaying, setIsPlaying,
  volume, setVolume, progress, setProgress,
  likedIds, toggleLike, nextSong, prevSong,
  shuffle, setShuffle, repeat, setRepeat
}) {
  const isLiked = likedIds.has(currentSong.id);

  const progressStyle = {
    background: `linear-gradient(to right, white ${progress}%, #535353 ${progress}%)`
  };
  const volumeStyle = {
    background: `linear-gradient(to right, white ${volume}%, #535353 ${volume}%)`
  };

  return (
    <div className="player">
      <div className="player-left">
        <img src={currentSong.cover_url} alt={currentSong.title} className="player-thumb" />
        <div className="player-song-info">
          <span className="player-song-title">{currentSong.title}</span>
          <span className="player-song-artist">{currentSong.artist}</span>
        </div>
        <button className={`player-like ${isLiked ? 'liked' : ''}`} onClick={() => toggleLike(currentSong.id)}>
          <HeartIcon filled={isLiked} />
        </button>
      </div>

      <div className="player-center">
        <div className="player-controls">
          <button className={`ctrl-btn ${shuffle ? 'active' : ''}`} onClick={() => setShuffle(!shuffle)} title="Shuffle">
            <ShuffleIcon active={shuffle} />
          </button>
          <button className="ctrl-btn" onClick={prevSong} title="Previous"><SkipPrevIcon /></button>
          <button className="ctrl-btn play-pause" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button className="ctrl-btn" onClick={nextSong} title="Next"><SkipNextIcon /></button>
          <button className={`ctrl-btn ${repeat ? 'active' : ''}`} onClick={() => setRepeat(!repeat)} title="Repeat">
            <RepeatIcon active={repeat} />
          </button>
        </div>
        <div className="progress-bar-wrap">
          <span className="time-label">
            {Math.floor(progress * 3.2 / 100)}:{String(Math.floor((progress * 192 / 100) % 60)).padStart(2, '0')}
          </span>
          <div className="progress-bar-track">
            <input
              type="range" min="0" max="100" value={progress}
              onChange={e => setProgress(Number(e.target.value))}
              style={progressStyle} className="progress-input"
            />
          </div>
          <span className="time-label">3:20</span>
        </div>
      </div>

      <div className="player-right">
        <button className="ctrl-btn-sm" title="Queue">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6zm0 5a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6zm0 5a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6zM3 3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3zm0 8a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H3z"/>
          </svg>
        </button>
        <button className="ctrl-btn-sm" onClick={() => setVolume(v => v === 0 ? 70 : 0)}>
          <VolumeIcon level={volume} />
        </button>
        <div className="volume-track">
          <input
            type="range" min="0" max="100" value={volume}
            onChange={e => setVolume(Number(e.target.value))}
            style={volumeStyle} className="volume-input"
          />
        </div>
      </div>
    </div>
  );
}
