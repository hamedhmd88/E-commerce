import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/page-layout";
import { ApiUsersTable } from "@/components/account/api-users-table";

export const metadata: Metadata = {
  title: "Sample users",
  description: "Browse public Fake Store API users in a filterable table.",
};

export default function ApiUsersPage() {
  return (
    <PageLayout customLastLabel="Sample users" variant="catalog">
      <ApiUsersTable />
    </PageLayout>
  );
}
