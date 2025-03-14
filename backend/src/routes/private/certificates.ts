import { Router } from "express";
import certificateController from "../../controllers/certificates";

const router = Router();

router.post("/", certificateController.create);
router.patch("/:id", certificateController.update)
router.delete("/:id", certificateController.delete);

export default router;