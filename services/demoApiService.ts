import api from "./api";

export interface SampleCart {
  id: number;
  userId: number;
  date: string;
  products: { productId: number; quantity: number }[];
}

export interface SampleUser {
  id: number;
  username: string;
  email: string;
  name?: { firstname?: string; lastname?: string };
  phone?: string;
  address?: {
    city?: string;
    street?: string;
    number?: number;
    zipcode?: string;
    geolocation?: { lat?: string; long?: string };
  };
}

// The public API includes password fields in user responses. Keep only fields
// needed for this demo; never put returned credentials in React state.
function publicUser(value: Record<string, unknown>): SampleUser {
  const name =
    value.name && typeof value.name === "object"
      ? (value.name as Record<string, unknown>)
      : null;
  const address =
    value.address && typeof value.address === "object"
      ? (value.address as Record<string, unknown>)
      : null;
  const geo =
    address?.geolocation && typeof address.geolocation === "object"
      ? (address.geolocation as Record<string, unknown>)
      : null;
  return {
    id: Number(value.id),
    username: String(value.username ?? ""),
    email: String(value.email ?? ""),
    name: name
      ? {
          firstname:
            typeof name.firstname === "string" ? name.firstname : undefined,
          lastname:
            typeof name.lastname === "string" ? name.lastname : undefined,
        }
      : undefined,
    address: address
      ? {
          city: typeof address.city === "string" ? address.city : undefined,
          street:
            typeof address.street === "string" ? address.street : undefined,
          number:
            typeof address.number === "number" ? address.number : undefined,
          zipcode:
            typeof address.zipcode === "string" ? address.zipcode : undefined,
          geolocation: geo
            ? {
                lat: typeof geo.lat === "string" ? geo.lat : undefined,
                long: typeof geo.long === "string" ? geo.long : undefined,
              }
            : undefined,
        }
      : undefined,
    phone: typeof value.phone === "string" ? value.phone : undefined,
  };
}

export const demoApiService = {
  async carts(
    params: {
      limit?: number;
      sort?: "asc" | "desc";
      startdate?: string;
      enddate?: string;
    } = {},
  ): Promise<SampleCart[]> {
    const { data } = await api.get<SampleCart[]>("/carts", { params });
    return data;
  },
  async cart(id: number): Promise<SampleCart> {
    const { data } = await api.get<SampleCart>(`/carts/${id}`);
    return data;
  },
  async userCarts(
    userId: number,
    params: {
      limit?: number;
      sort?: "asc" | "desc";
      startdate?: string;
      enddate?: string;
    } = {},
  ): Promise<SampleCart[]> {
    const { data } = await api.get<SampleCart[]>(`/carts/user/${userId}`, {
      params,
    });
    return data;
  },
  async createCart(input: Omit<SampleCart, "id">): Promise<unknown> {
    const { data } = await api.post("/carts", input);
    return data;
  },
  async updateCart(
    id: number,
    input: Partial<Omit<SampleCart, "id">>,
    method: "put" | "patch",
  ): Promise<unknown> {
    const response = await api[method](`/carts/${id}`, input);
    return response.data;
  },
  async deleteCart(id: number): Promise<unknown> {
    const { data } = await api.delete(`/carts/${id}`);
    return data;
  },
  async users(
    params: { limit?: number; sort?: "asc" | "desc" } = {},
  ): Promise<SampleUser[]> {
    const { data } = await api.get<Record<string, unknown>[]>("/users", {
      params,
    });
    return data.map(publicUser);
  },
  async user(id: number): Promise<SampleUser> {
    const { data } = await api.get<Record<string, unknown>>(`/users/${id}`);
    return publicUser(data);
  },
  async createUser(input: {
    email: string;
    username: string;
    password: string;
    name: { firstname: string; lastname: string };
  }): Promise<SampleUser> {
    const { data } = await api.post<Record<string, unknown>>("/users", input);
    return publicUser(data);
  },
  async updateUser(
    id: number,
    input: {
      email?: string;
      username?: string;
      password?: string;
      name?: { firstname: string; lastname: string };
    },
    method: "put" | "patch",
  ): Promise<SampleUser> {
    const response = await api[method]<Record<string, unknown>>(
      `/users/${id}`,
      input,
    );
    return publicUser(response.data);
  },
  async deleteUser(id: number): Promise<SampleUser> {
    const { data } = await api.delete<Record<string, unknown>>(`/users/${id}`);
    return publicUser(data);
  },
  async sampleLogin(username: string, password: string): Promise<boolean> {
    const { data } = await api.post<{ token?: string }>("/auth/login", {
      username,
      password,
    });
    // Verify the endpoint response without retaining or displaying its token.
    return typeof data.token === "string" && data.token.length > 0;
  },
};
