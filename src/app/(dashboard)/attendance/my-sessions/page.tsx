"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock, Users, ArrowLeft } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { EmptyState } from "@/components/feedback/empty-state";
import { useMyClasses } from "@/features/classes";
import { useClassSessions } from "@/features/attendance";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function MySessionsPage() {
  const router = useRouter();
  const { data: classesData, isLoading: isLoadingClasses, isError: isErrorClasses, error: errorClasses, refetch: refetchClasses } = useMyClasses();

  const classes = classesData?.data ?? [];
  const [selectedClassId, setSelectedClassId] = React.useState<string>("");

  // Set default class on load
  React.useEffect(() => {
    if (classes.length > 0 && !selectedClassId) {
      setSelectedClassId(classes[0].id);
    }
  }, [classes, selectedClassId]);

  // Fetch sessions for the selected class
  const { data: sessionsData, isLoading: isLoadingSessions, refetch: refetchSessions } = useClassSessions({
    classId: selectedClassId || undefined,
    limit: 100,
  });

  const sessions = sessionsData?.data ?? [];

  const formatLocalDate = (val: string | null | undefined) => {
    if (!val) return "-";
    const parts = val.split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return val;
  };

  if (isLoadingClasses) {
    return <LoadingState variant="spinner" className="min-h-[400px]" />;
  }

  if (isErrorClasses) {
    return (
      <ErrorState
        title="Lỗi tải danh sách lớp học"
        message={errorClasses?.message || "Không thể tải danh sách lớp dạy của bạn."}
        onRetry={refetchClasses}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/dashboard/teacher")}
          className="text-slate-500 hover:text-slate-900 rounded-lg h-9 px-3 gap-1 inline-flex items-center cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Quay lại Dashboard</span>
        </Button>
      </div>

      <PageHeader
        title="Buổi dạy & Điểm danh của tôi"
        description="Quản lý điểm danh và xem danh sách các buổi học được phân công giảng dạy."
      />

      {/* Select class filter */}
      <div className="flex flex-wrap gap-4 bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-xs items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Lớp dạy:</span>
          {classes.length === 0 ? (
            <span className="text-sm font-semibold text-slate-400 italic">Chưa được phân công lớp nào</span>
          ) : (
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="h-10 rounded-xl bg-white/60 focus:bg-white border border-slate-200 text-xs font-semibold px-3 text-slate-700 outline-none cursor-pointer min-w-[250px]"
            >
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.classCode} - {cls.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Sessions list */}
      {!selectedClassId ? (
        <EmptyState
          icon={<Users className="h-8 w-8 text-slate-400" />}
          title="Chưa được phân công lớp học nào"
          description="Liên hệ với Giáo vụ / Quản lý để được phân công lớp học."
        />
      ) : isLoadingSessions ? (
        <LoadingState variant="table" />
      ) : sessions.length === 0 ? (
        <EmptyState
          icon={<CalendarDays className="h-8 w-8 text-slate-400" />}
          title="Chưa có buổi học nào được sinh"
          description="Yêu cầu Giáo vụ cấu hình thời khóa biểu cố định để sinh các buổi học tự động."
        />
      ) : (
        <div className="glass-card p-6 border border-white/40 shadow-xs rounded-2xl bg-white/50">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Buổi học</TableHead>
                  <TableHead>Ngày học</TableHead>
                  <TableHead>Giờ học</TableHead>
                  <TableHead>Phòng học</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="w-[120px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.map((session: any) => (
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
                        onClick={() => router.push(`/sessions/${session.id}/attendance`)}
                        className="bg-[#FF161A] text-white hover:bg-[#C90012] text-xs font-semibold h-8 rounded-lg cursor-pointer inline-flex items-center gap-1 shadow-sm"
                      >
                        <Clock className="h-3 w-3" />
                        Điểm danh
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
