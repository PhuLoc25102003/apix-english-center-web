/**
 * src/features/students/types/student-parent.type.ts
 *
 * Type definitions and DTOs for the Student-Parent relationship feature.
 */

export interface StudentParentRelation {
  id: string; // The relationship ID or parent ID
  parentCode: string;
  fullName: string;
  phone: string;
  email: string | null;
  relationship: string; // e.g. "FATHER" | "MOTHER" | "GUARDIAN" | "OTHER"
  isPrimaryContact: boolean;
  canReceiveNotification: boolean;
  canReceiveTuition: boolean;
  canPickupStudent: boolean;
  isEmergencyContact: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LinkParentPayload {
  parentId: string;
  relationship: string;
  isPrimaryContact: boolean;
  canReceiveNotification: boolean;
  canReceiveTuition: boolean;
  canPickupStudent: boolean;
  isEmergencyContact: boolean;
}
