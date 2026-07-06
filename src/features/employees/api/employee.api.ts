import { createCrudApi } from "@/lib/api/crud-api-factory";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type {
  Employee,
  CreateEmployeeDto,
  UpdateEmployeeDto,
} from "../types/employee.type";

export const employeeApi = createCrudApi<
  Employee,
  CreateEmployeeDto,
  UpdateEmployeeDto
>(API_ENDPOINTS.employees.list);
