/**
 * src/features/levels/types/level.type.ts
 *
 * Type definitions and DTOs for the Level feature.
 * Matches backend Level schema.
 */

export interface Level {
  id: string;
  code: string;
  name: string;
  description: string | null;
  orderIndex: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateLevelDto = Omit<
  Level,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateLevelDto = Partial<CreateLevelDto>;
