const Event = require("../models/Event");

// CREATE EVENT
const cloudinary = require("../utils/cloudinary");

// CREATE EVENT (with image)
exports.createEvent = async (req, res) => {
  try {
    const { title, description, dateTime, location, capacity } = req.body;

    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "events",
      });
      imageUrl = result.secure_url;
    }

    const event = await Event.create({
      title,
      description,
      dateTime,
      location,
      capacity,
      imageUrl,
      createdBy: req.user.id,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL EVENTS
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({ dateTime: { $gte: new Date() } })
      .populate("createdBy", "name email")
      .sort({ dateTime: 1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE EVENT
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Only creator can update
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(event, req.body);
    await event.save();

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE EVENT
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Only creator can delete
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await event.deleteOne();
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET EVENTS CREATED BY LOGGED-IN USER
exports.getMyCreatedEvents = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user.id })
      .sort({ createdAt: -1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET EVENTS USER IS ATTENDING
exports.getMyAttendingEvents = async (req, res) => {
  try {
    const events = await Event.find({ attendees: req.user.id })
      .sort({ dateTime: 1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
