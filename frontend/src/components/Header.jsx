import { useState, useRef, useEffect } from 'react';

function Header({ 
  onMenuClick, 
  profile, 
  isDark, 
  setIsDark, 
  showToast,
  onSignOut,
  title,
  searchQuery,
  onSearchChange,
  hideSearch
}) {
  const [localSearch, setLocalSearch] = useState(searchQuery || '');
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const avatarRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setAvatarMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      const trimmed = localSearch.trim();
      window.location.hash = trimmed ? `#/applications?search=${encodeURIComponent(trimmed)}` : '#/applications';
    }
  };

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    showToast(nextDark ? "Dark mode activated" : "Light mode activated");
  };

  return (
    <header className="w-full relative z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm flex items-center justify-between px-8 h-20 border-b border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Menu Button */}
        <button 
          id="menu-btn" 
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        {title ? (
          <div className="text-xl font-bold text-slate-900 dark:text-slate-100">{title}</div>
        ) : hideSearch ? null : (
          <div className="relative w-full max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">search</span>
            <input 
              id="global-search" 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 font-body-sm text-body-sm transition-colors" 
              placeholder="Search companies, roles..." 
              type="text"
              value={onSearchChange ? searchQuery : localSearch}
              onChange={(e) => {
                if (onSearchChange) {
                  onSearchChange(e.target.value);
                } else {
                  setLocalSearch(e.target.value);
                }
              }}
              onKeyPress={handleSearchKeyPress}
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button 
          id="theme-toggle" 
          onClick={toggleTheme}
          className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all" 
          title="Toggle Dark/Light Mode"
        >
          <span className="material-symbols-outlined" id="theme-icon">
            {isDark ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
        {/* Avatar + Dropdown Menu */}
        <div className="relative" ref={avatarRef}>
          <button
            id="header-avatar-btn"
            onClick={() => setAvatarMenuOpen(v => !v)}
            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-violet-400 transition-all"
            title="Account"
          >
            <div className="w-9 h-9 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              {(profile?.name || 'U').charAt(0).toUpperCase()}
            </div>
          </button>

          {/* Dropdown */}
          {avatarMenuOpen && (
            <div className="absolute right-0 top-12 w-52 rounded-2xl shadow-2xl z-50 overflow-hidden"
              style={{
                background: isDark ? 'rgba(10,14,40,0.97)' : 'rgba(255,255,255,0.97)',
                border: '1px solid rgba(124,58,237,0.18)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Profile info */}
              <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(124,58,237,0.10)' }}>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">{profile?.name || 'User'}</p>
                <p className="text-[11px] text-slate-400 truncate">{profile?.email || ''}</p>
              </div>
              {/* View profile */}
              <a
                href="#/profile"
                onClick={() => setAvatarMenuOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>manage_accounts</span>
                My Profile
              </a>
              {/* Sign Out */}
              <button
                id="sign-out-btn"
                type="button"
                onClick={() => {
                  setAvatarMenuOpen(false);
                  if (onSignOut) onSignOut();
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
              >
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>logout</span>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
