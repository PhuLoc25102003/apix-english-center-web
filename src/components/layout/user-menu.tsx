"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronDown, LayoutDashboard, LogOut, ShieldCheck } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { logoutRequest } from "@/features/auth/api/auth.api";
import {
  clearCurrentUser,
  getCurrentUser,
} from "@/lib/auth/current-user-storage";
import { clearAccessToken } from "@/lib/auth/token-storage";

const roleLabels: Record<string, string> = {
  OWNER: "Chủ sở hữu hệ thống",
  ADMIN: "Quản trị viên",
  MANAGER: "Quản lý trung tâm",
  TEACHER: "Giáo viên",
  STAFF: "Nhân viên",
};

export function UserMenu() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const user = getCurrentUser();

  const fullName = user?.fullName ?? "Người dùng APIX";
  const email = user?.email ?? "Tài khoản đang hoạt động";
  const role = user?.roles[0]
    ? (roleLabels[user.roles[0]] ?? user.roles[0])
    : "Thành viên hệ thống";
  const initials = getInitials(fullName);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await logoutRequest();
    } catch {
      // Always complete local logout if the API is temporarily unavailable.
    } finally {
      clearAccessToken();
      clearCurrentUser();
      queryClient.clear();
      setConfirmOpen(false);
      setIsLoggingOut(false);
      router.replace("/login");
    }
  };

  return (
    <>
      <DropdownMenu>
      <DropdownMenuTrigger
        className="group flex items-center gap-2 rounded-xl p-1.5 pr-2 outline-none transition-colors hover:bg-white/80 focus-visible:ring-2 focus-visible:ring-[#FF161A]/35"
        aria-label={`Mở menu tài khoản của ${fullName}`}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-apix-gradient text-xs font-bold text-white shadow-md shadow-[#FF161A]/15">
          {initials}
        </span>
        <span className="hidden min-w-0 flex-col text-left sm:flex">
          <span className="max-w-36 truncate text-xs font-bold text-[#111827]">
            {fullName}
          </span>
          <span className="max-w-36 truncate text-[10px] text-[#6B7280]">
            {role}
          </span>
        </span>
        <ChevronDown className="h-4 w-4 text-[#9CA3AF] transition-transform group-data-[popup-open]:rotate-180" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-72 rounded-2xl border border-white/80 bg-white/95 p-2 shadow-2xl shadow-black/10 backdrop-blur-xl"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-start gap-3 rounded-xl bg-[#FFF7F7] p-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FF161A] text-sm font-bold text-white">
              {initials}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold text-[#111827]">
                {fullName}
              </span>
              <span className="mt-0.5 block truncate text-xs font-normal text-[#6B7280]">
                {email}
              </span>
              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#FFE7E8] px-2.5 py-1 text-[10px] font-bold text-[#C90012]">
                <ShieldCheck className="h-3 w-3" />
                {role}
              </span>
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-2 bg-[#FF161A]/10" />

        <DropdownMenuItem
          onClick={() => router.push("/dashboard")}
          className="cursor-pointer gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#374151] focus:bg-[#FFF1F2] focus:text-[#C90012]"
        >
          <LayoutDashboard className="h-4 w-4 text-[#6B7280]" />
          Trang tổng quan
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2 bg-[#FF161A]/10" />

        <DropdownMenuItem
          variant="destructive"
          onClick={() => setConfirmOpen(true)}
          className="cursor-pointer gap-3 rounded-xl px-3 py-2.5 font-semibold text-[#C90012] focus:bg-red-50 focus:text-[#C90012]"
        >
          <LogOut className="h-4 w-4" />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Xác nhận đăng xuất"
        description="Bạn có chắc muốn đăng xuất khỏi hệ thống APIX? Phiên đăng nhập ghi nhớ trên thiết bị này sẽ bị xóa."
        confirmLabel="Đăng xuất"
        cancelLabel="Ở lại"
        onConfirm={handleLogout}
        isConfirming={isLoggingOut}
        variant="destructive"
      />
    </>
  );
}

function getInitials(fullName: string): string {
  const words = fullName.trim().split(/\s+/).filter(Boolean);

  return words
    .slice(-2)
    .map((word) => word.charAt(0).toLocaleUpperCase("vi"))
    .join("");
}
