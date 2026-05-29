import { Router } from "express";

import clienteRoutes from "./clienteRoutes.js";

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

export default router;