import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type Event = {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  bannerUrl: string;
};

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:9090/api/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar el evento", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-white p-6">Cargando evento...</p>;
  if (!event) return <p className="text-red-600 p-6">Evento no encontrado.</p>;

  // Corregir la ruta de la imagen para evitar doble slash si bannerUrl ya empieza con "media/"
  const imageUrl = event.bannerUrl.startsWith("media/")
    ? `http://localhost:9090/${event.bannerUrl}`
    : `http://localhost:9090/media/${event.bannerUrl}`;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow rounded p-6">
      {event.bannerUrl && (
        <img
          src={imageUrl}
          alt={event.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <p className="text-gray-600 mb-2">Ubicación: {event.location}</p>
      <p className="text-gray-600 mb-2">Fecha: {event.date}</p>
      <p className="text-gray-800">{event.description}</p>
    </div>
  );
};

export default EventDetail;