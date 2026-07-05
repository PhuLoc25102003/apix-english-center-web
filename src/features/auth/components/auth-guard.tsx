"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { isAuthenticated } from "@/lib/auth/auth-status";

type AuthGuardProps = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const isAllowed = isAuthenticated();

  React.useEffect(() => {
    if (!isAllowed) {
      router.replace("/login");
    }
  }, [isAllowed, router]);

  if (!isAllowed) {
    return null;
  }

  return children;
}
