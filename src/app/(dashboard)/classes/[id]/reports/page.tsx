import type { Metadata } from "next";
import { ClassDetailContainer } from "@/features/classes";

export const metadata: Metadata = {
  title: "Nhận xét học tập | APIX English Center",
  description: "Các báo cáo đánh giá năng lực học viên định kỳ.",
};

export default async function ClassReportsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ClassDetailContainer id={id} initialTab="learning-reports" />;
}
