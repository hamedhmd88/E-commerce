import { z } from "zod";

const sampleCartSchema = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  date: z.string().min(1),
  products: z.array(
    z.object({
      productId: z.number().int().positive(),
      quantity: z.number().int().positive(),
    }),
  ),
});

const sampleUserSchema = z.object({
  id: z.number().int().positive(),
  username: z.string(),
  email: z.string(),
  name: z
    .object({
      firstname: z.string().optional(),
      lastname: z.string().optional(),
    })
    .optional(),
  phone: z.string().optional(),
  address: z
    .object({
      city: z.string().optional(),
      street: z.string().optional(),
      number: z.number().optional(),
      zipcode: z.string().optional(),
      geolocation: z
        .object({
          lat: z.string().optional(),
          long: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
});

export type SampleCart = z.infer<typeof sampleCartSchema>;
export type SampleUser = z.infer<typeof sampleUserSchema>;
export type SampleUserWriteResult = z.infer<typeof sampleUserWriteSchema>;

const sampleUserWriteSchema = sampleUserSchema.partial().extend({
  id: z.number().int().positive(),
});

export function parseSampleCart(value: unknown): SampleCart {
  return sampleCartSchema.parse(value);
}

export function parseSampleCarts(value: unknown): SampleCart[] {
  return z.array(sampleCartSchema).parse(value);
}

// Zod removes unknown fields, including passwords in public user responses.
export function parsePublicUser(value: unknown): SampleUser {
  return sampleUserSchema.parse(value);
}

export function parsePublicUsers(value: unknown): SampleUser[] {
  return z.array(sampleUserSchema).parse(value);
}

export function parsePublicUserWrite(value: unknown): SampleUserWriteResult {
  return sampleUserWriteSchema.parse(value);
}
