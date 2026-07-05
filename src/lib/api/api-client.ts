/**
 * APIX API Client — standard §9
 *
 * Single Axios instance for all API calls.
 * Rules:
 *  - Never call axios directly in UI components or hooks.
 *  - All feature API files must import and use this client.
 *  - Token refresh is handled in the request interceptor.
 *  - 401 → refresh token or logout.
 *  - Tokens must never be logged.
 */

import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios"

import type { ApiError } from "./api-response"

// ── Configuration ────────────────────────────────────────────────────────────

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

// ── Axios instance ────────────────────────────────────────────────────────────

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // send HTTP-only refresh token cookie
  timeout: 15_000,
})

// ── In-memory access token store ─────────────────────────────────────────────
// Access tokens are stored in memory to reduce XSS risk.
// Refresh tokens are stored in HTTP-only cookies by the backend.

let _accessToken: string | null = null

export function setAccessToken(token: string | null): void {
  _accessToken = token
}

export function getAccessToken(): string | null {
  return _accessToken
}

// ── Request interceptor — attach token ───────────────────────────────────────

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (_accessToken) {
      config.headers.Authorization = `Bearer ${_accessToken}`
    }
    return config
  },
  (error: unknown) => Promise.reject(error)
)

// ── Response interceptor — handle 401 ────────────────────────────────────────

let _isRefreshing = false
let _refreshQueue: Array<{
  resolve: (token: string) => void
  reject: (err: unknown) => void
}> = []

function processQueue(error: unknown, token: string | null = null): void {
  _refreshQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else if (token) {
      resolve(token)
    }
  })
  _refreshQueue = []
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // Only attempt token refresh on 401 and if we haven't retried already
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (_isRefreshing) {
        // Queue this request until the refresh completes
        return new Promise<string>((resolve, reject) => {
          _refreshQueue.push({ resolve, reject })
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return apiClient(originalRequest)
        })
      }

      originalRequest._retry = true
      _isRefreshing = true

      try {
        // Call refresh endpoint — server reads the HTTP-only cookie
        const { data } = await apiClient.post<{ accessToken: string }>(
          "/auth/refresh"
        )

        const newToken = data.accessToken
        setAccessToken(newToken)
        processQueue(null, newToken)

        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return apiClient(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError)
        setAccessToken(null)
        // Redirect to login — handled by the auth feature
        if (typeof window !== "undefined") {
          window.location.href = "/login"
        }
        return Promise.reject(refreshError)
      } finally {
        _isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export { apiClient }
