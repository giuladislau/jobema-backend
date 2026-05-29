// configuracao express

import express from "express";

import routes from "./routes/index.js";

import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();

// middleware json
app.use(express.json());

// health check
app.get("/health", (request, response) => {
  return response.status(200).json({
    status: "ok",
  });
});

// rotas api
app.use(routes);

// middleware erros
app.use(errorMiddleware);

export default app;