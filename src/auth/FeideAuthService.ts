/*
import type { AuthService, User } from "./AuthService";
import { ADMIN_IDS } from "./admins";

export class FeideAuthService implements AuthService {
  startLogin(): void {
    window.location.href = "/oauth2/authorization/feide";
  }

  async getMe(): Promise<User | null> {
    const res = await fetch("/api/users/meg", {
      credentials: "include",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return { ...data, isAdmin: ADMIN_IDS.includes(data.id) } as User;
  }

  logout(): void {
    window.location.href = "/logout";
  }
}
*/