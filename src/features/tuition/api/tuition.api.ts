import { apiClient } from "@/lib/api/api-client";
import { parseApiError } from "@/lib/api/api-error";
import { createCrudApi } from "@/lib/api/crud-api-factory";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/lib/api";
import type {
  CreateTuitionInvoiceDto,
  CreateTuitionPaymentDto,
  TuitionInvoice,
  TuitionInvoiceListParams,
  TuitionPackage,
  TuitionPayment,
} from "../types/tuition.type";

const invoiceCrudApi = createCrudApi<
  TuitionInvoice,
  CreateTuitionInvoiceDto,
  never
>(API_ENDPOINTS.tuition.invoices);

async function getInvoicesByStudent(
  studentId: string,
): Promise<ApiResponse<TuitionInvoice[]>> {
  try {
    const { data } = await apiClient.get<ApiResponse<TuitionInvoice[]>>(
      API_ENDPOINTS.tuition.byStudent(studentId),
    );
    return data;
  } catch (error) {
    throw parseApiError(error);
  }
}

async function getInvoicesByClass(
  classId: string,
): Promise<ApiResponse<TuitionInvoice[]>> {
  try {
    const { data } = await apiClient.get<ApiResponse<TuitionInvoice[]>>(
      API_ENDPOINTS.tuition.byClass(classId),
    );
    return data;
  } catch (error) {
    throw parseApiError(error);
  }
}

async function getPackages(): Promise<ApiResponse<TuitionPackage[]>> {
  try {
    const { data } = await apiClient.get<ApiResponse<TuitionPackage[]>>(
      API_ENDPOINTS.tuition.packages,
    );
    return data;
  } catch (error) {
    throw parseApiError(error);
  }
}

async function createPayment(
  invoiceId: string,
  body: CreateTuitionPaymentDto,
): Promise<ApiResponse<TuitionPayment>> {
  try {
    const { data } = await apiClient.post<ApiResponse<TuitionPayment>>(
      API_ENDPOINTS.tuition.addPayment(invoiceId),
      body,
    );
    return data;
  } catch (error) {
    throw parseApiError(error);
  }
}

export const tuitionApi = {
  getAll: (params: TuitionInvoiceListParams = {}) =>
    invoiceCrudApi.getAll(params),
  createInvoice: invoiceCrudApi.create,
  getInvoicesByStudent,
  getInvoicesByClass,
  getPackages,
  createPayment,
};
