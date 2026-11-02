import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/page-layout";
import { ApiStudio } from "@/components/api-studio/api-studio";

export const metadata: Metadata = {
  title: "API Studio",
  description:
    "Explore the public Fake Store API resources and simulated write operations inside the Morrow portfolio demo.",
};

export default function ApiStudioPage() {
  return (
    <PageLayout customLastLabel="API Studio" variant="catalog">
      <ApiStudio />
    </PageLayout>
  );
}
