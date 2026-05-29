import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Launcher from './pages/Launcher';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import Board from './pages/Board';
import AddNew from './pages/AddNew';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Notes from './pages/Notes';
import Compare from './pages/Compare';
import { getApplications, saveApplications } from './services/applicationService';
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
  if (path === 'notes') return { page: 'notes' };
  if (path === 'add-new') return { page: 'add-new' };
  if (path === 'profile') return { page: 'profile' };
  if (path === 'compare') return { page: 'compare' };

  return { page: 'dashboard' };
};

function App() {
  const [route, setRoute] = useState(() => getRoute(window.location.hash));
  const [applications, setApplications] = useState(() => getApplications());
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCompleteProfilePopup, setShowCompleteProfilePopup] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("internflow_auth") === "true";
  });

  const [profile, setProfile] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("internflow_profile"));
    if (stored) {
      if (!stored.skills) {
        stored.skills = [];
      }
      return stored;
    }
    return {
      name: "",
      role: "",
      email: "",
      location: "",
      education: "",
      avatar: "",
      skills: [],
      resume: null
    };
  });

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("internflow_dark") === "true";
  });

  // Theme effect
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("internflow_dark", isDark ? "true" : "false");
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

  // Fetch applications from MongoDB when authenticated
  useEffect(() => {
    if (isAuthenticated && profile?.email) {
      fetch(`http://localhost:5001/api/applications/get-applications?email=${encodeURIComponent(profile.email)}`)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch applications');
          return res.json();
        })
        .then((data) => {
          const mappedData = data.map((app) => ({
            ...app,
            id: app._id || app.id
          }));
          setApplications(mappedData);
          saveApplications(mappedData);
        })
        .catch((err) => {
          console.error("Error loading applications from database:", err);
        });
    } else if (!isAuthenticated) {
      setApplications([]);
    }
  }, [isAuthenticated, profile?.email]);

  // Fetch user profile from MongoDB when authenticated
  useEffect(() => {
    const authUser = localStorage.getItem("internflow_auth_user");
    if (isAuthenticated && authUser) {
      const email = JSON.parse(authUser).email;
      fetch(`http://localhost:5001/api/users/profile?email=${encodeURIComponent(email)}`)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch profile');
          return res.json();
        })
        .then((data) => {
          setProfile(data);
          localStorage.setItem("internflow_profile", JSON.stringify(data));
        })
        .catch((err) => {
          console.error("Error loading profile from database:", err);
        });
    }
  }, [isAuthenticated]);

  // Sync search queries from the route parameters
  useEffect(() => {
    if (route.page === 'applications' && route.search) {
      const id = requestAnimationFrame(() => {
        setSearchQuery(route.search);
      });
      return () => cancelAnimationFrame(id);
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
  const updateStatus = async (appId, newStatus) => {
    // Optimistic UI update
    const updated = applications.map((app) =>
      app.id === appId ? { ...app, status: newStatus } : app
    );
    setApplications(updated);
    saveApplications(updated);
    showToast(`Status updated to ${newStatus}`);

    // Persist to MongoDB
    try {
      await fetch(`http://localhost:5001/api/applications/update-application/${appId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) {
      console.error('Failed to persist status update:', err);
    }
  };

  const deleteApplication = async (appId) => {
    const updated = applications.filter((app) => app.id !== appId);
    setApplications(updated);
    saveApplications(updated);
    showToast("Application deleted", "error");

    // Persist to MongoDB
    try {
      await fetch(`http://localhost:5001/api/applications/delete-application/${appId}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.error('Failed to delete application from database:', err);
    }
  };

  const saveNotes = async (appId, newNotes) => {
    const updated = applications.map((app) =>
      app.id === appId ? { ...app, notes: newNotes } : app
    );
    setApplications(updated);
    saveApplications(updated);

    // Persist to MongoDB
    try {
      await fetch(`http://localhost:5001/api/applications/update-application/${appId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: newNotes })
      });
    } catch (err) {
      console.error('Failed to save notes to database:', err);
    }
  };

  const addApplication = (newApp) => {
    const updated = [newApp, ...applications];
    setApplications(updated);
    saveApplications(updated);
  };

  const updateProfile = async (updatedProfile) => {
    setProfile(updatedProfile);
    localStorage.setItem("internflow_profile", JSON.stringify(updatedProfile));

    try {
      const response = await fetch("http://localhost:5001/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: profile?.email || updatedProfile.email,
          name: updatedProfile.name,
          role: updatedProfile.role,
          location: updatedProfile.location,
          education: updatedProfile.education,
          avatar: updatedProfile.avatar,
          skills: updatedProfile.skills,
          resume: updatedProfile.resume
        })
      });
      if (!response.ok) throw new Error("Failed to update profile in database");
    } catch (err) {
      console.error("Error saving profile to database:", err);
      showToast("Failed to save profile changes to database", "error");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("internflow_auth");
    localStorage.removeItem("internflow_profile");
    localStorage.removeItem("internflow_auth_user");
    localStorage.removeItem("internflow_applications");
    localStorage.removeItem("careerpilot_notes");
    setProfile({
      name: "",
      role: "",
      email: "",
      location: "",
      education: "",
      avatar: "",
      skills: [],
      resume: null
    });
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
        <Auth 
          isDark={isDark}
          setIsDark={setIsDark}
          onAuthSuccess={(userData, isNewSignUp) => {
            setIsAuthenticated(true);
            localStorage.setItem("internflow_auth", "true");
            localStorage.setItem("internflow_auth_user", JSON.stringify(userData));
            
            // Set user profile state and store in localStorage
            const userProfile = {
              name: userData.name,
              role: "",
              email: userData.email,
              location: "",
              education: "",
              avatar: "",
              skills: [],
              resume: null
            };
            setProfile(userProfile);
            localStorage.setItem("internflow_profile", JSON.stringify(userProfile));

            if (isNewSignUp) {
              setShowCompleteProfilePopup(true);
            }

            showToast(isNewSignUp ? `Account created! Welcome, ${userData.name}!` : `Welcome back, ${userData.name}!`, "success");
          }} 
        />
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
              ? (profile?.name || 'My Profile')
              : route.page === 'add-new' || route.page === 'compare'
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

        {route.page === 'notes' && (
          <Notes
            applications={applications}
            onSaveNotes={saveNotes}
            showToast={showToast}
            userEmail={profile?.email}
          />
        )}

        {route.page === 'add-new' && (
          <AddNew
            onAdd={addApplication}
            showToast={showToast}
            userEmail={profile?.email}
          />
        )}

        {route.page === 'profile' && (
          <Profile
            profile={profile}
            onUpdateProfile={updateProfile}
            showToast={showToast}
            onSignOut={handleSignOut}
          />
        )}

        {route.page === 'compare' && (
          <Compare
            applications={applications}
            profile={profile}
            showToast={showToast}
          />
        )}
      </main>
      </>
      )}

      {/* Complete Profile Popup Modal */}
      {showCompleteProfilePopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 dark:bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800/80 p-8 max-h-[90vh] overflow-y-auto transform scale-100 transition-all duration-300 animate-scale-in overflow-hidden">
            {/* Glowing top line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500"></div>
            
            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-violet-500/25">
                <span className="material-symbols-outlined text-2xl">person_add</span>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Complete Your Profile</h3>
                <p className="text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest mt-0.5">Step 1 of 1 • Personal Details</p>
              </div>
              <button 
                type="button" 
                onClick={() => setShowCompleteProfilePopup(false)} 
                className="ml-auto w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="text-slate-500 dark:text-slate-400 text-xs text-left mb-6 leading-relaxed">
              Welcome to InternFlow! To unlock all personalized tracking insights and customized stats, please configure your profile below.
            </p>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const updated = {
                  ...profile,
                  name: formData.get("name").trim(),
                  role: formData.get("role").trim(),
                  location: formData.get("location").trim(),
                  education: formData.get("education").trim(),
                  skills: formData.get("skills") ? formData.get("skills").split(",").map(s => s.trim()).filter(Boolean) : []
                };
                updateProfile(updated);
                setShowCompleteProfilePopup(false);
                showToast("Profile completed successfully!", "success");
              }} 
              className="flex flex-col gap-5 text-slate-850 dark:text-slate-100 text-left"
            >
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">Full Name</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-[18px] text-slate-400 dark:text-slate-500 pointer-events-none">person</span>
                  <input 
                    name="name"
                    className="w-full pl-11 pr-4 py-3 border border-slate-205 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-950/30 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-650 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 font-body-sm text-body-sm transition-all" 
                    type="text"
                    defaultValue={profile?.name || ""}
                    required
                    placeholder="e.g. Sarah Jenkins"
                  />
                </div>
              </div>

              {/* Current Title / Role */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">Current Title / Role</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-[18px] text-slate-400 dark:text-slate-500 pointer-events-none">work</span>
                  <input 
                    name="role"
                    className="w-full pl-11 pr-4 py-3 border border-slate-205 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-950/30 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-650 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 font-body-sm text-body-sm transition-all" 
                    type="text"
                    defaultValue={profile?.role || ""}
                    required
                    placeholder="e.g. UX Design Intern Candidate"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">Location</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-[18px] text-slate-400 dark:text-slate-500 pointer-events-none">location_on</span>
                  <input 
                    name="location"
                    className="w-full pl-11 pr-4 py-3 border border-slate-205 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-950/30 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-650 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 font-body-sm text-body-sm transition-all" 
                    type="text"
                    defaultValue={profile?.location || ""}
                    required
                    placeholder="e.g. San Francisco, CA"
                  />
                </div>
              </div>

              {/* Education */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">Education</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-[18px] text-slate-400 dark:text-slate-500 pointer-events-none">school</span>
                  <input 
                    name="education"
                    className="w-full pl-11 pr-4 py-3 border border-slate-205 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-950/30 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-650 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 font-body-sm text-body-sm transition-all" 
                    type="text"
                    defaultValue={profile?.education || ""}
                    required
                    placeholder="e.g. California College of the Arts"
                  />
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">Skills (comma-separated)</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-[18px] text-slate-400 dark:text-slate-500 pointer-events-none">terminal</span>
                  <input 
                    name="skills"
                    className="w-full pl-11 pr-4 py-3 border border-slate-205 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-950/30 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-650 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 font-body-sm text-body-sm transition-all" 
                    type="text"
                    defaultValue={profile?.skills?.join(", ") || ""}
                    placeholder="e.g. Figma, HTML, CSS, JavaScript"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 mt-2 border-t border-slate-100 dark:border-slate-800/80">
                <button 
                  type="button" 
                  onClick={() => setShowCompleteProfilePopup(false)} 
                  className="flex-1 py-3 border border-slate-200 dark:border-slate-850 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer"
                >
                  Skip for Now
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-violet-500/20 active:scale-95 text-xs cursor-pointer"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
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
