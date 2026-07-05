/**
 * src/features/campuses/types/campus.type.ts
 *
 * Type definitions and DTOs for the Campus feature.
 * Matches backend Campus schema.
 */

export interface Campus {
  id: string;
  code: string;
  name: string;
  address: string | null;
  phone: string | null;
  description: string | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateCampusDto = Omit<
  Campus,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateCampusDto = Partial<CreateCampusDto>;
