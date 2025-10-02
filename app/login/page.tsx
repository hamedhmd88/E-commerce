"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { Navigation } from "@/components/layout/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { Footer } from "@/components/layout/footer"
import { Skeleton } from "@/components/ui/skeleton"
import { PageLayout } from "@/components/layout/page-layout"

export default function LoginPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If user is already logged in, redirect to account
    if (!isLoading && user) {
      router.replace("/account")
    }
  }, [isLoading, user, router])

  // Show loading skeleton while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto space-y-4">
            <Skeleton className="h-8 w-3/4 mx-auto bg-muted rounded" /> 
            <Skeleton className="h-4 w-1/2 mx-auto bg-muted rounded" /> 
            <div className="space-y-4">
              <Skeleton className="h-10 w-full bg-muted rounded" /> 
              <Skeleton className="h-10 w-full bg-muted rounded" /> 
              <Skeleton className="h-10 w-full bg-muted rounded" /> 
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // If user is logged in, show loading while redirecting
  if (user) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto space-y-4">
            <Skeleton className="h-8 w-3/4 mx-auto bg-muted rounded" /> 
            <Skeleton className="h-4 w-1/2 mx-auto bg-muted rounded" /> 
            <div className="space-y-4">
              <Skeleton className="h-10 w-full bg-muted rounded" /> 
              <Skeleton className="h-10 w-full bg-muted rounded" /> 
              <Skeleton className="h-10 w-full bg-muted rounded" /> 
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Show login form only if user is not logged in
  return (
    <PageLayout customLastLabel="Login">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-balance">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account to continue shopping</p>
        </div>
        <LoginForm />
      </div>
    </PageLayout>
  )
}
