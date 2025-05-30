import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Event = {
  id: number;
  title: string;
  location: string;
  date: string;
  bannerUrl: string;
};

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("http://localhost:9090/api/events")
      .then((res) => res.json())
      .then(setEvents)
      .catch((err) => console.error("Error cargando eventos:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {events.map((event) => (
        <Link
          key={event.id}
          to={`/eventos/${event.id}`}
          className="bg-white rounded shadow overflow-hidden hover:shadow-lg transition"
        >
          <img
            src={`http://localhost:9090/${event.bannerUrl}`}
            alt={event.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold">{event.title}</h2>
            <p className="text-gray-600">{event.location}</p>
            <p className="text-sm text-gray-500">{event.date}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default EventList;
