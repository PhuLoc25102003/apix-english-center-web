import { z } from "zod";

export const employeeSchema = z
  .object({
    employeeCode: z
      .string()
      .min(1, "Mã nhân viên không được để trống")
      .transform((val) => val.toUpperCase().trim()),
    fullName: z.string().min(1, "Họ và tên không được để trống"),
    userId: z.string().nullable().optional(),
    employmentStatus: z.enum(["ACTIVE", "INACTIVE", "ON_LEAVE", "TERMINATED"], {
      message: "Trạng thái nhân sự không hợp lệ",
    }),
    dateOfBirth: z.string().nullable().optional(),
    gender: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    emergencyContactName: z.string().nullable().optional(),
    emergencyContactPhone: z.string().nullable().optional(),
    hiredDate: z.string().min(1, "Ngày vào làm không được để trống"),
    resignedDate: z.string().nullable().optional(),
    campusId: z.string().nullable().optional(),
    note: z.string().nullable().optional(),
    positionIds: z.array(z.string()).optional().default([]),
  })
  .refine(
    (data) => {
      if (data.hiredDate && data.resignedDate) {
        return new Date(data.resignedDate) >= new Date(data.hiredDate);
      }
      return true;
    },
    {
      message: "Ngày nghỉ việc phải sau hoặc bằng ngày vào làm",
      path: ["resignedDate"],
    }
  );

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
