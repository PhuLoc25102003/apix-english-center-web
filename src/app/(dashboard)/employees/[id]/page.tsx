"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  User,
  Calendar,
  Building,
  ShieldAlert,
  Phone,
  MapPin,
  Clock,
  Notebook,
  Briefcase,
} from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { StatusBadge } from "@/components/common/status-badge";
import { useEmployee } from "@/features/employees";

const statusLabels: Record<string, string> = {
  ACTIVE: "Đang làm việc",
  INACTIVE: "Tạm ngưng",
  ON_LEAVE: "Nghỉ phép dài hạn",
  TERMINATED: "Đã thôi việc",
};

export default function EmployeeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, isError, error, refetch, isRefetching } = useEmployee(id);

  if (isLoading) {
    return <LoadingState variant="spinner" className="min-h-[400px]" />;
  }

  if (isError || !data?.data) {
    return (
      <ErrorState
        title="Lỗi tải thông tin"
        message={error?.message || "Không thể tải hồ sơ nhân sự."}
        onRetry={refetch}
        isRetrying={isRefetching}
      />
    );
  }

  const employee = data.data;

  const formatLocalDate = (val: string | null | undefined) => {
    if (!val) return "-";
    const parts = val.split("-");
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${day}/${month}/${year}`;
    }
    return val;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/employees")}
          className="text-slate-500 hover:text-slate-900 rounded-lg h-9 px-3 gap-1 inline-flex items-center cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Quay lại</span>
        </Button>
      </div>

      <PageHeader
        title={`Nhân sự: ${employee.fullName}`}
        description={`Thông tin chi tiết hồ sơ ${employee.fullName} (Mã: ${employee.employeeCode}).`}
        action={
          <StatusBadge
            status={employee.employmentStatus}
            customLabel={statusLabels[employee.employmentStatus]}
            className="px-3 py-1.5"
          />
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Avatar Card */}
        <div className="glass-card p-6 border border-white/40 shadow-xs rounded-2xl flex flex-col items-center text-center justify-center gap-4 bg-white/50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-apix-gradient text-3xl font-bold text-white shadow-lg shadow-[#FF161A]/20">
            {employee.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="font-display text-lg font-bold text-slate-800">{employee.fullName}</h4>
            <p className="text-xs font-mono font-semibold text-slate-500 mt-1">{employee.employeeCode}</p>
          </div>
        </div>

        {/* Basic Information */}
        <div className="md:col-span-2 glass-card p-6 border border-white/40 shadow-xs rounded-2xl grid gap-5 sm:grid-cols-2 bg-white/50">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Ngày sinh</span>
              <span className="text-sm font-semibold text-slate-800">{formatLocalDate(employee.dateOfBirth)}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Giới tính</span>
              <span className="text-sm font-semibold text-slate-800">
                {employee.gender === "MALE" ? "Nam" : employee.gender === "FEMALE" ? "Nữ" : "Khác"}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Building className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Cơ sở chính</span>
              <span className="text-sm font-semibold text-slate-800">{employee.campusName || "Chưa phân bổ"}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Briefcase className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Chức danh / Vai trò</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {employee.positions && employee.positions.length > 0 ? (
                  employee.positions.map((pos) => (
                    <span
                      key={pos.id}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200"
                    >
                      {pos.name}
                    </span>
                  ))
                ) : (
                  <span className="text-sm font-medium text-slate-400 italic">Chưa chỉ định chức danh</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Ngày bắt đầu làm việc</span>
              <span className="text-sm font-semibold text-slate-800">{formatLocalDate(employee.hiredDate)}</span>
            </div>
          </div>

          {employee.resignedDate && (
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-rose-400 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Ngày nghỉ việc</span>
                <span className="text-sm font-semibold text-rose-600">{formatLocalDate(employee.resignedDate)}</span>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3 sm:col-span-2">
            <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Địa chỉ liên hệ</span>
              <span className="text-sm font-semibold text-slate-800">{employee.address || "-"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact & Notes */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass-card p-6 border border-white/40 shadow-xs rounded-2xl bg-white/50 flex flex-col gap-4">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-[#FF161A]" />
            Liên hệ khẩn cấp
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-slate-400 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Họ tên liên hệ</span>
                <span className="text-sm font-semibold text-slate-800">{employee.emergencyContactName || "-"}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-slate-400 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Số điện thoại</span>
                <span className="text-sm font-semibold text-slate-800">{employee.emergencyContactPhone || "-"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 border border-white/40 shadow-xs rounded-2xl bg-white/50 flex flex-col gap-4">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <Notebook className="h-4 w-4 text-[#FF161A]" />
            Ghi chú nội bộ
          </h3>
          <p className="text-sm text-slate-600 italic whitespace-pre-wrap">{employee.note || "Không có ghi chú nào."}</p>
        </div>
      </div>
    </div>
  );
}
