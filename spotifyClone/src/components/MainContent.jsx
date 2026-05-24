import './MainContent.css';

const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.05 3.606l13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"/>
  </svg>
);

const PauseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"/>
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? '#1DB954' : 'none'} stroke={filled ? '#1DB954' : 'currentColor'} strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const MoreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
  </svg>
);

function SongRow({ song, index, isPlaying, isCurrent, onPlay, isLiked, onLike }) {
  return (
    <div className={`song-row ${isCurrent ? 'current' : ''}`} onDoubleClick={() => onPlay(song)}>
      <div className="song-num">
        {isCurrent && isPlaying ? (
          <span className="playing-bars"><span /><span /><span /></span>
        ) : (
          <span className="track-num">{index + 1}</span>
        )}
        <button className="play-btn-small" onClick={() => onPlay(song)}>
          {isCurrent && isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>
      <div className="song-info">
        <img src={song.cover_url} alt={song.title} className="song-thumb" />
        <div className="song-text">
          <span className={`song-title ${isCurrent ? 'green' : ''}`}>{song.title}</span>
          <span className="song-artist">{song.artist}</span>
        </div>
      </div>
      <div className="song-album">{song.album}</div>
      <div className="song-actions">
        <button
          className={`like-btn ${isLiked ? 'liked' : ''}`}
          onClick={(e) => { e.stopPropagation(); onLike(song.id); }}
        >
          <HeartIcon filled={isLiked} />
        </button>
        <span className="song-duration">{song.duration}</span>
        <button className="more-btn"><MoreIcon /></button>
      </div>
    </div>
  );
}

function PlaylistCard({ playlist }) {
  return (
    <div className="card">
      <div className="card-img-wrap">
        <img src={playlist.cover_url} alt={playlist.name} className="card-img" />
        <button className="card-play-btn"><PlayIcon /></button>
      </div>
      <p className="card-title">{playlist.name}</p>
      <p className="card-sub">{playlist.song_count} songs</p>
    </div>
  );
}

const GREETING_ITEMS = [
  { title: 'Liked Songs', color: '#4a00c8', icon: '♥' },
  { title: 'Daily Mix 1', color: '#1e3264', icon: '♪' },
  { title: 'Top Hits', color: '#056952', icon: '★' },
  { title: 'Chill Mix', color: '#5e1414', icon: '~' },
  { title: 'Discover Weekly', color: '#0d3564', icon: '◈' },
  { title: 'Release Radar', color: '#154025', icon: '◉' },
];

export default function MainContent({ songs, playlists, currentSong, isPlaying, likedIds, toggleLike, playSong, activeNav }) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const SongTable = ({ songList }) => (
    <div className="song-table">
      <div className="song-table-header">
        <span>#</span><span>Title</span><span>Album</span><span>Duration</span>
      </div>
      <div className="divider-line" />
      {songList.map((song, i) => (
        <SongRow
          key={song.id}
          song={song}
          index={i}
          isPlaying={isPlaying}
          isCurrent={currentSong?.id === song.id}
          onPlay={playSong}
          isLiked={likedIds.has(song.id)}
          onLike={toggleLike}
        />
      ))}
    </div>
  );

  return (
    <main className="main-content">
      <div className="main-header">
        <div className="nav-arrows">
          <button className="arrow-btn">&#8249;</button>
          <button className="arrow-btn">&#8250;</button>
        </div>
        <div className="header-right">
          <button className="pill-btn">Upgrade</button>
          <button className="avatar-btn">A</button>
        </div>
      </div>

      <div className="main-scroll">
        {activeNav === 'home' && (
          <>
            <h1 className="greeting">{getGreeting()}</h1>
            <div className="greeting-grid">
              {GREETING_ITEMS.map((item, i) => (
                <div key={i} className="greeting-card" style={{ background: `linear-gradient(90deg, ${item.color}, #282828)` }}>
                  <div className="greeting-card-icon" style={{ background: item.color }}>{item.icon}</div>
                  <span>{item.title}</span>
                  <button className="greeting-play-btn"><PlayIcon /></button>
                </div>
              ))}
            </div>

            <section className="section">
              <div className="section-header">
                <h2>Featured Playlists</h2>
                <button className="show-all">Show all</button>
              </div>
              <div className="cards-row">
                {playlists.map(pl => <PlaylistCard key={pl.id} playlist={pl} />)}
              </div>
            </section>

            <section className="section">
              <div className="section-header">
                <h2>Popular Songs</h2>
                <button className="show-all">Show all</button>
              </div>
              <SongTable songList={songs} />
            </section>
          </>
        )}

        {activeNav === 'search' && (
          <>
            <h1 className="section-title">Search</h1>
            <div className="search-box-wrap">
              <input className="search-input" type="text" placeholder="What do you want to listen to?" />
            </div>
            <h2 className="browse-title">Browse all</h2>
            <div className="genre-grid">
              {['Pop', 'Hip-Hop', 'Rock', 'R&B', 'Electronic', 'Jazz', 'Classical', 'Country', 'Podcasts', 'Latin', 'Indie', 'Metal'].map((genre, i) => {
                const colors = ['#e91429','#ba5d07','#1e3264','#477d95','#8c67ab','#148a08','#e8115b','#bc5900','#056952','#dc148c','#8c67ab','#27856a'];
                return (
                  <div key={genre} className="genre-card" style={{ background: colors[i % colors.length] }}>
                    <span>{genre}</span>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {activeNav === 'library' && (
          <>
            <h1 className="section-title">Your Library</h1>
            <SongTable songList={songs} />
          </>
        )}

        {activeNav === 'liked' && (
          <>
            <div className="liked-header">
              <div className="liked-cover">♥</div>
              <div className="liked-info">
                <span className="liked-type">Playlist</span>
                <h1>Liked Songs</h1>
                <span className="liked-count">{likedIds.size} songs</span>
              </div>
            </div>
            <SongTable songList={songs.filter(s => likedIds.has(s.id))} />
            {likedIds.size === 0 && (
              <div className="empty-state"><p>Songs you like will appear here</p></div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
