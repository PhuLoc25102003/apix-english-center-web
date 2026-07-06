"use client";

import * as React from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/common/search-input";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { EmptyState } from "@/components/feedback/empty-state";
import { CrudFormModal } from "@/components/modals/crud-form-modal";
import { useConfirm } from "@/hooks/use-confirm";
import { hasPermission } from "@/lib/permissions/has-permission";

import {
  usePositions,
  usePosition,
  useCreatePosition,
  useUpdatePosition,
  PositionTable,
  positionFormConfig,
  positionSchema,
  type PositionFormValues,
} from "@/features/positions";

export default function PositionsPage() {
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const limit = 10;

  // Modal form states
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedPositionId, setSelectedPositionId] = React.useState<string | null>(null);

  const { data, isLoading, isError, error, refetch, isRefetching } = usePositions({
    page,
    limit,
    search: search || undefined,
  });

  const { data: positionDetail, isLoading: isLoadingDetail } = usePosition(
    selectedPositionId || ""
  );

  const createMutation = useCreatePosition();
  const updateMutation = useUpdatePosition();
  const confirm = useConfirm();

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setPage(1);
  };

  const handleCreate = () => {
    setSelectedPositionId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    setSelectedPositionId(id);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (values: PositionFormValues) => {
    const payload = {
      code: values.code.toUpperCase().trim(),
      name: values.name.trim(),
      description: values.description ? values.description.trim() : null,
      isTeachingPosition: values.isTeachingPosition,
      isActive: values.isActive,
    };

    if (selectedPositionId) {
      const ok = await confirm({
        title: "Xác nhận cập nhật",
        description: `Bạn có chắc chắn muốn lưu các thay đổi cho chức vụ ${positionDetail?.data?.name || ""}?`,
        confirmLabel: "Cập nhật",
        cancelLabel: "Hủy",
        variant: "default",
      });
      if (ok) {
        await updateMutation.mutateAsync(
          { id: selectedPositionId, data: payload },
          {
            onSuccess: () => {
              setIsModalOpen(false);
              setSelectedPositionId(null);
            },
          }
        );
      }
    } else {
      await createMutation.mutateAsync(payload, {
        onSuccess: () => {
          setIsModalOpen(false);
        },
      });
    }
  };

  const canCreate = hasPermission("position:create");

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Quản lý Chức Vụ (Positions)"
        description="Định cấu hình danh mục các vị trí, chức vụ hành chính, giảng dạy và vận hành tại hệ thống Anh ngữ APIX."
        action={
          canCreate ? (
            <Button
              onClick={handleCreate}
              className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl shadow-md shadow-[#FF161A]/15 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Thêm chức vụ
            </Button>
          ) : null
        }
      />

      <div className="flex bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-xs">
        <SearchInput
          placeholder="Tìm mã hoặc tên chức vụ..."
          value={search}
          onChange={handleSearchChange}
          className="w-full sm:max-w-xs"
        />
      </div>

      {isLoading ? (
        <LoadingState variant="table" />
      ) : isError ? (
        <ErrorState
          title="Không thể tải danh sách chức vụ"
          message={error?.message || "Đã xảy ra lỗi khi tải danh sách."}
          onRetry={refetch}
          isRetrying={isRefetching}
        />
      ) : !data || data.data.length === 0 ? (
        <EmptyState
          title="Không tìm thấy chức vụ nào"
          description={
            search
              ? "Không có chức vụ nào khớp với từ khóa tìm kiếm."
              : "Hệ thống chưa có dữ liệu chức vụ."
          }
          actionLabel={search ? "Xóa tìm kiếm" : undefined}
          onAction={search ? handleClearFilters : undefined}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <PositionTable positions={data.data} onEdit={handleEdit} />

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 px-2">
            <p className="text-sm text-slate-500">
              Hiển thị {data.data.length > 0 ? (page - 1) * limit + 1 : 0} -{" "}
              {Math.min(page * limit, data.meta.total)} trong tổng số {data.meta.total} chức vụ
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

      {/* Crud modal form */}
      <CrudFormModal
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) setSelectedPositionId(null);
        }}
        title={selectedPositionId ? "Chỉnh sửa chức vụ" : "Thêm chức vụ mới"}
        description={
          selectedPositionId
            ? "Cập nhật thông tin chi tiết chức vụ."
            : "Nhập thông tin chi tiết chức vụ mới."
        }
        submitLabel={selectedPositionId ? "Cập nhật" : "Thêm chức vụ"}
        configs={positionFormConfig}
        validationSchema={positionSchema}
        initialValues={selectedPositionId ? positionDetail?.data : undefined}
        onSubmit={handleFormSubmit}
        isLoadingDetails={selectedPositionId ? isLoadingDetail : false}
      />
    </div>
  );
}
