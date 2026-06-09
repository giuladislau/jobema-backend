import { Router } from "express";

import fechamentoController from "../controllers/fechamentoController.js";
import roleCheck from "../middlewares/roleMiddleware.js";

const router = Router();

router.get("/", fechamentoController.index);

router.get("/:id", fechamentoController.show);

router.post(
    "/gerar",
    roleCheck("ADMIN"),
    fechamentoController.generate,
);

export default router;