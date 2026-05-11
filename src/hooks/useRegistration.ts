import { useEffect, useState } from "react";
import {
  registerForEvent,
  unregisterFromEvent,
  listRegistrationsForEvent,
  type Registration,
} from "../services/registrationService";

type RegistrationState = {
  registration: Registration | null;
  loading: boolean;
  submitting: boolean;
  error: string | null;
  register: () => Promise<void>;
  unregister: () => Promise<void>;
};

const DUPLICATE_ERROR_REGEX = /already registered|duplicate|constraint|unique/i;
export function useRegistration(
  eventId: string | undefined,
  userId: string | undefined,
  deadline: string | null | undefined,
): RegistrationState {
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchRegistration = async () => {
      if (!eventId || !userId) {
        if (!isCancelled) {
          setRegistration(null);
          setError(null);
          setLoading(false);
        }
        return;
      }

      if (!isCancelled) {
        setLoading(true);
        setError(null);
      }

      try {
        const registrations = await listRegistrationsForEvent(eventId);
        const userRegistration = registrations.find(
          (reg) => reg.user_id === userId,
        );
        if (!isCancelled) {
          setRegistration(userRegistration ?? null);
        }
      } catch (err) {
        if (!isCancelled) {
          setRegistration(null);
          setError(
            err instanceof Error
              ? err.message
              : "Kunne ikke hente påmeldingsstatus",
          );
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    void fetchRegistration();

    return () => {
      isCancelled = true;
    };
  }, [eventId, userId]);

  const register = async (): Promise<void> => {
    if (!eventId || !userId || !deadline) {
      throw new Error("Mangler eventId, userId eller deadline");
    }

    setSubmitting(true);
    setError(null);

    try {
      const deadlineObj = new Date(deadline);
      const isoString = deadlineObj.toISOString().slice(0, 19);

      const reg = await registerForEvent({
        user_id: userId,
        event_id: eventId,
        att_status: "confirmed",
        deadline: isoString,
      });
      setRegistration(reg);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Påmelding feilet";

      if (DUPLICATE_ERROR_REGEX.test(errorMessage)) {
        const registrations = await listRegistrationsForEvent(eventId);
        const existingReg = registrations.find(
          (reg) => reg.user_id === userId,
        );
        if (existingReg) {
          setRegistration(existingReg);
          setError(null);
          return;
        }
      }

      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const unregister = async (): Promise<void> => {
    if (!registration) {
      throw new Error("Ingen aktiv påmelding");
    }

    setSubmitting(true);
    setError(null);

    try {
      await unregisterFromEvent(registration.eventRegId);
      setRegistration(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Avmelding feilet",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return {
    registration,
    loading,
    submitting,
    error,
    register,
    unregister,
  };
}
