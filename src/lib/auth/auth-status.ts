import { hasAccessToken } from "@/lib/auth/token-storage";

/**
 * Returns whether the current browser session has an in-memory access token.
 * Token expiry and refresh are intentionally handled elsewhere.
 */
export function isAuthenticated(): boolean {
  return hasAccessToken();
}
