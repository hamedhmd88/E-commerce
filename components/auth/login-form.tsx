"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [mode, setMode] = useState<"demo" | "api">("demo");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const { login, loginPublicSample, isLoading } = useAuth();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEmailError("");

    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    if (mode === "demo" && !email.trim()) {
      setError("Email is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    if (mode === "demo" && !validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    try {
      const success =
        mode === "api"
          ? await loginPublicSample(username.trim(), password)
          : await login(username.trim(), email.trim(), password);
      setPassword("");
      if (success) {
        toast.success("Sample session ready");
        const requested = new URLSearchParams(window.location.search).get(
          "redirect",
        );
        const safeRedirect =
          requested?.startsWith("/") &&
          !requested.startsWith("//") &&
          !requested.includes("\\") &&
          new URL(requested, window.location.origin).origin ===
            window.location.origin
            ? requested
            : null;
        router.replace(
          safeRedirect
            ? safeRedirect
            : mode === "api"
              ? "/account/users"
              : "/account",
        );
      } else {
        setError(
          mode === "api"
            ? "The public API did not accept these sample credentials."
            : "Invalid demo credentials. Please check your username, email, and password.",
        );
      }
    } catch {
      setPassword("");
      setError(
        mode === "api"
          ? "The public sample service is unavailable. Please try again."
          : "Could not start the demo session. Please try again.",
      );
    }
  };

  return (
    <Card className="glass-panel auth-card relative overflow-hidden rounded-[2rem] border-border/60 bg-transparent p-2 shadow-xl sm:p-4">
      <CardHeader>
        <CardTitle className="font-serif text-3xl">Sign in</CardTitle>
        <CardDescription>
          Choose a local demo session or the public Fake Store sample account.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="auth-fields space-y-4">
          <div
            className="grid grid-cols-2 gap-2 rounded-2xl border border-border/60 bg-background/40 p-1"
            role="group"
            aria-label="Sign in method"
          >
            {(["demo", "api"] as const).map((choice) => (
              <button
                key={choice}
                type="button"
                aria-pressed={mode === choice}
                onClick={() => {
                  setMode(choice);
                  setError("");
                  setPassword("");
                }}
                className={`min-h-11 rounded-xl px-3 text-sm font-medium transition-colors ${mode === choice ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"}`}
              >
                {choice === "demo" ? "Morrow demo" : "API sample"}
              </button>
            ))}
          </div>
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
              dir="auto"
              autoComplete="username"
              required
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {mode === "demo" && (
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                dir="ltr"
                lang="en"
                autoComplete="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                disabled={isLoading}
                aria-invalid={Boolean(emailError) || undefined}
                aria-describedby={emailError ? "login-email-error" : undefined}
                className={emailError ? "border-red-500" : ""}
              />
              {emailError && (
                <p id="login-email-error" className="text-sm text-destructive">
                  {emailError}
                </p>
              )}
            </div>
          )}

          <div className="space-y-2 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              dir="ltr"
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
              className="absolute right-3 top-9 rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
              <p className="mb-1 font-semibold text-foreground">
                {mode === "api"
                  ? "Public API sample account"
                  : "Try the demo account"}
              </p>
              <p className="mb-3 text-xs">
                {mode === "api"
                  ? "Uses Fake Store API login, then opens the sample users page. The API token is discarded."
                  : "Explore the account without creating a profile."}
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setUsername(mode === "api" ? "mor_2314" : "demo");
                  setEmail(mode === "api" ? "" : "demo@example.com");
                  setPassword(mode === "api" ? "83r5^_" : "demo12345");
                }}
                disabled={isLoading}
                className="w-full rounded-xl border-primary/30 bg-background/60 text-primary hover:bg-primary/10"
              >
                Fill {mode === "api" ? "API sample" : "demo"} credentials
              </Button>
            </div>

            <p>
              Accounts here are demonstrations. Passwords and API tokens are not
              stored.
            </p>
          </div>
        </CardContent>

        <CardFooter className="mt-2 flex flex-col space-y-4">
          <Button
            type="submit"
            className="min-h-12 w-full rounded-xl"
            disabled={isLoading}
          >
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
