import { Router } from "express";
import courseController from '../../controllers/courses';

const router = Router();

router.post("/", courseController.create);
router.patch("/:id", courseController.update);
router.delete("/:id", courseController.delete)

export default router