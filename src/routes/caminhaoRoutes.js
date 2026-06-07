import { Router } from "express";

import caminhaoController from "../controllers/caminhaoController.js";

const router = Router();

// lista caminhões
router.get("/", caminhaoController.index);

export default router;