import { z } from "zod";

export const userSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Họ và tên phải có ít nhất 2 ký tự")
      .max(100, "Họ và tên tối đa 100 ký tự")
      .transform((val) => val.trim()),
    email: z
      .string()
      .email("Email không hợp lệ")
      .nullable()
      .optional()
      .or(z.literal(""))
      .transform((val) => (val && val.trim() !== "" ? val.trim().toLowerCase() : null)),
    phone: z
      .string()
      .regex(/^[0-9]{9,11}$/, "Số điện thoại phải chứa 9-11 số")
      .nullable()
      .optional()
      .or(z.literal(""))
      .transform((val) => (val && val.trim() !== "" ? val.trim() : null)),
    username: z
      .string()
      .min(3, "Tên tài khoản phải từ 3 ký tự")
      .max(50, "Tên tài khoản tối đa 50 ký tự")
      .regex(/^[a-zA-Z0-9._-]+$/, "Tên tài khoản chỉ gồm chữ, số, dấu chấm, gạch dưới, gạch ngang")
      .nullable()
      .optional()
      .or(z.literal(""))
      .transform((val) => (val && val.trim() !== "" ? val.trim() : null)),
    temporaryPassword: z
      .string()
      .min(6, "Mật khẩu tạm thời phải từ 6 ký tự")
      .max(50, "Mật khẩu tối đa 50 ký tự")
      .nullable()
      .optional()
      .or(z.literal(""))
      .transform((val) => (val && val.trim() !== "" ? val : null)),
    status: z.enum(["ACTIVE", "INACTIVE", "LOCKED", "PENDING"]).default("PENDING"),
  })
  .refine(
    (data) => {
      // At least one of email, phone, or username should exist
      return !!(data.email || data.phone || data.username);
    },
    {
      message: "Phải cung cấp ít nhất Email, Số điện thoại hoặc Tên tài khoản",
      path: ["username"], // Attach the error to username field
    }
  );

export type UserFormValues = z.infer<typeof userSchema>;
