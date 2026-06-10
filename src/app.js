// configuracao express
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();

// cors
app.use(
  cors({
    origin: /^http:\/\/localhost:\d+$/,
    credentials: true,
  })
);

// middleware json
app.use(express.json());

// rotas api
app.use(routes);

// middleware erros
app.use(errorMiddleware);

export default app;
