import type { AuthService, User } from "./AuthService";
import { ADMIN_IDS } from "./admins";

const USER_ID = "mock-123";

const USER: User = {
  id: USER_ID,
  name: "Test Bruker",
  email: "test@skole.no",
  isAdmin: ADMIN_IDS.includes(USER_ID),
};

export class MockAuthService implements AuthService {
  startLogin(): void {
    localStorage.setItem("mock_logged_in", "true");
    window.location.href = "/";
  }

  async getMe(): Promise<User | null> {
    if (localStorage.getItem("mock_logged_in") === "true") {
      return USER;
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem("mock_logged_in");
    window.location.href = "/";
  }
}
