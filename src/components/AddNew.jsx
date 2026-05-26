import React, { useState } from 'react';

function AddNew({ onAdd, showToast }) {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('Applied');
  const [date, setDate] = useState(() => new Date().toISOString().substring(0, 10));
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newApp = {
      id: Date.now().toString(),
      company: company.trim(),
      role: role.trim(),
      status: status,
      date: date,
      location: 'Remote', // Matching hidden inputs from original
      salary: '', // Matching hidden inputs from original
      url: url.trim(),
      notes: notes.trim()
    };

    onAdd(newApp);
    showToast(`Added ${newApp.company} application successfully!`);
    
    // Redirect to dashboard after 1s
    setTimeout(() => {
      window.location.hash = '#/dashboard';
    }, 1000);
  };

  return (
    <div className="p-container-padding flex-1 max-w-5xl mx-auto w-full flex flex-col justify-center items-center gap-8 page-fade-in py-12 text-on-surface dark:text-slate-100 relative z-10">
      <div className="max-w-3xl w-full">
        <div className="mb-8 text-left">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">New Application</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Track a new opportunity by entering the details below.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="form-company" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Company Name</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">corporate_fare</span>
                <input 
                  id="form-company" 
                  required 
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 font-body-sm text-body-sm transition-all" 
                  placeholder="e.g. Google" 
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="form-role" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Role/Position</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">work</span>
                <input 
                  id="form-role" 
                  required 
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 font-body-sm text-body-sm transition-all" 
                  placeholder="e.g. UX Designer Intern" 
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="form-url" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Application Link</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">link</span>
              <input 
                id="form-url" 
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 font-body-sm text-body-sm transition-all" 
                placeholder="https://..." 
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="form-status" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Current Status</label>
              <div className="relative">
                <select 
                  id="form-status" 
                  required 
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 font-body-sm text-body-sm appearance-none"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Applied">Applied</option>
                  <option value="Online Assessment">Online Assessment</option>
                  <option value="Interviewing">Interviewing</option>
                  <option value="Offer">Selected (Offer)</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
              </div>
            </div>
            <div>
              <label htmlFor="form-date" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Date Applied</label>
              <input 
                id="form-date" 
                required 
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 font-body-sm text-body-sm" 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="form-notes" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Notes</label>
            <textarea 
              id="form-notes" 
              rows="4" 
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 font-body-sm text-body-sm" 
              placeholder="Any specific requirements, recruiter names, or personal thoughts..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="flex justify-end items-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-800/60">
            <button 
              id="form-cancel-btn" 
              type="button" 
              onClick={() => { window.location.hash = '#/dashboard'; }}
              className="text-violet-600 hover:text-violet-700 dark:text-violet-455 dark:hover:text-violet-400 font-semibold text-sm transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2.5 btn-primary font-semibold text-sm transition-all shadow-sm active:scale-95"
            >
              Save Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNew;
