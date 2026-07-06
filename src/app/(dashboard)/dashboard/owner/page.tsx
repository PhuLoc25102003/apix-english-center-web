"use client";

import { OwnerDashboard } from "@/features/dashboard/components/owner-dashboard";
import { PageHeader } from "@/components/common/page-header";

export default function OwnerDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Bảng Quản Trị Hệ Thống (Chủ sở hữu)"
        description="Theo dõi doanh thu, sự chuyên cần và báo cáo tổng hợp chi tiết."
      />
      <OwnerDashboard />
    </div>
  );
}
