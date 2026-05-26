// Helpers for CareerPilot application

export const DEFAULT_APPLICATIONS = [
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

export function getApplications() {
    let apps = JSON.parse(localStorage.getItem("careerpilot_applications"));
    if (!apps) {
        apps = [...DEFAULT_APPLICATIONS];
        localStorage.setItem("careerpilot_applications", JSON.stringify(apps));
    }
    return apps;
}

export function saveApplications(apps) {
    localStorage.setItem("careerpilot_applications", JSON.stringify(apps));
}

export function formatDate(dateStr) {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    return date.toISOString().split('T')[0];
}

export function getCompanyAvatarConfig(companyName) {
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
    
    const compUpper = (companyName || "").toUpperCase();
    let bgClass = colors[compUpper];
    if (!bgClass) {
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

export function getStatusBadgeClass(status) {
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

export function getAppMilestones(app) {
    if (app.milestones && Array.isArray(app.milestones) && app.milestones.length > 0) {
        return app.milestones;
    }
    
    const statusMap = { "Applied": 0, "Screening": 1, "Interviewing": 2, "Offer": 3 };
    const currentIdx = statusMap[app.status] !== undefined ? statusMap[app.status] : 0;
    
    const milestones = [
        { key: "Applied", label: "Application Submitted", completed: true, date: app.date, notes: "Successfully applied online via company portal." },
        { key: "Screening", label: "Online Assessment", completed: currentIdx >= 1, date: currentIdx >= 1 ? app.date : "", notes: "Completed initial evaluation stage." },
        { key: "Interviewing", label: "Technical Interview", completed: currentIdx >= 2, date: currentIdx >= 2 ? app.date : "", notes: "Completed coding session with engineering team." },
        { key: "Offer", label: "Offer Received", completed: currentIdx >= 3, date: currentIdx >= 3 ? app.date : "", notes: "Final offer details and salary negotiation." }
    ];
    
    if (app.status === "Rejected") {
        milestones.forEach((m, idx) => {
            if (idx > currentIdx) m.completed = false;
        });
        milestones.unshift({ key: "Rejected", label: "Application Declined", completed: true, date: app.date, notes: app.notes || "Recruiter declined application." });
    }
    
    return milestones;
}
