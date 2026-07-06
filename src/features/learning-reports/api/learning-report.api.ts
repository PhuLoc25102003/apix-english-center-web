import { apiClient } from "@/lib/api/api-client";
import { createCrudApi } from "@/lib/api/crud-api-factory";
import type {
  LearningReportCycle,
  CreateReportCycleDto,
  LearningReport,
} from "../types/learning-report.type";

const baseCyclesEndpoint = "/learning-report-cycles";
const baseReportsEndpoint = "/learning-reports";

const cycleCrud = createCrudApi<LearningReportCycle, CreateReportCycleDto>(baseCyclesEndpoint);
const reportCrud = createCrudApi<LearningReport, Partial<LearningReport>>(baseReportsEndpoint);

export const learningReportApi = {
  cycles: cycleCrud,
  reports: {
    ...reportCrud,

    async submit(id: string): Promise<void> {
      await apiClient.post(`${baseReportsEndpoint}/${id}/submit`);
    },

    async approve(id: string): Promise<void> {
      await apiClient.post(`${baseReportsEndpoint}/${id}/approve`);
    },

    async reject(id: string, reason: string): Promise<void> {
      await apiClient.post(`${baseReportsEndpoint}/${id}/reject`, { reason });
    },

    async publish(id: string): Promise<void> {
      await apiClient.post(`${baseReportsEndpoint}/${id}/publish`);
    },
  },
};
