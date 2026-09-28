import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters.')
    .max(100, 'Full name is too long.'),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Please enter a valid email address.'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(72, 'Password is too long.'),

  role: z.enum([
    'advertiser',
    'publisher',
  ]),
});

export type RegisterFormValues =
  z.infer<typeof registerSchema>;
