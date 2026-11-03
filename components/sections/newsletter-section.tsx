"use client";
import type React from "react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail } from "lucide-react";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState<string[]>([]);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const normalized = email.trim().toLowerCase();
    if (!normalized) return;
    if (subscribed.includes(normalized))
      return void toast.info(
        "This address has already been used in this demo session.",
      );
    setSubscribed((current) => [...current, normalized]);
    toast.success(
      "Demo signup saved for this page session. No email will be sent.",
    );
    setEmail("");
  };
  return (
    <section
      className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-14 lg:py-24"
      aria-labelledby="newsletter-title"
    >
      <div className="glass-panel grid overflow-hidden rounded-[2rem] lg:grid-cols-[.9fr_1.1fr]">
        <div className="newsletter-art relative min-h-[320px] overflow-hidden sm:min-h-[390px]">
          <Image
            src="/luxury-jewelry-elegant-accessories.jpg"
            alt="Jewelry and everyday objects arranged together"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/35 to-transparent" />
          <div className="newsletter-ring" aria-hidden="true" />
          <span className="absolute bottom-6 start-6 rounded-full border border-white/35 bg-black/30 px-4 py-2 text-sm text-white backdrop-blur-lg">
            A little inspiration, occasionally.
          </span>
        </div>
        <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
          <Mail className="mb-6 size-7 text-primary" aria-hidden="true" />
          <h2
            id="newsletter-title"
            className="max-w-lg text-4xl font-medium leading-tight tracking-[-.055em] sm:text-5xl"
          >
            Good finds are worth sharing.
          </h2>
          <p className="mt-5 max-w-lg leading-7 text-muted-foreground">
            Try the Morrow newsletter experience. This is an on-page demo: no
            email is sent or stored by a mailing service.
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <Input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              placeholder="Your email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 flex-1 rounded-xl border-border bg-background/70 px-4"
              required
            />
            <Button type="submit" className="h-12 rounded-xl px-5">
              Try signup <ArrowRight className="size-4" />
            </Button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">
            Demo only. The address stays in memory until this page reloads.
          </p>
        </div>
      </div>
    </section>
  );
}
