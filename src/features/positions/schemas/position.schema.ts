import { z } from "zod";

export const positionSchema = z.object({
  code: z
    .string()
    .min(1, "Mã chức vụ không được để trống")
    .transform((val) => val.toUpperCase().trim()),
  name: z.string().min(1, "Tên chức vụ không được để trống"),
  description: z.string().nullable().optional(),
  isTeachingPosition: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

export type PositionFormValues = z.infer<typeof positionSchema>;
