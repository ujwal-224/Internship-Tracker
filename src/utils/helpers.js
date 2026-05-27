// Helpers for CareerPilot application

export const DEFAULT_APPLICATIONS = [
    {
        id: "1",
        company: "Stripe",
        role: "Software Engineering Intern",
        date: "2025-05-01",
        status: "Interviewing",
        location: "Remote",
        salary: "₹3,735/hr",
        description: "Expecting proficiency in React, TypeScript, and Node.js. Experience with system design and REST APIs is highly valued.",
        notes: "Technical round scheduled"
    },
    {
        id: "2",
        company: "Notion",
        role: "Product Design Intern",
        date: "2025-04-28",
        status: "Applied",
        location: "San Francisco, CA",
        salary: "₹3,320/hr",
        description: "Expecting a strong design portfolio demonstrating product thinking, visual design skills, and high proficiency in Figma.",
        notes: "Referred by campus recruiter"
    },
    {
        id: "3",
        company: "Figma",
        role: "Frontend Engineering Intern",
        date: "2025-04-20",
        status: "Offer",
        location: "New York, NY",
        salary: "₹4,565/hr",
        description: "Expecting strong skills in JavaScript/TypeScript, React, WebGL, or Canvas, and a passion for building creative tools.",
        notes: "Offer letter received"
    },
    {
        id: "4",
        company: "Airbnb",
        role: "Data Engineering Intern",
        date: "2025-04-15",
        status: "Rejected",
        location: "Seattle, WA",
        salary: "₹3,984/hr",
        description: "Expecting experience with Python, Scala or Java, SQL, Spark/Hadoop, and building reliable data pipelines.",
        notes: "No feedback provided"
    },
    {
        id: "5",
        company: "Linear",
        role: "Software Engineering Intern",
        date: "2025-05-05",
        status: "Applied",
        location: "Remote",
        salary: "₹3,486/hr",
        description: "Expecting high attention to detail, proficiency in TypeScript, React, and an interest in productivity workflows.",
        notes: "Applied via career site"
    },
    {
        id: "6",
        company: "Vercel",
        role: "Developer Experience Intern",
        date: "2025-05-08",
        status: "Interviewing",
        location: "Remote",
        salary: "₹3,735/hr",
        description: "Expecting proficiency in Next.js, React, modern CSS, and a deep interest in web performance and developer tooling.",
        notes: "Initial screening scheduled"
    },
    {
        id: "7",
        company: "GitHub",
        role: "Open Source Intern",
        date: "2025-04-10",
        status: "Rejected",
        location: "San Francisco, CA",
        salary: "₹2,905/hr",
        description: "Expecting experience with Git/GitHub, Ruby on Rails or Go, and active contributions to public open source projects.",
        notes: "Competitive cycle"
    }
];

export function convertUsdToInr(usdSalary) {
    if (!usdSalary) return '';
    if (usdSalary.includes('₹') || usdSalary.includes('INR')) return usdSalary;
    
    const match = usdSalary.match(/^\$?([0-9,.]+)\s*(.*)$/);
    if (match) {
        const numericStr = match[1].replace(/,/g, '');
        const numVal = parseFloat(numericStr);
        const suffix = match[2] ? match[2].trim() : '';
        
        if (!isNaN(numVal)) {
            const inrVal = Math.round(numVal * 83);
            const formattedInr = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0
            }).format(inrVal);
            
            const suffixFormatted = suffix ? (suffix.startsWith('/') ? suffix : ' ' + suffix) : '';
            return `${formattedInr}${suffixFormatted}`;
        }
    }
    return usdSalary;
}

export function formatInrSalary(salaryStr) {
    if (!salaryStr) return '';
    if (salaryStr.includes('₹') || salaryStr.includes('INR')) return salaryStr;
    
    const match = salaryStr.trim().match(/^([0-9,.]+)\s*(.*)$/);
    if (match) {
        const numericStr = match[1].replace(/,/g, '');
        const numVal = parseFloat(numericStr);
        const suffix = match[2] ? match[2].trim() : '';
        
        if (!isNaN(numVal)) {
            const formattedInr = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0
            }).format(numVal);
            
            const suffixFormatted = suffix ? (suffix.startsWith('/') ? suffix : ' ' + suffix) : '';
            return `${formattedInr}${suffixFormatted}`;
        }
    }
    return salaryStr;
}

export function getApplications() {
    let apps = JSON.parse(localStorage.getItem("careerpilot_applications"));
    if (!apps) {
        apps = [...DEFAULT_APPLICATIONS];
        localStorage.setItem("careerpilot_applications", JSON.stringify(apps));
    } else {
        // Migrate legacy applications from USD to INR
        let migrated = false;
        apps = apps.map(app => {
            if (app.salary && app.salary.startsWith('$')) {
                migrated = true;
                return { ...app, salary: convertUsdToInr(app.salary) };
            }
            return app;
        });
        if (migrated) {
            localStorage.setItem("careerpilot_applications", JSON.stringify(apps));
        }
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

export const DEFAULT_NOTES = [
    {
        id: "note-1",
        company: "Google",
        role: "Software Engineering Intern",
        round: "Technical",
        date: "2026-05-20",
        difficulty: "Medium",
        status: "Selected",
        skills: ["Algorithms", "Graphs", "C++"],
        notes: "Focused heavily on graph algorithms and system design basics. The interviewer was friendly but very precise about time complexity. Used DFS to solve cycle detection.",
        questions: "1. How do you detect a cycle in a directed graph?\n2. Design an LRU Cache with O(1) get and put operations.",
        tips: "Always explain your trade-offs between space and time complexity before writing code. Practice talking out loud.",
        mistakes: "Initially forgot to check for cyclic references in node visits, but corrected it during walkthrough.",
        starred: true,
        confidence: 4,
        voiceNote: null,
        attachments: []
    },
    {
        id: "note-2",
        company: "Stripe",
        role: "Backend Engineer Intern",
        round: "HR",
        date: "2026-05-18",
        difficulty: "Easy",
        status: "Selected",
        skills: ["Behavioral", "System Design", "APIs"],
        notes: "Discussed past projects, teamwork challenges, and why I wanted to join Stripe. They really value clean code, API design principles, and strong collaboration skills.",
        questions: "1. Tell me about a time you resolved a major bug in production under tight deadlines.\n2. Why Stripe and how would you design a simple idempotent payment API?",
        tips: "Structure your answers using the STAR method (Situation, Task, Action, Result). Highlight your specific contribution.",
        mistakes: "Spent too much time detailing the technical background of my project instead of focusing on what I did to solve it.",
        starred: false,
        confidence: 5,
        voiceNote: null,
        attachments: []
    },
    {
        id: "note-3",
        company: "Vercel",
        role: "Frontend Engineer Intern",
        round: "OA",
        date: "2026-05-12",
        difficulty: "Hard",
        status: "Waiting",
        skills: ["Next.js", "React", "TypeScript"],
        notes: "Coding assignment with performance-oriented questions. Needed to build a search-as-you-type component with debouncing and virtualized list. Focus on minimizing layout shifts.",
        questions: "1. Implement a search input with custom hook for debouncing and caching search results.\n2. Explain the difference between Server Components and Client Components in React 19.",
        tips: "Make sure Layout Shift (CLS) is minimized. Write clean TypeScript types and avoid using 'any'.",
        mistakes: "Forgot to clear the debounce timer in the useEffect cleanup function, which could cause a memory leak. Caught it later.",
        starred: true,
        confidence: 3,
        voiceNote: null,
        attachments: []
    }
];

export function getNotes() {
    let notes = JSON.parse(localStorage.getItem("careerpilot_notes"));
    if (!notes) {
        notes = [...DEFAULT_NOTES];
        localStorage.setItem("careerpilot_notes", JSON.stringify(notes));
    }
    return notes;
}

export function saveNotes(notes) {
    localStorage.setItem("careerpilot_notes", JSON.stringify(notes));
}
