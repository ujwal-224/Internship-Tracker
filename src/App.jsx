import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Launcher from './components/Launcher';
import Dashboard from './components/Dashboard';
import Applications from './components/Applications';
import Board from './components/Board';
import AddNew from './components/AddNew';
import Profile from './components/Profile';
import Auth from './components/Auth';
import { getApplications, saveApplications } from './utils/helpers';
import './App.css';

// Route Parser Helper
const getRoute = (hash) => {
  if (!hash || hash === '#' || hash === '#/') return { page: 'launcher' };

  if (hash.startsWith('#id=')) {
    return { page: 'applications', id: hash.replace('#id=', '') };
  }
  if (hash === '#list') {
    return { page: 'applications' };
  }

  const cleanHash = hash.startsWith('#/') ? hash.substring(2) : hash.substring(1);
  const qMarkIndex = cleanHash.indexOf('?');

  let path = cleanHash;
  let searchStr = '';

  if (qMarkIndex !== -1) {
    path = cleanHash.substring(0, qMarkIndex);
    searchStr = cleanHash.substring(qMarkIndex + 1);
  }

  const searchParams = new URLSearchParams(searchStr);
  const search = searchParams.get('search') || '';

  if (path === 'dashboard') return { page: 'dashboard' };
  if (path === 'applications') {
    const id = searchParams.get('id');
    return { page: 'applications', id, search };
  }
  if (path === 'board') return { page: 'board' };
  if (path === 'add-new') return { page: 'add-new' };
  if (path === 'profile') return { page: 'profile' };

  return { page: 'dashboard' };
};

function App() {
  const [route, setRoute] = useState(() => getRoute(window.location.hash));
  const [applications, setApplications] = useState(() => getApplications());
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("careerpilot_auth") === "true";
  });

  const [profile, setProfile] = useState(() => {
    return JSON.parse(localStorage.getItem("careerpilot_profile")) || {
      name: "Sarah Jenkins",
      role: "UX Design Intern Candidate",
      email: "sarah.j@example.com",
      location: "San Francisco, CA",
      education: "California College of the Arts",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
    };
  });

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("careerpilot_dark") === "true";
  });

  // Theme effect
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("careerpilot_dark", isDark ? "true" : "false");
  }, [isDark]);

  // Sync hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const nextRoute = getRoute(window.location.hash);
      setRoute(nextRoute);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync search queries from the route parameters
  useEffect(() => {
    if (route.page === 'applications' && route.search) {
      setSearchQuery(route.search);
    }
  }, [route]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove toast
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  // State mutation actions
  const updateStatus = (appId, newStatus) => {
    const updated = applications.map((app) => {
      if (app.id === appId) {
        return { ...app, status: newStatus };
      }
      return app;
    });
    setApplications(updated);
    saveApplications(updated);
    showToast(`Status updated to ${newStatus}`);
  };

  const deleteApplication = (appId) => {
    const updated = applications.filter((app) => app.id !== appId);
    setApplications(updated);
    saveApplications(updated);
    showToast("Application deleted", "error");
  };

  const saveNotes = (appId, newNotes) => {
    const updated = applications.map((app) => {
      if (app.id === appId) {
        return { ...app, notes: newNotes };
      }
      return app;
    });
    setApplications(updated);
    saveApplications(updated);
  };

  const addApplication = (newApp) => {
    const updated = [newApp, ...applications];
    setApplications(updated);
    saveApplications(updated);
  };

  const updateProfile = (updatedProfile) => {
    setProfile(updatedProfile);
    localStorage.setItem("careerpilot_profile", JSON.stringify(updatedProfile));
  };

  const handleSignOut = () => {
    localStorage.removeItem("careerpilot_auth");
    setIsAuthenticated(false);
    window.location.hash = '#/';
    showToast("Signed out successfully", "info");
  };

  // Launcher Page takes over screen
  if (route.page === 'launcher') {
    return <Launcher />;
  }

  return (
    <div className="font-body-md text-on-surface antialiased overflow-hidden h-screen flex dark:text-slate-100">

      {!isAuthenticated ? (
        <Auth onAuthSuccess={() => {
          setIsAuthenticated(true);
          localStorage.setItem("careerpilot_auth", "true");
          showToast("Successfully logged in!", "success");
        }} />
      ) : (
        <>
          {/* Sidebar Drawer */}
          <Sidebar
            currentPage={route.page}
            isSidebarOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Main Content Area */}
          <main className="flex-1 md:ml-sidebar-width h-full overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50 flex flex-col relative">
        {/* Header displays on all pages */}
        <Header
          onMenuClick={() => setIsSidebarOpen(true)}
          profile={profile}
          isDark={isDark}
          setIsDark={setIsDark}
          showToast={showToast}
          onSignOut={handleSignOut}
          title={
            route.page === 'profile'
              ? 'My Profile'
              : route.page === 'add-new'
                ? ' '
                : undefined
          }
          hideSearch={true}
          searchQuery={searchQuery}
          onSearchChange={route.page === 'applications' ? setSearchQuery : undefined}
        />

        {/* Dynamic Page Views */}
        {route.page === 'dashboard' && (
          <Dashboard
            applications={applications}
            profile={profile}
            onUpdateStatus={updateStatus}
            onDelete={deleteApplication}
            showToast={showToast}
          />
        )}

        {route.page === 'applications' && (
          <Applications
            applications={applications}
            selectedAppId={route.id}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onUpdateStatus={updateStatus}
            onDelete={deleteApplication}
            onSaveNotes={saveNotes}
            showToast={showToast}
          />
        )}

        {route.page === 'board' && (
          <Board
            applications={applications}
            onUpdateStatus={updateStatus}
            onDelete={deleteApplication}
            showToast={showToast}
          />
        )}

        {route.page === 'add-new' && (
          <AddNew
            onAdd={addApplication}
            showToast={showToast}
          />
        )}

        {route.page === 'profile' && (
          <Profile
            profile={profile}
            onUpdateProfile={updateProfile}
            showToast={showToast}
          />
        )}
      </main>
      </>
      )}

      {/* Toast Notification Container */}
      <div id="toast-container" className="fixed top-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => {
          let icon = "check_circle";
          let accentClass = "text-green-400 dark:text-green-600";
          let borderClass = "border-l-4 border-l-green-500";

          if (toast.type === "error") {
            icon = "error";
            accentClass = "text-red-400 dark:text-red-600";
            borderClass = "border-l-4 border-l-red-500";
          } else if (toast.type === "info") {
            icon = "info";
            accentClass = "text-blue-400 dark:text-blue-600";
            borderClass = "border-l-4 border-l-blue-500";
          }

          return (
            <div
              key={toast.id}
              className={`flex items-center gap-2.5 px-4 py-3 bg-slate-900/95 dark:bg-white text-white dark:text-slate-900 shadow-xl rounded-2xl text-xs font-semibold pointer-events-auto transition-all duration-300 ${borderClass} border border-white/10 dark:border-slate-200/10 animate-fade-in`}
              style={{ padding: '14px 18px' }}
            >
              <span className={`material-symbols-outlined text-[18px] ${accentClass}`}>{icon}</span>
              <span className="pr-2">{toast.message}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
