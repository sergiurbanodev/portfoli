import { Router } from "express";
import technologiesController from "../../controllers/technologies";

const router = Router();

router.get('/', technologiesController.getAll);
router.get('/:id', technologiesController.getById);

export default router;