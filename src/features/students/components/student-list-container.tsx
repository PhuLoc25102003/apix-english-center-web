"use client";

/**
 * src/features/students/components/student-list-container.tsx
 *
 * Container component for the Student List. Handles state, fetching, error/empty states,
 * and passes events down to filters and tables.
 */

import * as React from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { EmptyState } from "@/components/feedback/empty-state";

import { useStudents } from "../hooks/use-students";
import { StudentFilters } from "./student-filters";
import { StudentTable } from "./student-table";

export function StudentListContainer() {
  const [search, setSearch] = React.useState("");
  const [studentType, setStudentType] = React.useState("");
  const [accessMode, setAccessMode] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [page, setPage] = React.useState(1);
  const limit = 10;

  // Reset page when filters change
  React.useEffect(() => {
    setPage(1);
  }, [search, studentType, accessMode, status]);

  const { data, isLoading, isError, error, refetch, isRefetching } = useStudents({
    page,
    limit,
    search: search || undefined,
    studentType: studentType || undefined,
    accessMode: accessMode || undefined,
    status: status || undefined,
  });

  const handleClearFilters = () => {
    setSearch("");
    setStudentType("");
    setAccessMode("");
    setStatus("");
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Quản lý Học Viên"
        description="Tra cứu danh sách học viên, theo dõi trạng thái học tập và thông tin kết nối tài khoản."
        action={
          <Button
            onClick={() => toast.info("Tính năng thêm học viên mới đang được phát triển")}
            className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl shadow-md shadow-[#FF161A]/15 transition-all inline-flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Thêm học viên
          </Button>
        }
      />

      <StudentFilters
        search={search}
        onSearchChange={setSearch}
        studentType={studentType}
        onStudentTypeChange={setStudentType}
        accessMode={accessMode}
        onAccessModeChange={setAccessMode}
        status={status}
        onStatusChange={setStatus}
      />

      {isLoading ? (
        <LoadingState variant="table" />
      ) : isError ? (
        <ErrorState
          title="Không thể tải danh sách"
          message={error?.message || "Đã xảy ra lỗi trong quá trình tải dữ liệu học viên."}
          onRetry={refetch}
          isRetrying={isRefetching}
        />
      ) : !data || data.data.length === 0 ? (
        <EmptyState
          title="Không tìm thấy học viên nào"
          description={
            search || studentType || accessMode || status
              ? "Không có học viên nào khớp với bộ lọc hiện tại. Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm."
              : "Hệ thống chưa có dữ liệu học viên nào."
          }
          actionLabel={search || studentType || accessMode || status ? "Xóa bộ lọc" : undefined}
          onAction={search || studentType || accessMode || status ? handleClearFilters : undefined}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <StudentTable students={data.data} />

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 px-2">
            <p className="text-sm text-slate-500">
              Hiển thị {data.data.length > 0 ? (page - 1) * limit + 1 : 0} -{" "}
              {Math.min(page * limit, data.meta.total)} trong tổng số {data.meta.total} học viên
            </p>
            {data.meta.totalPages > 1 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!data.meta.hasPreviousPage}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className="h-8 rounded-lg bg-white/60 hover:bg-white text-slate-700"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Trước
                </Button>
                <span className="text-sm font-semibold text-slate-700 select-none">
                  Trang {data.meta.page} / {data.meta.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!data.meta.hasNextPage}
                  onClick={() => setPage((prev) => Math.min(prev + 1, data.meta.totalPages))}
                  className="h-8 rounded-lg bg-white/60 hover:bg-white text-slate-700"
                >
                  Sau
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
