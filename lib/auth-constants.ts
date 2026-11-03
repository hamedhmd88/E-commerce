import { z } from "zod";

export const userSchema = z.object({
  id: z.number().int().positive(),
  username: z.string().min(1),
  email: z.string().min(1),
  name: z.object({
    firstname: z.string().min(1),
    lastname: z.string().min(1),
  }),
  phone: z.string().optional(),
  address: z
    .object({
      street: z.string(),
      city: z.string(),
    })
    .optional(),
});

export type User = z.infer<typeof userSchema>;

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
