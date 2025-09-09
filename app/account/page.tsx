import { Navigation } from "@/components/navigation"
import { AccountDashboard } from "@/components/account-dashboard"
import { Footer } from "@/components/footer"

export default function AccountPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <AccountDashboard />
      </main>
      <Footer />
    </div>
  )
}
