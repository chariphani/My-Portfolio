# MERN Portfolio 

React + Vite + Tailwind (client) · Express + MongoDB (server)

## Setup
1. Install everything:  `npm run install:all`
2. Server env:  copy `server/.env` to `server/.env` and set `MONGO_URI`
   (local MongoDB, or a free MongoDB Atlas connection string).
3. Put your resume PDF in `client/public/` named `Phanindhra resume.pdf`.
4. Run both apps:  `npm run dev`
   

## Contact form -> MongoDB
- `POST /api/contact` saves `{name, email, message}` in the `messages` collection.
- Read messages: `GET /api/contact` with header `x-admin-key: <ADMIN_KEY from .env>`,
  or open the `portfolio` database in MongoDB Compass / Atlas.

## Deploy
- Client (Vercel/Netlify): root `client`, set `VITE_API_URL` to your server URL.
- Server (Render/Railway): root `server`, set env vars; set `CLIENT_URL` to your client URL.

## Edit content
All text, projects and links live in `client/src/data.js`.
