import type { Metadata } from "next";
import { StudentEditContainer } from "@/features/students/components/student-edit-container";

export const metadata: Metadata = {
  title: "Chỉnh sửa học viên | APIX English Center",
  description: "Cập nhật hồ sơ học viên trong hệ thống quản lý APIX.",
};

export default async function StudentEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <StudentEditContainer id={id} />;
}
