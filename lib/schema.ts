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
export type SignUpFormScheme = z.infer<typeof signUpSchema>

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})
export type LoginFormScheme = z.infer<typeof loginSchema>

export const otpInputSchema = z
  .string()
  .regex(/^\d*$/, "OTP can only be numbers")
  .length(6, "OTP must be a 6-digit number")

export const otpQueryParamsSignUpSchema = z.object({
  email: z.email(),
  type: z.literal("email-verification"),
  name: z.string(),
  password: z.string(),
})
export const otpQueryParamsForgetPasswordSchema = z.object({
  email: z.email(),
  type: z.literal("forget-password"),
})

export type OtpSignUp = z.infer<typeof otpQueryParamsSignUpSchema>
export type OtpForgetPassword = z.infer<
  typeof otpQueryParamsForgetPasswordSchema
>

export const otpPageQueryParamSchema = z.discriminatedUnion("type", [
  otpQueryParamsSignUpSchema,
  otpQueryParamsForgetPasswordSchema,
])

export type OtpPageQueryParam = z.infer<typeof otpPageQueryParamSchema>
