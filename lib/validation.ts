import { z } from 'zod'

export const userFormValidation = z.object({
    username: z.string()
    .min(2, "Username must be at least 2 characters.")
    .max(50, "Name bust be at most 50 characters"),
email: z.string().email("Invalid email adress."),
phone: z.string().refine((phone) => /^\+?[1-9]\d{1,14}$/.test(phone), 'Invalid phone number')
  })