import { Router } from "express";

import clienteRoutes from "./clienteRoutes.js";
import caminhaoRoutes from "./caminhaoRoutes.js";
import operacaoRoutes from "./operacaoRoutes.js";

const router = Router();

// health check
router.get("/health", (request, response) => {
  return response.status(200).json({
    status: "ok",
    message: "api funcionando",
  });
});

// rotas clientes
router.use("/clientes", clienteRoutes);

// rotas caminhões
router.use("/caminhoes", caminhaoRoutes);

// rotas operações
router.use("/operacoes", operacaoRoutes);

export default router;