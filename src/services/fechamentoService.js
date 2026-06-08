import fechamentoRepository from "../repositories/fechamentoRepository.js";

import AppError from "../utils/AppError.js";

async function listClosings() {
    return fechamentoRepository.findAll();
}

async function getClosingById(id) {
    const closing = await fechamentoRepository.findById(id);

    if (!closing) {
        throw new AppError("fechamento não encontrado", 404);
    }

    return closing;
}

async function generateClosing(id_usuario) {
    const result = await fechamentoRepository.upsertFromOperacoes(id_usuario);

    if (!result.length) {
        throw new AppError("nenhuma operação encontrada para gerar fechamento", 404);
    }

    return result;
}

export default {
    listClosings,
    getClosingById,
    generateClosing,
};