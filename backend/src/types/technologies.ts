import { z } from "zod";
import { technologySchema } from "../schemas/technologies";

export interface CreateTechnologyDTO extends Omit<z.infer<typeof technologySchema>, "id"> {}

export interface UpdateTechnologyDTO extends Partial<CreateTechnologyDTO> {}
