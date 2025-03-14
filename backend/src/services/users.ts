import { CreateUserDTO, UpdateUserDTO } from "../types/types";
import prisma from "../config/prisma";
import { User } from "@prisma/client";
import { usersSchema } from "../schemas/users";

class UserService {
  async getAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async getById(id: number): Promise<User> {
    const user =  await prisma.user.findUnique({
      where: { id }
    })

    if (!user) {
      throw new Error(`User with ID ${id} not found`)
    }

    return user;
  }

  async create(data: CreateUserDTO): Promise<User> {
    const validatedData = usersSchema.parse(data);

    return prisma.user.create({
      data: validatedData
    })
  }

  async update(id: number, data: UpdateUserDTO): Promise<User> {
    const validatedData = usersSchema.partial().safeParse(data);
    try {
      return await prisma.user.update({
        where: {id},
        data: validatedData
      })
    } catch (error) {
      throw new Error(`User with ID ${id} not found`)
    }
  }

  async delete(id: number): Promise<User> {
    try {
      return await prisma.user.delete({
        where: {id}
      })
    } catch (error) {
      throw new Error(`User with ID ${id} not found`)
    }
  }
}

const userService = new UserService();
export default userService