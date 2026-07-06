"use client";

import * as React from "react";
import { CheckCircle2, AlertCircle, AlertTriangle, Lock, ShieldCheck } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AttendanceStatusControl } from "./attendance-status-control";
import type { SessionAttendanceStudent, AttendanceStatus } from "../types/attendance.type";

interface StudentAttendanceTableProps {
  students: SessionAttendanceStudent[];
  onStatusChange: (studentId: string, status: AttendanceStatus) => void;
  onNoteChange: (studentId: string, note: string) => void;
  onAbsentReasonChange?: (studentId: string, reason: string) => void;
  disabled?: boolean;
}

export function StudentAttendanceTable({
  students,
  onStatusChange,
  onNoteChange,
  onAbsentReasonChange,
  disabled = false,
}: StudentAttendanceTableProps) {
  return (
    <div className="glass-card overflow-hidden border border-white/40 shadow-xs rounded-2xl">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-b border-slate-100">
              <TableHead className="font-semibold text-slate-600 h-12 w-[120px]">Mã học viên</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12 w-[180px]">Họ và tên</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12 w-[320px]">Trạng thái điểm danh</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Ghi chú & Lý do vắng</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12 w-[140px] text-center">Nguồn/Khóa</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12 w-[150px] text-center">Trạng thái lưu</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12 w-[180px]">Người thực hiện</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => {
              // Status indicators:
              let saveStatusBadge = null;
              if (student.savedStatus === "saved") {
                saveStatusBadge = (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="h-3 w-3" />
                    Đã lưu
                  </span>
                );
              } else if (student.savedStatus === "dirty") {
                saveStatusBadge = (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                    <AlertTriangle className="h-3 w-3" />
                    Chưa lưu
                  </span>
                );
              } else {
                saveStatusBadge = (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-500 border border-slate-200">
                    <AlertCircle className="h-3 w-3" />
                    Chưa điểm danh
                  </span>
                );
              }

              const isLockedState = student.isLocked || false;
              const isCellDisabled = disabled || isLockedState;

              return (
                <TableRow
                  key={student.studentId}
                  className={cn(
                    "border-b border-slate-100 hover:bg-slate-50/40 transition-colors",
                    isLockedState && "bg-slate-50/20 opacity-80"
                  )}
                >
                  <TableCell className="font-mono text-xs font-semibold text-slate-600 tabular-nums">
                    {student.studentCode}
                  </TableCell>
                  <TableCell className="font-semibold text-slate-900">
                    <span className="flex items-center gap-1.5">
                      {student.studentName}
                      {isLockedState && (
                        <span title="Đã khóa bởi Office Staff">
                          <Lock className="h-3 w-3 text-slate-400" />
                        </span>
                      )}
                    </span>
                  </TableCell>
                  <TableCell>
                    <AttendanceStatusControl
                      value={student.status}
                      onChange={(status) => onStatusChange(student.studentId, status)}
                      disabled={isCellDisabled}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Nhập ghi chú học tập..."
                        value={student.note || ""}
                        onChange={(e) => onNoteChange(student.studentId, e.target.value)}
                        disabled={isCellDisabled}
                        className="h-9 rounded-xl bg-white/60 focus:bg-white border-border/60 transition-colors placeholder:text-slate-400 text-xs"
                      />
                      {student.status === "ABSENT" && (
                        <select
                          value={student.absentReason || ""}
                          onChange={(e) => onAbsentReasonChange && onAbsentReasonChange(student.studentId, e.target.value)}
                          disabled={isCellDisabled}
                          className="h-9 rounded-xl bg-white/60 border border-border/60 text-xs font-semibold text-slate-700 px-2.5 focus:bg-white outline-none"
                        >
                          <option value="">-- Lý do vắng --</option>
                          <option value="SICK">Bị ốm</option>
                          <option value="FAMILY">Việc gia đình</option>
                          <option value="NO_REASON">Không lý do</option>
                        </select>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className={cn(
                        "text-[9px] font-bold px-1.5 py-0.5 rounded-md",
                        student.source === "OFFICE_STAFF" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"
                      )}>
                        {student.source || "TEACHER"}
                      </span>
                      {isLockedState && (
                        <span className="text-[9px] font-bold text-slate-500 flex items-center gap-0.5">
                          <Lock className="h-2 w-2" /> KHÓA
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {saveStatusBadge}
                  </TableCell>
                  <TableCell className="text-slate-500 text-xs font-medium max-w-[180px] truncate">
                    {student.markedBy ? (
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-slate-700">{student.markedBy}</span>
                        {student.markedAt && (
                          <span className="text-[10px] text-slate-400 tabular-nums">
                            {new Date(student.markedAt).toLocaleTimeString("vi-VN")}
                          </span>
                        )}
                      </div>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
