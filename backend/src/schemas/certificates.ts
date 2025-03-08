import { z } from "zod";

export const certificateSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(50, "Title cannot surpass 50 characters long"),
  image: z
    .string()
    .min(5, "Image must be at least 5 characters long")
    .max(100, "Image cannot surpass 100 characters long"),
});
