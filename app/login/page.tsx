"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { LoginForm } from "@/components/auth/login-form";
import { Skeleton } from "@/components/ui/skeleton";
import { PageLayout } from "@/components/layout/page-layout";
import { ShieldCheck, Sparkles, Heart, ShoppingBag } from "lucide-react";

export default function LoginPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is already logged in, redirect to account
    if (!isLoading && user) {
      router.replace("/account");
    }
  }, [isLoading, user, router]);

  return (
    <PageLayout customLastLabel="Login" variant="catalog">
      <div className="auth-scene mx-auto grid max-w-6xl gap-7 py-5 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-12 lg:py-10">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary"><Sparkles className="size-4" /> YOUR MORROW SPACE</span>
          <h1 className="mt-5 font-serif text-4xl leading-tight tracking-tight sm:text-5xl">Welcome back to the things you love.</h1>
          <p className="mt-4 max-w-md leading-7 text-muted-foreground">Sign in to explore your saved finds, demo orders, and profile in one calm space.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[{ icon: Heart, title: "Saved finds", copy: "Revisit your wishlist" }, { icon: ShoppingBag, title: "Demo orders", copy: "See your browser history" }, { icon: ShieldCheck, title: "Clear by design", copy: "No real payment or delivery" }].map(({ icon: Icon, title, copy }) => <div key={title} className="glass-panel flex items-center gap-3 rounded-2xl p-3.5"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="size-5" /></span><div><strong className="text-sm">{title}</strong><p className="text-xs text-muted-foreground">{copy}</p></div></div>)}
          </div>
        </div>
        <div className="min-w-0">{isLoading || user ? <div className="glass-panel space-y-4 rounded-[2rem] p-8"><Skeleton className="h-8 w-1/2" /><Skeleton className="h-12 w-full" /><Skeleton className="h-12 w-full" /><Skeleton className="h-12 w-full" /></div> : <LoginForm />}</div>
      </div>
    </PageLayout>
  );
}
