import type { Event, NewEvent } from "../types/event";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";
const EVENTS_BASE_PATH = `${API_BASE}/events`;

const parseErrorMessage = async (response: Response): Promise<string> => {
  try {
    const data = (await response.json()) as { message?: string };
    if (typeof data.message === "string" && data.message.length > 0) {
      return data.message;
    }
  } catch {
    // Ignore body parsing errors and use fallback message.
  }

  return `HTTP-feil! Status: ${response.status}`;
};

const ensureOk = async (response: Response): Promise<void> => {
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }
};

export async function listEvents(): Promise<Event[]> {
  const response = await fetch(EVENTS_BASE_PATH);
  await ensureOk(response);
  return (await response.json()) as Event[];
}

export async function getEventById(id: string): Promise<Event> {
  const response = await fetch(`${EVENTS_BASE_PATH}/${id}`);
  await ensureOk(response);
  return (await response.json()) as Event;
}

export async function createEvent(input: NewEvent): Promise<Event> {
  const response = await fetch(`${EVENTS_BASE_PATH}/newEvent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  await ensureOk(response);
  return (await response.json()) as Event;
}

export async function updateEvent(id: string, input: NewEvent): Promise<Event> {
  const response = await fetch(`${EVENTS_BASE_PATH}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  await ensureOk(response);
  return (await response.json()) as Event;
}

export async function deleteEvent(id: string): Promise<void> {
  const response = await fetch(`${EVENTS_BASE_PATH}/${id}`, {
    method: "DELETE",
  });

  await ensureOk(response);
}
