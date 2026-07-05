import { z } from "zod";

import { courseStatuses } from "../types/course.type";

export const courseSchema = z.object({
  levelId: z.string().trim().min(1, "Vui lòng chọn cấp độ."),
  code: z
    .string()
    .trim()
    .min(1, "Mã khóa học không được để trống.")
    .max(50, "Mã khóa học không được quá 50 ký tự."),
  name: z
    .string()
    .trim()
    .min(1, "Tên khóa học không được để trống.")
    .max(150, "Tên khóa học không được quá 150 ký tự."),
  description: z.string().trim().nullable(),
  totalLessons: z
    .number({ error: "Tổng số buổi học là bắt buộc." })
    .int("Tổng số buổi học phải là số nguyên.")
    .min(1, "Tổng số buổi học phải lớn hơn 0."),
  durationMinutes: z
    .number({ error: "Thời lượng là bắt buộc." })
    .int("Thời lượng phải là số nguyên.")
    .min(1, "Thời lượng phải lớn hơn 0."),
  defaultMonthlyTuitionFee: z
    .number({ error: "Học phí tháng tham khảo là bắt buộc." })
    .min(0, "Học phí tháng tham khảo không được âm."),
  status: z.enum(courseStatuses, { error: "Vui lòng chọn trạng thái." }),
});

export type CourseFormValues = z.infer<typeof courseSchema>;
