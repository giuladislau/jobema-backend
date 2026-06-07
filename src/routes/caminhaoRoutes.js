import { Router } from "express";

import caminhaoController from "../controllers/caminhaoController.js";

const router = Router();

// lista caminhões
router.get("/", caminhaoController.index);

// busca caminhão por id
router.get("/:id", caminhaoController.show);

// cadastra caminhão
router.post("/", caminhaoController.store);

// atualiza caminhão
router.put("/:id", caminhaoController.update);

// remove caminhão
router.delete("/:id", caminhaoController.destroy);

export default router;