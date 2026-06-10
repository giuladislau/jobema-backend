import pool from "../database/connection.js";

// lista caminhões
async function findAll() {
  const query = `
    SELECT
      id_caminhao,
      placa,
      motorista,
      ano,
      capacidade_litros
    FROM caminhao
    ORDER BY id_caminhao;
  `;

  const { rows } = await pool.query(query);

  return rows;
}

// busca caminhão por id
async function findById(id) {
  const query = `
    SELECT
      id_caminhao,
      placa,
      motorista,
      ano,
      capacidade_litros
    FROM caminhao
    WHERE id_caminhao = $1;
  `;

  const { rows } = await pool.query(query, [id]);

  return rows[0];
}

// cria caminhão
async function create(caminhao) {
  const { placa, motorista, ano, capacidade_litros } = caminhao;
  const query = `
  INSERT INTO caminhao (
    placa,
    motorista,
    ano,
    capacidade_litros
  )
  VALUES ($1, $2, $3, $4)
  RETURNING
    id_caminhao,
    placa,
    motorista,
    ano,
    capacidade_litros;
`;
  const { rows } = await pool.query(query, [
    placa,
    motorista,
    ano,
    capacidade_litros,
  ]);
  return rows[0];
}

// atualiza caminhão
async function update(id, caminhao) {
  const { placa, motorista, ano, capacidade_litros } = caminhao;
  console.log("update caminhao:", {
    placa,
    motorista,
    ano,
    capacidade_litros,
    id,
  });

  const query = `
    UPDATE caminhao
    SET
      placa = $1,
      motorista = $2,
      ano = $3,
      capacidade_litros = $4
    WHERE id_caminhao = $5
    RETURNING
      id_caminhao,
      placa,
      motorista,
      ano,
      capacidade_litros;
  `;

  const { rows } = await pool.query(query, [
    placa,
    motorista,
    ano,
    capacidade_litros,
    id,
  ]);

  return rows[0];
}

// remove caminhão
async function remove(id) {
  const query = `
    DELETE FROM caminhao
    WHERE id_caminhao = $1;
  `;

  await pool.query(query, [id]);
}

export default {
  findAll,
  findById,
  create,
  update,
  remove,
};
