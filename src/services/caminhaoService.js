import caminhaoRepository from "../repositories/caminhaoRepository.js";

import AppError from "../utils/AppError.js";

// lista caminhões
async function listTrucks() {
    const trucks = await caminhaoRepository.findAll();

    return trucks;
}

// busca caminhão por id
async function getTruckById(id) {
    const truck = await caminhaoRepository.findById(id);

    if (!truck) {
        throw new AppError("caminhão não encontrado", 404);
    }

    return truck;
}

// cria caminhão
async function createTruck(data) {
    if (!data.placa?.trim()) {
        throw new AppError("placa é obrigatória", 400);
    }

    if (!data.motorista?.trim()) {
        throw new AppError("motorista é obrigatório", 400);
    }

    if (!data.capacidade_litros) {
        throw new AppError("capacidade é obrigatória", 400);
    }

    if (data.capacidade_litros <= 0) {
        throw new AppError("capacidade deve ser maior que zero", 400);
    }

    const truck = await caminhaoRepository.create(data);

    return truck;
}

// atualiza caminhão
async function updateTruck(id, data) {
    await getTruckById(id);

    if (!data.placa?.trim()) {
        throw new AppError("placa é obrigatória", 400);
    }

    if (!data.motorista?.trim()) {
        throw new AppError("motorista é obrigatório", 400);
    }

    if (!data.capacidade_litros) {
        throw new AppError("capacidade é obrigatória", 400);
    }

    if (data.capacidade_litros <= 0) {
        throw new AppError("capacidade deve ser maior que zero", 400);
    }

    const truck = await caminhaoRepository.update(id, data);

    return truck;
}

// remove caminhão
async function deleteTruck(id) {
    await getTruckById(id);

    await caminhaoRepository.remove(id);
}

export default {
    listTrucks,
    getTruckById,
    createTruck,
    updateTruck,
    deleteTruck,
};