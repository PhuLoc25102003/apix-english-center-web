import type { Metadata } from "next";
import { ClassDetailContainer } from "@/features/classes";

export const metadata: Metadata = {
  title: "Điểm số lớp học | APIX English Center",
  description: "Cập nhật kết quả thi cử & kiểm tra định kỳ.",
};

export default async function ClassScoresPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ClassDetailContainer id={id} initialTab="scores" />;
}
