// configuracao express

import express from "express";

const app = express();

// middleware json
app.use(express.json());

// rota health check
app.get("/health", (request, response) => {
  return response.status(200).json({
    status: "ok",
    message: "api funcionando",
  });
});

export default app;