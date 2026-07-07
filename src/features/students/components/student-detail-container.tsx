"use client";

/**
 * src/features/students/components/student-detail-container.tsx
 *
 * Container component for displaying detailed information about a single student.
 * Integrates query loaders, translations for enums, and liquid glass card designs.
 */

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  User,
  Calendar,
  Award,
  Shield,
  School,
  Clock,
  BookOpen,
  GraduationCap,
  ClipboardCheck,
  MessageSquare,
} from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { StatusBadge } from "@/components/common/status-badge";
import { useStudent } from "../hooks/use-student";
import { useStudentClasses } from "../hooks/use-student-classes";
import { StudentParentSection } from "./student-parent-section";
import type { StudentType } from "../types/student.type";

// Modal refactoring imports
import { CrudFormModal } from "@/components/modals/crud-form-modal";
import { studentFormConfig } from "../configs/student-form.config";
import { studentSchema } from "../schemas/student.schema";
import { useUpdateStudent } from "../hooks/use-update-student";
import { useConfirm } from "@/hooks/use-confirm";
import { StudentTuitionSection } from "@/features/tuition";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface StudentDetailContainerProps {
  id: string;
}

export function StudentDetailContainer({ id }: StudentDetailContainerProps) {
  const router = useRouter();
  const { data, isLoading, isError, error, refetch, isRefetching } = useStudent(id);
  const { data: classesData, isLoading: isLoadingClasses } = useStudentClasses(id);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const updateMutation = useUpdateStudent();
  const confirm = useConfirm();

  if (isLoading || isLoadingClasses) {
    return <LoadingState variant="spinner" className="min-h-[400px]" />;
  }

  if (isError || !data?.data) {
    return (
      <ErrorState
        title="Lỗi tải thông tin"
        message={error?.message || "Không thể tải hồ sơ học viên."}
        onRetry={refetch}
        isRetrying={isRefetching}
      />
    );
  }

  const student = data.data;
  const enrolledClasses = classesData?.data ?? [];

  // Identify current active class
  const currentEnrollment = enrolledClasses.find(
    (c: any) => c.status === "ACTIVE" || c.status === "TRIAL"
  );

  // Helper translations for display
  const getStudentTypeLabel = (type: StudentType) => {
    const labels: Record<StudentType, string> = {
      KINDERGARTEN: "Mầm non",
      CHILD: "Tiểu học",
      TEENAGER: "Thiếu niên",
      ADULT: "Người lớn",
    };
    return labels[type] || type;
  };

  const getGenderLabel = (gender: string) => {
    if (gender === "MALE") return "Nam";
    if (gender === "FEMALE") return "Nữ";
    return "Khác";
  };

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "-";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/students")}
          className="text-slate-500 hover:text-slate-900 rounded-lg h-9 px-3 gap-1 inline-flex items-center cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Quay lại</span>
        </Button>
      </div>

      <PageHeader
        title={`Học viên: ${student.fullName}`}
        description={`Hồ sơ chi tiết của học viên ${student.fullName} (Mã: ${student.studentCode}).`}
        action={
          <Button
            onClick={() => setIsModalOpen(true)}
            className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl shadow-md shadow-[#FF161A]/15 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Edit className="h-4 w-4" />
            Chỉnh sửa
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <div className="glass-card p-6 border border-white/40 shadow-xs rounded-2xl flex flex-col items-center text-center justify-center gap-4 bg-white/50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-apix-gradient text-3xl font-bold text-white shadow-lg shadow-[#FF161A]/20">
            {student.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="font-display text-lg font-bold text-slate-800">{student.fullName}</h4>
            <p className="text-xs font-mono font-semibold text-slate-500 mt-1">{student.studentCode}</p>
          </div>
          <StatusBadge status={student.status} />
        </div>

        {/* Info Grid Card */}
        <div className="md:col-span-2 glass-card p-6 border border-white/40 shadow-xs rounded-2xl grid gap-5 sm:grid-cols-2 bg-white/50">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Ngày sinh</span>
              <span className="text-sm font-semibold text-slate-800">{formatDate(student.dateOfBirth)}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Giới tính</span>
              <span className="text-sm font-semibold text-slate-800">{getGenderLabel(student.gender)}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Loại học viên</span>
              <span className="text-sm font-semibold text-slate-800">{getStudentTypeLabel(student.studentType)}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <GraduationCap className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Lớp hiện tại</span>
              {currentEnrollment ? (
                <span className="text-sm font-semibold text-slate-800">
                  {currentEnrollment.classCode} - {currentEnrollment.className}
                  {currentEnrollment.primaryTeacherName && (
                    <span className="block text-xs font-normal text-slate-500 mt-0.5">
                      GV: {currentEnrollment.primaryTeacherName}
                    </span>
                  )}
                </span>
              ) : (
                <span className="text-sm font-medium text-slate-400 italic">Chưa ghi danh lớp học</span>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <School className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Trường học</span>
              <span className="text-sm font-semibold text-slate-800">{student.schoolName || "-"}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Khối / Lớp</span>
              <span className="text-sm font-semibold text-slate-800">{student.grade || "-"}</span>
            </div>
          </div>

          {student.createdAt && (
            <div className="flex items-start gap-3 sm:col-span-2 border-t border-slate-100 pt-4 mt-1">
              <Clock className="h-5 w-5 text-slate-400 mt-0.5" />
              <div className="grid grid-cols-2 gap-4 w-full">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Ngày tạo</span>
                  <span className="text-xs font-medium text-slate-600">{formatDate(student.createdAt)}</span>
                </div>
                {student.updatedAt && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Cập nhật lúc</span>
                    <span className="text-xs font-medium text-slate-600">{formatDate(student.updatedAt)}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lịch sử lớp học & Tiến trình */}
      <div className="glass-card p-6 border border-white/40 shadow-xs rounded-2xl bg-white/50 flex flex-col gap-4">
        <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-[#FF161A]" />
          Lịch sử lớp học & Tiến trình
        </h3>
        {enrolledClasses.length === 0 ? (
          <p className="text-sm text-slate-500 italic text-center py-4">Chưa có lịch sử học tập tại trung tâm.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lớp học</TableHead>
                  <TableHead>Giáo viên chính</TableHead>
                  <TableHead>Ngày ghi danh</TableHead>
                  <TableHead>Ngày bắt đầu</TableHead>
                  <TableHead>Điểm danh</TableHead>
                  <TableHead>Điểm trung bình</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enrolledClasses.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-semibold text-slate-800">
                      {item.classCode} - {item.className}
                    </TableCell>
                    <TableCell className="text-slate-600">{item.primaryTeacherName || "Chưa phân công"}</TableCell>
                    <TableCell>{formatDate(item.enrolledDate)}</TableCell>
                    <TableCell>{formatDate(item.startDate)}</TableCell>
                    <TableCell>
                      {item.attendanceSummary ? (
                        <span className="text-xs font-medium text-slate-700">
                          {item.attendanceSummary.present}/{item.attendanceSummary.total} (Vắng: {item.attendanceSummary.absent})
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {item.scoreSummary?.average !== undefined ? item.scoreSummary.average.toFixed(1) : "-"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={item.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Linked Parents Relationship Section */}
      <div className="mt-4">
        <StudentParentSection studentId={student.id} />
      </div>

      <div className="mt-4">
        <StudentTuitionSection studentId={student.id} />
      </div>

      {/* Reusable form modal */}
      <CrudFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Chỉnh sửa hồ sơ học viên"
        description="Cập nhật thông tin chi tiết của học viên."
        submitLabel="Cập nhật thông tin"
        configs={studentFormConfig}
        validationSchema={studentSchema}
        initialValues={student}
        onSubmit={async (values) => {
          const ok = await confirm({
            title: "Xác nhận cập nhật",
            description: `Bạn có chắc chắn muốn lưu các thay đổi cho học viên ${student.fullName}?`,
            confirmLabel: "Cập nhật",
            cancelLabel: "Hủy",
            variant: "default",
          });
          if (ok) {
            // Set accessMode default to keep API contracts intact
            const payload = {
              ...values,
              accessMode: student.accessMode || "NO_ACCOUNT",
            };
            await updateMutation.mutateAsync(
              { id: student.id, data: payload },
              {
                onSuccess: () => {
                  setIsModalOpen(false);
                  refetch();
                },
              }
            );
          }
        }}
      />
    </div>
  );
}
