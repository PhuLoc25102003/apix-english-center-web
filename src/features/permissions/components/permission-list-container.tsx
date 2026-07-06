"use client";

/**
 * src/features/permissions/components/permission-list-container.tsx
 *
 * Container component for Permission Management page.
 */

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { EmptyState } from "@/components/feedback/empty-state";

import { usePermissions } from "../hooks/use-permissions";
import { PermissionFilters } from "./permission-filters";
import { PermissionTable } from "./permission-table";

export function PermissionListContainer() {
  const [search, setSearch] = React.useState("");
  const [module, setModule] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [page, setPage] = React.useState(1);
  const limit = 10;

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleModuleChange = (val: string) => {
    setModule(val);
    setPage(1);
  };

  const handleStatusChange = (val: string) => {
    setStatus(val);
    setPage(1);
  };

  const activeParams = React.useMemo(() => {
    const params: Record<string, unknown> = {
      page,
      limit,
    };
    if (search) params.search = search;
    if (module) params.module = module;
    if (status) params.isActive = status === "ACTIVE";
    return params;
  }, [page, limit, search, module, status]);

  const { data, isLoading, isError, error, refetch, isRefetching } = usePermissions(activeParams);

  const handleClearFilters = () => {
    setSearch("");
    setModule("");
    setStatus("");
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Danh mục Quyền hạn (Permissions)"
        description="Tra cứu mã quyền hạn của hệ thống làm cơ sở gán cho các vai trò truy cập."
      />

      <PermissionFilters
        search={search}
        onSearchChange={handleSearchChange}
        module={module}
        onModuleChange={handleModuleChange}
        status={status}
        onStatusChange={handleStatusChange}
      />

      {isLoading ? (
        <LoadingState variant="table" />
      ) : isError ? (
        <ErrorState
          title="Không thể tải danh sách"
          message={error?.message || "Đã xảy ra lỗi trong quá trình tải dữ liệu quyền."}
          onRetry={refetch}
          isRetrying={isRefetching}
        />
      ) : !data || data.data.length === 0 ? (
        <EmptyState
          title="Không tìm thấy quyền hạn nào"
          description={
            search || module || status
              ? "Không có quyền nào khớp với bộ lọc hiện tại. Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm."
              : "Hệ thống chưa có dữ liệu quyền hạn."
          }
          actionLabel={search || module || status ? "Xóa bộ lọc" : undefined}
          onAction={search || module || status ? handleClearFilters : undefined}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <PermissionTable permissions={data.data} />

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 px-2">
            <p className="text-sm text-slate-500">
              Hiển thị {data.data.length > 0 ? (page - 1) * limit + 1 : 0} -{" "}
              {Math.min(page * limit, data.meta.total)} trong tổng số {data.meta.total} quyền
            </p>
            {data.meta.totalPages > 1 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!data.meta.hasPreviousPage}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className="h-8 rounded-lg bg-white/60 hover:bg-white text-slate-700 cursor-pointer"
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
                  className="h-8 rounded-lg bg-white/60 hover:bg-white text-slate-700 cursor-pointer"
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
