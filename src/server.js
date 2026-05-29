// configuracao ambiente
require("dotenv").config();

// app express
const app = require("./app");

// porta servidor
const PORT = process.env.PORT || 3000;

// iniciar servidor
app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});