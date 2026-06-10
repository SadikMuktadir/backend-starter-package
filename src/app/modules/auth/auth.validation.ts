import { z } from 'zod';

const registerUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email('Please provide a valid email address'),

    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password cannot be more than 20 characters'),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email('Please provide a valid email address'),

    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password cannot be more than 20 characters'),
  }),
});

export const authValidation = {
  registerUserValidationSchema,
  loginUserValidationSchema,
};
