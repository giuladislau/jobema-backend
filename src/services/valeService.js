import valeRepository from "../repositories/valeRepository.js";
import operacaoRepository from "../repositories/operacaoRepository.js";

import AppError from "../utils/AppError.js";

async function listVouchers() {
    return valeRepository.findAll();
}

async function getVoucherById(id) {
    const vale = await valeRepository.findById(id);

    if (!vale) {
        throw new AppError("vale não encontrado", 404);
    }

    return vale;
}

async function createVoucher(data) {
    const {
        id_operacao,
        valor,
    } = data;

    if (!id_operacao || !valor) {
        throw new AppError(
            "campos obrigatórios não informados",
            400,
        );
    }

    const operacao =
        await operacaoRepository.findById(
            id_operacao,
        );

    if (!operacao) {
        throw new AppError(
            "operação não encontrada",
            404,
        );
    }

    const valeExistente =
        await valeRepository.findByOperationId(
            id_operacao,
        );

    if (valeExistente) {
        throw new AppError(
            "já existe um vale para esta operação",
            400,
        );
    }

    return valeRepository.create(data);
}

async function updateVoucher(id, data) {
    const vale = await valeRepository.findById(id);

    if (!vale) {
        throw new AppError("vale não encontrado", 404);
    }

    if (!data.valor) {
        throw new AppError(
            "valor é obrigatório",
            400,
        );
    }

    return valeRepository.update(id, data);
}

async function deleteVoucher(id) {
    const vale = await valeRepository.findById(id);

    if (!vale) {
        throw new AppError("vale não encontrado", 404);
    }

    await valeRepository.remove(id);
}

export default {
    listVouchers,
    getVoucherById,
    createVoucher,
    updateVoucher,
    deleteVoucher,
};