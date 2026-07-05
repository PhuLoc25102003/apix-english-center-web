"use client";

/**
 * src/features/parents/components/parent-list-container.tsx
 *
 * Container component for the Parent List. Coordinates state, queries, and layouts.
 */

import * as React from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/common/search-input";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { EmptyState } from "@/components/feedback/empty-state";

import { useParents } from "../hooks/use-parents";
import { ParentTable } from "./parent-table";

export function ParentListContainer() {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const limit = 10;

  // Reset page when filter changes
  React.useEffect(() => {
    setPage(1);
  }, [search]);

  const { data, isLoading, isError, error, refetch, isRefetching } = useParents({
    page,
    limit,
    search: search || undefined,
  });

  const handleClearFilters = () => {
    setSearch("");
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Quản lý Phụ Huynh"
        description="Tra cứu và quản lý danh sách hồ sơ phụ huynh, thông tin liên lạc và tài khoản truy cập."
        action={
          <Button
            onClick={() => router.push("/parents/new")}
            className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl shadow-md shadow-[#FF161A]/15 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Thêm phụ huynh
          </Button>
        }
      />

      <div className="flex bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-xs">
        <SearchInput
          placeholder="Tìm kiếm tên, SĐT, email..."
          value={search}
          onChange={setSearch}
          className="w-full sm:max-w-xs"
        />
      </div>

      {isLoading ? (
        <LoadingState variant="table" />
      ) : isError ? (
        <ErrorState
          title="Không thể tải danh sách"
          message={error?.message || "Đã xảy ra lỗi khi tải danh sách phụ huynh."}
          onRetry={refetch}
          isRetrying={isRefetching}
        />
      ) : !data || data.data.length === 0 ? (
        <EmptyState
          title="Không tìm thấy phụ huynh nào"
          description={
            search
              ? "Không tìm thấy phụ huynh khớp với bộ lọc hiện tại. Hãy thử nhập từ khóa khác."
              : "Hệ thống chưa có dữ liệu phụ huynh."
          }
          actionLabel={search ? "Xóa bộ lọc" : undefined}
          onAction={search ? handleClearFilters : undefined}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <ParentTable parents={data.data} />

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 px-2">
            <p className="text-sm text-slate-500">
              Hiển thị {data.data.length > 0 ? (page - 1) * limit + 1 : 0} -{" "}
              {Math.min(page * limit, data.meta.total)} trong tổng số {data.meta.total} phụ huynh
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
