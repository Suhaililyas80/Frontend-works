# React

## Overview

This is the React frontend for Project-Lumen. It provides user interfaces for authentication, user management, task management, analytics, and notifications, communicating with the Project-Lumen backend APIs.

---

## Framework & Design

- **Framework:** React (with React Router, Redux)
- **Architecture:** Component-based SPA (Single Page Application)
- **Language:** JavaScript
- **State Management:** Redux
- **Authentication:** JWT-based (handled via backend API)
- **Styling:** CSS Modules
- **API Communication:** Fetch/Axios (see `api.js`)
- **Containerization:** Docker, Nginx (for production)

---

## Folder Structure

```
frontend/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── AllTasks/
│   │   │   ├── AllTasks.css
│   │   │   └── Alltasks.js
│   │   ├── CreateTasks/
│   │   │   ├── CreateTasks.css
│   │   │   └── CreateTasks.js
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.css
│   │   │   └── Dashboard.js
│   │   ├── ForgotPassword/
│   │   │   ├── ForgotPassword.css
│   │   │   └── ForgotPassword.js
│   │   ├── Layout/
│   │   │   ├── Layout.css
│   │   │   └── Layout.js
│   │   ├── Login/
│   │   │   ├── Login.css
│   │   │   └── Login.js
│   │   ├── Logout/
│   │   │   └── Logout.js
│   │   ├── Notification/
│   │   │   ├── Notification.css
│   │   │   └── Notification.js
│   │   ├── Registration/
│   │   │   ├── Registration.css
│   │   │   └── Registration.js
│   │   ├── ResetPassword/
│   │   │   ├── ResetPassword.css
│   │   │   └── ResetPassword.js
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.css
│   │   │   └── Sidebar.js
│   │   ├── Sidebar2/
│   │   │   ├── Sidebar2.css
│   │   │   └── Sidebar2.js
│   │   ├── UserActivities/
│   │   │   ├── UserActivities.css
│   │   │   └── UserActivities.js
│   │   ├── VerifyEmail/
│   │   │   ├── VerifyEmail.css
│   │   │   └── VerifyEmail.js
│   │   ├── VmockDashboard/
│   │   │   ├── VmockDashboard.css
│   │   │   └── VmockDashboard.js
│   │   ├── AssignRole.jsx
│   │   ├── CsvDownloadB.jsx
│   │   ├── DeleteUsers.jsx
│   │   └── NotifyUser.jsx
│   ├── Redux/
│   │   ├── loginReduder.js
│   │   ├── RegistrationReducer.js
│   │   └── store.js
│   ├── api.js
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── Dockerfile
├── nginx.conf
├── package-lock.json
├── package.json
└── README.md
```

---

## Routing

- **React Router** is used for client-side routing.
- Key routes (see `App.js`):
  - `/login` → Login page
  - `/register` → Registration
  - `/verify-email` → Email verification
  - `/reset-password` → Password reset
  - `/AllTasks` → List all tasks _(inside Layout)_
  - `/UserActivities` → User activity log _(inside Layout)_
  - `/Dashboard` → User dashboard _(inside Layout)_
  - `/Notification` → Notifications _(inside Layout)_
  - `/createtask` → Create a new task
  - `/VmockDashboard` → Analytics/Mock dashboard
  - `/logout` → Logout _(private route)_
- **PrivateRoute** wrapper ensures some routes are only accessible when authenticated.

---

## Components

- **Auth:** `Login`, `Registration`, `VerifyEmail`, `ResetPassword`, `Logout`
- **Task Management:** `AllTasks`, `CreateTasks`
- **User:** `Dashboard`, `UserActivities`
- **Notification:** `Notification`, `NotifyUser`
- **Layout:** `Layout`, `Sidebar2`,
- **Utilities/Admin:** `AssignRole`, `CsvDownloadB`, `DeleteUsers`

---

## State Management

- **Redux** is used for global state (see `src/Redux/store.js`).

---

## API Communication

- All backend API calls are managed via `src/api.js`.
- Uses JWT stored in Cookies storage for authentication.

---

## Connecting to Backend

- The frontend expects a running instance of the Project-Lumen backend.
- Backend API base URL can be set in `api.js` or via environment variables.

---

## Running the Project

### Development

```bash
npm install
npm start
```

- Runs on [http://localhost:3000](http://localhost:3000)

### Production (Docker)

1. **Build the frontend:**
   ```bash
   npm run build
   ```
2. **Run with Docker:**
   ```bash
   docker build -t project-lumen-frontend .
   docker run -p 80:80 project-lumen-frontend
   ```
   - Serves with Nginx (using `nginx.conf`)

---

## Notes

- For full functionality, use this frontend with the [Project-Lumen Backend](../Project-Lumen).
- All routes and API endpoints are protected via JWT and require proper login.

---
