import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEvent } from "../hooks/useEvents";
import { updateEvent, deleteEvent } from "../api/events";
import type { EventInput } from "../api/events";
import EventForm from "../components/EventForm";

export default function AdminEventDetail() {
  const { id } = useParams<{ id: string }>();
  const { event, loading, error } = useEvent(id);
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleUpdate = async (data: EventInput) => {
    if (!id) return;
    await updateEvent(id, data);
    navigate(0);
  };

  const handleDelete = async () => {
    if (!event) return;
    if (!confirm(`Er du sikker på at du vil slette "${event.title}"?`)) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await deleteEvent(event.eventId);
      navigate("/admin/events");
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "Kunne ikke slette arrangement"
      );
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <p className="text-sm">Laster arrangement...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-4 text-2xl font-bold">Arrangement ikke funnet</h1>
        <Link to="/admin/events" className="text-sm font-semibold underline">
          Tilbake til admin
        </Link>
      </div>
    );
  }

  const formatDateTime = (value?: string | null) => {
    if (!value) return "Ikke satt";
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime())
      ? value
      : parsed.toLocaleString("nb-NO");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin: {event.title}</h1>
        <Link to="/admin/events" className="text-sm font-semibold underline">
          Tilbake
        </Link>
      </div>

      {deleteError && (
        <p className="mb-4 rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {deleteError}
        </p>
      )}

      {editing ? (
        <div className="rounded border border-slate-200 p-6">
          <h2 className="mb-4 text-lg font-semibold">Rediger arrangement</h2>
          <EventForm
            initialValues={{
              title: event.title,
              description: event.description,
              startTime: event.startTime,
              endTime: event.endTime,
              location: event.location,
              maxAttendees: event.maxAttendees,
              isPublished: event.isPublished,
            }}
            onSubmit={handleUpdate}
            submitLabel="Lagre endringer"
            onCancel={() => setEditing(false)}
          />
        </div>
      ) : (
        <>
          <div className="mb-6 grid gap-3 rounded border border-slate-200 p-4 text-sm">
            <p>
              <span className="font-semibold">Tittel:</span> {event.title}
            </p>
            <p>
              <span className="font-semibold">Beskrivelse:</span>{" "}
              {event.description ?? "Ikke satt"}
            </p>
            <p>
              <span className="font-semibold">Start:</span>{" "}
              {formatDateTime(event.startTime)}
            </p>
            <p>
              <span className="font-semibold">Slutt:</span>{" "}
              {formatDateTime(event.endTime)}
            </p>
            <p>
              <span className="font-semibold">Sted:</span>{" "}
              {event.location ?? "Ikke satt"}
            </p>
            <p>
              <span className="font-semibold">Maks antall:</span>{" "}
              {event.maxAttendees != null ? event.maxAttendees : "Ikke satt"}
            </p>
            <p>
              <span className="font-semibold">Publisert:</span>{" "}
              {event.isPublished ? "Ja" : "Nei"}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setEditing(true)}
              className="rounded border border-ditio-navy bg-ditio-navy px-4 py-2 text-sm font-semibold text-white hover:bg-black transition-colors"
            >
              Rediger
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="rounded border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              {deleting ? "Sletter..." : "Slett arrangement"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
