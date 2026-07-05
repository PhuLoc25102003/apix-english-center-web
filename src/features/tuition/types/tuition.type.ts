import type { ListParams } from "@/lib/api";

export type TuitionInvoiceStatus =
  | "UNPAID"
  | "PARTIALLY_PAID"
  | "PAID"
  | "OVERDUE"
  | "CANCELLED"
  | "REFUNDED";

export type TuitionDiscountType = "NONE" | "PERCENTAGE" | "FIXED_AMOUNT";

export interface TuitionInvoice {
  id: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  classId: string | null;
  className: string | null;
  classCode: string | null;
  enrollmentId: string | null;
  tuitionPackageId: string | null;
  tuitionPackageName: string | null;
  invoiceNo: string;
  title: string;
  description: string | null;
  billingStartMonth: string;
  billingEndMonth: string;
  numberOfMonths: number;
  monthlyFee: number;
  subtotalAmount: number;
  discountType: TuitionDiscountType;
  discountValue: number;
  discountAmount: number;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  dueDate: string;
  status: TuitionInvoiceStatus;
}

export interface TuitionPackage {
  id: string;
  name: string;
  numberOfMonths: number;
  discountType: TuitionDiscountType;
  discountValue: number;
  isActive: boolean;
  description: string | null;
}

export interface CreateTuitionInvoiceDto {
  studentId: string;
  classId: string;
  enrollmentId?: string;
  billingStartMonth: string;
  numberOfMonths: number;
  tuitionPackageId?: string;
  monthlyFee?: number;
  title?: string;
  description?: string;
  dueDate: string;
}

export interface CreateTuitionPaymentDto {
  amount: number;
  paymentMethod: string;
  note?: string;
}

export interface TuitionPayment {
  id: string;
  invoiceId: string;
  invoiceNo: string;
  paymentNo: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  note: string | null;
}

export type TuitionInvoiceListParams = ListParams & {
  studentId?: string;
  classId?: string;
  campusId?: string;
  billingMonth?: string;
  status?: TuitionInvoiceStatus;
};
