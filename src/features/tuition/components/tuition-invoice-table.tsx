"use client";

import { StatusBadge } from "@/components/common/status-badge";
import { formatVnd } from "@/components/forms/money-input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  TuitionInvoice,
  TuitionInvoiceStatus,
} from "../types/tuition.type";

interface TuitionInvoiceTableProps {
  invoices: TuitionInvoice[];
  showStudent?: boolean;
  showClass?: boolean;
}

const statusLabels: Record<TuitionInvoiceStatus, string> = {
  UNPAID: "Chưa thanh toán",
  PARTIALLY_PAID: "Thanh toán một phần",
  PAID: "Đã thanh toán",
  OVERDUE: "Quá hạn",
  CANCELLED: "Đã hủy",
  REFUNDED: "Đã hoàn tiền",
};

function formatMonth(value: string): string {
  const [year, month] = value.split("-");
  return year && month ? `${month}/${year}` : value;
}

function formatPeriod(invoice: TuitionInvoice): string {
  const start = formatMonth(invoice.billingStartMonth);
  const end = formatMonth(invoice.billingEndMonth);
  return start === end ? start : `${start} - ${end}`;
}

export function TuitionInvoiceTable({
  invoices,
  showStudent = false,
  showClass = false,
}: TuitionInvoiceTableProps) {
  return (
    <div className="glass-card overflow-hidden rounded-2xl border border-white/40 shadow-xs">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead>Mã hóa đơn</TableHead>
              {showStudent && <TableHead>Học viên</TableHead>}
              {showClass && <TableHead>Lớp học</TableHead>}
              <TableHead>Kỳ học phí</TableHead>
              <TableHead className="text-center">Số tháng</TableHead>
              <TableHead className="text-right">Phí/tháng</TableHead>
              <TableHead className="text-right">Giảm giá</TableHead>
              <TableHead className="text-right">Tổng tiền</TableHead>
              <TableHead className="text-right">Đã trả</TableHead>
              <TableHead className="text-right">Còn nợ</TableHead>
              <TableHead>Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-mono text-xs font-semibold text-slate-600">
                  {invoice.invoiceNo}
                </TableCell>
                {showStudent && (
                  <TableCell>
                    <span className="block font-semibold text-slate-900">
                      {invoice.studentName}
                    </span>
                    <span className="text-xs text-slate-500">{invoice.studentCode}</span>
                  </TableCell>
                )}
                {showClass && (
                  <TableCell>
                    <span className="block font-semibold text-slate-900">
                      {invoice.className || "-"}
                    </span>
                    <span className="text-xs text-slate-500">{invoice.classCode || ""}</span>
                  </TableCell>
                )}
                <TableCell className="whitespace-nowrap font-semibold text-slate-700">
                  {formatPeriod(invoice)}
                </TableCell>
                <TableCell className="text-center tabular-nums">
                  {invoice.numberOfMonths}
                </TableCell>
                <TableCell className="text-right whitespace-nowrap tabular-nums">
                  {formatVnd(invoice.monthlyFee)}
                </TableCell>
                <TableCell className="text-right whitespace-nowrap tabular-nums text-emerald-700">
                  {invoice.discountAmount > 0
                    ? `-${formatVnd(invoice.discountAmount)}`
                    : formatVnd(0)}
                </TableCell>
                <TableCell className="text-right font-semibold whitespace-nowrap tabular-nums">
                  {formatVnd(invoice.totalAmount)}
                </TableCell>
                <TableCell className="text-right whitespace-nowrap tabular-nums">
                  {formatVnd(invoice.paidAmount)}
                </TableCell>
                <TableCell className="text-right font-semibold whitespace-nowrap tabular-nums text-rose-700">
                  {formatVnd(invoice.remainingAmount)}
                </TableCell>
                <TableCell>
                  <StatusBadge
                    status={invoice.status}
                    customLabel={statusLabels[invoice.status]}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
