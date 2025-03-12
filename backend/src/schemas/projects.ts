import { z } from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name cannot surpass 50 characters long"),
  image: z.string().url("URL must be valid"),
  lightDescription: z
    .string()
    .min(10, "Light description must be at least 10 characters long")
    .max(255, "Light description cannot surpass 255 characters"),
  detailedDescription: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  url: z.string().url("URL must be valid"),
  technologies: z.array(z.number().int().positive()),
});
