"use client";

import * as React from "react";
import {
  ArrowLeft,
  BookOpen,
  Building2,
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  FileText,
  GraduationCap,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import { EmptyState } from "@/components/feedback/empty-state";
import { ErrorState } from "@/components/feedback/error-state";
import { LoadingState } from "@/components/feedback/loading-state";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ClassTuitionSection } from "@/features/tuition";
import { useClass } from "../hooks/use-class";
import { useClassEnrollments } from "../hooks/use-class-enrollments";
import { classStatusLabels, formatClassDate } from "./class-table";

interface ClassDetailContainerProps {
  id: string;
}

type ClassTab = "overview" | "students" | "attendance" | "tuition";

const tabs: Array<{
  value: ClassTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { value: "overview", label: "Tổng quan", icon: GraduationCap },
  { value: "students", label: "Học viên", icon: Users },
  { value: "attendance", label: "Điểm danh", icon: ClipboardCheck },
  { value: "tuition", label: "Học phí", icon: CreditCard },
];

export function ClassDetailContainer({ id }: ClassDetailContainerProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<ClassTab>("overview");
  const classQuery = useClass(id);
  const enrollmentsQuery = useClassEnrollments(id);

  if (classQuery.isLoading) {
    return <LoadingState variant="spinner" className="min-h-96" />;
  }

  if (classQuery.isError || !classQuery.data?.data) {
    return (
      <ErrorState
        title="Không thể tải thông tin lớp học"
        message={classQuery.error?.message || "Lớp học không tồn tại hoặc đã bị xóa."}
        onRetry={classQuery.refetch}
        isRetrying={classQuery.isRefetching}
      />
    );
  }

  const classItem = classQuery.data.data;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/classes")}
          className="inline-flex h-9 cursor-pointer items-center gap-1 rounded-lg px-3 text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại danh sách
        </Button>
      </div>

      <PageHeader
        title={classItem.name}
        description={`Chi tiết lớp ${classItem.classCode} · ${classItem.courseName || "Chưa có khóa học"}`}
        action={
          <StatusBadge
            status={classItem.status}
            customLabel={classStatusLabels[classItem.status]}
            className="px-3 py-1.5"
          />
        }
      />

      <div className="rounded-2xl border border-white/40 bg-white/40 p-2 shadow-xs backdrop-blur-md">
        <div
          role="tablist"
          aria-label="Thông tin lớp học"
          className="grid grid-cols-2 gap-1 sm:grid-cols-4"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.value;

            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`class-panel-${tab.value}`}
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  "flex cursor-pointer items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF161A]/40",
                  isActive
                    ? "bg-[#FF161A] text-white shadow-sm"
                    : "text-slate-600 hover:bg-white/70 hover:text-slate-900",
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === "overview" && (
        <section
          id="class-panel-overview"
          role="tabpanel"
          className="glass-card grid gap-5 rounded-2xl border border-white/40 p-6 shadow-xs sm:grid-cols-2 lg:grid-cols-3"
        >
          <DetailItem icon={GraduationCap} label="Mã lớp" value={classItem.classCode} mono />
          <DetailItem icon={GraduationCap} label="Tên lớp" value={classItem.name} />
          <DetailItem icon={BookOpen} label="Khóa học" value={classItem.courseName || "-"} />
          <DetailItem icon={Building2} label="Cơ sở" value={classItem.campusName || "-"} />
          <DetailItem icon={Users} label="Sức chứa" value={`${classItem.capacity} học viên`} />
          <DetailItem
            icon={CalendarDays}
            label="Ngày bắt đầu"
            value={formatClassDate(classItem.startDate)}
          />
          <DetailItem
            icon={CalendarDays}
            label="Ngày kết thúc dự kiến"
            value={formatClassDate(classItem.expectedEndDate)}
          />
          <div className="flex items-start gap-3">
            <ClipboardCheck className="mt-0.5 h-5 w-5 text-slate-400" />
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Trạng thái
              </span>
              <StatusBadge
                status={classItem.status}
                customLabel={classStatusLabels[classItem.status]}
                className="mt-1"
              />
            </div>
          </div>
          <DetailItem
            icon={FileText}
            label="Ghi chú"
            value={classItem.note || "-"}
            className="sm:col-span-2 lg:col-span-3"
          />
        </section>
      )}

      {activeTab === "students" && (
        <section id="class-panel-students" role="tabpanel">
          {enrollmentsQuery.isLoading ? (
            <LoadingState variant="table" />
          ) : enrollmentsQuery.isError ? (
            <ErrorState
              title="Không thể tải danh sách học viên"
              message={enrollmentsQuery.error.message}
              onRetry={enrollmentsQuery.refetch}
              isRetrying={enrollmentsQuery.isRefetching}
            />
          ) : !enrollmentsQuery.data?.data.length ? (
            <EmptyState
              icon={<Users className="h-8 w-8" />}
              title="Lớp chưa có học viên"
              description="Chưa có học viên nào được ghi danh vào lớp học này."
            />
          ) : (
            <div className="glass-card overflow-hidden rounded-2xl border border-white/40 shadow-xs">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow>
                      <TableHead>Mã học viên</TableHead>
                      <TableHead>Họ và tên</TableHead>
                      <TableHead>Mã ghi danh</TableHead>
                      <TableHead>Ngày ghi danh</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enrollmentsQuery.data.data.map((enrollment) => (
                      <TableRow key={enrollment.id}>
                        <TableCell className="font-mono text-xs font-semibold text-slate-600">
                          {enrollment.studentCode}
                        </TableCell>
                        <TableCell className="font-semibold text-slate-900">
                          {enrollment.studentName}
                        </TableCell>
                        <TableCell className="font-mono text-xs text-slate-600">
                          {enrollment.enrollmentCode}
                        </TableCell>
                        <TableCell className="text-slate-600">
                          {formatClassDate(enrollment.enrolledDate)}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={enrollment.status} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </section>
      )}

      {activeTab === "attendance" && (
        <section id="class-panel-attendance" role="tabpanel">
          <EmptyState
            icon={<ClipboardCheck className="h-8 w-8" />}
            title="Chưa có dữ liệu điểm danh"
            description="Dữ liệu điểm danh theo lớp sẽ xuất hiện tại đây khi API phiên học được kết nối."
          />
        </section>
      )}

      {activeTab === "tuition" && (
        <section id="class-panel-tuition" role="tabpanel">
          <ClassTuitionSection classId={id} />
        </section>
      )}
    </div>
  );
}

interface DetailItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  mono?: boolean;
  className?: string;
}

function DetailItem({ icon: Icon, label, value, mono, className }: DetailItemProps) {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
      <div className="min-w-0">
        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </span>
        <span
          className={cn(
            "mt-0.5 block text-sm font-semibold text-slate-800",
            mono && "font-mono text-xs",
          )}
        >
          {value}
        </span>
      </div>
    </div>
  );
}
