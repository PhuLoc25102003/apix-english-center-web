import { apiClient } from "@/lib/api/api-client";
import { createCrudApi } from "@/lib/api/crud-api-factory";
import type {
  WeeklyUpdate,
  CreateWeeklyUpdateDto,
  UpdateWeeklyUpdateDto,
  WeeklyUpdateDetails,
} from "../types/weekly-update.type";

const baseEndpoint = "/weekly-updates";

const crudApi = createCrudApi<WeeklyUpdate, CreateWeeklyUpdateDto, UpdateWeeklyUpdateDto>(
  baseEndpoint,
);

export const weeklyUpdateApi = {
  ...crudApi,

  async getDetails(id: string): Promise<WeeklyUpdateDetails> {
    const { data } = await apiClient.get<WeeklyUpdateDetails>(`${baseEndpoint}/${id}/details`);
    return data;
  },

  async submit(id: string): Promise<void> {
    await apiClient.post(`${baseEndpoint}/${id}/submit`);
  },

  async approve(id: string): Promise<void> {
    await apiClient.post(`${baseEndpoint}/${id}/approve`);
  },

  async reject(id: string, reason: string): Promise<void> {
    await apiClient.post(`${baseEndpoint}/${id}/reject`, { reason });
  },

  async publish(id: string): Promise<void> {
    await apiClient.post(`${baseEndpoint}/${id}/publish`);
  },
};
