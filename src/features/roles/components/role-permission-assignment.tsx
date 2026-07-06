"use client";

/**
 * src/features/roles/components/role-permission-assignment.tsx
 *
 * UI to manage permission mapping for a specific Role.
 * Groups permissions by module and allows checking/unchecking.
 */

import * as React from "react";
import { ShieldCheck, Save, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingState } from "@/components/feedback/loading-state";
import { usePermissionLookup } from "@/features/permissions/hooks/use-permissions";
import { useRolePermissions } from "../hooks/use-role-detail";
import { useAssignRolePermissions } from "../hooks/use-assign-role-permissions";
import type { Permission } from "@/features/permissions/types/permission.type";

interface RolePermissionAssignmentProps {
  roleId: string;
}

export function RolePermissionAssignment({ roleId }: RolePermissionAssignmentProps) {
  // Query all system permissions
  const { data: allPermsData, isLoading: isLoadingAll } = usePermissionLookup();
  // Query currently assigned permissions
  const { data: rolePermsData, isLoading: isLoadingRole } = useRolePermissions(roleId);
  // Mutation to save
  const assignMutation = useAssignRolePermissions();

  const [search, setSearch] = React.useState("");
  const [checkedIds, setCheckedIds] = React.useState<string[]>([]);

  // Initialize checked list when role permissions load
  React.useEffect(() => {
    if (rolePermsData?.data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCheckedIds(rolePermsData.data.map((p) => p.id));
    }
  }, [rolePermsData]);

  if (isLoadingAll || isLoadingRole) {
    return <LoadingState variant="spinner" className="min-h-[200px]" />;
  }

  const allPermissions = allPermsData?.data || [];

  // Group and filter permissions
  const filteredPermissions = allPermissions.filter((p) => {
    const term = search.toLowerCase();
    return (
      p.code.toLowerCase().includes(term) ||
      (p.description && p.description.toLowerCase().includes(term)) ||
      p.module.toLowerCase().includes(term)
    );
  });

  // Group by module name
  const groupedPermissions: Record<string, Permission[]> = {};
  filteredPermissions.forEach((p) => {
    if (!groupedPermissions[p.module]) {
      groupedPermissions[p.module] = [];
    }
    groupedPermissions[p.module].push(p);
  });

  const handleToggle = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleModule = (moduleName: string, modulePerms: Permission[]) => {
    const moduleIds = modulePerms.map((p) => p.id);
    const allChecked = moduleIds.every((id) => checkedIds.includes(id));

    if (allChecked) {
      // Uncheck all in this module
      setCheckedIds((prev) => prev.filter((id) => !moduleIds.includes(id)));
    } else {
      // Check all in this module
      setCheckedIds((prev) => {
        const otherIds = prev.filter((id) => !moduleIds.includes(id));
        return [...otherIds, ...moduleIds];
      });
    }
  };

  const handleSave = async () => {
    await assignMutation.mutateAsync({
      roleId,
      permissionIds: checkedIds,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header and Save Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-xs">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <Input
            placeholder="Tìm mã quyền, phân hệ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 bg-white/60 focus:bg-white border-border/60 text-xs rounded-xl"
          />
        </div>

        <Button
          onClick={handleSave}
          disabled={assignMutation.isPending}
          className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 h-9 rounded-xl shadow-md shadow-[#FF161A]/15 transition-all inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          Lưu phân quyền
        </Button>
      </div>

      {/* Permissions Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(groupedPermissions).map(([moduleName, perms]) => {
          const moduleIds = perms.map((p) => p.id);
          const checkedModuleCount = moduleIds.filter((id) => checkedIds.includes(id)).length;
          const isAllChecked = checkedModuleCount === perms.length;

          return (
            <div
              key={moduleName}
              className="glass-card border border-white/40 bg-white/40 shadow-xs rounded-2xl flex flex-col overflow-hidden"
            >
              {/* Module Header */}
              <div className="bg-slate-50/60 p-4 border-b border-slate-100 flex items-center justify-between">
                <span className="font-display text-sm font-bold text-slate-800">
                  {moduleName} ({checkedModuleCount}/{perms.length})
                </span>
                <button
                  type="button"
                  onClick={() => handleToggleModule(moduleName, perms)}
                  className="text-xs font-bold text-[#C90012] hover:underline cursor-pointer select-none"
                >
                  {isAllChecked ? "Bỏ chọn tất cả" : "Chọn tất cả"}
                </button>
              </div>

              {/* Permission Items */}
              <div className="p-4 flex flex-col gap-3.5 max-h-80 overflow-y-auto scrollbar-thin">
                {perms.map((perm) => {
                  const isChecked = checkedIds.includes(perm.id);
                  return (
                    <div
                      key={perm.id}
                      onClick={() => handleToggle(perm.id)}
                      className="flex items-start gap-3 cursor-pointer group select-none"
                    >
                      <div className="shrink-0 mt-0.5 text-slate-400 group-hover:text-slate-600 transition-colors">
                        {isChecked ? (
                          <ShieldCheck className="h-5 w-5 text-[#FF161A]" />
                        ) : (
                          <div className="h-5 w-5 rounded-md border-2 border-slate-300 group-hover:border-slate-400 transition-colors" />
                        )}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-mono font-bold text-slate-800 break-all leading-tight">
                          {perm.code}
                        </span>
                        {perm.description && (
                          <span className="text-[10px] font-medium text-slate-500 leading-snug">
                            {perm.description}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {Object.keys(groupedPermissions).length === 0 && (
          <div className="md:col-span-2 lg:col-span-3 py-12 flex justify-center text-slate-400 text-sm font-semibold">
            Không tìm thấy quyền hạn nào.
          </div>
        )}
      </div>
    </div>
  );
}
