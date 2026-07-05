import { apiClient, API_ENDPOINTS, parseApiError } from "@/lib/api";
import type { ApiResponse } from "@/lib/api";
import type { AuthResponse, LoginCredentials } from "@/features/auth/types/auth.type";

/**
 * Authenticates a user with email + password credentials.
 *
 * Rules:
 *  - All API calls go through apiClient — never import axios directly.
 *  - parseApiError normalises all failures into ApiError before they reach the hook.
 */
export async function loginRequest(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  try {
    const { data } = await apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.auth.login,
      credentials
    );
    return data.data;
  } catch (error) {
    throw parseApiError(error);
  }
}
