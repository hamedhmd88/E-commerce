import { CartPage } from "@/components/cart/cart-page";
import { PageLayout } from "@/components/layout/page-layout";

export default function Cart() {
  return (
    <PageLayout customLastLabel="Cart">
      <CartPage />
    </PageLayout>
  );
}
