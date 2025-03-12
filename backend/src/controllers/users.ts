import { Request, Response } from "express";
import userService from "../services/users";
import { ZodError } from "zod";

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const user = await userService.create(req.body)
      return res.status(201).json(user) 
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

  async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const users = await userService.getAll();
      return res.json(users)
    } catch (error) {
      return res.status(500).json({
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const user = await userService.getById(Number.parseInt(id));
      return res.json(user)
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

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const user = await userService.update(Number.parseInt(id),req.body);
      return res.json(user);
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

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await userService.delete(Number.parseInt(id));
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