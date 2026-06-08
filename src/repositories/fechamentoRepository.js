import pool from "../database/connection.js";

async function findAll() {
    const query = `
        SELECT
            id_fechamento,
            id_cliente,
            id_usuario,
            mes,
            ano,
            total_operacoes,
            total_quantidade,
            gerado_em
        FROM fechamento_mensal
        ORDER BY ano DESC, mes DESC;
    `;

    const { rows } = await pool.query(query);

    return rows;
}

async function findById(id) {
    const query = `
        SELECT
            id_fechamento,
            id_cliente,
            id_usuario,
            mes,
            ano,
            total_operacoes,
            total_quantidade,
            gerado_em
        FROM fechamento_mensal
        WHERE id_fechamento = $1;
    `;

    const { rows } = await pool.query(query, [id]);

    return rows[0];
}

export default {
    findAll,
    findById,
};