import { z } from "zod";

/**
 * src/features/attendance/schemas/mark-attendance.schema.ts
 *
 * Zod validation schema for student attendance batch submissions.
 */

export const markAttendanceSchema = z.object({
  sessionId: z
    .string()
    .trim()
    .min(1, "Session ID is required."),
  records: z
    .array(
      z.object({
        studentId: z
          .string()
          .trim()
          .min(1, "Student ID is required."),
        status: z.enum(["PRESENT", "ABSENT", "LATE", "EXCUSED"], {
          error: "Trạng thái không hợp lệ.",
        }),
        note: z
          .string()
          .trim()
          .nullable()
          .optional(),
      })
    )
    .min(1, "Danh sách học viên không được trống."),
});

export type MarkAttendanceFormValues = z.infer<typeof markAttendanceSchema>;
