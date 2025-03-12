import { CreateCourseDTO, UpdateCourseDTO } from "../types/types";
import prisma from "../config/prisma";
import { courseSchema } from "../schemas/courses";
import { Course } from "@prisma/client";


class CourseService {
  async getAll(): Promise<Course[]> {
    return prisma.course.findMany();
  }
  async getById(id: number): Promise<Course> {
    const course = await prisma.course.findUnique({
      where: { id }
    })

    if (!course) {
      throw new Error(`Course with ID ${id} not found`)
    }

    return course;
  }
  async create(data: CreateCourseDTO): Promise<Course> {
    const validatedData = courseSchema.parse(data);

    return prisma.course.create({
      data: validatedData
    })
  }

  async update(id: number, data: UpdateCourseDTO): Promise<Course> {
    const validatedData = courseSchema.partial().safeParse(data);

    try {
      return await prisma.course.update({
        where: { id },
        data: validatedData
      })
    } catch (error) {
      throw new Error(`Course with ID ${id} not found`)
    }
  }

  async delete(id: number): Promise<Course> {
    try {
      return await prisma.course.delete({
        where: { id }
      })
    } catch (error) {
      throw new Error(`Course with ID ${id} not found`)
    }
  }
}

const courseService = new CourseService();
export default courseService