import { z } from "zod";
import { usersSchema } from "../schemas/users";


export interface CreateUserDTO extends z.infer<typeof usersSchema> {}

export interface UpdateUserDTO extends Partial<CreateUserDTO> {}

export interface UserLogin {
  email: string;
  password: string;
}