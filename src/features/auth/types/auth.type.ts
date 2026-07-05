import { z } from "zod";

import { loginSchema } from "@/features/auth/schemas/login.schema";

/**
 * Types representing login credentials.
 * Inferred from the login schema definition.
 */
export type LoginCredentials = z.infer<typeof loginSchema>;

/**
 * Basic authentication response shape.
 */
export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    roles: string[];
    permissions: string[];
  };
}
