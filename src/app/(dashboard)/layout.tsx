import * as React from "react";
import { DashboardLayout as Layout } from "@/components/layout/dashboard-layout";
import { AuthGuard } from "@/features/auth/components/auth-guard";

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <Layout>{children}</Layout>
    </AuthGuard>
  );
}
