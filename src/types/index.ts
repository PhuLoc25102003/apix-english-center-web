/**
 * Global shared types — re-exported here for convenience.
 *
 * Feature-specific types live in features/<name>/types/.
 * Only truly shared, cross-feature types belong here.
 */

// ── Auth / User ───────────────────────────────────────────────────────────────

/**
 * The currently authenticated user.
 * Used by auth context and permission checks — standard §7.3
 */
export type CurrentUser = {
  id: string;
  fullName: string;
  avatarUrl?: string;
  permissions: string[];
  roles: string[];
  campusScopes?: string[];
};

// ── Pagination ────────────────────────────────────────────────────────────────

export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type SortParams = {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type ListParams = PaginationParams & SortParams & Record<string, unknown>;

// ── ID type ───────────────────────────────────────────────────────────────────

/** Branded string type for entity IDs — prevents mixing up ID fields */
export type EntityId = string & { readonly __brand: "EntityId" };

// ── Status enums ──────────────────────────────────────────────────────────────

export type ActiveStatus = "ACTIVE" | "INACTIVE";

export type ApprovalStatus = "PENDING" | "APPROVED" | "REJECTED" | "DRAFT";

export type PaymentStatus =
  | "UNPAID"
  | "PARTIALLY_PAID"
  | "PAID"
  | "OVERDUE"
  | "CANCELLED"
  | "REFUNDED";
