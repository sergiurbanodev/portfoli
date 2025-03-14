import { Router } from "express";
import technologiesController from "../../controllers/technologies";

const router = Router();

router.post("/", technologiesController.create)
router.patch("/:id", technologiesController.update)
router.delete("/:id", technologiesController.delete)

export default router;