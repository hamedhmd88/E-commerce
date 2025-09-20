// Shared authentication types for the application

export interface User {
  id: number
  email: string
  username: string
  name: {
    firstname: string
    lastname: string
  }
  phone?: string
  address?: {
    street: string
    city: string
  }
}

export interface RegisterUserData {
  email: string
  username: string
  password: string
  confirmPassword: string
  firstname: string
  lastname: string
  phone: string
  street: string
  city: string
}

export interface LoginCredentials {
  username: string
  email: string
  password: string
}

export interface AuthContextType {
  user: User | null
  login: (username: string, email: string, password: string) => Promise<boolean>
  register: (userData: RegisterUserData) => Promise<boolean>
  logout: () => void
  updateUser: (updatedUser: User) => void
  isLoading: boolean
}

export interface FormErrors {
  email?: string
  username?: string
  password?: string
  confirmPassword?: string
  firstname?: string
  lastname?: string
  phone?: string
  street?: string
  city?: string
}

export interface AuthResponse {
  token: string
  user?: User
}

export interface ValidationResult {
  isValid: boolean
  error?: string
}

// Utility types for form handling
export type FormField = keyof RegisterUserData
export type ErrorField = keyof FormErrors

// Constants for validation
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\+]?[1-9][\d]{0,3}[\s\-\(]?[\d]{1,4}[\s\-\)]?[\d]{1,4}[\s\-]?[\d]{1,9}$/,
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  NAME_MIN_LENGTH: 2,
} as const

export const AUTH_STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  REGISTERED_USERNAME: 'registeredUsername',
  REGISTERED_EMAIL: 'registeredEmail',
  REGISTERED_PASSWORD: 'registeredPassword',
} as const

export const AUTH_COOKIE_NAME = 'authToken' as const