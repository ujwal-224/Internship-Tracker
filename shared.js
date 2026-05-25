// Shared JavaScript logic for CareerPilot application pages

// --- DATA INITIALIZATION ---
const DEFAULT_APPLICATIONS = [
    {
        id: "1",
        company: "Stripe",
        role: "Software Engineering Intern",
        date: "2025-05-01",
        status: "Interviewing",
        location: "Remote",
        salary: "$45/hr",
        url: "https://stripe.com/jobs",
        notes: "Technical round scheduled"
    },
    {
        id: "2",
        company: "Notion",
        role: "Product Design Intern",
        date: "2025-04-28",
        status: "Applied",
        location: "San Francisco, CA",
        salary: "$40/hr",
        url: "https://notion.so/careers",
        notes: "Referred by campus recruiter"
    },
    {
        id: "3",
        company: "Figma",
        role: "Frontend Engineering Intern",
        date: "2025-04-20",
        status: "Offer",
        location: "New York, NY",
        salary: "$55/hr",
        url: "https://figma.com/careers",
        notes: "Offer letter received"
    },
    {
        id: "4",
        company: "Airbnb",
        role: "Data Engineering Intern",
        date: "2025-04-15",
        status: "Rejected",
        location: "Seattle, WA",
        salary: "$48/hr",
        url: "https://airbnb.com/careers",
        notes: "No feedback provided"
    },
    {
        id: "5",
        company: "Linear",
        role: "Software Engineering Intern",
        date: "2025-05-05",
        status: "Applied",
        location: "Remote",
        salary: "$42/hr",
        url: "https://linear.app/careers",
        notes: "Applied via career site"
    },
    {
        id: "6",
        company: "Vercel",
        role: "Developer Experience Intern",
        date: "2025-05-08",
        status: "Interviewing",
        location: "Remote",
        salary: "$45/hr",
        url: "https://vercel.com/careers",
        notes: "Initial screening scheduled"
    },
    {
        id: "7",
        company: "GitHub",
        role: "Open Source Intern",
        date: "2025-04-10",
        status: "Rejected",
        location: "San Francisco, CA",
        salary: "$35/hr",
        url: "https://github.com/careers",
        notes: "Competitive cycle"
    }
];

function getApplications() {
    let apps = JSON.parse(localStorage.getItem("careerpilot_applications"));
    if (!apps) {
        apps = [...DEFAULT_APPLICATIONS];
        localStorage.setItem("careerpilot_applications", JSON.stringify(apps));
    }
    return apps;
}

function saveApplications(apps) {
    localStorage.setItem("careerpilot_applications", JSON.stringify(apps));
}

// --- SHARED UTILITIES ---
function formatDate(dateStr) {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD to match screenshots
}

function getCompanyAvatarConfig(companyName) {
    const val = (companyName || "A").trim().toUpperCase()[0];
    const colors = {
        'STRIPE': 'bg-[#635bff] text-white',
        'NOTION': 'bg-black text-white',
        'FIGMA': 'bg-[#f24e1e] text-white',
        'AIRBNB': 'bg-[#ff5a5f] text-white',
        'LINEAR': 'bg-[#5e6ad2] text-white',
        'VERCEL': 'bg-black text-white',
        'GITHUB': 'bg-[#24292e] text-white',
        'GOOGLE': 'bg-blue-600 text-white'
    };
    
    // Look up full name or character prefix
    const compUpper = (companyName || "").toUpperCase();
    let bgClass = colors[compUpper];
    if (!bgClass) {
        // Fallback characters
        const fallbackColors = {
            'G': 'bg-blue-600 text-white',
            'A': 'bg-slate-700 text-white',
            'M': 'bg-red-600 text-white',
            'N': 'bg-black text-white',
            'S': 'bg-emerald-600 text-white',
            'F': 'bg-orange-600 text-white',
            'H': 'bg-amber-600 text-white',
            'P': 'bg-sky-600 text-white'
        };
        bgClass = fallbackColors[val] || 'bg-blue-600 text-white';
    }

    return {
        char: val,
        classes: `${bgClass} rounded-lg`
    };
}

function getStatusBadgeClass(status) {
    switch (status) {
        case 'Applied':
            return 'badge-applied';
        case 'Online Assessment':
        case 'Screening':
            return 'badge-screening';
        case 'Interviewing':
        case 'Interview':
            return 'badge-interviewing';
        case 'Offer':
        case 'Selected':
            return 'badge-offer';
        case 'Rejected':
            return 'badge-rejected';
        default:
            return 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-300 border border-gray-200 dark:border-slate-700';
    }
}

// --- TOAST NOTIFICATIONS ---
function showToast(message, type = "success") {
    // Create container if not exists
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        container.className = "fixed top-6 right-6 z-50 flex flex-col gap-3 pointer-events-none";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    // Premium slide-in from right animation class setup
    toast.className = "flex items-center gap-2.5 px-4.5 py-3.5 bg-slate-900/95 dark:bg-white text-white dark:text-slate-900 shadow-xl rounded-2xl text-xs font-semibold border border-white/10 dark:border-slate-200/10 pointer-events-auto transition-all duration-300 transform translate-x-12 opacity-0";
    
    let icon = "check_circle";
    let accentClass = "text-green-400 dark:text-green-600";
    
    if (type === "error") {
        icon = "error";
        accentClass = "text-red-400 dark:text-red-600";
        toast.classList.add("border-l-4", "border-l-red-500");
    } else if (type === "info") {
        icon = "info";
        accentClass = "text-blue-400 dark:text-blue-600";
        toast.classList.add("border-l-4", "border-l-blue-500");
    } else {
        toast.classList.add("border-l-4", "border-l-green-500");
    }
    
    toast.innerHTML = `
        <span class="material-symbols-outlined text-[18px] ${accentClass}">${icon}</span>
        <span class="pr-2">${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Trigger slide-in animation
    setTimeout(() => {
        toast.classList.remove("translate-x-12", "opacity-0");
    }, 10);
    
    // Remove after 3.2 seconds
    setTimeout(() => {
        toast.classList.add("translate-x-12", "opacity-0");
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}

// --- MILESTONE JOURNEY LOGIC ---
function getAppMilestones(app) {
    if (app.milestones && Array.isArray(app.milestones) && app.milestones.length > 0) {
        return app.milestones;
    }
    
    // Fallback: Generate dynamically based on status to ensure seamless backward compatibility
    const statusMap = { "Applied": 0, "Screening": 1, "Interviewing": 2, "Offer": 3 };
    const currentIdx = statusMap[app.status] !== undefined ? statusMap[app.status] : 0;
    
    const milestones = [
        { key: "Applied", label: "Application Submitted", completed: true, date: app.date, notes: "Successfully applied online via company portal." },
        { key: "Screening", label: "Online Assessment", completed: currentIdx >= 1, date: currentIdx >= 1 ? app.date : "", notes: "Completed initial evaluation stage." },
        { key: "Interviewing", label: "Technical Interview", completed: currentIdx >= 2, date: currentIdx >= 2 ? app.date : "", notes: "Completed coding session with engineering team." },
        { key: "Offer", label: "Offer Received", completed: currentIdx >= 3, date: currentIdx >= 3 ? app.date : "", notes: "Final offer details and salary negotiation." }
    ];
    
    if (app.status === "Rejected") {
        // Adjust for rejection
        milestones.forEach((m, idx) => {
            if (idx > currentIdx) m.completed = false;
        });
        // Append rejection step as the active state
        milestones.unshift({ key: "Rejected", label: "Application Declined", completed: true, date: app.date, notes: app.notes || "Recruiter declined application." });
    }
    
    return milestones;
}

function saveAppMilestones(appId, milestones) {
    const apps = getApplications();
    const idx = apps.findIndex(a => a.id === appId);
    if (idx !== -1) {
        apps[idx].milestones = milestones;
        saveApplications(apps);
    }
}


// --- UI SETUP & SHARED LISTENERS ---
document.addEventListener("DOMContentLoaded", () => {
    // 1. Initializing Theme/Dark mode
    initTheme();

    // 2. Loading User Profile Information in Sidebar and Headers
    loadUserProfile();

    // 3. Setup Theme Toggle event listener
    const themeToggleBtn = document.getElementById("theme-toggle");
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", toggleTheme);
    }

    // 4. Setup Mobile Sidebar triggers
    setupMobileSidebar();

    // 5. Setup Global Search Redirect/Filter
    setupGlobalSearch();
});

// Theme management
function initTheme() {
    const isDark = localStorage.getItem("careerpilot_dark") === "true";
    const themeIcon = document.getElementById("theme-icon");
    if (isDark) {
        document.documentElement.classList.add("dark");
        if (themeIcon) themeIcon.textContent = "light_mode";
    } else {
        document.documentElement.classList.remove("dark");
        if (themeIcon) themeIcon.textContent = "dark_mode";
    }
}

function toggleTheme() {
    const isDarkNow = document.documentElement.classList.toggle("dark");
    localStorage.setItem("careerpilot_dark", isDarkNow ? "true" : "false");
    const themeIcon = document.getElementById("theme-icon");
    if (themeIcon) {
        themeIcon.textContent = isDarkNow ? "light_mode" : "dark_mode";
    }
    showToast(isDarkNow ? "Dark mode activated" : "Light mode activated");
    
    // Dispatch custom event if other components need to react to theme change
    window.dispatchEvent(new Event('themeChanged'));
}

// User Profile loading
function loadUserProfile() {
    const profile = JSON.parse(localStorage.getItem("careerpilot_profile")) || {
        name: "Sarah Jenkins",
        role: "UX Design Intern Candidate",
        email: "sarah.j@example.com",
        target: "$45/hr",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
    };

    // Update sidebar elements if present
    const sidebarName = document.getElementById("profile-name");
    const sidebarRole = document.getElementById("profile-role");
    const sidebarAvatar = document.getElementById("avatar-img");

    if (sidebarName) sidebarName.textContent = profile.name;
    if (sidebarRole) sidebarRole.textContent = profile.role;
    if (sidebarAvatar && profile.avatar) sidebarAvatar.src = profile.avatar;

    // Update greeting name spans if present
    const greetingSpans = document.querySelectorAll(".profile-name-span");
    greetingSpans.forEach(el => el.textContent = profile.name.split(' ')[0]);
}

// Mobile sidebar controls
function setupMobileSidebar() {
    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.getElementById("menu-btn");
    const closeSidebarBtn = document.getElementById("close-sidebar-btn");
    const mobileBackdrop = document.getElementById("mobile-sidebar-backdrop");

    if (!sidebar || !menuBtn || !closeSidebarBtn || !mobileBackdrop) return;

    menuBtn.addEventListener("click", () => {
        sidebar.classList.remove("-translate-x-full");
        mobileBackdrop.classList.remove("hidden");
        setTimeout(() => mobileBackdrop.classList.add("opacity-100"), 10);
    });

    function closeSidebar() {
        sidebar.classList.add("-translate-x-full");
        mobileBackdrop.classList.remove("opacity-100");
        setTimeout(() => mobileBackdrop.classList.add("hidden"), 200);
    }

    closeSidebarBtn.addEventListener("click", closeSidebar);
    mobileBackdrop.addEventListener("click", closeSidebar);
}

// Global search handling
function setupGlobalSearch() {
    const searchInput = document.getElementById("global-search");
    if (!searchInput) return;

    // Get search term from URL query if we are on applications page
    const isApplicationsPage = window.location.pathname.includes("applications.html");
    if (isApplicationsPage) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        if (searchParam) {
            searchInput.value = searchParam;
        }
    }

    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const query = searchInput.value.trim();
            if (!isApplicationsPage) {
                // Redirect to applications page with search term
                window.location.href = `applications.html?search=${encodeURIComponent(query)}`;
            }
        }
    });
}
