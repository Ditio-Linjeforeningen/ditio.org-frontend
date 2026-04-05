import { useEffect, useState } from "react";
import { EventCard } from "../components/EventCard";
import type { Event } from "../types/event";

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/events");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Event[] = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Arrangementer</h1>

      {loading && <p className="text-s">Laster...</p>}
      {error && <p className="text-sm text-red-600">Feil: {error}</p>}
      {!loading && !error && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.eventId} event={event} />
          ))}
          {events.length === 0 && (
            <p className="text-s">Ingen arrangementer enda.</p>
          )}
        </div>
      )}
    </div>
  );
}
