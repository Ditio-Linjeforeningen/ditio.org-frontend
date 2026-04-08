import { createContext, useContext, useEffect, useState } from "react";
import { authService } from ".";
import type { User } from ".";

type AuthState = {
  user: User | null;
  loading: boolean;
  refresh: () => void;
};

const AuthContext = createContext<AuthState>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    setLoading(true);
    authService
      .getMe()
      .then(setUser)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
