"use client";

import * as React from "react";
import Link from "next/link";
import { CreditCard, Plus, Receipt, DollarSign, RotateCcw } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function TuitionPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Quản lý học phí (Tuition)"
        description="Quản lý học phí trọn gói, tạo hóa đơn tự động hàng tháng, thu học phí và hỗ trợ chính sách hoàn phí / bảo lưu."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Link href="/tuition/invoices" className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl hover:bg-white/60 transition-all cursor-pointer flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Hóa đơn học phí</span>
            <span className="text-xs text-slate-400">Xem, tạo mới hóa đơn học phí của học viên</span>
          </div>
          <div className="rounded-xl bg-[#FFE7E8] p-2 text-[#C90012]">
            <Receipt className="h-5 w-5" />
          </div>
        </Link>

        <Link href="/tuition/payments" className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl hover:bg-white/60 transition-all cursor-pointer flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Lịch sử thanh toán</span>
            <span className="text-xs text-slate-400">Ghi nhận các giao dịch nộp tiền học phí</span>
          </div>
          <div className="rounded-xl bg-[#FFE7E8] p-2 text-[#C90012]">
            <DollarSign className="h-5 w-5" />
          </div>
        </Link>

        <Link href="/tuition/refunds" className="glass-card p-6 border border-white/60 bg-white/40 shadow-xs backdrop-blur-md rounded-2xl hover:bg-white/60 transition-all cursor-pointer flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Hoàn phí & Bảo lưu</span>
            <span className="text-xs text-slate-400">Xem các yêu cầu hoàn trả hoặc cấp credit</span>
          </div>
          <div className="rounded-xl bg-[#FFE7E8] p-2 text-[#C90012]">
            <RotateCcw className="h-5 w-5" />
          </div>
        </Link>
      </div>
    </div>
  );
}
