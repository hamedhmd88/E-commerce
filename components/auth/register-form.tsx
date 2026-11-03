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
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";

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
  const router = useRouter();
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
  });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const { register, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fieldAccessibility = (field: keyof FormErrors) => ({
    "aria-invalid": Boolean(fieldErrors[field]) || undefined,
    "aria-describedby": fieldErrors[field] ? `${field}-error` : undefined,
  });

  const normalizeDigits = (value: string) =>
    value.replace(/[۰-۹٠-٩]/g, (digit) =>
      String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit) >= 0
        ? "۰۱۲۳۴۵۶۷۸۹".indexOf(digit)
        : "٠١٢٣٤٥٦٧٨٩".indexOf(digit)),
    );

  const validateEmail = (email: string): string | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return undefined;
  };

  const validateUsername = (username: string): string | undefined => {
    if (!username.trim()) return "Username is required";
    if (username.length < 3) return "Username must be at least 3 characters";
    if (!/^[\p{L}\p{N}_]+$/u.test(username))
      return "Username can only contain letters, numbers, and underscores";
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/\p{L}/u.test(password))
      return "Password must contain at least one letter";
    if (!/\d/.test(normalizeDigits(password)))
      return "Password must contain at least one number";
    return undefined;
  };

  const validatePhone = (phone: string): string | undefined => {
    if (!phone.trim()) return "Phone number is required";
    const phoneRegex = /^[+]?[1-9]?[0-9]{7,15}$/;
    if (!phoneRegex.test(normalizeDigits(phone).replace(/[\s-()]/g, "")))
      return "Please enter a valid phone number";
    return undefined;
  };

  const validateName = (
    name: string,
    fieldName: string,
  ): string | undefined => {
    if (!name.trim()) return `${fieldName} is required`;
    if (name.length < 2) return `${fieldName} must be at least 2 characters`;
    if (!/^[\p{L}\p{M}\s'-]+$/u.test(name))
      return `${fieldName} can only contain letters and spaces`;
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (fieldErrors[name as keyof FormErrors]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    if (name === "confirmPassword" && formData.password) {
      if (value !== formData.password) {
        setFieldErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    const errors: FormErrors = {};

    errors.email = validateEmail(formData.email);
    errors.username = validateUsername(formData.username);
    errors.password = validatePassword(formData.password);
    errors.firstname = validateName(formData.firstname, "First name");
    errors.lastname = validateName(formData.lastname, "Last name");
    errors.phone = validatePhone(formData.phone);

    if (!formData.street.trim()) errors.street = "Street address is required";
    if (!formData.city.trim()) errors.city = "City is required";

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    const hasErrors = Object.values(errors).some(
      (error) => error !== undefined,
    );
    if (hasErrors) {
      setFieldErrors(errors);
      setError("Please fix the errors above");
      const firstInvalid = Object.keys(errors).find(
        (field) => errors[field as keyof FormErrors],
      );
      if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      return;
    }

    try {
      const success = await register(formData);
      if (success) {
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
        });

        toast.success("Demo account ready");
        router.replace("/account");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch {
      setError("An error occurred during registration. Please try again.");
    }
  };

  return (
    <Card className="register-card rounded-[2rem] border-border/65 pb-8 pt-8 shadow-[0_30px_85px_-45px_rgba(0,0,0,.45)] sm:pb-10 sm:pt-10">
      <CardHeader className="px-5 sm:px-8">
        <CardTitle className="font-serif text-2xl sm:text-3xl">Create Account</CardTitle>
        <CardDescription>
          Fill in your details to create a new account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-5 px-5 sm:px-8">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstname">First Name</Label>
              <Input
                id="firstname"
                name="firstname"
                type="text"
                dir="auto"
                autoComplete="given-name"
                {...fieldAccessibility("firstname")}
                placeholder="John"
                value={formData.firstname}
                onChange={handleChange}
                disabled={isLoading}
                className={fieldErrors.firstname ? "border-red-500" : ""}
              />
              {fieldErrors.firstname && (
                <p id="firstname-error" role="alert" className="text-sm text-destructive">{fieldErrors.firstname}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                id="lastname"
                name="lastname"
                type="text"
                dir="auto"
                autoComplete="family-name"
                {...fieldAccessibility("lastname")}
                placeholder="Doe"
                value={formData.lastname}
                onChange={handleChange}
                disabled={isLoading}
                className={fieldErrors.lastname ? "border-red-500" : ""}
              />
              {fieldErrors.lastname && (
                <p id="lastname-error" role="alert" className="text-sm text-destructive">{fieldErrors.lastname}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                lang="en"
                dir="ltr"
                autoComplete="email"
                {...fieldAccessibility("email")}
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className={fieldErrors.email ? "border-red-500" : ""}
              />
              {fieldErrors.email && (
                <p id="email-error" role="alert" className="text-sm text-destructive">{fieldErrors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                dir="auto"
                autoComplete="username"
                {...fieldAccessibility("username")}
                placeholder="johndoe"
                value={formData.username}
                onChange={handleChange}
                disabled={isLoading}
                className={fieldErrors.username ? "border-red-500" : ""}
              />
              {fieldErrors.username && (
                <p id="username-error" role="alert" className="text-sm text-destructive">{fieldErrors.username}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                lang="en"
                dir="ltr"
                autoComplete="new-password"
                {...fieldAccessibility("password")}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className="register-password-input pr-11"
              />
              <button
                aria-label={showPassword ? "Hide password" : "Show password"}
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="register-password-toggle absolute right-3 top-8 grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
              {fieldErrors.password && (
                <p id="password-error" role="alert" className="text-sm text-destructive">{fieldErrors.password}</p>
              )}
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                lang="en"
                dir="ltr"
                autoComplete="new-password"
                {...fieldAccessibility("confirmPassword")}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                className="register-password-input pr-11"
              />
              <button
                aria-label={
                  showConfirmPassword
                    ? "Hide confirmation password"
                    : "Show confirmation password"
                }
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="register-password-toggle absolute right-3 top-8 grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary"
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
              {fieldErrors.confirmPassword && (
                <p id="confirmPassword-error" role="alert" className="text-sm text-destructive">
                  {fieldErrors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                lang="en"
                dir="ltr"
                autoComplete="tel"
                {...fieldAccessibility("phone")}
                placeholder="+1-555-0123"
                value={formData.phone}
                onChange={handleChange}
                disabled={isLoading}
                className={fieldErrors.phone ? "border-red-500" : ""}
              />
              {fieldErrors.phone && (
                <p id="phone-error" role="alert" className="text-sm text-destructive">{fieldErrors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                name="street"
                type="text"
                dir="auto"
                autoComplete="street-address"
                {...fieldAccessibility("street")}
                placeholder="123 Main Street"
                value={formData.street}
                onChange={handleChange}
                disabled={isLoading}
                className={fieldErrors.street ? "border-red-500" : ""}
              />
              {fieldErrors.street && (
                <p id="street-error" role="alert" className="text-sm text-destructive">{fieldErrors.street}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              type="text"
              dir="auto"
              autoComplete="address-level2"
              {...fieldAccessibility("city")}
              placeholder="New York"
              value={formData.city}
              onChange={handleChange}
              disabled={isLoading}
              className={fieldErrors.city ? "border-red-500" : ""}
            />
            {fieldErrors.city && (
              <p id="city-error" role="alert" className="text-sm text-destructive">{fieldErrors.city}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="mt-6 flex flex-col space-y-4 px-5 sm:px-8">
          <Button type="submit" className="h-12 w-full rounded-xl text-base" disabled={isLoading}>
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
  );
}
