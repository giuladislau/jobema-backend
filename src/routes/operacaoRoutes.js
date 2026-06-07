import { Router } from "express";

import operacaoController from "../controllers/operacaoController.js";

const router = Router();

// lista operações
router.get("/", operacaoController.index);

// busca operação por id
router.get("/:id", operacaoController.show);

// cria operação
router.post("/", operacaoController.store);

// atualiza operação
router.put("/:id", operacaoController.update);

// remove operação
router.delete("/:id", operacaoController.destroy);

export default router;