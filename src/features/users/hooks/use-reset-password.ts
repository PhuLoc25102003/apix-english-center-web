import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { userApi } from "../api/user.api";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useResetPassword() {
  return useMutation<ApiResponse<{ temporaryPassword?: string }>, ApiError, string>({
    mutationFn: (userId) => userApi.resetPassword(userId),
    onSuccess: (response) => {
      const tempPass = response.data?.temporaryPassword;
      if (tempPass) {
        toast.success(`Đặt lại mật khẩu thành công! Mật khẩu mới là: ${tempPass}`, {
          duration: 10000,
        });
      } else {
        toast.success(response.message || "Đặt lại mật khẩu thành công!");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi đặt lại mật khẩu.");
    },
  });
}
