import { z } from "zod";

/**
 * src/features/levels/schemas/level.schema.ts
 *
 * Zod validation schema for Level entities.
 */

export const levelSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, "Mã cấp độ không được để trống.")
    .max(50, "Mã cấp độ không được quá 50 ký tự."),
  name: z
    .string()
    .trim()
    .min(1, "Tên cấp độ không được để trống.")
    .max(100, "Tên cấp độ không được quá 100 ký tự."),
  orderIndex: z
    .number({ error: "Thứ tự sắp xếp phải là một số." })
    .int("Thứ tự sắp xếp phải là số nguyên.")
    .min(0, "Thứ tự sắp xếp phải lớn hơn hoặc bằng 0."),
  description: z
    .string()
    .trim()
    .or(z.literal(""))
    .nullable(),
  isActive: z.boolean().default(true),
});

export type LevelFormValues = z.infer<typeof levelSchema>;
