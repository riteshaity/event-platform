const Event = require("../models/Event");

// JOIN EVENT (RSVP)
exports.joinEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.id;

    const event = await Event.findOneAndUpdate(
      {
        _id: eventId,
        attendees: { $ne: userId },
        $expr: { $lt: [{ $size: "$attendees" }, "$capacity"] },
      },
      {
        $push: { attendees: userId },
      },
      { new: true }
    );

    if (!event) {
      return res.status(400).json({
        message: "Event is full or you already joined",
      });
    }

    res.json({ message: "Joined event successfully", event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LEAVE EVENT
exports.leaveEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.id;

    await Event.findByIdAndUpdate(eventId, {
      $pull: { attendees: userId },
    });

    res.json({ message: "Left event successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
