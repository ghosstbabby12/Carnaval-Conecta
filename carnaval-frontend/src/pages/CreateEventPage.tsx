import EventForm from "../components/EventForm";

const CreateEventPage = () => {
  const handleCreateEvent = async (formData: FormData) => {
    const response = await fetch("http://localhost:9090/api/events", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error al crear el evento");
    }

    const createdEvent = await response.json(); // Aquí obtienes el id
    return createdEvent;
  };

  return <EventForm onSubmit={handleCreateEvent} />;
};

export default CreateEventPage;
