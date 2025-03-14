import { z } from "zod";
import { projectSchema } from "../schemas/projects";

export interface CreateProjectDTO extends z.infer<typeof projectSchema> {}

export interface UpdateProjectDTO extends Partial<CreateProjectDTO> {}
