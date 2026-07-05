import type { Metadata } from "next";
import { StudentDetailContainer } from "@/features/students/components/student-detail-container";

export const metadata: Metadata = {
  title: "Hồ sơ học viên | APIX English Center",
  description: "Chi tiết hồ sơ học viên, thông tin lớp học và các quyền truy cập tài khoản liên kết.",
};

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <StudentDetailContainer id={id} />;
}
