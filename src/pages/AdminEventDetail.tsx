import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAdminEvent } from "../hooks/useAdminEvents";
import { useAdminRegistrations } from "../hooks/useAdminRegistrations";
import type { Event } from "../types/event";
import type { NewEvent } from "../types/event";
import type { RegistrationWithUser } from "../hooks/useAdminRegistrations";
import { unregisterFromEvent } from "../services/registrationService";
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
  const {
    registrations,
    loading: registrationsLoading,
    error: registrationsError,
  } = useAdminRegistrations(id);
  const [draftFormState, setDraftFormState] = useState<NewEvent | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [selectedRegistration, setSelectedRegistration] = useState<RegistrationWithUser | null>(null);
  const [confirmDeleteReg, setConfirmDeleteReg] = useState<boolean>(false);
  const [deletingRegistration, setDeletingRegistration] = useState<boolean>(false);
  const [deleteRegistrationError, setDeleteRegistrationError] = useState<string | null>(null);
  const [deletedRegistrationIds, setDeletedRegistrationIds] = useState<Set<string>>(new Set());
  const eventFormState = event
    ? buildFormStateFromEvent(event)
    : EMPTY_FORM_STATE;
  const formState = draftFormState ?? eventFormState;
  const visibleRegistrations = registrations.filter(
    (registration) => !deletedRegistrationIds.has(registration.eventRegId),
  );

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
      // Hooken setter feilmelding selv.
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
      // Hooken setter feilmelding selv.
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

      <div className="mt-8 rounded border border-slate-200 p-4 text-sm">
        <h2 className="mb-3 text-lg font-semibold">
          Påmeldinger ({visibleRegistrations.length})
        </h2>

        {registrationsLoading && <p>Laster påmeldinger...</p>}
        {registrationsError && (
          <p className="text-red-600">Feil: {registrationsError}</p>
        )}

        {!registrationsLoading && !registrationsError && visibleRegistrations.length === 0 && (
          <p>Ingen påmeldinger enda.</p>
        )}

        {!registrationsLoading && !registrationsError && visibleRegistrations.length > 0 && (
          <div className="overflow-x-auto rounded border border-slate-200">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-3 py-2">ID</th>
                  <th className="px-3 py-2">Navn</th>
                  <th className="px-3 py-2">E-post</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Deadline</th>
                </tr>
              </thead>
              <tbody>
                {visibleRegistrations.map((registration) => (
                  <tr
                    key={registration.eventRegId}
                    className="border-t border-slate-200 cursor-pointer hover:bg-slate-50"
                    onClick={() => setSelectedRegistration(registration)}
                  >
                    <td className="px-3 py-2 font-mono text-xs">
                      {registration.user_id}
                    </td>
                    <td className="px-3 py-2">
                      {registration.user?.navn ?? "-"}
                    </td>
                    <td className="px-3 py-2">{registration.user?.email ?? "-"}</td>
                    <td className="px-3 py-2">{registration.att_status}</td>
                    <td className="px-3 py-2">
                      {formatDateTime(registration.deadline)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      {selectedRegistration && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedRegistration(null);
            }
          }}
        >
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-bold">Påmeldings-detaljer</h2>

            <div className="mb-4 space-y-3 text-sm">
              <p>
                <span className="font-semibold">Bruker-ID:</span>
                <br />
                <code className="break-all text-xs text-slate-600">
                  {selectedRegistration.user_id}
                </code>
              </p>
              <p>
                <span className="font-semibold">Navn:</span>
                <br />
                {selectedRegistration.user?.navn ?? "-"}
              </p>
              <p>
                <span className="font-semibold">E-post:</span>
                <br />
                {selectedRegistration.user?.email ?? "-"}
              </p>
              <p>
                <span className="font-semibold">Status:</span>
                <br />
                {selectedRegistration.att_status}
              </p>
              <p>
                <span className="font-semibold">Deadline:</span>
                <br />
                {formatDateTime(selectedRegistration.deadline)}
              </p>
              <p>
                <span className="font-semibold">Påmeldings-ID:</span>
                <br />
                <code className="break-all text-xs text-slate-600">
                  {selectedRegistration.eventRegId}
                </code>
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedRegistration(null)}
                className="rounded border border-slate-300 px-4 py-2 font-semibold text-slate-900 hover:bg-slate-50"
              >
                Lukk
              </button>
              <button
                onClick={() => setConfirmDeleteReg(true)}
                className="rounded border border-red-300 px-4 py-2 font-semibold text-red-700 hover:bg-red-50"
              >
                Slett
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDeleteReg && selectedRegistration && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setConfirmDeleteReg(false);
            }
          }}
        >
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-bold">Bekreft sletting</h2>
            <p className="mb-6 text-sm text-slate-600">
              Er du sikker på at du vil slette denne påmeldingen? Dette kan ikke angres.
            </p>
            {deleteRegistrationError && (
              <p className="mb-4 text-sm text-red-600">{deleteRegistrationError}</p>
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmDeleteReg(false)}
                disabled={deletingRegistration}
                className="rounded border border-slate-300 px-4 py-2 font-semibold text-slate-900 hover:bg-slate-50"
              >
                Avbryt
              </button>
              <button
                onClick={async () => {
                  setDeleteRegistrationError(null);
                  setDeletingRegistration(true);

                  try {
                    await unregisterFromEvent(selectedRegistration.eventRegId);
                    setDeletedRegistrationIds((prev) => {
                      const next = new Set(prev);
                      next.add(selectedRegistration.eventRegId);
                      return next;
                    });
                    setSelectedRegistration(null);
                    setConfirmDeleteReg(false);
                  } catch (err) {
                    setDeleteRegistrationError(
                      err instanceof Error ? err.message : "Kunne ikke slette påmelding.",
                    );
                  } finally {
                    setDeletingRegistration(false);
                  }
                }}
                disabled={deletingRegistration}
                className="rounded bg-red-700 px-4 py-2 font-semibold text-white hover:bg-red-800 disabled:opacity-50"
              >
                {deletingRegistration ? "Sletter..." : "Slett"}
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
