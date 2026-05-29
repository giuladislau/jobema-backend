// rotas cliente

import { Router } from "express";

import { getClients } from "../controllers/clienteController.js";

const router = Router();

router.get("/", getClients);

export default router;