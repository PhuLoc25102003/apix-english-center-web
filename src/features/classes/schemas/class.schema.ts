import { z } from "zod";

import { classStatuses } from "../types/class.type";

export const classSchema = z
  .object({
    courseId: z.string().trim().min(1, "Vui lòng chọn khóa học."),
    campusId: z.string().trim().min(1, "Vui lòng chọn cơ sở."),
    name: z
      .string()
      .trim()
      .min(1, "Tên lớp không được để trống.")
      .max(150, "Tên lớp không được quá 150 ký tự."),
    capacity: z
      .number({ error: "Sức chứa là bắt buộc." })
      .int("Sức chứa phải là số nguyên.")
      .min(1, "Sức chứa phải lớn hơn 0."),
    startDate: z.string().min(1, "Ngày bắt đầu là bắt buộc."),
    expectedEndDate: z.string().min(1, "Ngày kết thúc dự kiến là bắt buộc."),
    status: z.enum(classStatuses, { error: "Vui lòng chọn trạng thái." }),
    note: z.string().trim().nullable(),
  })
  .superRefine((values, context) => {
    if (
      values.startDate &&
      values.expectedEndDate &&
      values.startDate > values.expectedEndDate
    ) {
      context.addIssue({
        code: "custom",
        path: ["expectedEndDate"],
        message: "Ngày kết thúc dự kiến phải bằng hoặc sau ngày bắt đầu.",
      });
    }
  });

export type ClassFormValues = z.infer<typeof classSchema>;
