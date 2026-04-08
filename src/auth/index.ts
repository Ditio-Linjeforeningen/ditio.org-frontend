import { MockAuthService } from "./MockAuthService";
// import { FeideAuthService } from "./FeideAuthService";
import type { AuthService } from "./AuthService";

export const authService: AuthService = new MockAuthService();
// new FeideAuthService();

export type { AuthService };
export type { User } from "./AuthService";
