import { Request, Response } from "express";
import technologyService from "../services/technologies";
import { ZodError } from "zod";

class TechnologyController {
  async create(req: Request, res: Response): Promise<any> {
    try {
      const technology = await technologyService.create(req.body)
      return res.status(201).json(technology) 
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
      const technologies = await technologyService.getAll();
      return res.json(technologies)
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
      const technology = await technologyService.getById(Number.parseInt(id));
      return res.json(technology)
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
      const technology = await technologyService.update(Number.parseInt(id),req.body);
      return res.json(technology);
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
      await technologyService.delete(Number.parseInt(id));
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

export default new TechnologyController();