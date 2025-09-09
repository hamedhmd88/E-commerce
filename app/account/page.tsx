import { Navigation } from "@/components/layout/navigation"
import { AccountDashboard } from "@/components/account/account-dashboard"
import { Footer } from "@/components/layout/footer"

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
