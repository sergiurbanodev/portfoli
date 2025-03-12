import { z } from "zod";
import { projectSchema } from "../schemas/projects";

export interface CreateProjectDTO extends Omit<z.infer<typeof projectSchema>, "id"> {}

export interface UpdateProjectDTO extends Partial<CreateProjectDTO> {}
