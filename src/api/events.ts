import type { Event } from "../types/event";

export type EventInput = Omit<Event, "eventId">;

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`HTTP-feil! Status: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function createEvent(data: EventInput): Promise<Event> {
  const response = await fetch("/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Event>(response);
}

export async function updateEvent(
  id: string,
  data: EventInput
): Promise<Event> {
  const response = await fetch(`/events/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Event>(response);
}

export async function deleteEvent(id: string): Promise<void> {
  const response = await fetch(`/events/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`HTTP-feil! Status: ${response.status}`);
  }
}
