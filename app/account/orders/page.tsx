import { OrdersPage } from "@/components/account/orders-page"
import { PageLayout } from "@/components/layout/page-layout"

export default function Orders() {
  return (
<PageLayout customLastLabel="Orders" >

  <OrdersPage />
</PageLayout>

  )
}
