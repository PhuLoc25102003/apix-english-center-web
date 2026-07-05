/**
 * src/features/parents/types/parent.type.ts
 *
 * Type definitions and DTOs for the Parent feature.
 * Matches backend Parent schema.
 */

export interface Parent {
  id: string;
  parentCode: string;
  fullName: string;
  phone: string;
  email: string | null;
  address: string | null;
  jobTitle: string | null;
  note: string | null;
  userId: string | null; // Can be nullable per requirement
  createdAt?: string;
  updatedAt?: string;
}

export type CreateParentDto = Omit<
  Parent,
  "id" | "parentCode" | "userId" | "createdAt" | "updatedAt"
>;

export type UpdateParentDto = Partial<CreateParentDto>;
