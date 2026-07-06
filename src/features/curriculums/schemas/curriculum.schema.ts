import { z } from "zod";

export const curriculumSchema = z.object({
  courseId: z.string().min(1, "Vui lòng chọn khóa học liên kết"),
  name: z.string().min(1, "Tên giáo trình không được để trống"),
  versionName: z.string().min(1, "Tên phiên bản không được để trống"),
  description: z.string().nullable().optional(),
  isActive: z.boolean().default(true),
});

export type CurriculumFormValues = z.infer<typeof curriculumSchema>;
