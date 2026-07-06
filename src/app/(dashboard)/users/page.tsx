import type { Metadata } from "next";
import { UserListContainer } from "@/features/users";

export const metadata: Metadata = {
  title: "Quản lý Người Dùng | APIX English Center",
  description: "Quản lý danh sách tài khoản người dùng, vai trò truy cập và cài đặt bảo mật hệ thống.",
};

export default function UsersPage() {
  return <UserListContainer />;
}
