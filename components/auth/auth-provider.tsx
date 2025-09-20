'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { AUTH_STORAGE_KEYS, AUTH_COOKIE_NAME, User, RegisterUserData, AuthContextType } from '@/lib/auth-constants';

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth token on mount
    const token = localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN)
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEYS.USER_DATA)

    console.log('AuthProvider useEffect:', { hasToken: !!token, hasStoredUser: !!storedUser })

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        console.log('Setting user from stored data:', parsedUser)
        setUser(parsedUser)
      } catch {
        console.log('Invalid stored user data, using fallback')
        // If stored user data is invalid, use default fallback
        const fallbackUser: User = {
          id: 1,
          email: "user@example.com",
          username: "user",
          name: { firstname: "John", lastname: "Doe" },
          phone: "+1-555-0123",
          address: {
            street: "123 Main Street",
            city: "New York, NY 10001"
          }
        }
        setUser(fallbackUser)
        localStorage.setItem(AUTH_STORAGE_KEYS.USER_DATA, JSON.stringify(fallbackUser))
      }
    } else if (token) {
      console.log('Token exists but no stored user data, using fallback')
      // Fallback for existing tokens without stored user data
      const fallbackUser: User = {
        id: 1,
        email: "user@example.com",
        username: "user",
        name: { firstname: "John", lastname: "Doe" },
        phone: "+1-555-0123",
        address: {
          street: "123 Main Street",
          city: "New York, NY 10001"
        }
      }
      setUser(fallbackUser)
      localStorage.setItem(AUTH_STORAGE_KEYS.USER_DATA, JSON.stringify(fallbackUser))
    } else {
      console.log('No token found, user remains null')
    }
    
    setIsLoading(false)
  }, [])

  const login = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      // Check local registered credentials first
      const storedUsername = localStorage.getItem(AUTH_STORAGE_KEYS.REGISTERED_USERNAME)
      const storedEmail = localStorage.getItem(AUTH_STORAGE_KEYS.REGISTERED_EMAIL)
      const storedPassword = localStorage.getItem(AUTH_STORAGE_KEYS.REGISTERED_PASSWORD)

      if (username === storedUsername && email === storedEmail && password === storedPassword) {
        // Local credentials match
        const simulatedToken = "simulated-jwt-token"
        const isSecure = window.location.protocol === 'https:'
        document.cookie = `${AUTH_COOKIE_NAME}=${simulatedToken}; path=/; max-age=604800; ${isSecure ? 'secure;' : ''} samesite=strict`

        const userData: User = {
          id: 1,
          email,
          username,
          name: { firstname: "John", lastname: "Doe" },
          phone: "+1-555-0123",
          address: {
            street: "123 Main Street",
            city: "New York, NY 10001"
          }
        }

        localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, simulatedToken)
        localStorage.setItem(AUTH_STORAGE_KEYS.USER_DATA, JSON.stringify(userData))
        setUser(userData)
        return true
      }

      // If local credentials don't match, try API login
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
      
      if (response.ok) {
        const data = await response.json()
        localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, data.token)
        
        const isSecure = window.location.protocol === 'https:'
        document.cookie = `${AUTH_COOKIE_NAME}=${data.token}; path=/; max-age=604800; ${isSecure ? 'secure;' : ''} samesite=strict`
        
        const userData: User = {
          id: 1,
          email,
          username,
          name: { firstname: "John", lastname: "Doe" },
          phone: "+1-555-0123",
          address: {
            street: "123 Main Street",
            city: "New York, NY 10001"
          }
        }
        
        localStorage.setItem(AUTH_STORAGE_KEYS.USER_DATA, JSON.stringify(userData))
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

  const register = async (userData: RegisterUserData): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      // Validate required fields
      if (!userData.email || !userData.username || !userData.password || 
          !userData.firstname || !userData.lastname) {
        return false
      }
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser: User = {
        id: Date.now(),
        email: userData.email,
        username: userData.username,
        name: { 
          firstname: userData.firstname, 
          lastname: userData.lastname 
        },
        phone: userData.phone,
        address: {
          street: userData.street,
          city: userData.city
        }
      }

      // Store registered credentials for future login
      localStorage.setItem(AUTH_STORAGE_KEYS.REGISTERED_USERNAME, userData.username)
      localStorage.setItem(AUTH_STORAGE_KEYS.REGISTERED_EMAIL, userData.email)
      localStorage.setItem(AUTH_STORAGE_KEYS.REGISTERED_PASSWORD, userData.password)

      const simulatedToken = "simulated-jwt-token"
      localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, simulatedToken)
      localStorage.setItem(AUTH_STORAGE_KEYS.USER_DATA, JSON.stringify(newUser))

      // Set secure cookie based on protocol
      const isSecure = window.location.protocol === 'https:'
      document.cookie = `${AUTH_COOKIE_NAME}=${simulatedToken}; path=/; max-age=604800; ${isSecure ? 'secure;' : ''} samesite=strict`

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
    localStorage.setItem(AUTH_STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser))
  }

  const logout = () => {
    // Clear authentication data
    localStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN)
    localStorage.removeItem(AUTH_STORAGE_KEYS.USER_DATA)
    
    // Clear registered credentials
    localStorage.removeItem(AUTH_STORAGE_KEYS.REGISTERED_USERNAME)
    localStorage.removeItem(AUTH_STORAGE_KEYS.REGISTERED_EMAIL)
    localStorage.removeItem(AUTH_STORAGE_KEYS.REGISTERED_PASSWORD)
    
    // Clear auth cookie
    document.cookie = `${AUTH_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
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