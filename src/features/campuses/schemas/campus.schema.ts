import { z } from "zod";

/**
 * src/features/campuses/schemas/campus.schema.ts
 *
 * Zod validation schema for Campus entities.
 */

export const campusSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, "Mã cơ sở không được để trống.")
    .max(50, "Mã cơ sở không được quá 50 ký tự."),
  name: z
    .string()
    .trim()
    .min(1, "Tên cơ sở không được để trống.")
    .max(100, "Tên cơ sở không được quá 100 ký tự."),
  phone: z
    .string()
    .trim()
    .regex(/^(0|\+84)[0-9]{9,10}$/, "Số điện thoại Việt Nam không hợp lệ (ví dụ: 0912345678).")
    .or(z.literal(""))
    .nullable(),
  address: z
    .string()
    .trim()
    .min(1, "Địa chỉ không được để trống.")
    .nullable(),
  description: z
    .string()
    .trim()
    .or(z.literal(""))
    .nullable(),
  isActive: z.boolean(),
});

export type CampusFormValues = z.infer<typeof campusSchema>;
