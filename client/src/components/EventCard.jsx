import api from "../services/api";

const EventCard = ({ event, onAction }) => {
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  const isJoined = event.attendees.some(
    (id) => id === userId || id?._id === userId
  );

  const isFull = event.attendees.length >= event.capacity;

  const handleJoin = async () => {
    await api.post(`/rsvp/${event._id}/join`);
    onAction();
  };

  const handleLeave = async () => {
    await api.post(`/rsvp/${event._id}/leave`);
    onAction();
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: 16,
        borderRadius: 6,
        marginBottom: 16,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.title}
          style={{ width: "100%", maxHeight: 200, objectFit: "cover" }}
        />
      )}

      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p><b>Location:</b> {event.location}</p>
      <p>
        <b>Capacity:</b> {event.attendees.length}/{event.capacity}
      </p>

      {!isJoined && !isFull && (
        <button onClick={handleJoin}>Join</button>
      )}

      {isJoined && (
        <button onClick={handleLeave}>Leave</button>
      )}

      {!isJoined && isFull && <p>Event Full</p>}
    </div>
  );
};

export default EventCard;
