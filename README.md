# CareerPilot (Internship Tracker) 🚀

CareerPilot is a modern, premium SaaS platform designed to help students and job seekers track their internship and job applications with a highly polished, interactive user interface. Built with a stunning cosmic-inspired dark/glassmorphic aesthetic, the application provides a centralized hub to monitor application statuses, manage interviews, and track personal career growth.

---

## ✨ Features

* **📊 Comprehensive Dashboard:** Get a bird's-eye view of your application funnel, recent activity, and key performance metrics via an intuitive Bento-grid layout.
* **📋 Application Management:** Detailed list and card views with advanced filtering, timeline milestones, and interview notes for every opportunity.
* **🗂️ Interactive Pipeline Board:** Visual drag-and-drop Kanban board to manage applications across various stages (Applied, Screening, Interviewing, Offer).
* **✨ Premium User Experience:** 
  * Beautiful glassmorphism UI with vibrant gradient accents.
  * Micro-animations and seamless transitions across all modules.
  * Fully responsive design optimized for all screen sizes.
* **👤 Profile & Settings:** Manage your resume versions, skillsets, and notification preferences in a dedicated portal.
* **💾 Local Storage Integration:** Fully functional client-side application that securely stores your data in your browser's local storage. No backend required!

---

## 🛠️ Technology Stack

* **Core Framework:** React 18+ (Vite)
* **Styling Framework:** Tailwind CSS & Vanilla CSS (variables, layout tokens)
* **Icons:** Google Material Symbols
* **Data Persistence:** Browser `localStorage` API

---

## 🚀 Getting Started

To run CareerPilot locally on your machine, follow these steps:

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v16+ recommended).

### 2. Install Dependencies
Install the package dependencies in the project root:
```bash
npm install
```

### 3. Run Development Server
Start the local Vite development server:
```bash
npm run dev
```
Then open the address displayed in your terminal (usually `http://localhost:5173/` or `http://localhost:5174/`) in your web browser.

### 4. Build for Production
To build a highly optimized production bundle:
```bash
npm run build
```

---

## 📁 Project Structure

All application source code resides in the root workspace directory:

* `src/App.jsx` - The main layout container, central state manager, and hash-based route controller.
* `src/components/` - Reusable UI views and cards:
  * `Launcher.jsx` - Splash page preloader.
  * `Sidebar.jsx` - Desktop and mobile navigation drawers.
  * `Header.jsx` - Top search bar, theme toggler, and notification dropdown.
  * `Dashboard.jsx` - Bento metrics cards and funnel statistics.
  * `Applications.jsx` - Applications table filters and timeline progress view.
  * `Board.jsx` - Drag-and-drop Kanban swimlanes.
  * `AddNew.jsx` - Form validator wizard.
  * `Profile.jsx` - User profile, skills manager, and preferences.
  * `DetailsModal.jsx` - Card modal popup for detailed updates.
* `src/utils/helpers.js` - Storage managers, initials avatar mappings, date formatters, and seed data.
* `src/index.css` - Custom glassmorphic styles, color tokens, and preloader animations.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).