"use client";

/**
 * src/app/(dashboard)/campuses/page.tsx
 *
 * Main campuses page. Lists campuses with filters, search, and pagination.
 * Integrates reusable CRUD Modal Form System for creating and updating campuses.
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
  useCampuses,
  useCampus,
  useCreateCampus,
  useUpdateCampus,
  CampusTable,
  campusFormConfig,
  campusSchema,
  type CampusFormValues,
} from "@/features/campuses";

export default function CampusesPage() {
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const limit = 10;

  // Modal form states
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedCampusId, setSelectedCampusId] = React.useState<string | null>(null);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const { data, isLoading, isError, error, refetch, isRefetching } = useCampuses({
    page,
    limit,
    search: search || undefined,
  });

  // Query detail campus for Edit mode
  const { data: campusDetail, isLoading: isLoadingDetail } = useCampus(
    selectedCampusId || ""
  );

  const createMutation = useCreateCampus();
  const updateMutation = useUpdateCampus();
  const confirm = useConfirm();

  const handleClearFilters = () => {
    setSearch("");
    setPage(1);
  };

  const handleCreate = () => {
    setSelectedCampusId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    setSelectedCampusId(id);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (values: CampusFormValues) => {
    // Intercept to clean up empty fields to null
    const payload = {
      code: values.code.trim(),
      name: values.name.trim(),
      address: values.address ? values.address.trim() : null,
      phone: values.phone ? values.phone.trim() : null,
      description: values.description ? values.description.trim() : null,
      isActive: values.isActive,
    };

    if (selectedCampusId) {
      // Edit mode
      const ok = await confirm({
        title: "Xác nhận cập nhật",
        description: `Bạn có chắc chắn muốn lưu các thay đổi cho cơ sở ${campusDetail?.data?.name || ""}?`,
        confirmLabel: "Cập nhật",
        cancelLabel: "Hủy",
        variant: "default",
      });
      if (ok) {
        await updateMutation.mutateAsync(
          { id: selectedCampusId, data: payload },
          {
            onSuccess: () => {
              setIsModalOpen(false);
              setSelectedCampusId(null);
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
        title="Quản lý Cơ Sở"
        description="Tra cứu và quản lý danh sách các cơ sở (campuses) của trung tâm Anh ngữ APIX."
        action={
          <Button
            onClick={handleCreate}
            className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl shadow-md shadow-[#FF161A]/15 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Thêm cơ sở
          </Button>
        }
      />

      <div className="flex bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-xs">
        <SearchInput
          placeholder="Tìm kiếm mã, tên, địa chỉ..."
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
          message={error?.message || "Đã xảy ra lỗi khi tải danh sách cơ sở."}
          onRetry={refetch}
          isRetrying={isRefetching}
        />
      ) : !data || data.data.length === 0 ? (
        <EmptyState
          title="Không tìm thấy cơ sở nào"
          description={
            search
              ? "Không tìm thấy cơ sở khớp với bộ lọc hiện tại. Hãy thử nhập từ khóa khác."
              : "Hệ thống chưa có dữ liệu cơ sở."
          }
          actionLabel={search ? "Xóa bộ lọc" : undefined}
          onAction={search ? handleClearFilters : undefined}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <CampusTable campuses={data.data} onEdit={handleEdit} />

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 px-2">
            <p className="text-sm text-slate-500">
              Hiển thị {data.data.length > 0 ? (page - 1) * limit + 1 : 0} -{" "}
              {Math.min(page * limit, data.meta.total)} trong tổng số {data.meta.total} cơ sở
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
          if (!open) setSelectedCampusId(null);
        }}
        title={selectedCampusId ? "Chỉnh sửa cơ sở" : "Thêm cơ sở mới"}
        description={
          selectedCampusId
            ? "Cập nhật thông tin chi tiết của cơ sở."
            : "Nhập thông tin chi tiết để thêm một cơ sở học tập mới."
        }
        submitLabel={selectedCampusId ? "Cập nhật thông tin" : "Thêm cơ sở"}
        configs={campusFormConfig}
        validationSchema={campusSchema}
        initialValues={selectedCampusId ? campusDetail?.data : undefined}
        onSubmit={handleFormSubmit}
        isLoadingDetails={selectedCampusId ? isLoadingDetail : false}
      />
    </div>
  );
}
