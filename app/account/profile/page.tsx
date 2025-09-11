import { ProfilePage } from "@/components/account/profile-page";
import { PageLayout } from "@/components/layout/page-layout";

export default function Profile() {
  return (
    <PageLayout customLastLabel="Profile">
      <ProfilePage />
    </PageLayout>
  );
}
