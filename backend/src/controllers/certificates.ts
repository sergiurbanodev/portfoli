import { Request, Response } from "express";
import certificateService from "../services/certificates";
import { ZodError } from "zod";

class CertificateController {
  async create(req: Request, res: Response): Promise<any> {
    try {
      const certificate = await certificateService.create(req.body)
      return res.status(201).json(certificate) 
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
      const certificates = await certificateService.getAll();
      return res.json(certificates);
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
      const certificate = await certificateService.getById(Number.parseInt(id));
      return res.json(certificate)
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
      const certificate = await certificateService.update(Number.parseInt(id),req.body);
      return res.json(certificate);
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
      await certificateService.delete(Number.parseInt(id));
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

export default new CertificateController();