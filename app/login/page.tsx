import { Navigation } from "@/components/layout/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { Footer } from "@/components/layout/footer"

export default function LoginPage() {
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
