export type EmploymentStatus = "ACTIVE" | "INACTIVE" | "ON_LEAVE" | "TERMINATED";

export interface Employee {
  id: string;
  userId?: string | null;
  employeeCode: string;
  fullName: string;
  employmentStatus: EmploymentStatus;
  dateOfBirth?: string | null;
  gender?: string | null;
  address?: string | null;
  emergencyContactName?: string | null;
  emergencyContactPhone?: string | null;
  hiredDate: string;
  resignedDate?: string | null;
  campusId?: string | null;
  campusName?: string | null;
  note?: string | null;
  positionIds?: string[];
  positions?: { id: string; name: string; code: string }[];
}

export interface CreateEmployeeDto {
  userId?: string | null;
  employeeCode: string;
  fullName: string;
  employmentStatus: EmploymentStatus;
  dateOfBirth?: string | null;
  gender?: string | null;
  address?: string | null;
  emergencyContactName?: string | null;
  emergencyContactPhone?: string | null;
  hiredDate: string;
  resignedDate?: string | null;
  campusId?: string | null;
  note?: string | null;
  positionIds?: string[];
}

export type UpdateEmployeeDto = CreateEmployeeDto;
