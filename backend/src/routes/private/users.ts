import { Router } from "express";
import userController from "../../controllers/users"

const router = Router()

router.patch("/:id", userController.update)
router.delete("/:id", userController.delete)

export default router;