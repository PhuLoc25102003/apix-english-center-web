import type { Metadata } from "next";
import { RoleListContainer } from "@/features/roles";

export const metadata: Metadata = {
  title: "Quản lý Vai Trò | APIX English Center",
  description: "Cấu hình nhóm vai trò truy cập chính thức của toàn bộ hệ thống APIX.",
};

export default function RolesPage() {
  return <RoleListContainer />;
}
