import { Router } from "express";

import fechamentoController from "../controllers/fechamentoController.js";
import roleCheck from "../middlewares/roleMiddleware.js";

const router = Router();

router.get("/", fechamentoController.index);

// exportações — antes de /:id para evitar conflito de rota
router.get("/export/csv", fechamentoController.exportCsv);
router.get("/export/pdf", fechamentoController.exportPdf);

router.get("/:id", fechamentoController.show);

router.post("/gerar", fechamentoController.generate);

export default router;
