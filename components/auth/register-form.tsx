"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/auth/auth-provider"
import { Loader2, Eye, EyeOff } from "lucide-react"
import type { RegisterUserData } from "@/lib/auth-constants"

// Form validation types
interface FormErrors {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  street?: string;
  city?: string;
}

export function RegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    phone: "",
    street: "",
    city: "",
  })
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({})
  const { register, isLoading } = useAuth()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Validation functions
  const validateEmail = (email: string): string | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim()) return "Email is required"
    if (!emailRegex.test(email)) return "Please enter a valid email address"
    return undefined
  }

  const validateUsername = (username: string): string | undefined => {
    if (!username.trim()) return "Username is required"
    if (username.length < 3) return "Username must be at least 3 characters"
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return "Username can only contain letters, numbers, and underscores"
    return undefined
  }

  const validatePassword = (password: string): string | undefined => {
    if (!password) return "Password is required"
    if (password.length < 8) return "Password must be at least 8 characters"
    if (!/(?=.*[a-z])/.test(password)) return "Password must contain at least one lowercase letter"
    if (!/(?=.*[A-Z])/.test(password)) return "Password must contain at least one uppercase letter"
    if (!/(?=.*\d)/.test(password)) return "Password must contain at least one number"
    return undefined
  }

  const validatePhone = (phone: string): string | undefined => {
    if (!phone.trim()) return "Phone number is required"
    const phoneRegex = /^[+]?[1-9]?[0-9]{7,15}$/
    if (!phoneRegex.test(phone.replace(/[\s-()]/g, ''))) return "Please enter a valid phone number"
    return undefined
  }

  const validateName = (name: string, fieldName: string): string | undefined => {
    if (!name.trim()) return `${fieldName} is required`
    if (name.length < 2) return `${fieldName} must be at least 2 characters`
    if (!/^[a-zA-Z\s]+$/.test(name)) return `${fieldName} can only contain letters and spaces`
    return undefined
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear field error when user starts typing
    if (fieldErrors[name as keyof FormErrors]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }

    // Real-time validation for specific fields
    if (name === 'confirmPassword' && formData.password) {
      if (value !== formData.password) {
        setFieldErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setFieldErrors({})

    // Comprehensive validation
    const errors: FormErrors = {}
    
    errors.email = validateEmail(formData.email)
    errors.username = validateUsername(formData.username)
    errors.password = validatePassword(formData.password)
    errors.firstname = validateName(formData.firstname, "First name")
    errors.lastname = validateName(formData.lastname, "Last name")
    errors.phone = validatePhone(formData.phone)
    
    if (!formData.street.trim()) errors.street = "Street address is required"
    if (!formData.city.trim()) errors.city = "City is required"
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    // Check if there are any errors
    const hasErrors = Object.values(errors).some(error => error !== undefined)
    if (hasErrors) {
      setFieldErrors(errors)
      setError("Please fix the errors above")
      return
    }

    try {
      const success = await register(formData)
      if (success) {
        // Reset form on success
        setFormData({
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
          firstname: "",
          lastname: "",
          phone: "",
          street: "",
          city: "",
        })
        
        // Show success message
        toast.success("Registration successful! Redirecting...")
        
        // Small delay to ensure cookie is set before redirect
        setTimeout(() => {
          // Force a full page reload to ensure middleware picks up the new cookie
          window.location.href = "/account"
        }, 100)
      } else {
        setError("Registration failed. Please try again.")
      }
    } catch (error) {
      setError("An error occurred during registration. Please try again.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Fill in your details to create a new account</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstname">First Name</Label>
              <Input
                id="firstname"
                name="firstname"
                type="text"
                placeholder="John"
                value={formData.firstname}
                onChange={handleChange}
                disabled={isLoading}
                className={fieldErrors.firstname ? "border-red-500" : ""}
              />
              {fieldErrors.firstname && (
                <p className="text-sm text-red-500">{fieldErrors.firstname}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                id="lastname"
                name="lastname"
                type="text"
                placeholder="Doe"
                value={formData.lastname}
                onChange={handleChange}
                disabled={isLoading}
                className={fieldErrors.lastname ? "border-red-500" : ""}
              />
              {fieldErrors.lastname && (
                <p className="text-sm text-red-500">{fieldErrors.lastname}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className={fieldErrors.email ? "border-red-500" : ""}
              />
              {fieldErrors.email && (
                <p className="text-sm text-red-500">{fieldErrors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="johndoe"
                value={formData.username}
                onChange={handleChange}
                disabled={isLoading}
                className={fieldErrors.username ? "border-red-500" : ""}
              />
              {fieldErrors.username && (
                <p className="text-sm text-red-500">{fieldErrors.username}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className={fieldErrors.password ? "border-red-500 pr-10" : "pr-10"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-muted-foreground hover:text-foreground cursor-pointer"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              {fieldErrors.password && (
                <p className="text-sm text-red-500">{fieldErrors.password}</p>
              )}
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                className={fieldErrors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-8 text-muted-foreground hover:text-foreground cursor-pointer"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              {fieldErrors.confirmPassword && (
                <p className="text-sm text-red-500">{fieldErrors.confirmPassword}</p>
              )}
            </div>
          </div>

<div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1-555-0123"
              value={formData.phone}
              onChange={handleChange}
              disabled={isLoading}
              className={fieldErrors.phone ? "border-red-500" : ""}
            />
            {fieldErrors.phone && (
              <p className="text-sm text-red-500">{fieldErrors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              name="street"
              type="text"
              placeholder="123 Main Street"
              value={formData.street}
              onChange={handleChange}
              disabled={isLoading}
              className={fieldErrors.street ? "border-red-500" : ""}
            />
            {fieldErrors.street && (
              <p className="text-sm text-red-500">{fieldErrors.street}</p>
            )}
          </div>
  </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              type="text"
              placeholder="New York"
              value={formData.city}
              onChange={handleChange}
              disabled={isLoading}
              className={fieldErrors.city ? "border-red-500" : ""}
            />
            {fieldErrors.city && (
              <p className="text-sm text-red-500">{fieldErrors.city}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 mt-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
