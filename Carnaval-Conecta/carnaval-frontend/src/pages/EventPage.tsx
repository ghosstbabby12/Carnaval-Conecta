import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EventPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/api/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error al obtener el evento", error);
      }
    };
    fetchEvent();
  }, [id]);

  const handleDelete = () => {
    fetch(`http://localhost:9090/api/events/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          alert("Evento eliminado");
          navigate("/eventos"); // Regresa a la lista
        } else {
          alert("No se pudo eliminar el evento");
        }
      })
      .catch((err) => {
        console.error("Error al eliminar:", err);
        alert("Error al eliminar el evento");
      });
  };

  if (!event) return <p className="text-white p-4">Cargando...</p>;

  const getFullImageUrl = (bannerUrl: string | undefined) => {
    if (!bannerUrl) return undefined;
    if (bannerUrl.startsWith("http://") || bannerUrl.startsWith("https://")) {
      return bannerUrl;
    }
    return `http://localhost:9090${bannerUrl}`;
  };

  const imageUrl = getFullImageUrl(event.bannerUrl);

  return (
    <div className="p-6 text-white max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
      >
        ← Volver
      </button>

      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="mb-2"><strong>Ubicación:</strong> {event.location}</p>
      <p className="mb-2"><strong>Fecha:</strong> {event.date}</p>
      <p className="mb-3"><strong>Descripción:</strong> {event.description}</p>

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Banner del evento"
          className="w-full max-w-xl rounded-lg mb-4"
        />
      )}

      <div className="flex gap-4">
        <button
          onClick={() => navigate(`/editar-evento/${id}`)}
          className="bg-yellow-500 px-4 py-2 rounded text-black font-semibold hover:bg-yellow-600"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 px-4 py-2 rounded font-semibold hover:bg-red-700"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default EventPage;
