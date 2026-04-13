import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEvents } from "../hooks/useEvents";
import { deleteEvent } from "../api/events";

export default function AdminEvents() {
  const { events, loading, error } = useEvents();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Er du sikker på at du vil slette "${title}"?`)) return;
    setDeletingId(id);
    setDeleteError(null);
    try {
      await deleteEvent(id);
      navigate(0);
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "Kunne ikke slette arrangement"
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold">Admin: Arrangementer</h1>
          <p className="text-sm text-slate-600">
            Trykk "Se detaljer" for mer info eller "Rediger" for å endre.
          </p>
        </div>
        <Link
          to="/admin/events/new"
          className="rounded border border-ditio-navy bg-ditio-navy px-4 py-2 text-sm font-semibold text-white hover:bg-black transition-colors"
        >
          + Nytt arrangement
        </Link>
      </div>

      {deleteError && (
        <p className="mb-4 rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {deleteError}
        </p>
      )}

      {loading && <p className="text-sm">Laster...</p>}
      {error && (
        <p className="text-sm text-red-600">Feil ved lasting: {error}</p>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto rounded border border-slate-200">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 py-2">Tittel</th>
                <th className="px-3 py-2">Start</th>
                <th className="px-3 py-2">Sted</th>
                <th className="px-3 py-2">Publisert</th>
                <th className="px-3 py-2">Handling</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.eventId} className="border-t border-slate-200">
                  <td className="px-3 py-2 font-medium">{event.title}</td>
                  <td className="px-3 py-2">
                    {event.startTime
                      ? new Date(event.startTime).toLocaleString("nb-NO")
                      : "Ikke satt"}
                  </td>
                  <td className="px-3 py-2">{event.location ?? "Ikke satt"}</td>
                  <td className="px-3 py-2">
                    {event.isPublished ? "Ja" : "Nei"}
                  </td>
                  <td className="flex gap-2 px-3 py-2">
                    <Link
                      to={`/admin/events/${event.eventId}`}
                      className="rounded border border-slate-300 px-2 py-1 hover:bg-slate-50"
                    >
                      Rediger
                    </Link>
                    <button
                      onClick={() => handleDelete(event.eventId, event.title)}
                      disabled={deletingId === event.eventId}
                      className="rounded border border-red-300 px-2 py-1 text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                      {deletingId === event.eventId ? "Sletter..." : "Slett"}
                    </button>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr className="border-t border-slate-200">
                  <td
                    className="px-3 py-2 text-slate-500"
                    colSpan={5}
                  >
                    Ingen arrangementer enda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
