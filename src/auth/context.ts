import { createContext } from "react";
import type { User } from ".";

export type AuthState = {
  user: User | null;
  loading: boolean;
  refresh: () => void;
};

export const AuthContext = createContext<AuthState | undefined>(undefined);
