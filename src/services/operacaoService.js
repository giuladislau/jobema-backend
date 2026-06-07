import operacaoRepository from "../repositories/operacaoRepository.js";

import AppError from "../utils/AppError.js";

// lista operações
async function listOperations() {
    return operacaoRepository.findAll();
}

// busca operação por id
async function getOperationById(id) {
    const operation = await operacaoRepository.findById(id);

    if (!operation) {
        throw new AppError("operação não encontrada", 404);
    }

    return operation;
}

// cria operação
async function createOperation(data) {
    const {
        id_cliente,
        id_caminhao,
        id_usuario,
        tipo,
        quantidade,
        valor,
    } = data;

    if (
        !id_cliente ||
        !id_caminhao ||
        !id_usuario ||
        !tipo ||
        !quantidade ||
        !valor
    ) {
        throw new AppError("campos obrigatórios não informados", 400);
    }

    if (!["ENTREGA", "RETIRADA"].includes(tipo)) {
        throw new AppError(
            "tipo deve ser ENTREGA ou RETIRADA",
            400,
        );
    }

    return operacaoRepository.create(data);
}

// atualiza operação
async function updateOperation(id, data) {
    const operation = await operacaoRepository.findById(id);

    if (!operation) {
        throw new AppError("operação não encontrada", 404);
    }

    if (
        !data.id_cliente ||
        !data.id_caminhao ||
        !data.id_usuario ||
        !data.tipo ||
        !data.quantidade ||
        !data.valor
    ) {
        throw new AppError(
            "campos obrigatórios não informados",
            400,
        );
    }

    if (!["ENTREGA", "RETIRADA"].includes(data.tipo)) {
        throw new AppError(
            "tipo deve ser ENTREGA ou RETIRADA",
            400,
        );
    }

    return operacaoRepository.update(id, data);
}

// remove operação
async function deleteOperation(id) {
    const operation = await operacaoRepository.findById(id);

    if (!operation) {
        throw new AppError("operação não encontrada", 404);
    }

    await operacaoRepository.remove(id);
}

export default {
    listOperations,
    getOperationById,
    createOperation,
    updateOperation,
    deleteOperation,
};