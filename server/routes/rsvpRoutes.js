const express = require("express");
const { joinEvent, leaveEvent } = require("../controllers/rsvpController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:id/join", protect, joinEvent);
router.post("/:id/leave", protect, leaveEvent);

module.exports = router;
