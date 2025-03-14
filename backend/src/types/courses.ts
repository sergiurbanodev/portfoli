import { z } from "zod";
import { courseSchema } from "../schemas/courses";

export interface CreateCourseDTO extends z.infer<typeof courseSchema> {}

export interface UpdateCourseDTO extends Partial<CreateCourseDTO> {}
