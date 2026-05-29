// conexao banco
import pool from "../database/connection.js";

// busca todos os clientes
async function findAll() {
  const query = `
    SELECT
      id_cliente,
      nome,
      telefone,
      endereco,
      criado_em
    FROM cliente
    ORDER BY id_cliente;
  `;

  const { rows } = await pool.query(query);

  return rows;
}

export default {
  findAll,
};