import { Router } from "express";
import usuarioController from "../controllers/usuarioController.js";
import roleCheck from "../middlewares/roleMiddleware.js";

const router = Router();

router.get("/select", usuarioController.listUsersForSelect);

router.get("/", roleCheck("ADMIN"), usuarioController.listUsers);
router.get("/:id", roleCheck("ADMIN"), usuarioController.getUserById);
router.post("/", roleCheck("ADMIN"), usuarioController.createUser);
router.put("/:id", roleCheck("ADMIN"), usuarioController.updateUser);
router.delete("/:id", roleCheck("ADMIN"), usuarioController.deleteUser);

export default router;
