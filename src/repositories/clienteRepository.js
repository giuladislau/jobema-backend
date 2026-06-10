// conexao banco
import pool from "../database/connection.js";

// busca todos os clientes
async function findAll() {
  const query = `
    SELECT
      id_cliente,
      nome,
      modalidade,
      preco_m3,
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
      modalidade,
      preco_m3,
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
  const { nome, modalidade, preco_m3, telefone, endereco } = cliente;

  const query = `
    INSERT INTO cliente (
      nome,
      modalidade,
      preco_m3,
      telefone,
      endereco
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING
      id_cliente,
      nome,
      modalidade,
      preco_m3,
      telefone,
      endereco,
      criado_em;
  `;

  const { rows } = await pool.query(query, [
    nome,
    modalidade,
    preco_m3,
    telefone,
    endereco,
  ]);

  return rows[0];
}

// atualiza cliente
async function update(id, cliente) {
  const { nome, modalidade, preco_m3, telefone, endereco } = cliente;

  const query = `
    UPDATE cliente
    SET
      nome = $1,
      modalidade = $2,
      preco_m3 = $3,
      telefone = $4,
      endereco = $5
    WHERE id_cliente = $6
    RETURNING
      id_cliente,
      nome,
      modalidade,
      preco_m3,
      telefone,
      endereco,
      criado_em;
  `;

  const { rows } = await pool.query(query, [
    nome,
    modalidade,
    preco_m3,
    telefone,
    endereco,
    id,
  ]);

  return rows[0];
}

// remove cliente
async function remove(id) {
  const query = `
    DELETE FROM cliente
    WHERE id_cliente = $1
    RETURNING id_cliente;
  `;

  const { rows } = await pool.query(query, [id]);

  return rows[0];
}

export default {
  findAll,
  findById,
  create,
  update,
  remove,
};
