"use client";

/**
 * src/features/attendance/components/mark-attendance-container.tsx
 *
 * Coordinator container managing fetching, local state modifications,
 * bulk actions, dirty states warning, and mutation saves for session attendance.
 */

import * as React from "react";
import { Check, RotateCcw, AlertCircle, Save, CheckCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { EmptyState } from "@/components/feedback/empty-state";
import { useConfirm } from "@/hooks/use-confirm";

import { useClasses } from "@/features/classes/hooks/use-classes";
import { useRooms } from "@/features/rooms/hooks/use-rooms";

import { useSessionStudents } from "../hooks/use-session-students";
import { useSaveStudentAttendance } from "../hooks/use-save-student-attendance";
import { useUpdateClassSession } from "../hooks/use-update-class-session";
import { SessionAttendanceHeader } from "./session-attendance-header";
import { StudentAttendanceTable } from "./student-attendance-table";
import type { SessionAttendanceStudent, AttendanceStatus } from "../types/attendance.type";

interface MarkAttendanceContainerProps {
  sessionId: string;
}

export function MarkAttendanceContainer({ sessionId }: MarkAttendanceContainerProps) {
  const queryClient = useQueryClient();
  const confirm = useConfirm();

  // Queries for lookups
  const classesQuery = useClasses({ limit: 1000 });
  const roomsQuery = useRooms({ limit: 1000 });

  // Main attendance detail query
  const { data, isLoading, isError, error, refetch, isRefetching } = useSessionStudents(sessionId);

  // Mutations
  const saveMutation = useSaveStudentAttendance(sessionId);
  const updateSessionMutation = useUpdateClassSession();

  // Local state holding the list of students with current (possibly dirty) values
  const [localStudents, setLocalStudents] = React.useState<SessionAttendanceStudent[]>([]);

  // Initialize/Reset local state when database query resolves
  React.useEffect(() => {
    if (data?.students) {
      setLocalStudents(data.students);
    }
  }, [data]);

  // Track if there are unsaved changes
  const hasUnsavedChanges = React.useMemo(() => {
    return localStudents.some((s) => s.savedStatus === "dirty");
  }, [localStudents]);

  // Handle unload/leave warnings for unsaved changes
  React.useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "Bạn có thay đổi chưa lưu. Bạn có chắc chắn muốn rời đi?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Handlers for student changes
  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setLocalStudents((prev) =>
      prev.map((s) => {
        if (s.studentId !== studentId) return s;

        // Check if this status matches the database's original status
        const original = data?.students.find((orig) => orig.studentId === studentId);
        const isDirty = original ? original.status !== status : true;

        return {
          ...s,
          status,
          savedStatus: isDirty ? "dirty" : (original?.status ? "saved" : "not_marked"),
        };
      })
    );
  };

  const handleNoteChange = (studentId: string, note: string) => {
    setLocalStudents((prev) =>
      prev.map((s) => {
        if (s.studentId !== studentId) return s;

        // Check if this note matches the database's original note
        const original = data?.students.find((orig) => orig.studentId === studentId);
        const isDirty = original ? (original.note || "") !== note.trim() : note.trim() !== "";

        return {
          ...s,
          note: note,
          savedStatus: isDirty ? "dirty" : (original?.status ? "saved" : "not_marked"),
        };
      })
    );
  };

  // Bulk Actions
  const handleMarkAllPresent = () => {
    setLocalStudents((prev) =>
      prev.map((s) => {
        const original = data?.students.find((orig) => orig.studentId === s.studentId);
        const isDirty = original ? original.status !== "PRESENT" : true;

        return {
          ...s,
          status: "PRESENT" as AttendanceStatus,
          savedStatus: isDirty ? "dirty" : (original?.status ? "saved" : "not_marked"),
        };
      })
    );
  };

  const handleResetToSaved = async () => {
    if (!hasUnsavedChanges) return;
    const ok = await confirm({
      title: "Xác nhận khôi phục",
      description: "Bạn có chắc chắn muốn hủy tất cả thay đổi chưa lưu và khôi phục về dữ liệu đã lưu gần nhất?",
      confirmLabel: "Khôi phục",
      cancelLabel: "Hủy",
      variant: "default",
    });
    if (ok && data?.students) {
      setLocalStudents(data.students);
    }
  };

  const handleSave = async () => {
    const recordsToSubmit = localStudents
      .filter((s) => s.status !== null)
      .map((s) => ({
        studentId: s.studentId,
        status: s.status as AttendanceStatus,
        note: s.note ? s.note.trim() : null,
      }));

    if (recordsToSubmit.length === 0) {
      return;
    }

    const ok = await confirm({
      title: "Xác nhận lưu điểm danh",
      description: `Lưu điểm danh cho ${recordsToSubmit.length} học viên?`,
      confirmLabel: "Lưu dữ liệu",
      cancelLabel: "Hủy",
      variant: "default",
    });

    if (ok) {
      await saveMutation.mutateAsync({ records: recordsToSubmit });
    }
  };

  const handleCompleteSession = async () => {
    const ok = await confirm({
      title: "Hoàn tất buổi học",
      description: "Bạn có chắc chắn muốn xác nhận hoàn thành buổi học này? Thao tác này sẽ khóa điểm danh và chuyển đổi trạng thái của buổi học.",
      confirmLabel: "Xác nhận hoàn tất",
      cancelLabel: "Hủy",
      variant: "default",
    });
    if (ok) {
      await updateSessionMutation.mutateAsync(
        { id: sessionId, data: { status: "COMPLETED" } },
        {
          onSuccess: () => {
            refetch();
            toast.success("Buổi học đã được đánh dấu hoàn thành!");
          },
        }
      );
    }
  };

  const isSaving = saveMutation.isPending;
  const classes = classesQuery.data?.data ?? [];
  const rooms = roomsQuery.data?.data ?? [];

  if (isLoading || classesQuery.isLoading || roomsQuery.isLoading) {
    return <LoadingState variant="table" />;
  }

  if (isError || classesQuery.isError || roomsQuery.isError) {
    return (
      <ErrorState
        title="Không thể tải dữ liệu điểm danh"
        message={error?.message || "Đã xảy ra lỗi khi tải danh sách học viên điểm danh."}
        onRetry={refetch}
        isRetrying={isRefetching}
      />
    );
  }

  if (!data) {
    return <EmptyState title="Không tìm thấy thông tin buổi học" />;
  }

  const session = data.session;
  const students = localStudents;

  return (
    <div className="flex flex-col gap-6">
      {/* Session Metadata Header */}
      <SessionAttendanceHeader
        session={session}
        classes={classes}
        rooms={rooms}
      />

      {/* Dirty Warning Banner */}
      {hasUnsavedChanges && (
        <div className="flex items-center gap-3 bg-amber-50/70 border border-amber-200/80 p-4 rounded-2xl text-amber-800 backdrop-blur-md">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
          <p className="text-sm font-semibold">
            Bạn có thay đổi chưa lưu trên bảng điểm danh. Hãy chắc chắn nhấp vào nút "Lưu điểm danh" ở bên dưới trước khi thoát.
          </p>
        </div>
      )}

      {/* Action Controls & Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-white/40 bg-white/40 p-4 shadow-xs backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-2.5">
          {session.status === "PLANNED" && (
            <Button
              onClick={handleCompleteSession}
              disabled={isSaving || students.length === 0}
              className="font-semibold bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl shadow-md shadow-emerald-600/15 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle className="h-4 w-4" />
              Hoàn thành buổi học
            </Button>
          )}
          <Button
            onClick={handleMarkAllPresent}
            disabled={isSaving || students.length === 0 || session.status === "COMPLETED"}
            className="font-semibold bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl shadow-md shadow-emerald-600/15 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Check className="h-4 w-4" />
            Có mặt tất cả
          </Button>
          <Button
            variant="outline"
            onClick={handleResetToSaved}
            disabled={isSaving || !hasUnsavedChanges}
            className="font-semibold bg-white/60 hover:bg-white text-slate-700 px-4 py-2 rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer border-border/60"
          >
            <RotateCcw className="h-4 w-4" />
            Khôi phục đã lưu
          </Button>
        </div>

        <div>
          <Button
            onClick={handleSave}
            disabled={isSaving || students.length === 0 || !hasUnsavedChanges}
            className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-5 py-2 rounded-xl shadow-md shadow-[#FF161A]/15 transition-all inline-flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Đang lưu..." : "Lưu điểm danh"}
          </Button>
        </div>
      </div>

      {/* Main Table rendering */}
      {students.length === 0 ? (
        <EmptyState
          title="Không có học viên nào"
          description="Lớp học này chưa có học viên nào được đăng ký ghi danh."
        />
      ) : (
        <StudentAttendanceTable
          students={students}
          onStatusChange={handleStatusChange}
          onNoteChange={handleNoteChange}
          disabled={isSaving}
        />
      )}
    </div>
  );
}
