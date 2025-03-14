import { z } from "zod";

export const usersSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be 2 characters long")
    .max(12, "Name cannot surpass 12 characters long"),
  surname: z
    .string()
    .min(2, "Name must be 2 characters long")
    .max(12, "Name cannot surpass 12 characters long")
    .optional()
    .nullable(),
  birthdate: z.string().datetime({ message: "Invalid date format" }), // Campo obligatorio
  status: z.enum(["WORKING", "FINDING_JOB", "STUDYING"]),
  email: z.string().email("Email must be valid"),
  password: z
    .string()
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  username: z
    .string()
    .min(2, "Name must be 2 characters long")
    .max(12, "Name cannot surpass 12 characters long"),
});
