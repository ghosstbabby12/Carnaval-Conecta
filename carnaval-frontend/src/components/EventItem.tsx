import React from 'react';

interface Event {
  id: number;
  title: string;
  location: string;
  date: string;
  description: string;
  
}

interface Props {
  event: Event;
  onDelete: (id: number) => void;
}

const EventItem: React.FC<Props> = ({ event, onDelete }) => (
  <div className="border p-3 mb-2 rounded shadow">
    <h3 className="text-xl font-semibold">{event.title}</h3>
    <p>📍 {event.location}</p>
    <p>📅 {event.date}</p>
    <button onClick={() => onDelete(event.id)} className="text-red-600 mt-2">
      Eliminar
    </button>
  </div>
);

export default EventItem;
