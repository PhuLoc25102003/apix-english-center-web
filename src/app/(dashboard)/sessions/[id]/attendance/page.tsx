import type { Metadata } from "next";
import { MarkAttendanceContainer } from "@/features/attendance";

/**
 * src/app/(dashboard)/sessions/[id]/attendance/page.tsx
 *
 * Mark Attendance route page. Resolves Next.js async parameters
 * and renders the main attendance coordinator container.
 */

export const metadata: Metadata = {
  title: "Điểm danh học viên | APIX English Center",
  description: "Đánh dấu chuyên cần, ghi chú học tập cho học viên trong buổi học.",
};

export default async function MarkAttendancePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <MarkAttendanceContainer sessionId={id} />;
}
