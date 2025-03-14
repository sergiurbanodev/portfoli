import { Router } from "express";
import certificateController from "../../controllers/certificates";

const router = Router();

router.get('/', certificateController.getAll);
router.get('/:id', certificateController.getById);

export default router;