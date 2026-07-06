"use client";

import { OfficeDashboard } from "@/features/dashboard/components/office-dashboard";
import { PageHeader } from "@/components/common/page-header";

export default function OfficeDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Bảng Nghiệp Vụ Giáo Vụ (Office Staff)"
        description="Quản lý chuyên cần hàng ngày và các yêu cầu phê duyệt thông tin lớp học."
      />
      <OfficeDashboard />
    </div>
  );
}
