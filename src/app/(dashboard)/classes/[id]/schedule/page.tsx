import type { Metadata } from "next";
import { ClassDetailContainer } from "@/features/classes";

export const metadata: Metadata = {
  title: "Lịch học lớp học | APIX English Center",
  description: "Khung thời gian biểu cố định và lịch dạy.",
};

export default async function ClassSchedulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ClassDetailContainer id={id} initialTab="schedule" />;
}
