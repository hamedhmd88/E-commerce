"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/auth/auth-provider"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { AUTH_STORAGE_KEYS } from "@/lib/auth-constants"

export function LoginForm() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [emailError, setEmailError] = useState("")
  const { login, isLoading } = useAuth()
  const router = useRouter()

  // State for registered credentials
  const [registeredUsername, setRegisteredUsername] = useState<string | null>(null)
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null)
  const [hasRegisteredPassword, setHasRegisteredPassword] = useState(false)
  
  // Load credentials from localStorage on client side only
  useEffect(() => {
    const username = localStorage.getItem(AUTH_STORAGE_KEYS.REGISTERED_USERNAME)
    const email = localStorage.getItem(AUTH_STORAGE_KEYS.REGISTERED_EMAIL)
    const storedPassword = localStorage.getItem(AUTH_STORAGE_KEYS.REGISTERED_PASSWORD)
    setRegisteredUsername(username)
    setRegisteredEmail(email)
    setHasRegisteredPassword(!!storedPassword)
  }, [])

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Auto-fill registered credentials
  const fillRegisteredCredentials = () => {
    if (registeredUsername) setUsername(registeredUsername)
    if (registeredEmail) setEmail(registeredEmail)
    const storedPassword = localStorage.getItem("registeredPassword")
    if (storedPassword) setPassword(storedPassword)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setEmailError("")

    // Validate required fields
    if (!username.trim()) {
      setError("Username is required")
      return
    }

    if (!email.trim()) {
      setError("Email is required")
      return
    }

    if (!password) {
      setError("Password is required")
      return
    }

    // Validate email format
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address")
      return
    }

    try {
      const success = await login(username.trim(), email.trim(), password)
      if (success) {
        // Show success message
        toast.success("Login successful! Redirecting...")
        
        // Small delay to ensure cookie is set before redirect
        setTimeout(() => {
          // Force a full page reload to ensure middleware picks up the new cookie
          window.location.href = "/account"
        }, 100)
      } else {
        setError("Invalid credentials. Please check your username, email, and password.")
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (emailError) setEmailError("")
              }}
              disabled={isLoading}
              className={emailError ? "border-red-500" : ""}
            />
            {emailError && (
              <p className="text-sm text-red-500">{emailError}</p>
            )}
          </div>

          <div className="space-y-2 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {/* Demo credentials section - secure display */}
          <div className="text-sm text-muted-foreground space-y-2">
            <div className="p-3 bg-muted rounded-md">
              <p className="font-medium mb-2">Demo Account Available:</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setUsername("mor_2314")
                  setEmail("mor_2314@example.com")
                  setPassword("83r5^_")
                }}
                disabled={isLoading}
                className="w-full"
              >
                Use Demo Credentials
              </Button>
            </div>
            
            {registeredUsername && (
              <div className="p-3 bg-muted rounded-md">
                <p className="font-medium mb-2">Your Registered Account:</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={fillRegisteredCredentials}
                  disabled={isLoading}
                  className="w-full"
                >
                  Use My Credentials
                </Button>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 mt-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
