import { CreateTechnologyDTO, UpdateTechnologyDTO } from "../types/types";
import prisma from "../config/prisma";
import { technologySchema } from "../schemas/technologies";
import { Technology } from "@prisma/client";


class TechnologyService {
  async getAll(): Promise<Technology[]> {
    return prisma.technology.findMany();
  }

  async getById(id: number): Promise<Technology> {
    const technology = await prisma.technology.findUnique({
      where: { id }
    })

    if (!technology) {
      throw new Error(`Technology with ID ${id} not found`)
    }

    return technology;
  }

  async create(data: CreateTechnologyDTO): Promise<Technology> {
    const validatedData = technologySchema.parse(data)

    return prisma.technology.create({
      data: {
        name: validatedData.name,
        logo: validatedData.logo,
        documentation: validatedData.documentation
      }
    })
  }

  async update(id: number, data: UpdateTechnologyDTO): Promise<Technology> {
    const validatedData = technologySchema.partial().safeParse(data);

    try {
      return await prisma.technology.update({
        where: { id },
        data: validatedData
      })
    } catch (error) {
      throw new Error(`Technology with ID ${id} not found`)
    }
  }

  async delete(id: number): Promise<Technology> {
    try {
      return await prisma.technology.delete({
        where: { id }
      })
    } catch (error) {
      throw new Error(`Technology with ID ${id} not found`)
    }
  }
}

const technologyService = new TechnologyService();
export default technologyService