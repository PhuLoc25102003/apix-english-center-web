import { z } from "zod";

/**
 * src/features/attendance/schemas/class-session.schema.ts
 *
 * Zod validation schema for Class Session CRUD operations.
 */

export const classSessionSchema = z
  .object({
    classId: z
      .string()
      .trim()
      .min(1, "Vui lòng chọn lớp học."),
    roomId: z
      .string()
      .trim()
      .min(1, "Vui lòng chọn phòng học."),
    scheduleId: z
      .string()
      .nullable()
      .optional(),
    sessionDate: z
      .string()
      .trim()
      .min(1, "Vui lòng chọn ngày học."),
    startTime: z
      .string()
      .trim()
      .min(1, "Vui lòng chọn giờ bắt đầu."),
    endTime: z
      .string()
      .trim()
      .min(1, "Vui lòng chọn giờ kết thúc."),
    lessonNo: z
      .number({ error: "Buổi học phải là một số." })
      .int("Buổi học phải là số nguyên.")
      .min(1, "Số buổi học phải lớn hơn 0.")
      .nullable()
      .optional(),
    status: z.enum(["PLANNED", "COMPLETED", "CANCELLED", "RESCHEDULED"], {
      error: "Trạng thái không hợp lệ.",
    }),
    note: z
      .string()
      .trim()
      .nullable()
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.startTime || !data.endTime) return true;
      return data.startTime < data.endTime;
    },
    {
      message: "Giờ bắt đầu phải sớm hơn giờ kết thúc.",
      path: ["endTime"],
    }
  );

export type ClassSessionFormValues = z.infer<typeof classSessionSchema>;
