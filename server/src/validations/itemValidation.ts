import { z } from 'zod';

export const itemSchema = z.object({
  name: z.string().min(1, 'Name must be at least 1 character long'),
  price: z.number().int().positive('Price must be positive number'),
  description: z.string().optional(),
});

export const itemIDSchema = z.object({
  itemID: z.string().regex(/^[a-fA-F0-9]{24}$/, 'Invalid Item ID format'),
});
