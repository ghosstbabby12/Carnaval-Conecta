// src/api/events.ts

import { API_URL } from "../services/api";
import type { EventData } from "../services/types/EventData";

export async function getEvents(): Promise<EventData[]> {
  const response = await fetch(`${API_URL}/events`);
  if (!response.ok) {
    throw new Error("Error al obtener los eventos");
  }
  return response.json();
}

export async function createEvent(event: EventData): Promise<number> {
  const formData = new FormData();
  formData.append("title", event.title);
  formData.append("description", event.description);
  formData.append("location", event.location);
  formData.append("date", event.date);
  if (event.media) {
    formData.append("media", event.media);
  }

  const response = await fetch(`${API_URL}/events`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Error al crear el evento");
  }

  const data = await response.json();
  return data.id;
}
