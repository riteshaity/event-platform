# Mini Event Platform (MERN Stack)

A full-stack MERN application that allows users to create events, view upcoming events, and RSVP with strict capacity enforcement and concurrency handling.

This project was built as part of a Full Stack Developer Intern technical assignment.

---

## 🚀 Features

- User authentication using JWT
- Create, view, update, and delete events
- Upload event images using Cloudinary
- RSVP system with:
  - Strict capacity enforcement
  - Concurrency-safe logic (no overbooking)
  - No duplicate RSVPs per user
- User dashboard:
  - Events created by the user
  - Events the user is attending
- Fully responsive React UI

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Context API
- CSS (inline + global)

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Multer & Cloudinary for image uploads

### Database & Services
- MongoDB Atlas
- Cloudinary

---

## 🔐 RSVP Capacity & Concurrency Handling

To prevent overbooking when multiple users attempt to RSVP simultaneously, the backend uses MongoDB atomic operations.

### Strategy Used
- `findOneAndUpdate` with conditional checks
- Ensures:
  - Event is not full
  - User has not already RSVP’d
  - Operation is atomic (race-condition safe)

### Sample Logic
```js
Event.findOneAndUpdate(
  {
    _id: eventId,
    attendees: { $ne: userId },
    $expr: { $lt: [{ $size: "$attendees" }, "$capacity"] }
  },
  { $push: { attendees: userId } },
  { new: true }
);
