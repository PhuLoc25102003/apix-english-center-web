import { z } from "zod";

/**
 * Validation schema for the login credentials form.
 * Follows standard §11 and §19 for inline error copywriting.
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Vui lòng nhập địa chỉ email.")
    .email("Vui lòng nhập địa chỉ email hợp lệ."),
  password: z
    .string()
    .min(1, "Vui lòng nhập mật khẩu.")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
});
