import { z } from "zod";

export const createSessionSchema = z.object({
  classId: z.string().min(1, "Vui lòng chọn lớp học"),
  studentId: z.string().min(1, "Vui lòng chọn học viên"),
  videoType: z.string().min(1, "Vui lòng chọn loại video"),
  targetMonth: z.string().min(1, "Vui lòng chọn tháng áp dụng"),
  title: z.string().min(3, "Tiêu đề phải từ 3 ký tự trở lên").max(100, "Tiêu đề không quá 100 ký tự"),
  description: z.string().max(500, "Mô tả không quá 500 ký tự").optional(),
});

export type CreateSessionFormValues = z.infer<typeof createSessionSchema>;

export const rejectVideoSchema = z.object({
  reason: z.string().min(3, "Lý do từ chối phải từ 3 ký tự trở lên").max(200, "Lý do không quá 200 ký tự"),
});

export type RejectVideoFormValues = z.infer<typeof rejectVideoSchema>;
