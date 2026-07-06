"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, Search, FileText } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { EmptyState } from "@/components/feedback/empty-state";
import { StatusBadge } from "@/components/common/status-badge";
import { Input } from "@/components/ui/input";
import { useClasses } from "@/features/classes/hooks/use-classes";
import { useReports } from "@/features/learning-reports/hooks/use-learning-reports";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LearningReportsPage() {
  const [search, setSearch] = React.useState("");
  const [classId, setClassId] = React.useState("");
  const [status, setStatus] = React.useState("");

  const classesQuery = useClasses({ limit: 100 });
  const classes = classesQuery.data?.data ?? [];

  const { data, isLoading, isError, refetch } = useReports({
    classId: classId || undefined,
    status: status || undefined,
  });

  const statusLabelVietnamese: Record<string, string> = {
    DRAFT: "Bản nháp",
    SUBMITTED: "Chờ phê duyệt",
    APPROVED: "Đã phê duyệt",
    REJECTED: "Bị từ chối",
    PUBLISHED: "Đã phát hành",
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Nhận xét học tập định kỳ"
        description="Quản lý các bản đánh giá năng lực học viên định kỳ (2 tháng/lần) do Giáo viên chuẩn bị."
        action={
          <Link
            href="/learning-reports/cycles"
            className="inline-flex h-10 items-center justify-center font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl shadow-md shadow-[#FF161A]/15 cursor-pointer text-xs"
          >
            Quản lý chu kỳ đánh giá
          </Link>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/40 bg-white/40 p-4 backdrop-blur-md">
        <div className="flex flex-1 items-center gap-3 max-w-xs">
          <Input
            placeholder="Tìm kiếm tên học viên..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 rounded-xl bg-white/60 focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            className="h-9 rounded-xl bg-white/60 border border-slate-200 text-xs font-semibold px-3 text-slate-700 cursor-pointer"
          >
            <option value="">Tất cả lớp học</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.classCode} - {c.name}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-9 rounded-xl bg-white/60 border border-slate-200 text-xs font-semibold px-3 text-slate-700 cursor-pointer"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="DRAFT">Bản nháp</option>
            <option value="SUBMITTED">Chờ duyệt</option>
            <option value="APPROVED">Đã duyệt</option>
            <option value="REJECTED">Bị từ chối</option>
            <option value="PUBLISHED">Đã phát hành</option>
          </select>
        </div>
      </div>

      {/* Reports Table */}
      {isLoading ? (
        <LoadingState variant="table" />
      ) : isError ? (
        <ErrorState title="Lỗi tải dữ liệu" onRetry={refetch} />
      ) : !data || data.data.length === 0 ? (
        <EmptyState title="Không tìm thấy nhận xét nào" />
      ) : (
        <div className="glass-card overflow-hidden border border-white/40 bg-white/40 shadow-xs rounded-2xl">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead>Mã học viên</TableHead>
                <TableHead>Học tên học viên</TableHead>
                <TableHead>Tổng quan học tập</TableHead>
                <TableHead>Thái độ</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-xs font-semibold">{item.studentCode}</TableCell>
                  <TableCell className="font-semibold text-slate-900">{item.studentName}</TableCell>
                  <TableCell className="text-slate-600 text-xs max-w-[240px] truncate">{item.learningSummary}</TableCell>
                  <TableCell className="text-slate-600 text-xs max-w-[180px] truncate">{item.attitudeSummary}</TableCell>
                  <TableCell>
                    <StatusBadge status={item.status} customLabel={statusLabelVietnamese[item.status]} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/learning-reports/${item.id}`}
                      className="inline-flex h-8 items-center justify-center rounded-lg bg-white border border-slate-200 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
                    >
                      Viết nhận xét
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
