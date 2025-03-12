import { CreateProjectDTO, UpdateProjectDTO } from "../types/types";
import prisma from "../config/prisma";
import { projectSchema } from "../schemas/projects";
import { Project } from "@prisma/client";

class ProjectService {

  async getAll(): Promise<Project[]> {
    return prisma.project.findMany({
      include: {
        technologies: true
        }
    });
  }
  async getById(id: number): Promise<Project> {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        technologies: true
      }
    })

    if (!project) {
      throw new Error(`Project with ID ${id} not found`);
    }

    return project;
  }
  async create(data: CreateProjectDTO): Promise<Project> {
    const validatedData = projectSchema.parse(data);

    return prisma.project.create({
      data: {
        name: validatedData.name,
        image: validatedData.image,
        lightDescription: validatedData.lightDescription,
        detailedDescription: validatedData.detailedDescription,
        url: validatedData.url,
        technologies: {
          connect: validatedData.technologies.map(id => ({ id }))
        }
      },
      include: {
        technologies: true
      }
    })
  }

  async update(id: number, data: UpdateProjectDTO): Promise<Project> {
    const validatedData = projectSchema.partial().safeParse(data);

    try {
      return await prisma.project.update({
        where: { id },
        data: validatedData,
        include: {
          technologies: true
        }
      })
    } catch (error) {
      throw new Error(`Project with ID ${id} not found`);
    }
  }
  async delete(id: number): Promise<Project> {
    try {
      return await prisma.project.delete({
        where: { id },
        include: {
          technologies: true
        }
      })
    } catch (error) {
      throw new Error(`Project with ID ${id} not found`);
    }
  }
}

const projectService = new ProjectService();
export default projectService