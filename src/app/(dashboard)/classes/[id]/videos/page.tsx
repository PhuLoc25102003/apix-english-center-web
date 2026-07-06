import type { Metadata } from "next";
import { ClassDetailContainer } from "@/features/classes";

export const metadata: Metadata = {
  title: "Video lớp học | APIX English Center",
  description: "Quản lý video hoạt động và đánh giá học tập của lớp.",
};

export default async function ClassVideosPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ClassDetailContainer id={id} initialTab="videos" />;
}
