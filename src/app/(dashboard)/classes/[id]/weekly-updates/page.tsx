import type { Metadata } from "next";
import { ClassDetailContainer } from "@/features/classes";

export const metadata: Metadata = {
  title: "Báo cáo tuần lớp học | APIX English Center",
  description: "Dữ liệu tóm tắt nội dung bài học hàng tuần cho phụ huynh.",
};

export default async function ClassWeeklyUpdatesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ClassDetailContainer id={id} initialTab="weekly-updates" />;
}
