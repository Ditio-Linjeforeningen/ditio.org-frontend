import { useContext } from "react";
import { AuthContext } from "../auth";
import type { AuthState } from "../auth";

export const useAuth = (): AuthState => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
