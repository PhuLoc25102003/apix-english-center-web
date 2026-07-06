import { z } from "zod";

export const roleSchema = z.object({
  code: z
    .string()
    .min(2, "Mã vai trò phải có ít nhất 2 ký tự")
    .max(50, "Mã vai trò tối đa 50 ký tự")
    .regex(/^[A-Z0-9_]+$/, "Mã vai trò chỉ gồm chữ hoa, số và dấu gạch dưới")
    .transform((val) => val.trim().toUpperCase()),
  name: z
    .string()
    .min(2, "Tên vai trò phải có ít nhất 2 ký tự")
    .max(100, "Tên vai trò tối đa 100 ký tự")
    .transform((val) => val.trim()),
  description: z
    .string()
    .max(500, "Mô tả tối đa 500 ký tự")
    .nullable()
    .optional()
    .transform((val) => (val && val.trim() !== "" ? val.trim() : null)),
  isActive: z.boolean().default(true),
});

export type RoleFormValues = z.infer<typeof roleSchema>;
