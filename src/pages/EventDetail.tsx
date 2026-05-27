import { useParams } from "react-router-dom";
import { useEvent } from "../hooks/useEvents";
import Footer from "../components/Footer";
import { useRegistration } from "../hooks/useRegistration";
import { useAuth } from "../hooks/useAuth";
import { authService } from "../services/authService";
import { formatDate, formatDateTime } from "../utils/dates";
import { useEffect, useState } from "react";
import { listRegistrationsForEvent } from "../services/registrationService";


export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const { event, loading, error } = useEvent(id);
  const { user } = useAuth();
  const {
    registration,
    loading: registrationLoading,
    submitting,
    error: registrationError,
    register,
    unregister,
  } = useRegistration(id, user?.id, event?.endTime ?? event?.startTime);

  const [registrationCount, setRegistrationCount] = useState<number>(0);
  const [confirmAction, setConfirmAction] = useState<"register" | "unregister" | null>(null);

  useEffect(() => {
    if (!id) return;

    let isCancelled = false;

    const fetchCount = async () => {
      try {
        const regs = await listRegistrationsForEvent(id);
        if (!isCancelled) {
          setRegistrationCount(regs.length);
        }
      } catch {
        if (!isCancelled) {
          setRegistrationCount(0);
        }
      }
    };

    void fetchCount();

    return () => {
      isCancelled = true;
    };
  }, [id, registration]);

  const handleRegister = async () => {
    try {
      await register();
      // Hent oppdatert antall etter påmelding.
      if (id) {
        const regs = await listRegistrationsForEvent(id);
        setRegistrationCount(regs.length);
      }
      setConfirmAction(null);
    } catch {
      // Feilmelding vises via registrationError.
    }
  };

  const handleUnregister = async () => {
    try {
      await unregister();
      // Hent oppdatert antall etter avmelding.
      if (id) {
        const regs = await listRegistrationsForEvent(id);
        setRegistrationCount(regs.length);
      }
      setConfirmAction(null);
    } catch {
      // Feilmelding vises via registrationError.
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl py-8">
        <p className="text-sm">Laster arrangement...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">Arrangement ikke funnet</h1>
        <p>{error ?? "Det arrangementet du leter etter finnes ikke."}</p>
      </div>
    );
  }

  const imageUrl = `https://picsum.photos/seed/${event.eventId}/1200/500`;

  const isDeadlinePassed =
    event.endTime && new Date(event.endTime) < new Date();

  const spotsLeft =
    typeof event.maxAttendees === "number"
      ? event.maxAttendees - registrationCount
      : null;

  const isFull = spotsLeft !== null && spotsLeft <= 0;

  return (
    <>
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{event.title}</h1>
        </div>

        <div className="mb-6 overflow-hidden rounded border border-slate-200">
          <img
            src={imageUrl}
            alt={event.title}
            className="h-56 w-full object-cover sm:h-72"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="grid gap-6">
          <section className="grid gap-3 rounded border border-slate-200 p-4 text-sm">
            <h2 className="text-lg font-semibold">Om arrangementet</h2>
            <div className="grid gap-2 md:grid-cols-2">
              <p>
                <span className="font-semibold">Dato:</span> {formatDate(event.startTime)}
              </p>
              <p>
                <span className="font-semibold">Sted:</span> {event.location ?? "Ikke satt"}
              </p>
              <p>
                <span className="font-semibold">Start:</span> {formatDateTime(event.startTime)}
              </p>
              <p>
                <span className="font-semibold">Slutt:</span> {formatDateTime(event.endTime)}
              </p>
              <p>
                <span className="font-semibold">Maks antall:</span>{" "}
                {typeof event.maxAttendees === "number" ? event.maxAttendees : "Ikke satt"}
              </p>
              <p>
                <span className="font-semibold">Publisert:</span> {event.isPublished ? "Ja" : "Nei"}
              </p>
            </div>

            <div className="border-t border-slate-200 pt-3">
              <h3 className="mb-2 text-base font-semibold">Beskrivelse</h3>
              <p className="leading-6">
                {event.description ?? "Ingen beskrivelse tilgjengelig."}
              </p>
            </div>

            <div className="border-t border-slate-200 pt-3">
              <h3 className="mb-2 text-base font-semibold">Påmelding</h3>

              {spotsLeft !== null && (
                <p className="mb-3 text-xs font-medium text-slate-600">
                  {isFull
                    ? "Fullt"
                    : `${spotsLeft} ${spotsLeft === 1 ? "plass" : "plasser"} igjen`}
                </p>
              )}

              {!user ? (
                <div className="space-y-3">
                  <p>Logg inn med Feide for å melde deg på.</p>
                  <button
                    onClick={() => authService.startLogin()}
                    className="rounded bg-slate-900 px-4 py-2 font-semibold text-white disabled:opacity-50"
                  >
                    Logg inn og meld deg på
                  </button>
                </div>
              ) : registrationLoading ? (
                <p>Sjekker påmeldingsstatus...</p>
              ) : registration ? (
                <div className="space-y-3">
                  <p className="text-green-600 font-medium">
                    Du er påmeldt arrangementet.
                  </p>
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold">Status:</span> {registration.att_status}
                  </p>
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold">Påmeldingsfrist:</span> {formatDateTime(registration.deadline)}
                  </p>
                  <button
                    onClick={() => setConfirmAction("unregister")}
                    disabled={submitting}
                    className="rounded border border-red-300 px-4 py-2 font-semibold text-red-700 disabled:opacity-50"
                  >
                    {submitting ? "Melder av..." : "Meld deg av"}
                  </button>
                </div>
              ) : isDeadlinePassed ? (
                <div>
                  <p className="text-slate-600">Påmelding er stoppet.</p>
                </div>
              ) : isFull ? (
                <div>
                  <p className="text-slate-600">Arrangementet er fullt.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p>Plassen din reserveres med en gang du melder deg på.</p>
                  <button
                    onClick={() => setConfirmAction("register")}
                    disabled={submitting}
                    className="rounded bg-slate-900 px-4 py-2 font-semibold text-white disabled:opacity-50"
                  >
                    {submitting ? "Melder på..." : "Meld deg på"}
                  </button>
                </div>
              )}

              {registrationError && (
                <p className="text-red-600">Feil: {registrationError}</p>
              )}
            </div>
          </section>
        </div>

        {confirmAction && (
          <div
            className="fixed inset-0 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setConfirmAction(null);
              }
            }}
          >
            <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-lg font-bold">
                {confirmAction === "register" ? "Bekreft påmelding" : "Bekreft avmelding"}
              </h2>
              <p className="mb-6 text-sm text-slate-600">
                {confirmAction === "register"
                  ? "Er du sikker på at du vil melde deg på dette arrangementet?"
                  : "Er du sikker på at du vil melde deg av dette arrangementet?"}
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setConfirmAction(null)}
                  className="rounded border border-slate-300 px-4 py-2 font-semibold text-slate-900 hover:bg-slate-50"
                >
                  Avbryt
                </button>
                <button
                  onClick={() =>
                    void (confirmAction === "register"
                      ? handleRegister()
                      : handleUnregister())
                  }
                  disabled={submitting}
                  className={`rounded px-4 py-2 font-semibold text-white disabled:opacity-50 ${
                    confirmAction === "register"
                      ? "bg-slate-900 hover:bg-slate-800"
                      : "bg-red-700 hover:bg-red-800"
                  }`}
                >
                  {submitting
                    ? confirmAction === "register"
                      ? "Melder på..."
                      : "Melder av..."
                    : confirmAction === "register"
                      ? "Meld deg på"
                      : "Meld deg av"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
