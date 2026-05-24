import './Sidebar.css';

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10.533 1.279c-5.18 0-9.407 4.927-9.407 10.107C1.126 16.365 5.353 21 10.533 21c2.996 0 5.7-1.417 7.476-3.658l3.562 3.562a1 1 0 1 0 1.414-1.414l-3.562-3.562A9.956 9.956 0 0 0 20.94 11.386c0-5.18-4.227-10.107-10.407-10.107zm-7.407 10.107c0-4.18 3.226-8.107 7.407-8.107s7.407 3.927 7.407 8.107-3.226 8.107-7.407 8.107-7.407-3.927-7.407-8.107z"/>
  </svg>
);

const LibraryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1.5.866l7-4a1 1 0 0 0 0-1.732l-7-4zM8 2a1 1 0 0 0-1 1v18a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1z"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 11V3h2v8h8v2h-8v8h-2v-8H3v-2z"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.724 2C17.466 2 19.12 2.752 20.375 4.113 21.637 5.481 22.35 7.34 22.35 9.296c0 2.545-1.062 4.514-3.24 6.753l-5.753 5.788a1.56 1.56 0 0 1-2.214 0l-5.753-5.788C3.213 13.81 2.15 11.841 2.15 9.296c0-1.956.713-3.815 1.975-5.183C5.38 2.752 7.034 2 8.776 2c1.744 0 3.214.677 4.224 1.797C14.01 2.677 15.48 2 15.724 2z"/>
  </svg>
);

const MusicIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 3v10.55A4 4 0 1 0 11 17V7h4V3H9z"/>
  </svg>
);

export default function Sidebar({ activeNav, setActiveNav, playlists }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: <HomeIcon /> },
    { id: 'search', label: 'Search', icon: <SearchIcon /> },
    { id: 'library', label: 'Your Library', icon: <LibraryIcon /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="logo">
          <svg width="131" height="40" viewBox="0 0 131 40" fill="white">
            <path d="M63.993 13.838c-3.067 0-5.2 2.136-5.2 5.203 0 3.054 2.2 5.182 5.2 5.182 3.009 0 5.207-2.124 5.207-5.182 0-3.062-2.2-5.203-5.207-5.203zm0 8.332c-1.707 0-2.99-1.377-2.99-3.129 0-1.753 1.28-3.157 2.99-3.157 1.713 0 2.997 1.4 2.997 3.157 0 1.748-1.283 3.129-2.997 3.129z" fill="white"/>
            <path d="M23.994 0C10.745 0 0 10.745 0 23.994 0 37.244 10.745 48 23.994 48 37.244 48 48 37.244 48 23.994 48 10.745 37.244 0 23.994 0zm11.01 34.604a1.499 1.499 0 0 1-2.062.499C26.392 31.625 19.9 30.97 12.195 32.717a1.499 1.499 0 0 1-.666-2.923c8.476-1.935 15.748-1.1 21.978 2.75a1.5 1.5 0 0 1 .497 2.06zm2.937-6.528a1.876 1.876 0 0 1-2.577.618c-4.532-2.785-11.437-3.592-16.798-1.965a1.875 1.875 0 0 1-1.087-3.59c6.121-1.856 13.73-.957 18.942 2.24a1.876 1.876 0 0 1 .52 2.697zm.252-6.795C32.2 17.637 23.49 17.352 17.036 19.314a2.249 2.249 0 1 1-1.305-4.31c7.418-2.249 19.754-1.814 27.536 2.88a2.249 2.249 0 0 1-2.284 3.397z" fill="#1DB954"/>
          </svg>
        </div>

        <nav className="main-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
              onClick={() => setActiveNav(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-actions">
          <button className="action-btn">
            <span className="action-icon"><PlusIcon /></span>
            <span>Create Playlist</span>
          </button>
          <button className="action-btn liked-songs" onClick={() => setActiveNav('liked')}>
            <span className="action-icon heart-bg"><HeartIcon /></span>
            <span>Liked Songs</span>
          </button>
        </div>

        <div className="divider" />
      </div>

      <div className="sidebar-playlists">
        {playlists.map(pl => (
          <button key={pl.id} className="playlist-item" onClick={() => setActiveNav(`playlist-${pl.id}`)}>
            <img src={pl.cover} alt={pl.name} className="playlist-thumb" />
            <div className="playlist-info">
              <span className="playlist-name">{pl.name}</span>
              <span className="playlist-meta">Playlist · {pl.songCount} songs</span>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
