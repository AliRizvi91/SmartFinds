import { z } from 'zod';

export const createAdvertiserSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, 'Company name is required')
    .max(150, 'Company name is too long'),

  website: z
    .string()
    .trim()
    .url('Please enter a valid website URL'),

  industry: z
    .string()
    .trim()
    .max(100, 'Industry is too long')
    .optional()
    .or(z.literal('')),
});

export type CreateAdvertiserFormData =
  z.infer<typeof createAdvertiserSchema>;