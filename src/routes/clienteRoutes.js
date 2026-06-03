import { Router } from "express";

import clienteController from "../controllers/clienteController.js";

const router = Router();

// lista clientes
router.get("/", clienteController.index);

// busca cliente por id
router.get("/:id", clienteController.show);

// cadastra cliente
router.post("/", clienteController.store);

// atualiza cliente
router.put("/:id", clienteController.update);

export default router;