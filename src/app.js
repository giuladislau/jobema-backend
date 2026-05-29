// dependencias
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// rotas
const routes = require("./routes");

// app express
const app = express();

// middlewares globais
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// rotas api
app.use("/api", routes);

// rota teste
app.get("/", (req, res) => {
  res.json({
    message: "api jobema funcionando",
  });
});

module.exports = app;