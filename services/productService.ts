import { z } from "zod";
import api from "./api";
import { CatalogRequestError, normalizeCatalogError } from "./catalog-error";
import { productSchema, type Product } from "@/lib/product-schema";
export { productSchema };
export type { Product };

async function getData(
  path: string,
  params?: { limit: number },
): Promise<unknown> {
  try {
    const response = await api.get(path, { params });
    return response.data;
  } catch (error) {
    normalizeCatalogError(error);
  }
}

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    return z.array(productSchema).parse(await getData("/products"));
  },
  async getProducts(limit?: number): Promise<Product[]> {
    return z
      .array(productSchema)
      .parse(await getData("/products", limit ? { limit } : undefined));
  },
  async getProduct(id: number): Promise<Product | null> {
    if (!Number.isInteger(id) || id <= 0) return null;
    try {
      const data = await getData(`/products/${id}`);
      return data ? productSchema.parse(data) : null;
    } catch (error) {
      if (error instanceof CatalogRequestError && error.status === 404)
        return null;
      throw error;
    }
  },
  async getProductsByCategory(category: string): Promise<Product[]> {
    return z
      .array(productSchema)
      .parse(
        await getData(`/products/category/${encodeURIComponent(category)}`),
      );
  },
  async getCategories(): Promise<string[]> {
    return z
      .array(z.string().min(1))
      .parse(await getData("/products/categories"));
  },
};
