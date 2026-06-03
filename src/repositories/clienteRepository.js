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

// busca cliente por id
async function findById(id) {
  const query = `
    SELECT
      id_cliente,
      nome,
      telefone,
      endereco,
      criado_em
    FROM cliente
    WHERE id_cliente = $1;
  `;

  const { rows } = await pool.query(query, [id]);

  return rows[0];
}

export default {
  findAll,
  findById,
};