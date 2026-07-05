import type { Metadata } from "next";
import { StudentListContainer } from "@/features/students/components/student-list-container";

export const metadata: Metadata = {
  title: "Danh sách học viên | APIX English Center",
  description: "Quản lý danh sách học viên, độ tuổi, loại học viên, chế độ tài khoản và trạng thái hoạt động.",
};

export default function StudentsPage() {
  return <StudentListContainer />;
}
