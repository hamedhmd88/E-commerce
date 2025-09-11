import { Navigation } from "@/components/layout/navigation"
import { OrderSuccess } from "@/components/cart/order-success"
import { Footer } from "@/components/layout/footer"
import { PageLayout } from "@/components/layout/page-layout"

export default function OrderSuccessPage() {
  return (

        <PageLayout customLastLabel="Order Success">
          <OrderSuccess />
        </PageLayout>

  )
}
