import { FeideAuthService } from "./FeideAuthService";
import type { AuthService } from "./AuthService";

export const authService: AuthService = new FeideAuthService();

export { AuthProvider } from "./AuthContext";
export { useAuth } from "./useAuth";
export type { AuthService };
export type { User } from "./AuthService";
