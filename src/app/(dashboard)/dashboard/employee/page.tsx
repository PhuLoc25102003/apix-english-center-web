"use client";

import { EmployeeDashboard } from "@/features/dashboard/components/employee-dashboard";
import { PageHeader } from "@/components/common/page-header";

export default function EmployeeDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Không Gian Làm Việc Cá Nhân (Employee Dashboard)"
        description="Xem sao kê tính lương cá nhân và quản lý ngày phép nghỉ."
      />
      <EmployeeDashboard />
    </div>
  );
}
