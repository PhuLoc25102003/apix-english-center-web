import { z } from "zod";

export const roomSchema = z.object({
  campusId: z.string().trim().min(1, "Vui lòng chọn cơ sở."),
  code: z
    .string()
    .trim()
    .min(1, "Mã phòng không được để trống.")
    .max(50, "Mã phòng không được quá 50 ký tự."),
  name: z
    .string()
    .trim()
    .min(1, "Tên phòng không được để trống.")
    .max(100, "Tên phòng không được quá 100 ký tự."),
  capacity: z
    .number({ error: "Sức chứa là bắt buộc." })
    .int("Sức chứa phải là số nguyên.")
    .min(1, "Sức chứa phải lớn hơn 0."),
  roomType: z.string().trim().nullable(),
  facilitiesNote: z.string().trim().nullable(),
  isActive: z.boolean(),
});

export type RoomFormValues = z.infer<typeof roomSchema>;
