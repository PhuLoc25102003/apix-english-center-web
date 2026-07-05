import type { Metadata } from "next";

import { ClassDetailContainer } from "@/features/classes";

export const metadata: Metadata = {
  title: "Chi tiết lớp học | APIX English Center",
  description: "Thông tin tổng quan, học viên, điểm danh và học phí của lớp học.",
};

export default async function ClassDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ClassDetailContainer id={id} />;
}
