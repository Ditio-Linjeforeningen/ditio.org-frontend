import { useParams } from "react-router-dom";
import { useEvent } from "../hooks/useEvents";
import { formatDate, formatDateTime } from "../utils/dates";

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const { event, loading, error } = useEvent(id);

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
