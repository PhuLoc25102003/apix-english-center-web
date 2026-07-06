"use client";

/**
 * src/features/users/components/user-role-assignment.tsx
 *
 * Interface to view and manage user roles.
 */

import * as React from "react";
import { Plus, Shield, AlertCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useConfirm } from "@/hooks/use-confirm";
import { useRoleLookup } from "@/features/roles/hooks/use-roles";
import { useUserRoles } from "../hooks/use-user-detail";
import { useAssignUserRoles } from "../hooks/use-assign-user-roles";
import { useRemoveUserRole } from "../hooks/use-remove-user-role";

interface UserRoleAssignmentProps {
  userId: string;
}

export function UserRoleAssignment({ userId }: UserRoleAssignmentProps) {
  // Query lookup of roles
  const { data: lookupData, isLoading: isLoadingLookup } = useRoleLookup();
  const roles = lookupData?.data || [];

  // Query currently assigned roles
  const { data: userRolesData, isLoading: isLoadingUserRoles } = useUserRoles(userId);
  const userRoles = userRolesData?.data || [];

  const assignMutation = useAssignUserRoles();
  const removeMutation = useRemoveUserRole();
  const confirm = useConfirm();

  const [selectedRoleId, setSelectedRoleId] = React.useState("");

  if (isLoadingLookup || isLoadingUserRoles) {
    return (
      <div className="glass-card p-6 border border-white/40 shadow-xs rounded-2xl animate-pulse h-48 bg-white/20" />
    );
  }

  // Filter out roles that are already assigned to the user
  const availableRoles = roles.filter(
    (role) => !userRoles.some((userRole) => userRole.id === role.id)
  );

  const handleAssignRole = async () => {
    if (!selectedRoleId) {
      toast.error("Vui lòng chọn vai trò!");
      return;
    }
    const currentRoleIds = userRoles.map((r) => r.id);
    await assignMutation.mutateAsync(
      {
        userId,
        roleIds: [...currentRoleIds, selectedRoleId],
      },
      {
        onSuccess: () => {
          setSelectedRoleId("");
        },
      }
    );
  };

  const handleRemoveRole = async (roleId: string, roleName: string) => {
    const ok = await confirm({
      title: "Xác nhận gỡ vai trò",
      description: `Bạn có chắc chắn muốn gỡ vai trò "${roleName}" khỏi người dùng này?`,
      confirmLabel: "Gỡ",
      cancelLabel: "Hủy",
      variant: "destructive",
    });
    if (ok) {
      await removeMutation.mutateAsync({ userId, roleId });
    }
  };

  return (
    <div className="glass-card p-6 border border-white/40 shadow-xs rounded-2xl flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 shrink-0">
          <Shield className="h-5 w-5 text-slate-500" />
        </div>
        <div>
          <h4 className="font-display text-sm font-bold text-slate-800">Quản lý vai trò (Roles)</h4>
          <p className="text-xs text-slate-500 font-medium">Gán hoặc gỡ quyền vai trò truy cập của người dùng này.</p>
        </div>
      </div>

      <div className="border-t border-slate-100/80 my-1" />

      {/* Currently assigned roles list */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Vai trò đã gán</span>
        <div className="flex flex-wrap gap-2.5">
          {userRoles.map((role) => (
            <div
              key={role.id}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-semibold bg-[#FFE8EA] text-[#C90012] border border-[#FF161A]/10 group transition-all"
            >
              <span>{role.name}</span>
              <button
                type="button"
                onClick={() => handleRemoveRole(role.id, role.name)}
                disabled={removeMutation.isPending}
                className="h-4 w-4 shrink-0 rounded-full hover:bg-[#FF161A]/10 flex items-center justify-center cursor-pointer text-[#FF161A] transition-colors"
                title="Gỡ vai trò"
              >
                ×
              </button>
            </div>
          ))}
          {userRoles.length === 0 && (
            <div className="flex items-center gap-2 text-amber-600 bg-amber-50/50 border border-amber-200/50 p-3 rounded-xl w-full text-xs font-semibold">
              <AlertCircle className="h-4 w-4 shrink-0" />
              Chưa có vai trò nào được gán cho người dùng này. Người dùng này không thể truy cập hệ thống.
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-slate-100/80 my-1" />

      {/* Add new role picker */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Gán vai trò mới</span>
        <div className="flex items-center gap-3 mt-1">
          <Select
            value={selectedRoleId}
            onValueChange={(val) => setSelectedRoleId(val || "")}
            items={availableRoles.map(r => ({ value: r.id, label: r.name }))}
            disabled={assignMutation.isPending}
          >
            <SelectTrigger className="flex-1 h-10 bg-white/60 focus:bg-white border-border/60 text-sm rounded-xl">
              <SelectValue placeholder="Chọn vai trò..." />
            </SelectTrigger>
            <SelectContent>
              {availableRoles.map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={handleAssignRole}
            disabled={!selectedRoleId || assignMutation.isPending}
            className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 h-10 rounded-xl shadow-md shadow-[#FF161A]/15 transition-all inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            Gán vai trò
          </Button>
        </div>
      </div>
    </div>
  );
}
