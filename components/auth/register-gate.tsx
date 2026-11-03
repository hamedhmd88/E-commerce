"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { RegisterForm } from "@/components/auth/register-form";

export function RegisterGate() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) router.replace("/account");
  }, [isLoading, user, router]);

  if (isLoading || user) {
    return (
      <div
        className="mx-auto max-w-xl space-y-4 py-10"
        aria-label="Checking demo session"
      >
        <div className="h-10 w-2/3 animate-pulse rounded-xl bg-muted motion-reduce:animate-none" />
        <div className="h-96 animate-pulse rounded-[2rem] bg-muted/60 motion-reduce:animate-none" />
      </div>
    );
  }

  return <RegisterForm />;
}
