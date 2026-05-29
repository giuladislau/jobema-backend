// configuracao express

import express from "express";

import routes from "./routes/index.js";

import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();

// middleware json
app.use(express.json());

// rotas api
app.use(routes);

// middleware erros
app.use(errorMiddleware);

export default app;