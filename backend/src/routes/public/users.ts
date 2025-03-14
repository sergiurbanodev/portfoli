import { Router } from "express";
import userController from "../../controllers/users"

const router = Router()

router.get("/", userController.getAll)
router.post("/login", userController.login)
router.post("/register", userController.create)
router.get("/:id", userController.getById)

export default router;