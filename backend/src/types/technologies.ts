import { z } from "zod";
import { technologySchema } from "../schemas/technologies";

export interface CreateTechnologyDTO extends z.infer<typeof technologySchema> {}

export interface UpdateTechnologyDTO extends Partial<CreateTechnologyDTO> {}
