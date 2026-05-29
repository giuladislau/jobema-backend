// queries cliente

import pool from "../database/connection.js";

async function findAllClients() {
  const query = `
    SELECT *
    FROM cliente
    ORDER BY id_cliente ASC
  `;

  const { rows } = await pool.query(query);

  return rows;
}

export { findAllClients };