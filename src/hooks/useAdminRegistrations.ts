import { useEffect, useRef, useState } from "react";
import {
  listRegistrationsForEvent,
  type Registration,
  getUserById,
  type User,
} from "../services/registrationService";

export type RegistrationWithUser = Registration & {
  user?: User | null;
};

type AdminRegistrationsState = {
  registrations: RegistrationWithUser[];
  loading: boolean;
  error: string | null;
};


export function useAdminRegistrations(
  eventId: string | undefined,
): AdminRegistrationsState {
  const [registrations, setRegistrations] = useState<RegistrationWithUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const userCacheRef = useRef<Map<string, User | null>>(new Map());

  useEffect(() => {
    let isCancelled = false;

    const loadRegistrations = async () => {
      if (!eventId) {
        if (!isCancelled) {
          setRegistrations([]);
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
        const registrationList = await listRegistrationsForEvent(eventId);

        const cache = userCacheRef.current;
        const uniqueUserIds = [...new Set(registrationList.map((reg) => reg.user_id))];

        await Promise.all(
          uniqueUserIds.map(async (userId) => {
            if (cache.has(userId)) {
              return;
            }

            try {
              const user = await getUserById(userId);
              cache.set(userId, user);
            } catch {
              cache.set(userId, null);
            }
          }),
        );

        if (!isCancelled) {
          const enrichedRegistrations = registrationList.map((reg) => ({
            ...reg,
            user: cache.get(reg.user_id) ?? null,
          }));

          setRegistrations(enrichedRegistrations);
        }
      } catch (err) {
        if (!isCancelled) {
          setRegistrations([]);
          setError(err instanceof Error ? err.message : "Kunne ikke hente påmeldinger");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    void loadRegistrations();

    return () => {
      isCancelled = true;
    };
  }, [eventId]);

  return {
    registrations,
    loading,
    error,
  };
}
