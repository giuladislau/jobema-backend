import { Router } from "express";

import fechamentoController from "../controllers/fechamentoController.js";

const router = Router();

router.get("/", fechamentoController.index);

router.get("/:id", fechamentoController.show);

router.post(
    "/gerar",
    fechamentoController.generate,
);

export default router;