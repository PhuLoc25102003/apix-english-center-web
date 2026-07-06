"use client";

import { AttendanceMonitor } from "@/features/attendance/components/attendance-monitor";
import { PageHeader } from "@/components/common/page-header";

export default function AttendanceMonitorPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Bảng Theo Dõi Chuyên Cần (Attendance Monitor)"
        description="Theo dõi trực tiếp tiến độ điểm danh hôm nay, phát hiện trễ hạn quá 30 phút và hỗ trợ liên hệ phụ huynh học viên vắng mặt."
      />
      <AttendanceMonitor />
    </div>
  );
}
