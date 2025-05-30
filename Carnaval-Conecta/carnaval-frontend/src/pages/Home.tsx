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

  const getFullImageUrl = (bannerUrl: string | undefined) => {
    if (!bannerUrl) return undefined;
    if (bannerUrl.startsWith("http://") || bannerUrl.startsWith("https://")) {
      return bannerUrl;
    }
    return `http://localhost:9090${bannerUrl}`;
  };

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
    <div className="min-h-screen w-full bg-[#E0E7EF] flex justify-center items-start py-10 px-4">
      <div className="flex flex-col lg:flex-row gap-10 max-w-7xl w-full">
        {/* Columna izquierda */}
        <div className="flex-1 flex flex-col items-center bg-white rounded-2xl shadow-lg p-6">
          <header className="w-full text-center mb-10">
            <img
              src={carnavalLogo}
              alt="Carnaval de Negros y Blancos"
              className="h-24 mx-auto mb-4"
            />
            <h1 className="text-4xl font-extrabold text-black">
              Carnaval de Negros y Blancos de Pasto
            </h1>
            <p className="text-lg text-gray-700 mt-4">
              ¡Vive la experiencia del carnaval más grande del sur de Colombia! Descubre, crea y participa en los eventos más coloridos y vibrantes de nuestra cultura.
            </p>
          </header>

          <section className="mb-12 w-full max-w-2xl">
            <EventForm onSubmit={handleCreateEvent} />
          </section>

          <section className="w-full">
            <h2 className="text-2xl font-bold text-black mb-6 text-center">
              Eventos del Carnaval
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {events.length === 0 ? (
                <p className="text-center text-gray-700 w-full">No hay eventos disponibles.</p>
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
                          className="w-full h-52 object-cover"
                        />
                      )}
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold text-yellow-700 mb-2">{event.title}</h3>
                        <p className="text-gray-800 text-sm">
                          <span className="font-semibold">Ubicación:</span> {event.location}
                        </p>
                        <p className="text-gray-800 text-sm">
                          <span className="font-semibold">Fecha:</span> {event.date}
                        </p>
                        <div className="mt-auto pt-3">
                          <button
                            className="w-full bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-600 font-semibold transition"
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
        <div className="w-full lg:w-[400px] bg-black text-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
            Eventos Anteriores
          </h2>
          <form
            onSubmit={handlePastEventSubmit}
            className="bg-white text-black rounded-xl shadow p-4 mb-6 flex flex-col gap-4"
          >
            <div>
              <label className="block font-semibold mb-1" htmlFor="past-title">
                Título del evento
              </label>
              <input
                id="past-title"
                type="text"
                value={pastTitle}
                onChange={(e) => setPastTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1" htmlFor="past-desc">
                Descripción
              </label>
              <textarea
                id="past-desc"
                value={pastDesc}
                onChange={(e) => setPastDesc(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1" htmlFor="past-image-upload">
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
            </div>

            <button
              type="submit"
              className="bg-yellow-400 text-black font-bold py-2 rounded-md hover:bg-yellow-300 transition"
            >
              Subir Evento Anterior
            </button>
          </form>

          <div className="flex flex-col gap-4">
            {pastEvents.map((ev, idx) => (
              <div key={idx} className="bg-[#BFD7ED] text-black rounded-lg p-3 shadow">
                {ev.image && (
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="w-full h-40 object-cover rounded mb-2"
                  />
                )}
                <h4 className="text-lg font-bold">{ev.title}</h4>
                <p className="text-gray-800 text-sm">{ev.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
