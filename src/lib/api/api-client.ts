/**
 * src/lib/api/api-client.ts
 *
 * Single Axios instance for all APIX API calls.
 *
 * Rules:
 *  - Never import this from UI components or hooks directly.
 *  - All feature api files (features/xxx/api/xxx.api.ts) use this client.
 *  - Token attachment is automatic via request interceptor.
 *  - Auth endpoint failures are returned directly to the calling form.
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
} from "@/lib/auth/token-storage";
import type { ApiErrorResponse } from "./api-error";
import { API_ENDPOINTS } from "./endpoints";

// ── Base URL ─────────────────────────────────────────────────────────────────

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1";

// ── Axios instance ────────────────────────────────────────────────────────────

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
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

// ── Response interceptor — handle unauthenticated requests ──────────────────

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;

    const isAuthRequest =
      originalRequest.url === API_ENDPOINTS.auth.login ||
      originalRequest.url === API_ENDPOINTS.auth.refresh ||
      originalRequest.url === API_ENDPOINTS.auth.logout;

    if (error.response?.status === 401 && !isAuthRequest) {
      clearAccessToken();

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export { apiClient };
