import type { Event, EventFormData } from '../types/event';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...options,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(text || `HTTP ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const eventsApi = {
  getAll: () => request<Event[]>('/events'),

  getById: (id: string) => request<Event>(`/events/${id}`),

  create: (data: EventFormData) =>
    request<Event>('/events', { method: 'POST', body: JSON.stringify(data) }),

  update: (id: string, data: EventFormData) =>
    request<Event>(`/events/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  delete: (id: string) =>
    request<Event>(`/events/${id}`, { method: 'DELETE' }),
};
