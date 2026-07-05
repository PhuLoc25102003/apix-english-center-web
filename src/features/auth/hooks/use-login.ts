"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { ApiError } from "@/lib/api";
import { setAccessToken } from "@/lib/auth/token-storage";
import { loginRequest } from "@/features/auth/api/auth.api";
import type { AuthResponse, LoginCredentials } from "@/features/auth/types/auth.type";

/**
 * useLogin — TanStack Query mutation hook for user authentication.
 *
 * Flow:
 *   LoginForm → mutate(credentials)
 *     → loginRequest (POST /auth/login)
 *       onSuccess → setAccessToken, toast, router.push("/dashboard")
 *       onError   → toast(error.message)
 *
 * Rules:
 *  - Components only call mutate() — zero API or storage logic inside components.
 */
export function useLogin() {
  const router = useRouter();

  return useMutation<AuthResponse, ApiError, LoginCredentials>({
    mutationFn: loginRequest,

    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      toast.success(`Chào mừng trở lại, ${data.user.fullName}!`);
      router.push("/dashboard");
    },

    onError: (error) => {
      toast.error(
        error.statusCode === 401
          ? "Email hoặc mật khẩu không đúng. Vui lòng thử lại."
          : error.message,
      );
    },
  });
}
