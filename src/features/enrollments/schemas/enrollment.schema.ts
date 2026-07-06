import { z } from "zod";

const isoDate = /^\d{4}-\d{2}-\d{2}$/;

export const enrollmentSchema = z
  .object({
    studentId: z.string().uuid("Vui lòng chọn học viên hợp lệ"),
    classId: z.string().uuid("Vui lòng chọn lớp học hợp lệ"),
    enrolledDate: z.string().regex(isoDate, "Ngày ghi danh phải có định dạng YYYY-MM-DD"),
    startDate: z.string().regex(isoDate, "Ngày bắt đầu phải có định dạng YYYY-MM-DD"),
    endDate: z.preprocess(
      (value) => (value === "" || value === undefined ? null : value),
      z.union([z.string().regex(isoDate, "Ngày kết thúc phải có định dạng YYYY-MM-DD"), z.null()]),
    ),
    status: z.enum(["TRIAL", "ACTIVE", "FROZEN", "TRANSFERRED", "COMPLETED", "CANCELLED"]),
    source: z.enum(["WALK_IN", "REFERRAL", "ONLINE", "OTHER"]),
    note: z.string().nullable().optional(),
  })
  .refine(
    (data) => !data.endDate || data.endDate >= data.startDate,
    { message: "Ngày kết thúc phải sau hoặc bằng ngày bắt đầu", path: ["endDate"] },
  );

export type EnrollmentFormValues = z.infer<typeof enrollmentSchema>;
