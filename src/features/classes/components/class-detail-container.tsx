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
  Shield,
  Video,
  History,
  Award,
  Notebook,
  Plus,
  Clock,
  Trash2,
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
import { hasPermission } from "@/lib/permissions/has-permission";
import { useClass } from "../hooks/use-class";
import { useClassEnrollments } from "../hooks/use-class-enrollments";
import { classStatusLabels, formatClassDate } from "./class-table";
import { VideoListContainer } from "@/features/media-videos";

interface ClassDetailContainerProps {
  id: string;
  initialTab?: ClassTab;
}

export type ClassTab =
  | "overview"
  | "students"
  | "staff"
  | "schedule"
  | "sessions"
  | "attendance"
  | "weekly-updates"
  | "scores"
  | "learning-reports"
  | "videos"
  | "student-notes"
  | "audit";

const tabs: Array<{
  value: ClassTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  permission?: string;
}> = [
  { value: "overview", label: "Tổng quan", icon: GraduationCap },
  { value: "students", label: "Học viên", icon: Users },
  { value: "staff", label: "Nhân sự", icon: Shield },
  { value: "schedule", label: "Lịch học", icon: CalendarDays },
  { value: "sessions", label: "Buổi học", icon: Clock },
  { value: "attendance", label: "Điểm danh", icon: ClipboardCheck },
  { value: "weekly-updates", label: "Báo cáo tuần", icon: RefreshCwIcon },
  { value: "scores", label: "Điểm số", icon: Award },
  { value: "learning-reports", label: "Nhận xét", icon: FileText },
  { value: "videos", label: "Videos", icon: Video },
  { value: "student-notes", label: "Sổ tay", icon: Notebook },
  { value: "audit", label: "Lịch sử", icon: History },
];

function RefreshCwIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}

export function ClassDetailContainer({ id, initialTab = "overview" }: ClassDetailContainerProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<ClassTab>(initialTab);
  const classQuery = useClass(id);
  const enrollmentsQuery = useClassEnrollments(id);

  // Sync tab status if initialTab changes
  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabChange = (tab: ClassTab) => {
    setActiveTab(tab);
    // Push state changes to browser paths if sub-pages exist
    const baseRoute = `/classes/${id}`;
    if (tab === "overview") {
      router.push(baseRoute);
    } else if (["students", "schedule", "attendance", "weekly-updates", "scores", "learning-reports"].includes(tab)) {
      const subPath = tab === "learning-reports" ? "reports" : tab;
      router.push(`${baseRoute}/${subPath}`);
    }
  };

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
  const showParentContact = hasPermission("parent:contact-read");

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

      {/* 12-Tab bar layout */}
      <div className="rounded-2xl border border-white/40 bg-white/40 p-2 shadow-xs backdrop-blur-md">
        <div
          role="tablist"
          aria-label="Thông tin lớp học"
          className="grid grid-cols-2 gap-1 sm:grid-cols-4 lg:grid-cols-6"
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
                onClick={() => handleTabChange(tab.value)}
                className={cn(
                  "flex cursor-pointer items-center justify-center gap-2 rounded-xl px-2 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF161A]/40",
                  isActive
                    ? "bg-[#FF161A] text-white shadow-sm"
                    : "text-slate-600 hover:bg-white/70 hover:text-slate-900",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === "overview" && (
        <section className="glass-card grid gap-5 rounded-2xl border border-white/40 p-6 bg-white/30 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-3">
          <DetailItem icon={GraduationCap} label="Mã lớp" value={classItem.classCode} mono />
          <DetailItem icon={GraduationCap} label="Tên lớp" value={classItem.name} />
          <DetailItem icon={BookOpen} label="Khóa học" value={classItem.courseName || "-"} />
          <DetailItem icon={Building2} label="Cơ sở" value={classItem.campusName || "-"} />
          <DetailItem icon={Users} label="Sức chứa" value={`${classItem.capacity} học viên`} />
          <DetailItem icon={CalendarDays} label="Ngày bắt đầu" value={formatClassDate(classItem.startDate)} />
          <DetailItem icon={CalendarDays} label="Ngày kết thúc dự kiến" value={formatClassDate(classItem.expectedEndDate)} />
          <DetailItem icon={FileText} label="Ghi chú" value={classItem.note || "-"} className="sm:col-span-2 lg:col-span-3" />
        </section>
      )}

      {activeTab === "students" && (
        <section className="glass-card p-6 border border-white/60 bg-white/40 rounded-2xl backdrop-blur-md">
          {enrollmentsQuery.isLoading ? (
            <LoadingState variant="table" />
          ) : !enrollmentsQuery.data?.data.length ? (
            <EmptyState icon={<Users className="h-8 w-8" />} title="Lớp chưa có học viên" />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã học viên</TableHead>
                  <TableHead>Họ và tên</TableHead>
                  {showParentContact && <TableHead>Liên hệ phụ huynh</TableHead>}
                  <TableHead>Ngày ghi danh</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enrollmentsQuery.data.data.map((enrollment) => (
                  <TableRow key={enrollment.id}>
                    <TableCell className="font-mono font-semibold">{enrollment.studentCode}</TableCell>
                    <TableCell className="font-semibold">{enrollment.studentName}</TableCell>
                    {showParentContact && (
                      <TableCell className="text-slate-600">
                        {enrollment.parentPhone || "09xxxxxxx"} (Phụ huynh: {enrollment.parentName || "-"})
                      </TableCell>
                    )}
                    <TableCell>{formatClassDate(enrollment.enrolledDate)}</TableCell>
                    <TableCell>
                      <StatusBadge status={enrollment.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </section>
      )}

      {activeTab === "staff" && (
        <section className="glass-card p-6 border border-white/60 bg-white/40 rounded-2xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-800 text-sm">Danh sách giáo viên & trợ giảng giảng dạy</h4>
            {hasPermission("class:assign-staff") && (
              <Button size="sm" className="bg-[#FF161A] text-white hover:bg-[#C90012] cursor-pointer rounded-xl">
                <Plus className="h-3.5 w-3.5 mr-1" /> Phân công nhân sự
              </Button>
            )}
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Họ tên nhân viên</TableHead>
                <TableHead>Vai trò giảng dạy</TableHead>
                <TableHead>Ngày bắt đầu</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold text-slate-900">Mr. John Doe</TableCell>
                <TableCell className="text-slate-600">Giáo viên chính</TableCell>
                <TableCell>01/06/2026</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                    Đang hoạt động
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>
      )}

      {activeTab === "schedule" && (
        <section className="glass-card p-6 border border-white/60 bg-white/40 rounded-2xl backdrop-blur-md flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-800 text-sm">Cài đặt lịch học cố định</h4>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-slate-200/60 p-4 rounded-xl bg-white/50">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Khung lịch cố định</span>
              <span className="block font-bold text-slate-800 text-sm mt-1">Mon / Wed / Fri - Slot 1</span>
              <span className="block text-xs text-slate-500 mt-0.5">Thời gian: 18:00 - 19:30</span>
            </div>
            <div className="border border-slate-200/60 p-4 rounded-xl bg-white/50">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Phòng học được gán</span>
              <span className="block font-bold text-slate-800 text-sm mt-1">Room 101 (Cơ sở Hà Đông)</span>
            </div>
          </div>
        </section>
      )}

      {activeTab === "sessions" && (
        <section className="glass-card p-6 border border-white/60 bg-white/40 rounded-2xl backdrop-blur-md">
          <h4 className="font-bold text-slate-800 text-sm mb-4">Các buổi học của lớp trong khóa</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Buổi số</TableHead>
                <TableHead>Ngày học</TableHead>
                <TableHead>Giờ học</TableHead>
                <TableHead>Bài học</TableHead>
                <TableHead>Điểm danh</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">Buổi 1</TableCell>
                <TableCell>05/06/2026</TableCell>
                <TableCell>18:00 - 19:30</TableCell>
                <TableCell className="text-slate-600">Unit 1: Introduction to Grammar</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                    Đã hoàn thành
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>
      )}

      {activeTab === "attendance" && (
        <section className="glass-card p-6 border border-white/60 bg-white/40 rounded-2xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-800 text-sm">Điểm danh lớp học</h4>
          </div>
          <EmptyState icon={<ClipboardCheck className="h-8 w-8" />} title="Chọn buổi học để quản lý điểm danh" />
        </section>
      )}

      {activeTab === "weekly-updates" && (
        <section className="glass-card p-6 border border-white/60 bg-white/40 rounded-2xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-800 text-sm">Báo cáo tuần & Bài tập về nhà cho phụ huynh</h4>
            <Button size="sm" className="bg-[#FF161A] text-white hover:bg-[#C90012] cursor-pointer rounded-xl">
              Tạo báo cáo tuần mới
            </Button>
          </div>
          <EmptyState icon={<RefreshCwIcon className="h-8 w-8" />} title="Chưa có báo cáo tuần nào được tạo" />
        </section>
      )}

      {activeTab === "scores" && (
        <section className="glass-card p-6 border border-white/60 bg-white/40 rounded-2xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-800 text-sm">Quản lý cột điểm số của lớp</h4>
            <Button size="sm" className="bg-[#FF161A] text-white hover:bg-[#C90012] cursor-pointer rounded-xl">
              Thêm cột điểm
            </Button>
          </div>
          <EmptyState icon={<Award className="h-8 w-8" />} title="Chưa có cột điểm nào trong lớp này" />
        </section>
      )}

      {activeTab === "learning-reports" && (
        <section className="glass-card p-6 border border-white/60 bg-white/40 rounded-2xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-800 text-sm">Nhận xét học tập định kỳ (2 tháng/lần)</h4>
            <Button size="sm" className="bg-[#FF161A] text-white hover:bg-[#C90012] cursor-pointer rounded-xl">
              Mở chu kỳ nhận xét mới
            </Button>
          </div>
          <EmptyState icon={<FileText className="h-8 w-8" />} title="Chưa có chu kỳ đánh giá nào được kích hoạt" />
        </section>
      )}

      {activeTab === "videos" && (
        <section className="glass-card p-6 border border-white/60 bg-white/40 rounded-2xl backdrop-blur-md">
          <VideoListContainer
            initialClassId={id}
            title="Thư viện Video lớp học (Media Library)"
            description={`Tổng hợp các video đánh giá cá nhân và video hoạt động lớp học của lớp ${classItem.classCode || classItem.name}`}
          />
        </section>
      )}

      {activeTab === "student-notes" && (
        <section className="glass-card p-6 border border-white/60 bg-white/40 rounded-2xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-800 text-sm">Sổ tay bàn giao & Nhận xét hành vi học viên</h4>
            <Button size="sm" className="bg-[#FF161A] text-white hover:bg-[#C90012] cursor-pointer rounded-xl">
              Thêm ghi chú bàn giao
            </Button>
          </div>
          <EmptyState icon={<Notebook className="h-8 w-8" />} title="Chưa có ghi chú nội bộ giáo viên nào" />
        </section>
      )}

      {activeTab === "audit" && (
        <section className="glass-card p-6 border border-white/60 bg-white/40 rounded-2xl backdrop-blur-md">
          <h4 className="font-bold text-slate-800 text-sm mb-4">Nhật ký thay đổi lớp học</h4>
          <EmptyState icon={<History className="h-8 w-8" />} title="Không có ghi chép nhật ký nào" />
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
