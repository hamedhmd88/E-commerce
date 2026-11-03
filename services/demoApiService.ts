import api from "./api";
import {
  parsePublicUser,
  parsePublicUserWrite,
  parsePublicUsers,
  parseSampleCart,
  parseSampleCarts,
  type SampleCart,
  type SampleUser,
  type SampleUserWriteResult,
} from "@/lib/sample-api-schema";

export type { SampleCart, SampleUser, SampleUserWriteResult };

type SampleUserInput = {
  email?: string;
  username?: string;
  password?: string;
  name?: { firstname: string; lastname: string };
  phone?: string;
  address?: { city?: string; street?: string };
};

// Fake Store API's user controller reads these nested fields for every write
// method, including PATCH. The coordinates are placeholders for this demo.
function userWritePayload(input: SampleUserInput) {
  return {
    ...input,
    firstname: input.name?.firstname ?? "",
    lastname: input.name?.lastname ?? "",
    address: {
      city: input.address?.city ?? "",
      street: input.address?.street ?? "",
      geolocation: { lat: "0", long: "0" },
    },
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
    const { data } = await api.get<unknown>("/carts", { params });
    return parseSampleCarts(data);
  },
  async cart(id: number): Promise<SampleCart> {
    const { data } = await api.get<unknown>(`/carts/${id}`);
    return parseSampleCart(data);
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
    const { data } = await api.get<unknown>(`/carts/user/${userId}`, {
      params,
    });
    return parseSampleCarts(data);
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
    const { data } = await api.get<unknown>("/users", {
      params,
    });
    return parsePublicUsers(data);
  },
  async user(id: number): Promise<SampleUser> {
    const { data } = await api.get<unknown>(`/users/${id}`);
    return parsePublicUser(data);
  },
  async createUser(
    input: SampleUserInput & {
      email: string;
      username: string;
      password: string;
      name: { firstname: string; lastname: string };
    },
  ): Promise<SampleUserWriteResult> {
    const { data } = await api.post<unknown>("/users", userWritePayload(input));
    return parsePublicUserWrite(data);
  },
  async updateUser(
    id: number,
    input: SampleUserInput,
    method: "put" | "patch",
  ): Promise<SampleUserWriteResult> {
    const response = await api[method]<unknown>(
      `/users/${id}`,
      userWritePayload(input),
    );
    return parsePublicUserWrite(response.data);
  },
  async deleteUser(id: number): Promise<SampleUserWriteResult> {
    const { data } = await api.delete<unknown>(`/users/${id}`);
    return parsePublicUserWrite(data);
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
