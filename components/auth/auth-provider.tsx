"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  type AuthContextType,
  type RegisterUserData,
  type User,
} from "@/lib/auth-constants";
import { demoApiService } from "@/services/demoApiService";

const SESSION_KEY = "portfolio-demo-user";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed: User = JSON.parse(raw);
        if (
          parsed &&
          typeof parsed.email === "string" &&
          typeof parsed.username === "string"
        )
          setUser(parsed);
      }
    } catch {
      sessionStorage.removeItem(SESSION_KEY);
    }
    setIsLoading(false);
  }, []);

  function establish(nextUser: User) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  }

  const login = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Public sample credentials only. This does not authenticate against a real account.
      if (
        username !== "demo" ||
        email !== "demo@example.com" ||
        password !== "demo12345"
      )
        return false;
      establish({
        id: 1,
        username: "demo",
        email,
        name: { firstname: "Demo", lastname: "Shopper" },
      });
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterUserData) => {
    setIsLoading(true);
    try {
      if (
        !data.username ||
        !data.email ||
        !data.password ||
        !data.firstname ||
        !data.lastname
      )
        return false;
      establish({
        id: Date.now(),
        username: data.username,
        email: data.email,
        name: { firstname: data.firstname, lastname: data.lastname },
        phone: data.phone,
        address: { street: data.street || "", city: data.city || "" },
      });
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const loginPublicSample = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const authenticated = await demoApiService.sampleLogin(
        username,
        password,
      );
      if (!authenticated) return false;
      const sampleUsers = await demoApiService.users();
      const sample = sampleUsers.find((item) => item.username === username);
      if (!sample) return false;
      establish({
        id: sample.id,
        username: sample.username,
        email: sample.email,
        name: {
          firstname: sample.name?.firstname || "Sample",
          lastname: sample.name?.lastname || "Shopper",
        },
        phone: sample.phone,
        address: sample.address
          ? {
              city: sample.address.city || "",
              street: sample.address.street || "",
            }
          : undefined,
      });
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (nextUser: User) => establish(nextUser);
  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginPublicSample,
        register,
        logout,
        updateUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
