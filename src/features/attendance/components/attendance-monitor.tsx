"use client";

import * as React from "react";
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  Phone,
  Search,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOfficeDashboard } from "@/features/dashboard/hooks/use-dashboard";
import { ConfirmDialog } from "@/components/common/confirm-dialog";

export function AttendanceMonitor() {
  const { data, isLoading } = useOfficeDashboard();
  const [filterText, setFilterText] = React.useState("");
  const [selectedAbsentStudent, setSelectedAbsentStudent] = React.useState<any | null>(null);
  const [isContacting, setIsContacting] = React.useState(false);

  // Fallback lists if data not loaded
  const absentStudents = React.useMemo(() => [
    { id: "s-1", name: "Nguyễn Văn A", classCode: "STA1-26", parentName: "Nguyễn Văn B", parentPhone: "0901234567", hasNotice: true, noticeReason: "Ốm đau có xin phép" },
    { id: "s-2", name: "Trần Thị B", classCode: "FLB2-12", parentName: "Trần Văn C", parentPhone: "0987654321", hasNotice: false, noticeReason: "" },
    { id: "s-3", name: "Lê Hoàng C", classCode: "MOA2-08", parentName: "Lê Văn D", parentPhone: "0912345678", hasNotice: false, noticeReason: "" },
  ], []);

  if (isLoading || !data) {
    return (
      <div className="flex h-96 items-center justify-center">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#FF161A]" />
      </div>
    );
  }

  const { todayClasses } = data;

  const handleContact = (student: any) => {
    setSelectedAbsentStudent(student);
  };

  const handleConfirmContact = () => {
    setIsContacting(true);
    setTimeout(() => {
      setIsContacting(false);
      setSelectedAbsentStudent(null);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Attendance Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Chưa bắt đầu</span>
            <span className="font-display text-2xl font-black text-slate-900">
              {todayClasses.filter(c => c.status === "NOT_STARTED").length} lớp
            </span>
          </div>
          <div className="rounded-xl bg-slate-100 p-2 text-slate-500">
            <Clock className="h-5 w-5" />
          </div>
        </div>

        <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Đang tiến hành</span>
            <span className="font-display text-2xl font-black text-blue-900">
              {todayClasses.filter(c => c.status === "IN_PROGRESS").length} lớp
            </span>
          </div>
          <div className="rounded-xl bg-blue-100 p-2 text-blue-600">
            <Activity className="h-5 w-5" />
          </div>
        </div>

        <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Quá hạn (30 phút+)</span>
            <span className="font-display text-2xl font-black text-rose-900">
              {todayClasses.filter(c => c.status === "OVERDUE").length} lớp
            </span>
          </div>
          <div className="rounded-xl bg-red-100 p-2 text-[#C90012]">
            <AlertCircle className="h-5 w-5" />
          </div>
        </div>

        <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Đã hoàn thành</span>
            <span className="font-display text-2xl font-black text-emerald-900">
              {todayClasses.filter(c => c.status === "REVIEWED").length} lớp
            </span>
          </div>
          <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Classes Monitor List */}
        <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl md:col-span-2">
          <h3 className="font-display text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
            Bảng điều phối lớp học hôm nay
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/50 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-2.5 px-3">Lớp học</th>
                  <th className="py-2.5 px-3">Giờ dạy</th>
                  <th className="py-2.5 px-3">Phòng / GV</th>
                  <th className="py-2.5 px-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {todayClasses.map((c) => (
                  <tr key={c.id} className="border-b border-slate-200/30 text-xs text-slate-700 hover:bg-white/30">
                    <td className="py-3 px-3">
                      <span className="block font-bold text-slate-900">{c.className}</span>
                      <span className="block font-mono text-[9px] text-slate-500 mt-0.5">{c.classCode}</span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-800">{c.timeSlot}</td>
                    <td className="py-3 px-3">
                      <span className="block font-medium text-slate-800">{c.roomCode}</span>
                      <span className="block text-[9px] text-slate-500">{c.teacherName}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={cn(
                        "inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide",
                        c.status === "OVERDUE" ? "bg-red-100 text-red-800" :
                        c.status === "IN_PROGRESS" ? "bg-blue-100 text-blue-800" :
                        c.status === "REVIEWED" ? "bg-emerald-100 text-emerald-800" :
                        "bg-slate-100 text-slate-800"
                      )}>
                        {c.status === "OVERDUE" ? "Quá hạn" :
                         c.status === "IN_PROGRESS" ? "Đang học" :
                         c.status === "REVIEWED" ? "Đã duyệt" :
                         "Chờ học"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Absent Students Tracker */}
        <div className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl">
          <h3 className="font-display text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Users className="h-4 w-4 text-[#FF161A]" />
            Học viên vắng hôm nay
          </h3>

          <div className="flex flex-col gap-3">
            {absentStudents.map((student) => (
              <div key={student.id} className="border border-slate-200/50 bg-white/50 p-3 rounded-xl flex flex-col justify-between gap-2 shadow-2xs">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-950">{student.name}</span>
                    <span className="font-mono text-[9px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">{student.classCode}</span>
                  </div>
                  <span className="block text-[10px] text-slate-600 mt-1">Phụ huynh: {student.parentName}</span>
                </div>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/30">
                  <span className={cn(
                    "text-[9px] font-bold rounded-full px-2 py-0.5",
                    student.hasNotice ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-[#C90012]"
                  )}>
                    {student.hasNotice ? "Có phép" : "Không phép"}
                  </span>
                  
                  <button
                    onClick={() => handleContact(student)}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFE7E8] text-[#C90012] hover:bg-[#FF161A] hover:text-white transition-colors cursor-pointer"
                  >
                    <Phone className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedAbsentStudent && (
        <ConfirmDialog
          open={!!selectedAbsentStudent}
          onOpenChange={() => setSelectedAbsentStudent(null)}
          title="Tạo nhật ký liên hệ phụ huynh"
          description={`Ghi nhận thông tin gọi điện cho phụ huynh học viên ${selectedAbsentStudent.name} (${selectedAbsentStudent.parentPhone})?`}
          confirmLabel="Lưu nhật ký"
          cancelLabel="Hủy"
          onConfirm={handleConfirmContact}
          isConfirming={isContacting}
        />
      )}
    </div>
  );
}
