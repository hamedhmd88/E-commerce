// Authentication storage keys and constants
export const AUTH_STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  REGISTERED_USERNAME: 'registered_username',
  REGISTERED_EMAIL: 'registered_email',
  REGISTERED_PASSWORD: 'registered_password'
} as const;

export const AUTH_COOKIE_NAME = 'auth_token';

// Types
export interface User {
  id: number;
  username: string;
  email: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone?: string;
  address?: {
    street: string;
    city: string;
  };
}

export interface RegisterUserData {
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phone?: string;
  street?: string;
  city?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterUserData) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: User) => void;
  isLoading: boolean;
}