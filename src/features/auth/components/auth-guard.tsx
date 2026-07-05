"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { refreshSessionRequest } from "@/features/auth/api/auth.api";
import { isAuthenticated } from "@/lib/auth/auth-status";
import { setCurrentUser } from "@/lib/auth/current-user-storage";
import { setAccessToken } from "@/lib/auth/token-storage";

type AuthGuardProps = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const hasToken = isAuthenticated();
  const sessionQuery = useQuery({
    queryKey: ["auth", "restore-session"],
    queryFn: async () => {
      const session = await refreshSessionRequest();
      setAccessToken(session.accessToken);
      setCurrentUser({
        ...session.user,
        roles: session.roles,
        permissions: session.permissions,
      });
      return true;
    },
    enabled: !hasToken,
    retry: false,
    staleTime: Infinity,
  });

  const isAllowed = hasToken || sessionQuery.data === true;

  React.useEffect(() => {
    if (!hasToken && sessionQuery.isError) {
      router.replace("/login");
    }
  }, [hasToken, router, sessionQuery.isError]);

  if (!isAllowed) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="h-9 w-9 animate-spin rounded-full border-4 border-[#FFE7E8] border-t-[#FF161A]" />
          <p className="text-sm font-semibold text-[#6B7280]">
            Đang khôi phục phiên đăng nhập...
          </p>
        </div>
      </div>
    );
  }

  return children;
}
