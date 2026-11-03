import { z } from "zod";

const demoOrderSchema = z.object({
  id: z.string().min(1),
  createdAt: z.string().min(1),
  email: z.string(),
  name: z.string(),
  address: z.string(),
  paymentMethod: z.string(),
  items: z.array(
    z.object({
      id: z.number().int().positive(),
      title: z.string(),
      price: z.number().finite().nonnegative(),
      image: z.string(),
      quantity: z.number().int().positive(),
    }),
  ),
  subtotal: z.number().finite().nonnegative(),
  shipping: z.number().finite().nonnegative(),
  tax: z.number().finite().nonnegative(),
  discount: z.number().finite().nonnegative(),
  total: z.number().finite().nonnegative(),
  status: z.literal("Simulated order placed"),
});

export type DemoOrder = z.infer<typeof demoOrderSchema>;

const KEY = "portfolio-demo-orders-v1";
let memoryOrders: DemoOrder[] = [];
let memoryOnly = false;

export function getDemoOrders(): DemoOrder[] {
  if (typeof window === "undefined") return [];
  if (memoryOnly) return memoryOrders;
  try {
    const value: unknown = JSON.parse(localStorage.getItem(KEY) || "[]");
    memoryOrders = Array.isArray(value)
      ? value.flatMap((item) => {
          const result = demoOrderSchema.safeParse(item);
          return result.success ? [result.data] : [];
        })
      : [];
    return memoryOrders;
  } catch {
    memoryOnly = true;
    return memoryOrders;
  }
}

export function saveDemoOrder(order: DemoOrder): boolean {
  memoryOrders = [order, ...getDemoOrders()];
  try {
    localStorage.setItem(KEY, JSON.stringify(memoryOrders));
    return true;
  } catch {
    memoryOnly = true;
    return false;
  }
}

export function clearDemoOrders(): void {
  memoryOrders = [];
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(KEY);
    memoryOnly = false;
  } catch {
    memoryOnly = true;
  }
}

export function areDemoOrdersTemporary(): boolean {
  return memoryOnly;
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
