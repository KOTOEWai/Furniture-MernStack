import { z } from "zod"

export const registerFormSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Full name must be at least 3 characters long" })
      .max(50, { message: "Full name must be under 50 characters" })
      .trim(),

    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email address" }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(100, { message: "Password is too long" }),

    confirmPassword: z.string().min(1, { message: "Please confirm password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })

  export const loginFormSchema = z.object({
    email: z 
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email address" }),

    password: z 
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(100, { message: "Password is too long" }),
  })