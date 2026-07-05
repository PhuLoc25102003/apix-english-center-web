import { z } from "zod";

/**
 * src/features/students/schemas/student.schema.ts
 *
 * Zod validation schema for Student entities.
 * Includes specific refinement checks for business logic constraints.
 */

export const studentSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(1, "Họ và tên không được để trống."),
    dateOfBirth: z
      .string()
      .trim()
      .min(1, "Ngày sinh không được để trống."),
    gender: z
      .string()
      .trim()
      .min(1, "Vui lòng chọn giới tính."),
    schoolName: z
      .string()
      .nullable(),
    grade: z
      .string()
      .nullable(),
    studentType: z.enum(["KINDERGARTEN", "CHILD", "TEENAGER", "ADULT"], {
      message: "Vui lòng chọn loại học viên.",
    }),
    accessMode: z.enum(["NO_ACCOUNT", "PARENT_MANAGED", "OWN_ACCOUNT"], {
      message: "Vui lòng chọn chế độ tài khoản.",
    }),
    status: z.enum(["ACTIVE", "INACTIVE"], {
      message: "Vui lòng chọn trạng thái hoạt động.",
    }),
  })
  .refine(
    (data) => {
      // For young students (KINDERGARTEN, CHILD), they cannot own their own account.
      if (
        (data.studentType === "KINDERGARTEN" || data.studentType === "CHILD") &&
        data.accessMode === "OWN_ACCOUNT"
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Học viên mầm non/tiểu học không thể chọn tài khoản riêng (OWN_ACCOUNT). Vui lòng chọn 'Không tài khoản' hoặc 'Phụ huynh quản lý'.",
      path: ["accessMode"],
    }
  );

export type StudentFormValues = z.infer<typeof studentSchema>;
