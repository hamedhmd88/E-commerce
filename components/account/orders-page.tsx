"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBag, Package } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  clearDemoOrders,
  getDemoOrders,
  type DemoOrder,
} from "@/lib/demo-orders";

export function OrdersPage() {
  const [orders, setOrders] = useState<DemoOrder[]>([]);
  useEffect(() => {
    setOrders(getDemoOrders());
  }, []);

  return (
    <div className="space-y-8">
      <div className="animate-in fade-in-0 slide-in-from-top-4 duration-700">
        <h1 className="text-3xl font-bold text-balance mb-4">My Orders</h1>
        <p className="text-muted-foreground">
          Demo orders saved in this browser. No shipping or payment takes place.
        </p>
        {orders.length > 0 && (
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              if (
                window.confirm("Clear all demo orders saved in this browser?")
              ) {
                clearDemoOrders();
                setOrders([]);
              }
            }}
          >
            Reset demo orders
          </Button>
        )}
      </div>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/order-success?id=${encodeURIComponent(order.id)}`}
              className="block rounded-xl border p-5 hover:bg-muted/40 focus-visible:outline-2 focus-visible:outline-primary"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <strong>{order.id}</strong>
                <span>${order.total.toFixed(2)}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString()} ·{" "}
                {order.status} · {order.items.length} products
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
          <Package className="h-16 w-16 mx-auto mb-6 text-muted-foreground/50" />
          <h2 className="text-2xl font-semibold mb-4">No orders yet</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            You haven&apos;t placed any orders yet. Start shopping to see your
            order history here.
          </p>
          <Link href="/products">
            <Button className="hover:scale-105 transition-transform">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Start Shopping
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
