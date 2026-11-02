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
  login: (
    username: string,
    email: string,
    password: string,
  ) => Promise<boolean>;
  loginPublicSample: (username: string, password: string) => Promise<boolean>;
  register: (userData: RegisterUserData) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: User) => void;
  isLoading: boolean;
}
