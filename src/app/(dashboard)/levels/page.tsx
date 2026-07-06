"use client";

/**
 * src/app/(dashboard)/levels/page.tsx
 *
 * Main levels page. Lists levels with filters, search, and pagination.
 * Integrates reusable CRUD Modal Form System for creating and updating levels.
 */

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

import {
  useLevels,
  useLevel,
  useCreateLevel,
  useUpdateLevel,
  LevelTable,
  levelFormConfig,
  levelSchema,
  type LevelFormValues,
} from "@/features/levels";

export default function LevelsPage() {
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const limit = 10;

  // Modal form states
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedLevelId, setSelectedLevelId] = React.useState<string | null>(null);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const { data, isLoading, isError, error, refetch, isRefetching } = useLevels({
    page,
    limit,
    search: search || undefined,
  });

  // Query detail level for Edit mode
  const { data: levelDetail, isLoading: isLoadingDetail } = useLevel(
    selectedLevelId || ""
  );

  const createMutation = useCreateLevel();
  const updateMutation = useUpdateLevel();
  const confirm = useConfirm();

  const handleClearFilters = () => {
    setSearch("");
    setPage(1);
  };

  const handleCreate = () => {
    setSelectedLevelId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    setSelectedLevelId(id);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (values: LevelFormValues) => {
    const payload = {
      code: values.code.trim(),
      name: values.name.trim(),
      orderIndex: values.orderIndex,
      description: values.description ? values.description.trim() : null,
      isActive: values.isActive,
    };

    if (selectedLevelId) {
      // Edit mode
      const ok = await confirm({
        title: "Xác nhận cập nhật",
        description: `Bạn có chắc chắn muốn lưu các thay đổi cho cấp độ ${levelDetail?.data?.name || ""}?`,
        confirmLabel: "Cập nhật",
        cancelLabel: "Hủy",
        variant: "default",
      });
      if (ok) {
        await updateMutation.mutateAsync(
          { id: selectedLevelId, data: payload },
          {
            onSuccess: () => {
              setIsModalOpen(false);
              setSelectedLevelId(null);
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
        title="Quản lý Cấp Độ Đào Tạo"
        description="Tra cứu và quản lý danh sách các cấp độ (levels) giảng dạy của trung tâm Anh ngữ APIX."
        action={
          <Button
            onClick={handleCreate}
            className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl shadow-md shadow-[#FF161A]/15 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Thêm cấp độ
          </Button>
        }
      />

      <div className="flex bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-xs">
        <SearchInput
          placeholder="Tìm kiếm mã, tên..."
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
          message={error?.message || "Đã xảy ra lỗi khi tải danh sách cấp độ."}
          onRetry={refetch}
          isRetrying={isRefetching}
        />
      ) : !data || data.data.length === 0 ? (
        <EmptyState
          title="Không tìm thấy cấp độ nào"
          description={
            search
              ? "Không tìm thấy cấp độ khớp với bộ lọc hiện tại. Hãy thử nhập từ khóa khác."
              : "Hệ thống chưa có dữ liệu cấp độ."
          }
          actionLabel={search ? "Xóa bộ lọc" : undefined}
          onAction={search ? handleClearFilters : undefined}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <LevelTable levels={data.data} onEdit={handleEdit} />

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 px-2">
            <p className="text-sm text-slate-500">
              Hiển thị {data.data.length > 0 ? (page - 1) * limit + 1 : 0} -{" "}
              {Math.min(page * limit, data.meta.total)} trong tổng số {data.meta.total} cấp độ
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

      {/* Reusable CRUD modal */}
      <CrudFormModal
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) setSelectedLevelId(null);
        }}
        title={selectedLevelId ? "Chỉnh sửa cấp độ" : "Thêm cấp độ mới"}
        description={
          selectedLevelId
            ? "Cập nhật thông tin chi tiết của cấp độ đào tạo."
            : "Nhập thông tin chi tiết để thiết lập một cấp độ đào tạo mới."
        }
        submitLabel={selectedLevelId ? "Cập nhật thông tin" : "Thêm cấp độ"}
        configs={levelFormConfig}
        validationSchema={levelSchema}
        initialValues={selectedLevelId ? levelDetail?.data : undefined}
        onSubmit={handleFormSubmit}
        isLoadingDetails={selectedLevelId ? isLoadingDetail : false}
      />
    </div>
  );
}
