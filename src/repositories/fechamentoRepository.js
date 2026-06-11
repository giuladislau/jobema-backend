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
            total_valor,
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
            total_valor,
            gerado_em
        FROM fechamento_mensal
        WHERE id_fechamento = $1;
    `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
}

async function upsertFromOperacoes(id_usuario) {
  const query = `
        INSERT INTO fechamento_mensal (id_cliente, id_usuario, mes, ano, total_operacoes, total_quantidade, total_valor)
        SELECT
            o.id_cliente,
            $1,
            EXTRACT(MONTH FROM o.data_operacao)::int AS mes,
            EXTRACT(YEAR  FROM o.data_operacao)::int AS ano,
            COUNT(*)::int                            AS total_operacoes,
            COALESCE(SUM(o.quantidade), 0)::int      AS total_quantidade,
            COALESCE(SUM(v.valor), 0)                AS total_valor
        FROM operacao o
        LEFT JOIN vale v ON v.id_operacao = o.id_operacao
        GROUP BY o.id_cliente, mes, ano
        ON CONFLICT (id_cliente, mes, ano)
        DO UPDATE SET
            total_operacoes  = EXCLUDED.total_operacoes,
            total_quantidade = EXCLUDED.total_quantidade,
            total_valor      = EXCLUDED.total_valor,
            id_usuario       = EXCLUDED.id_usuario
        RETURNING *;
    `;

  const deleteQuery = `
        DELETE FROM fechamento_mensal
        WHERE (id_cliente, mes, ano) NOT IN (
            SELECT id_cliente,
                   EXTRACT(MONTH FROM data_operacao)::int,
                   EXTRACT(YEAR  FROM data_operacao)::int
            FROM operacao
            GROUP BY id_cliente,
                     EXTRACT(MONTH FROM data_operacao)::int,
                     EXTRACT(YEAR  FROM data_operacao)::int
        );
    `;

  const { rows } = await pool.query(query, [id_usuario]);
  await pool.query(deleteQuery);
  return rows;
}

export default {
  findAll,
  findById,
  upsertFromOperacoes,
};
