import { CreateUserDTO, UpdateUserDTO, UserLogin } from "../types/types";
import prisma from "../config/prisma";
import { User } from "@prisma/client";
import { usersSchema } from "../schemas/users";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import { env } from "../config/env";
import { jwtConf } from "../config/jwt";

class UserService {
  async getAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async getById(id: number): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    return user;
  }

  async create(data: CreateUserDTO): Promise<User> {
    const validatedData = usersSchema.parse(data);
    const hashedPassword = await bcrypt.hash(data.password, env.SALT);

    return prisma.user.create({
      data: {
        ...validatedData,
        password: hashedPassword,
      },
    });
  }

  async update(id: number, data: UpdateUserDTO): Promise<User> {
    const validatedData = usersSchema.partial().safeParse(data);
    try {
      return await prisma.user.update({
        where: { id },
        data: validatedData,
      });
    } catch (error) {
      throw new Error(`User with ID ${id} not found`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      return await prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`User with ID ${id} not found`);
    }
  }

  async login(data: UserLogin): Promise<{ user: User; token: string }> {
    const { email, password } = data;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid Credentials");
    }

    const token = jwt.sign({ id: user.id }, jwtConf.secret as string, {
      expiresIn: jwtConf.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
import { format } from "path";

const userService = new UserService();
export default userService;
