import React, { useState } from 'react';
import { 
  getCompanyAvatarConfig, 
  getStatusBadgeClass, 
  formatDate 
} from '../utils/helpers';
import DetailsModal from './DetailsModal';

function Dashboard({ applications, profile, onUpdateStatus, onDelete, showToast }) {
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Derive Stats
  const totalApps = applications.length;
  
  // Calculate applications added in the last 7 days
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thisWeekCount = applications.filter(app => {
    const appDate = new Date(app.date);
    return !isNaN(appDate) && appDate >= sevenDaysAgo;
  }).length;

  const screeningCount = applications.filter(a => a.status === 'Screening' || a.status === 'Online Assessment').length;
  const interviewingCount = applications.filter(a => a.status === 'Interviewing' || a.status === 'Interview').length;
  const offerCount = applications.filter(a => a.status === 'Offer' || a.status === 'Selected').length;
  const rejectedCount = applications.filter(a => a.status === 'Rejected').length;
  const appliedOnlyCount = applications.filter(a => a.status === 'Applied').length;

  // Active pipelines (anything not rejected)
  const activeCount = totalApps - rejectedCount;

  // Percentages
  const interviewPercent = totalApps > 0 ? Math.round((interviewingCount / totalApps) * 100) : 0;
  const offerPercent = totalApps > 0 ? Math.round((offerCount / totalApps) * 100) : 0;

  // Active Pipeline Rate (percentage of active to total)
  const activeRate = totalApps > 0 ? Math.round((activeCount / totalApps) * 100) : 0;
  // Rejection Rate
  const rejectionRate = totalApps > 0 ? Math.round((rejectedCount / totalApps) * 100) : 0;

  // Funnel heights/widths based on percentages
  const funnelApplied = totalApps > 0 ? 100 : 0;
  const funnelScreening = totalApps > 0 ? Math.round(((screeningCount + interviewingCount + offerCount) / totalApps) * 100) : 0;
  const funnelInterviewing = totalApps > 0 ? Math.round(((interviewingCount + offerCount) / totalApps) * 100) : 0;
  const funnelOffer = totalApps > 0 ? Math.round((offerCount / totalApps) * 100) : 0;

  // Get recent 5 applications (sorted by date descending)
  const recentApplications = [...applications]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const openDetails = (id) => {
    setSelectedAppId(id);
    setIsModalOpen(true);
  };

  const closeDetails = () => {
    setIsModalOpen(false);
    setSelectedAppId(null);
  };

  // Helper for rendering progress ring
  const renderProgressRing = (percent, colorClass, shadowClass) => {
    const radius = 16;
    const circ = 2 * Math.PI * radius; // ~100.53
    const offset = circ - (percent / 100) * circ;

    return (
      <div className="relative w-12 h-12 flex items-center justify-center">
        <svg className="w-12 h-12">
          {/* Track */}
          <circle 
            cx="24" 
            cy="24" 
            r={radius} 
            stroke="currentColor" 
            strokeWidth="3.5" 
            fill="transparent" 
            className="text-slate-100 dark:text-slate-800" 
          />
          {/* Indicator */}
          <circle 
            cx="24" 
            cy="24" 
            r={radius} 
            stroke="currentColor" 
            strokeWidth="3.5" 
            fill="transparent" 
            strokeDasharray={circ}
            strokeDashoffset={offset}
            className={`${colorClass} circle-progress-ring`}
          />
        </svg>
        <span className="absolute text-[10px] font-bold">{percent}%</span>
      </div>
    );
  };

  // Get user's first name
  const firstName = (profile?.name || "Sarah").split(" ")[0];

  return (
    <div className="p-8 flex-1 max-w-6xl w-full mx-auto flex flex-col gap-6 page-fade-in relative z-10">
      {/* Greeting Banner */}
      <div className="flex flex-col gap-1 mb-2">
        <div className="flex items-center gap-3">
          <span className="shimmer-badge">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-violet-400 pulse-dot"></span>
            ACTIVE RECRUITING CYCLE
          </span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">
          Hello, {firstName}!
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Here is your application pipeline overview. You have <span className="font-semibold text-violet-600 dark:text-violet-400">{activeCount} active</span> processes.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 stagger-children">
        {/* Total Applications Card */}
        <div className="glass-card glass-card-glow-violet rounded-2xl p-6 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Applications</span>
            <span className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">{totalApps}</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-2">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              +{thisWeekCount} this week
            </span>
          </div>
          <div className="stat-orb w-14 h-14 bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400">
            <span className="material-symbols-outlined text-2xl">description</span>
          </div>
        </div>

        {/* Interviews Card */}
        <div className="glass-card glass-card-glow-blue rounded-2xl p-6 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Interviews Scheduled</span>
            <span className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">{interviewingCount}</span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold flex items-center gap-1 mt-2">
              <span className="material-symbols-outlined text-[14px]">event</span>
              Upcoming coding/design rounds
            </span>
          </div>
          {renderProgressRing(interviewPercent, 'text-blue-600 dark:text-blue-400')}
        </div>

        {/* Offers Card */}
        <div className="glass-card glass-card-glow-cyan rounded-2xl p-6 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Offers Received</span>
            <span className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">{offerCount}</span>
            <span className="text-xs text-violet-600 dark:text-violet-400 font-semibold flex items-center gap-1 mt-2">
              <span className="material-symbols-outlined text-[14px]">workspace_premium</span>
              Congratulations!
            </span>
          </div>
          {renderProgressRing(offerPercent, 'text-cyan-500')}
        </div>
      </div>

      {/* Two Column Layout (Graph & Table) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications Table */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">Recent Applications</h3>
            <a href="#/applications" className="text-xs text-violet-600 hover:text-violet-700 dark:text-violet-400 font-semibold flex items-center gap-0.5">
              View All <span className="material-symbols-outlined text-[14px]">arrow_right_alt</span>
            </a>
          </div>
          
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Date Applied</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50 dark:divide-slate-800/40">
                {recentApplications.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-400 text-sm">
                      No applications added yet. Click "Add New" to get started!
                    </td>
                  </tr>
                ) : (
                  recentApplications.map((app) => {
                    const avatarConfig = getCompanyAvatarConfig(app.company);
                    return (
                      <tr 
                        key={app.id} 
                        onClick={() => openDetails(app.id)}
                        className="hover-row group cursor-pointer transition-colors"
                      >
                        <td className="py-3.5 px-4 flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${avatarConfig.classes}`}>
                            {avatarConfig.char}
                          </div>
                          <span className="font-semibold text-slate-900 dark:text-slate-200">{app.company}</span>
                        </td>
                        <td className="py-3.5 px-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                          {app.role}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-slate-500 dark:text-slate-400">
                          {formatDate(app.date)}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(app.status)}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              openDetails(app.id);
                            }}
                            className="p-1 text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                          >
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Funnel & Weekly Summary */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Funnel Card */}
          <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">Application Funnel</h3>
            <div className="flex flex-col gap-3 py-1">
              {/* Applied Funnel Bar */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <span>Applied</span>
                  <span>{totalApps} ({funnelApplied}%)</span>
                </div>
                <div className="funnel-bar-wrap h-2.5 w-full">
                  <div className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full" style={{ width: `${funnelApplied}%` }}></div>
                </div>
              </div>
              {/* Screening Funnel Bar */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <span>Screening & OA</span>
                  <span>{screeningCount + interviewingCount + offerCount} ({funnelScreening}%)</span>
                </div>
                <div className="funnel-bar-wrap h-2.5 w-full">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full" style={{ width: `${funnelScreening}%` }}></div>
                </div>
              </div>
              {/* Interviewing Funnel Bar */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <span>Technical Interviews</span>
                  <span>{interviewingCount + offerCount} ({funnelInterviewing}%)</span>
                </div>
                <div className="funnel-bar-wrap h-2.5 w-full">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: `${funnelInterviewing}%` }}></div>
                </div>
              </div>
              {/* Offer Funnel Bar */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <span>Offers Received</span>
                  <span>{offerCount} ({funnelOffer}%)</span>
                </div>
                <div className="funnel-bar-wrap h-2.5 w-full">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full" style={{ width: `${funnelOffer}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Summary Metrics */}
          <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">Cycle Summary</h3>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800/60">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-200">Active Pipeline Rate</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Non-rejected active processes</p>
                </div>
                <span className="text-xl font-extrabold text-violet-600 dark:text-violet-400">{activeRate}%</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800/60">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-200">Rejection Ratio</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Percentage of files rejected</p>
                </div>
                <span className="text-xl font-extrabold text-red-500">{rejectionRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-200">Total Offers</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Successful job offerings</p>
                </div>
                <span className="text-xl font-extrabold text-emerald-500">{offerCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details modal */}
      <DetailsModal 
        isOpen={isModalOpen}
        appId={selectedAppId}
        applications={applications}
        onClose={closeDetails}
        onUpdateStatus={onUpdateStatus}
        onDelete={onDelete}
      />
    </div>
  );
}

export default Dashboard;
