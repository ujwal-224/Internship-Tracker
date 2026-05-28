

function Sidebar({ currentPage, isSidebarOpen, onClose }) {
  const links = [
    { name: 'Dashboard', path: '#/dashboard', icon: 'dashboard', id: 'dashboard' },
    { name: 'Applications', path: '#/applications', icon: 'list_alt', id: 'applications' },
    { name: 'Board', path: '#/board', icon: 'view_kanban', id: 'board' },
    { name: 'Notes', path: '#/notes', icon: 'sticky_note_2', id: 'notes' },
    { name: 'AI Offer Comparison', path: '#/compare', icon: 'compare_arrows', id: 'compare' },
    { name: 'Add New', path: '#/add-new', icon: 'add_circle', id: 'add-new' }
  ];

  return (
    <>
      {/* Mobile Navigation Backdrop */}
      {isSidebarOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-200"
        />
      )}

      {/* NavigationDrawer */}
      <nav 
        id="sidebar" 
        className={`fixed left-0 top-0 h-full w-sidebar-width bg-white dark:bg-slate-900 shadow-sm z-50 flex flex-col py-8 px-4 gap-unit border-r border-slate-100 dark:border-slate-800 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="px-4 mb-8 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="sidebar-logo-wrap">
              <span className="material-symbols-outlined text-[18px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-violet-600 to-blue-600 dark:from-violet-400 dark:to-blue-400 bg-clip-text text-transparent">InternFlow</span>
          </div>
          <button 
            id="close-sidebar-btn" 
            onClick={onClose} 
            className="md:hidden p-1 rounded-full text-secondary hover:bg-surface-container dark:hover:bg-slate-800"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <ul className="flex flex-col gap-1 flex-grow">
          {links.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <li key={link.id}>
                <a 
                  href={link.path} 
                  className={`nav-link flex items-center gap-3 px-4 py-3 ${
                    isActive 
                      ? 'nav-active' 
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                  onClick={onClose}
                >
                  <span 
                    className="material-symbols-outlined text-label-md" 
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : undefined }}
                  >
                    {link.icon}
                  </span>
                  <span className="font-label-md text-label-md">{link.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
        
        <div className="mt-auto">
          <a 
            href="#/profile" 
            className={`nav-link flex items-center gap-3 px-4 py-3 ${
              currentPage === 'profile' 
                ? 'nav-active' 
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
            onClick={onClose}
          >
            <span 
              className="material-symbols-outlined text-label-md"
              style={{ fontVariationSettings: currentPage === 'profile' ? "'FILL' 1" : undefined }}
            >
              person
            </span>
            <span className="font-label-md text-label-md">Profile</span>
          </a>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
