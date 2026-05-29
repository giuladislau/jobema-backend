import { Router } from "express";

import clienteController from "../controllers/clienteController.js";

const router = Router();

// lista clientes
router.get("/", clienteController.index);

export default router;