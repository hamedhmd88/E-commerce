import { AccountDashboard } from "@/components/account/account-dashboard"
import { PageLayout } from "@/components/layout/page-layout"

export default function AccountPage() {
  return (
    <PageLayout customLastLabel="Account">
      <AccountDashboard />
    </PageLayout>
  )
}
