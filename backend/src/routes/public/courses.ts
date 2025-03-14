import { Router } from "express";
import courseController from '../../controllers/courses';

const router = Router();

router.get('/', courseController.getAll)
router.get('/:id', courseController.getById)

export default router