import type { Metadata } from "next";
import { ClassDetailContainer } from "@/features/classes";

export const metadata: Metadata = {
  title: "Báo cáo điểm danh | APIX English Center",
  description: "Chi tiết lịch sử chuyên cần lớp học.",
};

export default async function ClassAttendancePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ClassDetailContainer id={id} initialTab="attendance" />;
}
