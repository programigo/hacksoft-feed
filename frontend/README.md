# HackSoft Feed

HackSoft Feed is a small full-stack social/feedback app.

Core features:

- Users can sign up / log in
- Authenticated users can view their profile (`/users/me`) and update profile details
- Users can create and browse posts in a feed
- Profile pictures / uploads are handled via Cloudinary

This repository contains:

- `frontend/`: React + TypeScript + Vite
- `backend/`: Node + Express + MongoDB (Mongoose) + JWT auth

## Prerequisites

- Node.js (v18+ recommended)
- MongoDB running locally or accessible via connection string
- A Cloudinary account (for image uploads)

## Setup

### Quick start (recommended)

1. Create backend env file: `backend/.env`
2. Start backend and frontend in two separate terminals.

### Backend

1. Open a terminal in the repo root
2. Install backend dependencies:
   - `cd backend`
   - `npm install`
3. Create an environment file at `backend/.env` with the required variables:
   - `PORT` (the frontend expects the backend at `http://localhost:5001`, so set `PORT=5001`)
   - `MONGO_URI` (MongoDB connection string)
   - `JWT_SECRET` (used for signing/verifying auth tokens)
   - `CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
4. Start the backend:
   - `npm run dev`

The backend exposes:

- `http://localhost:5001/api/users/...`
- `http://localhost:5001/api/posts/...`

### Frontend

1. From the repo root:
   - `cd frontend`
   - `npm install`
2. Start the frontend:
   - `npm run dev`

Vite will start a dev server (usually on `http://localhost:5173`).

## Development Notes

- The frontend service layer currently hardcodes the API base URL to `http://localhost:5001`.
  If you change the backend port, update:
  - `frontend/src/services/authService.ts`
  - `frontend/src/services/usersService.ts`
  - `frontend/src/services/postsService.ts`

### Run both locally (two terminals)

Terminal 1 (backend):

- `cd backend && npm run dev`

Terminal 2 (frontend):

- `cd frontend && npm run dev`

## Useful commands

- Frontend: `npm run dev`, `npm run build`, `npm run lint`
- Backend: `npm run dev`, `npm run start`
