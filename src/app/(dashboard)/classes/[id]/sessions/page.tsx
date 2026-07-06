import type { Metadata } from "next";
import { ClassSessionsClient } from "./sessions-client";

/**
 * src/app/(dashboard)/classes/[id]/sessions/page.tsx
 *
 * Class-specific sessions route page. Resolves Next.js async params
 * and passes the class ID to the client-side session coordinator.
 */

export const metadata: Metadata = {
  title: "Danh sách buổi học lớp | APIX English Center",
  description: "Quản lý danh sách các buổi học của lớp học.",
};

export default async function ClassSessionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ClassSessionsClient classId={id} />;
}
