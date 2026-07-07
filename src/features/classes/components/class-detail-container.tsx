"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Building2,
  CalendarDays,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Users,
  Shield,
  Clock,
  Trash2,
  Plus,
  Award,
  Notebook,
  History,
  CheckCircle,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { hasPermission } from "@/lib/permissions/has-permission";
import { useConfirm } from "@/hooks/use-confirm";

import { useClass } from "../hooks/use-class";
import { useClassEnrollments } from "../hooks/use-class-enrollments";
import { useClassStaff, useAssignClassStaff, useRemoveClassStaff } from "../hooks/use-class-staff";
import { useClassSchedules, CreateSchedulePatternModal } from "@/features/class-schedules";
import { useClassSessions } from "@/features/attendance/hooks/use-class-sessions";
import { useEnrollStudentToClass, useCancelEnrollment } from "@/features/enrollments";
import { useStudents } from "@/features/students";
import { useEmployees } from "@/features/employees";
import { useRooms } from "@/features/rooms/hooks/use-rooms";

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
  | "student-notes"
  | "audit";

const tabs: Array<{
  value: ClassTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { value: "overview", label: "Tổng quan", icon: GraduationCap },
  { value: "students", label: "Học viên", icon: Users },
  { value: "staff", label: "Nhân sự / GV", icon: Shield },
  { value: "schedule", label: "Lịch học", icon: CalendarDays },
  { value: "sessions", label: "Buổi học đã sinh", icon: Clock },
  { value: "attendance", label: "Điểm danh", icon: ClipboardCheck },
  { value: "scores", label: "Điểm số", icon: Award },
  { value: "weekly-updates", label: "Báo cáo tuần", icon: FileText },
  { value: "learning-reports", label: "Nhận xét định kỳ", icon: FileText },
  { value: "student-notes", label: "Ghi chú học viên", icon: Notebook },
  { value: "audit", label: "Lịch sử hệ thống", icon: History },
];

export function ClassDetailContainer({ id, initialTab = "overview" }: ClassDetailContainerProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const confirm = useConfirm();

  const [activeTab, setActiveTab] = React.useState<ClassTab>(initialTab);

  // Modals visibility states
  const [isEnrollModalOpen, setIsEnrollModalOpen] = React.useState(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = React.useState(false);
  const [isPatternModalOpen, setIsPatternModalOpen] = React.useState(false);

  // Queries
  const classQuery = useClass(id);
  const enrollmentsQuery = useClassEnrollments(id);
  const staffQuery = useClassStaff(id);
  const schedulesQuery = useClassSchedules({ classId: id });
  const sessionsQuery = useClassSessions({ classId: id, limit: 100 });

  // Lookup queries
  const { data: studentsLookup } = useStudents({ limit: 1000, status: "ACTIVE" });
  const { data: employeesLookup } = useEmployees({ limit: 1000 });
  const { data: roomsLookup } = useRooms({ limit: 1000 });

  // Mutations
  const enrollMutation = useEnrollStudentToClass();
  const cancelEnrollMutation = useCancelEnrollment();
  const assignStaffMutation = useAssignClassStaff(id);
  const removeStaffMutation = useRemoveClassStaff(id);

  // Sync tab status if initialTab changes
  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabChange = (tab: ClassTab) => {
    setActiveTab(tab);
    const baseRoute = `/classes/${id}`;
    if (tab === "overview") {
      router.push(baseRoute);
    } else if (
      [
        "students",
        "staff",
        "schedule",
        "sessions",
        "attendance",
        "weekly-updates",
        "scores",
        "learning-reports",
        "student-notes",
        "audit",
      ].includes(tab)
    ) {
      router.push(`${baseRoute}/${tab}`);
    }
  };

  const formatLocalDate = (val: string | null | undefined) => {
    if (!val) return "-";
    const parts = val.split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return val;
  };

  if (classQuery.isLoading || enrollmentsQuery.isLoading || staffQuery.isLoading) {
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
  const enrolledStudents = enrollmentsQuery.data?.data ?? [];
  const assignedStaff = staffQuery.data?.data ?? [];
  const schedulesList = schedulesQuery.data?.data ?? [];
  const sessionsList = sessionsQuery.data?.data ?? [];

  // Compute staff names for overview display
  const primaryTeacher = assignedStaff.find(
    (s: any) => s.staffRole === "PRIMARY_TEACHER" && s.status === "ACTIVE"
  );
  const teachingAssistant = assignedStaff.find(
    (s: any) => s.staffRole === "TEACHING_ASSISTANT" && s.status === "ACTIVE"
  );

  // Compute upcoming/next sessions
  const nextSession = sessionsList
    .filter((s: any) => new Date(s.sessionDate) >= new Date() && s.status === "PLANNED")
    .sort((a: any, b: any) => a.sessionDate.localeCompare(b.sessionDate))[0];

  const handleEnrollSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const studentId = formData.get("studentId") as string;
    const enrolledDate = formData.get("enrolledDate") as string;
    const startDate = formData.get("startDate") as string;
    const source = formData.get("source") as any;
    const note = formData.get("note") as string;

    if (!studentId || !enrolledDate || !startDate) {
      toast.error("Vui lòng nhập đầy đủ thông tin bắt buộc.");
      return;
    }

    await enrollMutation.mutateAsync(
      {
        studentId,
        classId: id,
        enrolledDate,
        startDate,
        status: "ACTIVE",
        source,
        note,
      },
      {
        onSuccess: () => {
          setIsEnrollModalOpen(false);
          enrollmentsQuery.refetch();
        },
      }
    );
  };

  const handleStaffAssignSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const employeeId = formData.get("employeeId") as string;
    const staffRole = formData.get("staffRole") as any;
    const startDate = formData.get("startDate") as string;
    const note = formData.get("note") as string;

    if (!employeeId || !staffRole || !startDate) {
      toast.error("Vui lòng nhập đầy đủ thông tin bắt buộc.");
      return;
    }

    await assignStaffMutation.mutateAsync(
      { employeeId, staffRole, startDate, note },
      {
        onSuccess: () => {
          setIsStaffModalOpen(false);
          staffQuery.refetch();
        },
      }
    );
  };

  const handleRemoveEnrollment = async (enrollmentId: string, studentName: string) => {
    const ok = await confirm({
      title: "Hủy ghi danh học viên",
      description: `Bạn có chắc chắn muốn hủy ghi danh của học viên ${studentName} khỏi lớp học này?`,
      confirmLabel: "Hủy ghi danh",
      cancelLabel: "Bỏ qua",
      variant: "destructive",
    });

    if (ok) {
      await cancelEnrollMutation.mutateAsync(enrollmentId, {
        onSuccess: () => {
          enrollmentsQuery.refetch();
          queryClient.invalidateQueries({ queryKey: classKeys.students(id) });
        },
      });
    }
  };

  const handleRemoveStaff = async (assignmentId: string, employeeName: string) => {
    const ok = await confirm({
      title: "Gỡ phân công nhân sự",
      description: `Bạn có chắc chắn muốn gỡ phân công của ${employeeName} khỏi lớp học này?`,
      confirmLabel: "Gỡ phân công",
      cancelLabel: "Bỏ qua",
      variant: "destructive",
    });

    if (ok) {
      await removeStaffMutation.mutateAsync(assignmentId, {
        onSuccess: () => {
          staffQuery.refetch();
        },
      });
    }
  };

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
            className="px-3 py-1.5"
          />
        }
      />

      {/* Tabs list */}
      <div className="rounded-2xl border border-white/40 bg-white/40 p-2 shadow-xs backdrop-blur-md">
        <div
          role="tablist"
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
                    ? "bg-[#FF161A] text-white shadow-sm font-bold"
                    : "text-slate-600 hover:bg-white/70 hover:text-slate-900"
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
          <DetailItem icon={Users} label="Sức chứa tối đa" value={`${classItem.capacity} học viên`} />
          <DetailItem icon={Users} label="Học viên đã ghi danh" value={`${enrolledStudents.length} học viên`} />
          <DetailItem
            icon={Shield}
            label="Giáo viên chính"
            value={primaryTeacher ? primaryTeacher.employeeName : "Chưa có"}
          />
          <DetailItem
            icon={Shield}
            label="Trợ giảng"
            value={teachingAssistant ? teachingAssistant.employeeName : "Chưa có"}
          />
          <DetailItem
            icon={CalendarDays}
            label="Khung lịch học cố định"
            value={schedulesList.length > 0 ? (schedulesList[0].patternCode || "Khung lịch cố định") : "Chưa gán lịch học"}
          />
          <DetailItem
            icon={Clock}
            label="Buổi học tiếp theo"
            value={
              nextSession
                ? `${formatLocalDate(nextSession.sessionDate)} (${nextSession.startTime} - ${nextSession.endTime})`
                : "Không có buổi học sắp tới"
            }
          />
          <DetailItem icon={CalendarDays} label="Ngày bắt đầu" value={formatLocalDate(classItem.startDate)} />
          <DetailItem icon={CalendarDays} label="Ngày kết thúc dự kiến" value={formatLocalDate(classItem.expectedEndDate)} />
          <DetailItem icon={FileText} label="Ghi chú lớp" value={classItem.note || "-"} className="sm:col-span-2 lg:col-span-3" />
        </section>
      )}

      {activeTab === "students" && (
        <section className="glass-card p-6 border border-white/60 bg-white/40 rounded-2xl backdrop-blur-md flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-800 text-sm">Danh sách học viên trong lớp</h4>
            {hasPermission("enrollment:create") && (
              <Button
                onClick={() => setIsEnrollModalOpen(true)}
                size="sm"
                className="bg-[#FF161A] text-white hover:bg-[#C90012] cursor-pointer rounded-xl font-semibold inline-flex items-center gap-1"
              >
                <Plus className="h-3.5 w-3.5" /> Ghi danh học viên
              </Button>
            )}
          </div>

          {enrolledStudents.length === 0 ? (
            <EmptyState icon={<Users className="h-8 w-8" />} title="Lớp chưa có học viên" />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã học viên</TableHead>
                    <TableHead>Họ và tên</TableHead>
                    <TableHead>Ngày ghi danh</TableHead>
                    <TableHead>Ngày bắt đầu</TableHead>
                    <TableHead>Nguồn</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrolledStudents.map((enrollment) => (
                    <TableRow key={enrollment.id}>
                      <TableCell className="font-mono font-semibold text-xs text-slate-600">
                        {enrollment.studentCode}
                      </TableCell>
                      <TableCell className="font-semibold text-slate-900">{enrollment.studentName}</TableCell>
                      <TableCell>{formatLocalDate(enrollment.enrolledDate)}</TableCell>
                      <TableCell>{formatLocalDate(enrollment.startDate)}</TableCell>
                      <TableCell className="text-slate-600 text-xs font-medium">
                        {enrollment.source || "Trực tiếp"}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={enrollment.status} />
                      </TableCell>
                      <TableCell>
                        {hasPermission("enrollment:cancel") && enrollment.status !== "CANCELLED" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveEnrollment(enrollment.id, enrollment.studentName)}
                            className="text-rose-600 hover:text-rose-900 cursor-pointer h-8 w-8 p-0 rounded-lg hover:bg-rose-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>
      )}

      {activeTab === "staff" && (
        <section className="glass-card p-6 border border-white/60 bg-white/40 rounded-2xl backdrop-blur-md flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-800 text-sm">Giáo viên & Trợ giảng được phân công</h4>
            {hasPermission("class-staff:assign") && (
              <Button
                onClick={() => setIsStaffModalOpen(true)}
                size="sm"
                className="bg-[#FF161A] text-white hover:bg-[#C90012] cursor-pointer rounded-xl font-semibold inline-flex items-center gap-1"
              >
                <Plus className="h-3.5 w-3.5" /> Phân công nhân sự
              </Button>
            )}
          </div>

          {assignedStaff.length === 0 ? (
            <EmptyState icon={<Shield className="h-8 w-8" />} title="Chưa phân công nhân sự nào" />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã nhân sự</TableHead>
                    <TableHead>Họ và tên</TableHead>
                    <TableHead>Vai trò giảng dạy</TableHead>
                    <TableHead>Ngày bắt đầu</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignedStaff.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-mono text-xs font-semibold text-slate-600">
                        {staff.employeeCode}
                      </TableCell>
                      <TableCell className="font-semibold text-slate-900">{staff.employeeName}</TableCell>
                      <TableCell className="text-slate-600 font-medium text-xs">
                        {staff.staffRole === "PRIMARY_TEACHER" ? "Giáo viên chính" : "Trợ giảng"}
                      </TableCell>
                      <TableCell>{formatLocalDate(staff.startDate)}</TableCell>
                      <TableCell>
                        <StatusBadge status={staff.status} />
                      </TableCell>
                      <TableCell>
                        {hasPermission("class-staff:remove") && staff.status === "ACTIVE" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveStaff(staff.id, staff.employeeName)}
                            className="text-rose-600 hover:text-rose-900 cursor-pointer h-8 w-8 p-0 rounded-lg hover:bg-rose-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>
      )}

      {activeTab === "schedule" && (
        <section className="glass-card p-6 border border-white/60 bg-white/40 rounded-2xl backdrop-blur-md flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-800 text-sm">Thời khóa biểu cố định của lớp</h4>
            {hasPermission("class-schedule:create") && (
              <Button
                onClick={() => setIsPatternModalOpen(true)}
                size="sm"
                className="bg-[#FF161A] text-white hover:bg-[#C90012] cursor-pointer rounded-xl font-semibold"
              >
                Cấu hình khung lịch học
              </Button>
            )}
          </div>

          {schedulesList.length === 0 ? (
            <EmptyState icon={<CalendarDays className="h-8 w-8" />} title="Lớp học chưa được cấu hình thời khóa biểu" />
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {schedulesList.map((sch: any) => (
                <div key={sch.id} className="border border-slate-200/60 p-4 rounded-xl bg-white/50 flex flex-col gap-2">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Khung lịch cố định</span>
                    <span className="block font-bold text-slate-800 text-sm mt-0.5">
                      {sch.patternCode || `Thứ trong tuần: ${sch.dayOfWeek}`}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Ca học / Thời gian</span>
                    <span className="block text-xs font-semibold text-slate-700 mt-0.5">
                      {sch.startTime} - {sch.endTime}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Phòng học / Cơ sở</span>
                    <span className="block text-xs font-semibold text-slate-700 mt-0.5">
                      {sch.roomCode || "Chưa chỉ định phòng"} ({sch.campusName || ""})
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t border-slate-100 pt-2 mt-2">
                    <span className="text-[10px] text-slate-500">Hiệu lực từ: {formatLocalDate(sch.effectiveFrom)}</span>
                    <StatusBadge status={sch.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {activeTab === "sessions" && (
        <section className="glass-card p-6 border border-white/60 bg-white/40 rounded-2xl backdrop-blur-md flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-slate-800 text-sm">Các buổi học sinh tự động từ khung lịch</h4>
            <span className="text-xs text-slate-500 font-semibold">Tổng số: {sessionsList.length} buổi</span>
          </div>

          {sessionsList.length === 0 ? (
            <EmptyState icon={<Clock className="h-8 w-8" />} title="Chưa có buổi học nào được sinh" />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Buổi</TableHead>
                    <TableHead>Ngày học</TableHead>
                    <TableHead>Giờ học</TableHead>
                    <TableHead>Phòng học</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessionsList.map((session: any) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-semibold text-slate-800">Buổi {session.lessonNo}</TableCell>
                      <TableCell>{formatLocalDate(session.sessionDate)}</TableCell>
                      <TableCell className="font-mono text-xs">{session.startTime} - {session.endTime}</TableCell>
                      <TableCell>{session.roomCode || "-"}</TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border",
                            session.status === "COMPLETED"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-slate-50 text-slate-600 border-slate-200"
                          )}
                        >
                          {session.status === "COMPLETED" ? "Đã học" : "Chưa học"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => router.push(`/sessions/${session.id}/attendance`)}
                          className="h-8 text-xs font-semibold rounded-lg bg-white/60 hover:bg-white text-slate-700 cursor-pointer"
                        >
                          Điểm danh
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>
      )}

      {activeTab === "attendance" && (
        <section className="glass-card p-6 border border-white/60 bg-white/40 rounded-2xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-800 text-sm">Điểm danh lớp học</h4>
          </div>
          <EmptyState
            icon={<ClipboardCheck className="h-8 w-8" />}
            title="Chọn buổi học bên tab 'Buổi học đã sinh' để quản lý điểm danh"
          />
        </section>
      )}

      {activeTab === "scores" && (
        <section className="glass-card p-6 border border-white/60 bg-white/40 rounded-2xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-800 text-sm">Bảng điểm lớp học</h4>
          </div>
          <EmptyState icon={<Award className="h-8 w-8" />} title="Tính năng điểm số được quản lý tại trang Bảng điểm chung" />
        </section>
      )}

      {activeTab === "weekly-updates" && (
        <section className="glass-card p-6 border border-white/60 bg-white/40 rounded-2xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-800 text-sm">Báo cáo tuần lớp học</h4>
          </div>
          <EmptyState icon={<FileText className="h-8 w-8" />} title="Không tìm thấy báo cáo tuần nào" />
        </section>
      )}

      {activeTab === "learning-reports" && (
        <section className="glass-card p-6 border border-white/60 bg-white/40 rounded-2xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-800 text-sm">Báo cáo nhận xét học tập định kỳ</h4>
          </div>
          <EmptyState icon={<FileText className="h-8 w-8" />} title="Chưa có chu kỳ nhận xét nào được công bố" />
        </section>
      )}

      {activeTab === "student-notes" && (
        <section className="glass-card p-6 border border-white/60 bg-white/40 rounded-2xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-800 text-sm">Sổ tay bàn giao nội bộ học viên</h4>
          </div>
          <EmptyState icon={<Notebook className="h-8 w-8" />} title="Chưa có ghi chú nội bộ bàn giao nào" />
        </section>
      )}

      {activeTab === "audit" && (
        <section className="glass-card p-6 border border-white/60 bg-white/40 rounded-2xl backdrop-blur-md">
          <h4 className="font-bold text-slate-800 text-sm mb-4">Lịch sử hoạt động của lớp</h4>
          <EmptyState icon={<History className="h-8 w-8" />} title="Không tìm thấy bản ghi nhật ký hoạt động nào" />
        </section>
      )}

      {/* Enroll Student Dialog Modal */}
      <Dialog open={isEnrollModalOpen} onOpenChange={setIsEnrollModalOpen}>
        <DialogContent className="sm:max-w-[450px] glass-card border border-white/40 shadow-xl rounded-2xl bg-white/90 p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-slate-800">Ghi danh học viên vào lớp</DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Đăng ký học chính thức hoặc học thử cho học viên hiện tại.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEnrollSubmit} className="space-y-4 mt-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600">Học viên</label>
              <select
                name="studentId"
                className="h-10 rounded-xl border border-slate-200 bg-white/60 focus:bg-white text-xs px-3 outline-none cursor-pointer text-slate-800"
              >
                <option value="">Chọn học viên</option>
                {studentsLookup?.data.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.studentCode} - {opt.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Ngày ghi danh</label>
                <input
                  type="date"
                  name="enrolledDate"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  className="h-10 rounded-xl border border-slate-200 bg-white/60 focus:bg-white text-xs px-3 outline-none text-slate-800"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Ngày bắt đầu học</label>
                <input
                  type="date"
                  name="startDate"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  className="h-10 rounded-xl border border-slate-200 bg-white/60 focus:bg-white text-xs px-3 outline-none text-slate-800"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600">Nguồn ghi danh</label>
              <select
                name="source"
                className="h-10 rounded-xl border border-slate-200 bg-white/60 focus:bg-white text-xs px-3 outline-none cursor-pointer text-slate-800"
              >
                <option value="WALK_IN">Trực tiếp (Walk-in)</option>
                <option value="REFERRAL">Người giới thiệu (Referral)</option>
                <option value="ONLINE">Đăng ký Online</option>
                <option value="OTHER">Khác</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600">Ghi chú</label>
              <textarea
                name="note"
                placeholder="Ghi chú ghi danh (nếu có)..."
                className="rounded-xl border border-slate-200 bg-white/60 focus:bg-white text-xs p-3 outline-none text-slate-800 h-20"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsEnrollModalOpen(false)}
                className="rounded-xl h-10 font-semibold text-slate-500 hover:bg-slate-50 cursor-pointer"
              >
                Hủy bỏ
              </Button>
              <Button
                type="submit"
                disabled={enrollMutation.isPending}
                className="bg-[#FF161A] text-white hover:bg-[#C90012] px-5 rounded-xl h-10 font-semibold shadow-md cursor-pointer"
              >
                {enrollMutation.isPending ? "Đang xử lý..." : "Ghi danh"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Assign Staff Dialog Modal */}
      <Dialog open={isStaffModalOpen} onOpenChange={setIsStaffModalOpen}>
        <DialogContent className="sm:max-w-[450px] glass-card border border-white/40 shadow-xl rounded-2xl bg-white/90 p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-slate-800">Phân công giảng dạy lớp học</DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Chỉ định giáo viên chính hoặc trợ giảng phụ trách lớp học.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleStaffAssignSubmit} className="space-y-4 mt-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600">Nhân sự (Giáo viên / Trợ giảng)</label>
              <select
                name="employeeId"
                className="h-10 rounded-xl border border-slate-200 bg-white/60 focus:bg-white text-xs px-3 outline-none cursor-pointer text-slate-800"
              >
                <option value="">Chọn nhân sự</option>
                {employeesLookup?.data.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.employeeCode} - {opt.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Vai trò</label>
                <select
                  name="staffRole"
                  className="h-10 rounded-xl border border-slate-200 bg-white/60 focus:bg-white text-xs px-3 outline-none cursor-pointer text-slate-800"
                >
                  <option value="PRIMARY_TEACHER">Giáo viên chính</option>
                  <option value="TEACHING_ASSISTANT">Trợ giảng (TA)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-600">Ngày bắt đầu</label>
                <input
                  type="date"
                  name="startDate"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  className="h-10 rounded-xl border border-slate-200 bg-white/60 focus:bg-white text-xs px-3 outline-none text-slate-800"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600">Ghi chú phân công</label>
              <textarea
                name="note"
                placeholder="Ghi chú chi tiết (nếu có)..."
                className="rounded-xl border border-slate-200 bg-white/60 focus:bg-white text-xs p-3 outline-none text-slate-800 h-20"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsStaffModalOpen(false)}
                className="rounded-xl h-10 font-semibold text-slate-500 hover:bg-slate-50 cursor-pointer"
              >
                Hủy bỏ
              </Button>
              <Button
                type="submit"
                disabled={assignStaffMutation.isPending}
                className="bg-[#FF161A] text-white hover:bg-[#C90012] px-5 rounded-xl h-10 font-semibold shadow-md cursor-pointer"
              >
                {assignStaffMutation.isPending ? "Đang xử lý..." : "Phân công"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Pattern Modal creation */}
      <CreateSchedulePatternModal
        open={isPatternModalOpen}
        onOpenChange={setIsPatternModalOpen}
        classes={[{ value: id, label: `${classItem.classCode} - ${classItem.name}` }]}
        rooms={roomsLookup?.data.map((r: any) => ({ value: r.id, label: `${r.code} (${r.campusName || ""})` })) || []}
        onSuccess={() => {
          schedulesQuery.refetch();
          sessionsQuery.refetch();
        }}
      />
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
            mono && "font-mono text-xs"
          )}
        >
          {value}
        </span>
      </div>
    </div>
  );
}
