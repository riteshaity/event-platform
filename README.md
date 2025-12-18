## 🚀 Mini Event Platform (MERN Stack)

A full-stack MERN Event Management Platform that allows users to create events, browse upcoming events, and RSVP with strict capacity enforcement and concurrency safety.

🔗 Live Demo: (add your Vercel URL here)
🔗 Backend API: (add your Render URL here)

Built as part of a Full Stack Developer Intern – Technical Screening Assignment.

## ✨ Features
## 🔐 Authentication

User registration & login

JWT-based authentication

Protected routes for authenticated users only

## 📅 Event Management

Create events with:

Title, description, date & time

Location & capacity

Image upload (Cloudinary)

View all upcoming events

Edit & delete events created by the user

🤝 RSVP System (Core Business Logic)

Join and leave events

Strict capacity enforcement

Concurrency-safe RSVP handling

Prevents:

Overbooking

Duplicate RSVPs

## 👤 User Dashboard

Events created by the user

Events the user is attending

## 🎨 UI / UX

Responsive React UI

Reusable components (Navbar, EventCard)

Clean and intuitive navigation

## 🛠️ Tech Stack
Frontend

React.js

React Router DOM

Axios

Context API

CSS

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Multer (file handling)

Cloudinary (image uploads)

## Cloud & Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

Image Storage: Cloudinary

## 🔒 RSVP Capacity & Concurrency Handling

One of the key challenges of this project was preventing overbooking when multiple users attempt to RSVP simultaneously.

## ✅ Strategy Used

The backend uses MongoDB atomic operations with conditional checks via findOneAndUpdate.

## 🧠 How it works

Ensures the event is not full

Ensures the user has not already joined

Uses a single atomic DB operation to prevent race conditions

## 📌 Sample Logic
Event.findOneAndUpdate(
  {
    _id: eventId,
    attendees: { $ne: userId },
    $expr: { $lt: [{ $size: "$attendees" }, "$capacity"] }
  },
  { $push: { attendees: userId } },
  { new: true }
);

## 🎯 Guarantees

No duplicate RSVPs

No overbooking

Safe under concurrent requests

## ⚙️ Environment Variables

Create a .env file inside the server/ directory:

PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret


## ⚠️ .env is ignored using .gitignore for security.

## ▶️ Run Locally
Backend
cd server
npm install
npm run dev

Frontend
cd client
npm install
npm start

## URLs

## Frontend: https://event-platform-psuv-7jv8yn3pv-riteshrajs-projects.vercel.app/

## Backend: https://event-platform-d66f.onrender.com/

## 🌍 Deployment

Backend deployed on Render

Frontend deployed on Vercel

Secure environment variables configured on cloud platforms

API base URL configured for production



## 👨‍💻 Built By

Aity Riteshraj
B.Tech (Information Technology)

Aspiring Full Stack Developer with strong interest in backend systems, MERN stack, and scalable web applications.

## ✅ Project Status

✔ Fully implemented
✔ Fully deployed
✔ Production-ready
✔ Submission-ready

## ⭐ Why this project stands out

Real-world business logic (concurrency handling)

Clean MERN architecture

Secure authentication

Cloud deployment

Professional GitHub workflow


## Screenshots

<img width="1919" height="742" alt="Screenshot 2025-12-18 154949" src="https://github.com/user-attachments/assets/d1afd369-848a-4d62-a89b-bcf21e1fefc6" />
<img width="1916" height="777" alt="Screenshot 2025-12-18 154933" src="https://github.com/user-attachments/assets/aa58edf5-04f6-4ad3-96a0-b46f3892d68c" />
<img width="1919" height="772" alt="Screenshot 2025-12-18 154906" src="https://github.com/user-attachments/assets/06983462-1337-4b12-b85d-4b58f7d6c42c" />



