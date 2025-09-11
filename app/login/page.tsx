"use client"  // اضافه کردن این خط برای فعال کردن کد سمت کلاینت

import { useEffect } from "react"  // اضافه کردن import برای useEffect
import { useRouter } from "next/navigation"  // اضافه کردن import برای useRouter
import { useAuth } from "@/components/auth/auth-provider"  // اضافه کردن import برای useAuth
import { Navigation } from "@/components/layout/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { Footer } from "@/components/layout/footer"

export default function LoginPage() {
  const { user, isLoading } = useAuth()  // گرفتن وضعیت کاربر و لودینگ از useAuth
  const router = useRouter()  // برای ریدایرکت

  useEffect(() => {
    if (!isLoading && user) {  // اگر لودینگ تموم شده و کاربر وجود داره (یعنی داده‌ها در localStorage هست)
      router.push("/account")  // ریدایرکت به صفحه حساب کاربری
    }
  }, [isLoading, user, router])  // وابستگی‌ها

  if (!isLoading && user) {  // نمایش لودینگ یا چیزی در حین چک
    return <div>Redirecting...</div>
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-balance">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">Sign in to your account to continue shopping</p>
          </div>
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
