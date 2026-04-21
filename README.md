# Credix — Medical Credentialing Platform

> A full-stack MERN application that automates the doctor credentialing process. Doctors submit verification requests, upload documents, and track approval status in real time — while admins review, approve or reject, add expiry dates, and leave review notes from a separate protected dashboard.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Authentication & Role-Based Access](#authentication--role-based-access)
- [API Routes](#api-routes)
- [Screenshots](#screenshots)
- [License](#license)

---

## Overview

Credix solves the slow, paperwork-heavy process of verifying a doctor's credentials. Instead of weeks of back-and-forth, doctors sign up, submit their license number, specialization, years of experience, and supporting documents through a clean form. The request lands in the admin dashboard where it can be reviewed, approved, or rejected — with notes and expiry dates attached.

Two separate dashboards, one for users and one for admins, are served based on the logged-in role. Route guards prevent users from accessing admin views and vice versa.

---

## Features

### Auth
- Sign up and log in with JWT-based authentication
- Role detection on login — automatically redirects to the correct dashboard (`/user/dashboard` or `/admin/dashboard`)
- Protected routes on both frontend and backend

### User Dashboard
- Submit a new credential verification request
- Attach supporting documents (medical license, board cert, DEA registration, etc.)
- View all submitted requests with real-time status — `pending`, `approved`, or `rejected`
- See the admin's review note when a request is approved or rejected
- Track license expiry date once set by admin

### Admin Dashboard
- View all incoming verification requests across all users
- Update request status (`pending` → `approved` or `rejected`)
- Add a review note explaining the decision
- Set or update the license expiry date for approved doctors
- Full activity log of recent actions

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT (JSON Web Tokens) |
| File uploads | Multer |
| HTTP client | Axios |

---

## Project Structure

```
credix/
├── client/                        # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/                # GIFs, images
│   │   ├── components/            # Shared UI components
│   │   ├── pages/
│   │   │   ├── HeroSection.jsx    # Landing page
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── user/
│   │   │   │   ├── UserDashboard.jsx
│   │   │   │   └── RequestForm.jsx
│   │   │   └── admin/
│   │   │       └── AdminDashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                        # Express backend
│   ├── models/
│   │   ├── User.js
│   │   └── Request.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   └── admin.routes.js
│   ├── middleware/
│   │   ├── auth.middleware.js     # JWT verification
│   │   └── role.middleware.js     # Role-based access guard
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   └── admin.controller.js
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/your-username/credix.git
cd credix
```

### 2. Install dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Set up environment variables

Create a `.env` file inside the `server/` folder (see [Environment Variables](#environment-variables) below).

### 4. Run the app

```bash
# Start the backend (from /server)
npm run dev

# Start the frontend (from /client)
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:5000` by default.

---

## Environment Variables

Create a `server/.env` file with the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

---

## Authentication & Role-Based Access

On login, the server returns a JWT that includes the user's role (`user` or `admin`). The frontend reads the role from the decoded token and redirects accordingly:

```
role === "admin"  →  /admin/dashboard
role === "user"   →  /user/dashboard
```

Both the frontend routes and backend API endpoints are protected:

- **Frontend** — React route guards redirect unauthenticated users to `/login` and wrong-role users to their own dashboard
- **Backend** — `auth.middleware.js` verifies the JWT on every protected request; `role.middleware.js` checks the role before allowing access to admin-only or user-only endpoints

---

## API Routes

### Auth

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Log in, returns JWT |

### User (requires auth, role: user)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/user/request` | Submit a new credential request |
| GET | `/api/user/requests` | Get all requests for the logged-in user |
| GET | `/api/user/request/:id` | Get a single request with review note |

### Admin (requires auth, role: admin)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/requests` | Get all submitted requests |
| GET | `/api/admin/request/:id` | Get a single request detail |
| PATCH | `/api/admin/request/:id` | Update status, review note, expiry date |

---

## Request Schema

```js
{
  userId:            ObjectId (ref: User),
  fullName:          String,
  licenseNumber:     String,
  specialization:    String,
  experience:        Number,
  documents:         [{ fileUrl: String, fileName: String }],
  status:            "pending" | "approved" | "rejected",  // default: "pending"
  reviewNote:        String,
  licenseExpiryDate: Date,
  createdAt:         Date,
  updatedAt:         Date
}
```

---

## Screenshots

| Page | Description |
|---|---|
| Landing | Hero section with live verification feed |
| Sign up / Login | Auth forms with role-based redirect |
| User dashboard | Request list with status badges and review notes |
| Request form | Full credential submission form with document upload |
| Admin dashboard | Verification queue, status breakdown, activity log |

---

## License

MIT — feel free to use, modify, and distribute.

---

<p align="center">Built with the MERN stack · Styled with Tailwind CSS</p>
