import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string({ required_error: 'Email is required' }),
  password: z.string({ required_error: 'Password is required' }),
});

export const registerSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email' }),
  phone: z
    .string({ required_error: 'Phone number is required' })
    .min(11, { message: 'Phone number should be 11 digits' }),
  firstName: z
    .string({ required_error: 'Fullname is required' })
    .min(3, { message: 'Fullname should be at least 3 characters' }),
  lastName: z
    .string({ required_error: 'Fullname is required' })
    .min(3, { message: 'Fullname should be at least 3 characters' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, { message: 'Password should be at least 6 characters' }),
});
