/**
 * src/lib/auth/token-storage.ts
 *
 * In-memory access token store.
 *
 * Design rules (APIX Frontend Standard §7.2):
 *  - Access tokens are stored in memory only — never in localStorage or
 *    sessionStorage — to reduce XSS attack surface.
 *  - Refresh tokens are stored in HTTP-only cookies managed by the backend.
 *  - This module is the SINGLE source of truth for the access token.
 *    No other module should hold a copy.
 *  - Never log tokens.
 */

let _accessToken: string | null = null;

/**
 * Store the access token in memory.
 * Called after a successful login or token refresh.
 */
export function setAccessToken(token: string | null): void {
  _accessToken = token;
}

/**
 * Read the current in-memory access token.
 * Returns null when the user is not authenticated or token has been cleared.
 */
export function getAccessToken(): string | null {
  return _accessToken;
}

/**
 * Clear the access token.
 * Must be called on logout — also clear TanStack Query cache (done in auth feature).
 */
export function clearAccessToken(): void {
  _accessToken = null;
}

/**
 * Returns true when an access token is currently held in memory.
 * Does NOT verify expiry — that is the backend's responsibility.
 */
export function hasAccessToken(): boolean {
  return _accessToken !== null;
}
