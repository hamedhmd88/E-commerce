"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getDemoOrders, type DemoOrder } from "@/lib/demo-orders";
import { useLanguage } from "@/components/layout/language-provider";

export function OrderSuccess() {
  const { locale } = useLanguage();
  const id = useSearchParams().get("id");
  const [order, setOrder] = useState<DemoOrder | null>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setOrder(getDemoOrders().find((item) => item.id === id) ?? null);
    setLoaded(true);
  }, [id]);
  return (
    <div className="mx-auto max-w-2xl py-16 text-center space-y-6">
      <h1 className="text-3xl font-bold">
        {!loaded
          ? "Loading demo order..."
          : order
            ? "Demo order placed"
            : "Order not found"}
      </h1>
      {order ? (
        <Card>
          <CardContent className="p-6 text-left space-y-3">
            <p className="font-semibold">{order.id}</p>
            <p className="text-muted-foreground">
              {order.status} ·{" "}
              {new Date(order.createdAt).toLocaleDateString(
                locale === "fa" ? "fa-IR" : "en-US",
              )}
            </p>
            <p>
              {order.items.length} product{order.items.length === 1 ? "" : "s"}{" "}
              · ${order.total.toFixed(2)}
            </p>
            <div className="border-t pt-3 space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-3 text-sm"
                >
                  <span lang="en" dir="ltr" data-i18n-ignore>
                    {item.title} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 text-sm space-y-1">
              <p className="flex justify-between">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span>Shipping</span>
                <span>${order.shipping.toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span>Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </p>
              {order.discount > 0 && (
                <p className="flex justify-between">
                  <span>Demo discount</span>
                  <span>−${order.discount.toFixed(2)}</span>
                </p>
              )}
              <p className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </p>
            </div>
            <p className="text-sm">
              Demo payment:{" "}
              {order.paymentMethod === "demo-express" ? "Express" : "Standard"}
            </p>
            <p className="text-sm text-muted-foreground">
              Contact: {order.email}
              <br />
              Entered address: {order.address}
            </p>
            <p className="text-sm text-muted-foreground">
              Saved in this browser for demonstration. No payment, shipping,
              email, or SMS occurred.
            </p>
          </CardContent>
        </Card>
      ) : (
        <p className="text-muted-foreground">
          Open an order from your demo order history or place a new one.
        </p>
      )}
      <div className="flex justify-center gap-3">
        <Button asChild>
          <Link href="/account/orders">View orders</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/products">Continue shopping</Link>
        </Button>
      </div>
    </div>
  );
}
