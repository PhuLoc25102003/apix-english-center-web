import * as React from "react";
import { DashboardLayout as Layout } from "@/components/layout/dashboard-layout";

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
