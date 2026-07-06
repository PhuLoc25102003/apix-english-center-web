"use client";

/**
 * src/features/roles/components/role-list-container.tsx
 *
 * Orchestrator component for Roles management list view.
 */

import * as React from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { EmptyState } from "@/components/feedback/empty-state";
import { CrudFormModal } from "@/components/modals/crud-form-modal";
import { useConfirm } from "@/hooks/use-confirm";

import { useRoles } from "../hooks/use-roles";
import { useRoleDetail } from "../hooks/use-role-detail";
import { useCreateRole } from "../hooks/use-create-role";
import { useUpdateRole } from "../hooks/use-update-role";
import { RoleFilters } from "./role-filters";
import { RoleTable } from "./role-table";
import { getRoleFormConfig } from "../configs/role-form.config";
import { roleSchema, type RoleFormValues } from "../schemas/role.schema";

export function RoleListContainer() {
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [isSystem, setIsSystem] = React.useState("");
  const [page, setPage] = React.useState(1);
  const limit = 10;

  // Modal form states
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedRoleId, setSelectedRoleId] = React.useState<string | null>(null);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleStatusChange = (val: string) => {
    setStatus(val);
    setPage(1);
  };

  const handleIsSystemChange = (val: string) => {
    setIsSystem(val);
    setPage(1);
  };

  const activeParams = React.useMemo(() => {
    const params: Record<string, unknown> = {
      page,
      limit,
    };
    if (search) params.search = search;
    if (status) params.isActive = status === "ACTIVE";
    if (isSystem) params.isSystem = isSystem === "SYSTEM";
    return params;
  }, [page, limit, search, status, isSystem]);

  const { data, isLoading, isError, error, refetch, isRefetching } = useRoles(activeParams);

  // Query detail role for Edit mode
  const { data: roleDetail, isLoading: isLoadingDetail } = useRoleDetail(
    selectedRoleId || ""
  );

  const createMutation = useCreateRole();
  const updateMutation = useUpdateRole();
  const confirm = useConfirm();

  const handleClearFilters = () => {
    setSearch("");
    setStatus("");
    setIsSystem("");
    setPage(1);
  };

  const handleCreate = () => {
    setSelectedRoleId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    setSelectedRoleId(id);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (values: RoleFormValues) => {
    if (selectedRoleId) {
      // Edit mode
      const ok = await confirm({
        title: "Xác nhận cập nhật",
        description: `Bạn có chắc chắn muốn lưu các thay đổi cho vai trò ${roleDetail?.data?.name || ""}?`,
        confirmLabel: "Cập nhật",
        cancelLabel: "Hủy",
        variant: "default",
      });
      if (ok) {
        await updateMutation.mutateAsync(
          {
            id: selectedRoleId,
            data: {
              name: values.name.trim(),
              description: values.description ? values.description.trim() : null,
              isActive: values.isActive,
            },
          },
          {
            onSuccess: () => {
              setIsModalOpen(false);
              setSelectedRoleId(null);
            },
          }
        );
      }
    } else {
      // Create mode
      await createMutation.mutateAsync(values, {
        onSuccess: () => {
          setIsModalOpen(false);
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Quản lý vai trò (Roles)"
        description="Định cấu hình nhóm vai trò truy cập chính thức của toàn bộ hệ thống APIX."
        action={
          <Button
            onClick={handleCreate}
            className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl shadow-md shadow-[#FF161A]/15 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Thêm vai trò mới
          </Button>
        }
      />

      <RoleFilters
        search={search}
        onSearchChange={handleSearchChange}
        status={status}
        onStatusChange={handleStatusChange}
        isSystem={isSystem}
        onIsSystemChange={handleIsSystemChange}
      />

      {isLoading ? (
        <LoadingState variant="table" />
      ) : isError ? (
        <ErrorState
          title="Không thể tải danh sách"
          message={error?.message || "Đã xảy ra lỗi khi tải danh sách vai trò."}
          onRetry={refetch}
          isRetrying={isRefetching}
        />
      ) : !data || data.data.length === 0 ? (
        <EmptyState
          title="Không tìm thấy vai trò nào"
          description={
            search || status || isSystem
              ? "Không tìm thấy vai trò khớp với bộ lọc hiện tại. Hãy thử nhập từ khóa khác."
              : "Hệ thống chưa có dữ liệu vai trò."
          }
          actionLabel={search || status || isSystem ? "Xóa bộ lọc" : undefined}
          onAction={search || status || isSystem ? handleClearFilters : undefined}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <RoleTable roles={data.data} onEdit={handleEdit} />

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 px-2">
            <p className="text-sm text-slate-500">
              Hiển thị {data.data.length > 0 ? (page - 1) * limit + 1 : 0} -{" "}
              {Math.min(page * limit, data.meta.total)} trong tổng số {data.meta.total} vai trò
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

      {/* Reusable CRUD modal */}
      <CrudFormModal
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) setSelectedRoleId(null);
        }}
        title={selectedRoleId ? "Chỉnh sửa vai trò" : "Thêm vai trò mới"}
        description={
          selectedRoleId
            ? "Cập nhật thông tin chi tiết của vai trò."
            : "Nhập thông tin chi tiết để thêm một vai trò người dùng mới."
        }
        submitLabel={selectedRoleId ? "Cập nhật thông tin" : "Tạo vai trò"}
        configs={getRoleFormConfig(!!selectedRoleId)}
        validationSchema={roleSchema}
        initialValues={selectedRoleId ? roleDetail?.data : undefined}
        onSubmit={handleFormSubmit}
        isLoadingDetails={selectedRoleId ? isLoadingDetail : false}
      />
    </div>
  );
}
