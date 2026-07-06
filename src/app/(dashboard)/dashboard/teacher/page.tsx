"use client";

import { TeacherDashboard } from "@/features/dashboard/components/teacher-dashboard";
import { PageHeader } from "@/components/common/page-header";

export default function TeacherDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Bảng Quản Lý Giảng Dạy (Teacher Board)"
        description="Quản lý lớp học được phân công và thực hiện nhiệm vụ học vụ."
      />
      <TeacherDashboard />
    </div>
  );
}
