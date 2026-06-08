import { Router } from "express";

import clienteRoutes from "./clienteRoutes.js";
import caminhaoRoutes from "./caminhaoRoutes.js";
import operacaoRoutes from "./operacaoRoutes.js";
import authRoutes from "./authRoutes.js";
import usuarioRoutes from "./usuarioRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

// health check
router.get("/health", (request, response) => {
  return response.status(200).json({
    status: "ok",
    message: "api funcionando",
  });
});

// rotas autenticação
router.use("/auth", authRoutes);

// rotas protegidas
router.use("/clientes", authMiddleware, clienteRoutes);
router.use("/caminhoes", authMiddleware, caminhaoRoutes);
router.use("/operacoes", authMiddleware, operacaoRoutes);
router.use("/usuarios", authMiddleware, usuarioRoutes);

export default router;