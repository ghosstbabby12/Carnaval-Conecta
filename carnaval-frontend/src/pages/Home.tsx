import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents, createEvent, deleteEvent } from "../services/EventService";
import { EventData } from "../services/types/EventData";
import EventForm from "../components/EventForm";
import carnavalLogo from "../assets/carnaval-logo.png";

const Home = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);
  const [pastImage, setPastImage] = useState<File | null>(null);
  const [pastTitle, setPastTitle] = useState("");
  const [pastDesc, setPastDesc] = useState("");

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events", error);
      }
    };
    fetchEvents();
  }, []);

  // Construye URL completa para imagen de banner, maneja varios casos
  const getFullImageUrl = (bannerUrl: string | undefined) => {
    if (!bannerUrl) return undefined;
    if (bannerUrl.startsWith("http://") || bannerUrl.startsWith("https://")) {
      return bannerUrl;
    }
    return `http://localhost:9090${bannerUrl}`;
  };

  // Para eventos anteriores (solo frontend)
  const handlePastEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pastImage || !pastTitle) return;
    setPastEvents((prev) => [
      ...prev,
      {
        title: pastTitle,
        description: pastDesc,
        image: URL.createObjectURL(pastImage),
      },
    ]);
    setPastTitle("");
    setPastDesc("");
    setPastImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Crear evento (backend)
  const handleCreateEvent = async (formData: FormData) => {
    try {
      const response = await createEvent(formData);
      if (response && response.data && response.data.id) {
        alert("Evento creado exitosamente");
        const createdEvent = response.data;
        setEvents((prev) => [...prev, createdEvent]);
      }
    } catch (error) {
      alert("Hubo un problema al crear el evento");
      console.error("Error:", error);
    }
  };

  // Eliminar evento (backend)
  const handleDeleteEvent = async (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este evento?")) {
      try {
        await deleteEvent(id);
        setEvents((prev) => prev.filter((event) => event.id !== id));
        alert("Evento eliminado correctamente");
      } catch (error) {
        alert("Hubo un problema al eliminar el evento");
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#E0E7EF]">
      {/* Columna izquierda */}
      <div className="flex-1 flex flex-col items-center bg-white">
        <header className="shadow-lg py-8 px-4 flex flex-col items-center mb-10 w-full max-w-5xl mx-auto rounded-b-2xl bg-white">
          <img
            src={carnavalLogo}
            alt="Carnaval de Negros y Blancos"
            className="h-24 mb-2"
          />
          <h1 className="text-4xl font-extrabold text-black text-center tracking-wide">
            Carnaval de Negros y Blancos de Pasto
          </h1>
          <p className="text-lg text-gray-700 mt-2 text-center max-w-2xl">
            ¡Vive la experiencia del carnaval más grande del sur de Colombia!
            Descubre, crea y participa en los eventos más coloridos y vibrantes
            de nuestra cultura.
          </p>
        </header>

        <section className="flex justify-center mb-12 w-full">
          <div className="w-full max-w-2xl">
            <EventForm onSubmit={handleCreateEvent} />
          </div>
        </section>

        <section className="w-full flex flex-col items-center">
          <h2 className="text-2xl font-bold text-black mb-6 w-full max-w-6xl text-center">
            Eventos del Carnaval
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
            {events.length === 0 ? (
              <p className="text-center text-gray-700">No hay eventos disponibles.</p>
            ) : (
              events.map((event) => {
                const imageUrl = getFullImageUrl(event.bannerUrl);
                return (
                  <div
                    key={event.id}
                    className="bg-[#FFFDE7] border border-yellow-400 rounded-xl shadow-lg overflow-hidden flex flex-col hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => navigate(`/eventos/${event.id}`)}
                  >
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={event.title}
                        className="w-full h-64 object-cover"
                      />
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-yellow-700 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-800 mb-1">
                        <span className="font-semibold">Ubicación:</span>{" "}
                        {event.location}
                      </p>
                      <p className="text-gray-800 mb-1">
                        <span className="font-semibold">Fecha:</span> {event.date}
                      </p>
                      <div className="mt-auto flex gap-2">
                        <button
                          className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition-colors font-bold"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (event.id !== undefined) {
                              handleDeleteEvent(event.id);
                            }
                          }}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>

      {/* Columna derecha */}
      <div className="w-[420px] min-h-screen bg-black flex flex-col items-center px-6 py-8 overflow-y-auto">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
          Eventos Anteriores
        </h2>
        <form
          onSubmit={handlePastEventSubmit}
          className="bg-white rounded-xl shadow-lg p-6 mb-8 w-full flex flex-col gap-3"
        >
          <label
            htmlFor="past-title"
            className="block mb-1 text-black font-semibold"
          >
            Título del evento
          </label>
          <input
            id="past-title"
            type="text"
            placeholder="Título del evento"
            value={pastTitle}
            onChange={(e) => setPastTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
            required
          />

          <label
            htmlFor="past-desc"
            className="block mb-1 text-black font-semibold"
          >
            Descripción
          </label>
          <textarea
            id="past-desc"
            placeholder="Descripción"
            value={pastDesc}
            onChange={(e) => setPastDesc(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
          />

          <label
            htmlFor="past-image-upload"
            className="block mb-1 text-black font-semibold"
          >
            Subir imagen
          </label>
          <input
            id="past-image-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setPastImage(e.target.files?.[0] || null)}
            className="w-full"
            ref={fileInputRef}
            required
          />

          <button
            type="submit"
            className="bg-yellow-400 text-black px-4 py-2 rounded font-bold hover:bg-yellow-300 transition-colors"
          >
            Subir Evento Anterior
          </button>
        </form>
        <div className="flex flex-col gap-6 w-full">
          {pastEvents.map((ev, idx) => (
            <div key={idx} className="bg-[#BFD7ED] rounded-lg p-3 shadow">
              {ev.image && (
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
              )}
              <h4 className="text-lg font-bold text-black">{ev.title}</h4>
              <p className="text-gray-800">{ev.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
