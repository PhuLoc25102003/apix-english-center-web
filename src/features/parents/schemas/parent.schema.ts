import { z } from "zod";

/**
 * src/features/parents/schemas/parent.schema.ts
 *
 * Zod validation schema for Parent entities.
 */

export const parentSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Họ và tên không được để trống."),
  phone: z
    .string()
    .trim()
    .regex(/^(0|\+84)[0-9]{9,10}$/, "Số điện thoại Việt Nam không hợp lệ (ví dụ: 0912345678)."),
  email: z
    .string()
    .trim()
    .email("Email không hợp lệ.")
    .or(z.literal(""))
    .nullable(),
  address: z
    .string()
    .nullable(),
  jobTitle: z
    .string()
    .nullable(),
  note: z
    .string()
    .nullable(),
});

export type ParentFormValues = z.infer<typeof parentSchema>;
