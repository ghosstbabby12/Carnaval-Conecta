import { useState, useRef, ChangeEvent, FormEvent } from 'react';

type EventData = {
  title: string;
  bannerUrl: string;
  info: string;
  media: File | null;
};

type EventFormProps = {
  onSubmit: (event: EventData) => void;
};

export default function EventForm({ onSubmit }: EventFormProps) {
  const [title, setTitle] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [info, setInfo] = useState('');
  const [media, setMedia] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMedia(e.target.files[0]);
    } else {
      setMedia(null);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ title, bannerUrl, info, media });

    setTitle('');
    setBannerUrl('');
    setInfo('');
    setMedia(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-xl p-6 max-w-lg w-full mx-auto space-y-4 border border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Crear Evento</h2>

      <label htmlFor="event-title" className="block mb-1 text-gray-700 font-medium">
        Nombre del evento
      </label>
      <input
        id="event-title"
        type="text"
        placeholder="Ej: Carnaval 2025"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />

      <label htmlFor="banner-url" className="block mb-1 text-gray-700 font-medium">
        URL del banner
      </label>
      <input
        id="banner-url"
        type="text"
        placeholder="https://ejemplo.com/banner.jpg"
        value={bannerUrl}
        onChange={(e) => setBannerUrl(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />

      <label htmlFor="event-info" className="block mb-1 text-gray-700 font-medium">
        Información del evento
      </label>
      <textarea
        id="event-info"
        placeholder="Detalles del evento"
        value={info}
        onChange={(e) => setInfo(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        rows={4}
        required
      />

      <div>
        <label htmlFor="media-upload" className="block mb-1 text-gray-700 font-medium">
          Subir imagen o video
        </label>
        <input
          id="media-upload"
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-gray-50 hover:file:bg-gray-100"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
      >
        Guardar Evento
      </button>
    </form>
  );
}
