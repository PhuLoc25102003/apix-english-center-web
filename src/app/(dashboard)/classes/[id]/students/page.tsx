import type { Metadata } from "next";
import { ClassDetailContainer } from "@/features/classes";

export const metadata: Metadata = {
  title: "Học viên lớp học | APIX English Center",
  description: "Danh sách học viên đã ghi danh.",
};

export default async function ClassStudentsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ClassDetailContainer id={id} initialTab="students" />;
}
