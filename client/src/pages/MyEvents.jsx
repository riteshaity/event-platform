import { useEffect, useState } from "react";
import api from "../services/api";
import EventCard from "../components/EventCard";
import Navbar from "../components/Navbar";

const MyEvents = () => {
  const [createdEvents, setCreatedEvents] = useState([]);
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyEvents = async () => {
    const created = await api.get("/events/my/created");
    const attending = await api.get("/events/my/attending");

    setCreatedEvents(created.data);
    setAttendingEvents(attending.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />

      <h2>My Created Events</h2>
      {createdEvents.length === 0 && <p>No events created.</p>}
      {createdEvents.map((e) => (
        <EventCard key={e._id} event={e} onAction={fetchMyEvents} />
      ))}

      <hr />

      <h2>Events I’m Attending</h2>
      {attendingEvents.length === 0 && <p>Not attending any events.</p>}
      {attendingEvents.map((e) => (
        <EventCard key={e._id} event={e} onAction={fetchMyEvents} />
      ))}
    </div>
  );
};

export default MyEvents;
