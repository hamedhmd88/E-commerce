import { localizedMetadata } from "@/lib/i18n/metadata";
import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/page-layout";
import { ResourceWorkbench } from "@/components/api-resources/resource-workbench";

export const generateMetadata = (): Promise<Metadata> =>
  localizedMetadata({
    title: "Sample API carts",
    description: "Browse and try all public Fake Store API cart methods.",
  });

export default function ApiCartsPage() {
  return (
    <PageLayout customLastLabel="API carts" variant="catalog">
      <ResourceWorkbench resource="carts" />
    </PageLayout>
  );
}
