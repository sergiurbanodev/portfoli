import { Router } from "express";
import projectsController from "../../controllers/projects";

const router = Router();

router.post("/", projectsController.create)
router.patch("/:id", projectsController.update)
router.delete("/:id", projectsController.delete)

export default router