import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "At least 8 characters")
    .regex(/[a-zA-Z]/, "Include at least one letter")
    .regex(/[0-9]/, "Include at least one number"),
  terms: z.boolean().refine((v) => v === true, {
    message: "You must agree to the Terms to continue",
  }),
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
});
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const connectInstagramSchema = z.object({
  username: z.string().trim().min(1, "Enter your Instagram username"),
  password: z.string().min(1, "Enter your Instagram password"),
  rememberUsername: z.boolean().optional(),
});
export type ConnectInstagramInputForm = z.infer<typeof connectInstagramSchema>;
