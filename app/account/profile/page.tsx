import { Navigation } from "@/components/navigation"
import { ProfilePage } from "@/components/profile-page"
import { Footer } from "@/components/footer"

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
