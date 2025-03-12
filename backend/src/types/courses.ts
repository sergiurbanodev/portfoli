import { z } from "zod";
import { courseSchema } from "../schemas/courses";

export interface CreateCourseDTO extends Omit<z.infer<typeof courseSchema>, "id"> {}

export interface UpdateCourseDTO extends Partial<CreateCourseDTO> {}
