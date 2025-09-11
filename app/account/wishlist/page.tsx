import { WishlistPage } from "@/components/account/wishlist-page";
import { PageLayout } from "@/components/layout/page-layout";

export default function Wishlist() {
  return (
    <PageLayout customLastLabel="Wishlist">
      <WishlistPage />
    </PageLayout>
  );
}
