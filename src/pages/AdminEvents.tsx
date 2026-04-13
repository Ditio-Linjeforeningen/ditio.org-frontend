import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAdminEvents } from "../hooks/useAdminEvents";
import type { NewEvent } from "../types/event";

export default function AdminEvents() {
  const { events, loading, error, actionError, isSubmitting, createNewEvent, removeEvent } =
    useAdminEvents();

  const [formState, setFormState] = useState<NewEvent>({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    location: "",
    maxAttendees: null,
    isPublished: false,
  });

  const handleCreateEvent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await createNewEvent({
        ...formState,
        title: formState.title.trim(),
        description: formState.description?.trim() || null,
        location: formState.location?.trim() || null,
        startTime: formState.startTime,
        endTime: formState.endTime || null,
      });

      setFormState({
        title: "",
        description: "",
        startTime: "",
        endTime: "",
        location: "",
        maxAttendees: null,
        isPublished: false,
      });
    } catch {
      // Error state is already set by the hook.
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    const shouldDelete = window.confirm(
      "Er du sikker på at du vil slette arrangementet?"
    );

    if (!shouldDelete) {
      return;
    }

    try {
      await removeEvent(eventId);
    } catch {
      // Error state is already set by the hook.
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold">Admin: Arrangementer</h1>
      <p className="mb-8 text-sm text-slate-600">
        Opprett, rediger og slett arrangementer direkte mot backend.
      </p>

      <form
        className="mb-8 grid gap-3 rounded border border-slate-200 p-4"
        onSubmit={(event) => void handleCreateEvent(event)}
      >
        <h2 className="text-lg font-semibold">Nytt arrangement</h2>
        <input
          type="text"
          required
          placeholder="Tittel"
          value={formState.title}
          onChange={(event) =>
            setFormState((prev) => ({ ...prev, title: event.target.value }))
          }
          className="rounded border border-slate-300 px-3 py-2 text-sm"
        />
        <textarea
          placeholder="Beskrivelse"
          value={formState.description ?? ""}
          onChange={(event) =>
            setFormState((prev) => ({ ...prev, description: event.target.value }))
          }
          className="rounded border border-slate-300 px-3 py-2 text-sm"
        />
        <div className="grid gap-3 md:grid-cols-2">
          <input
            type="datetime-local"
            required
            value={formState.startTime ?? ""}
            onChange={(event) =>
              setFormState((prev) => ({ ...prev, startTime: event.target.value }))
            }
            className="rounded border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            type="datetime-local"
            value={formState.endTime ?? ""}
            onChange={(event) =>
              setFormState((prev) => ({ ...prev, endTime: event.target.value }))
            }
            className="rounded border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <input
            type="text"
            placeholder="Sted"
            value={formState.location ?? ""}
            onChange={(event) =>
              setFormState((prev) => ({ ...prev, location: event.target.value }))
            }
            className="rounded border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            type="number"
            min={1}
            placeholder="Maks antall"
            value={formState.maxAttendees ?? ""}
            onChange={(event) =>
              setFormState((prev) => ({
                ...prev,
                maxAttendees: event.target.value
                  ? Number(event.target.value)
                  : null,
              }))
            }
            className="rounded border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={formState.isPublished}
            onChange={(event) =>
              setFormState((prev) => ({
                ...prev,
                isPublished: event.target.checked,
              }))
            }
          />
          Publisert
        </label>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-fit rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          {isSubmitting ? "Lagrer..." : "Opprett arrangement"}
        </button>
        {actionError && <p className="text-sm text-red-600">Feil: {actionError}</p>}
      </form>

      {loading && <p className="mb-4 text-sm">Laster arrangementer...</p>}
      {error && <p className="mb-4 text-sm text-red-600">Feil: {error}</p>}

      <div className="overflow-x-auto rounded border border-slate-200">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-2">Tittel</th>
              <th className="px-3 py-2">Start</th>
              <th className="px-3 py-2">Sted</th>
              <th className="px-3 py-2">Publisert</th>
              <th className="px-3 py-2">Handlinger</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.eventId} className="border-t border-slate-200">
                <td className="px-3 py-2 font-medium">{event.title}</td>
                <td className="px-3 py-2">{event.startTime ?? "Ikke satt"}</td>
                <td className="px-3 py-2">{event.location ?? "Ikke satt"}</td>
                <td className="px-3 py-2">{event.isPublished ? "Ja" : "Nei"}</td>
                <td className="px-3 py-2 flex gap-2">
                  <Link
                    to={`/admin/events/${event.eventId}`}
                    className="rounded border border-slate-300 px-2 py-1"
                  >
                    Rediger
                  </Link>
                  <button
                    type="button"
                    onClick={() => void handleDeleteEvent(event.eventId)}
                    className="rounded border border-red-300 px-2 py-1 text-red-700"
                    disabled={isSubmitting}
                  >
                    Slett
                  </button>
                </td>
              </tr>
            ))}
            {!loading && events.length === 0 && (
              <tr className="border-t border-slate-200">
                <td className="px-3 py-2 text-slate-500" colSpan={5}>
                  Ingen arrangementer enda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
