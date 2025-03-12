import { z } from "zod";

export const technologySchema = z.object({
  name: z
    .string()
    .min(3, "Technology name must be at least 3 characters long")
    .max(20, "Technology name cannot surpass 20 characters long"),
  logo: z
    .string()
    .min(5, "Logo must be at least 5 characters long")
    .max(100, "Logo cannot surpass 100 characters long"),
  documentation: z.string().url("Documentation must be a valid URL"),
  projects: z.array(z.number().int().positive().optional()),
});
