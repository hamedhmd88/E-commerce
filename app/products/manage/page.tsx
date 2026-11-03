import { localizedMetadata } from "@/lib/i18n/metadata";
import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/page-layout";
import { ResourceWorkbench } from "@/components/api-resources/resource-workbench";

export const generateMetadata = (): Promise<Metadata> =>
  localizedMetadata({
    title: "Product API tools",
    description:
      "Explore Fake Store API product methods in the Morrow sample workspace.",
  });

export default function ProductToolsPage() {
  return (
    <PageLayout customLastLabel="Product tools" variant="catalog">
      <ResourceWorkbench resource="products" />
    </PageLayout>
  );
}
