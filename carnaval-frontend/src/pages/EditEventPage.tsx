import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import EventForm from "../components/EventForm";

const EditEventPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/api/events/${id}`);
        setEventData(response.data);
      } catch (error) {
        console.error("Error cargando evento", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleUpdateEvent = async (formData: FormData) => {
    try {
      await axios.put(`http://localhost:9090/api/events/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Evento actualizado exitosamente");
      navigate(`/eventos/${id}`);
    } catch (error) {
      alert("Error al actualizar el evento");
      console.error(error);
    }
  };

  if (loading) return <p>Cargando evento...</p>;
  if (!eventData) return <p>Evento no encontrado</p>;

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
      >
        ← Volver
      </button>
      <h2 className="text-3xl font-bold mb-4">Editar Evento</h2>
      <EventForm initialValues={eventData} onSubmit={handleUpdateEvent} />
    </div>
  );
};

export default EditEventPage;
