import * as z from "zod"

export const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
    termsAndConditionsCheck: z.literal(
      true,
      "Please accept the terms and conditions to continue."
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  })
export type SignUpForm = z.infer<typeof signUpSchema>

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})
export type LoginForm = z.infer<typeof loginSchema>
