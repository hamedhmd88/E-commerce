import api from "./api"

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export const productService = {
  // Get all products
  getAllProducts: async (): Promise<Product[]> => {
    const response = await api.get("/products")
    return response.data
  },

  // Get products with limit
  getProducts: async (limit?: number): Promise<Product[]> => {
    const url = limit ? `/products?limit=${limit}` : "/products"
    const response = await api.get(url)
    return response.data
  },

  // Get single product
  getProduct: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },

  // Get products by category
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await api.get(`/products/category/${category}`)
    return response.data
  },

  // Get all categories
  getCategories: async (): Promise<string[]> => {
    const response = await api.get("/products/categories")
    return response.data
  },
}
