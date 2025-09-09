import { Navigation } from "@/components/layout/navigation"
import { ProfilePage } from "@/components/account/profile-page"
import { Footer } from "@/components/layout/footer"

export default function Profile() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <ProfilePage />
      </main>
      <Footer />
    </div>
  )
}
