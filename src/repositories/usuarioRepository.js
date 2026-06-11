import pool from "../database/connection.js";

async function findAll() {
  const query = `
        SELECT
            id_usuario,
            nome,
            login,
            perfil
        FROM usuario
        ORDER BY id_usuario;
    `;

  const { rows } = await pool.query(query);

  return rows;
}

async function findById(id) {
  const query = `
        SELECT
            id_usuario,
            nome,
            login,
            perfil
        FROM usuario
        WHERE id_usuario = $1;
    `;

  const { rows } = await pool.query(query, [id]);

  return rows[0];
}

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

async function findByLoginExceptId(login, id) {
  const query = `
        SELECT
            id_usuario
        FROM usuario
        WHERE login = $1
          AND id_usuario <> $2;
    `;

  const { rows } = await pool.query(query, [login, id]);

  return rows[0];
}

async function findByIdWithPassword(id) {
  const query = `
        SELECT
            id_usuario,
            nome,
            login,
            senha_hash,
            perfil
        FROM usuario
        WHERE id_usuario = $1;
    `;

  const { rows } = await pool.query(query, [id]);

  return rows[0];
}

async function create(usuario) {
  const { nome, login, senha_hash, perfil } = usuario;

  const query = `
        INSERT INTO usuario (
            nome,
            login,
            senha_hash,
            perfil
        )
        VALUES ($1, $2, $3, $4)
        RETURNING
            id_usuario,
            nome,
            login,
            perfil;
    `;

  const { rows } = await pool.query(query, [nome, login, senha_hash, perfil]);

  return rows[0];
}

async function update(id, usuario) {
  const { nome, login, senha_hash, perfil } = usuario;

  const query = `
        UPDATE usuario
        SET
            nome = $1,
            login = $2,
            senha_hash = $3,
            perfil = $4
        WHERE id_usuario = $5
        RETURNING
            id_usuario,
            nome,
            login,
            perfil;
    `;

  const { rows } = await pool.query(query, [
    nome,
    login,
    senha_hash,
    perfil,
    id,
  ]);

  return rows[0];
}

async function remove(id) {
  const query = `
        DELETE FROM usuario
        WHERE id_usuario = $1
        RETURNING id_usuario;
    `;

  const { rows } = await pool.query(query, [id]);

  return rows[0];
}
async function findAllForSelect() {
  const query = `
    SELECT id_usuario, nome
    FROM usuario
    ORDER BY nome;
  `;
  const { rows } = await pool.query(query);
  return rows;
}

export default {
  findAll,
  findById,
  findByLogin,
  findByLoginExceptId,
  findByIdWithPassword,
  findAllForSelect,
  create,
  update,
  remove,
};
