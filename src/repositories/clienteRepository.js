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

// cria cliente
async function create(cliente) {
  const { nome, telefone, endereco } = cliente;

  const query = `
    INSERT INTO cliente (
      nome,
      telefone,
      endereco
    )
    VALUES ($1, $2, $3)
    RETURNING
      id_cliente,
      nome,
      telefone,
      endereco,
      criado_em;
  `;

  const { rows } = await pool.query(query, [
    nome,
    telefone,
    endereco,
  ]);

  return rows[0];
}

// atualiza cliente
async function update(id, cliente) {
  const { nome, telefone, endereco } = cliente;

  const query = `
    UPDATE cliente
    SET
      nome = $1,
      telefone = $2,
      endereco = $3
    WHERE id_cliente = $4
    RETURNING
      id_cliente,
      nome,
      telefone,
      endereco,
      criado_em;
  `;

  const { rows } = await pool.query(query, [
    nome,
    telefone,
    endereco,
    id,
  ]);

  return rows[0];
}

export default {
  findAll,
  findById,
  create,
  update,
};