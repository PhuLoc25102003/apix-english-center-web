import type { Metadata } from "next";
import { StudentCreateContainer } from "@/features/students/components/student-create-container";

export const metadata: Metadata = {
  title: "Thêm học viên | APIX English Center",
  description: "Tạo mới hồ sơ học viên trong hệ thống quản lý APIX.",
};

export default function StudentCreatePage() {
  return <StudentCreateContainer />;
}
