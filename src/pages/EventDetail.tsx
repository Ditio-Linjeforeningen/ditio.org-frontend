import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Event } from "../types/event";

const formatDate = (value?: string | null) => {
  if (!value) {
    return "Ikke satt";
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toLocaleDateString("nb-NO");
};

const formatDateTime = (value?: string | null) => {
  if (!value) {
    return "Ikke satt";
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toLocaleString("nb-NO");
};

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError("Missing event id");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`/events/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Event = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl py-8">
        <p className="text-sm">Laster arrangement...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="mx-auto max-w-5xl py-8">
        <h1 className="mb-6 text-2xl font-bold">Arrangement ikke funnet</h1>
        <p>Det arrangementet du leter etter finnes ikke.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl py-8">
      <h1 className="mb-4 text-3xl font-bold">{event.title}</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p>Dato: {formatDate(event.startTime)}</p>
          <p>Sted: {event.location ?? "Ikke satt"}</p>
          <p>Start: {formatDateTime(event.startTime)}</p>
          <p>Slutt: {formatDateTime(event.endTime)}</p>
          <p>
            Maks antall:{" "}
            {typeof event.maxAttendees === "number"
              ? event.maxAttendees
              : "Ikke satt"}
          </p>
          <p>Publisert: {event.isPublished ? "Ja" : "Nei"}</p>
        </div>
        <div>
          <p>Beskrivelse:</p>
          <p>{event.description}</p>
        </div>
      </div>
    </div>
  );
}
