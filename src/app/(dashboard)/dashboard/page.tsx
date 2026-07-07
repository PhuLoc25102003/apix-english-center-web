"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/current-user-storage";

export default function DashboardPage() {
  const router = useRouter();
  const user = getCurrentUser();
  const roles = user?.roles ?? [];

  React.useEffect(() => {
    if (!user) return;

    if (roles.includes("SUPER_ADMIN") || roles.includes("OWNER") || roles.includes("MANAGER")) {
      router.replace("/dashboard/owner");
    } else if (roles.includes("STAFF")) {
      router.replace("/dashboard/office");
    } else if (roles.includes("TEACHER")) {
      router.replace("/dashboard/teacher");
    } else if (roles.includes("STUDENT")) {
      router.replace("/student/dashboard");
    } else if (roles.includes("PARENT")) {
      router.replace("/parent/dashboard");
    } else {
      router.replace("/dashboard/employee");
    }
  }, [user, roles, router]);

  return (
    <div className="flex min-h-64 items-center justify-center">
      <span className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#FF161A]" />
    </div>
  );
}

