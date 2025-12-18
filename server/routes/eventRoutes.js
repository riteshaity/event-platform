const express = require("express");
const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  getMyCreatedEvents,
  getMyAttendingEvents,
} = require("../controllers/eventController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// CREATE EVENT (with image)
router.post("/", protect, upload.single("image"), createEvent);

// GET ALL EVENTS (public)
router.get("/", getEvents);

// DASHBOARD ROUTES
router.get("/my/created", protect, getMyCreatedEvents);
router.get("/my/attending", protect, getMyAttendingEvents);

// UPDATE & DELETE
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);

module.exports = router;
