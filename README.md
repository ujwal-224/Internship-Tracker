# CareerPilot (Internship Tracker) 🚀

CareerPilot is a modern, premium SaaS platform designed to help students and job seekers track their internship and job applications with a highly polished, interactive user interface. Built with a stunning cosmic-inspired dark/glassmorphic aesthetic, the application provides a centralized hub to monitor application statuses, manage interviews, and track personal career growth.

## ✨ Features

* **📊 Comprehensive Dashboard:** Get a bird's-eye view of your application funnel, recent activity, and key performance metrics via an intuitive Bento-grid layout.
* **📋 Application Management:** Detailed list and card views with advanced filtering, timeline milestones, and interview notes for every opportunity.
* **kanban Interactive Pipeline Board:** Visual drag-and-drop style Kanban board to manage applications across various stages (Applied, Screening, Interviewing, Offer, Rejected).
* **✨ Premium User Experience:** 
  * Beautiful glassmorphism UI with vibrant gradient accents.
  * Micro-animations and seamless transitions across all modules.
  * Fully responsive design optimized for all screen sizes.
* **👤 Profile & Settings:** Manage your resume versions, skillsets, and notification preferences in a dedicated portal.
* **💾 Local Storage Integration:** Fully functional client-side application that securely stores your data in your browser's local storage. No backend required!

## 🛠️ Technology Stack

* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Styling Framework:** Tailwind CSS
* **Icons:** Google Material Symbols
* **Data Persistence:** Browser `localStorage` API

## 🚀 Getting Started

Since CareerPilot is a fully client-side application utilizing `localStorage`, getting started is incredibly simple.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/internship-tracker.git
   ```
2. **Navigate to the directory:**
   ```bash
   cd internship-tracker
   ```
3. **Run the Application:**
   Simply open `index.html` in your favorite modern web browser.
   
   *Alternatively, you can serve it locally using a simple HTTP server (e.g., Python):*
   ```bash
   python -m http.server 8000
   ```
   Then navigate to `http://localhost:8000` in your browser.

## 📁 Project Structure

* `index.html` - The landing page and entry point.
* `dashboard.html` - The main analytics and overview hub.
* `applications.html` - The detailed list view for all tracked applications.
* `board.html` - The visual Kanban pipeline for tracking status.
* `add-new.html` - The dynamic form for entering new application details.
* `profile.html` - User settings, resume management, and skills.
* `styles.css` - Custom CSS containing the premium glassmorphism utility classes and design tokens.
* `shared.js` - Global JavaScript utilities, state management (`localStorage` handlers), and reusable UI logic.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).