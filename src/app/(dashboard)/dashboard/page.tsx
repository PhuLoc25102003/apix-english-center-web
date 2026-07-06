"use client";

import * as React from "react";
import { PageHeader } from "@/components/common/page-header";
import { getCurrentUser } from "@/lib/auth/current-user-storage";
import { OwnerDashboard } from "@/features/dashboard/components/owner-dashboard";
import { OfficeDashboard } from "@/features/dashboard/components/office-dashboard";
import { TeacherDashboard } from "@/features/dashboard/components/teacher-dashboard";
import { EmployeeDashboard } from "@/features/dashboard/components/employee-dashboard";

export default function DashboardPage() {
  const user = getCurrentUser();
  const roles = user?.roles ?? [];

  // Determine dashboard view based on permissions or roles
  const renderDashboard = () => {
    if (roles.includes("SUPER_ADMIN") || roles.includes("OWNER") || roles.includes("MANAGER")) {
      return <OwnerDashboard />;
    }
    if (roles.includes("STAFF")) {
      return <OfficeDashboard />;
    }
    if (roles.includes("TEACHER")) {
      return <TeacherDashboard />;
    }
    return <EmployeeDashboard />;
  };

  const getDashboardTitle = () => {
    if (roles.includes("SUPER_ADMIN") || roles.includes("OWNER") || roles.includes("MANAGER")) {
      return "Bảng quản trị trung tâm";
    }
    if (roles.includes("STAFF")) {
      return "Bảng điều hành nghiệp vụ";
    }
    if (roles.includes("TEACHER")) {
      return "Bảng quản lý lớp giảng dạy";
    }
    return "Không gian làm việc cá nhân";
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <PageHeader
          title={getDashboardTitle()}
          description={`Chào mừng trở lại, ${user?.fullName ?? "Thành viên APIX"}. Hệ thống đã đồng bộ dữ liệu lúc ${new Date().toLocaleTimeString("vi-VN")}.`}
        />
      </div>
      {renderDashboard()}
    </div>
  );
}
