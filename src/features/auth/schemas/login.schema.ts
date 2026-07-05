import { z } from "zod";

/**
 * Validation schema for the login credentials form.
 * Follows standard §11 and §19 for inline error copywriting.
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address (e.g. name@apix.edu.vn)."),
  password: z
    .string()
    .min(1, "Please enter your password.")
    .min(6, "Your password must be at least 6 characters long."),
});
