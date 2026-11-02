"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBag, Package } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import {
  clearDemoOrders,
  getDemoOrders,
  type DemoOrder,
} from "@/lib/demo-orders";

export function OrdersPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<DemoOrder[]>([]);
  useEffect(() => {
    setOrders(getDemoOrders());
  }, []);
  useEffect(() => { if (!isLoading && !user) router.replace("/login?redirect=/account/orders"); }, [isLoading, user, router]);

  if (isLoading || !user) return <div className="py-20 text-center text-muted-foreground">Loading your demo orders…</div>;

  return (
    <div className="mx-auto max-w-6xl space-y-6 py-4 lg:py-7">
      <div className="glass-panel rounded-[1.75rem] p-6 sm:p-8">
        <p className="mb-2 text-xs font-semibold tracking-[.16em] text-primary">YOUR SPACE / ORDERS</p><h1 className="mb-2 font-serif text-3xl">My Orders</h1>
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
              className="glass-panel block rounded-2xl p-5 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-primary motion-reduce:transform-none"
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
        <div className="glass-panel rounded-[1.75rem] px-6 py-14 text-center">
          <span className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Package className="size-8" /></span>
          <h2 className="mb-3 font-serif text-2xl">No demo orders yet</h2>
          <p className="mx-auto mb-6 max-w-md text-muted-foreground">
            Try the simulated checkout flow to see an order appear here. No real payment or delivery takes place.
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
