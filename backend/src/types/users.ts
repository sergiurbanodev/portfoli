import { z } from "zod";
import { usersSchema } from "../schemas/users";


export interface CreateUserDTO extends Omit<z.infer<typeof usersSchema>, "id"> {}

export interface UpdateUserDTO extends Partial<CreateUserDTO> {}
