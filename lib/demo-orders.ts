export interface DemoOrderItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface DemoOrder {
  id: string;
  createdAt: string;
  email: string;
  name: string;
  address: string;
  paymentMethod: string;
  items: DemoOrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  status: "Simulated order placed";
}

const KEY = "portfolio-demo-orders-v1";

export function getDemoOrders(): DemoOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const value: unknown = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(value)
      ? value.filter((item): item is DemoOrder =>
          Boolean(
            item &&
            typeof item === "object" &&
            typeof item.id === "string" &&
            Array.isArray(item.items),
          ),
        )
      : [];
  } catch {
    return [];
  }
}

export function saveDemoOrder(order: DemoOrder): void {
  localStorage.setItem(KEY, JSON.stringify([order, ...getDemoOrders()]));
}

export function clearDemoOrders(): void {
  if (typeof window !== "undefined") localStorage.removeItem(KEY);
}

export function createDemoOrder(
  input: Omit<DemoOrder, "id" | "createdAt" | "status">,
): DemoOrder {
  return {
    ...input,
    id: `DEMO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: "Simulated order placed",
  };
}
