import { useEffect, useState } from "react";
import { getEventById, listEvents } from "../services/eventService";
import type { Event } from "../types/event";

type FetchListState = {
  events: Event[];
  loading: boolean;
  error: string | null;
};

type FetchDetailState = {
  event: Event | null;
  loading: boolean;
  error: string | null;
};

export function useEvents(): FetchListState {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listEvents();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "En feil oppstod");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { events, loading, error };
}

export function useEvent(id: string | undefined): FetchDetailState {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError("Manglende arrangement-ID");
        setLoading(false);
        return;
      }
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "En feil oppstod");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { event, loading, error };
}
