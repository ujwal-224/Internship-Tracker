import { useState } from 'react';

function Profile({ profile, onUpdateProfile, showToast, onSignOut }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const skills = profile?.skills || ['Figma', 'Wireframing', 'Prototyping', 'User Research', 'HTML/CSS'];
  const [newSkill, setNewSkill] = useState('');
  const [showSkillInput, setShowSkillInput] = useState(false);

  // Edit Modal Form States
  const [editName, setEditName] = useState(profile?.name || 'Sarah Jenkins');
  const [editRole, setEditRole] = useState(profile?.role || 'UX Design Intern Candidate');
  const [editEmail, setEditEmail] = useState(profile?.email || 'sarah.j@example.com');
  const [editLocation, setEditLocation] = useState(profile?.location || 'San Francisco, CA');
  const [editEducation, setEditEducation] = useState(profile?.education || 'California College of the Arts');
  const [editAvatar, setEditAvatar] = useState(profile?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150');

  // Toggle Settings States
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);

  const openModal = () => {
    setEditName(profile?.name || '');
    setEditRole(profile?.role || '');
    setEditEmail(profile?.email || '');
    setEditLocation(profile?.location || 'San Francisco, CA');
    setEditEducation(profile?.education || 'California College of the Arts');
    setEditAvatar(profile?.avatar || '');
    setIsModalOpen(true);
  };

  const handleSaveDetails = (e) => {
    e.preventDefault();
    const updated = {
      ...profile,
      name: editName.trim(),
      role: editRole.trim(),
      email: editEmail.trim(),
      location: editLocation.trim(),
      education: editEducation.trim(),
      avatar: editAvatar.trim()
    };
    onUpdateProfile(updated);
    setIsModalOpen(false);
    showToast("Profile details updated!");
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      const updatedSkills = [...skills, trimmed];
      onUpdateProfile({ ...profile, skills: updatedSkills });
      setNewSkill('');
      setShowSkillInput(false);
      showToast(`Added skill: ${trimmed}`);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = skills.filter(s => s !== skillToRemove);
    onUpdateProfile({ ...profile, skills: updatedSkills });
    showToast(`Removed skill: ${skillToRemove}`, 'info');
  };

  return (
    <>
      <div className="p-8 flex-1 max-w-6xl w-full mx-auto flex flex-col gap-6 page-fade-in relative z-10 text-on-surface dark:text-slate-100">
      <div className="flex flex-col gap-1 mb-2">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">My Profile</h2>
        <p className="text-slate-500 dark:text-slate-400">Manage your personal information, resume, and account settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Avatar card & Skills */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Profile Card */}
          <div className="glass-card rounded-2xl overflow-hidden flex flex-col">
            {/* Top Banner */}
            <div className="h-24 bg-gradient-to-r from-violet-600 to-indigo-600"></div>
            {/* Profile Content */}
            <div className="px-6 pb-6 flex flex-col items-center text-center">
              <div className="relative -mt-12 mb-4">
                <img 
                  id="profile-card-avatar" 
                  alt="Avatar" 
                  className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-900 object-cover shadow-sm" 
                  src={profile?.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"}
                />
                <button 
                  onClick={openModal} 
                  className="absolute bottom-0 right-0 p-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-full shadow-md transition-transform active:scale-95 flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-[14px]">edit</span>
                </button>
              </div>
              <h3 id="profile-card-name" className="text-xl font-bold text-slate-900 dark:text-slate-100 font-display">
                {profile?.name || "Sarah Jenkins"}
              </h3>
              <p id="profile-card-role" className="text-sm font-semibold text-violet-600 dark:text-violet-400 mt-1">
                {profile?.role || "UX Design Intern Candidate"}
              </p>
              
              <div className="w-full border-t border-slate-100 dark:border-slate-800/60 my-4 pt-4 flex flex-col gap-3 text-left">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <span className="material-symbols-outlined text-[18px] text-slate-400">location_on</span>
                  <span id="profile-card-location" className="text-sm">{profile?.location || "San Francisco, CA"}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <span className="material-symbols-outlined text-[18px] text-slate-400">school</span>
                  <span id="profile-card-education" className="text-sm font-medium">{profile?.education || "California College of the Arts"}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <span className="material-symbols-outlined text-[18px] text-slate-400">mail</span>
                  <span id="profile-card-email" className="text-sm truncate">{profile?.email || "sarah.j@example.com"}</span>
                </div>
              </div>
              
              <button 
                onClick={openModal} 
                className="w-full py-2 border border-violet-100 dark:border-slate-800/85 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-slate-800/40 font-semibold rounded-lg text-sm transition-colors active:scale-[0.98]"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Skills Card */}
          <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">Skills</h4>
              <button 
                onClick={() => setShowSkillInput(!showSkillInput)}
                className="text-violet-600 hover:text-violet-700 dark:text-violet-400"
              >
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
            </div>

            {showSkillInput && (
              <form onSubmit={handleAddSkill} className="flex gap-2">
                <input 
                  type="text" 
                  value={newSkill} 
                  onChange={(e) => setNewSkill(e.target.value)} 
                  placeholder="Enter skill tag" 
                  className="flex-1 px-3 py-1.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg text-xs focus:outline-none"
                  autoFocus
                />
                <button type="submit" className="px-3 py-1.5 bg-violet-600 text-white text-xs font-semibold rounded-lg">Add</button>
              </form>
            )}

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span 
                  key={skill}
                  className="group px-3 py-1.5 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 rounded-lg text-sm border border-slate-100 dark:border-slate-700/50 flex items-center gap-1"
                >
                  {skill}
                  <button 
                    onClick={() => handleRemoveSkill(skill)}
                    className="opacity-0 group-hover:opacity-100 hover:text-red-500 text-slate-400 transition-opacity ml-1 flex items-center justify-center"
                    title="Remove Skill"
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              ))}
              <button 
                onClick={() => setShowSkillInput(true)}
                className="px-3 py-1.5 border border-dashed border-slate-200 dark:border-slate-850 text-slate-400 rounded-lg text-sm hover:border-violet-500 hover:text-violet-500 dark:hover:border-violet-400 dark:hover:text-violet-400 transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">add</span> Add Skill
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Resume & Settings */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Resume Management */}
          <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 rounded-xl">
                <span className="material-symbols-outlined text-2xl">description</span>
              </div>
              <div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">Resume Management</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Upload and manage your primary resume for applications.</p>
              </div>
            </div>
            
            {/* Resume File list item */}
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <span className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs font-bold px-2.5 py-1 rounded">PDF</span>
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">Sarah_Jenkins_UX_Resume_2024.pdf</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Uploaded 2 days ago • 1.2 MB</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => showToast("Downloading resume (simulation)...")}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                </button>
                <button 
                  onClick={() => showToast("Resume deleted (simulation)...", "error")}
                  className="p-2 text-red-400 hover:text-red-600 transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            </div>
            
            {/* Upload Box */}
            <div 
              onClick={() => showToast("File selector opened (simulation)...")}
              className="border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-violet-500 dark:hover:border-violet-400 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50/20 dark:bg-slate-900/20"
            >
              <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">cloud_upload</span>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Click to upload or drag and drop</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">PDF, DOCX up to 5MB</p>
            </div>
          </div>

          {/* Account Settings */}
          <div className="glass-card rounded-2xl p-6 flex flex-col gap-6">
            <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">Account Settings</h4>
            
            <div className="flex flex-col gap-5">
              {/* Password Row */}
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100">Password</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Update your password to keep your account secure.</p>
                </div>
                <button 
                  onClick={() => showToast("Password edit opened (simulation)...")}
                  className="text-violet-600 hover:text-violet-700 dark:text-violet-400 font-semibold text-sm"
                >
                  Change
                </button>
              </div>
              
              {/* Email Notifications Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100">Email Notifications</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Receive updates about application statuses and deadlines.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={emailNotifications} 
                    onChange={() => {
                      setEmailNotifications(!emailNotifications);
                      showToast(!emailNotifications ? "Email notifications enabled" : "Email notifications disabled");
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-violet-600"></div>
                </label>
              </div>
              
              {/* Public Profile Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-semibold">Public Profile</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Allow recruiters to find your profile via share link.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={publicProfile} 
                    onChange={() => {
                      setPublicProfile(!publicProfile);
                      showToast(!publicProfile ? "Public profile enabled" : "Public profile disabled");
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-violet-600"></div>
                </label>
              </div>
            </div>
            
            <div className="border-t border-slate-100 dark:border-slate-800/60 pt-5">
              <button 
                id="profile-sign-out-btn"
                onClick={() => { if (onSignOut) onSignOut(); }}
                className="flex items-center gap-2 text-red-500 hover:text-red-700 dark:text-red-400 font-semibold text-sm transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      </div>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="modal-glass rounded-2xl w-full max-w-lg p-6 shadow-xl border border-slate-200 dark:border-slate-800 mx-4 max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-slate-900/95">
            <div className="flex justify-between items-center mb-4 text-on-surface dark:text-slate-100">
              <h3 className="text-xl font-bold">Edit Profile Information</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-450 hover:text-slate-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleSaveDetails} className="flex flex-col gap-4 text-slate-800 dark:text-slate-100">
              <div>
                <label htmlFor="edit-name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input 
                  id="edit-name" 
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-violet-500 font-body-sm text-body-sm" 
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="edit-role" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Current Title</label>
                <input 
                  id="edit-role" 
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-violet-500 font-body-sm text-body-sm" 
                  type="text"
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="edit-email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <input 
                  id="edit-email" 
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-violet-500 font-body-sm text-body-sm" 
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="edit-location" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Location</label>
                <input 
                  id="edit-location" 
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-violet-500 font-body-sm text-body-sm" 
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="edit-education" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Education</label>
                <input 
                  id="edit-education" 
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-violet-500 font-body-sm text-body-sm" 
                  type="text"
                  value={editEducation}
                  onChange={(e) => setEditEducation(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="edit-avatar-url" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Avatar Image URL</label>
                <input 
                  id="edit-avatar-url" 
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-violet-500 font-body-sm text-body-sm" 
                  type="text"
                  value={editAvatar}
                  onChange={(e) => setEditAvatar(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 btn-primary rounded-lg text-white font-semibold transition-colors shadow-sm active:scale-95 text-sm"
                >
                  Save Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
