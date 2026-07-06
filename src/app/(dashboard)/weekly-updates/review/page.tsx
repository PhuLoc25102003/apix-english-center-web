"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Eye } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { EmptyState } from "@/components/feedback/empty-state";
import { StatusBadge } from "@/components/common/status-badge";
import { useWeeklyUpdates } from "@/features/weekly-updates/hooks/use-weekly-updates";

export default function WeeklyUpdatesReviewPage() {
  const { data, isLoading, isError, refetch } = useWeeklyUpdates({
    status: "SUBMITTED",
  });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Duyệt báo cáo học tập tuần (Office Review)"
        description="Danh sách các báo cáo tuần và bài tập về nhà do Giáo viên nộp lên. Vui lòng kiểm tra và duyệt nội dung trước khi phát hành tới Phụ huynh học viên."
      />

      {isLoading ? (
        <LoadingState variant="table" />
      ) : isError ? (
        <ErrorState title="Lỗi tải danh sách cần duyệt" onRetry={refetch} />
      ) : !data || data.data.filter(i => i.status === "SUBMITTED").length === 0 ? (
        <EmptyState title="Không có báo cáo nào đang chờ duyệt" />
      ) : (
        <div className="glass-card overflow-hidden border border-white/40 bg-white/40 shadow-xs rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/50 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Lớp học</th>
                <th className="py-3 px-4">Tiêu đề báo cáo</th>
                <th className="py-3 px-4">Khoảng thời gian</th>
                <th className="py-3 px-4">Người nộp</th>
                <th className="py-3 px-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {data.data
                .filter((item) => item.status === "SUBMITTED")
                .map((item) => (
                  <tr key={item.id} className="border-b border-slate-200/30 text-xs text-slate-700 hover:bg-white/30">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {item.className} ({item.classCode})
                    </td>
                    <td className="py-3.5 px-4 font-semibold">{item.title}</td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {item.weekStartDate} ~ {item.weekEndDate}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{item.submittedBy || "Giáo viên chính"}</td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/weekly-updates/${item.id}`}
                        className="inline-flex h-8 items-center justify-center rounded-lg bg-[#FF161A] px-3.5 text-xs font-semibold text-white hover:bg-[#C90012] transition-colors shadow-sm cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5 mr-1" /> Kiểm tra & Duyệt
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
