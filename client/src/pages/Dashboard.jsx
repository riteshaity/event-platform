import { useEffect, useState } from "react";
import api from "../services/api";
import EventCard from "../components/EventCard";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    const res = await api.get("/events");
    setEvents(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) return <p>Loading events...</p>;

  return (
    <div>
      <Navbar />

      <h2>Upcoming Events</h2>

      {events.length === 0 && <p>No events available</p>}

      {events.map((event) => (
        <EventCard
          key={event._id}
          event={event}
          onAction={fetchEvents}
        />
      ))}
    </div>
  );
};

export default Dashboard;
