import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";

type EventFormProps = {
  initialValues?: {
    title?: string;
    location?: string;
    description?: string;
    date?: string;
  };
  onSubmit: (formData: FormData) => Promise<any>;
};

const EventForm: React.FC<EventFormProps> = ({ initialValues, onSubmit }) => {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [location, setLocation] = useState(initialValues?.location || "");
  const [description, setDescription] = useState(initialValues?.description || "");
  const [date, setDate] = useState(initialValues?.date || "");
  const [media, setMedia] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setTitle(initialValues?.title || "");
    setLocation(initialValues?.location || "");
    setDescription(initialValues?.description || "");
    setDate(initialValues?.date || "");
    setMedia(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [initialValues]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMedia(e.target.files[0]);
    } else {
      setMedia(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("date", date);
    if (media) formData.append("media", media);

    await onSubmit(formData);

    setMedia(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md flex flex-col gap-6"
    >
      <label htmlFor="title" className="font-semibold text-gray-700">
        Título
      </label>
      <input
        id="title"
        name="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        placeholder="Nombre del evento"
        className="border border-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800 placeholder-gray-400"
      />

      <label htmlFor="location" className="font-semibold text-gray-700">
        Ubicación
      </label>
      <input
        id="location"
        name="location"
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
        placeholder="Lugar del evento"
        className="border border-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800 placeholder-gray-400"
      />

      <label htmlFor="description" className="font-semibold text-gray-700">
        Descripción
      </label>
      <textarea
        id="description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        rows={5}
        placeholder="Detalles del evento"
        className="border border-gray-400 rounded-md p-3 resize-y focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800 placeholder-gray-400"
      />

      <label htmlFor="date" className="font-semibold text-gray-700">
        Fecha
      </label>
      <input
        id="date"
        name="date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="border border-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800 placeholder-gray-400"
      />

      <label htmlFor="media-upload" className="font-semibold text-gray-700">
        Subir imagen o video
      </label>
      <input
        id="media-upload"
        name="media"
        type="file"
        onChange={handleFileChange}
        accept="image/*,video/*"
        ref={fileInputRef}
        className="border border-gray-400 rounded-md p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500"
        required={!initialValues}
      />

      <button
        type="submit"
        className="bg-gray-400 hover:bg-gray-800 text-white font-semibold py-3 rounded-md transition duration-200"
      >
        Guardar
      </button>
    </form>
  );
};

export default EventForm;
