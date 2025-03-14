import { Router } from "express";
import projectsController from "../../controllers/projects";

const router = Router();

router.get('/', projectsController.getAll);
router.get('/:id', projectsController.getById);

export default router