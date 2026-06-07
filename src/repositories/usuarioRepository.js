import pool from "../database/connection.js";

async function findByLogin(login) {
    const query = `
    SELECT
      id_usuario,
      nome,
      login,
      senha_hash,
      perfil
    FROM usuario
    WHERE login = $1;
  `;

    const { rows } = await pool.query(query, [login]);

    return rows[0];
}

export default {
    findByLogin,
};