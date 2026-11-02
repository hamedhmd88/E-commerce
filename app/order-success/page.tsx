import { OrderSuccess } from "@/components/cart/order-success";
import { PageLayout } from "@/components/layout/page-layout";
import { Suspense } from "react";

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
