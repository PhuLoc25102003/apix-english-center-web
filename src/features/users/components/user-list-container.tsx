"use client";

/**
 * src/features/users/components/user-list-container.tsx
 *
 * Orchestrator component for Users management list view.
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

import { useUsers } from "../hooks/use-users";
import { useUserDetail } from "../hooks/use-user-detail";
import { useCreateUser } from "../hooks/use-create-user";
import { useUpdateUser } from "../hooks/use-update-user";
import { UserFilters } from "./user-filters";
import { UserTable } from "./user-table";
import { getUserFormConfig } from "../configs/user-form.config";
import { userSchema, type UserFormValues } from "../schemas/user.schema";

export function UserListContainer() {
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [roleId, setRoleId] = React.useState("");
  const [campusId, setCampusId] = React.useState("");
  const [page, setPage] = React.useState(1);
  const limit = 10;

  // Modal form states
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(null);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleStatusChange = (val: string) => {
    setStatus(val);
    setPage(1);
  };

  const handleRoleIdChange = (val: string) => {
    setRoleId(val);
    setPage(1);
  };

  const handleCampusIdChange = (val: string) => {
    setCampusId(val);
    setPage(1);
  };

  const activeParams = React.useMemo(() => {
    const params: Record<string, unknown> = {
      page,
      limit,
    };
    if (search) params.search = search;
    if (status) params.status = status;
    if (roleId) params.roleId = roleId;
    if (campusId) params.campusId = campusId;
    return params;
  }, [page, limit, search, status, roleId, campusId]);

  const { data, isLoading, isError, error, refetch, isRefetching } = useUsers(activeParams);

  // Query detail user for Edit mode
  const { data: userDetail, isLoading: isLoadingDetail } = useUserDetail(
    selectedUserId || ""
  );

  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const confirm = useConfirm();

  const handleClearFilters = () => {
    setSearch("");
    setStatus("");
    setRoleId("");
    setCampusId("");
    setPage(1);
  };

  const handleCreate = () => {
    setSelectedUserId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    setSelectedUserId(id);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (values: UserFormValues) => {
    // Sanitize values
    const payload = {
      fullName: values.fullName.trim(),
      email: values.email ? values.email.trim() : null,
      phone: values.phone ? values.phone.trim() : null,
      username: values.username ? values.username.trim() : null,
      status: values.status,
    };

    if (selectedUserId) {
      // Edit mode
      const ok = await confirm({
        title: "Xác nhận cập nhật",
        description: `Bạn có chắc chắn muốn lưu các thay đổi cho người dùng ${userDetail?.data?.fullName || ""}?`,
        confirmLabel: "Cập nhật",
        cancelLabel: "Hủy",
        variant: "default",
      });
      if (ok) {
        await updateMutation.mutateAsync(
          { id: selectedUserId, data: payload },
          {
            onSuccess: () => {
              setIsModalOpen(false);
              setSelectedUserId(null);
            },
          }
        );
      }
    } else {
      // Create mode
      const createPayload = {
        ...payload,
        temporaryPassword: values.temporaryPassword ? values.temporaryPassword : null,
      };
      await createMutation.mutateAsync(createPayload, {
        onSuccess: () => {
          setIsModalOpen(false);
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Quản lý Người Dùng (Users)"
        description="Tra cứu tài khoản truy cập, gán nhóm quyền vai trò, khóa tài khoản hoặc đặt lại mật khẩu tạm thời."
        action={
          <Button
            onClick={handleCreate}
            className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl shadow-md shadow-[#FF161A]/15 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Thêm người dùng mới
          </Button>
        }
      />

      <UserFilters
        search={search}
        onSearchChange={handleSearchChange}
        status={status}
        onStatusChange={handleStatusChange}
        roleId={roleId}
        onRoleIdChange={handleRoleIdChange}
        campusId={campusId}
        onCampusIdChange={handleCampusIdChange}
      />

      {isLoading ? (
        <LoadingState variant="table" />
      ) : isError ? (
        <ErrorState
          title="Không thể tải danh sách"
          message={error?.message || "Đã xảy ra lỗi khi tải danh sách người dùng."}
          onRetry={refetch}
          isRetrying={isRefetching}
        />
      ) : !data || data.data.length === 0 ? (
        <EmptyState
          title="Không tìm thấy người dùng nào"
          description={
            search || status || roleId || campusId
              ? "Không tìm thấy người dùng khớp với bộ lọc hiện tại. Hãy thử nhập từ khóa khác."
              : "Hệ thống chưa có dữ liệu tài khoản người dùng."
          }
          actionLabel={search || status || roleId || campusId ? "Xóa bộ lọc" : undefined}
          onAction={search || status || roleId || campusId ? handleClearFilters : undefined}
        />
      ) : (
        <div className="flex flex-col gap-4">
          <UserTable users={data.data} onEdit={handleEdit} />

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 px-2">
            <p className="text-sm text-slate-500">
              Hiển thị {data.data.length > 0 ? (page - 1) * limit + 1 : 0} -{" "}
              {Math.min(page * limit, data.meta.total)} trong tổng số {data.meta.total} người dùng
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
          if (!open) setSelectedUserId(null);
        }}
        title={selectedUserId ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
        description={
          selectedUserId
            ? "Cập nhật thông tin chi tiết của tài khoản người dùng."
            : "Nhập thông tin chi tiết để thêm một tài khoản đăng nhập mới vào hệ thống."
        }
        submitLabel={selectedUserId ? "Cập nhật thông tin" : "Tạo người dùng"}
        configs={getUserFormConfig(!!selectedUserId)}
        validationSchema={userSchema}
        initialValues={selectedUserId ? userDetail?.data : undefined}
        onSubmit={handleFormSubmit}
        isLoadingDetails={selectedUserId ? isLoadingDetail : false}
      />
    </div>
  );
}
