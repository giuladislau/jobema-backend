import pool from "../database/connection.js";

// lista operações
async function findAll() {
    const query = `
    SELECT
      id_operacao,
      id_cliente,
      id_caminhao,
      id_usuario,
      tipo,
      quantidade,
      data_operacao,
      observacao,
      valor
    FROM operacao
    ORDER BY id_operacao;
  `;

    const { rows } = await pool.query(query);

    return rows;
}

// busca operação por id
async function findById(id) {
    const query = `
    SELECT
      id_operacao,
      id_cliente,
      id_caminhao,
      id_usuario,
      tipo,
      quantidade,
      data_operacao,
      observacao,
      valor
    FROM operacao
    WHERE id_operacao = $1;
  `;

    const { rows } = await pool.query(query, [id]);

    return rows[0];
}

// cria operação
async function create(operacao) {
    const {
        id_cliente,
        id_caminhao,
        id_usuario,
        tipo,
        quantidade,
        observacao,
        valor,
    } = operacao;

    const query = `
    INSERT INTO operacao (
      id_cliente,
      id_caminhao,
      id_usuario,
      tipo,
      quantidade,
      observacao,
      valor
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING
      id_operacao,
      id_cliente,
      id_caminhao,
      id_usuario,
      tipo,
      quantidade,
      data_operacao,
      observacao,
      valor;
  `;

    const { rows } = await pool.query(query, [
        id_cliente,
        id_caminhao,
        id_usuario,
        tipo,
        quantidade,
        observacao,
        valor,
    ]);

    return rows[0];
}

// atualiza operação
async function update(id, operacao) {
    const {
        id_cliente,
        id_caminhao,
        id_usuario,
        tipo,
        quantidade,
        observacao,
        valor,
    } = operacao;

    const query = `
    UPDATE operacao
    SET
      id_cliente = $1,
      id_caminhao = $2,
      id_usuario = $3,
      tipo = $4,
      quantidade = $5,
      observacao = $6,
      valor = $7
    WHERE id_operacao = $8
    RETURNING
      id_operacao,
      id_cliente,
      id_caminhao,
      id_usuario,
      tipo,
      quantidade,
      data_operacao,
      observacao,
      valor;
  `;

    const { rows } = await pool.query(query, [
        id_cliente,
        id_caminhao,
        id_usuario,
        tipo,
        quantidade,
        observacao,
        valor,
        id,
    ]);

    return rows[0];
}

// remove operação
async function remove(id) {
    const query = `
    DELETE FROM operacao
    WHERE id_operacao = $1;
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