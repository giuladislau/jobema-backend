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

async function upsertFromOperacoes(id_usuario) {
    const query = `
        INSERT INTO fechamento_mensal (id_cliente, id_usuario, mes, ano, total_operacoes, total_quantidade)
        SELECT
            id_cliente,
            $1,
            EXTRACT(MONTH FROM data_operacao)::int AS mes,
            EXTRACT(YEAR  FROM data_operacao)::int AS ano,
            COUNT(*)::int                          AS total_operacoes,
            COALESCE(SUM(quantidade), 0)::int      AS total_quantidade
        FROM operacao
        GROUP BY id_cliente, mes, ano
        ON CONFLICT (id_cliente, mes, ano)
        DO UPDATE SET
            total_operacoes  = EXCLUDED.total_operacoes,
            total_quantidade = EXCLUDED.total_quantidade,
            id_usuario       = EXCLUDED.id_usuario
        RETURNING *;
    `;

    const { rows } = await pool.query(query, [id_usuario]);

    return rows;
}

export default {
    findAll,
    findById,
    upsertFromOperacoes,
};