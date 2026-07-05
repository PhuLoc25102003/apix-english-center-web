import type { Metadata } from "next";
import { ParentListContainer } from "@/features/parents/components/parent-list-container";

export const metadata: Metadata = {
  title: "Danh sách phụ huynh | APIX English Center",
  description: "Quản lý danh sách phụ huynh, thông tin liên lạc và mối liên kết học sinh.",
};

export default function ParentsPage() {
  return <ParentListContainer />;
}
