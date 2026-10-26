import { z } from 'zod';

// Єдине джерело правди для валідації: використовується і на бекенді, і на фронтенді.
export const productInputSchema = z.object({
  name: z.string().trim().min(1).max(200),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9-]+$/),
  priceCents: z.number().int().nonnegative(),
});
