/**
 * src/lib/api/api-client.ts
 *
 * Single Axios instance for all APIX API calls.
 *
 * Rules:
 *  - Never import this from UI components or hooks directly.
 *  - All feature api files (features/xxx/api/xxx.api.ts) use this client.
 *  - Token attachment is automatic via request interceptor.
 *  - 401 handling triggers a silent token refresh via HTTP-only cookie.
 *  - Tokens are NEVER logged.
 */

import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "@/lib/auth/token-storage";
import type { ApiErrorResponse } from "./api-error";
import { API_ENDPOINTS } from "./endpoints";

// ── Base URL ─────────────────────────────────────────────────────────────────

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api";

// ── Axios instance ────────────────────────────────────────────────────────────

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // send HTTP-only refresh token cookie on every request
  timeout: 15_000,
});

// ── Request interceptor — attach Bearer token ─────────────────────────────────

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(error),
);

// ── Response interceptor — handle 401 with silent refresh ────────────────────

let _isRefreshing = false;
let _refreshQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null): void {
  _refreshQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else if (token) {
      resolve(token);
    }
  });
  _refreshQueue = [];
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Silent token refresh on 401 (first attempt only)
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (_isRefreshing) {
        // Queue concurrent requests until refresh resolves
        return new Promise<string>((resolve, reject) => {
          _refreshQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      _isRefreshing = true;

      try {
        // Backend reads the HTTP-only refresh token cookie
        const { data } = await apiClient.post<{ accessToken: string }>(
          API_ENDPOINTS.auth.refresh,
        );

        const newToken = data.accessToken;
        setAccessToken(newToken);
        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        clearAccessToken();

        // Redirect to login — navigate client-side only
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      } finally {
        _isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export { apiClient };
