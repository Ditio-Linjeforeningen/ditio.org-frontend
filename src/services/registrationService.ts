export type AttendanceStatus = "confirmed" | "attended" | "waitlist" | "no_show";

export interface Registration {
  eventRegId: string;
  user_id: string;
  event_id: string;
  att_status: AttendanceStatus;
  deadline: string;
}

type CreateRegistrationBody = {
  user_id: string;
  event_id: string;
  att_status: AttendanceStatus;
  deadline: string;
};

const REGISTRATION_BASE_PATH = "/EventReg2";

const parseErrorMessage = async (response: Response): Promise<string> => {
  try {
    const payload = (await response.json()) as { message?: string };
    if (typeof payload.message === "string" && payload.message.length > 0) {
      return payload.message;
    }
  } catch {
    // Hvis parsing feiler, bruk statuskoden som fallback.
  }

  return `HTTP-feil: ${response.status}`;
};

const ensureOk = async (response: Response): Promise<void> => {
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }
};

export async function registerForEvent(
  body: CreateRegistrationBody,
): Promise<Registration> {
  const response = await fetch(REGISTRATION_BASE_PATH, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  await ensureOk(response);
  return (await response.json()) as Registration;
}

export async function unregisterFromEvent(registrationId: string): Promise<void> {
  const response = await fetch(`${REGISTRATION_BASE_PATH}/${registrationId}`, {
    method: "DELETE",
    credentials: "include",
  });

  await ensureOk(response);
}

export async function listRegistrationsForEvent(
  eventId: string,
): Promise<Registration[]> {
  const response = await fetch(REGISTRATION_BASE_PATH, {
    credentials: "include",
  });

  await ensureOk(response);

  const registrations = (await response.json()) as Registration[];
  return registrations.filter((registration) => registration.event_id === eventId);
}

export type User = {
  feideId: string;
  navn?: string | null;
  email?: string | null;
  role?: string;
};

export async function getUserById(userId: string): Promise<User | null> {
  const response = await fetch(`/api/users/${userId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as User;
}
