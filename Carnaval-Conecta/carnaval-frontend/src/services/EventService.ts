import axios, { AxiosResponse } from "axios";
import { EventData } from "../services/types/EventData";


export const createEvent = async (formData: FormData): Promise<AxiosResponse<EventData>> => {
  return await axios.post<EventData>("http://localhost:9090/api/events", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteEvent = async (id: number) => {
  return await axios.delete(`http://localhost:9090/api/events/${id}`);
};

export const getEvents = async (): Promise<AxiosResponse<EventData[]>> => {
  return await axios.get<EventData[]>("http://localhost:9090/api/events");
};

export const getEventById = async (id: number): Promise<AxiosResponse<EventData>> => {
  return await axios.get<EventData>(`http://localhost:9090/api/events/${id}`);
};
