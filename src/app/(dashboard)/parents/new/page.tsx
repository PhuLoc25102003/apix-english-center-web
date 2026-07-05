import type { Metadata } from "next";
import { ParentCreateContainer } from "@/features/parents/components/parent-create-container";

export const metadata: Metadata = {
  title: "Thêm phụ huynh | APIX English Center",
  description: "Tạo mới hồ sơ phụ huynh trong hệ thống quản lý APIX.",
};

export default function ParentCreatePage() {
  return <ParentCreateContainer />;
}
