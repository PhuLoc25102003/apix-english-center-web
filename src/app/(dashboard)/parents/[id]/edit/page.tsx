import type { Metadata } from "next";
import { ParentEditContainer } from "@/features/parents/components/parent-edit-container";

export const metadata: Metadata = {
  title: "Chỉnh sửa phụ huynh | APIX English Center",
  description: "Cập nhật hồ sơ phụ huynh trong hệ thống quản lý APIX.",
};

export default async function ParentEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ParentEditContainer id={id} />;
}
