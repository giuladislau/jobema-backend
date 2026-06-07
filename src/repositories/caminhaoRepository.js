import pool from "../database/connection.js";

// lista caminhões
async function findAll() {
  const query = `
    SELECT
      id_caminhao,
      placa,
      motorista,
      capacidade_litros
    FROM caminhao
    ORDER BY id_caminhao;
  `;

  const { rows } = await pool.query(query);

  return rows;
}

export default {
  findAll,
};