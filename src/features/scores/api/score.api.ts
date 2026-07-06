import { apiClient } from "@/lib/api/api-client";
import { createCrudApi } from "@/lib/api/crud-api-factory";
import type {
  ScoreItem,
  CreateScoreItemDto,
  ScoreDetails,
  SaveScoreRecordsRequest,
} from "../types/score.type";

const baseEndpoint = "/score-items";

const crudApi = createCrudApi<ScoreItem, CreateScoreItemDto>(baseEndpoint);

export const scoreApi = {
  ...crudApi,

  async getDetails(id: string): Promise<ScoreDetails> {
    const { data } = await apiClient.get<ScoreDetails>(`${baseEndpoint}/${id}/details`);
    return data;
  },

  async saveRecords(id: string, body: SaveScoreRecordsRequest): Promise<void> {
    await apiClient.post(`${baseEndpoint}/${id}/records`, body);
  },

  async publish(id: string): Promise<void> {
    await apiClient.post(`${baseEndpoint}/${id}/publish`);
  },
};
