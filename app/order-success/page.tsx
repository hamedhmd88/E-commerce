import { localizedMetadata } from "@/lib/i18n/metadata";
import type { Metadata } from "next";
import { OrderSuccess } from "@/components/cart/order-success";
import { PageLayout } from "@/components/layout/page-layout";
import { Suspense } from "react";

export const generateMetadata = (): Promise<Metadata> =>
  localizedMetadata({
    title: "Demo Order",
    description: "Review a browser-local demonstration order.",
    robots: { index: false, follow: false },
  });

export default function OrderSuccessPage() {
  return (
    <PageLayout customLastLabel="Order Success">
      <Suspense
        fallback={<p className="py-16 text-center">Loading demo order...</p>}
      >
        <OrderSuccess />
      </Suspense>
    </PageLayout>
  );
}
