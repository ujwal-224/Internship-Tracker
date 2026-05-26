import React, { useState } from 'react';

function Header({ 
  onMenuClick, 
  profile, 
  isDark, 
  setIsDark, 
  showToast,
  title, // Optional title, displays search bar if undefined
  searchQuery,
  onSearchChange,
  hideSearch
}) {
  const [localSearch, setLocalSearch] = useState(searchQuery || '');

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      const trimmed = localSearch.trim();
      // Redirect to applications with search query parameter in hash
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
        <button className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
        </button>
        <a 
          href="#/profile"
          className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          title="View Profile"
        >
          <div className="w-6 h-6 rounded-full overflow-hidden bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[10px]">
            <img 
              id="header-avatar" 
              className="w-full h-full object-cover" 
              src={profile?.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"} 
              alt="Avatar"
            />
          </div>
        </a>
      </div>
    </header>
  );
}

export default Header;
