"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: number
  email: string
  username: string
  name: {
    firstname: string
    lastname: string
  }
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: any) => Promise<boolean>
  logout: () => void
  updateUser: (updatedUser: User) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth token on mount
    const token = localStorage.getItem("auth_token")
    const storedUser = localStorage.getItem("user_data")

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        // If stored user data is invalid, use default
        setUser({
          id: 1,
          email: "user@example.com",
          username: "user",
          name: { firstname: "John", lastname: "Doe" },
        })
      }
    } else if (token) {
      // Fallback for existing tokens without stored user data
      setUser({
        id: 1,
        email: "user@example.com",
        username: "user",
        name: { firstname: "John", lastname: "Doe" },
      })
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      // FakeStore API login
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("auth_token", data.token)

        // Fetch user details (simulated)
        const userData = {
          id: 1,
          email,
          username: email,
          name: { firstname: "John", lastname: "Doe" },
        }

        localStorage.setItem("user_data", JSON.stringify(userData))
        setUser(userData)
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: any): Promise<boolean> => {
    try {
      setIsLoading(true)
      // FakeStore API doesn't have register, so we'll simulate it
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser = {
        id: Date.now(),
        email: userData.email,
        username: userData.username,
        name: { firstname: userData.firstname, lastname: userData.lastname },
      }

      localStorage.setItem("auth_token", "simulated_token")
      localStorage.setItem("user_data", JSON.stringify(newUser))
      setUser(newUser)
      return true
    } catch (error) {
      console.error("Registration error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
    localStorage.setItem("user_data", JSON.stringify(updatedUser))
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_data")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
