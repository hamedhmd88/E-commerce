import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react"

export function OrderSuccess() {
  const orderNumber = `ORD-${Date.now().toString().slice(-6)}`

  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="mb-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-balance mb-4">Order Confirmed!</h1>
        <p className="text-muted-foreground text-pretty">
          Thank you for your purchase. Your order has been successfully placed and is being processed.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Order Details</h2>
              <p className="text-muted-foreground">Order Number: #{orderNumber}</p>
              <p className="text-muted-foreground">
                Estimated delivery: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium">Confirmation Email</p>
                  <p className="text-sm text-muted-foreground">Sent to your email address</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Package className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium">Order Tracking</p>
                  <p className="text-sm text-muted-foreground">Updates via email & SMS</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Button asChild size="lg">
          <Link href="/products">
            Continue Shopping
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <div>
          <Button variant="outline" asChild>
            <Link href="/account">View Order History</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
