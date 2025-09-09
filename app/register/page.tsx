import { Navigation } from "@/components/navigation"
import { RegisterForm } from "@/components/register-form"
import { Footer } from "@/components/footer"

export default function RegisterPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-balance">Create Account</h1>
            <p className="text-muted-foreground mt-2">Join us to start your shopping journey</p>
          </div>
          <RegisterForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
