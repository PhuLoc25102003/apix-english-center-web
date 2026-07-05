/**
 * src/features/parents/types/parent-child.type.ts
 *
 * Type definitions and DTOs for the Parent-Child relationship.
 */

export interface ParentChildRelation {
  id: string; // The student ID
  studentCode: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  relationship: string; // e.g. "FATHER" | "MOTHER" | "GUARDIAN" | "OTHER"
  isPrimaryContact: boolean;
  canReceiveNotification: boolean;
  canReceiveTuition: boolean;
  canPickupStudent: boolean;
  isEmergencyContact: boolean;
  createdAt?: string;
  updatedAt?: string;
}
