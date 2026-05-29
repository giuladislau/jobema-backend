// inicializacao servidor

import dotenv from "dotenv";

import app from "./app.js";

// conexao banco
import "./database/connection.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`servidor rodando porta ${PORT}`);
});