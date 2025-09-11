"use client"

import type React from "react"

import { useState, useEffect } from "react"  // اضافه کردن useEffect
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/auth/auth-provider"
import { Loader2 } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, isLoading } = useAuth()
  const router = useRouter()

  // state جدید برای credentials ثبت‌شده
  const [registeredUsername, setRegisteredUsername] = useState<string | null>(null)
  const [hasRegisteredPassword, setHasRegisteredPassword] = useState(false)

  // لود credentials از localStorage فقط سمت کلاینت
  useEffect(() => {
    const username = localStorage.getItem("registered_username")
    const storedPassword = localStorage.getItem("registered_password")
    setRegisteredUsername(username)
    setHasRegisteredPassword(!!storedPassword)  // چک وجود password بدون نمایش مستقیم
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    const success = await login(email, password)
    if (success) {
      router.push("/account")
    } else {
      setError("Invalid credentials. Try username: mor_2314, password: 83r5^_")
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
            <Label htmlFor="email">Username</Label>
            <Input
              id="email"
              type="text"
              placeholder="Enter your username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Demo credentials:</p>
            <p>Username: mor_2314</p>
            <p>Password: 83r5^_</p>
            {registeredUsername && (
              <>
                <p className="mt-2">یا با اطلاعات ثبت‌نام شده خود وارد شوید:</p>
                <p>Username: {registeredUsername}</p>
                <p>Password: {hasRegisteredPassword ? "********" : ""}</p>
              </>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
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
