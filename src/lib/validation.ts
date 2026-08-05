import { z } from "zod";

/**
 * Translated: each schema is built by a get*Schema(t) function using the
 * current locale's `t`, called inside the component right before
 * useForm(), rather than exported as a static schema — zod messages are
 * plain strings baked in at schema-creation time, so there's no other
 * way to make them locale-aware.
 */
type T = (key: string) => string;

export function getRegisterSchema(t: T) {
  return z.object({
    fullName: z.string().trim().min(2, t("validation.fullName")),
    email: z.string().trim().email(t("validation.email")),
    password: z
      .string()
      .min(8, t("validation.passwordMin"))
      .regex(/[a-zA-Z]/, t("validation.passwordLetter"))
      .regex(/[0-9]/, t("validation.passwordNumber")),
    terms: z.boolean().refine((v) => v === true, {
      message: t("validation.terms"),
    }),
  });
}
export type RegisterInput = z.infer<ReturnType<typeof getRegisterSchema>>;

export function getForgotPasswordSchema(t: T) {
  return z.object({
    email: z.string().trim().email(t("validation.email")),
  });
}
export type ForgotPasswordInput = z.infer<ReturnType<typeof getForgotPasswordSchema>>;

export function getConnectInstagramSchema(t: T) {
  return z.object({
    username: z.string().trim().min(1, t("validation.igUsername")),
    password: z.string().min(1, t("validation.igPassword")),
    rememberUsername: z.boolean().optional(),
  });
}
export type ConnectInstagramInputForm = z.infer<ReturnType<typeof getConnectInstagramSchema>>;
