<div align="center">
  <h1>🚀 CareerPilot</h1>
  <p><strong>A Modern, Premium SaaS Platform for Internship & Job Tracking</strong></p>
  
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

<br />

CareerPilot is an elegantly designed platform tailored to help students and professionals navigate their job search journey. Featuring a stunning cosmic-inspired dark and glassmorphic aesthetic, it serves as a centralized command center to monitor application pipelines, document interview progress, and visualize career growth.

---

## ✨ Key Features

* **📊 Comprehensive Dashboard:** Gain a bird's-eye view of your application funnel, recent activities, and key performance metrics through an intuitive Bento-grid layout.
* **📋 Application Management:** Access detailed list and card views equipped with advanced filtering, timeline milestones, and interview notes for every opportunity.
* **🗂️ Interactive Pipeline Board:** Utilize a visual drag-and-drop Kanban board to seamlessly transition applications across various stages (e.g., Applied, Screening, Interviewing, Offer).
* **✨ Premium User Experience:** 
  * Beautiful glassmorphism UI accented with vibrant gradients.
  * Fluid micro-animations and seamless transitions across all modules.
  * Fully responsive design optimized for desktop, tablet, and mobile viewing.
* **👤 Profile & Settings:** Manage resume versions, skillsets, and notification preferences within a dedicated user portal.
* **💾 Local Storage Integration:** A robust client-side architecture that securely persists your data within your browser's local storage—no backend setup required!

---

## 🛠️ Technology Stack

* **Core Framework:** React 18+ (bootstrapped with Vite for lightning-fast HMR)
* **Styling Framework:** Tailwind CSS & Vanilla CSS (custom variables and layout tokens)
* **Icons:** Google Material Symbols
* **Data Persistence:** Browser `localStorage` API

---

## 🚀 Getting Started

To run CareerPilot locally on your machine, follow these simple steps:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your system (v16+ is recommended).

### 2. Install Dependencies
Install the required packages in the project root:
```bash
npm install
```

### 3. Run the Development Server
Start the Vite development server:
```bash
npm run dev
```
Once the server starts, open your browser and navigate to the address displayed in your terminal (typically `http://localhost:5173/`).

### 4. Build for Production
To generate a highly optimized production build:
```bash
npm run build
```

---

## 📁 Project Structure

The application's source code is modular and organized within the `src` directory:

* `src/App.jsx` - The main layout container, central state manager, and route controller.
* `src/components/` - Reusable UI components and modular views:
  * `Launcher.jsx` - Splash page and initial preloader.
  * `Sidebar.jsx` - Responsive navigation drawers for desktop and mobile.
  * `Header.jsx` - Top navigation containing a search bar, theme toggler, and notifications.
  * `Dashboard.jsx` - Bento-style metrics cards and application funnel statistics.
  * `Applications.jsx` - Detailed data tables with advanced filtering capabilities.
  * `Board.jsx` - Interactive Kanban swimlanes for pipeline management.
  * `AddNew.jsx` - Step-by-step form validator wizard for new entries.
  * `Profile.jsx` - User profile, skills manager, and system preferences.
  * `DetailsModal.jsx` - Detailed modal popups for viewing and editing application records.
* `src/utils/helpers.js` - Utility functions including storage managers, date formatters, and initial seed data.
* `src/index.css` - Global stylesheet encompassing glassmorphic properties, color tokens, and animation keyframes.

---

## 🤝 Contributing

Contributions, issues, and feature requests are always welcome! Feel free to check the issues page if you would like to contribute and help improve CareerPilot.

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).