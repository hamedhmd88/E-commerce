import { localizedMetadata } from "@/lib/i18n/metadata";
import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/page-layout";
import { ApiUsersTable } from "@/components/account/api-users-table";

export const generateMetadata = (): Promise<Metadata> =>
  localizedMetadata({
    title: "Sample users",
    description: "Browse public Fake Store API users in a filterable table.",
  });

export default function ApiUsersPage() {
  return (
    <PageLayout customLastLabel="Sample users" variant="catalog">
      <ApiUsersTable />
    </PageLayout>
  );
}
