import type { Metadata } from "next";
import { PermissionListContainer } from "@/features/permissions";

export const metadata: Metadata = {
  title: "Danh mục Quyền Hạn | APIX English Center",
  description: "Tra cứu danh mục quyền truy cập hệ thống của APIX English Center.",
};

export default function PermissionsPage() {
  return <PermissionListContainer />;
}
