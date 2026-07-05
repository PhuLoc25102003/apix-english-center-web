"use client";

/**
 * src/features/parents/components/parent-list-container.tsx
 *
 * Container component for the Parent List. Coordinates state, queries, and layouts.
 */

import * as React from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/common/search-input";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { EmptyState } from "@/components/feedback/empty-state";

import { useParents } from "../hooks/use-parents";
import { ParentTable } from "./parent-table";

// Modal refactoring imports
import { CrudFormModal } from "@/components/modals/crud-form-modal";
import { parentFormConfig } from "../configs/parent-form.config";
import { parentSchema, type ParentFormValues } from "../schemas/parent.schema";
import { useParent } from "../hooks/use-parent";
import { useCreateParent } from "../hooks/use-create-parent";
import { useUpdateParent } from "../hooks/use-update-parent";
import { useConfirm } from "@/hooks/use-confirm";

export function ParentListContainer() {
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const limit = 10;

  // Modal form states
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedParentId, setSelectedParentId] = React.useState<string | null>(null);

  // Synchronous filter update handler that resets page to 1
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const { data, isLoading, isError, error, refetch, isRefetching } = useParents({
    page,
    limit,
    search: search || undefined,
  });

  // Query detail parent for Edit mode
  const { data: parentDetail, isLoading: isLoadingDetail } = useParent(
    selectedParentId || ""
  );

  const createMutation = useCreateParent();
  const updateMutation = useUpdateParent();
  const confirm = useConfirm();

  const handleClearFilters = () => {
    setSearch("");
    setPage(1);
  };

  const handleCreate = () => {
    setSelectedParentId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    setSelectedParentId(id);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (values: ParentFormValues) => {
    // Intercept to clean up empty email to null
    const payload = {
      ...values,
      email: values.email ? values.email.trim() : null,
    };

    if (selectedParentId) {
      // Edit mode
      const ok = await confirm({
        title: "Xác nhận cập nhật",
        description: `Bạn có chắc chắn muốn lưu các thay đổi cho phụ huynh ${parentDetail?.data?.fullName || ""}?`,
        confirmLabel: "Cập nhật",
        cancelLabel: "Hủy",
        variant: "default",
      });
      if (ok) {
        await updateMutation.mutateAsync(
          { id: selectedParentId, data: payload },
          {
            onSuccess: () => {
              setIsModalOpen(false);
              setSelectedParentId(null);
            },
          }
        );
      }
    } else {
      // Create mode
      await createMutation.mutateAsync(payload, {
        onSuccess: () => {
          setIsModalOpen(false);
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Quản lý Phụ Huynh"
        description="Tra cứu và quản lý danh sách hồ sơ phụ huynh, thông tin liên lạc và tài khoản truy cập."
        action={
          <Button
            onClick={handleCreate}
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
          onChange={handleSearchChange}
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
          <ParentTable parents={data.data} onEdit={handleEdit} />

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

      {/* Reusable form modal */}
      <CrudFormModal
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) setSelectedParentId(null);
        }}
        title={selectedParentId ? "Chỉnh sửa hồ sơ phụ huynh" : "Thêm hồ sơ phụ huynh mới"}
        description={
          selectedParentId
            ? "Cập nhật thông tin chi tiết của phụ huynh."
            : "Nhập thông tin cá nhân và phương thức liên lạc của phụ huynh mới."
        }
        submitLabel={selectedParentId ? "Cập nhật thông tin" : "Thêm phụ huynh"}
        configs={parentFormConfig}
        validationSchema={parentSchema}
        initialValues={selectedParentId ? parentDetail?.data : undefined}
        onSubmit={handleFormSubmit}
        isLoadingDetails={selectedParentId ? isLoadingDetail : false}
      />
    </div>
  );
}

