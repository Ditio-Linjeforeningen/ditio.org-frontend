export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface AuthService {
  startLogin(): void;
  getMe(): Promise<User | null>;
  logout(): void;
}
