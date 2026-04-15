import { useEffect, useState } from "react";
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
        const response = await fetch("/events");
        if (!response.ok) {
          throw new Error(`HTTP-feil! Status: ${response.status}`);
        }
        const data: Event[] = await response.json();
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
      setLoading(true);
      setError(null);
      setEvent(null);
      if (!id) {
        setError("Manglende arrangement-ID");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`/events/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Arrangementet ble ikke funnet");
          }
          throw new Error(`HTTP-feil! Status: ${response.status}`);
        }
        const data: Event = await response.json();
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
