import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAdminEvent } from "../hooks/useAdminEvents";
import type { Event } from "../types/event";
import type { NewEvent } from "../types/event";
import {
  formatDateTime,
  toDateTimeLocalValue,
  validateEventDateRange,
} from "../utils/dates";

const EMPTY_FORM_STATE: NewEvent = {
  title: "",
  description: "",
  startTime: "",
  endTime: "",
  location: "",
  maxAttendees: null,
  isPublished: false,
};

const buildFormStateFromEvent = (event: Event): NewEvent => ({
  title: event.title,
  description: event.description ?? "",
  startTime: toDateTimeLocalValue(event.startTime),
  endTime: toDateTimeLocalValue(event.endTime),
  location: event.location ?? "",
  maxAttendees: event.maxAttendees ?? null,
  isPublished: event.isPublished,
});

export default function AdminEventDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {
    event,
    loading,
    error,
    actionError,
    isSubmitting,
    saveEvent,
    removeEvent,
  } = useAdminEvent(id);
  const [draftFormState, setDraftFormState] = useState<NewEvent | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const eventFormState = event
    ? buildFormStateFromEvent(event)
    : EMPTY_FORM_STATE;
  const formState = draftFormState ?? eventFormState;

  const handleSubmit = async (eventForm: FormEvent<HTMLFormElement>) => {
    eventForm.preventDefault();

    const title = formState.title.trim();
    if (!title) {
      setFormError("Tittel kan ikke være tom.");
      return;
    }

    const dateValidationError = validateEventDateRange(
      formState.startTime,
      formState.endTime || null,
    );

    if (dateValidationError) {
      setFormError(dateValidationError);
      return;
    }

    setFormError(null);

    try {
      await saveEvent({
        ...formState,
        title,
        description: formState.description?.trim() || null,
        location: formState.location?.trim() || null,
        startTime: formState.startTime,
        endTime: formState.endTime || null,
      });
      setDraftFormState(null);
    } catch {
      // Error state is already set by the hook.
    }
  };

  const handleDelete = async () => {
    const shouldDelete = window.confirm(
      "Er du sikker på at du vil slette arrangementet?",
    );

    if (!shouldDelete) {
      return;
    }

    try {
      await removeEvent();
      navigate("/admin/events");
    } catch {
      // Error state is already set by the hook.
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
        <p className="mb-4 text-sm text-red-600">{error ?? "Ukjent feil"}</p>
        <Link to="/admin/events" className="text-sm font-semibold underline">
          Tilbake til admin
        </Link>
      </div>
    );
  }

  const updateFormState = (updater: (prev: NewEvent) => NewEvent) => {
    setDraftFormState((prev) =>
      updater(prev ?? buildFormStateFromEvent(event)),
    );
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin: {event.title}</h1>
        <Link to="/admin/events" className="text-sm font-semibold underline">
          Tilbake
        </Link>
      </div>

      <form
        className="mb-8 grid gap-3 rounded border border-slate-200 p-4 text-sm"
        onSubmit={(eventForm) => void handleSubmit(eventForm)}
      >
        <input
          type="text"
          required
          value={formState.title}
          onChange={(eventInput) =>
            updateFormState((prev) => ({
              ...prev,
              title: eventInput.target.value,
            }))
          }
          className="rounded border border-slate-300 px-3 py-2"
        />
        <textarea
          value={formState.description ?? ""}
          onChange={(eventInput) =>
            updateFormState((prev) => ({
              ...prev,
              description: eventInput.target.value,
            }))
          }
          className="rounded border border-slate-300 px-3 py-2"
        />
        <div className="grid gap-3 md:grid-cols-2">
          <input
            type="datetime-local"
            required
            value={formState.startTime ?? ""}
            onChange={(eventInput) =>
              updateFormState((prev) => ({
                ...prev,
                startTime: eventInput.target.value,
              }))
            }
            className="rounded border border-slate-300 px-3 py-2"
          />
          <input
            type="datetime-local"
            value={formState.endTime ?? ""}
            onChange={(eventInput) =>
              updateFormState((prev) => ({
                ...prev,
                endTime: eventInput.target.value,
              }))
            }
            className="rounded border border-slate-300 px-3 py-2"
          />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <input
            type="text"
            value={formState.location ?? ""}
            onChange={(eventInput) =>
              updateFormState((prev) => ({
                ...prev,
                location: eventInput.target.value,
              }))
            }
            className="rounded border border-slate-300 px-3 py-2"
          />
          <input
            type="number"
            min={1}
            value={formState.maxAttendees ?? ""}
            onChange={(eventInput) =>
              updateFormState((prev) => ({
                ...prev,
                maxAttendees: eventInput.target.value
                  ? Number(eventInput.target.value)
                  : null,
              }))
            }
            className="rounded border border-slate-300 px-3 py-2"
          />
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formState.isPublished}
            onChange={(eventInput) =>
              updateFormState((prev) => ({
                ...prev,
                isPublished: eventInput.target.checked,
              }))
            }
          />
          Publisert
        </label>

        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded bg-slate-900 px-4 py-2 font-semibold text-white disabled:opacity-50"
          >
            {isSubmitting ? "Lagrer..." : "Lagre endringer"}
          </button>
          <button
            type="button"
            onClick={() => void handleDelete()}
            disabled={isSubmitting}
            className="rounded border border-red-300 px-4 py-2 font-semibold text-red-700 disabled:opacity-50"
          >
            Slett arrangement
          </button>
        </div>

        {formError && <p className="text-red-600">Feil: {formError}</p>}
        {actionError && <p className="text-red-600">Feil: {actionError}</p>}
      </form>

      <div className="grid gap-3 rounded border border-slate-200 p-4 text-sm">
        <p>
          <span className="font-semibold">Event ID:</span> {event.eventId}
        </p>
        <p>
          <span className="font-semibold">Start:</span>{" "}
          {formatDateTime(event.startTime)}
        </p>
        <p>
          <span className="font-semibold">Slutt:</span>{" "}
          {formatDateTime(event.endTime)}
        </p>
      </div>
    </div>
  );
}
