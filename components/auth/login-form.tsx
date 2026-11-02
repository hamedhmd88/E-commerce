"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/components/auth/auth-provider";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const { login, isLoading } = useAuth();

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEmailError("");

    // Validate required fields
    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    try {
      const success = await login(username.trim(), email.trim(), password);
      if (success) {
        // Show success message
        toast.success("Login successful! Redirecting...");

        // Give the demo session state a moment to update before navigation.
        setTimeout(() => {
          const requested = new URLSearchParams(window.location.search).get(
            "redirect",
          );
          window.location.href =
            requested?.startsWith("/") && !requested.startsWith("//")
              ? requested
              : "/account";
        }, 100);
      } else {
        setError(
          "Invalid credentials. Please check your username, email, and password.",
        );
      }
    } catch {
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <Card className="glass-panel auth-card relative overflow-hidden rounded-[2rem] border-border/60 bg-transparent p-2 shadow-xl sm:p-4">
      <CardHeader>
        <CardTitle className="font-serif text-3xl">Sign in</CardTitle>
        <CardDescription>Use your demo credentials or try the shortcut below.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="auth-fields space-y-4">
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
              autoComplete="username"
              required
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
              autoComplete="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
              }}
              disabled={isLoading}
              className={emailError ? "border-red-500" : ""}
            />
            {emailError && <p className="text-sm text-red-500">{emailError}</p>}
          </div>

          <div className="space-y-2 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="pr-10"
            />
            <button
              aria-label={showPassword ? "Hide password" : "Show password"}
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Demo credentials section - secure display */}
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
              <p className="mb-1 font-semibold text-foreground">Try the demo account</p>
              <p className="mb-3 text-xs">Explore the account without creating a profile.</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setUsername("demo");
                  setEmail("demo@example.com");
                  setPassword("demo12345");
                }}
                disabled={isLoading}
                className="w-full rounded-xl border-primary/30 bg-background/60 text-primary hover:bg-primary/10"
              >
                Use Demo Credentials
              </Button>
            </div>

            <p>
              Registration creates a session-only demo profile. No password is
              stored.
            </p>
          </div>
        </CardContent>

        <CardFooter className="mt-2 flex flex-col space-y-4">
          <Button type="submit" className="min-h-12 w-full rounded-xl" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
