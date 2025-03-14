import { Router } from "express";
import userController from "../../controllers/users"

const router = Router()

router.get("/", userController.getAll)
router.post("/login",) //TODO: CREATE LOGIN METHOD USING JWT
router.post("/register", userController.create)
router.get("/:id", userController.getById)

export default router;