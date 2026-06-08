import pool from "../database/connection.js";

async function findAll() {
    const query = `
        SELECT
            id_vale,
            id_operacao,
            valor,
            data_emissao,
            pago,
            data_pagamento
        FROM vale
        ORDER BY id_vale;
    `;

    const { rows } = await pool.query(query);

    return rows;
}

async function findById(id) {
    const query = `
        SELECT
            id_vale,
            id_operacao,
            valor,
            data_emissao,
            pago,
            data_pagamento
        FROM vale
        WHERE id_vale = $1;
    `;

    const { rows } = await pool.query(query, [id]);

    return rows[0];
}

async function findByOperationId(idOperacao) {
    const query = `
        SELECT
            id_vale
        FROM vale
        WHERE id_operacao = $1;
    `;

    const { rows } = await pool.query(query, [idOperacao]);

    return rows[0];
}

async function create(vale) {
    const {
        id_operacao,
        valor,
        pago,
        data_pagamento,
    } = vale;

    const query = `
        INSERT INTO vale (
            id_operacao,
            valor,
            pago,
            data_pagamento
        )
        VALUES ($1,$2,$3,$4)
        RETURNING
            id_vale,
            id_operacao,
            valor,
            data_emissao,
            pago,
            data_pagamento;
    `;

    const { rows } = await pool.query(query, [
        id_operacao,
        valor,
        pago ?? false,
        data_pagamento ?? null,
    ]);

    return rows[0];
}

async function update(id, vale) {
    const {
        valor,
        pago,
        data_pagamento,
    } = vale;

    const query = `
        UPDATE vale
        SET
            valor = $1,
            pago = $2,
            data_pagamento = $3
        WHERE id_vale = $4
        RETURNING
            id_vale,
            id_operacao,
            valor,
            data_emissao,
            pago,
            data_pagamento;
    `;

    const { rows } = await pool.query(query, [
        valor,
        pago,
        data_pagamento,
        id,
    ]);

    return rows[0];
}

async function remove(id) {
    const query = `
        DELETE FROM vale
        WHERE id_vale = $1;
    `;

    await pool.query(query, [id]);
}

export default {
    findAll,
    findById,
    findByOperationId,
    create,
    update,
    remove,
};