export type User = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

export type AuthService = {
  startLogin(): void;
  getMe(): Promise<User | null>;
  logout(): void;
};

export type AuthState = {
  user: User | null;
  loading: boolean;
  refresh: () => void;
};
