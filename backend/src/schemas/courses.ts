import { z } from "zod";

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(50, "Title cannot surpass 50 characters long"),
  author: z
    .string()
    .min(3, "Author must be at least 3 characters long")
    .max(20, "Author cannot surpass 20 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  image: z
    .string()
    .min(5, "Image must be at least 5 characters long")
    .max(100, "Image cannot surpass 100 characters long"),
  link: z.string().url("URL must be valid"),
  duration: z.number().positive("Duration must be a positive number"),
  rating: z
    .number()
    .positive("Rating must be a positive number")
    .max(5, "Rating must not be greater than 5"),
});
