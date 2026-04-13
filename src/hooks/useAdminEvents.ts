import { useCallback, useEffect, useState } from "react";
import {
  createEvent,
  deleteEvent,
  getEventById,
  listEvents,
  updateEvent,
} from "../services/event/eventService";
import type { Event, NewEvent } from "../types/event";

type AdminEventsState = {
  events: Event[];
  loading: boolean;
  error: string | null;
  actionError: string | null;
  isSubmitting: boolean;
  createNewEvent: (input: NewEvent) => Promise<void>;
  removeEvent: (id: string) => Promise<void>;
  reloadEvents: () => Promise<void>;
};

type AdminEventState = {
  event: Event | null;
  loading: boolean;
  error: string | null;
  actionError: string | null;
  isSubmitting: boolean;
  saveEvent: (input: NewEvent) => Promise<void>;
  removeEvent: () => Promise<void>;
};

export function useAdminEvents(): AdminEventsState {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const reloadEvents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedEvents = await listEvents();
      setEvents(fetchedEvents);
    } catch (err) {
      setError(err instanceof Error ? err.message : "En feil oppstod");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reloadEvents();
  }, [reloadEvents]);

  const createNewEvent = useCallback(async (input: NewEvent) => {
    setIsSubmitting(true);
    setActionError(null);
    try {
      const createdEvent = await createEvent(input);
      setEvents((prev) => [createdEvent, ...prev]);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "En feil oppstod");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const removeEventById = useCallback(async (id: string) => {
    setIsSubmitting(true);
    setActionError(null);
    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((event) => event.eventId !== id));
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "En feil oppstod");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return {
    events,
    loading,
    error,
    actionError,
    isSubmitting,
    createNewEvent,
    removeEvent: removeEventById,
    reloadEvents,
  };
}

export function useAdminEvent(id: string | undefined): AdminEventState {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) {
        setError("Manglende arrangement-ID");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const fetchedEvent = await getEventById(id);
        setEvent(fetchedEvent);
      } catch (err) {
        setError(err instanceof Error ? err.message : "En feil oppstod");
      } finally {
        setLoading(false);
      }
    };

    void fetchEvent();
  }, [id]);

  const saveEvent = useCallback(
    async (input: NewEvent) => {
      if (!id) {
        throw new Error("Manglende arrangement-ID");
      }

      setIsSubmitting(true);
      setActionError(null);

      try {
        const updated = await updateEvent(id, input);
        setEvent(updated);
      } catch (err) {
        setActionError(err instanceof Error ? err.message : "En feil oppstod");
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [id]
  );

  const removeEventById = useCallback(async () => {
    if (!id) {
      throw new Error("Manglende arrangement-ID");
    }

    setIsSubmitting(true);
    setActionError(null);

    try {
      await deleteEvent(id);
      setEvent(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "En feil oppstod");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, [id]);

  return {
    event,
    loading,
    error,
    actionError,
    isSubmitting,
    saveEvent,
    removeEvent: removeEventById,
  };
}
