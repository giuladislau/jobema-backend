import { Router } from "express";

import usuarioController from "../controllers/usuarioController.js";

const router = Router();

router.get("/", usuarioController.listUsers);
router.get("/:id", usuarioController.getUserById);
router.post("/", usuarioController.createUser);
router.put("/:id", usuarioController.updateUser);
router.delete("/:id", usuarioController.deleteUser);

export default router;