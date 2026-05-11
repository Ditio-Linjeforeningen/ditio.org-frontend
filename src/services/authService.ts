import type { AuthService, User } from "../types/auth";
import { ADMIN_IDS } from "../auth/admins";

const FEIDE_LOGIN_PATH = import.meta.env.VITE_FEIDE_LOGIN_PATH ?? "/feide/test";
const AUTH_ME_PATH = "/api/users/meg";
const FEIDE_LOGOUT_PATH = "/logout";

function toUser(payload: unknown): User | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const p = payload as Record<string, unknown>;

  const id =
    typeof p.feideId === "string"
      ? p.feideId
      : typeof p.id === "string"
        ? p.id
        : typeof p.userId === "string"
          ? p.userId
          : typeof p.sub === "string"
            ? p.sub
            : null;

  if (!id) {
    return null;
  }

  const name =
    typeof p.navn === "string"
      ? p.navn
      : typeof p.name === "string"
        ? p.name
        : typeof p.displayName === "string"
          ? p.displayName
          : typeof p.fullName === "string"
            ? p.fullName
            : "Ukjent bruker";

  const email =
    typeof p.email === "string"
      ? p.email
      : typeof p.mail === "string"
        ? p.mail
        : "";

  const roles = Array.isArray(p.roles)
    ? p.roles.filter((role): role is string => typeof role === "string")
    : [];

  const isAdmin =
    typeof p.isAdmin === "boolean"
      ? p.isAdmin
      : roles.includes("admin") ||
        roles.includes("ROLE_ADMIN") ||
        ADMIN_IDS.includes(id);

  return {
    id,
    name,
    email,
    isAdmin,
  };
}

class FeideAuthService implements AuthService {
  startLogin(): void {
    window.location.assign(FEIDE_LOGIN_PATH);
  }

  async getMe(): Promise<User | null> {
    const response = await fetch(AUTH_ME_PATH, {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });

    if (
      response.status === 401 ||
      response.status === 403 ||
      response.status === 404
    ) {
      return null;
    }

    if (response.status >= 500) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Klarte ikke hente innlogget bruker: ${response.status}`);
    }

    const payload = (await response.json()) as unknown;
    return toUser(payload);
  }

  logout(): void {
    window.location.assign(FEIDE_LOGOUT_PATH);
  }
}

export const authService: AuthService = new FeideAuthService();
