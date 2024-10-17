import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().email("Email is not in the required format"),
  password: z.string(),
});

export const registerFormSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Email is not in the required format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Your passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordFormSchema = z.object({
  email: z.string().email("Email is not in the required format"),
});

export const resetPasswordFormSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Your passwords do not match",
    path: ["confirmPassword"],
  });

export const additionalRegistrationInfoSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
});

export const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
});

export const notificationsFormSchema = z.object({
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
  mobile: z.boolean().default(false).optional(),
  communication_emails: z.boolean().default(false).optional(),
  social_emails: z.boolean().default(false).optional(),
  marketing_emails: z.boolean().default(false).optional(),
});

export const changeEmailFormSchema = z.object({
  email: z.string().email("Email is not in the required format"),
});
