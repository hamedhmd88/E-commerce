import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/page-layout";
import { ResourceWorkbench } from "@/components/api-resources/resource-workbench";

export const metadata: Metadata = {
  title: "User API methods",
  description:
    "Try the public Fake Store API user methods in a demo workbench.",
};

export default function ManageUsersPage() {
  return (
    <PageLayout customLastLabel="User API methods" variant="catalog">
      <ResourceWorkbench resource="users" />
    </PageLayout>
  );
}
