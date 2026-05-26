import React from 'react';
import { getCompanyAvatarConfig, getStatusBadgeClass, formatDate } from '../utils/helpers';

function DetailsModal({ isOpen, appId, applications, onClose, onUpdateStatus, onDelete }) {
  if (!isOpen || !appId) return null;

  const app = applications.find(a => a.id === appId);
  if (!app) return null;

  const avatarConfig = getCompanyAvatarConfig(app.company);

  const handleStatusChange = (e) => {
    onUpdateStatus(app.id, e.target.value);
  };

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      onDelete(app.id);
      onClose();
    }
  };

  return (
    <div 
      id="details-modal" 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-200"
      onClick={(e) => {
        if (e.target.id === 'details-modal') onClose();
      }}
    >
      <div className="glass-card rounded-2xl max-w-lg w-full p-6 shadow-xl flex flex-col gap-6 border border-surface-variant dark:border-slate-700 max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-slate-900/95 text-on-surface dark:text-slate-100">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-md flex items-center justify-center font-bold text-lg ${avatarConfig.classes}`}>
              {avatarConfig.char}
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md">{app.company}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">{app.role}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-surface-container dark:hover:bg-slate-800 text-on-surface-variant dark:text-slate-400"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Info List */}
        <div className="grid grid-cols-2 gap-4 py-2 border-t border-b border-surface-variant dark:border-slate-800">
          <div>
            <span className="text-[10px] uppercase font-bold text-on-surface-variant dark:text-slate-400 tracking-wider">Date Applied</span>
            <p className="font-body-sm font-semibold mt-0.5">{formatDate(app.date)}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-on-surface-variant dark:text-slate-400 tracking-wider">Status Stage</span>
            <div className="mt-0.5">
              <select 
                value={app.status} 
                onChange={handleStatusChange}
                className={`px-2.5 py-1 text-xs font-semibold rounded-full border-none cursor-pointer focus:ring-1 focus:ring-primary dark:bg-slate-850 dark:text-blue-300 dark:border-slate-700 ${getStatusBadgeClass(app.status)}`}
              >
                <option value="Applied">Applied</option>
                <option value="Screening">Screening</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-on-surface-variant dark:text-slate-400 tracking-wider">Location</span>
            <p className="font-body-sm font-semibold mt-0.5">{app.location || "Not specified"}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-on-surface-variant dark:text-slate-400 tracking-wider">Est. Salary</span>
            <p className="font-body-sm font-semibold mt-0.5">{app.salary || "Not specified"}</p>
          </div>
        </div>

        {app.url && (
          <div>
            <span className="text-[10px] uppercase font-bold text-on-surface-variant dark:text-slate-400 tracking-wider">Job Description</span>
            <p className="mt-1">
              <a href={app.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary dark:text-blue-400 hover:underline">
                View Posting <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
            </p>
          </div>
        )}

        <div>
          <span className="text-[10px] uppercase font-bold text-on-surface-variant dark:text-slate-400 tracking-wider">Application Notes</span>
          <p className="text-body-sm font-normal text-on-surface-variant dark:text-slate-350 mt-1 whitespace-pre-line p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl min-h-[60px] border border-slate-100 dark:border-slate-800/80">
            {app.notes || "No notes details added."}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-2">
          <button 
            onClick={handleDeleteClick}
            className="flex items-center gap-1.5 text-xs text-error dark:text-red-400 font-bold hover:underline"
          >
            <span className="material-symbols-outlined text-[16px]">delete</span> Delete Application
          </button>
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-primary text-white rounded-xl text-xs font-semibold hover:bg-primary-fixed-variant transition-colors shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailsModal;
