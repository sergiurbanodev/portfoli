import { Request, Response } from "express";
import courseService from "../services/courses";
import { ZodError } from "zod";

class CourseController {
  async create(req: Request, res: Response): Promise<any> {
    try {
      const course = await courseService.create(req.body)
      return res.status(201).json(course) 
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Validation Error',
          errors: error.errors
        });
      }

      return res.status(500).json({
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  async getAll(_req: Request, res: Response): Promise<any> {
    try {
      const courses = await courseService.getAll();
      return res.json(courses)
    } catch (error) {
      return res.status(500).json({
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  async getById(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const course = await courseService.getById(Number.parseInt(id));
      return res.json(course)
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        return res.status(404).json({ message: error.message });
      }

      return res.status(500).json({
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const course = await courseService.update(Number.parseInt(id),req.body);
      return res.json(course);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Validation Error',
          errors: error.errors
        });
      }

      if (error instanceof Error && error.message.includes('not found')) {
        return res.status(404).json({ message: error.message });
      }

      return res.status(500).json({
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  async delete(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      await courseService.delete(Number.parseInt(id));
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        return res.status(404).json({ message: error.message });
      }

      return res.status(500).json({
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }
}

export default new CourseController();