import type { Metadata } from "next";
import { ParentDetailContainer } from "@/features/parents/components/parent-detail-container";

export const metadata: Metadata = {
  title: "Hồ sơ phụ huynh | APIX English Center",
  description: "Chi tiết thông tin liên lạc và mối liên kết học viên của phụ huynh.",
};

export default async function ParentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ParentDetailContainer id={id} />;
}
